const dataSections = document.querySelectorAll("[data-section]");

function initNavigation() {
    // Selects navbar links and the "New Entry" button; listen to click event
    dataSections.forEach((el) => el.addEventListener("click", navigateTo));
}

function navigateTo(e) {
    // Get the data-section attribute value
    const targetId = e.currentTarget.dataset.section;
    showSection(targetId);
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

        // Save the entry
        saveEntry(entry);
        // Display the cards
        displayEntries();
        // Switch back to log section
        showSection('log');

        console.log(entry);
        //   Clear entries after logging
        document.querySelector('#object-name').value = '';
        document.querySelector('#object-type').value = '';
        document.querySelector('#obs-date').value = '';
        document.querySelector('#obs-notes').value = '';
        document.querySelector('#obs-location').value = '';
    });
}

function showSection(id) {
    // Strips the active class, hiding them all
    document
        .querySelectorAll(".page-section")
        .forEach((section) => section.classList.remove("active"));
    // Show the form with id, add-entry and add "active" to make it visible
    document.querySelector(`#${id}`).classList.add("active");
}

function saveEntry(entry) {
    const entries = localStorage.getItem('nexusEntries');
    // If entries already exist, then parse else start empty
    const arr = entries ? JSON.parse(entries) : [];
    arr.push(entry);
    localStorage.setItem('nexusEntries', JSON.stringify(arr));
}

function getEntries() {
    const entries = localStorage.getItem('nexusEntries');
    return entries ? JSON.parse(entries) : [];
}

function displayEntries() {
    const entryGrid = document.querySelector('#entries-grid');
    entryGrid.innerHTML = '';
    const entries = getEntries();
    // Create a card for each entry
    entries.forEach((entry) => {
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
