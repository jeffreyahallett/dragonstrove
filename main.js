// For this tutorial on YT:
// https://youtu.be/V-CBdlfCPic

const navbar = document.querySelector(".navbar");
const scrollWatcher = document.createElement("div");

scrollWatcher.setAttribute("data-scroll-watcher", "");
navbar.before(scrollWatcher);

const navObserver = new IntersectionObserver(
  (entries) => {
    navbar.classList.toggle("sticking", !entries[0].isIntersecting);
  },
  { rootMargin: "50px 0px 0px 0px" }
);

navObserver.observe(scrollWatcher);


// Mobile navigation interactions
const mobileMenuIcon = document.getElementById('mobile-menu');
const mobileCloseIcon = document.getElementById('mobile-close');
const navItems = document.getElementById('nav-items-container');

mobileMenuIcon.addEventListener('click', function(){
  // console.log('cool broh clicked')
  // show the nav items
  navItems.style.display = 'block';
  
  // hide the menu icon
  mobileMenuIcon.style.display = 'none';
  
  // show the close icon
  mobileCloseIcon.style.display = 'block';

});

mobileCloseIcon.addEventListener('click', closeMenu)

function closeMenu(){
  // show the nav items
  navItems.style.display = 'none';
  
  // hide the menu icon
  mobileMenuIcon.style.display = 'block';
  
  // show the close icon
  mobileCloseIcon.style.display = 'none';
}


// allowing tapping outside of the menu to close the nav

// window.addEventListener('click', windowClick)

// function windowClick(event){
//     console.log(`great job, you clicked the window, broh`)
    
// }