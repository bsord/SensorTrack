
// EVENT HANDLER FOR FILE UPLOAD
function handleFileSelect(evt) {
  var file = evt.target.files[0];
  Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    complete: function(results) {
      drawGraphs(results.data);
    }
  });
}

function handleFileDefault(evt) {
  Papa.parse("sensordata/samplefile.csv", {
    header: true,
    dynamicTyping: true,
    download:true,
    complete: function(results) {
      drawGraphs(results.data);
    }
  });
}

$(document).ready(function(){
  //ACTIVATE FILE UPLOAD EVENT LISTENER
  $("#csv-file").change(handleFileSelect);
  $("#samplefile").click(handleFileDefault);
});

//function for getting arrays of data from JSON object
function getDataArray(inputData,inputField){
  var outputArray = [];
  for (const item of inputData) {
    timestamp = new Date(item["YYYY-MO-DD HH-MI-SS_SSS"]);
    value = [(timestamp).getTime(),item[inputField]];
    outputArray.push(value);
  }
  return outputArray;

}

function drawGraphs(fileData) {
  $('#accelerometer').highcharts({
    chart: {type: 'line'},
    title: {text: 'Accelerometer'},
    xAxis: {type: 'datetime'},
    yAxis: {title: {text: '(m/s²)'}},
    plotOptions: {line: {dataLabels: {enabled: false}, enableMouseTracking: true},},
    series: [{
      name: 'Accel X',
      data: getDataArray(fileData,'ACCELEROMETER X (m/s²)')
      },
      {name: 'Accel Y',
        data: getDataArray(fileData,'ACCELEROMETER Y (m/s²)')
      },
      {name: 'Accel Z',
        data: getDataArray(fileData,'ACCELEROMETER Z (m/s²)')
      }
    ]
  });

  $('#gravity').highcharts({
    chart: {type: 'line'},
    title: {text: 'Gravity'},
    xAxis: {type: 'datetime'},
    yAxis: {title: {text: '(m/s²)'}},
    plotOptions: {line: {dataLabels: {enabled: false}, enableMouseTracking: true},},
    rangeSelector: {
            selected: 1
        },
    series: [{
      name: 'Gravity X',
      data: getDataArray(fileData,'GRAVITY X (m/s²)')
      },
      {name: 'Gravity Y',
        data: getDataArray(fileData,'GRAVITY Y (m/s²)')
      },
      {name: 'Gravity Z',
        data: getDataArray(fileData,'GRAVITY Z (m/s²)')
      }
    ]
  });

  $('#gyroscope').highcharts({
    chart: {type: 'line'},
    title: {text: 'Gyroscope'},
    xAxis: {type: 'datetime'},
    yAxis: {title: {text: 'rad/s'}},
    plotOptions: {line: {dataLabels: {enabled: false}, enableMouseTracking: true},},
    series: [{
      name: 'Gyro X',
      data: getDataArray(fileData,'GYROSCOPE X (rad/s)')
      },
      {name: 'Gyro Y',
        data: getDataArray(fileData,'GYROSCOPE Y (rad/s)')
      },
      {name: 'Gryo Z',
        data: getDataArray(fileData,'GYROSCOPE Z (rad/s)')
      }
    ]
  });

  $('#linearacceleration').highcharts({
    chart: {type: 'line'},
    title: {text: 'Linear Acceleration'},
    xAxis: {type: 'datetime'},
    yAxis: {title: {text: 'rad/s'}},
    plotOptions: {line: {dataLabels: {enabled: false}, enableMouseTracking: true},},
    series: [{
      name: 'Linear Accel X',
      data: getDataArray(fileData,'LINEAR ACCELERATION X (m/s²)')
      },
      {name: 'Linear Accel Y',
        data: getDataArray(fileData,'LINEAR ACCELERATION Y (m/s²)')
      },
      {name: 'Linear Accel Z',
        data: getDataArray(fileData,'LINEAR ACCELERATION Z (m/s²)')
      }
    ]
  });

  $('#light').highcharts({
    chart: {type: 'line'},
    title: {text: 'Light'},
    xAxis: {type: 'datetime'},
    yAxis: {title: {text: 'lux'}},
    plotOptions: {line: {dataLabels: {enabled: false}, enableMouseTracking: true},},
    series: [{
      name: 'Light',
      data: getDataArray(fileData,'LIGHT (lux)')
      }
    ]
  });

  $('#magneticfield').highcharts({
    chart: {type: 'line'},
    title: {text: 'Magnetic Field'},
    xAxis: {type: 'datetime'},
    yAxis: {title: {text: 'μT'}},
    plotOptions: {line: {dataLabels: {enabled: false}, enableMouseTracking: true},},
    series: [{
      name: 'Magnetic Field X',
      data: getDataArray(fileData,'MAGNETIC FIELD X (μT)')
      },
      {name: 'Magnetic Field Y',
        data: getDataArray(fileData,'MAGNETIC FIELD Y (μT)')
      },
      {name: 'Magnetic Field Z',
        data: getDataArray(fileData,'MAGNETIC FIELD Z (μT)')
      }
    ]
  });

  $('#orientation').highcharts({
    chart: {type: 'line'},
    title: {text: 'Orientation'},
    xAxis: {type: 'datetime'},
    yAxis: {title: {text: 'degrees °'}},
    plotOptions: {line: {dataLabels: {enabled: false}, enableMouseTracking: true},},
    series: [{
      name: 'Orientation X',
      data: getDataArray(fileData,'ORIENTATION X (pitch °)')
      },
      {name: 'Orientation Y',
        data: getDataArray(fileData,'ORIENTATION Y (roll °)')
      },
      {name: 'Orientation Z',
        data: getDataArray(fileData,'ORIENTATION Z (azimuth °)')
      }
    ]
  });

  $('#proximity').highcharts({
    chart: {type: 'line'},
    title: {text: 'Proximity'},
    xAxis: {type: 'datetime'},
    yAxis: {title: {text: 'i'}},
    plotOptions: {line: {dataLabels: {enabled: false}, enableMouseTracking: true},},
    series: [{
      name: 'Proximity',
      data: getDataArray(fileData,'Proximity (i)')
      }
    ]
  });

  $('#atmosphericpressure').highcharts({
    chart: {type: 'line'},
    title: {text: 'Atmospheric Pressure'},
    xAxis: {type: 'datetime'},
    yAxis: {title: {text: 'hPa'}},
    plotOptions: {line: {dataLabels: {enabled: false}, enableMouseTracking: true},},
    series: [{
      name: 'Atmospheric Pressure',
      data: getDataArray(fileData,'ATMOSPHERIC PRESSURE (hPa)')
      }
    ]
  });

  $('#soundlevel').highcharts({
    chart: {type: 'line'},
    title: {text: 'Sound Level'},
    xAxis: {type: 'datetime'},
    yAxis: {title: {text: 'dB'}},
    plotOptions: {line: {dataLabels: {enabled: false}, enableMouseTracking: true},},
    series: [{
      name: 'Sound Level',
      data: getDataArray(fileData,'SOUND LEVEL (dB)')
      }
    ]
  });

  $('#locationaltitude').highcharts({
    chart: {type: 'line'},
    title: {text: 'Location Altitude'},
    xAxis: {type: 'datetime'},
    yAxis: {title: {text: 'm'}},
    plotOptions: {line: {dataLabels: {enabled: false}, enableMouseTracking: true},},
    series: [{
      name: 'Location Altitude',
      data: getDataArray(fileData,'LOCATION Altitude ( m)')
      }
    ]
  });

  $('#locationspeed').highcharts({
    chart: {type: 'line'},
    title: {text: 'Location Speed'},
    xAxis: {type: 'datetime'},
    yAxis: {title: {text: 'Kmh'}},
    plotOptions: {line: {dataLabels: {enabled: false}, enableMouseTracking: true},},
    series: [{
      name: 'Location Speed',
      data: getDataArray(fileData,'LOCATION Speed ( Kmh)')
      }
    ]
  });

  $('#locationaccuracy').highcharts({
    chart: {type: 'line'},
    title: {text: 'Location Accuracy'},
    xAxis: {type: 'datetime'},
    yAxis: {title: {text: 'm'}},
    plotOptions: {line: {dataLabels: {enabled: false}, enableMouseTracking: true},},
    series: [{
      name: 'Location Accuracy',
      data: getDataArray(fileData,'LOCATION Accuracy ( m)')
      }
    ]
  });





}
