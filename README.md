Backend:
_______
Se ha utilizado nodemon para facilitar el reinicio automático del servidor en caso de cambios.
Axios se ha empleado para realizar solicitudes HTTP.
Cors se ha utilizado para permitir solicitudes de recursos desde diferentes orígenes en el servidor.

npm run dev


Frontend:
_______
Se ha creado el frontend con vite.
Para los estilos, se ha utilizado tailwind.
Se han instalado los paquetes necesarios con los comandos npm install react-router-dom, npm i react-icons y npm install --save react-spinners.

npm run dev

_______

Filtro y listado:

 - Input para filtrado por nombre de héroes, se valora la gestión de los eventos para minimizar las veces que se lanza el filtrado.
 - Botón editar, navegará a la página de edición mostrando los datos del héroe seleccionado.
 - Botón nuevo héroe, navegará a la página de creación de héroes.
 - El nombre de los héroes del filtrado debe mostrarse con la primera letra en mayúsculas.
 - Botón de borrar héroes, preguntará si se está seguro de que se desea borrar el héroe y, al confirmarlo, lo borrará.
   
Crear / Editar:

 - Formulario con los campos necesarios para la creación / edición.
 - Al crear/editar un héroe, navegar al listado de héroes.
 - El campo de nombre de los héroes debe mostrarse en mayúsculas.
   
Otros elementos:

 - Servicio: se permite tanto mockear los datos como la conexión con una API (real o) pero en caso de tener los datos en el servicio, se debe simular las llamadas a la API mediante observables.
 - Loader: Al obtener los datos se debe mostrar un loader informando al usuario de que los datos se están cargando.
 - Notificaciones: Al crear / modificar / eliminar un elemento o en caso de error, mostrar mensaje informativo al usuario.





