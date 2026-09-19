/* MedGuide Offline - Application Logic
   Fully offline educational clinical reference tool.
   Does NOT diagnose or prescribe.
*/

(function () {
  "use strict";

  // ---------- State ----------
  let currentPage = "diseases";
  let diseaseFilter = "All";
  let selectedSymptoms = new Set();
  let currentTheme = localStorage.getItem("medguide-theme") || "light";

  // ---------- DOM Helpers ----------
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // ---------- Theme ----------
  function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
    localStorage.setItem("medguide-theme", theme);
    const btn = $("#themeToggle");
    if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  // ---------- Navigation ----------
  function showPage(pageId) {
    currentPage = pageId;
    $$(".page").forEach(p => p.classList.remove("active"));
    const page = $(`#page-${pageId}`);
    if (page) page.classList.add("active");

    $$(".nav-links a").forEach(a => {
      a.classList.toggle("active", a.dataset.page === pageId);
    });

    // Close mobile menu
    const nav = $(".nav-links");
    if (nav) nav.classList.remove("open");

    // Reset scroll
    window.scrollTo(0, 0);

    // Initialize page-specific content if needed
    if (pageId === "diseases") renderDiseases();
    if (pageId === "drugs") renderDrugs();
    if (pageId === "symptoms") initSymptomExplorer();
  }

  // ---------- Search Utilities ----------
  function normalize(str) {
    return (str || "").toLowerCase().trim();
  }

  function matchesQuery(item, query, fields) {
    if (!query) return true;
    const q = normalize(query);
    return fields.some(f => {
      const val = item[f];
      if (Array.isArray(val)) return val.some(v => normalize(v).includes(q));
      return normalize(String(val)).includes(q);
    });
  }

  // ---------- Diseases ----------
  function getFilteredDiseases() {
    const query = ($("#diseaseSearch") || {}).value || "";
    return diseases.filter(d => {
      const systemOk = diseaseFilter === "All" || d.system === diseaseFilter;
      const searchOk = matchesQuery(d, query, [
        "name", "system", "description", "education", "aliases", "symptoms"
      ]);
      return systemOk && searchOk;
    });
  }

  function renderDiseases() {
    const grid = $("#diseaseGrid");
    if (!grid) return;

    const list = getFilteredDiseases();
    if (list.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1">
          <div class="icon">🔎</div>
          <p>No diseases found matching your search.</p>
        </div>`;
      return;
    }

    grid.innerHTML = list.map(d => `
      <article class="card" data-id="${d.id}" tabindex="0" role="button" aria-label="View details for ${escapeHtml(d.name)}">
        <div class="card-system">${escapeHtml(d.system)}</div>
        <h3 class="card-title">${escapeHtml(d.name)}</h3>
        <p class="card-desc">${escapeHtml(d.description)}</p>
        <div class="card-tags">
          ${(d.symptoms || []).slice(0, 4).map(s => `<span class="tag">${escapeHtml(s)}</span>`).join("")}
        </div>
      </article>
    `).join("");

    grid.querySelectorAll(".card").forEach(card => {
      card.addEventListener("click", () => openDiseaseModal(card.dataset.id));
      card.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openDiseaseModal(card.dataset.id);
        }
      });
    });
  }

  function openDiseaseModal(id) {
    const d = diseases.find(x => x.id === id);
    if (!d) return;

    const body = `
      <div class="card-system" style="margin-bottom:0.5rem">${escapeHtml(d.system)}</div>
      <p>${escapeHtml(d.description)}</p>

      ${d.aliases && d.aliases.length ? `
        <h4 class="section-title">Also known as</h4>
        <p>${d.aliases.map(a => escapeHtml(a)).join(", ")}</p>
      ` : ""}

      <h4 class="section-title">Common Symptoms</h4>
      <ul>${(d.symptoms || []).map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ul>

      ${d.redFlags && d.redFlags.length ? `
        <div class="red-flag-box">
          <strong>⚠️ Warning signs (seek urgent care if present):</strong>
          <ul style="margin:0.4rem 0 0;padding-left:1.2rem">
            ${d.redFlags.map(r => `<li>${escapeHtml(r)}</li>`).join("")}
          </ul>
        </div>
      ` : ""}

      <h4 class="section-title">Educational Information</h4>
      <p>${escapeHtml(d.education)}</p>

      ${d.relatedDrugClasses && d.relatedDrugClasses.length ? `
        <h4 class="section-title">Medicines / Classes Commonly Associated</h4>
        <div class="edu-note">
          Medicines commonly used in the management of this condition may include the following classes.
          Selection depends on the confirmed diagnosis, patient factors, contraindications, allergies,
          interactions, kidney/liver function, pregnancy status, severity, and clinical guidelines.
          This is educational information only — not a recommendation to take any specific medicine.
        </div>
        <ul>${d.relatedDrugClasses.map(c => `<li>${escapeHtml(c)}</li>`).join("")}</ul>
      ` : ""}

      <div class="edu-disclaimer" style="margin-top:1.25rem">
        This result is educational only and is not a medical diagnosis or treatment plan.
        Always consult a qualified healthcare professional.
      </div>
    `;

    openModal(d.name, body);
  }

  // ---------- Drugs ----------
  function getFilteredDrugs() {
    const query = ($("#drugSearch") || {}).value || "";
    return drugs.filter(d => matchesQuery(d, query, [
      "genericName", "drugClass", "therapeuticClass", "mechanismOfAction",
      "brandNames", "indications"
    ]));
  }

  function renderDrugs() {
    const grid = $("#drugGrid");
    if (!grid) return;

    const list = getFilteredDrugs();
    if (list.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1">
          <div class="icon">💊</div>
          <p>No medicines found matching your search.</p>
        </div>`;
      return;
    }

    grid.innerHTML = list.map(d => `
      <article class="card" data-id="${d.id}" tabindex="0" role="button" aria-label="View details for ${escapeHtml(d.genericName)}">
        <div class="card-system">${escapeHtml(d.drugClass)}</div>
        <h3 class="card-title">${escapeHtml(d.genericName)}</h3>
        <p class="card-desc">${escapeHtml((d.indications || []).slice(0, 2).join("; "))}</p>
        <div class="card-tags">
          <span class="tag">${escapeHtml(d.therapeuticClass)}</span>
          ${(d.brandNames || []).slice(0, 2).map(b => `<span class="tag">${escapeHtml(b)}</span>`).join("")}
        </div>
      </article>
    `).join("");

    grid.querySelectorAll(".card").forEach(card => {
      card.addEventListener("click", () => openDrugModal(card.dataset.id));
      card.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openDrugModal(card.dataset.id);
        }
      });
    });
  }

  function openDrugModal(id) {
    const d = drugs.find(x => x.id === id);
    if (!d) return;

    const section = (title, content) => {
      if (!content || (Array.isArray(content) && content.length === 0)) return "";
      if (Array.isArray(content)) {
        return `<h4 class="section-title">${title}</h4><ul>${content.map(c => `<li>${escapeHtml(c)}</li>`).join("")}</ul>`;
      }
      return `<h4 class="section-title">${title}</h4><p>${escapeHtml(content)}</p>`;
    };

    const body = `
      <p><strong>Pharmacological class:</strong> ${escapeHtml(d.drugClass)}</p>
      <p><strong>Therapeutic class:</strong> ${escapeHtml(d.therapeuticClass)}</p>
      ${d.brandNames && d.brandNames.length ? `<p><strong>Brand names (examples):</strong> ${d.brandNames.map(b => escapeHtml(b)).join(", ")}</p>` : ""}

      ${section("Mechanism of Action", d.mechanismOfAction)}
      ${section("Common Educational Indications", d.indications)}
      ${section("Contraindications", d.contraindications)}
      ${section("Important Adverse Effects", d.adverseEffects)}
      ${section("Important Drug Interactions", d.interactions)}
      ${section("Monitoring", d.monitoring)}
      ${section("Special Population Considerations", d.specialPopulations)}
      ${section("General Counseling Points", d.counseling)}

      <div class="edu-disclaimer" style="margin-top:1.25rem">
        This information is for educational purposes only. It does not constitute prescribing advice.
        Suitability of any medicine depends on individual patient factors and must be determined by a qualified clinician.
      </div>
    `;

    openModal(d.genericName, body);
  }

  // ---------- Symptom Explorer ----------
  const COMMON_SYMPTOMS = [
    "Headache", "Fever", "Cough", "Shortness of breath", "Chest pain",
    "Fatigue", "Nausea", "Vomiting", "Abdominal pain", "Diarrhea",
    "Constipation", "Dizziness", "Joint pain", "Muscle pain", "Rash",
    "Itching", "Sore throat", "Runny nose", "Nasal congestion", "Wheezing",
    "Blurred vision", "Increased thirst", "Frequent urination", "Weight loss",
    "Weight gain", "Swelling", "Burning with urination", "Back pain",
    "Confusion", "Palpitations", "Insomnia", "Anxiety", "Depressed mood"
  ];

  const EMERGENCY_SYMPTOMS = [
    "Severe difficulty breathing", "Severe chest pain", "Fainting",
    "Confusion", "Sudden weakness", "Difficulty speaking", "Blue lips or face",
    "Major bleeding", "Severe allergic reaction", "Thunderclap headache",
    "Loss of consciousness", "Suicidal thoughts"
  ];

  function initSymptomExplorer() {
    const container = $("#symptomChips");
    if (!container || container.dataset.ready) return;
    container.dataset.ready = "1";

    container.innerHTML = COMMON_SYMPTOMS.map(s => `
      <span class="chip" data-symptom="${escapeHtml(s)}" tabindex="0" role="checkbox" aria-checked="false">${escapeHtml(s)}</span>
    `).join("");

    container.querySelectorAll(".chip").forEach(chip => {
      const toggle = () => {
        const sym = chip.dataset.symptom;
        if (selectedSymptoms.has(sym)) {
          selectedSymptoms.delete(sym);
          chip.classList.remove("selected");
          chip.setAttribute("aria-checked", "false");
        } else {
          selectedSymptoms.add(sym);
          chip.classList.add("selected");
          chip.setAttribute("aria-checked", "true");
        }
      };
      chip.addEventListener("click", toggle);
      chip.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      });
    });
  }

  function runSymptomMatch() {
    const resultsEl = $("#symptomResults");
    const emergencyEl = $("#emergencyBanner");
    if (!resultsEl) return;

    // Check emergency flags from selected + explicit radio
    const hasEmergency = Array.from(selectedSymptoms).some(s =>
      EMERGENCY_SYMPTOMS.some(e => normalize(e).includes(normalize(s)) || normalize(s).includes(normalize(e)))
    ) || ($("input[name='emergency']:checked") || {}).value === "yes";

    if (emergencyEl) {
      emergencyEl.classList.toggle("show", hasEmergency);
    }

    if (selectedSymptoms.size === 0) {
      resultsEl.innerHTML = `
        <div class="empty-state">
          <div class="icon">🩺</div>
          <p>Select one or more symptoms to see educational matches.</p>
        </div>`;
      return;
    }

    // Score diseases by symptom overlap
    const selected = Array.from(selectedSymptoms).map(normalize);
    const scored = diseases.map(d => {
      const diseaseSymptoms = (d.symptoms || []).map(normalize);
      const matched = selected.filter(s =>
        diseaseSymptoms.some(ds => ds.includes(s) || s.includes(ds))
      );
      const score = matched.length;
      return { disease: d, score, matched };
    }).filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score);

    if (scored.length === 0) {
      resultsEl.innerHTML = `
        <div class="edu-disclaimer">
          This result is an educational symptom match and is not a medical diagnosis.
        </div>
        <div class="empty-state">
          <div class="icon">🔎</div>
          <p>No strong educational matches found for the selected symptoms in the local database.
          This does not mean nothing is wrong. Please consult a healthcare professional.</p>
        </div>`;
      return;
    }

    let html = `
      <div class="edu-disclaimer">
        <strong>This result is an educational symptom match and is not a medical diagnosis.</strong>
        Matches are ranked by simple overlap with the local educational database only.
        Many conditions share symptoms. Professional evaluation is required for diagnosis and care.
      </div>
    `;

    html += scored.slice(0, 12).map(({ disease: d, score, matched }) => `
      <div class="match-card">
        <div class="match-header">
          <span class="match-name" data-id="${d.id}" tabindex="0" role="button">${escapeHtml(d.name)}</span>
          <span class="match-score">${score} symptom${score > 1 ? "s" : ""} overlap</span>
        </div>
        <div class="match-symptoms">Overlapping: ${matched.map(m => escapeHtml(m)).join(", ")}</div>
        <div class="card-system" style="margin-top:0.35rem">${escapeHtml(d.system)}</div>
      </div>
    `).join("");

    resultsEl.innerHTML = html;

    resultsEl.querySelectorAll(".match-name").forEach(el => {
      el.addEventListener("click", () => openDiseaseModal(el.dataset.id));
      el.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openDiseaseModal(el.dataset.id);
        }
      });
    });
  }

  function resetSymptoms() {
    selectedSymptoms.clear();
    $$("#symptomChips .chip").forEach(c => {
      c.classList.remove("selected");
      c.setAttribute("aria-checked", "false");
    });
    const duration = $("input[name='duration']:checked");
    if (duration) duration.checked = false;
    const severity = $("input[name='severity']:checked");
    if (severity) severity.checked = false;
    const fever = $("input[name='fever']:checked");
    if (fever) fever.checked = false;
    const emergency = $("input[name='emergency']:checked");
    if (emergency) emergency.checked = false;
    const resultsEl = $("#symptomResults");
    if (resultsEl) resultsEl.innerHTML = "";
    const emergencyEl = $("#emergencyBanner");
    if (emergencyEl) emergencyEl.classList.remove("show");
  }

  // ---------- Modal ----------
  function openModal(title, bodyHtml) {
    const overlay = $("#modalOverlay");
    const titleEl = $("#modalTitle");
    const bodyEl = $("#modalBody");
    if (!overlay || !titleEl || !bodyEl) return;

    titleEl.textContent = title;
    bodyEl.innerHTML = bodyHtml;
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Focus close button for accessibility
    const closeBtn = $("#modalClose");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    const overlay = $("#modalOverlay");
    if (!overlay) return;
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // ---------- Utilities ----------
  function escapeHtml(str) {
    if (str == null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function buildSystemFilters() {
    const systems = ["All", ...new Set(diseases.map(d => d.system))].sort((a, b) => {
      if (a === "All") return -1;
      if (b === "All") return 1;
      return a.localeCompare(b);
    });
    const container = $("#systemFilters");
    if (!container) return;
    container.innerHTML = systems.map(s => `
      <button type="button" class="filter-btn${s === "All" ? " active" : ""}" data-system="${escapeHtml(s)}">${escapeHtml(s)}</button>
    `).join("");

    container.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        diseaseFilter = btn.dataset.system;
        container.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderDiseases();
      });
    });
  }

  // ---------- Event Binding ----------
  function bindEvents() {
    // Nav
    $$(".nav-links a").forEach(a => {
      a.addEventListener("click", e => {
        e.preventDefault();
        showPage(a.dataset.page);
      });
    });

    // Mobile menu
    const menuBtn = $("#menuToggle");
    if (menuBtn) {
      menuBtn.addEventListener("click", () => {
        $(".nav-links").classList.toggle("open");
      });
    }

    // Theme
    const themeBtn = $("#themeToggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        applyTheme(currentTheme === "dark" ? "light" : "dark");
      });
    }

    // Disease search
    const diseaseSearch = $("#diseaseSearch");
    if (diseaseSearch) {
      diseaseSearch.addEventListener("input", () => renderDiseases());
    }

    // Drug search
    const drugSearch = $("#drugSearch");
    if (drugSearch) {
      drugSearch.addEventListener("input", () => renderDrugs());
    }

    // Symptom actions
    const matchBtn = $("#runMatchBtn");
    if (matchBtn) matchBtn.addEventListener("click", runSymptomMatch);
    const resetBtn = $("#resetSymptomsBtn");
    if (resetBtn) resetBtn.addEventListener("click", resetSymptoms);

    // Modal close
    const closeBtn = $("#modalClose");
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    const overlay = $("#modalOverlay");
    if (overlay) {
      overlay.addEventListener("click", e => {
        if (e.target === overlay) closeModal();
      });
    }
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") closeModal();
    });
  }

  // ---------- Init ----------
  function init() {
    applyTheme(currentTheme);
    buildSystemFilters();
    bindEvents();
    showPage("diseases");
  }

  // Run when DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
