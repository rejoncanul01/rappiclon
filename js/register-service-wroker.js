<script>
        if ('ServiceWorker' in navigator) {
            navigator.ServiceWorker.register('js/service-worker.js')
                .then(registration => console.log('Service Worker registrado con exito:', registration))
                .catch(error => console.error('Error al registrar el service worker', error));
        }
  </script>
