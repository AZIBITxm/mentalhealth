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
        const hamburgerIcon = document.getElementById('hamburger-icon');
        
        // Funkcja otwierania menu
        function openMobileMenu() {
          if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('hidden');
            // Trigger reflow for animation
            mobileMenuOverlay.offsetHeight;
            mobileMenuOverlay.classList.remove('translate-x-full');
            mobileMenuOverlay.classList.add('translate-x-0');
            document.body.style.overflow = 'hidden';
            
            // Animacja hamburgera na X
            if (hamburgerIcon) {
              hamburgerIcon.classList.add('hamburger-to-x');
            }
            
            // Animacja elementów menu
            setTimeout(() => {
              const menuItems = mobileMenuOverlay.querySelectorAll('.menu-item');
              menuItems.forEach(item => {
                item.classList.add('animate');
              });
            }, 200);
          }
        }
        
        // Funkcja zamykania menu
        function closeMobileMenu() {
          if (mobileMenuOverlay) {
            // Usuń animację z elementów menu
            const menuItems = mobileMenuOverlay.querySelectorAll('.menu-item');
            menuItems.forEach(item => {
              item.classList.remove('animate');
            });
            
            // Animacja hamburgera z powrotem
            if (hamburgerIcon) {
              hamburgerIcon.classList.remove('hamburger-to-x');
            }
            
            mobileMenuOverlay.classList.remove('translate-x-0');
            mobileMenuOverlay.classList.add('translate-x-full');
            setTimeout(() => {
              mobileMenuOverlay.classList.add('hidden');
            }, 500);
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
