// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Portfolio filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Navbar visibility after hero section scroll
// Show navbar only after hero section is fully scrolled past
// This logic was previously inline in index.html

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero-section');
    function handleNavbar() {
        const heroBottom = hero.getBoundingClientRect().bottom;
        if (heroBottom <= 0) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }
    }
    window.addEventListener('scroll', handleNavbar);
    handleNavbar();
});

// Show custom budget only if 'Custom' is selected
const weddingPackage = document.getElementById('weddingPackage');
const customBudgetGroup = document.getElementById('customBudgetGroup');
const customBudget = document.getElementById('customBudget');
if (weddingPackage) {
  weddingPackage.addEventListener('change', function() {
    if (this.value === 'Custom') {
      customBudgetGroup.style.display = '';
      customBudget.required = true;
    } else {
      customBudgetGroup.style.display = 'none';
      customBudget.required = false;
      customBudget.value = '';
    }
  });
}