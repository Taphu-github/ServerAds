import express from "express";
import mysql from 'mysql2';
import mqtt from 'mqtt';
import FileSaver from 'file-saver';
import fs from 'fs';

const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ads12345678',
  database: 'AdsDB'
})

connection.connect(function(err) {
  if (err){
    console.log("Not connected");
  }else{
    console.log("Connected!");
  }
});

var options = {
  host: '34773dcfbaf24a4bba66e5a333c2df9a.s1.eu.hivemq.cloud',
  port: 8883,
  protocol: 'mqtts',
  username: 'ads@rpi',
  password: 'Ads12345678'
}

var client = mqtt.connect(options);

// setup the callbacks
client.on('connect', function () {
  console.log('Connected');
});

client.on('error', function (error) {
  console.log(error);
});

client.on('message', function (topic, message) {
  // called each time a message is received
  //console.log('Received message:', topic, );
  
  const byteArray=Buffer.from(message.toString(), 'base64');
  const blob = new Blob([byteArray], { type: 'image/jpeg' });
  fs.writeFile("C:/Users/Gaming/Desktop/FYP_ADS_IOT/ServerAds/images/image1.jpg", byteArray, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Blob saved to file!');
    }
  });
});

// subscribe to topic 'my/test/topic'
client.subscribe('animal');