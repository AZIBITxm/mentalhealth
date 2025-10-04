// Dynamiczne ładowanie menu.html do kontenera o id 'menu-container' na każdej stronie
window.addEventListener('DOMContentLoaded', function() {
  var menuContainer = document.getElementById('menu-container');
  if (menuContainer) {
    fetch('/menu.html')
      .then(response => response.text())
      .then(html => {
        menuContainer.innerHTML = html;

        // Obsługa menu mobilnego
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
        const mobileMenuClose = document.getElementById('mobile-menu-close');
        
        // Funkcja otwierania menu
        function openMobileMenu() {
          if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('hidden');
            // Trigger reflow for animation
            mobileMenuOverlay.offsetHeight;
            mobileMenuOverlay.classList.remove('opacity-0');
            mobileMenuOverlay.classList.add('opacity-100');
            document.body.style.overflow = 'hidden';
          }
        }
        
        // Funkcja zamykania menu
        function closeMobileMenu() {
          if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('opacity-100');
            mobileMenuOverlay.classList.add('opacity-0');
            setTimeout(() => {
              mobileMenuOverlay.classList.add('hidden');
            }, 300);
            document.body.style.overflow = '';
          }
        }
        
        // Event listeners
        if (mobileMenuBtn) {
          mobileMenuBtn.addEventListener('click', openMobileMenu);
        }
        
        if (mobileMenuClose) {
          mobileMenuClose.addEventListener('click', closeMobileMenu);
        }
        
        // Zamknij menu po kliknięciu w link
        if (mobileMenuOverlay) {
          const menuLinks = mobileMenuOverlay.querySelectorAll('a');
          menuLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
          });
        }
        
        // Zamknij menu po kliknięciu w tło (opcjonalnie)
        if (mobileMenuOverlay) {
          mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
              closeMobileMenu();
            }
          });
        }
      })
      .catch(error => {
        console.error('Błąd ładowania menu:', error);
      });
  }
});
