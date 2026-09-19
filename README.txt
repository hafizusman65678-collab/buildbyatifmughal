MedGuide Offline
================
Educational clinical reference website — fully offline.

IMPORTANT SAFETY NOTICE
-----------------------
This website is for educational purposes only.
It does NOT diagnose disease or prescribe treatment.
Do not start, stop, or change any medication based solely on this tool.
Always consult a qualified healthcare professional for diagnosis and treatment decisions.


HOW TO RUN (OFFLINE)
--------------------
1. Extract this ZIP to any folder on your computer, phone, or tablet.
2. Open the file "index.html" in a modern web browser
   (Chrome, Firefox, Edge, Safari, Opera, etc.).
3. No internet connection, server, or installation is required.
4. Everything runs locally from the extracted files.


FEATURES
--------
• Disease Search
  - Search by name, aliases, symptoms, body system, or keywords
  - Filter by body system
  - View description, symptoms, warning signs, educational notes,
    and related medicine classes

• Educational Symptom Explorer
  - Select multiple symptoms
  - Optional questions about duration, severity, fever, and emergency signs
  - See possible educational matches ranked by symptom overlap
  - Clear labeling that results are NOT a diagnosis
  - Prominent emergency warning when red-flag symptoms are indicated

• Drug Reference
  - Search by generic name, brand name, class, or indication
  - View mechanism, indications, contraindications, adverse effects,
    interactions, monitoring, special-population notes, and counseling points

• Dark mode toggle (preference saved in browser local storage)
• Responsive layout for desktop and mobile
• Keyboard accessible
• No external dependencies (no CDN, no APIs, no online fonts)


PROJECT STRUCTURE
-----------------
index.html          Main page
styles.css          All styles (including dark mode)
app.js              Application logic
data/diseases.js    Disease database (JavaScript array)
data/drugs.js       Medicine database (JavaScript array)
README.txt          This file


HOW TO ADD A NEW DISEASE
------------------------
1. Open data/diseases.js in a text editor.
2. Copy an existing disease object and paste it inside the "diseases" array.
3. Fill in the fields:

   {
     id: "unique-kebab-case-id",
     name: "Official name",
     system: "Body system (e.g. Cardiovascular)",
     aliases: ["Alternative name 1", "Abbreviation"],
     symptoms: ["Symptom 1", "Symptom 2"],
     redFlags: ["Emergency symptom 1"],
     description: "Short plain-language description.",
     education: "Educational notes about management principles. Emphasize that selection depends on many factors.",
     relatedDrugClasses: ["Class A", "Class B"]
   }

4. Save the file and reload index.html in the browser.
5. Keep language educational — never instruct the user to take a specific drug.


HOW TO ADD A NEW MEDICINE
-------------------------
1. Open data/drugs.js in a text editor.
2. Copy an existing drug object and paste it inside the "drugs" array.
3. Fill in the fields:

   {
     id: "unique-kebab-case-id",
     genericName: "Generic name",
     brandNames: ["Brand1", "Brand2"],
     drugClass: "Pharmacological class",
     therapeuticClass: "Therapeutic class",
     mechanismOfAction: "How it works…",
     indications: ["Educational indication 1"],
     contraindications: ["…"],
     adverseEffects: ["…"],
     interactions: ["…"],
     monitoring: ["…"],
     specialPopulations: "Notes for pregnancy, elderly, renal/hepatic impairment, etc.",
     counseling: "Key points a patient might be told (educational)."
   }

4. Save and reload the page.


TECHNICAL NOTES
---------------
• Pure HTML5 + CSS3 + Vanilla JavaScript
• No frameworks, no build step, no package manager
• Works when opened directly as a file (file:// protocol)
• Data is stored as JavaScript variables for maximum compatibility offline
• Theme preference uses localStorage (optional; site still works if storage is blocked)


LICENSE / USE
-------------
Intended for personal educational use and offline reference.
Not a medical device. Not for clinical decision support in patient care.


VERSION
-------
Sample database included with common conditions and medicines for demonstration.
Expand the data files as needed for your learning goals.
