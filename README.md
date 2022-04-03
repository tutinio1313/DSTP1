<h1 style = "font-weight : bold"> Diseño de Sistemas : TP I - "Proyecto Banco de Sangre" </h1>

<h2>Problematica</h2>
<p>Se tiene un circulo de sangre RH Negativo donde se busca generar la autoprotección de los asociados, esto se genera mediante dos tipos de asociados, uno Activo (es el donante y debe estar entre los 18 y 56 años y sin enfermedades cronicas) y uno Pasivo (este recibirá la sangre donada), donde estos para pertenecer pagan una cuota mensual (donde la cuota varia por el tipo de asociado).

Para registrarse, se debe ingresar el DNI, nombre, apellido, fecha de nacimiento, domicilio, localidad, fecha de nacimiento, teléfono, email, grupo sanguíneo y factor, también deberá informar si posee alguna enfermedad cronica y medicación.

El banco de Sangre (es una institución que genera pedidos de donación para cubrir a algún socio del circulo) pide esporadicamente donaciones, cuando estos pedidos llegan se busca a los donantes activos que menos donaron, una persona queda excluida sí donó más de 2 veces en el año. Además el banco de sangre avisa semanalmente cuando los asociados que donaron.

Mensualmente se hace un listado de los asociados con cuotas no pagas, además gerencia cada cierto tiempo pide un listado de cuotas pagas mostrado porcentualmente y divido por categorias de asociados.
</p>

<h2>Requisitos Funcionales</h2>
  <ul>
    <li>El sistema debe emitir mensualmente las cuotas de asociados.</li>
    <li>El sistema debe permitir la gestión manual de los clientes.</li>
    <li>El sistema debe permitir la gestión manual de los pagos.</li>
    <li>El sistema debe permitir la gestión manual de los pedidos.</li>
    <li>El sistema debe permitir la gestión manual de los donaciones.</li>
    <li>El sistema debe generar un listado que tenga a los donantes ordenados de forma ascendente mediante sus donaciones.</li>
    <li>El sistema debe permitir la recepción de pedidos por parte de las entidades como banco de sangre. </li>
    <li>El sistema debe generar un listado de deudores. </li>
    <li>El sistema debe generar un listado del porcentaje de cuotas pagadas mensuales por categoría de socios.</li>  
</ul>

<h2>Diagrama de Clases</h2>
<img src="https://user-images.githubusercontent.com/43465958/161407748-ad0b3a75-8b5d-4e20-96f1-7f976afd292c.svg" alt="Diagrama de Clases">

<h2>Iteraciones</h2>
<p>Sí bien no se genera una estructura de entregas/versiones muy estructurada, tendemos cierto hilo conductor o guía para la construcción del proyecto, las cuales son las siguientes:</p>

<ul>
	<li>En la primer iteración se perseguirá la generación de una base solida para después trabajar, debido a que no se puede profundizar como por ejemplo el cambio automático del tipo de asociado, sí bien es una tarea no tan difícil de implementar, se debería de buscar los puntos más vitales del sistema,  como por ejemplo la gestión manual de los asociados, cuotas y pedidos y donaciones, también el almacenamiento de los mismos.</li>
	<li>En la segunda iteración se buscará como primer objetivo la corrección de errores o malentendidos que se pudo generar con los clientes (siempre enfocándonos en el funcionamiento y no en la interfaz propiamente) y después la implementación de automatizar procesos como el de generar un listado ordenado en función de los donantes de manera creciente donde se mostraran primero los que menos donaron, además se recibirán y quedan en un estado pendiente los pedidos de donación y un listado de deudores.</li>
	<li>En la tercer iteración se reiterará otro proceso que se puede ver en la segunda la cual es la satisfacción de la corrección de errores detectadas por el cliente, luego se buscará implementar una función más que es un listado de cuotas pagadas diferenciado por los clientes y mostrando el valor de modo bruto (es decir el numero sin más) y un valor porcentual que represente el mismo, más allá de esto se buscará además una estructura más estable y con mejor rendimiento y también una Interfaz grafica más amigable con el usuario.</li>	
</ul>

<p> Sí bien son unicamente tres iteraciones, buscamos hacer tres etapas con puntos delimitados pero con flexibilidad esto se puede ver en el feedback del cliente en cada iteración donde tendrá voz para cambiar cosas, sí bien ya se ha hecho un estudio de la empresa buscando los requerimientos de lo que debemos hacer, siempre pueden generarse diferentes requerimientos o cambiar debido a la naturaleza de las organizaciones humanas que se encuentran en un contexto dinámico.</p>
