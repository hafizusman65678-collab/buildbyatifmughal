// MedGuide Offline - Disease Database
// Educational reference only. Not for diagnosis or treatment decisions.

var diseases = window.diseases = [
  {
    id: "hypertension",
    name: "Hypertension",
    system: "Cardiovascular",
    aliases: ["High blood pressure", "HTN", "Essential hypertension"],
    symptoms: ["Headache", "Dizziness", "Blurred vision", "Chest pain", "Shortness of breath", "Nosebleeds", "Fatigue"],
    redFlags: ["Severe chest pain", "Sudden severe headache", "Confusion", "Difficulty speaking", "Sudden weakness", "Vision loss"],
    description: "Hypertension is a chronic condition in which the force of blood against artery walls is consistently too high. It is a major risk factor for heart disease, stroke, and kidney disease.",
    education: "Lifestyle measures (diet, exercise, weight management, reduced salt and alcohol) form the foundation of management. Drug therapy is selected based on comorbidities, age, and response. Regular monitoring of blood pressure is essential. This is educational information only.",
    relatedDrugClasses: ["ACE inhibitors", "ARBs", "Calcium channel blockers", "Thiazide diuretics", "Beta blockers"]
  },
  {
    id: "type-2-diabetes",
    name: "Type 2 Diabetes Mellitus",
    system: "Endocrine",
    aliases: ["T2DM", "Adult-onset diabetes", "Non-insulin dependent diabetes"],
    symptoms: ["Increased thirst", "Frequent urination", "Increased hunger", "Fatigue", "Blurred vision", "Slow-healing sores", "Unexplained weight loss", "Tingling in hands or feet"],
    redFlags: ["Very high blood sugar with confusion", "Severe dehydration", "Difficulty breathing", "Fruity-smelling breath", "Loss of consciousness"],
    description: "Type 2 diabetes is a metabolic disorder characterized by insulin resistance and relative insulin deficiency, leading to elevated blood glucose levels.",
    education: "Management focuses on lifestyle modification, blood glucose monitoring, and medications when needed. Individualized targets and therapy selection depend on many patient-specific factors. Educational reference only.",
    relatedDrugClasses: ["Biguanides", "SGLT2 inhibitors", "GLP-1 receptor agonists", "DPP-4 inhibitors", "Sulfonylureas", "Insulin"]
  },
  {
    id: "asthma",
    name: "Asthma",
    system: "Respiratory",
    aliases: ["Bronchial asthma", "Reactive airway disease"],
    symptoms: ["Wheezing", "Shortness of breath", "Chest tightness", "Coughing", "Difficulty breathing at night or early morning"],
    redFlags: ["Severe difficulty breathing", "Inability to speak full sentences", "Blue lips or face", "Extreme fatigue", "Confusion", "Rapid worsening"],
    description: "Asthma is a chronic inflammatory disorder of the airways characterized by reversible airflow obstruction, bronchial hyperresponsiveness, and airway inflammation.",
    education: "Treatment typically includes controller and reliever medications. Avoidance of triggers is important. Severe exacerbations require urgent medical care. This is not a treatment guide.",
    relatedDrugClasses: ["Inhaled corticosteroids", "Short-acting beta agonists", "Long-acting beta agonists", "Leukotriene receptor antagonists", "Anticholinergics"]
  },
  {
    id: "migraine",
    name: "Migraine",
    system: "Neurological",
    aliases: ["Migraine headache", "Common migraine", "Classic migraine"],
    symptoms: ["Throbbing headache", "Nausea", "Vomiting", "Sensitivity to light", "Sensitivity to sound", "Visual aura", "Fatigue"],
    redFlags: ["Sudden 'thunderclap' headache", "Headache with fever and stiff neck", "Headache after head injury", "New neurological deficits", "Worst headache of life"],
    description: "Migraine is a primary headache disorder characterized by recurrent moderate to severe headaches, often unilateral and pulsating, frequently accompanied by nausea and sensory sensitivities.",
    education: "Management may include acute therapies and preventive strategies. Identification of triggers is helpful. Urgent evaluation is needed for red-flag features. Educational information only.",
    relatedDrugClasses: ["Triptans", "NSAIDs", "Antiemetics", "Beta blockers", "Anticonvulsants", "CGRP antagonists"]
  },
  {
    id: "gerd",
    name: "Gastroesophageal Reflux Disease",
    system: "Gastrointestinal",
    aliases: ["GERD", "Acid reflux", "Heartburn", "Reflux esophagitis"],
    symptoms: ["Heartburn", "Regurgitation", "Chest pain", "Difficulty swallowing", "Chronic cough", "Hoarseness", "Sore throat"],
    redFlags: ["Difficulty swallowing solids or liquids", "Unintentional weight loss", "Vomiting blood", "Black stools", "Severe chest pain"],
    description: "GERD occurs when stomach contents reflux into the esophagus, causing symptoms and potentially esophageal injury.",
    education: "Lifestyle measures (weight loss, elevating head of bed, avoiding trigger foods) are first-line. Medications may be used for symptom control. Persistent or alarming symptoms require professional evaluation.",
    relatedDrugClasses: ["Proton pump inhibitors", "H2 receptor antagonists", "Antacids"]
  },
  {
    id: "osteoarthritis",
    name: "Osteoarthritis",
    system: "Musculoskeletal",
    aliases: ["Degenerative joint disease", "OA", "Wear-and-tear arthritis"],
    symptoms: ["Joint pain", "Stiffness", "Reduced range of motion", "Swelling", "Crepitus", "Joint instability"],
    redFlags: ["Sudden severe joint swelling", "Fever with joint pain", "Inability to bear weight", "Rapid progressive deformity"],
    description: "Osteoarthritis is a degenerative joint disease involving cartilage breakdown, bone remodeling, and inflammation, commonly affecting weight-bearing joints.",
    education: "Non-pharmacological approaches (exercise, weight management, physical therapy) are central. Analgesics may help symptoms. This is educational reference material only.",
    relatedDrugClasses: ["NSAIDs", "Acetaminophen", "Topical analgesics", "Intra-articular corticosteroids"]
  },
  {
    id: "depression",
    name: "Major Depressive Disorder",
    system: "Psychiatric",
    aliases: ["Clinical depression", "MDD", "Unipolar depression"],
    symptoms: ["Persistent low mood", "Loss of interest or pleasure", "Fatigue", "Sleep disturbance", "Appetite change", "Difficulty concentrating", "Feelings of worthlessness", "Thoughts of death"],
    redFlags: ["Suicidal thoughts or plans", "Severe functional impairment", "Psychotic features", "Manic symptoms"],
    description: "Major depressive disorder is a mood disorder characterized by persistent sadness, anhedonia, and associated cognitive and somatic symptoms that impair functioning.",
    education: "Treatment may involve psychotherapy, medications, or both. Immediate professional help is required for suicidal ideation. This tool provides educational information only and is not a crisis service.",
    relatedDrugClasses: ["SSRIs", "SNRIs", "Atypical antidepressants", "Tricyclic antidepressants"]
  },
  {
    id: "uti",
    name: "Urinary Tract Infection",
    system: "Genitourinary",
    aliases: ["UTI", "Bladder infection", "Cystitis", "Lower UTI"],
    symptoms: ["Burning with urination", "Frequent urination", "Urgent need to urinate", "Lower abdominal pain", "Cloudy urine", "Blood in urine", "Foul-smelling urine"],
    redFlags: ["Fever and chills", "Flank pain", "Nausea and vomiting", "Confusion (especially in older adults)", "Inability to urinate"],
    description: "Urinary tract infection is an infection involving any part of the urinary system, most commonly the bladder (cystitis).",
    education: "Antibiotics are often used for confirmed bacterial UTI. Choice depends on local resistance patterns, allergies, and severity. Seek care for suspected upper tract infection. Educational only.",
    relatedDrugClasses: ["Antibiotics (various classes)", "Urinary analgesics"]
  },
  {
    id: "hypothyroidism",
    name: "Hypothyroidism",
    system: "Endocrine",
    aliases: ["Underactive thyroid", "Myxedema"],
    symptoms: ["Fatigue", "Weight gain", "Cold intolerance", "Dry skin", "Constipation", "Hair loss", "Depression", "Muscle weakness", "Bradycardia"],
    redFlags: ["Severe lethargy", "Confusion", "Hypothermia", "Respiratory depression"],
    description: "Hypothyroidism is a condition in which the thyroid gland does not produce enough thyroid hormone, slowing metabolism.",
    education: "Levothyroxine replacement is the standard therapy when indicated. Dosing is individualized and monitored with laboratory tests. This is educational information.",
    relatedDrugClasses: ["Thyroid hormones"]
  },
  {
    id: "pneumonia",
    name: "Community-Acquired Pneumonia",
    system: "Respiratory",
    aliases: ["CAP", "Lung infection", "Pneumonia"],
    symptoms: ["Cough", "Fever", "Shortness of breath", "Chest pain", "Fatigue", "Sputum production", "Chills"],
    redFlags: ["Severe difficulty breathing", "Confusion", "Low blood pressure", "High respiratory rate", "Cyanosis", "Inability to take oral fluids"],
    description: "Community-acquired pneumonia is an infection of the lung parenchyma acquired outside of hospital settings.",
    education: "Antibiotic selection depends on severity, comorbidities, and local guidelines. Severe cases require urgent hospitalization. Educational reference only.",
    relatedDrugClasses: ["Antibiotics (various classes)", "Supportive care"]
  },
  {
    id: "anemia-iron",
    name: "Iron Deficiency Anemia",
    system: "Hematologic",
    aliases: ["IDA", "Iron deficiency"],
    symptoms: ["Fatigue", "Pallor", "Shortness of breath on exertion", "Dizziness", "Cold hands and feet", "Brittle nails", "Pica", "Restless legs"],
    redFlags: ["Severe shortness of breath at rest", "Chest pain", "Syncope", "Rapid heart rate with instability"],
    description: "Iron deficiency anemia results from insufficient iron for hemoglobin synthesis, leading to reduced oxygen-carrying capacity of the blood.",
    education: "Treatment involves addressing the underlying cause and iron replacement. Oral iron is common; intravenous iron may be used in selected cases. Professional evaluation is required.",
    relatedDrugClasses: ["Iron supplements"]
  },
  {
    id: "copd",
    name: "Chronic Obstructive Pulmonary Disease",
    system: "Respiratory",
    aliases: ["COPD", "Chronic bronchitis", "Emphysema"],
    symptoms: ["Chronic cough", "Sputum production", "Shortness of breath", "Wheezing", "Chest tightness", "Frequent respiratory infections", "Fatigue"],
    redFlags: ["Severe difficulty breathing", "Confusion", "Cyanosis", "Inability to speak", "Worsening edema"],
    description: "COPD is a progressive lung disease characterized by persistent airflow limitation, usually associated with smoking or other exposures.",
    education: "Smoking cessation is critical. Bronchodilators and other therapies may be used. Exacerbations often require intensification of therapy and medical review. Educational only.",
    relatedDrugClasses: ["Long-acting bronchodilators", "Inhaled corticosteroids", "Short-acting bronchodilators", "Phosphodiesterase-4 inhibitors"]
  },
  {
    id: "gout",
    name: "Gout",
    system: "Musculoskeletal",
    aliases: ["Gouty arthritis", "Podagra"],
    symptoms: ["Sudden severe joint pain", "Swelling", "Redness", "Warmth", "Limited movement", "Often affects big toe"],
    redFlags: ["Fever with joint symptoms", "Multiple joint involvement with systemic illness", "Inability to walk"],
    description: "Gout is an inflammatory arthritis caused by deposition of monosodium urate crystals in joints and soft tissues.",
    education: "Acute attacks are managed with anti-inflammatory agents. Long-term urate-lowering therapy may be indicated. Lifestyle measures help. Educational reference.",
    relatedDrugClasses: ["NSAIDs", "Colchicine", "Corticosteroids", "Xanthine oxidase inhibitors"]
  },
  {
    id: "allergic-rhinitis",
    name: "Allergic Rhinitis",
    system: "Respiratory",
    aliases: ["Hay fever", "Seasonal allergies", "Allergic rhinosinusitis"],
    symptoms: ["Sneezing", "Runny nose", "Nasal congestion", "Itchy nose", "Itchy eyes", "Watery eyes", "Postnasal drip"],
    redFlags: ["Severe facial pain", "Vision changes", "High fever", "Neck stiffness"],
    description: "Allergic rhinitis is an IgE-mediated inflammatory response of the nasal mucosa to inhaled allergens.",
    education: "Avoidance of allergens, intranasal corticosteroids, antihistamines, and other measures may be used. Severe or persistent symptoms warrant professional advice.",
    relatedDrugClasses: ["Intranasal corticosteroids", "Antihistamines", "Leukotriene receptor antagonists"]
  },
  {
    id: "ibs",
    name: "Irritable Bowel Syndrome",
    system: "Gastrointestinal",
    aliases: ["IBS", "Spastic colon"],
    symptoms: ["Abdominal pain", "Bloating", "Altered bowel habits", "Diarrhea", "Constipation", "Mucus in stool", "Relief with defecation"],
    redFlags: ["Unintentional weight loss", "Rectal bleeding", "Nocturnal symptoms", "Anemia", "Family history of colorectal cancer or IBD"],
    description: "IBS is a functional gastrointestinal disorder characterized by recurrent abdominal pain associated with altered bowel habits in the absence of structural disease.",
    education: "Management is symptom-directed and may include diet, lifestyle, and medications. Alarm features require investigation. Educational information only.",
    relatedDrugClasses: ["Antispasmodics", "Antidiarrheals", "Laxatives", "Certain antidepressants", "Secretagogues"]
  },
  {
    id: "ckd",
    name: "Chronic Kidney Disease",
    system: "Genitourinary",
    aliases: ["CKD", "Chronic renal failure", "Chronic kidney failure"],
    symptoms: ["Fatigue", "Swelling in legs or face", "Decreased urine output", "Nausea", "Itching", "Muscle cramps", "Shortness of breath", "Difficulty concentrating"],
    redFlags: ["Severe shortness of breath", "Chest pain", "Confusion", "Severe hyperkalemia symptoms", "Anuria"],
    description: "Chronic kidney disease is progressive loss of kidney function over months to years, classified by estimated GFR and albuminuria.",
    education: "Management aims to slow progression, treat complications, and prepare for kidney replacement therapy when needed. Many drugs require dose adjustment. Educational only.",
    relatedDrugClasses: ["ACE inhibitors", "ARBs", "SGLT2 inhibitors", "Phosphate binders", "Erythropoiesis-stimulating agents"]
  },
  {
    id: "heart-failure",
    name: "Heart Failure",
    system: "Cardiovascular",
    aliases: ["Congestive heart failure", "CHF", "HF"],
    symptoms: ["Shortness of breath", "Fatigue", "Leg swelling", "Orthopnea", "Paroxysmal nocturnal dyspnea", "Reduced exercise tolerance", "Cough", "Weight gain"],
    redFlags: ["Severe difficulty breathing at rest", "Chest pain", "Syncope", "Confusion", "Rapid weight gain with severe edema"],
    description: "Heart failure is a clinical syndrome resulting from structural or functional cardiac impairment that reduces the ability of the heart to fill or eject blood.",
    education: "Guideline-directed medical therapy and lifestyle measures form the basis of care. Acute decompensation requires urgent evaluation. This is educational material.",
    relatedDrugClasses: ["ACE inhibitors", "ARBs", "ARNIs", "Beta blockers", "Mineralocorticoid receptor antagonists", "SGLT2 inhibitors", "Diuretics"]
  },
  {
    id: "epilepsy",
    name: "Epilepsy",
    system: "Neurological",
    aliases: ["Seizure disorder", "Convulsive disorder"],
    symptoms: ["Recurrent seizures", "Aura", "Loss of consciousness", "Convulsions", "Staring spells", "Confusion after events", "Muscle stiffness or jerking"],
    redFlags: ["Prolonged seizure (>5 minutes)", "Repeated seizures without recovery", "Injury during seizure", "First seizure in adult", "Fever with seizure"],
    description: "Epilepsy is a chronic neurological disorder characterized by recurrent unprovoked seizures due to abnormal excessive neuronal activity.",
    education: "Antiseizure medications are selected based on seizure type, comorbidities, and other factors. Status epilepticus is a medical emergency. Educational reference only.",
    relatedDrugClasses: ["Anticonvulsants", "Benzodiazepines (acute)"]
  },
  {
    id: "psoriasis",
    name: "Psoriasis",
    system: "Dermatologic",
    aliases: ["Plaque psoriasis", "Psoriatic disease"],
    symptoms: ["Red scaly patches", "Itching", "Thickened skin", "Silvery scales", "Nail changes", "Joint pain (if psoriatic arthritis)"],
    redFlags: ["Widespread skin involvement with systemic symptoms", "Severe joint inflammation", "Signs of infection in lesions"],
    description: "Psoriasis is a chronic immune-mediated inflammatory skin disease characterized by well-demarcated erythematous plaques with silvery scale.",
    education: "Topical therapies, phototherapy, and systemic agents may be used depending on severity and extent. Comorbidities should be considered. Educational only.",
    relatedDrugClasses: ["Topical corticosteroids", "Vitamin D analogues", "Systemic immunosuppressants", "Biologics"]
  },
  {
    id: "anxiety",
    name: "Generalized Anxiety Disorder",
    system: "Psychiatric",
    aliases: ["GAD", "Anxiety disorder", "Chronic anxiety"],
    symptoms: ["Excessive worry", "Restlessness", "Fatigue", "Difficulty concentrating", "Irritability", "Muscle tension", "Sleep disturbance", "Feeling on edge"],
    redFlags: ["Panic attacks with chest pain or severe distress", "Suicidal thoughts", "Severe functional impairment"],
    description: "Generalized anxiety disorder involves persistent and excessive anxiety and worry about various domains that is difficult to control and associated with physical symptoms.",
    education: "Psychotherapy and medications can be effective. Acute severe distress may need urgent support. This tool is educational and not a substitute for professional care.",
    relatedDrugClasses: ["SSRIs", "SNRIs", "Buspirone", "Benzodiazepines (short-term)"]
  }
];
