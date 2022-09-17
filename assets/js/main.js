/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");
/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== ACCORDION SKILLS ====================*/
const skillsContents = document.getElementsByClassName("skills__content"),
  skillsHeaders = document.getElementsByClassName("skills__header");

function toggleSkills() {
  const skillsContent = this.parentNode;
  const isOpen = this.parentNode.classList.contains("skills__open");
  for (const skillsContentItem of skillsContents) {
    skillsContentItem.classList.remove("skills__open");
  }

  if (!isOpen) {
    skillsContent.classList.add("skills__open");
  }
}

for (const skillsHeader of skillsHeaders) {
  skillsHeader.addEventListener("click", toggleSkills);
}

/*==================== PORTFOLIO SWIPER  ====================*/
let swiper = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,
  autoplay: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/*==================== TESTIMONIAL ====================*/

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");

    const currentSection = document.querySelector(
      `.nav__menu a[href*='${sectionId}']`
    );
    if (currentSection) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        currentSection.classList.add("active-link");
      } else {
        currentSection.classList.remove("active-link");
      }
    }
  });
}

window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");

  if (this.scrollY >= 80) {
    nav.classList.add("scroll-header");
  } else {
    nav.classList.remove("scroll-header");
  }
}

window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");

  if (this.scrollY >= 560) {
    scrollUp.classList.add("show-scroll");
  } else {
    scrollUp.classList.remove("show-scroll");
  }
}

window.addEventListener("scroll", scrollUp);
/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

const selectedTheme = localStorage.getItem("selected-item");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () => {
  document.body.classList.contains(darkTheme) ? "dark" : "light";
};

const getCurrentIcon = () => {
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";
};

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.body.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*==================== SHOW MESSAGE TOAST ====================*/
const buttonSubmit = document.querySelector(".button__submit");
const formContact = document.forms["contactForm"];

function showToast({
  title = "",
  description = "",
  type = "warning",
  duration = 5000,
}) {
  let toast = document.getElementById("toast");
  let toastChild = document.createElement("div");
  const delay = (duration / 1000).toFixed(2);

  toastChild.classList.add("toast", `toast--${type}`);
  toastChild.style.animation = `showToast ease .3s, hideToast linear 1s ${delay}s forwards`;

  let iconList = {
    success: "uil uil-check-circle",
    warning: "uil uil-exclamation-triangle",
    error: "fas fa-exclamation-triangle",
  };

  const autoRemoveToastId = setTimeout(() => {
    toast.removeChild(toastChild);
  }, duration + 1000);

  toastChild.onclick = function (e) {
    const classList = e.target.classList;
    if (classList.contains("toast__close") || classList.contains("fa-times")) {
      toast.removeChild(toastChild);
      clearTimeout(autoRemoveToastId);
    }
  };

  toastChild.innerHTML = `
        <div class="toast__icon toast__icon--${type}">
            <i class="${iconList[type]}"></i>
        </div>
        <div class="toast__message">
            <div class="message__title">
                ${title}
            </div>
            <div class="message__description">
                ${description}
            </div>
        </div>
        <div class="toast__close">
            <i class="uil uil-times"></i>
        </div>

    `;

  toast.appendChild(toastChild);
}

function showMessageToast(e) {
  if (
    formContact["name"].value === "" ||
    formContact["email"].value === "" ||
    formContact["message"].value === ""
  ) {
    return false;
  } else {
    e.preventDefault();
    let params = {
      user_id: "32KQ2oRJkRhXHzsCz",
      service_id: "service_ig7c1xa",
      template_id: "template_fkfnjzr",
      template_params: {
        from_name: formContact["name"].value,
        message: formContact["message"].value,
        email: formContact["email"].value,
      },
    };

    let headers = {
      "Content-type": "application/json",
    };

    let options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(params),
    };

    fetch("https://api.emailjs.com/api/v1.0/email/send", options)
      .then((httpResponse) => {
        if (httpResponse.ok) {
          showToast({
            title: "Success!",
            description: "Send message successfully.",
            type: "success",
            duration: 3000,
          });
          formContact["name"].value = "";
          formContact["email"].value = "";
          formContact["message"].value = "";
        } else {
          showToast({
            title: "Error!",
            description: "Send message failed. Please try again!",
            type: "error",
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        showToast({
          title: "Error!",
          description: `${error}`,
          type: "error",
          duration: 3000,
        });
      });
  }
}

buttonSubmit.addEventListener("click", showMessageToast);
