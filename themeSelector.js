// initializing
let currentTheme = "daytime";

function setTheme(theme) {
    currentTheme = theme;
    document.body.className = theme;
    document.querySelector(".header-slide").className = `slide header-slide ${theme}`;
    document.getElementById("intro-text").style.display = "block";

    // active theme button
    document.querySelectorAll(".theme-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    scrollToQuiz();
}

// scrolls to quiz after changing themes
function scrollToQuiz() {
  quizContainer.scrollIntoView({ behavior: "smooth" });
}