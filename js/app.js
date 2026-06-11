// All elements with a data-section attribute (navbar links + New Entry button)
const dataSections = document.querySelectorAll("[data-section]");

// Attach click listeners to all navigation triggers
function initNavigation() {
    dataSections.forEach((el) => el.addEventListener("click", navigateTo));
}

// Read data-section from clicked element and switch to that section
function navigateTo(e) {
    showSection(e.currentTarget.dataset.section);
}

// Read all form inputs and return a structured entry object
function getFormValues() {
    return {
        id: Date.now(),
        objectName: document.querySelector('#object-name').value,
        objectType: document.querySelector('#object-type').value,
        date: document.querySelector('#obs-date').value,
        notes: document.querySelector('#obs-notes').value,
        location: document.querySelector('#obs-location').value,
    };
}

// Handle form submission: save, re-render, navigate, clear
function initForm() {
    document.querySelector('#save-entry-btn').addEventListener('click', () => {
        const entry = getFormValues();
        saveEntry(entry);
        displayEntries();
        showSection('log');
        clearForm();
    });
}

// Clear all form fields after a successful save
function clearForm() {
    ['#object-name', '#object-type', '#obs-date', '#obs-notes', '#obs-location']
        .forEach((id) => document.querySelector(id).value = '');
}

// Hide all sections, then show the one matching the given id
function showSection(id) {
    document.querySelectorAll(".page-section")
        .forEach((section) => section.classList.remove("active"));
    document.querySelector(`#${id}`).classList.add("active");
}

// Append entry to existing localStorage array, or create array if none exists
function saveEntry(entry) {
    const arr = getEntries();
    arr.push(entry);
    localStorage.setItem('nexusEntries', JSON.stringify(arr));
}

// Return parsed entries array from localStorage, or empty array if none
function getEntries() {
    const entries = localStorage.getItem('nexusEntries');
    return entries ? JSON.parse(entries) : [];
}

// Clear grid and re-render all entries as cards from localStorage
function displayEntries() {
    const entryGrid = document.querySelector('#entries-grid');
    entryGrid.innerHTML = '';
    getEntries().forEach((entry) => {
        const div = document.createElement('div');
        div.classList.add('col-md-4');
        div.innerHTML = `
      <div class="card h-100">
        <div style="height: 200px; background: #111;"></div>
        <div class="card-body">
          <span class="badge mb-2">${entry.objectType}</span>
          <h5 class="card-title">${entry.objectName}</h5>
          <p class="card-text small">${entry.date}</p>
          <p class="card-text">${entry.notes}</p>
        </div>
      </div>
    `;
        entryGrid.appendChild(div);
    });
}

initNavigation();
initForm();
displayEntries();