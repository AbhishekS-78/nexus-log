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

function getFormValues() {
    return {
      id: Date.now(),
      objectName: document.querySelector('#object-name').value,
      objectType: document.querySelector('#object-type').value,
      date: document.querySelector('#obs-date').value,
      notes: document.querySelector('#obs-notes').value,
      location: document.querySelector('#obs-location').value,
    }
}

function initForm() {
  document.querySelector('#save-entry-btn').addEventListener('click', () => {
    const entry = getFormValues();
    console.log(entry);
  //   Clear entries after logging
    document.querySelector('#object-name').value = '';
    document.querySelector('#object-type').value = '';
    document.querySelector('#obs-date').value = '';
    document.querySelector('#obs-notes').value = '';
    document.querySelector('#obs-location').value = '';
  });
}

initNavigation();
initForm();
