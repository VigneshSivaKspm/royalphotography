// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Portfolio filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioGroups = document.querySelectorAll('.portfolio-category-group');
const viewAllBtns = document.querySelectorAll('.view-all-btn');

function showPortfolioGroup(category) {
    portfolioGroups.forEach(group => {
        // Hide all groups first
        group.classList.add('d-none');

        // Show the target group
        if (category === 'all') {
            if (group.getAttribute('data-category-group') === 'all') {
                group.classList.remove('d-none');
            }
        } else {
            if (group.getAttribute('data-category-group') === category) {
                group.classList.remove('d-none');
            }
        }

        // Reset 'View All' state for the shown group
        // If the group is shown, ensure 'short' is visible and 'all' is hidden,
        // and the view all button is visible.
        const short = group.querySelector('.portfolio-images-short');
        const all = group.querySelector('.portfolio-images-all');
        const viewAllBtn = group.querySelector('.view-all-btn'); // Get the button within THIS group

        if (short && all) {
            short.classList.remove('d-none'); // Ensure short is visible
            all.classList.add('d-none');    // Ensure all is hidden
        }
        if (viewAllBtn) {
            // Only show the "View All" button if there are more images in 'all' than in 'short'
            if (all && all.children.length > 0) {
                 viewAllBtn.style.display = 'block'; // Or 'inline-block' depending on your CSS
            } else {
                 viewAllBtn.style.display = 'none'; // Hide if no more images
            }
        }
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        const filterValue = this.getAttribute('data-filter');
        showPortfolioGroup(filterValue);
    });
});

// View All logic for each category
viewAllBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const target = this.getAttribute('data-target');
        const group = document.querySelector(`.portfolio-category-group[data-category-group='${target}']`);
        if (group) {
            const short = group.querySelector('.portfolio-images-short');
            const all = group.querySelector('.portfolio-images-all');
            
            if (short && all) {
                // DO NOT HIDE 'short'. Simply make 'all' visible.
                // The images in 'short' are already part of the full set.
                // short.classList.add('d-none'); // REMOVE THIS LINE
                all.classList.remove('d-none');
            }
            this.style.display = 'none'; // Hide the "View All" button after clicking
        }
    });
});

// Show only the 'all' group at first and initialize its state
// This function needs to be called AFTER all event listeners are set up
showPortfolioGroup('all');

// Optional: Add a "Show Less" button if you want to revert to 5 images
// This would involve creating a "Show Less" button in your HTML (initially hidden)
// and adding a similar event listener to it that toggles `d-none` on `portfolio-images-all`
// and shows `portfolio-images-short` again, and hides the "Show Less" button while showing "View All".
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
const customBudgetGroup = document.getElementById('customBudgetGroup') || document.getElementById('customBudgetWrap');
const customBudget = document.getElementById('customBudget');
if (weddingPackage) {
  weddingPackage.addEventListener('change', function() {
    if (this.value === 'Custom') {
      if (customBudgetGroup) customBudgetGroup.style.display = '';
      if (customBudget) customBudget.required = true;
    } else {
      if (customBudgetGroup) customBudgetGroup.style.display = 'none';
      if (customBudget) {
        customBudget.required = false;
        customBudget.value = '';
      }
    }
  });
}

// Show wedding-related fields only for Wedding or Pre-Wedding Concept
const eventType = document.getElementById('eventType');
const weddingPackageGroup = document.getElementById('weddingPackage').closest('.col-md-6.mb-4');
const sideGroup = document.getElementById('side').closest('.col-md-6.mb-4');
if (eventType && weddingPackageGroup && sideGroup) {
  function toggleWeddingFields() {
    const value = eventType.value;
    if (value === 'Wedding' || value === 'Pre-Wedding Concept') {
      weddingPackageGroup.style.display = '';
      sideGroup.style.display = '';
      if (weddingPackage) weddingPackage.required = true;
      if (document.getElementById('side')) document.getElementById('side').required = true;
    } else {
      weddingPackageGroup.style.display = 'none';
      sideGroup.style.display = 'none';
      if (weddingPackage) weddingPackage.required = false;
      if (document.getElementById('side')) document.getElementById('side').required = false;
      // Hide custom budget if visible
      if (customBudgetGroup) customBudgetGroup.style.display = 'none';
      if (customBudget) {
        customBudget.required = false;
        customBudget.value = '';
      }
    }
  }
  eventType.addEventListener('change', toggleWeddingFields);
  // Initial state
  toggleWeddingFields();
}