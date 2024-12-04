document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('click', () => {
      // Quitar enfoque previo
      document.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('active'));
  
      // Agregar clase activa a la tarjeta actual
      item.classList.add('active');
  
      // Centrar la tarjeta
      item.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    });
  });
  