
document.addEventListener('DOMContentLoaded', () => {
    const socket = io.connect('http://127.0.0.1:3000');
    let updatedValue = false;
    let lastDataReceivedTime = Date.now(); // Variable para rastrear el tiempo de la última recepción de datos
    const TIMEOUT_THRESHOLD = 15000;

socket.on('updateValue', (newValue) => {
    updatedValue = true; // Marcar que se ha actualizado un nuevo valor
    // ... Resto de tu código ...
});


socket.on('data', (datosRecibidos) => {
    console.log(datosRecibidos);
 const concentracionH2 = parseFloat(datosRecibidos.BEH2)+ " %mol"; // Asegúrate de usar la propiedad correcta
 const valorconcentracionH2 = document.getElementById('concentracionH2');
 valorconcentracionH2.textContent = concentracionH2;

 document.getElementById('BEP').textContent=parseFloat(datosRecibidos.BEP)+ " mbara"
 document.getElementById('BET').textContent=parseFloat(datosRecibidos.BEP)+ "°C"
 document.getElementById('C1Q').textContent=parseFloat(datosRecibidos.C1Q)+ " m3/h"
 document.getElementById('C1P').textContent=parseFloat(datosRecibidos.C1P)+ "mbarg"
 document.getElementById('C1T').textContent=parseFloat(datosRecibidos.C1T)+ "°C"
 document.getElementById('C2Q').textContent=parseFloat(datosRecibidos.C2Q)+ " m3/h"
 document.getElementById('C2P').textContent=parseFloat(datosRecibidos.C2P)+ "mbarg"
 document.getElementById('C2T').textContent=parseFloat(datosRecibidos.C2T)+ "°C"
 document.getElementById('C3Q').textContent=parseFloat(datosRecibidos.C3Q)+ " m3/h"
 document.getElementById('C3P').textContent=parseFloat(datosRecibidos.C3P)+ "mbarg"
 document.getElementById('C3T').textContent=parseFloat(datosRecibidos.C3T)+ "°C"

});


});

