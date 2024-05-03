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