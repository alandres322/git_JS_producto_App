
class Producto { // Se define una clase llamada Producto
    constructor(nombre, precio, año) { // Recibe tres parámetros
        this.nombre = nombre;
        this.precio = precio;
        this.año = año;
    }
} 

class Interfaz { // La clase Interfaz maneja la manipulación del DOM para agregar, eliminar productos y restablecer el formulario.
    addProductos(producto) { // El metodo agrega un producto a la interfaz de usuario, es decir, mostrarlo en la lista de productos dentro del documento HTML
        const listProductos = document.getElementById("lista-productos"); // Obtiene el elemento HTML donde se mostrarán los productos
        const elemento = document.createElement("div"); // Crea un nuevo elemento HTML'div' en la memoria del navegador
        // Este código se insertará en el div creado previamente y luego se agregará a la lista de productos
        elemento.innerHTML = ` 
            <div class="card text-center mb-4"> 
                <div class="card-body"> 
                    <strong>Producto Nombre</strong>: ${producto.nombre} 
                    <strong>Producto Precio</strong>: ${producto.precio}
                    <strong>Producto Año</strong>: ${producto.año}
                    <a href="#" class="btn btn-danger" name="borrar">Borrar</a> 
                </div>
            </div>
        `;
        // Toma el div creado y lo coloca dentro del contenedor listProductos en el HTML- Esto hace que el producto aparezca en la lista visualmente
        listProductos.appendChild(elemento); 
    }
    resetForm() {
        document.getElementById("form_productos").reset(); 
    }   
    // 
    borrarProductos(elemento) { // Recibe un elemento como parámetro, este elemento es el botón "Borrar"
        if (elemento.name === "borrar") {
            elemento.parentElement.parentElement.remove(); // elemento es el botón <a> dentro del div.card-body 
                                                           // elemento.parentElement sube un nivel, seleccionando el div.card-body
            this.mostrarMensaje("Producto eliminado Satisfactoriamente");        
        
        }
    }
    // Definición de la función mostrarMensaje
    // Recibe dos parámetros:
    mostrarMensaje(message, cssClass) {
        const div = document.createElement("div"); // Se crea un nuevo elemento div, que servirá para contener el mensaje
        div.className = `alert alert-${cssClass} mt-3 `; // Añade clases CSS al div - (`${}`) para agregar dinámicamente la clase alert-${cssClass}.
                                                        // Si cssClass es "success", la clase será "alert alert-success mt-3"
        div.style.fontSize = "13px";  // Se establece un tamaño de fuente de 24 píxeles para que el mensaje sea más grande.
        div.style.fontWeight = "bold";  // Opcional: hacer el texto más grueso
        div.style.color = "red"; // Establece el color de fuente en rojo
        div.appendChild(document.createTextNode(message)); // Crea un nodo de texto con el mensaje, Luego, appendChild(...) lo agrega dentro del div.
        
        //Mostrar en DOM 
        const container = document.querySelector(".container");
        const app = document.querySelector("#App");

        // Insertar Mensaje en la interfaz
        container.insertBefore(div, app);

        // Remover el mensaje despues de 3 segundos
        setTimeout(() => {
            div.remove();
        }, 3000);
    }
}
                    
// DOM Eventos
// Selecciona el formulario con el ID form_productos y Captura el evento submit cuando el formulario se envía
document.getElementById("form_productos").addEventListener("submit", function (e) {
    
    // Obtener valor del formulario
    const nombre = document.getElementById("nombre").value; 
    const precio = document.getElementById("precio").value;
    const año = document.getElementById("año").value;

    // Crear un nuevo producto objeto
    const producto = new Producto(nombre, precio, año);
    
    const interfaz = new Interfaz();

     // Validacion del usuario, campo de entrada 
    if (nombre === "" || precio === "" || año === "") {
        return interfaz.mostrarMensaje("Por favor inserte datos en todos los campos", "success");

    }

    interfaz.addProductos(producto);

    interfaz.mostrarMensaje("Producto agregado Satisfactoriamente", "success");

    interfaz.resetForm();

    // Detiene el envío del formulario para que no recargue la página
    e.preventDefault();
}); 

document.getElementById("lista-productos").addEventListener("click", (e) => {
    const interfaz = new Interfaz();
    interfaz.borrarProductos(e.target);
    e.preventDefault();
});
