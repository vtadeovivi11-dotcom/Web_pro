// Configuración principal y Estado
document.addEventListener('DOMContentLoaded', () => {
  console.log('App initialization...');
  
  // 1. Manejo de formulario de perfil simulado (en sobre.html)
  const profileForm = document.getElementById('profile-form');
  
  if (profileForm) {
    loadProfileData();
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      saveProfileData();
    });
  }

  // 2. Manejo de formulario de contacto (en contacto.html)
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button');
      const originalText = btn.innerText;
      btn.innerText = 'Enviando...';
      
      // Simulando envío
      setTimeout(() => {
        btn.innerText = '¡Mensaje Enviado!';
        btn.style.background = 'var(--accent-magenta)';
        contactForm.reset();
        
        setTimeout(() => {
          btn.innerText = originalText;
          btn.style.background = ''; // Volver al gradient de clase css
        }, 3000);
      }, 1500);
    });
  }
});

// Guardar datos en LocalStorage
function saveProfileData() {
  const nombre = document.getElementById('input-nombre').value;
  const profesion = document.getElementById('input-profesion').value;
  const bio = document.getElementById('input-bio').value;

  const profileData = { nombre, profesion, bio };
  localStorage.setItem('userProfile', JSON.stringify(profileData));

  // Actualizar la interfaz (Visual feedback)
  updateProfileUI(profileData);
  
  const btn = document.querySelector('#profile-form button[type="submit"]');
  btn.innerText = '✓ Guardado correctamente';
  setTimeout(() => btn.innerText = 'Guardar Cambios', 2000);
}

// Cargar datos del LocalStorage al iniciar
function loadProfileData() {
  const data = localStorage.getItem('userProfile');
  if (data) {
    const profileData = JSON.parse(data);
    
    // Rellenar form
    if(document.getElementById('input-nombre')) document.getElementById('input-nombre').value = profileData.nombre;
    if(document.getElementById('input-profesion')) document.getElementById('input-profesion').value = profileData.profesion;
    if(document.getElementById('input-bio')) document.getElementById('input-bio').value = profileData.bio;
    
    // Actualizar UI
    updateProfileUI(profileData);
  }
}

// Actualizar textos en la pantalla (Sidebar del perfil)
function updateProfileUI(data) {
  const uiNombre = document.getElementById('ui-nombre');
  const uiProfesion = document.getElementById('ui-profesion');
  const uiBio = document.getElementById('ui-bio');

  if(uiNombre) uiNombre.innerText = data.nombre || 'Tu Nombre';
  if(uiProfesion) uiProfesion.innerText = data.profesion || 'Tu Profesión';
  if(uiBio) uiBio.innerText = data.bio || 'Una pequeña biografía sobre ti y tus metas...';
}
