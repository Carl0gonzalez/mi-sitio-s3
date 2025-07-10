document.addEventListener("DOMContentLoaded", () => {
  const ctaButton = document.getElementById("ctaButton");

  if (ctaButton) {
    ctaButton.addEventListener("click", (event) => {
      event.preventDefault(); // Evita el scroll instantáneo si el href es '#'
      alert("¡Gracias por tu interés en AWS S3! Hemos simulado un contacto.");
      console.log('Botón "Contáctanos Ahora" clicado');
    });
  }

  // Lógica para el carrusel de imágenes
  const galleryImages = document.querySelectorAll(".gallery-img");
  const prevButton = document.querySelector(".gallery-section .prev");
  const nextButton = document.querySelector(".gallery-section .next");
  let currentImageIndex = 0;

  function showImage(index) {
    galleryImages.forEach((img, i) => {
      img.classList.remove("active");
      if (i === index) {
        img.classList.add("active");
      }
    });
  }

  // Mostrar la primera imagen al cargar
  showImage(currentImageIndex);

  prevButton.addEventListener("click", () => {
    currentImageIndex--;
    if (currentImageIndex < 0) {
      currentImageIndex = galleryImages.length - 1;
    }
    showImage(currentImageIndex);
  });

  nextButton.addEventListener("click", () => {
    currentImageIndex++;
    if (currentImageIndex >= galleryImages.length) {
      currentImageIndex = 0;
    }
    showImage(currentImageIndex);
  });
});
