//IOTF Publisher sample (similar to the mqtt-publisher sample
//===========================================================
//--------------------------------------------------------------
// very small node.js application to connect to the IBM IoTF in Bluemix
//    send periodically json messages to the IoTF simulating sensor data
//--------------------------------------------------------------
//
//Publish JSON message to the IoTF in Bluemix, so that a IoTF client program can subscripe to the Topic and receive the messages
//e.g. for realtime visualization
//
//For the configuration an device.config file is created which contains all necessary infos to register to IoTF such as
//
//{
//"id":"12345678",
//"type":"HS-MacBook",
//"org":"",
//"auth-method":"token",
//"auth-token":""
//}
//
//id          is a unique identifier of the device -->this must be registered using IoTF device definitions
//type        is the client device tyte --> this must be registered using IoTF device definitions
//org         is the orgid of the IoTF org assigned when a IoTF service instance is created in Bluemix
//auth-token  is the keyword
//auth-token  is assigend when the device is registered in IoTF --> be aware this token will be shown only once in bluemix
//
// the ibmiot package is required!
// 
var iotf = require("ibmiotf");
var config = require("./device.json");

var deviceClient = new iotf.IotfDevice(config);

//setting the log level to trace. By default its 'warn'
deviceClient.log.setLevel('info');

var data = {"timeStamp":1,
              "windowSizeMs":0,
              "data":{"temperature":41.0,
                      "pressure":0.0,
                      "weight":0.0},
              "isValThreshCrossed":false,
              "matchN":0,
              "threshold":0.0,
              "isThreshCrossBurstWin":false,
              "isTrendPatternDetected":false,
              "isTimeoutIndicator":true,
              "timestampsThreshCrossed":[],
              "sensorId":"SPU3022-58efaf3a-1e41-11e5-96cd-984fee123011"};
              
var data1 = {"d": [  {'temperature':1},
                     {'weight':2},
                     {'pressure':3}
                  ]
            };
// generate the timeStamp value - it should be unique
var date = new Date();
var time = date.getTime();
// put the generated timeStamp into the data structure
data.timeStamp = time;

data.data.temperature = 99;

var datastr = JSON.stringify(data);
var xx = 0;
var mqttTopic = "hs-test1";

var iterations = 1;   // how many times a data message will be sent
var waitTime = 500;    // how many milliseconds the function should wait until the next time it will be invoked

var minTemperature = 10;
var maxTemperature = 15;
var minPressure = 5;
var maxPressure = 10;
var minWeight = 0;
var maxWeight = 5;
//console.log(datastr);
//----------------
// function to generate a random number between min and may
//----------------
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

//----------------
// function waitAndDo x times
//   when this function is called a parameter for the number of times will be passed. This parameter identifies
//   how many times this function should be executed
//----------------
  
deviceClient.connect();

deviceClient.on('connect', function(){
    var i=0;
    console.log("connected");
   
    function waitAndDo(iterations) {
      console.log("iterations=",iterations);
      if(iterations < 1) {
        deviceClient.disconnect();
        console.log("should return");
        return;
      }
      setTimeout(function() {
                  
          date = new Date();
          time = date.getTime();
          data.timeStamp = time;
          
          // set the temperature, pressure and weight values    
          //data.data.temperature = randomIntFromInterval(minTemperature, maxTemperature);
          //data.data.pressure = randomIntFromInterval(minPressure, maxPressure);
          //data.data.weight = randomIntFromInterval(minWeight, maxWeight);
          //
          data1.d[0].temperature = randomIntFromInterval(minTemperature, maxTemperature);
          data1.d[1].weight = randomIntFromInterval(minPressure, maxPressure);
          data1.d[2].pressure = randomIntFromInterval(minWeight, maxWeight);
          datastr = JSON.stringify(data1);
                  
          i++;
          
          deviceClient.publish(mqttTopic, 'json', datastr, 0);
          console.log("mattTopic =", mqttTopic);
          console.log("data published =", datastr);
          waitAndDo(iterations-1);
      },250);
    };
  waitAndDo(iterations);    
});

