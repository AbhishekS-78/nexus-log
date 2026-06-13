// All elements with a data-section attribute (navbar links + New Entry button)
const dataSections = document.querySelectorAll("[data-section]");
const API_KEY = 'z32DB3PKfhVuRYd0KOskotkHIBBW0fC8IjgVMzd9';

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
    document.querySelector('#save-entry-btn').addEventListener('click', async () => {
        const entry = getFormValues();
        await saveEntry(entry);
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
    // Show hero banner on log view, hide it on all other sections
    document.querySelector('#hero-banner').classList.toggle('d-none', id !== 'log');

    // Deactivate all sections, then activate the target
    document.querySelectorAll(".page-section")
        .forEach((section) => section.classList.remove("active"));
    document.querySelector(`#${id}`).classList.add("active");
}

// Append entry to existing localStorage array, or create array if none exists
async function saveEntry(entry) {
    const arr = getEntries();
    const APODData = await fetchAPOD(entry.date);
    // Append the APOD data to the entry
    entry = {...entry, ...APODData};
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

    const entries = getEntries();

    // If the entries are empty, hide the cards
    if (entries.length === 0) {
        document.querySelector('#no-entries').classList.remove('d-none');
    } else {
        document.querySelector('#no-entries').classList.add('d-none');

        entries.forEach((entry) => {
            const div = document.createElement('div');
            div.classList.add('col-md-4');
            div.dataset.id = entry.id;
            div.innerHTML = `
      <div class="card h-100">
        ${entry.imageUrl && !entry.imageUrl.includes('youtube') ?
                // Handles if the URL contains YouTube and not the image
                `<img src="${entry.imageUrl}" alt="${entry.title}" style="width:100%; height:200px; object-fit:cover;"/>` :
                `<div style="height:200px; background:#111"></div>`}
        <div class="card-body">
          <span class="badge mb-2">${entry.objectType}</span>
          <h5 class="card-title">${entry.objectName}</h5>
          <p class="card-text small">${entry.date}</p>
          <p class="card-text">${entry.notes}</p>
        </div>
      </div>
    `;
            div.addEventListener('click', renderCard);
            entryGrid.appendChild(div);
        });
    }
}

function renderCard(e) {
    const entryId = e.currentTarget.dataset.id;
    const entry = getEntries().find((e) => e.id === Number(entryId));

    if (entry) {
        showSection('entry-detail');
        document.querySelector('#entry-detail-container').innerHTML = `
      <!-- Full-width APOD image -->
      ${entry.imageUrl && !entry.imageUrl.includes('youtube')
            ? `<img src="${entry.imageUrl}" alt="${entry.title}"
            style="width:100%; height:420px; object-fit:cover; display:block;"/>`
            : `<div style="height:420px; background:#111;"></div>`
        }

      <div class="container py-5">

        <!-- Back button -->
        <button class="btn btn-outline-secondary btn-sm mb-5 ls-wide text-uppercase"
          onclick="showSection('log')">
          Back to Timeline
        </button>

        <!-- Object name& type -->
        <div class="d-flex align-items-center gap-3 mb-2">
          <span class="badge">${entry.objectType}</span>
          <h1 class="detail-title mb-0">${entry.objectName}</h1>
        </div>

        <!-- Date& location -->
        <p class="detail-meta mb-5">
          ${entry.date}
          ${entry.location ? `&nbsp;·&nbsp;${entry.location}` : ''}
        </p>

        <!-- User notes -->
        <div class="detail-notes mb-5">
          <p class="section-label mb-2">Observer Notes</p>
          <p class="detail-notes-text">${entry.notes}</p>
        </div>

        <hr class="detail-divider mb-5" />

        <!-- APOD section -->
        <p class="section-label mb-2">NASA: Astronomy Picture of the Day</p>
        <h4 class="detail-apod-title mb-3">${entry.title ?? 'Unavailable'}</h4>
        <p class="detail-apod-explanation">${entry.explanation ?? 'No data fetched for this date.'}</p>
      </div>
    `;
    }
}

// Fetch NASA APOD API Data to display APOD
async function fetchAPOD(date) {
    try {
        const APODRes = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`);
        const APOD = await APODRes.json();
        return {
            imageUrl: APOD.url,
            title: APOD.title,
            explanation: APOD.explanation
        };
    } catch (err) {
        console.error('APOD fetch failed:', err);
        return {imageUrl: null, title: null, explanation: null};
    }
}

initNavigation();
initForm();
displayEntries();
