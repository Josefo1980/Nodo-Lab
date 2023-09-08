
  
  document.addEventListener('DOMContentLoaded', () => {
    const socket = io.connect('http://127.0.0.1:3000');
    //const chartContainer = document.getElementById('chart1');
    let currentChart2;
    let currentChart3;
    let currentChart4;
    let currentChart5;
    let currentChart6;
    let currentChart7;
    let currentChart8;
    let currentChart9;
    let currentChart10;
    let currentChart11;
    let currentChart12;
    let currentChart13;
    // Función para crear una nueva gráfica
    function createChart2(idContenedor, label) {
      return Highcharts.chart(idContenedor, {
        chart: {
          type: 'line',
          zoomType: 'x' // Habilitar el zoom solo en el eje x
        },
        title: {
          text: label
        },
        xAxis: {
          type: 'datetime', // Utilizar escalas de tiempo
          labels: {
            format: '{value:%H:%M:%S}' // Formato de etiquetas de tiempo
          }
        },
        yAxis: {
          title: {
            text: 'Valor'
          },

        },
        series: [{
          name: label,
          data: []
        }]
      });
    }
    currentChart2 = createChart2('chart2','H2');
    currentChart3 = createChart2('chart3','BEP');
    currentChart4= createChart2('chart4','BET');
    currentChart5= createChart2('chart5','C1Q');
    currentChart6= createChart2('chart6','C1P');
    currentChart7= createChart2('chart7','C1T');
    currentChart8= createChart2('chart8','C2Q');
    currentChart9= createChart2('chart9','C2P');
    currentChart10= createChart2('chart10','C2T');
    currentChart11= createChart2('chart11','C3Q');
    currentChart12= createChart2('chart12','C3P');
    currentChart13= createChart2('chart13','C3T');
    // Evento para manejar los datos recibidos del servidor
    socket.on('data', (datosRecibidos) => {
      const tiempoActual = new Date().getTime();
     b=parseFloat(datosRecibidos.BEH2);
     c=parseFloat(datosRecibidos.BEP);
     d=parseFloat(datosRecibidos.BET);
     e=parseFloat(datosRecibidos.C1Q);
     f=parseFloat(datosRecibidos.C1P);
     g=parseFloat(datosRecibidos.C1T);
     h=parseFloat(datosRecibidos.C2Q);
     i=parseFloat(datosRecibidos.C2P);
     j=parseFloat(datosRecibidos.C2T);
     k=parseFloat(datosRecibidos.C3Q);
     l=parseFloat(datosRecibidos.C3P);
     m=parseFloat(datosRecibidos.C3T);
     
      // Actualizar la gráfica seleccionada con los nuevos datos recibidos
      if (currentChart2) {
        currentChart2.series[0].addPoint([tiempoActual, b]);
        currentChart3.series[0].addPoint([tiempoActual, c]);
        currentChart4.series[0].addPoint([tiempoActual, d]);
        currentChart5.series[0].addPoint([tiempoActual, e]);
        currentChart6.series[0].addPoint([tiempoActual, f]);
        currentChart7.series[0].addPoint([tiempoActual, g]);
        currentChart8.series[0].addPoint([tiempoActual, h]);
        currentChart9.series[0].addPoint([tiempoActual, i]);
        currentChart10.series[0].addPoint([tiempoActual, j]);
        currentChart11.series[0].addPoint([tiempoActual, k]);
        currentChart12.series[0].addPoint([tiempoActual, l]);
        currentChart13.series[0].addPoint([tiempoActual, m]);
      }
      //console.log (datosRecibidos);
    });
     
    // Crear la gráfica inicialmente con la opción seleccionada por defecto
    //currentChart = createChart(graphSelect.options[graphSelect.selectedIndex].text);
  });
