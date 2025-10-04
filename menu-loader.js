// Dynamiczne ładowanie menu.html do kontenera o id 'menu-container' na każdej stronie
window.addEventListener('DOMContentLoaded', function() {
  var menuContainer = document.getElementById('menu-container');
  if (menuContainer) {
    fetch('/menu.html')
      .then(response => response.text())
      .then(html => {
        menuContainer.innerHTML = html;
      });
  }
});
