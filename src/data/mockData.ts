export type DeviceSpec = {
  label: string;
  value: string;
};

export type Device = {
  id: string;
  name: string;
  category: string;
  description: string;
  city: string;
  pricePerDay: number;
  rating: number;
  reviews: number;
  availability: string;
  tags: string[];
  image: string;
  highlights: string[];
  specs: DeviceSpec[];
};

export const deviceCatalog: Device[] = [
  {
    id: "DEV-001",
    name: "GE Carescape R860 Ventilator",
    category: "Respiratory",
    description:
      "AI-assisted ventilation with advanced lung protection modes, ideal for ICU setups and critical care wards.",
    city: "Mumbai",
    pricePerDay: 3200,
    rating: 4.9,
    reviews: 182,
    availability: "Same-day dispatch",
    image:
      "https://images.unsplash.com/photo-1586776977607-310e9c725c37?auto=format&fit=crop&w=800&q=60",
    tags: ["ICU ready", "Smart alarms", "Remote monitoring"],
    highlights: [
      "Adaptive Support Ventilation",
      "SpO₂ & EtCO₂ integrated",
      "NABL-certified maintenance",
    ],
    specs: [
      { label: "Modes", value: "AC, SIMV, CPAP, APRV" },
      { label: "Power backup", value: "6 hours" },
      { label: "Warranty", value: "12 months" },
    ],
  },
  {
    id: "DEV-002",
    name: "Philips Intellivue MX550 Monitor",
    category: "Monitoring",
    description:
      "12-inch touchscreen monitor with predictive analytics for vitals and smart sepsis alerts.",
    city: "Bengaluru",
    pricePerDay: 1450,
    rating: 4.7,
    reviews: 134,
    availability: "Ships in 2 hours",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=60",
    tags: ["Touchscreen", "Telemetry", "Battery backup"],
    highlights: [
      "Integrated HL7 data export",
      "12-lead ECG module included",
      "24/7 remote support",
    ],
    specs: [
      { label: "Parameters", value: "ECG, IBP, NIBP, SpO₂, TEMP" },
      { label: "Screen", value: "12.1” capacitive" },
      { label: "Battery", value: "4.5 hours" },
    ],
  },
  {
    id: "DEV-003",
    name: "Smiths Medical Syringe Pump",
    category: "Infusion",
    description:
      "Precision syringe pump for neonatal and adult infusions with occlusion detection and audit trail.",
    city: "Delhi",
    pricePerDay: 520,
    rating: 4.6,
    reviews: 98,
    availability: "Delivery within 6 hours",
    image:
      "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?auto=format&fit=crop&w=800&q=60",
    tags: ["Neonatal safe", "Audit log", "Compact"],
    highlights: [
      "Dose error reduction software",
      "Digital logs for NABH compliance",
      "Includes three sterile syringes",
    ],
    specs: [
      { label: "Flow range", value: "0.01 - 2100 ml/h" },
      { label: "Accuracy", value: "±2%" },
      { label: "Alarms", value: "Occlusion, end, near-empty" },
    ],
  },
  {
    id: "DEV-004",
    name: "BPL EVE-NXT Oxygen Concentrator",
    category: "Respiratory",
    description:
      "5L portable oxygen concentrator with dual outlets and IoT analytics on oxygen purity in real time.",
    city: "Hyderabad",
    pricePerDay: 780,
    rating: 4.8,
    reviews: 210,
    availability: "Next-morning delivery",
    image:
      "https://images.unsplash.com/photo-1504439904031-93ded9f93e3c?auto=format&fit=crop&w=800&q=60",
    tags: ["Portable", "Dual patient", "Noise-free"],
    highlights: [
      "96% purity assurance",
      "HEPA + bacterial filters",
      "Remote uptime tracking",
    ],
    specs: [
      { label: "Purity", value: "93% ± 3%" },
      { label: "Flow", value: "0.5 - 5 LPM" },
      { label: "Noise", value: "< 45 dB" },
    ],
  },
  {
    id: "DEV-005",
    name: "Hillrom Progressa ICU Bed",
    category: "Patient Care",
    description:
      "Smart ICU bed with pulmonary therapy positions, EHR connectivity, and built-in weight monitoring.",
    city: "Pune",
    pricePerDay: 2600,
    rating: 4.9,
    reviews: 76,
    availability: "48-hour delivery",
    image:
      "https://images.unsplash.com/photo-1505753065533-9c0c88e85c1e?auto=format&fit=crop&w=800&q=60",
    tags: ["Tilt assist", "IoT bed", "Pressure relief"],
    highlights: [
      "USB & nurse call integration",
      "Microclimate surface",
      "Fall detection alerts",
    ],
    specs: [
      { label: "Safe working load", value: "317 kg" },
      { label: "Surface width", value: "91 cm" },
      { label: "Power", value: "Dual backup" },
    ],
  },
  {
    id: "DEV-006",
    name: "Mindray DP-50 Ultrasound",
    category: "Diagnostics",
    description:
      "Point-of-care ultrasound with Doppler, needle visualization, and wireless image transfer.",
    city: "Chennai",
    pricePerDay: 1850,
    rating: 4.5,
    reviews: 65,
    availability: "Ships today",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=60",
    tags: ["Portable", "Doppler", "Battery pack"],
    highlights: [
      "Tissue harmonic imaging",
      "Needle enhancement",
      "Wi-Fi PACS push",
    ],
    specs: [
      { label: "Modes", value: "B, M, Color, PW" },
      { label: "Battery", value: "90 minutes" },
      { label: "Weight", value: "7.5 kg" },
    ],
  },
];

export type NurseAvailability = {
  day: string;
  slots: string[];
};

export type Nurse = {
  id: string;
  name: string;
  specialty: string;
  city: string;
  experience: number;
  rating: number;
  reviews: number;
  hourlyRate: number;
  bio: string;
  certifications: string[];
  skills: string[];
  languages: string[];
  photo: string;
  availability: NurseAvailability[];
  focusTags: string[];
};

export const nurseDirectory: Nurse[] = [
  {
    id: "NUR-1001",
    name: "Ananya Rao",
    specialty: "Critical Care Nurse",
    city: "Mumbai",
    experience: 8,
    rating: 4.95,
    reviews: 221,
    hourlyRate: 850,
    bio: "Former Kokilaben ICU lead nurse with ACLS, airway management, and ventilator weaning expertise.",
    certifications: ["ACLS", "BLS", "Ventilator Specialist"],
    skills: ["Ventilator care", "Arterial line monitoring", "Proning"],
    languages: ["English", "Hindi", "Kannada"],
    photo:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=60",
    availability: [
      { day: "Today", slots: ["08:00 - 12:00", "14:00 - 18:00"] },
      { day: "Tomorrow", slots: ["10:00 - 14:00", "18:00 - 22:00"] },
      { day: "Fri", slots: ["Night shift"] },
    ],
    focusTags: ["Ventilator", "Stroke rehab", "Complex cases"],
  },
  {
    id: "NUR-1002",
    name: "Shreya Patel",
    specialty: "Pediatric Nurse",
    city: "Ahmedabad",
    experience: 6,
    rating: 4.9,
    reviews: 168,
    hourlyRate: 780,
    bio: "NICU-trained pediatric nurse helping children transition from hospital to home with play-based care plans.",
    certifications: ["PALS", "Developmental Care"],
    skills: ["IV cannulation", "Feeding tube care", "Vaccination support"],
    languages: ["English", "Gujarati", "Hindi"],
    photo:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=60",
    availability: [
      { day: "Today", slots: ["16:00 - 20:00"] },
      { day: "Tomorrow", slots: ["Full day"] },
      { day: "Sat", slots: ["08:00 - 16:00"] },
    ],
    focusTags: ["Pediatrics", "Feeding tubes", "Child-friendly"],
  },
  {
    id: "NUR-1003",
    name: "Devika Menon",
    specialty: "Oncology Nurse",
    city: "Bengaluru",
    experience: 10,
    rating: 4.92,
    reviews: 190,
    hourlyRate: 980,
    bio: "Oncology infusion specialist ensuring chemotherapy adherence, PICC management, and symptom tracking at home.",
    certifications: ["Chemotherapy administration", "PICC Specialist"],
    skills: ["Chemo infusion", "Port flushing", "Pain management"],
    languages: ["English", "Malayalam", "Hindi"],
    photo:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=800&q=60",
    availability: [
      { day: "Today", slots: ["Evening shift"] },
      { day: "Tomorrow", slots: ["Morning shift"] },
      { day: "Sun", slots: ["Night shift"] },
    ],
    focusTags: ["Oncology", "Infusion", "Symptom tracking"],
  },
  {
    id: "NUR-1004",
    name: "Ritika Sharma",
    specialty: "Geriatric Nurse",
    city: "Delhi",
    experience: 12,
    rating: 4.87,
    reviews: 245,
    hourlyRate: 720,
    bio: "Holistic elder-care nurse focusing on fall prevention, dementia-friendly routines, and vitals monitoring.",
    certifications: ["Fall Prevention", "Dementia Care"],
    skills: [
      "Vitals trend tracking",
      "Mobility therapy",
      "Medication adherence",
    ],
    languages: ["Hindi", "English", "Punjabi"],
    photo:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=800&q=60",
    availability: [
      { day: "Today", slots: ["Full day"] },
      { day: "Tomorrow", slots: ["08:00 - 14:00"] },
      { day: "Sat", slots: ["Night shift"] },
    ],
    focusTags: ["Elder care", "Cognitive support", "Mobility"],
  },
  {
    id: "NUR-1005",
    name: "Sahana Victor",
    specialty: "Physiotherapy Nurse",
    city: "Chennai",
    experience: 7,
    rating: 4.83,
    reviews: 132,
    hourlyRate: 690,
    bio: "Post-operative mobility specialist with robotics-assisted rehab and progressive exercise programming.",
    certifications: ["Neuro PT", "Ortho rehab"],
    skills: ["Neuro physio", "Technique coaching", "Vitals monitoring"],
    languages: ["English", "Tamil"],
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=60",
    availability: [
      { day: "Today", slots: ["08:00 - 12:00"] },
      { day: "Tomorrow", slots: ["12:00 - 16:00"] },
      { day: "Sun", slots: ["Full day"] },
    ],
    focusTags: ["Rehab", "Post-op", "Stroke"],
  },
  {
    id: "NUR-1006",
    name: "Lena Fernandes",
    specialty: "Home ICU Nurse",
    city: "Goa",
    experience: 9,
    rating: 4.91,
    reviews: 156,
    hourlyRate: 920,
    bio: "Home ICU setups, invasive ventilator care, and AI-supported documentation for long-term critical cases.",
    certifications: ["ACLS", "Invasive Ventilation", "CRRT"],
    skills: [
      "Ventilator titration",
      "Tracheostomy care",
      "Medication titration",
    ],
    languages: ["English", "Konkani"],
    photo:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=800&q=60",
    availability: [
      { day: "Today", slots: ["Night shift"] },
      { day: "Tomorrow", slots: ["Night shift"] },
      { day: "Mon", slots: ["Night shift"] },
    ],
    focusTags: ["Home ICU", "Ventilator", "Long stay"],
  },
];

export type NurseRequest = {
  id: string;
  patient: string;
  procedure: string;
  location: string;
  acuity: "Low" | "Medium" | "High";
  scheduledFor: string;
  status: "pending" | "approved" | "rejected";
  notes: string;
};

export const nurseRequests: NurseRequest[] = [
  {
    id: "REQ-2108",
    patient: "Mr. Iyer",
    procedure: "Night ventilator monitoring",
    location: "Powai, Mumbai",
    acuity: "High",
    scheduledFor: "Today | 20:00 - 06:00",
    status: "pending",
    notes:
      "Ventilator alarms escalated twice last night. Family requests same nurse.",
  },
  {
    id: "REQ-2109",
    patient: "Baby Anvi",
    procedure: "Gastrostomy feed supervision",
    location: "Bandra, Mumbai",
    acuity: "Medium",
    scheduledFor: "Tomorrow | 09:00 - 13:00",
    status: "pending",
    notes: "Parent wants play-based distraction and vitals logging every hour.",
  },
  {
    id: "REQ-2110",
    patient: "Mrs. D'Souza",
    procedure: "Chemo infusion at home",
    location: "Andheri, Mumbai",
    acuity: "High",
    scheduledFor: "Friday | 14:00 - 19:00",
    status: "approved",
    notes: "Oncologist will join remotely via VIBRANT Connect link.",
  },
];

export type AIVerificationTask = {
  id: string;
  patient: string;
  type: "Medication" | "Injection" | "Device setup";
  requirement: string;
  reference: string;
  status: "pending" | "approved" | "flagged";
  confidence: number;
};

export const aiVerificationQueue: AIVerificationTask[] = [
  {
    id: "AI-881",
    patient: "Baby Anvi",
    type: "Medication",
    requirement: "Amikacin Sulphate Injection IR Amilab AMIKACIN Dtum",
    reference: "Prescription uploaded | 10:12 AM",
    status: "pending",
    confidence: 0.0,
  },
  {
    id: "AI-882",
    patient: "Mr. Iyer",
    type: "Injection",
    requirement: "Insulin syringe (U-40)",
    reference: "Vitals log indicates hypo incident yesterday.",
    status: "pending",
    confidence: 0.0,
  },

  {
    id: "AI-883",
    patient: "Mrs. D'Souza",
    type: "Medication",
    requirement: "Ondansetron 4mg",
    reference: "Linked with chemo infusion order | 2:14 PM",
    status: "pending",
    confidence: 0.0,
  },
  {
    id: "AI-884",
    patient: "Mr. Khan",
    type: "Device setup",
    requirement: "BIPAP ST mode setup @ 12 cmH₂O / 6 cmH₂O",
    reference: "Sleep study report uploaded",
    status: "pending",
    confidence: 0.0,
  },
  {
    id: "AI-885",
    patient: "Baby Aarav",
    type: "Medication",
    requirement: "Paracetamol 120mg/5ml — 5ml",
    reference: "Fever spikes logged in vitals chart",
    status: "pending",
    confidence: 0.0,
  },
  {
    id: "AI-886",
    patient: "Mrs. Sharma",
    type: "Injection",
    requirement: "Enoxaparin 0.6ml subcutaneous",
    reference: "Post-op DVT prophylaxis | Day 2",
    status: "pending",
    confidence: 0.0,
  },
];
