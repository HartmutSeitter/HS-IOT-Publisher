IOTF Publisher sample (similar to the mqtt-publisher sample)
===========================================================

Publish JSON message to the IoTF in Bluemix, so that a IoTF client program can subscripe to the Topic and receive the messages
e.g. for realtime visualization

For the configuration an device.config file is created which contains all necessary infos to register to IoTF such as

{
"id":"12345678",
"type":"HS-MacBook",
"org":"",
"auth-method":"token",
"auth-token":""
}

id          is a unique identifier of the device -->this must be registered using IoTF device definitions
type        is the client device tyte --> this must be registered using IoTF device definitions
org         is the orgid of the IoTF org assigned when a IoTF service instance is created in Bluemix
auth-token  is the keyword
auth-token  is assigend when the device is registered in IoTF --> be aware this token will be shown only once in bluemix

//
// the ibmiot package is required!
// 

the JSON message will have the following structure

var data = {"timeStamp":1,
              "windowSizeMs":0,
              "data":{"temperature":41.0,
                      "pressure":0.0,
                      "hsxx":0.0},
              "isValThreshCrossed":false,
              "matchN":0,
              "threshold":0.0,
              "isThreshCrossBurstWin":false,
              "isTrendPatternDetected":false,
              "isTimeoutIndicator":true,
              "timestampsThreshCrossed":[],
              "sensorId":"SPU3022-58efaf3a-1e41-11e5-96cd-984fee123011"};

timeStampe              is e.g. the actual timestamp form a sensor. This value is in the check on the mqtt-subscriber side whether the values are published more than once.
                        For realtime visualization the a data value should only 'rendered' once.
windwoSizeMs:           tbd
data                    are the actual sensor data - in data more than one field can be submitted
                        in this program a value range can be specified and in this range a random number will be generated
isValThrehCrossed       when a sensor or a sensor program is able to identify whether the sensor data reach a threshold value. This could be used to display the value e.g. in a different color.
matchN                  tbd
isThreshCrossBurstWin   tbd
isTrendPatternDetected  similare to isValeTreshCrossed
isTimeoutIndicator"     could be used that for a given timeperiod a sensor does not provide values.
timestampsThreshCrossed tbd
sensorID                unique id of the sensor