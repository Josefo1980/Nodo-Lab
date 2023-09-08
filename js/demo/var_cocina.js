
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
  
    //console.log(lastDataReceivedTime);

    const currentTime = Date.now();
    const elapsedTime = currentTime - lastDataReceivedTime;
    lastDataReceivedTime = currentTime;
    //console.log(elapsedTime);


    if (!updatedValue && datosRecibidos && datosRecibidos !== "" && elapsedTime < TIMEOUT_THRESHOLD) {
        const concentracionH2 = parseFloat(datosRecibidos.BEH2)+ " %mol"; // Asegúrate de usar la propiedad correcta

        // Actualizar el contenido del elemento con el valor de la temperatura de la llama
        const valorconcentracionH2 = document.getElementById('concentracionH2');
        valorconcentracionH2.textContent = concentracionH2;
        console.log(datosRecibidos);

        document.getElementById('caudalH2').textContent=(datosRecibidos.A1H2FV);
        document.getElementById('presionH2').textContent=datosRecibidos.A1H2P;
        document.getElementById('tempH2').textContent=datosRecibidos.A1H2T;
        document.getElementById('caudalGn').textContent=datosRecibidos.A2CH4FV;
        document.getElementById('presionGn').textContent=datosRecibidos.A2CH4P;
        document.getElementById('tempGn').textContent=datosRecibidos.A2CH4T;
        document.getElementById('caudalMix').textContent=datosRecibidos.C1Q;
        document.getElementById('presionMix').textContent=datosRecibidos.C1P;
        document.getElementById('tempMix').textContent=datosRecibidos.C1T;
        document.getElementById('tempLlama').textContent=datosRecibidos.ESLL2;
        document.getElementById('COAmb').textContent=datosRecibidos.S3CO+" ppm ";
        document.getElementById('CH4Amb').textContent=datosRecibidos.S1CH4+" %mol ";
        document.getElementById('H2Amb').textContent=datosRecibidos.S1H2+" %mol ";
        document.getElementById('TAmb').textContent=datosRecibidos.S3T+" °C ";
        
    // datos para barra de monoxido de carbon
    
    document.getElementById('progressBar1').style.width = (datosRecibidos.S1CO / 50) * 100 + "%";
    document.getElementById('progressBar1').setAttribute('aria-valuenow', datosRecibidos.S1CO);

    } else{
                // No se están recibiendo datos válidos o ha pasado mucho tiempo desde la última recepción, establecer "ND"
                const elementsToUpdate = ['concentracionH2', 'caudalH2', 'presionH2', 'tempH2', 'caudalGn', 'presionGn', 'tempGn', 'caudalMix', 'presionMix', 'tempMix', 'tempLlama', 'COAmb', 'CH4Amb', 'H2Amb', 'TAmb'];

                elementsToUpdate.forEach(elementId => {
                    document.getElementById(elementId).textContent = 'ND';
                });
        
                // Establecer la barra de monóxido de carbono en 0%
                document.getElementById('progressBar1').style.width = "0%";
                document.getElementById('progressBar1').setAttribute('aria-valuenow', 0);

    }
    updatedValue = false;  


});

document.getElementById('updateValueButton').addEventListener('click', () => {
    const newValue = document.getElementById('newValueInput').value;
    socket.emit('updateValue', newValue); // Enviar el nuevo valor al servidor
});


});

