document.addEventListener('DOMContentLoaded', function() {
    let currentMessage = 0; // Empezamos desde el primer mensaje

    function showNextMessage() {
        const messages = document.querySelectorAll('.message'); // Selecciona todos los divs con la clase "message"
        const totalMessages = messages.length;

        // Ocultar todos los mensajes
        messages.forEach(message => {
            message.style.display = 'none';
        });

        // Mostrar el siguiente mensaje
        currentMessage = (currentMessage + 1) % totalMessages; // Se asegura de que vuelva al primer mensaje después del último
        messages[currentMessage].style.display = 'block'; // Muestra el siguiente mensaje
    }

    // Asignamos el evento 'click' al botón para cambiar el contenido
    const nextButton = document.querySelector('#next-button');
    nextButton.addEventListener('click', showNextMessage); // Llamamos a showNextMessage al hacer clic en el botón
});

// Inicializar contador
let counter = 0;

// Referencia al botón y al valor del contador
const counterButton = document.querySelector('#counter-button');
const counterValue = document.querySelector('#counter-value');

// Incrementar contador al hacer clic
counterButton.addEventListener('click', function() {
    counter++; // Aumenta el contador
    counterValue.textContent = counter; // Actualiza el valor visible
});
