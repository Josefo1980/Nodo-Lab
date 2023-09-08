const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = new SerialPort({
  path: 'COM10',
  baudRate: 57600
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

let lastValue = "0";
let lastData;

function sendValueToArduino(value) {
  if (value =="0" ) {
        port.write(value);
    }else{
  const formattedValue = `1${value}`;
  port.write(formattedValue);
  console.log(`Sent value to Arduino: ${formattedValue}`);
}
}


io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('updateValue', (newValue) => {
    console.log('Updating lastValue to:', newValue);
    lastValue = newValue;

    // Send the new value to Arduino
    sendValueToArduino(lastValue);
  });

  parser.on('data', (data) => {
    try {
      const data1 = JSON.parse(data);
      lastData = data1;
      //console.log(data);
      socket.emit('data', data1); // Enviar los datos al cliente
    } catch (error) {
      //console.error('Error parsing data:', error);
      console.log('Data received:', data);
    }
  });
});


const serverPort = 3000;
server.listen(serverPort, '127.0.0.1', () => {
  console.log('Server on port', serverPort);
});