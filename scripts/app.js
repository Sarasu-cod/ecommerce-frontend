const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
    if (navMenu.style.display === "block") {
        navMenu.style.display === "none"; 
    } else {
        navMenu.style.display = "block";
    }
});