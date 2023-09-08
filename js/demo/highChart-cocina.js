
  
  document.addEventListener('DOMContentLoaded', () => {
    const socket = io.connect('http://127.0.0.1:3000');
    const graphSelect = document.getElementById('graphSelect');
    //const chartContainer = document.getElementById('chart1');
    let currentChart;
  
    // Función para crear una nueva gráfica
    function createChart(idContenedor, label) {
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
    // Evento para manejar los datos recibidos del servidor
    socket.on('data', (datosRecibidos) => {
      const tiempoActual = new Date().getTime();
     a=parseFloat(datosRecibidos[graphSelect.value])+Math.floor(Math.random() * 3) - 1;
      // Actualizar la gráfica seleccionada con los nuevos datos recibidos
      if (currentChart) {
        currentChart.series[0].addPoint([tiempoActual, a]);
      }
      //console.log (datosRecibidos);
    });
     
    // Evento para cambiar la gráfica actual cuando se seleccione una opción en la lista desplegable
    graphSelect.addEventListener('change', () => {
    
      // Destruir la instancia actual de la gráfica para limpiarla antes de crear una nueva
      if (currentChart) {
        currentChart.destroy();
      }
      // Crear una nueva instancia de la gráfica seleccionada
      currentChart = createChart('chart1', graphSelect.options[graphSelect.selectedIndex].text);
      
    });
    // Crear la gráfica inicialmente con la opción seleccionada por defecto
    //currentChart = createChart(graphSelect.options[graphSelect.selectedIndex].text);


  });
