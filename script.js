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

let lastValue = "00.00";

let lastData;

function sendLastValue() {
 // console.log('lastValue:', lastValue);
  //console.log('lastData.A2CH4FV:', lastData.A2CH4FV);
  if (lastValue !=="00.00" ) {
    port.write("1"+lastValue+".00");
  }
 if (lastData && lastData.A2CH4FV !== undefined) {
    const lastValue1 = parseFloat(lastValue/100) * parseFloat(lastData.A2CH4FV) / (1 - parseFloat(lastValue) / 100);
    //console.log('lastValue1:', lastValue1);
    const lastValue2 = lastValue1.toFixed(2).toString();
    console.log('lastValue2:', lastValue2);
    const lastValue3="1"+lastValue2;
    port.write(lastValue3);
  }
     setTimeout(sendLastValue, 1000); // Envia cada segundo
  }


io.on('connection', (socket) => {
  console.log('Client connected');
 // lastValue=newValue;

 socket.on('updateValue', (newValue) => {
  console.log('Updating lastValue to:', newValue);
  lastValue = newValue; // Actualizar el valor recibido desde el cliente
});

sendLastValue();

  parser.on('data', (data) => {
    try {
      const data1 = JSON.parse(data); 
      lastData=data1;
      console.log(data1)
      socket.emit('data', data1); // Enviar los datos al cliente
    } catch (error) {
      console.error('Error parsing data:', error);
      console.log('Data received:', data);
    }
  });
  
});

const serverPort = 3000;
server.listen(serverPort,'127.0.0.1', () => {
  console.log('Server on port', serverPort);
});