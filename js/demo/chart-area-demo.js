
function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}


document.addEventListener('DOMContentLoaded', () => {
  const socket = io.connect('http://192.168.20.200:3000');
  const graphSelect=document.getElementById('graphSelect');
  const ctx=document.getElementById('chart1');
  let currentGraph;

// Area Chart Example
function createChart(label,borderColor){
//var ctx = document.getElementById("myAreaChart");
//var myLineChart = new Chart(ctx, {
return new Chart (ctx,{
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Datos en tiempo real',
      data: [],
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "rgba(78, 115, 223, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(78, 115, 223, 1)",
      pointBorderColor: "rgba(78, 115, 223, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,     
    }]
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      x: {
        display: true
      },
      y: [{
        display: true,
        suggestedMin: 0,
        suggestedMax: 100 // Puedes ajustar los límites del eje y según tus necesidades
      },{
      gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }
    ]
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: label,
      },
      tooltip: {
        enabled: true, // Habilitar la visualización de tooltips
      },
      zoom: {
        pan: {
          enabled: true, // Habilitar el desplazamiento (pan) en el eje x
          mode: 'x', // Habilitar el desplazamiento solo en el eje x
        },
        zoom: {
          enabled: true, // Habilitar el zoom en el eje x
          mode: 'x', // Habilitar el zoom solo en el eje x
        },
      },
    }, 
  }
  
});
}

socket.on('data', (datosRecibidos) => {
  const tiempoActual=new Date().toLocaleTimeString();
  if (currentGraph){
    currentGraph.data.labels.push(tiempoActual);
    currentGraph.data.datasets[0].data.push(datosRecibidos[graphSelect.value]);
    currentGraph.update({ preservation: true }); 
  }
 // myLineChart.data.labels.push(new Date().toLocaleTimeString());
  //myLineChart.data.datasets[0].data.push(data.cH2);
  //myLineChart.update({ preservation: true }); // Actualizar la gráfica
});

graphSelect.addEventListener('change', () => {
  if (currentGraph) {
    // Destruir la instancia actual de la gráfica para limpiarla antes de crear una nueva
    currentGraph.destroy();
  }
  // Crear una nueva instancia de la gráfica seleccionada
  currentGraph = createChart(graphSelect.options[graphSelect.selectedIndex].text, graphSelect.value);
});

});