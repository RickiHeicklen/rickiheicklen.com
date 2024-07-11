// navbar.js
$(function(){
    // Function to set the active nav item
    function setActiveNavItem() {
      // $(".nav-item").each(function() {
      //   if (this.href === window.location.href) {
      //     $(this).css('text-decoration', 'underline'); // Underline the active item
      //   }
      // });
      const currentPath = window.location.pathname.split('/').pop(); // Get the current file name
      const links = document.querySelectorAll('#nav-placeholder a'); // Select all anchor tags in the navigation
      links.forEach(link => {
          if (link.getAttribute('href') === currentPath) {
              link.classList.add('active'); // Add 'active' class if the href matches the current path
          }
      });
    }
  
    // Check if the navbar is in sessionStorage
    let navbar = sessionStorage.getItem('navbar');
    if (navbar) {
      // If navbar is cached, use it
      $("#nav-placeholder").html(navbar);
      setActiveNavItem(); // Set active nav item
    } else {
      // If not cached, load it from nav.html
      $("#nav-placeholder").load("nav.html", function(response) {
        // Store the loaded navbar in sessionStorage
        sessionStorage.setItem('navbar', response);
        setActiveNavItem(); // Set active nav item
      });
    }
  });


  document.addEventListener('DOMContentLoaded', function() {
    fetch('header.html')
        .then(response => response.text())
        .then(html => {
            const headerNav = document.getElementById('header-nav');
            headerNav.innerHTML = html;
            setActiveLink(); // Call the function to set the active link
        })
        .catch(err => console.error('Failed to load header:', err));
});

function setActiveLink() {
    const currentPath = window.location.pathname.split('/').pop(); // Get the current file name
    const links = document.querySelectorAll('#header-nav a'); // Select all anchor tags in the navigation
    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active'); // Add 'active' class if the href matches the current path
        }
    });
}