const backToTopBtn = document.getElementById("back-to-top");

backToTopBtn.onclick = () => {
  scrollToTop();
};
window.onscroll = () => {
  showBackToTopBtn();
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showBackToTopBtn() {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    backToTopBtn.style.display = "block";
    backToTopBtn.classList.add("appear");
  } else {
    backToTopBtn.style.display = "none";
    backToTopBtn.classList.remove("appear");
  }
}
