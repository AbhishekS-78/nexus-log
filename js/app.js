const dataSections = document.querySelectorAll("[data-section]");

function initNavigation() {
  // Selects navbar links and the "New Entry" button; listen to click event
  dataSections.forEach((el) => el.addEventListener("click", navigateTo));
}

function navigateTo(e) {
  // Get the data-section attribute value
  const targetId = e.currentTarget.dataset.section;
  // Strips the active class, hiding them all
  document
    .querySelectorAll(".page-section")
    .forEach((section) => section.classList.remove("active"));

  // Show the form with id, add-entry and add "active" to make it visible
  document.querySelector(`#${targetId}`).classList.add("active");
}

initNavigation();
