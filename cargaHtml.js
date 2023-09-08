
    // Función para cargar el contenido de un archivo externo en un contenedor específico
    function loadExternalContent(url, containerId) {
        fetch(url)
          .then(response => response.text())
          .then(data => {
            document.getElementById(containerId).innerHTML = data;
          })
          .catch(error => {
            console.error('Error al cargar el archivo externo:', error);
          });
      }
  
      // Llamar a la función para cargar el contenido cuando se cargue la página
      document.addEventListener('DOMContentLoaded', () => {
        loadExternalContent('sidebar.html', 'sidebarContainer');
        loadExternalContent('topbar.html', 'topbarContainer');
    });