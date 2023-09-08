import fetch from 'node-fetch';

const dataToSend = {
  data: 'Hello from client!'
};

fetch('http://192.168.20.200:3000/send-data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(dataToSend)
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });