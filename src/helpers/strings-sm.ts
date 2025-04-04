﻿let strings: { [key: string]: string } = {
    "back": "Toe",
    "done": "Ua uma",
    "close": "Tapuni",
    "save": "Sefe",
    "add": "Fa'aopoopo",
    "edit": "Fa'asa'o",
    "cancel": "Fa'aleaoga",
    "clear": "fa'amama",
    "settings": "Fa'atulagaga",
    "connect": "Fa'afeso'ota'i",
    "reconnect": "Toe fa'afeso'ota'i",
    "setup": "Fa'atulagaga",
    "refresh": "Fa'afou",
    "remove": "Ave'ese",
    "help": "Fesoasoani",
    "view": "Va'ai",
    "health-records": "Fa'amaumauga o le Soifua Maloloina",
    "connect-ehr-title-prefix": "Fa'afeso'ota'i ",
    "connect-ehr-title-divider": " pe ",
    "connect-ehr-title-providers": "Tagata Fa'asoifua",
    "connect-ehr-title-health-plans": "Fuafuaga Soifua Maloloina",
    "connect-ehr-connected": "O lo'o maua fa'amatalaga o lou EHR!",
    "connect-ehr-needs-attention": "E mana'omia le va'aiga o se tasi o au fa'amaumauga.",
    "connect-ehr-text": "Fa'afeso'ota'i lau tagata fa'asoifua po'o le fuafuaga soifua maloloina e va'ai ai i fa'ai'uga o su'ega, tulaga, vailaau ma isi.",
    "connect-ehr-text-connected": "Fa'afeso'ota'i se isi tagata fa'asoifua e fa'asoa atili fa'amatalaga po'o le pulea o fa'afeso'ota'iga o lou EHR.",
    "connect-ehr-not-enabled": "E le fa'atagaina le fa'afeso'ota'iga o le EHR mo lenei poloketi.",
    "search-for-provider": "Su'e se Tagata Fa'asoifua po'o se Fuafuaga Soifua Maloloina",
    "request-add": "Talosaga e fa'aopoopo",
    "expired-reconnect": "Ua mae'a le fa'afeso'ota'iga. Fa'amolemole toe fa'afeso'ota'i.",
    "connect-error-reconnect": "Fa'afitauli fa'afuase'i. Fa'amolemole toe fa'afeso'ota'i.",
    "connected": "Ua fa'afeso'ota'i",
    "search": "Su'e",
    "connect-fitbit-intro": "E mafai ona e fa'asoa fa'amatalaga mai lau fa'amaumauga Fitbit pe afai e iai. E amata, kiliki pe tago i lalo e saini i ai i lau fa'amatalaga Fitbit.",
    "connect-fitbit-button": "Fa'afeso'ota'i Fitbit",
    "received-fitbit-data": "O lo'o maua fa'amatalaga o lau Fitbit!",
    "connect-garmin-intro": "E mafai ona e fa'asoa fa'amatalaga mai lau fa'amaumauga Garmin pe afai e iai. E amata, kiliki pe tago i lalo e saini i ai i lau fa'amatalaga Garmin.",
    "connect-garmin-button": "Fa'afeso'ota'i Garmin",
    "received-garmin-data": "O lo'o maua fa'amatalaga o lau Garmin!",
    "connect-oura-intro": "E mafai ona e fa'asoa fa'amatalaga mai lau fa'amaumauga Oura pe afai e iai. E amata, kiliki pe tago i lalo e saini i ai i lau fa'amatalaga Oura.",
    "connect-oura-button": "Fa'afeso'ota'i Oura",
    "received-oura-data": "O lo'o maua fa'amatalaga o lau Oura!",
    "connect-dexcom-intro": "E mafai ona e fa'asoa fa'amatalaga mai lau fa'amaumauga Dexcom pe afai e iai. E amata, kiliki pe tago i lalo e saini i ai i lau fa'amatalaga Dexcom.",
    "connect-dexcom-button": "Fa'afeso'ota'i Dexcom",
    "received-dexcom-data": "O lo'o maua fa'amatalaga o lau Dexcom!",
    "downloading-data": "O lo'o fa'afolou fa'amatalaga...",
    "downloading-data-menu": "Fa'afolou Fa'amatalaga",
    "empty-tasks-incomplete": "E leai ni galuega tatala e fa'aali i le taimi nei.",
    "empty-tasks-complete": "O galuega ua mae'a o le a fa'aalia iinei.",
    "view-all": "Va'ai Uma",
    "tasks": "Galuega",
    "incomplete-tasks": "Galuega Le'i Uma",
    "completed-tasks": "Galuega Ua Mae'a",
    "overdue": "Ua tuai",
    "due-today": "E tatau ona mae'a i le aso",
    "due-tomorrow": "E tatau ona mae'a taeao",
    "due": "E tatau ona mae'a",
    "due-in": "E tatau ona mae'a i",
    "days": "aso",
    "notifications": "Fa'asalalauga",
    "support": "Lagolago",
    "all-notifications": "Fa'asalalauga Uma",
    "steps": "Laasaga",
    "resting-heart-rate": "Malosi o le Tata o le Fatu i le Malologa",
    "distance-traveled": "Mamao na Malaga",
    "google-fit-share": "Tago e fa'asoa fa'amatalaga o le malosi",
    "devices": "Masini",
    "last-sync": "Na mulimuli ona fa'atasi",
    "completed": "Ua mae'a",
    "ehr-intro-search": "Su'e e ala i le taina o le igoa o lau tagata fa'asoifua po'o le faitoto'a mo tagata o lau tagata fa'asoifua soifua maloloina po'o le fuafuaga soifua maloloina.",
    "external-accounts-title-divider": " / ",
    "external-accounts-title-providers": "Tagata Fa'asoifua",
    "external-accounts-title-health-plans": "Fuafuaga Soifua Maloloina",
    "external-accounts-title-devices": "Masini",
    "external-accounts-error": "E mana'omia le va'aiga o se tasi o au fa'amaumauga",
    "external-accounts-loading": "O lo'o fa'afolou nei fa'amatalaga mai fuafuaga soifua maloloina ma tagata fa'asoifua ua fa'afeso'ota'i. Fa'amolemole toe va'ai i nai minute e va'ai ai i au fa'amatalaga.",
    "external-account-authorization-expired": "Ua mae'a le fa'atagaga",
    "external-account-fetching-data": "O lo'o maua fa'amatalaga...",
    "external-account-deleting": "O lo'o ave'ese...",
    "external-account-last-updated": "Na mulimuli ona fa'afou",
    "external-account-error": "Fa'afitauli fa'afuase'i",
    "external-account-reconnect": "Toe fa'afeso'ota'i",
    "external-account-refresh": "Fa'afou",
    "external-account-remove": "Ave'ese",
    "device-data-no-data": "Afai ua e fa'afeso'ota'i Apple Health, Google Fit, Fitbit, po'o Garmin, toe va'ai mulimuli ane e va'ai ai i au fa'amatalaga.",
    "no-notifications-received": "E leai ni fa'asalalauga na maua",
    "next-button-text": "Sosoo",
    "lab-results-title": "Fa'ai'uga o Su'ega",
    "medications-title": "Vailaau",
    "immunizations-title": "Tui Puipui",
    "reports-title": "Lipoti",
    "allergies-title": "Fa'ama'i Taufeasese'i",
    "conditions-title": "Tulaga",
    "procedures-title": "Fa'agasologa",
    "app-download-title": "Sosoo: Fa'afolou le Polokalama",
    "app-download-subtitle": "O le fa'afolou o le polokalama MyDataHelps e faigofie ai ona e auai i le @@PROJECT_NAME@@.",
    "app-download-google-play-link-alt": "Fa'afolou mai le Google Play Store",
    "app-download-app-store-link-alt": "Fa'afolou mai le Apple App Store",
    "start": "Amata",
    "resume": "Toe amata",
    "start-survey": "Amata Su'esu'ega",
    "resume-survey": "Toe amata Su'esu'ega",
    "30-day-average": "Ogatotonu o Aso e 30",
    "today": "Aso nei",
    "yesterday": "Ananafi",
    "tap-to-log-today": "Tago iinei e fa'amaumau ai ou fa'ailoga ma'i po'o togafitiga!",
    "mild": "Māmā",
    "moderate": "Feololo",
    "severe": "Ogaoga",
    "severe-shortened": "oga",
    "moderate-shortened": "feo",
    "mild-shortened": "māmā",
    "log-todays-symptoms": "Fa'amaumau Fa'ailoga Ma'i o le Aso",
    "todays-log": "Fa'amaumauga o le Aso",
    "symptoms": "Fa'ailoga Ma'i",
    "treatments": "Togafitiga",
    "symptoms-experiencing-today": "O a fa'ailoga ma'i o lo'o e lagona?",
    "symptoms-experiencing-previous": "O a fa'ailoga ma'i sa e lagona?",
    "treatments-experiencing-today": "O a togafitiga ua e faia?",
    "treatments-experiencing-previous": "O a togafitiga sa e faia?",
    "feeling-overall-today": "E fa'apefea lou lagona i le aotelega?",
    "feeling-overall-previous": "Sa fa'apefea lou lagona i le aotelega?",
    "additional-notes": "E iai ni isi fa'amatalaga?",
    "how-severe-is": "E fa'apefea le ogaoga o lou",
    "how-severe-was": "Sa fa'apefea le ogaoga o lou",
    "clear-symptom": "Fa'amama Fa'ailoga Ma'i",
    "add-notes": "Fa'aopoopo fa'amatalaga",
    "notes": "Fa'amatalaga",
    "enter-symptom-name": "Taina le Igoa o le Fa'ailoga Ma'i",
    "enter-treatment-name": "Taina le Igoa o le Togafitiga",
    "severity-tracking-none": "Aua le Siaki le Ogaoga",
    "severity-tracking-3point": "Fa'avasega Māmā / Feololo / Ogaoga",
    "severity-tracking-10point": "Fa'avasega 1 - 10",
    "muted": "Fa'afilemu",
    "not-muted": "Le Fa'afilemu",
    "delete": "Tape",
    "severity": "Ogaoga",
    "item-delete-warning": "Lapata'iga: O le fa'aauauina o le a tape tumau ai mea o lo'o i lalo ma fa'amatalaga uma e feso'ota'i mai au fa'amaumauga. Afai e te le mana'o e tape nei mea, filifili \"Fa'aleaoga\".",
    "unsaved-changes": "Suiga E Le'i Sefeina",
    "daily-overall-experience": "Aafiaga Aotelega i Aso Taitasi",
    "average": "Ogatotonu",
    "include-symptoms": "Aofia Fa'ailoga Ma'i",
    "select-symptoms": "Filifili Fa'ailoga Ma'i",
    "include-treatments": "Aofia Togafitiga",
    "select-treatments": "Filifili Togafitiga",
    "download-mydatahelps": "Fa'afolou MyDataHelps",
    "connect-devices-title": "Fa'afeso'ota'i Masini",
    "connect-devices-text": "Fa'asoa fa'amatalaga mai au masini, polokalama, ma isi masini.",
    "apple-health-troubleshooting-intro": "Afai e te le'i fa'atagaina pe ua tape le fa'asoaina o fa'amatalaga o lou Apple Health ma e te mana'o e fa'atagaina, mulimuli i nei la'asaga:",
    "apple-health-troubleshooting-li-1": "Tatala le polokalama \"Settings\"",
    "apple-health-troubleshooting-li-2": "Filifili \"Privacy\"",
    "apple-health-troubleshooting-li-3": "Filifili \"Health\"",
    "apple-health-troubleshooting-li-4": "Filifili \"MyDataHelps\"",
    "apple-health-troubleshooting-li-5": "Fa'atagaina vaega o fa'amatalaga e te mana'o e fa'asoa",
    "how-to-enable": "Auala e fa'atagaina ai",
    "new-points-title": "Lelei Tele!",
    "new-points-text": "Ua tu'uina atu ia te oe ni 'aofai mo mea nei:",
    "new-points-next-reward-prefix": "E te mana'omia nei ",
    "new-points-next-reward-suffix": " 'aofai e tatala ai lau taui sosoo.",
    "new-points-done-button-text": "Ua uma",
    "systolic-average": "Ogatotonu o le Systolic",
    "diastolic-average": "Ogatotonu o le Diastolic",
    "highest-systolic": "Systolic Maualuga",
    "lowest-systolic": "Systolic Maulalo",
    "resource-default-button-text": "Tatala",
    "inbox-message-completed-status": "UA VA'AIA",
    "inbox-resource-completed-status": "UA VA'AIA",
    "inbox-survey-completed-status": "UA MAE'A",
    "inbox-history-view-title": "Tala'aga o le Pusa Meli",
    "inbox-history-view-empty-text": "E leai ni mea i le tala'aga o lau pusa meli.",
    "inbox-message-view-related-resources-title": "Mea Feso'ota'i",
    "inbox-view-title": "Pusa Meli",
    "inbox-view-empty-text": "E leai ni mea fou i lau pusa meli.",
    "inbox-view-messages-title": "Fe'au",
    "inbox-view-surveys-title": "Su'esu'ega",
    "inbox-view-resources-title": "Punaoa",
    "inbox-view-recently-completed-title": "Talu ai nei",
    "inbox-view-recently-completed-empty-text": "E leai ni mea ua mae'a talu ai nei i lau pusa meli.",
    "inbox-view-history-button-text": "Va'ai tala'aga o le pusa meli",
    "choose-report-month": "Filifili Masina o le Lipoti",
    "include-overall-experience": "Aofia Aafiaga Aotelega i Aso Taitasi",
    "include-notes": "Aofia Fa'amatalaga",
    "create-report": "Fa'atupu Lipoti PDF",
    "reports": "Lipoti",
    "recent-daily-data-bar-chart-subtitle": "Aso e 7 talu ai",
    "recent-daily-data-bar-chart-no-data": "Leai ni Fa'amatalaga",
    "resource-list-empty-text": "E leai ni punaoa na maua.",
    "asthma-symptom-level-none": "Leai ni fa'ailoga ma'i",
    "asthma-symptom-level-mild": "Fa'ailoga ma'i māmā",
    "asthma-symptom-level-moderate": "Fa'ailoga ma'i feololo",
    "asthma-symptom-level-severe": "Fa'ailoga ma'i ogaoga",
    "asthma-symptom-difficulty-breathing": "Faigata ona manava",
    "asthma-symptom-wheezing": "Mapusaga",
    "asthma-symptom-coughing": "Tale",
    "asthma-symptom-chest-tightness": "Manogia pe mamafa le fatafata",
    "asthma-impact-limit-daily-activity": "Fa'atapula'a gaoioiga o le aso",
    "asthma-impact-waking-at-night": "Ala i le po",
    "asthma-impact-using-rescue-inhaler": "Fa'aaoga lau inhaler fa'asaoina",
    "asthma-trigger-cold-illness": "Ma'i mālūlū/siama",
    "asthma-trigger-animal-exposure": "Feso'ota'i ma manu",
    "asthma-trigger-seasonal-allergens": "Allergens/pollen o le tau",
    "asthma-trigger-exercise": "Fa'amalositino",
    "asthma-trigger-smoke": "Asu",
    "asthma-trigger-weather-changes": "Suiga ogaoga o le tau",
    "asthma-trigger-air-pollution": "Palapala i le ea",
    "asthma-trigger-strong-smells": "Manogi malosi",
    "asthma-trigger-chemicals": "Kemikolo/mea fa'amamā",
    "asthma-trigger-dust": "Pefu",
    "asthma-trigger-mold": "Fugala'au",
    "asthma-trigger-dust-mites": "Mites o le pefu",
    "asthma-trigger-rodents": "Isumu",
    "asthma-trigger-cockroaches": "Mogamoga",
    "asthma-trigger-nsaid": "NSAID/Aspirin",
    "asthma-trigger-beta-blocker": "Beta blocker",
    "asthma-trigger-heartburn": "Mu le fatafata",
    "asthma-trigger-red-wine": "Uaina mūmū",
    "asthma-trigger-new-foods": "Mea'ai fou",
    "asthma-trigger-cooked-without-ventilation": "Kuka (leai se fa'amamāga ea)",
    "asthma-trigger-pet-in-bed": "Manu i lou moega",
    "asthma-trigger-incense-or-candle": "Moli/incense",
    "asthma-data-status-out-of-range": "I fafo o le va",
    "asthma-data-status-in-range": "I totonu o le va",
    "asthma-data-status-offline": "Offline",
    "asthma-data-status-establishing": "Fa'atulagaina",
    "asthma-data-status-not-determined": "E le'i fa'atulagaina le amata'aga",
    "asthma-data-status-not-found": "E leai ni fa'amatalaga na fa'amaumauina",
    "asthma-data-status-not-configured": "E le'i fa'atulagaina",
    "asthma-control-calendar-daily-entry-missed": "Ua misi le fa'amaumauga o le aso",
    "asthma-control-calendar-not-logged-yet": "E le'i fa'amaumauina",
    "asthma-control-calendar-log-entries-symptoms-label": "Fa'ailoga Ma'i",
    "asthma-control-calendar-log-entries-impacts-label": "Aafiaga",
    "asthma-control-calendar-log-entries-triggers-label": "Mea Fa'atupu",
    "asthma-control-status-header-complete-daily-entry": "Fa'atumu lau fa'amaumauga o le aso.",
    "asthma-control-status-header-multiple-out-of-range": "O fa'amatalaga e tele o lo'o |||i fafo o ou tulaga masani|||.",
    "asthma-control-status-header-abnormal-heart-rate": "O le malosi o le tata o lou fatu i le malologa o lo'o |||sili atu i lou tulaga masani|||.",
    "asthma-control-status-header-abnormal-respiratory-rate": "O le malosi o lou mānava o lo'o |||sili atu i lou tulaga masani|||.",
    "asthma-control-status-header-abnormal-steps": "O au gaoioiga o lo'o |||lalo ifo o ou tulaga masani|||.",
    "asthma-control-status-header-abnormal-sleep": "O fa'alavelave i lou moe o lo'o |||sili atu i lou tulaga masani|||.",
    "asthma-control-status-header-abnormal-blood-oxygen": "O le tulaga o le okesene i lou toto o lo'o |||lalo ifo o lou tulaga masani|||.",
    "asthma-control-status-header-abnormal-home-aqi": "O le Fa'avasega o le Lelei o le Ea i lou fale o lo'o |||{aqi}|||.",
    "asthma-control-status-header-abnormal-work-aqi": "O le Fa'avasega o le Lelei o le Ea i lou galuega o lo'o |||{aqi}|||.",
    "asthma-control-status-header-no-data": "Fa'aopoopo se fa'amaumauga o le aso e iloilo ai le pulea o lou ma'i sela.",
    "asthma-control-status-header-no-data-caregiver": "Fa'aopoopo se fa'amaumauga o le aso e iloilo ai le pulea o le ma'i sela a {name}.",
    "asthma-control-status-header-not-determined": "E mana'omia fa'amaumauga o le aso e sili atu e iloilo ai le pulea o lou ma'i sela.",
    "asthma-control-status-header-not-determined-caregiver": "E mana'omia fa'amaumauga o le aso e sili atu e iloilo ai le pulea o le ma'i sela a {name}.",
    "asthma-control-status-header-controlled": "Fa'avae i au fa'amaumauga, o lou ma'i sela o lo'o |||i lalo o le pulea|||.",
    "asthma-control-status-header-controlled-caregiver": "Fa'avae i fa'amaumauga, o le ma'i sela a {name} o lo'o |||i lalo o le pulea|||.",
    "asthma-control-status-header-not-controlled": "Fa'avae i au fa'amaumauga, o lou ma'i sela o lo'o |||le o i lalo o le pulea|||.",
    "asthma-control-status-header-not-controlled-caregiver": "Fa'avae i fa'amaumauga, o le ma'i sela a {name} o lo'o |||le o i lalo o le pulea|||.",
    "asthma-control-status-header-not-controlled-stat-symptom-days": "Aso o fa'ailoga ma'i",
    "asthma-control-status-header-not-controlled-stat-rescue-inhaler": "Inhaler fa'asaoina",
    "asthma-control-status-header-not-controlled-stat-limited-activity": "Gaoioiga fa'atapula'aina",
    "asthma-control-status-header-not-controlled-stat-awakenings": "Fa'ala",
    "asthma-action-plan-manager-title": "Fuafuaga o Gaoioiga mo le Ma'i Sela",
    "asthma-action-plan-manager-instructions": "Sefe se ata o lau fuafuaga o gaoioiga mo le ma'i sela mo le faigofie o le fa'atatau.",
    "asthma-action-plan-manager-instructions-caregiver": "Sefe se ata o le fuafuaga o gaoioiga mo le ma'i sela a {name} mo le faigofie o le fa'atatau.",
    "asthma-action-plan-manager-learn-more": "O le a le fuafuaga o gaoioiga mo le ma'i sela?",
    "asthma-action-plan-manager-edit-button-text": "Fa'asa'o",
    "asthma-action-plan-manager-not-found-text": "Tago e fa'aopoopo ata",
    "asthma-biometrics-title": "Soifua Maloloina & Gaoioiga",
    "asthma-biometrics-daytime-resting-heart-rate-label": "Malosi o le Tata o le Fatu i le Malologa (Ao)",
    "asthma-biometrics-nighttime-resting-heart-rate-label": "Malosi o le Tata o le Fatu i le Malologa (Po)",
    "asthma-biometrics-beats-per-minute-units": "BPM",
    "asthma-biometrics-respiratory-rate-label": "Malosi o le Mānava",
    "asthma-biometrics-breaths-per-minute-units": "BPM",
    "asthma-biometrics-steps-label": "Laasaga",
    "asthma-biometrics-daytime-blood-oxygen-level-label": "Okesene i le Toto (Ao)",
    "asthma-biometrics-nighttime-blood-oxygen-level-label": "Okesene i le Toto (Po)",
    "asthma-biometrics-percent-units": "%",
    "asthma-biometrics-sleep-disturbances-label": "Fa'alavelave i le Moe",
    "asthma-air-qualities-title": "Lelei o le Ea",
    "asthma-air-qualities-setup-button-text": "+ Fa'atulagaga",
    "asthma-air-qualities-home-aqi-label": "AQI (Fale)",
    "asthma-air-qualities-work-aqi-label": "AQI (Galuega)",
    "asthma-alert-takeover-notice-instructions": "Ave se taimi e fa'amaumau ai so'o se fa'ailoga ma'i sela i se fa'amaumauga o le aso.",
    "asthma-alert-takeover-notice-add-entry-button-text": "+ Fa'amaumauga o le Aso",
"asthma-alert-takeover-notice-not-now-button-text": "E Le o le Taimi Nei",
"asthma-log-entry-details-not-editable": "Ua misi le fa'amaumauga o le aso",
"asthma-log-entry-details-not-logged-yet": "E le'i fa'amaumauina",
"asthma-log-entry-details-edit-button-text": "Fa'asa'o",
"asthma-log-entry-details-add-button-text": "Fa'amaumau Fa'amatalaga",
"asthma-log-entry-details-symptoms-label": "Fa'ailoga Ma'i",
"asthma-log-entry-details-impacts-label": "Aafiaga",
"asthma-log-entry-details-triggers-label": "Mea Fa'atupu",
"asthma-log-entry-details-component-no-data-p1": "Leai ni ",
"asthma-log-entry-details-component-no-data-p2": " na fa'amaumauina",
"asthma-log-entry-header-today-log-label": "Aso nei",
"asthma-log-entry-header-yesterday-log-label": "Ananafi",
"asthma-log-entry-header-not-logged-yet": "E le'i fa'amaumauina",
"asthma-log-entry-header-add-button-text": "Fa'amaumau Fa'amatalaga",
"asthma-activity-view-title": "Gaoioiga",
"asthma-activity-view-chart-title": "Laasaga",
"asthma-activity-view-alert-message": "O au gaoioiga o lo'o lalo ifo o lou tulaga masani.",
"asthma-alert-takeover-message": "O fa'amatalaga e tele o lo'o i fafo o ou tulaga masani.",
"asthma-air-quality-view-title": "Lelei o le Ea",
"asthma-air-quality-view-home-aqi-chart-title": "Lelei o le Ea (Fale)",
"asthma-air-quality-view-home-aqi-alert-message": "O le AQI o lou fale e le lelei mo le soifua maloloina.",
"asthma-air-quality-view-work-aqi-chart-title": "Lelei o le Ea (Galuega)",
"asthma-air-quality-view-work-aqi-alert-message": "O le AQI o lau galuega e le lelei mo le soifua maloloina.",
"asthma-heart-and-lungs-view-title": "Fatu & Mama",
"asthma-heart-and-lungs-view-dhr-chart-title": "Malosi o le Tata o le Fatu i le Malologa (Ao)",
"asthma-heart-and-lungs-view-dhr-alert-message": "O le malosi o le tata o lou fatu i le ao o lo'o sili atu i lou tulaga masani.",
"asthma-heart-and-lungs-view-nhr-chart-title": "Malosi o le Tata o le Fatu i le Malologa (Po)",
"asthma-heart-and-lungs-view-nhr-alert-message": "O le malosi o le tata o lou fatu i le po o lo'o sili atu i lou tulaga masani.",
"asthma-heart-and-lungs-view-rr-chart-title": "Malosi o le Mānava",
"asthma-heart-and-lungs-view-rr-alert-message": "O le malosi o lou mānava o lo'o sili atu i lou tulaga masani.",
"asthma-heart-and-lungs-view-dbol-chart-title": "Okesene i le Toto (Ao)",
"asthma-heart-and-lungs-view-dbol-alert-message": "O le okesene i lou toto i le ao o lo'o lalo ifo o lou tulaga masani.",
"asthma-heart-and-lungs-view-nbol-chart-title": "Okesene i le Toto (Po)",
"asthma-heart-and-lungs-view-nbol-alert-message": "O le okesene i lou toto i le po o lo'o lalo ifo o lou tulaga masani.",
"asthma-sleep-view-title": "Moe",
"asthma-sleep-view-chart-title": "Fa'alavelave i le Moe",
"asthma-sleep-view-alert-message": "O fa'alavelave i lou moe o lo'o sili atu i lou tulaga masani.",
"asthma-log-entry-editor-view-symptom-level-title": "Tulaga o fa'ailoga ma'i",
"asthma-log-entry-editor-view-select-one-subtitle": "Filifili se tasi",
"asthma-log-entry-editor-view-select-all-subtitle": "Filifili uma e aoga",
"asthma-log-entry-editor-view-symptoms-title": "Fa'ailoga Ma'i",
"asthma-log-entry-editor-view-impacts-title": "Aafiaga",
"asthma-log-entry-editor-view-triggers-title": "Mea Fa'atupu",
"asthma-air-quality-description-unhealthy": "Le Lelei mo le Soifua Maloloina",
"asthma-air-quality-description-very-unhealthy": "Matua Le Lelei mo le Soifua Maloloina",
"asthma-air-quality-description-hazardous": "Lamatia",
"asthma-recommended-article-21-title": "Fa'apefea ona tausia lou ma'i sela i lalo o le pulea",
"asthma-recommended-article-21-subtitle": "Nofo aunoa ma fa'ailoga ma'i e ala i le usita'i i lau fuafuaga togafitiga, malamalama i mea fa'atupu, ma le vave iloa o suiga i le pulea.",
"asthma-recommended-article-22-title": "O lo'o i lalo o le pulea lou ma'i sela?",
"asthma-recommended-article-22-subtitle": "Fesili e 4 e iloilo ai pe o lo'o i lalo o le pulea lou ma'i sela. Afai o lo'o e maua i fa'ailoga ma'i sili atu i le 2 taimi i le vaiaso pe afai o lo'o e ala i le po ona o fa'ailoga ma'i sela - o lou ma'i sela e le o i lalo o le pulea.",
"asthma-recommended-article-24-title": "Fa'afeagai ma le Nofoaga Lamatia: Sauniuni mo Fa'afualuga o le Ma'i Sela",
"asthma-recommended-article-24-subtitle": "Iloa vave fa'ailoga ma'i ogaoga e pei o le tale malosi ma le faigata ona manava, ma fa'aaoga lau fuafuaga o gaoioiga mo le ma'i sela e aofia ai vailaau vave.",
"asthma-recommended-article-25-title": "Pulea lou ma'i sela",
"asthma-recommended-article-25-subtitle": "A lagona e le mafai ona pulea lou ma'i sela, ua taimi e toe iloilo ai lau auala. Laasaga e fai pe a le o i lalo o le pulea lou ma'i sela.",
"asthma-recommended-article-32-title": "O ai e mana'omia se vailaau pulea?",
"asthma-recommended-article-32-subtitle": "Iloa le matafaioi taua o vailaau pulea i le tausia o le ma'i sela i lalo o le pulea.",
"asthma-recommended-article-33-title": "Mauaina o vailaau",
"asthma-recommended-article-33-subtitle": "Mo le taimi e avea ai le tau ma faigata i le mauaina o vailaau, a'oa'o e uiga i vailaau e leai se totogi pe itiiti le tau. O le taumafa o vailaau e pei ona fa'atonuina e taua i le tausia o le pulea o le ma'i sela.",
"asthma-recommended-article-34-title": "Toe fa'atumu o vailaau",
"asthma-recommended-article-34-subtitle": "Tausia lelei lau vailaau ma'i sela ma auala faigofie e toe fa'atumu ai.",
"asthma-recommended-article-35-title": "Faigata ona manatua vailaau",
"asthma-recommended-article-35-subtitle": "Iloa auala faigofie ae aoga e manatua ai au tui i aso taitasi, mai faiga o le teuina atamai e oo i le fa'aaogaina o fa'amanatu i polokalama.",
"asthma-recommended-article-36-title": "O le fea inhaler e fa'aaoga i le taimi fea",
"asthma-recommended-article-36-subtitle": "Poto i le pulea o lou ma'i sela: O le inhaler fa'asaoina e vave ona galue e fa'amalolo ai fa'ailoga ma'i ae o le pulea e puipuia ma galue e fa'aitiitia le fulafula, masani lava i le taumafa i aso taitasi.",
"asthma-recommended-article-37a-title": "Auala o le inhaler - MDI",
"asthma-recommended-article-37a-subtitle": "Fautuaga mo le auala o le inhaler fuafua tui (MDI). Aunoa ma le auala sa'o, atonu o lo'o e maua na'o se vaega o le tui.",
"asthma-recommended-article-37b-title": "Auala o le inhaler - DPI",
"asthma-recommended-article-37b-subtitle": "Fautuaga mo le auala o le inhaler pauta mago (DPI). Aunoa ma le auala sa'o, atonu o lo'o e maua na'o se vaega o le tui.",
"asthma-recommended-article-37c-title": "Auala o le inhaler - SMI",
"asthma-recommended-article-37c-subtitle": "Fautuaga mo le auala o le inhaler sū malū (SMI). Aunoa ma le auala sa'o, atonu o lo'o e maua na'o se vaega o le tui.",
"asthma-recommended-article-37d-title": "Auala o le inhaler - nebulizer",
"asthma-recommended-article-37d-subtitle": "Fautuaga mo le auala o le nebulizer.",
"asthma-recommended-article-38-title": "Aisea e tatau ai ona ou taumafa la'u pulea?",
"asthma-recommended-article-38-subtitle": "Malamalama i le matafaioi taua o vailaau pulea ma le mafua'aga o le avea ai ma tulaga taua o lau fuafuaga pulea patino.",
"asthma-recommended-article-39-title": "A'afiaga o vailaau ma'i sela",
"asthma-recommended-article-39-subtitle": "A'oa'o fa'apefea ona iloa a'afiaga masani ma le masani, ma laasaga faigofie e mafai ona e faia e 'alo ese ai mai le a'afiaga masani - thrush (fa'ama'i fungal i lou gutu).",
"asthma-recommended-article-39a-title": "E fa'apefea ona ou iloa pe o galue a'u vailaau ma'i sela?",
"asthma-recommended-article-39a-subtitle": "E mafai ona umi aso e oo i vaiaso e a'afia atoa ai vailaau pulea. Siaki au fa'ailoga ma'i i aso taitasi e va'ai ai pe iai se fa'aleleia ma afai e leai, talanoa i lau tagata fa'asoifua.",
"asthma-recommended-article-41-title": "Mea fa'atupu fa'ate'ia",
"asthma-recommended-article-41-subtitle": "Su'esu'e mea fa'atupu ma'i sela le mana'omia o lo'o natia i lou olaga i aso taitasi, mai NSAIDs (e pei o ibuprofen) e oo i lau ipu uaina. O le iloa o mea e va'ai i ai, e mafai ona fesoasoani ia te oe e iloa ai nei mea fa'atupu fa'ate'ia.",
"asthma-recommended-article-42-title": "Ma'i Sela ma Allergens/Pollen o le Tau",
"asthma-recommended-article-42-subtitle": "Fa'afeagai ma le tau o le pollen ma le faigofie: Iloa au mea fa'atupu pollen patino, malamalama i o latou auala o le tau, ma a'oa'o fa'apefea ona fa'aitiitia le a'afia.",
"asthma-recommended-article-43-title": "Ma'i Sela ma le Lelei o le Ea",
"asthma-recommended-article-43-subtitle": "Malamalama o le ea le lelei e mafai ona fa'atupu le ma'i sela. A'oa'o fa'apefea ona fa'afeagai ma aso AQI maualuga ma le uiga o tulaga AQI.",
"asthma-recommended-article-43a-title": "Ma'i Sela ma Fa'ama'i o le Mānava",
"asthma-recommended-article-43a-subtitle": "O fa'ama'i o le mānava o mea fa'atupu ma'i sela masani. Fa'apefea ona puipuia ma le mea e fai pe a tutupu.",
"asthma-recommended-article-43b-title": "Ma'i Sela ma Manu",
"asthma-recommended-article-43b-subtitle": "Manu/Manu fai'aiga e mafai ona fa'atupu le ma'i sela. A'oa'o e uiga i le fa'apefea ona iloa se fa'ama'i taufeasese i manu/manu fai'aiga ma laasaga e fa'aitiitia ai le a'afiaga.",
"asthma-recommended-article-43c-title": "Ma'i Sela ma Asu",
"asthma-recommended-article-43c-subtitle": "Mu o le vaomatua ma asu tapaa e mafai ona fa'atupu le ma'i sela. A'oa'o e uiga i laasaga e mafai ona e faia e fa'aitiitia ai lou a'afia.",
"asthma-recommended-article-43d-title": "Ma'i Sela ma le Tau",
"asthma-recommended-article-43d-subtitle": "O mea fa'atupu tau masani o le ea malulu, ea vevela ma susū, ma timu/afā faititili. Su'esu'e le mafua'aga e mafai ai ona fa'atupu le ma'i sela.",
"asthma-recommended-article-43e-title": "Manogi Malosi ma Kemikolo/Mea Fa'amamā",
"asthma-recommended-article-43e-subtitle": "Iloa manogi e mafai ona fa'atupu lou ma'i sela ma mea e mafaufau i ai a'o fa'amamā.",
"asthma-recommended-article-43f-title": "Ma'i Sela ma Pefu/Mites o le Pefu",
"asthma-recommended-article-43f-subtitle": "O le pefu o se mea fa'atupu ma'i sela masani, ae o le mafua'aga e avea ai ma mea fa'atupu e mafai ona fa'ate'ia oe!",
"asthma-recommended-article-43g-title": "Ma'i Sela ma Fugala'au",
"asthma-recommended-article-43g-subtitle": "E mana'omia e le fugala'au le susū e tupu ai, o lea e masani ona maua i nofoaga susū pe sūsū. A'oa'o fa'apefea ona puipuia le fugala'au i lou fale.",
"asthma-recommended-article-43h-title": "Ma'i Sela ma le Mu o le Fatafata",
"asthma-recommended-article-43h-subtitle": "O le a le mu o le fatafata ma le a lona feso'ota'iga ma le ma'i sela?",
"blood-type": "Ituaiga Toto",
"device-data-month-chart-no-data": "Leai ni Fa'amatalaga",
"device-data-month-chart-daily-average": "Ogatotonu i Aso Taitasi",
"term-information-not-found-header": "Leai ni Fa'amatalaga na Maua",
"term-information-not-found-body": "E le mafai ona maua ni fa'amatalaga i lenei mataupu",
"term-information-disclaimer": "<strong>FA'AILOILO:</strong> O fa'amatalaga ua tu'uina atu e le o ni fautuaga fa'afoma'i. O lo'o fesoasoani ia te oe e sili atu ona malamalama i lou soifua maloloina. Fa'amolemole fa'afeso'ota'i lau tagata fa'asoifua soifua maloloina pe afai e iai ni au fesili e uiga i lou tulaga fa'afoma'i.",
"term-information-view-on-medline": "Va'ai i le MedlinePlus",
"type": "Ituaiga",
"location": "Nofoaga",
"description": "Fa'amatalaga",
"performed-by": "Na Fa'atinoina e",
"verified-by": "Na Fa'amaonia e",
"normal-range": "Va Masani",
"more": "Tele atu",
"procedure": "Fa'agaoioiga",
"procedures": "Fa'agaoioiga",
"lab-report": "Lipoti Su'esu'ega",
"service-performed": "Auaunaga na Fa'atinoina",
"services-performed": "Auaunaga na Fa'atinoina",
"device-data-month-chart-minutes": "Minute",
"device-data-month-chart-sleep": "Moe",
"air-quality": "Lelei o le Ea",
"air-quality-home": "Lelei o le Ea (Fale)",
"air-quality-work": "Lelei o le Ea (Galuega)",
"sedentary-time": "Taimi Nofonofo",
"active-time": "Taimi Malosi",
"lightly-active-time": "Taimi Malosi Māmā",
"fairly-active-time": "Taimi Malosi Feololo",
"very-active-time": "Taimi Matua Malosi",
"breathing-rate": "Malosi o le Mānava",
"calories-burned": "Kaloli na Susunuina",
"elevated-heart-rate-time": "Taimi o le Malosi Maualuga o le Tata o le Fatu",
"fat-burn-heart-rate-time": "Taimi Susunu Ga'o",
"cardio-heart-rate-time": "Taimi Cardio",
"peak-heart-rate-time": "Taimi Maualuga",
"floors-climbed": "Fogāfale na A'e",
"heart-rate-variability": "Eseesega o le Malosi o le Tata o le Fatu",
"sleep-time": "Taimi Moe",
"light-sleep-time": "Taimi Moe Māmā",
"deep-sleep-time": "Taimi Moe Loloto",
"rem-sleep-time": "Taimi Moe REM",
"spo2": "SpO2",
"heart-rate-range": "Va o le Malosi o le Tata o le Fatu",
"max-heart-rate": "Malosi Maualuga o le Tata o le Fatu",
"core-sleep-time": "Taimi Moe Autu",
"in-bed-time": "Taimi i le Moega",
"stand-time": "Taimi Tu",
"walking-heart-rate-average": "Ogatotonu o le Malosi o le Tata o le Fatu i le Savali",
"active-energy-burned": "Malosi Galue na Susunuina",
"number-of-alcoholic-beverages": "Aofai o Meainu 'Ava Malosi",
"active-calories": "Kaloli Malosi",
"resting-calories": "Kaloli Malolo",
"total-calories": "Aofai o Kaloli",
"min-heart-rate": "Malosi Maulalo o le Tata o le Fatu",
"average-heart-rate": "Ogatotonu o le Malosi o le Tata o le Fatu",
"max-stress-level": "Tulaga Maualuga o le Popole",
"average-stress-level": "Ogatotonu o le Tulaga Popole",
"total-stress-time": "Aofai o Taimi Popole",
"low-stress-time": "Taimi Popole Maulalo",
"medium-stress-time": "Taimi Popole Feololo",
"high-stress-time": "Taimi Popole Maualuga",
"awake-time": "Taimi Ala",
"sleep-score": "Togi o le Moe",
"bpm": "bpm",
"hours-abbreviation": "h",
"minutes-abbreviation": "m",
"points-until-next-badge": "{points} vaega e oo i le pine sosoo",
"fitbit-wear-time": "Taimi Ofu Fitbit",
"my-badges": "A'u Pine ({badges})",
"new-badge-title": "Galuega lelei!",
"new-badge-text": "Ua e maua se pine fou!",
"get-badge": "Maua Pine",
"glucose-chart-no-data": "Leai ni faitauga suka i le toto",
"glucose-stats-range-label": "Va o le Suka i le Toto",
"glucose-stats-avg-label": "Ogatotonu o le Suka i le Toto",
"glucose-stats-steps-label": "Laasaga",
"glucose-stats-sleep-label": "Moe",
"stress-level-title": "Popole Aotelega",
"stress-level-min-label": "Leai se Popole",
"stress-level-max-label": "Matua Popole",
"meal-type-meal": "Taumafa",
"meal-type-snack": "Meaai Māmā",
"meal-type-drink": "Meainu",
"meal-log-title": "Fa'amaumauga o Taumafa",
"meal-log-no-data": "Leai ni taumafa na fa'amaumauina",
"meal-editor-time-input-label": "Taimi",
"meal-editor-description-input-label": "Fa'amatalaga",
"meal-editor-description-optional": "Filifilia",
"meal-editor-duplicate-timestamp-error": "E le mafai e taumafa e lua ona iai le taimi tutusa.",
"meal-editor-add-image": "Fa'aopoopo Ata",
"meal-editor-image-upload-error": "Na tupu se fa'afitauli a'o fa'apipi'i le ata na filifilia. Fa'amolemole toe taumafai, fa'aaoga se isi ata, pe ave'ese le ata ina ia mafai ona sefe.",
"glucose-view-title": "Siakiga o le Suka",
"ai-assistant-loading": "Fa'afeso'ota'i ma au fa'amatalaga...",
"ai-assistant-suggestion-avg-weekly-heart-rate": "O le a le ogatotonu o le malosi o le tata o lo'u fatu mo le vaiaso ua te'a?",
"ai-assistant-suggestion-highest-heart-rate-week": "O le a le malosi maualuga o le tata o lo'u fatu i lenei vaiaso?",
"ai-assistant-suggestion-graph-daily-steps-21-days": "Fa'atupu se kalafa o a'u laasaga i aso taitasi mo aso e 21 ua te'a",
"ai-assistant-suggestion-weekly-workouts-average-month": "E fia fa'amalositino i le vaiaso na ou ogatotonu ai i lenei masina?",
"ai-assistant-suggestion-avg-monthly-blood-pressure": "O le a le ogatotonu o le malosi o lo'u toto mo le masina ua te'a?",
"ai-assistant-suggestion-daily-active-minutes-month": "O le a la'u ogatotonu i aso taitasi mo minute malosi i lenei masina?",
"ai-assistant-suggestion-resting-heart-rate-change-month": "E fa'apefea ona suia le malosi o le tata o lo'u fatu i le malologa i le masina ua te'a?",
"ai-assistant-suggestion-stand-ups-yesterday": "E fa'afia na ou tu i luga ananafi?",
"ai-assistant-suggestion-graph-heart-rate-trends-workouts": "E mafai ona e kalafa le auala o le malosi o le tata o lo'u fatu i fa'amalositino i lenei vaiaso?",
"ai-assistant-suggestion-sleep-7-days": "E fa'apefea lo'u moe mo aso e 7 ua te'a?",
"ai-assistant-suggestion-fall-asleep-time-2-weeks": "O le a le taimi na ou masani ona moe ai i vaiaso e 2 ua te'a?",
"ai-assistant-suggestion-sleep-quality-change-month": "E fa'apefea ona suia le lelei o lo'u moe i le masina ua te'a?",
"ai-assistant-suggestion-last-tetanus-vaccine": "O afea na fai ai la'u tui tetanus mulimuli?",
"ai-assistant-suggestion-last-blood-test-lab-work": "O afea na fai ai la'u su'esu'ega toto pe galuega fa'ata'ita'i mulimuli?",
"ai-assistant-suggestion-abnormal-lab-results": "E iai ni a'u fa'ai'uga su'esu'ega fa'ata'ita'i le masani?",
"ai-assistant-suggestion-last-cbc-test": "O afea na fai ai la'u su'esu'ega faitau toto atoa (CBC) mulimuli?",
"ai-assistant-suggestion-glucose-a1c-levels-last-test": "O le a le tulaga o lo'u suka ma A1c i la'u su'esu'ega mulimuli?",
"ai-assistant-suggestion-graph-cholesterol-trends": "E mafai ona e fa'aali mai se kalafa o le auala ua suia ai lo'u tulaga cholesterol i le taimi?",
"ai-assistant-suggestion-last-metabolic-panel": "O afea na fai ai la'u metabolic panel mulimuli?",
"ai-assistant-suggestion-hemoglobin-levels-trend": "O le a le auala o lo'u tulaga hemoglobin?",
"ai-assistant-suggestion-show-files": "Fa'aali mai a'u faila.",
"ai-assistant-suggestion-save-graph-to-files": "Sefe le kalafa i a'u faila",
"mindful-minutes": "Minute Mafaufau",
"therapy-minutes": "Minute Togafitiga",
"insight-matrix-no-comparison-data": "E leai ni ituaiga fa'amatalaga fa'atusatusa ua fa'atulagaina.",
"allergylist-reactions": "Tali",
"points-abbreviation": "pts",
"no-data": "Leai ni Fa'amatalaga",
"no-data-yet": "E leai ni fa'amatalaga i le taimi nei",
"bp-low": "Maulalo",
"bp-normal": "Masani",
"bp-elevated": "Maualuga",
"bp-stage1": "Tulaga 1",
"bp-stage2": "Tulaga 2",
"bp-crisis": "Fa'alavelave",
"bp-unknown": "Le Iloa",
"device-not-enabled": "E le fa'atagaina @@DEVICE@@ mo lenei poloketi.",
"download-pdf-report": "Fa'aifo Lipoti PDF",
"connect-to-device": "Fa'afeso'ota'i i @@DEVICE@@",
"symptoms-and-treatments": "Fa'ailoga Ma'i & Togafitiga",
"subsequent-evaluation-note": "Fa'amatalaga o le iloiloga mulimuli",
"summary": "Aotelega",
"device-activity": "Gaoioiga o le Masini",
"daily": "Aso Taitasi",
"weekly": "Vaiaso Taitasi",
"monthly": "Masina Taitasi",
"bonus": "Fa'aopoopoga",
"syncing-data": "Fa'atusatusa fa'amatalaga...",
"health-connect-phr-sync-title": "Fa'atusatusa ma le Health Connect",
"health-connect-phr-sync-prompt": "Filifili fa'amaumauga soifua maloloina e faitau mai ma tusi i le Health Connect"
};

export default strings;




