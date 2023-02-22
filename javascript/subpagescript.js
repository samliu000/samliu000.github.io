const backToTopBtn = document.getElementById("back-to-top");

backToTopBtn.onclick = () => {
  scrollToTop();
};
window.onscroll = () => {
  showBackToTopBtn();
};

function scrollToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function showBackToTopBtn() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    backToTopBtn.style.display = "block";
    backToTopBtn.classList.add("appear");
  } else {
    backToTopBtn.style.display = "none";
    backToTopBtn.classList.remove("appear");  }
}
