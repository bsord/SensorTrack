var i = 0;
var orientationData = [];
var renderer, camera, scene;
var ambLight, sptLight, boxgeo, boxmat, boxmesh, planegeo, planemat, plane;
var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 2000;
var animationSpeed = 200;
var AHRS = require('ahrs');
var madgwick;
var orientation;

init();
animate();

function init(){
  // Initialize renderer
  renderer = new THREE.WebGLRenderer({canvas: document.getElementById('glCanvas'), antialias: true});
  renderer.setClearColor(0xaeaeae);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth /2, window.innerHeight /2);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

  // Define camera and scene
  scene = new THREE.Scene();

  // Define Camera
  camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set( 500, 0, 200);
  camera.up = new THREE.Vector3(0, 0, 1 );
  scene.add(camera);

  //define lighting
  ambLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
  scene.add(ambLight);

  sptLight = new THREE.SpotLight(0xFFFFFF, 0.5);
  sptLight.position.set(0,0,400);
  sptLight.castShadow = true;
  sptLight.shadowCameraVisible = true;
  sptLight.shadowMapWidth = 1024; // default is 512
  sptLight.shadowMapHeight = 1024; // default is 512
  scene.add(sptLight);

  // Define Box/Device
  boxgeo = new THREE.BoxGeometry(400,225,30);
  boxmat = new THREE.MeshLambertMaterial({color: 0x0F32AC});
  boxmesh = new THREE.Mesh(boxgeo, boxmat);
  boxmesh.position.set(0,0, 0);
  boxmesh.castShadow = true;
  boxmesh.receiveShadow = false; //default
  scene.add(boxmesh);

  // Define Floor plane
  floorMaterial = new THREE.MeshPhongMaterial({color: 0x8c8c8c});
  floorGeometry = new THREE.PlaneGeometry(1000,1000,10,10);
  floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.receiveShadow = true;
  floor.position.z = -100;
  scene.add(floor);

  // Add Helpers to scene
  //scene.add( new THREE.CameraHelper( sptLight.shadow.camera ) );
  scene.add( new THREE.AxisHelper() );

  // Enable mouse CONTROLS
  controls = new THREE.TrackballControls( camera, renderer.domElement );


  // initiate AHRS filter for position
  madgwick = new AHRS({
      sampleInterval: 100,
      algorithm: 'Madgwick',
      beta: .4, //Madgwick

      kp: 0.5, //Mahoney
      ki: 0 //Mahoney
  });


  //getOrientationData and start loop
  downloadData();
  document.addEventListener( 'mousedown', onDocumentMouseDown, false );


}

function playRotation(){
    setTimeout(function () {
      if(i < orientationData.length){

        gyroX = orientationData[i][6];
        gyroY = orientationData[i][7];
        gyroZ = orientationData[i][8];
        accelX = orientationData[i][9];
        accelY = orientationData[i][10];
        accelZ = orientationData[i][11];
        compX = orientationData[i][12];
        compY = orientationData[i][13];
        compZ = orientationData[i][14];
        madgwick.update(gyroX, gyroY, gyroZ, accelX, accelY, accelZ, compX, compY, compZ);
        orientation = madgwick.getEulerAngles();
        console.log(orientation);


        var luminosity = orientationData[i][4] / 50;
        var noiseLevel = orientationData[i][5];

        //boxmesh.rotation.x = orientationData[i][1] * Math.PI / 180;
        //boxmesh.rotation.y = orientationData[i][2] * Math.PI / 180;
        //boxmesh.rotation.z = orientationData[i][2] * Math.PI / 180;


        //new TWEEN.Tween( boxmesh.rotation ).to( {  y:  orientation.pitch}, animationSpeed ).start();
        // Set spotlight intensity to the luminosity from dataset
        new TWEEN.Tween( sptLight ).to( {  intensity:  luminosity}, animationSpeed).start();
        i++
      } else {
        i = 0;
      }

      playRotation();

    }, animationSpeed);
}

function onDocumentMouseDown( event ) {
  event.preventDefault();
  playRotation();
}

function animate(){
  requestAnimationFrame(animate);
  render();
}

function render(){
  TWEEN.update();
  controls.update();
  renderer.render(scene, camera);

}

function downloadData(){
  Papa.parse("sensordata/samplefile.csv", {
    header: true,
    dynamicTyping: true,
    download:true,
    complete: function(results) {
      ProcessData(results.data);
    }
  });
}

function ProcessData(inputData,inputField){
  var outputArray = [];
  for (const item of inputData) {
    timestamp = new Date(item["YYYY-MO-DD HH-MI-SS_SSS"]);
    value = [(timestamp).getTime(), item['ORIENTATION X (pitch °)'], item['ORIENTATION Y (roll °)'], item['ORIENTATION Z (azimuth °)'], item['LIGHT (lux)'], item['SOUND LEVEL (dB)'], item['GYROSCOPE X (rad/s)'], item['GYROSCOPE Y (rad/s)'], item['GYROSCOPE Z (rad/s)'], item['ACCELEROMETER X (m/s²)'], item['ACCELEROMETER Y (m/s²)'], item['ACCELEROMETER Z (m/s²)'], item['MAGNETIC FIELD X (μT)'], item['MAGNETIC FIELD Y (μT)'], item['MAGNETIC FIELD Z (μT)']];
    outputArray.push(value);
  }
  orientationData = outputArray;
  console.log(orientationData[0]);
}
