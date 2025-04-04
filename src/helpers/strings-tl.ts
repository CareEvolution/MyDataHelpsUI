﻿let strings: { [key: string]: string } = {
    "back": "Bumalik",
    "done": "Tapos na",
    "close": "Isara",
    "save": "I-save",
    "add": "Magdagdag",
    "edit": "I-edit",
    "cancel": "Kanselahin",
    "clear": "Burahin",
    "settings": "Mga Setting",
    "connect": "Kumonekta",
    "reconnect": "Muling Kumonekta",
    "setup": "I-setup",
    "refresh": "I-refresh",
    "remove": "Alisin",
    "help": "Tulong",
    "view": "Tingnan",
    "health-records": "Mga Rekord ng Kalusugan",
    "connect-ehr-title-prefix": "Ikonekta ang ",
    "connect-ehr-title-divider": " o ",
    "connect-ehr-title-providers": "Provider",
    "connect-ehr-title-health-plans": "Health Plan",
    "connect-ehr-connected": "Natatanggap na namin ang iyong EHR data!",
    "connect-ehr-needs-attention": "Ang isa sa iyong mga account ay nangangailangan ng atensyon.",
    "connect-ehr-text": "Ikonekta ang iyong provider o health plan upang makita ang iyong mga resulta ng laboratoryo, kondisyon, gamot at iba pa.",
    "connect-ehr-text-connected": "Ikonekta ang isa pang provider upang magbahagi ng higit pang data o pamahalaan ang iyong mga koneksyon sa EHR.",
    "connect-ehr-not-enabled": "Ang pag-link ng EHR ay hindi pinagana para sa proyektong ito.",
    "search-for-provider": "Maghanap ng Provider o Health Plan",
    "request-add": "Humiling na idagdag",
    "expired-reconnect": "Nag-expire ang koneksyon. Mangyaring muling kumonekta.",
    "connect-error-reconnect": "Hindi inaasahang error. Mangyaring muling kumonekta.",
    "connected": "Nakakonekta",
    "search": "Maghanap",
    "connect-fitbit-intro": "Maaari kang magbahagi ng data mula sa iyong Fitbit account kung mayroon ka. Upang magsimula, mag-click o mag-tap sa ibaba upang mag-log in gamit ang iyong mga kredensyal sa Fitbit.",
    "connect-fitbit-button": "Ikonekta ang Fitbit",
    "received-fitbit-data": "Natatanggap na namin ang iyong Fitbit data!",
    "connect-garmin-intro": "Maaari kang magbahagi ng data mula sa iyong Garmin account kung mayroon ka. Upang magsimula, mag-click o mag-tap sa ibaba upang mag-log in gamit ang iyong mga kredensyal sa Garmin.",
    "connect-garmin-button": "Ikonekta ang Garmin",
    "received-garmin-data": "Natatanggap na namin ang iyong Garmin data!",
    "connect-oura-intro": "Maaari kang magbahagi ng data mula sa iyong Oura account kung mayroon ka. Upang magsimula, mag-click o mag-tap sa ibaba upang mag-log in gamit ang iyong mga kredensyal sa Oura.",
    "connect-oura-button": "Ikonekta ang Oura",
    "received-oura-data": "Natatanggap na namin ang iyong Oura data!",
    "connect-dexcom-intro": "Maaari kang magbahagi ng data mula sa iyong Dexcom account kung mayroon ka. Upang magsimula, mag-click o mag-tap sa ibaba upang mag-log in gamit ang iyong mga kredensyal sa Dexcom.",
    "connect-dexcom-button": "Ikonekta ang Dexcom",
    "received-dexcom-data": "Natatanggap na namin ang iyong Dexcom data!",
    "downloading-data": "Nagda-download ng data...",
    "downloading-data-menu": "Nagda-download ng Data",
    "empty-tasks-incomplete": "Walang bukas na gawain na ipapakita sa ngayon.",
    "empty-tasks-complete": "Ang mga nakumpletong gawain ay ipapakita dito.",
    "view-all": "Tingnan Lahat",
    "tasks": "Mga Gawain",
    "incomplete-tasks": "Hindi Nakumpletong Mga Gawain",
    "completed-tasks": "Nakumpletong Mga Gawain",
    "overdue": "Huli na",
    "due-today": "Dapat Ngayon",
    "due-tomorrow": "Dapat Bukas",
    "due": "Dapat",
    "due-in": "Dapat sa loob ng",
    "days": "araw",
    "notifications": "Mga Abiso",
    "support": "Suporta",
    "all-notifications": "Lahat ng Mga Abiso",
    "steps": "Mga Hakbang",
    "resting-heart-rate": "Resting Heart Rate",
    "distance-traveled": "Distansyang Naglakbay",
    "google-fit-share": "I-tap upang magbahagi ng fitness data",
    "devices": "Mga Device",
    "last-sync": "Huling naka-sync",
    "completed": "Nakumpleto",
    "ehr-intro-search": "Maghanap sa pamamagitan ng paglalagay ng pangalan ng iyong provider o portal ng miyembro para sa iyong healthcare provider o health plan.",
    "external-accounts-title-divider": " / ",
    "external-accounts-title-providers": "Mga Provider",
    "external-accounts-title-health-plans": "Mga Health Plan",
    "external-accounts-title-devices": "Mga Device",
    "external-accounts-error": "Ang isa sa iyong mga account ay nangangailangan ng atensyon",
    "external-accounts-loading": "Ang iyong data ay kasalukuyang dina-download mula sa iyong mga nakalink na health plan at provider. Mangyaring bumalik sa ilang sandali upang makita ang iyong data.",
    "external-account-authorization-expired": "Nag-expire ang awtorisasyon",
    "external-account-fetching-data": "Kinukuha ang data...",
    "external-account-deleting": "Inaalis...",
    "external-account-last-updated": "Huling na-update",
    "external-account-error": "Hindi inaasahang error",
    "external-account-reconnect": "Muling Kumonekta",
    "external-account-refresh": "I-refresh",
    "external-account-remove": "Alisin",
    "device-data-no-data": "Kung nakakonekta ka sa Apple Health, Google Fit, Fitbit, o Garmin, bumalik mamaya upang makita ang iyong data.",
    "no-notifications-received": "Walang natanggap na mga abiso",
    "next-button-text": "Susunod",
    "lab-results-title": "Mga Resulta ng Laboratoryo",
    "medications-title": "Mga Gamot",
    "immunizations-title": "Mga Bakuna",
    "reports-title": "Mga Ulat",
    "allergies-title": "Mga Alerhiya",
    "conditions-title": "Mga Kondisyon",
    "procedures-title": "Mga Pamamaraan",
    "app-download-title": "Susunod: I-download ang App",
    "app-download-subtitle": "Ang pag-download ng MyDataHelps app ay nagpapadali pa upang lumahok sa @@PROJECT_NAME@@.",
    "app-download-google-play-link-alt": "I-download sa Google Play Store",
    "app-download-app-store-link-alt": "I-download sa Apple App Store",
    "start": "Simulan",
    "resume": "Ipagpatuloy",
    "start-survey": "Simulan ang Survey",
    "resume-survey": "Ipagpatuloy ang Survey",
    "30-day-average": "30 Araw na Average",
    "today": "Ngayon",
    "yesterday": "Kahapon",
    "tap-to-log-today": "I-tap dito upang i-log ang iyong mga sintomas o paggamot!",
    "mild": "Banayad",
    "moderate": "Katamtaman",
    "severe": "Malubha",
    "severe-shortened": "mal",
    "moderate-shortened": "kat",
    "mild-shortened": "ban",
    "log-todays-symptoms": "I-log ang Mga Sintomas Ngayon",
    "todays-log": "Log Ngayon",
    "symptoms": "Mga Sintomas",
    "treatments": "Mga Paggamot",
    "symptoms-experiencing-today": "Anong mga sintomas ang nararanasan mo?",
    "symptoms-experiencing-previous": "Anong mga sintomas ang naranasan mo?",
    "treatments-experiencing-today": "Anong mga paggamot ang ginawa mo?",
    "treatments-experiencing-previous": "Anong mga paggamot ang ginawa mo?",
    "feeling-overall-today": "Kumusta ang iyong pakiramdam sa pangkalahatan?",
    "feeling-overall-previous": "Kumusta ang iyong pakiramdam sa pangkalahatan?",
    "additional-notes": "May karagdagang mga tala?",
    "how-severe-is": "Gaano kalubha ang iyong",
    "how-severe-was": "Gaano kalubha ang iyong",
    "clear-symptom": "Burahin ang Sintomas",
    "add-notes": "Magdagdag ng mga tala",
    "notes": "Mga Tala",
    "enter-symptom-name": "Ilagay ang Pangalan ng Sintomas",
    "enter-treatment-name": "Ilagay ang Pangalan ng Paggamot",
    "severity-tracking-none": "Huwag Subaybayan ang Kalubhaan",
    "severity-tracking-3point": "Banayad / Katamtaman / Malubha na Rating",
    "severity-tracking-10point": "1 - 10 Puntos na Rating",
    "muted": "Naka-mute",
    "not-muted": "Hindi Naka-mute",
    "delete": "Burahin",
    "severity": "Kalubhaan",
    "item-delete-warning": "Babala: Ang pagpapatuloy ay permanenteng magbubura ng mga item sa ibaba at lahat ng nauugnay na data mula sa iyong mga log. Kung ayaw mong burahin ang mga item na ito, piliin ang \"Kanselahin\".",
    "unsaved-changes": "Hindi Na-save na Mga Pagbabago",
    "daily-overall-experience": "Pang-araw-araw na Karanasan sa Pangkalahatan",
    "average": "Average",
    "include-symptoms": "Isama ang Mga Sintomas",
    "select-symptoms": "Piliin ang Mga Sintomas",
    "include-treatments": "Isama ang Mga Paggamot",
    "select-treatments": "Piliin ang Mga Paggamot",
    "download-mydatahelps": "I-download ang MyDataHelps",
    "connect-devices-title": "Ikonekta ang Mga Device",
    "connect-devices-text": "Magbahagi ng data mula sa iyong mga wearable, app, at iba pang mga device.",
    "apple-health-troubleshooting-intro": "Kung hindi mo inaprubahan o hindi pinagana ang pagbabahagi ng iyong Apple Health data at nais mong paganahin ito, sundin ang mga hakbang na ito:",
    "apple-health-troubleshooting-li-1": "Buksan ang \"Settings\" app",
    "apple-health-troubleshooting-li-2": "Piliin ang \"Privacy\"",
    "apple-health-troubleshooting-li-3": "Piliin ang \"Health\"",
    "apple-health-troubleshooting-li-4": "Piliin ang \"MyDataHelps\"",
    "apple-health-troubleshooting-li-5": "Paganahin ang mga kategorya ng data na nais mong ibahagi",
    "how-to-enable": "Paano paganahin",
    "new-points-title": "Mahusay!",
    "new-points-text": "Ikaw ay nabigyan ng mga puntos para sa mga sumusunod:",
    "new-points-next-reward-prefix": "Kailangan mo na ng ",
    "new-points-next-reward-suffix": " puntos upang i-unlock ang iyong susunod na gantimpala.",
    "new-points-done-button-text": "Tapos na",
    "systolic-average": "Systolic Average",
    "diastolic-average": "Diastolic Average",
    "highest-systolic": "Pinakamataas na Systolic",
    "lowest-systolic": "Pinakamababang Systolic",
    "resource-default-button-text": "Buksan",
    "inbox-message-completed-status": "NAKITA",
    "inbox-resource-completed-status": "NAKITA",
    "inbox-survey-completed-status": "NAKUMPLETO",
    "inbox-history-view-title": "Kasaysayan ng Inbox",
    "inbox-history-view-empty-text": "Wala kang mga item sa iyong kasaysayan ng inbox.",
    "inbox-message-view-related-resources-title": "Kaugnay",
    "inbox-view-title": "Inbox",
    "inbox-view-empty-text": "Wala kang bagong mga item sa iyong inbox.",
    "inbox-view-messages-title": "Mga Mensahe",
    "inbox-view-surveys-title": "Mga Survey",
    "inbox-view-resources-title": "Mga Mapagkukunan",
    "inbox-view-recently-completed-title": "Kamakailan",
    "inbox-view-recently-completed-empty-text": "Wala kang mga item na kamakailan nakumpleto sa iyong inbox.",
    "inbox-view-history-button-text": "Tingnan ang kasaysayan ng inbox",
    "choose-report-month": "Pumili ng Buwan ng Ulat",
    "include-overall-experience": "Isama ang Pang-araw-araw na Karanasan sa Pangkalahatan",
    "include-notes": "Isama ang Mga Tala",
    "create-report": "Gumawa ng PDF Report",
    "reports": "Mga Ulat",
    "recent-daily-data-bar-chart-subtitle": "Nakaraang 7 araw",
    "recent-daily-data-bar-chart-no-data": "Walang Data",
    "resource-list-empty-text": "Walang nahanap na mga mapagkukunan.",
    "asthma-symptom-level-none": "Walang mga sintomas",
    "asthma-symptom-level-mild": "Banayad na mga sintomas",
    "asthma-symptom-level-moderate": "Katamtamang mga sintomas",
    "asthma-symptom-level-severe": "Malubhang mga sintomas",
    "asthma-symptom-difficulty-breathing": "Hirap sa paghinga",
    "asthma-symptom-wheezing": "Paghinga nang may tunog",
    "asthma-symptom-coughing": "Pag-ubo",
    "asthma-symptom-chest-tightness": "Paninikip o presyon sa dibdib",
    "asthma-impact-limit-daily-activity": "Limitahan ang iyong pang-araw-araw na aktibidad",
    "asthma-impact-waking-at-night": "Gumising sa gabi",
    "asthma-impact-using-rescue-inhaler": "Gumamit ng iyong rescue inhaler",
    "asthma-trigger-cold-illness": "Sipon/viral na sakit",
    "asthma-trigger-animal-exposure": "Pagkakalantad sa hayop",
    "asthma-trigger-seasonal-allergens": "Pana-panahong allergen/pollen",
    "asthma-trigger-exercise": "Ehersisyo",
    "asthma-trigger-smoke": "Usok",
    "asthma-trigger-weather-changes": "Matinding pagbabago ng panahon",
    "asthma-trigger-air-pollution": "Polusyon sa hangin",
    "asthma-trigger-strong-smells": "Matapang na amoy",
    "asthma-trigger-chemicals": "Kemikal/panlinis na gamit",
    "asthma-trigger-dust": "Alikabok",
    "asthma-trigger-mold": "Amag",
    "asthma-trigger-dust-mites": "Dust mites",
    "asthma-trigger-rodents": "Mga daga",
    "asthma-trigger-cockroaches": "Mga ipis",
    "asthma-trigger-nsaid": "NSAID/Aspirin",
    "asthma-trigger-beta-blocker": "Beta blocker",
    "asthma-trigger-heartburn": "Heartburn",
    "asthma-trigger-red-wine": "Pulang alak",
    "asthma-trigger-new-foods": "Bagong pagkain",
    "asthma-trigger-cooked-without-ventilation": "Pagluluto (walang bentilasyon)",
    "asthma-trigger-pet-in-bed": "Alagang hayop sa iyong kama",
    "asthma-trigger-incense-or-candle": "Kandila/insenso",
    "asthma-data-status-out-of-range": "Wala sa saklaw",
    "asthma-data-status-in-range": "Nasa saklaw",
    "asthma-data-status-offline": "Offline",
    "asthma-data-status-establishing": "Nagtatag",
    "asthma-data-status-not-determined": "Hindi pa naitatag ang baseline",
    "asthma-data-status-not-found": "Walang naitalang data",
    "asthma-data-status-not-configured": "Hindi naka-configure",
    "asthma-control-calendar-daily-entry-missed": "Napalampas ang pang-araw-araw na entry",
    "asthma-control-calendar-not-logged-yet": "Hindi pa nai-log",
    "asthma-control-calendar-log-entries-symptoms-label": "Mga Sintomas",
    "asthma-control-calendar-log-entries-impacts-label": "Mga Epekto",
    "asthma-control-calendar-log-entries-triggers-label": "Mga Trigger",
    "asthma-control-status-header-complete-daily-entry": "Kumpletuhin ang iyong pang-araw-araw na entry.",
    "asthma-control-status-header-multiple-out-of-range-p1": "Maraming data point ay ",
    "asthma-control-status-header-multiple-out-of-range-p2": "wala sa iyong normal na antas",
    "asthma-control-status-header-abnormal-heart-rate-p1": "Ang iyong resting heart rate ay ",
    "asthma-control-status-header-abnormal-heart-rate-p2": "mas mataas sa iyong normal na antas",
    "asthma-control-status-header-abnormal-respiratory-rate-p1": "Ang iyong respiratory rate ay ",
    "asthma-control-status-header-abnormal-respiratory-rate-p2": "mas mataas sa iyong normal na antas",
    "asthma-control-status-header-abnormal-steps-p1": "Ang iyong aktibidad ay ",
    "asthma-control-status-header-abnormal-steps-p2": "mas mababa sa iyong normal na antas",
    "asthma-control-status-header-abnormal-sleep-p1": "Ang iyong mga pagkagambala sa pagtulog ay ",
    "asthma-control-status-header-abnormal-sleep-p2": "mas mataas sa iyong normal na antas",
    "asthma-control-status-header-abnormal-blood-oxygen-p1": "Ang iyong antas ng oxygen sa dugo ay ",
    "asthma-control-status-header-abnormal-blood-oxygen-p2": "mas mababa sa iyong normal na antas",
    "asthma-control-status-header-abnormal-home-aqi-p1": "Ang iyong Air Quality Index sa bahay ay ",
    "asthma-control-status-header-abnormal-work-aqi-p1": "Ang iyong Air Quality Index sa trabaho ay ",
    "asthma-control-status-header-no-data": "Magdagdag ng pang-araw-araw na entry upang masuri ang iyong kontrol sa hika.",
    "asthma-control-status-header-no-data-caregiver": "Magdagdag ng pang-araw-araw na entry upang masuri ang kontrol sa hika ni {name}.",
    "asthma-control-status-header-not-determined": "Kailangan ng higit pang pang-araw-araw na entry upang masuri ang iyong kontrol sa hika.",
    "asthma-control-status-header-not-determined-caregiver": "Kailangan ng higit pang pang-araw-araw na entry upang masuri ang kontrol sa hika ni {name}.",
    "asthma-control-status-header-controlled": "Batay sa iyong mga entry, ang iyong hika ay |||kontrolado|||.",
    "asthma-control-status-header-controlled-caregiver": "Batay sa mga entry, ang hika ni {name} ay |||kontrolado|||.",
    "asthma-control-status-header-not-controlled": "Batay sa iyong mga entry, ang iyong hika ay |||hindi kontrolado|||.",
    "asthma-control-status-header-not-controlled-caregiver": "Batay sa mga entry, ang hika ni {name} ay |||hindi kontrolado|||.",
    "asthma-control-status-header-not-controlled-stat-symptom-days": "Mga araw ng sintomas",
    "asthma-control-status-header-not-controlled-stat-rescue-inhaler": "Rescue inhaler",
    "asthma-control-status-header-not-controlled-stat-limited-activity": "Limitadong aktibidad",
    "asthma-control-status-header-not-controlled-stat-awakenings": "Mga paggising",
    "asthma-action-plan-manager-title": "Plano ng Aksyon sa Hika",
    "asthma-action-plan-manager-instructions": "Mag-save ng larawan ng iyong plano ng aksyon sa hika para sa madaling sanggunian.",
    "asthma-action-plan-manager-instructions-caregiver": "Mag-save ng larawan ng plano ng aksyon sa hika ni {name} para sa madaling sanggunian.",
    "asthma-action-plan-manager-learn-more": "Ano ang plano ng aksyon sa hika?",
    "asthma-action-plan-manager-edit-button-text": "I-edit",
    "asthma-action-plan-manager-not-found-text": "I-tap upang magdagdag ng larawan",
    "asthma-biometrics-title": "Kalusugan at Aktibidad",
    "asthma-biometrics-daytime-resting-heart-rate-label": "Resting HR (Araw)",
    "asthma-biometrics-nighttime-resting-heart-rate-label": "Resting HR (Gabi)",
    "asthma-biometrics-beats-per-minute-units": "BPM",
    "asthma-biometrics-respiratory-rate-label": "Respiratory Rate",
    "asthma-biometrics-breaths-per-minute-units": "BPM",
    "asthma-biometrics-steps-label": "Mga Hakbang",
    "asthma-biometrics-daytime-blood-oxygen-level-label": "Oxygen Saturation (Araw)",
    "asthma-biometrics-nighttime-blood-oxygen-level-label": "Oxygen Saturation (Gabi)",
    "asthma-biometrics-percent-units": "%",
    "asthma-biometrics-sleep-disturbances-label": "Mga Pagkagambala sa Pagtulog",
    "asthma-air-qualities-title": "Kalidad ng Hangin",
    "asthma-air-qualities-setup-button-text": "+ I-setup",
    "asthma-air-qualities-home-aqi-label": "AQI (Bahay)",
    "asthma-air-qualities-work-aqi-label": "AQI (Trabaho)",
    "asthma-alert-takeover-notice-instructions": "Maglaan ng sandali upang i-record ang anumang sintomas ng hika sa pang-araw-araw na entry.",
    "asthma-alert-takeover-notice-add-entry-button-text": "+ Pang-araw-araw na Entry",
    "asthma-alert-takeover-notice-not-now-button-text": "Hindi Ngayon",
    "asthma-log-entry-details-not-editable": "Napalampas ang pang-araw-araw na entry",
    "asthma-log-entry-details-not-logged-yet": "Hindi pa nai-log",
    "asthma-log-entry-details-edit-button-text": "I-edit",
    "asthma-log-entry-details-add-button-text": "I-log ang Entry",
    "asthma-log-entry-details-symptoms-label": "Mga Sintomas",
    "asthma-log-entry-details-impacts-label": "Mga Epekto",
    "asthma-log-entry-details-triggers-label": "Mga Trigger",
    "asthma-log-entry-details-component-no-data-p1": "Walang ",
    "asthma-log-entry-details-component-no-data-p2": " na nai-log",
    "asthma-log-entry-header-today-log-label": "Ngayon",
    "asthma-log-entry-header-yesterday-log-label": "Kahapon",
    "asthma-log-entry-header-not-logged-yet": "Hindi pa nai-log",
    "asthma-log-entry-header-add-button-text": "I-log ang Entry",
    "asthma-activity-view-title": "Aktibidad",
    "asthma-activity-view-chart-title": "Mga Hakbang",
    "asthma-activity-view-alert-message": "Ang iyong aktibidad ay mas mababa sa iyong normal na antas.",
    "asthma-alert-takeover-message": "Maraming data point ay wala sa iyong normal na antas.",
    "asthma-air-quality-view-title": "Kalidad ng Hangin",
    "asthma-air-quality-view-home-aqi-chart-title": "Kalidad ng Hangin (Bahay)",
    "asthma-air-quality-view-home-aqi-alert-message": "Ang iyong AQI sa bahay ay hindi malusog.",
    "asthma-air-quality-view-work-aqi-chart-title": "Kalidad ng Hangin (Trabaho)",
    "asthma-air-quality-view-work-aqi-alert-message": "Ang iyong AQI sa trabaho ay hindi malusog.",
    "asthma-heart-and-lungs-view-title": "Puso at Baga",
    "asthma-heart-and-lungs-view-dhr-chart-title": "Resting Heart Rate (Araw)",
    "asthma-heart-and-lungs-view-dhr-alert-message": "Ang iyong resting heart rate sa araw ay mas mataas sa iyong normal na antas.",
    "asthma-heart-and-lungs-view-nhr-chart-title": "Resting Heart Rate (Gabi)",
    "asthma-heart-and-lungs-view-nhr-alert-message": "Ang iyong resting heart rate sa gabi ay mas mataas sa iyong normal na antas.",
    "asthma-heart-and-lungs-view-rr-chart-title": "Respiratory Rate",
    "asthma-heart-and-lungs-view-rr-alert-message": "Ang iyong respiratory rate ay mas mataas sa iyong normal na antas.",
    "asthma-heart-and-lungs-view-dbol-chart-title": "Blood Oxygen (Araw)",
    "asthma-heart-and-lungs-view-dbol-alert-message": "Ang iyong blood oxygen sa araw ay mas mababa sa iyong normal na antas.",
    "asthma-heart-and-lungs-view-nbol-chart-title": "Blood Oxygen (Gabi)",
    "asthma-heart-and-lungs-view-nbol-alert-message": "Ang iyong blood oxygen sa gabi ay mas mababa sa iyong normal na antas.",
    "asthma-sleep-view-title": "Pagtulog",
    "asthma-sleep-view-chart-title": "Mga Pagkagambala sa Pagtulog",
    "asthma-sleep-view-alert-message": "Ang iyong mga pagkagambala sa pagtulog ay mas mataas sa iyong normal na antas.",
    "asthma-log-entry-editor-view-symptom-level-title": "Antas ng sintomas",
    "asthma-log-entry-editor-view-select-one-subtitle": "Pumili ng isa",
    "asthma-log-entry-editor-view-select-all-subtitle": "Piliin lahat ng naaangkop",
    "asthma-log-entry-editor-view-symptoms-title": "Mga Sintomas",
    "asthma-log-entry-editor-view-impacts-title": "Mga Epekto",
    "asthma-log-entry-editor-view-triggers-title": "Mga Trigger",
    "asthma-air-quality-description-unhealthy": "Hindi Malusog",
    "asthma-air-quality-description-very-unhealthy": "Napaka-hindi Malusog",
    "asthma-air-quality-description-hazardous": "Mapanganib",
    "asthma-recommended-article-21-title": "Paano panatilihin ang iyong hika sa ilalim ng kontrol",
    "asthma-recommended-article-21-subtitle": "Manatiling walang sintomas sa pamamagitan ng pagsunod sa iyong plano ng paggamot, pag-unawa sa mga trigger, at maagang pagkilala sa mga pagbabago sa kontrol.",
    "asthma-recommended-article-22-title": "Kontrolado ba ang iyong hika?",
    "asthma-recommended-article-22-subtitle": "4 na tanong upang masuri kung kontrolado ang iyong hika. Kung nakakaranas ka ng mga sintomas nang higit sa 2 beses sa isang linggo o kung nagigising ka sa gabi dahil sa mga sintomas ng hika - hindi kontrolado ang iyong hika.",
    "asthma-recommended-article-24-title": "Pag-navigate sa Danger Zone: Paghahanda para sa Pag-alab ng Hika",
    "asthma-recommended-article-24-subtitle": "Kilalanin nang maaga ang malubhang mga sintomas tulad ng matinding pag-ubo at hirap sa paghinga, at i-activate ang iyong naka-customize na plano ng aksyon sa hika kabilang ang agarang mga gamot.",
    "asthma-recommended-article-25-title": "Pangangasiwa ng iyong hika",
    "asthma-recommended-article-25-subtitle": "Kapag pakiramdam mo ay hindi mo na mapangasiwaan ang iyong hika, oras na upang muling suriin ang iyong pamamaraan. Mga hakbang na dapat gawin kapag hindi kontrolado ang iyong hika.",
    "asthma-recommended-article-32-title": "Sino ang nangangailangan ng controller medication?",
    "asthma-recommended-article-32-subtitle": "Tuklasin ang mahalagang papel ng mga controller medication sa pagpapanatili ng hika sa ilalim ng kontrol.",
    "asthma-recommended-article-33-title": "Access sa gamot",
    "asthma-recommended-article-33-subtitle": "Para sa mga sitwasyon kung saan ang gastos ay hadlang sa mga gamot, alamin ang tungkol sa libre o murang mga gamot. Ang pag-inom ng mga gamot ayon sa inireseta ay mahalaga sa pagpapanatili ng kontrol sa hika.",
    "asthma-recommended-article-34-title": "Pag-refill ng gamot",
    "asthma-recommended-article-34-subtitle": "Panatilihing updated ang iyong gamot sa hika sa pamamagitan ng mga madaling estratehiya sa pag-refill.",
    "asthma-recommended-article-35-title": "Nahihirapan bang alalahanin ang mga gamot",
    "asthma-recommended-article-35-subtitle": "Tuklasin ang mga simpleng ngunit epektibong estratehiya upang matandaan ang iyong pang-araw-araw na dosis, mula sa mga matalinong tip sa pag-iimbak hanggang sa paggamit ng mga paalala sa app.",
    "asthma-recommended-article-36-title": "Kung kailan gagamitin ang bawat inhaler",
    "asthma-recommended-article-36-subtitle": "Maging dalubhasa sa pangangasiwa ng iyong hika: Ang rescue inhaler ay mabilis na gumagana upang mapagaan ang mga sintomas habang ang controller ay pang-iwas at gumagana sa pamamagitan ng pagbabawas ng pamamaga, karaniwang sa pamamagitan ng pag-inom araw-araw.",
    "asthma-recommended-article-37a-title": "Teknik ng inhaler - MDI",
    "asthma-recommended-article-37a-subtitle": "Mga tip sa teknik ng metered dose inhaler (MDI). Kung wala ang tamang teknik, maaaring bahagi lamang ng dosis ang iyong nakukuha.",
    "asthma-recommended-article-37b-title": "Teknik ng inhaler - DPI",
    "asthma-recommended-article-37b-subtitle": "Mga tip sa teknik ng Dry Powder inhaler (DPI). Kung wala ang tamang teknik, maaaring bahagi lamang ng dosis ang iyong nakukuha.",
    "asthma-recommended-article-37c-title": "Teknik ng inhaler - SMI",
    "asthma-recommended-article-37c-subtitle": "Mga tip sa teknik ng Soft Mist Inhaler (SMI). Kung wala ang tamang teknik, maaaring bahagi lamang ng dosis ang iyong nakukuha.",
    "asthma-recommended-article-37d-title": "Teknik ng inhaler - nebulizer",
    "asthma-recommended-article-37d-subtitle": "Mga tip sa teknik ng nebulizer.",
    "asthma-recommended-article-38-title": "Bakit ko dapat inumin ang aking controller?",
    "asthma-recommended-article-38-subtitle": "Unawain ang kritikal na papel ng mga controller medication at kung bakit ang mga ito ay isang cornerstone ng iyong personalized na plano ng pangangasiwa.",
    "asthma-recommended-article-39-title": "Mga side effect ng gamot sa hika",
    "asthma-recommended-article-39-subtitle": "Alamin kung paano matukoy ang mga karaniwang at hindi karaniwang side effect, at ang mga simpleng hakbang na maaari mong gawin upang maiwasan ang karaniwang side effect - thrush (fungal infection sa iyong bibig).",
    "asthma-recommended-article-39a-title": "Paano ko malalaman kung gumagana ang aking mga gamot sa hika?",
    "asthma-recommended-article-39a-subtitle": "Ang mga controller medication ay maaaring tumagal ng ilang araw hanggang linggo upang maabot ang buong epekto. Subaybayan ang iyong mga sintomas araw-araw upang makita kung may pagbuti at kung wala, kausapin ang iyong provider.",
    "asthma-recommended-article-41-title": "Mga hindi inaasahang trigger",
    "asthma-recommended-article-41-subtitle": "Tuklasin ang mga hindi inaasahang trigger ng hika na nakatago sa iyong pang-araw-araw na buhay, mula sa mga NSAID (tulad ng ibuprofen) hanggang sa iyong baso ng alak. Ang pag-alam kung ano ang hahanapin, ay maaaring makatulong sa iyo na matukoy ang mga hindi inaasahang trigger na ito.",
    "asthma-recommended-article-42-title": "Hika at Pana-panahong Allergen/Pollen",
    "asthma-recommended-article-42-subtitle": "I-navigate ang pollen season nang madali: Tukuyin ang iyong mga partikular na pollen trigger, unawain ang kanilang pana-panahong pattern, at alamin kung paano mababawasan ang pagkakalantad.",
    "asthma-recommended-article-43-title": "Hika at Kalidad ng Hangin",
    "asthma-recommended-article-43-subtitle": "Unawain na ang masamang kalidad ng hangin ay maaaring mag-trigger ng hika. Alamin kung paano i-navigate ang mga araw na mataas ang AQI at kung ano ang ibig sabihin ng mga antas ng AQI.",
    "asthma-recommended-article-43a-title": "Hika at Mga Impeksyon sa Respiratory",
    "asthma-recommended-article-43a-subtitle": "Ang mga impeksyon sa respiratory ay mga karaniwang trigger ng hika. Paano maiwasan ang mga ito at ano ang dapat gawin kapag nangyari ang mga ito.",
    "asthma-recommended-article-43b-title": "Hika at Mga Hayop",
    "asthma-recommended-article-43b-subtitle": "Ang mga hayop/alagang hayop ay maaaring maging trigger para sa hika. Alamin kung paano ma-diagnose ang allergy sa hayop/alagang hayop at mga hakbang upang mabawasan ang epekto.",
    "asthma-recommended-article-43c-title": "Hika at Usok",
    "asthma-recommended-article-43c-subtitle": "Ang mga wildfire at usok ng tabako ay maaaring mag-trigger ng hika. Alamin ang tungkol sa mga hakbang na maaari mong gawin upang mabawasan ang iyong pagkakalantad.",
    "asthma-recommended-article-43d-title": "Hika at Panahon",
    "asthma-recommended-article-43d-subtitle": "Ang mga karaniwang trigger ng panahon ay malamig na hangin, mainit at maalinsangang hangin, at ulan/kulog at kidlat. Tuklasin kung bakit ang mga ito ay maaaring mag-trigger ng hika.",
    "asthma-recommended-article-43e-title": "Matapang na Amoy at Kemikal/Panlinis na Gamit",
    "asthma-recommended-article-43e-subtitle": "Tuklasin kung anong mga amoy ang maaaring mag-trigger ng iyong hika at mga bagay na dapat isaalang-alang habang naglilinis.",
    "asthma-recommended-article-43f-title": "Hika at Alikabok/Dust Mites",
    "asthma-recommended-article-43f-subtitle": "Ang alikabok ay isang karaniwang trigger ng hika, ngunit ang dahilan kung bakit ito ay isang trigger ay maaaring magulat sa iyo!",
    "asthma-recommended-article-43g-title": "Hika at Amag",
    "asthma-recommended-article-43g-subtitle": "Ang amag ay nangangailangan ng kahalumigmigan upang lumago, kaya karaniwang matatagpuan sa mga maalinsangan o basang lugar. Alamin kung paano maiwasan ang amag sa iyong bahay.",
    "asthma-recommended-article-43h-title": "Hika at Heartburn",
    "asthma-recommended-article-43h-subtitle": "Ano ang heartburn at ano ang kinalaman nito sa hika?",
    "blood-type": "Uri ng Dugo",
    "device-data-month-chart-no-data": "Walang Data",
    "device-data-month-chart-daily-average": "Pang-araw-araw na Average",
    "term-information-not-found-header": "Walang Nahanap na Impormasyon",
    "term-information-not-found-body": "Hindi mahanap ang anumang impormasyon sa paksang ito",
    "term-information-disclaimer": "<strong>DISCLAIMER:</strong> Ang impormasyong ibinigay ay hindi medikal na payo. Ito ay upang tulungan kang mas maunawaan ang iyong kalusugan. Mangyaring makipag-ugnayan sa iyong healthcare provider kung mayroon kang mga katanungan tungkol sa iyong medikal na kondisyon.",
    "term-information-view-on-medline": "Tingnan sa MedlinePlus",
    "type": "Uri",
    "location": "Lokasyon",
    "description": "Paglalarawan",
    "performed-by": "Isinagawa Ni",
    "verified-by": "Binerify Ni",
    "normal-range": "Normal na Saklaw",
    "more": "Higit Pa",
    "procedure": "Pamamaraan",
    "procedures": "Mga Pamamaraan",
    "lab-report": "Ulat ng Laboratoryo",
    "service-performed": "Serbisyong Isinagawa",
    "services-performed": "Mga Serbisyong Isinagawa",
    "device-data-month-chart-minutes": "Minuto",
    "device-data-month-chart-sleep": "Pagtulog",
    "air-quality": "Kalidad ng Hangin",
    "air-quality-home": "Kalidad ng Hangin (Bahay)",
    "air-quality-work": "Kalidad ng Hangin (Trabaho)",
    "sedentary-time": "Oras ng Hindi Paggalaw",
    "active-time": "Aktibong Oras",
    "lightly-active-time": "Bahagyang Aktibong Oras",
    "fairly-active-time": "Medyo Aktibong Oras",
    "very-active-time": "Napaka-aktibong Oras",
    "breathing-rate": "Bilis ng Paghinga",
    "calories-burned": "Nasunog na Calories",
    "elevated-heart-rate-time": "Oras ng Mataas na Heart Rate",
    "fat-burn-heart-rate-time": "Oras ng Fat Burn",
    "cardio-heart-rate-time": "Oras ng Cardio",
    "peak-heart-rate-time": "Oras ng Peak",
    "floors-climbed": "Mga Palapag na Inakyat",
    "heart-rate-variability": "Heart Rate Variability",
    "sleep-time": "Oras ng Pagtulog",
    "light-sleep-time": "Oras ng Light Sleep",
    "deep-sleep-time": "Oras ng Deep Sleep",
    "rem-sleep-time": "Oras ng REM Sleep",
    "spo2": "SpO2",
    "heart-rate-range": "Saklaw ng Heart Rate",
    "max-heart-rate": "Maximum na Heart Rate",
    "core-sleep-time": "Oras ng Core Sleep",
    "in-bed-time": "Oras sa Kama",
    "stand-time": "Oras ng Pagtayo",
    "walking-heart-rate-average": "Average ng Walking HR",
    "active-energy-burned": "Nasunog na Active Energy",
    "number-of-alcoholic-beverages": "Bilang ng Mga Inuming May Alkohol",
    "active-calories": "Aktibong Calories",
    "resting-calories": "Resting Calories",
    "total-calories": "Kabuuang Calories",
    "min-heart-rate": "Minimum na Heart Rate",
    "average-heart-rate": "Average na Heart Rate",
    "max-stress-level": "Maximum na Antas ng Stress",
    "average-stress-level": "Average na Antas ng Stress",
    "total-stress-time": "Kabuuang Oras ng Stress",
    "low-stress-time": "Oras ng Mababang Stress",
    "medium-stress-time": "Oras ng Katamtamang Stress",
    "high-stress-time": "Oras ng Mataas na Stress",
    "awake-time": "Oras ng Paggising",
    "sleep-score": "Sleep Score",
    "bpm": "bpm",
    "hours-abbreviation": "h",
    "minutes-abbreviation": "m",
    "points-until-next-badge": "{{points}} puntos hanggang sa susunod na badge",
    "fitbit-wear-time": "Oras ng Pagsuot ng Fitbit",
    "my-badges": "Aking Mga Badge ({{badges}})",
    "new-badge-title": "Magaling!",
    "new-badge-text": "Nakakuha ka ng bagong badge!",
    "get-badge": "Kumuha ng Badge",
    "glucose-chart-no-data": "Walang mga pagbasa ng blood glucose",
    "glucose-stats-range-label": "Saklaw ng Blood Glucose",
    "glucose-stats-avg-label": "Average na Blood Glucose",
    "glucose-stats-steps-label": "Mga Hakbang",
    "glucose-stats-sleep-label": "Pagtulog",
    "stress-level-title": "Pangkalahatang Stress",
    "stress-level-min-label": "Walang Stress",
    "stress-level-max-label": "Lubhang Stressed",
    "meal-type-meal": "Pagkain",
    "meal-type-snack": "Meryenda",
    "meal-type-drink": "Inumin",
    "meal-log-title": "Talaan ng Pagkain",
    "meal-log-no-data": "Walang nai-log na pagkain",
    "meal-editor-time-input-label": "Oras",
    "meal-editor-description-input-label": "Paglalarawan",
    "meal-editor-description-optional": "Opsyonal",
    "meal-editor-duplicate-timestamp-error": "Hindi maaaring magkaroon ng parehong timestamp ang dalawang pagkain.",
    "meal-editor-add-image": "Magdagdag ng Larawan",
    "meal-editor-image-upload-error": "Nagkaroon ng error habang ina-upload ang napiling larawan. Pakisubukang muli, gumamit ng ibang larawan, o alisin ang larawan upang mai-save.",
    "glucose-view-title": "Pagsubaybay ng Glucose",
    "ai-assistant-loading": "Nakikipag-ugnayan sa iyong data...",
    "ai-assistant-suggestion-avg-weekly-heart-rate": "Ano ang aking average na heart rate para sa nakaraang linggo?",
    "ai-assistant-suggestion-highest-heart-rate-week": "Ano ang pinakamataas kong heart rate ngayong linggo?",
    "ai-assistant-suggestion-graph-daily-steps-21-days": "Gumawa ng graph ng aking pang-araw-araw na hakbang para sa nakaraang 21 araw",
    "ai-assistant-suggestion-weekly-workouts-average-month": "Ilang workout sa isang linggo ang aking average ngayong buwan?",
    "ai-assistant-suggestion-avg-monthly-blood-pressure": "Ano ang aking average na presyon ng dugo para sa nakaraang buwan?",
    "ai-assistant-suggestion-daily-active-minutes-month": "Ano ang aking pang-araw-araw na average para sa aktibong minuto ngayong buwan?",
    "ai-assistant-suggestion-resting-heart-rate-change-month": "Paano nagbago ang aking resting heart rate sa nakaraang buwan?",
    "ai-assistant-suggestion-stand-ups-yesterday": "Gaano kadalas ako tumayo kahapon?",
    "ai-assistant-suggestion-graph-heart-rate-trends-workouts": "Maaari mo bang i-graph ang mga trend ng aking heart rate sa mga workout ngayong linggo?",
    "ai-assistant-suggestion-sleep-7-days": "Kumusta ang aking pagtulog sa nakaraang 7 araw?",
    "ai-assistant-suggestion-fall-asleep-time-2-weeks": "Anong oras ako karaniwang nakakatulog sa nakaraang 2 linggo?",
    "ai-assistant-suggestion-sleep-quality-change-month": "Paano nagbago ang kalidad ng aking pagtulog sa nakaraang buwan?",
    "ai-assistant-suggestion-last-tetanus-vaccine": "Kailan ang aking huling bakuna sa tetanus?",
    "ai-assistant-suggestion-last-blood-test-lab-work": "Kailan ang aking huling pagsusuri ng dugo o lab work?",
    "ai-assistant-suggestion-abnormal-lab-results": "Mayroon ba akong anumang abnormal na resulta ng lab?",
    "ai-assistant-suggestion-last-cbc-test": "Kailan ang aking huling complete blood count (CBC)?",
    "ai-assistant-suggestion-glucose-a1c-levels-last-test": "Ano ang aking mga antas ng glucose at A1c sa aking huling pagsusuri?",
    "ai-assistant-suggestion-graph-cholesterol-trends": "Maaari mo bang ipakita sa akin ang graph kung paano nagbago ang aking mga antas ng kolesterol sa paglipas ng panahon?",
    "ai-assistant-suggestion-last-metabolic-panel": "Kailan huling ginawa ang aking metabolic panel?",
    "ai-assistant-suggestion-hemoglobin-levels-trend": "Ano ang trend sa aking mga antas ng hemoglobin?",
    "ai-assistant-suggestion-show-files": "Ipakita sa akin ang aking mga file.",
    "ai-assistant-suggestion-save-graph-to-files": "I-save ang graph sa aking mga file",
    "mindful-minutes": "Mga Mindful na Minuto",
    "therapy-minutes": "Mga Minuto ng Therapy",
    "insight-matrix-no-comparison-data": "Walang naka-configure na mga uri ng data para sa paghahambing.",
    "allergylist-reactions": "Mga Reaksyon",
    "points-abbreviation": "pts",
    "no-data": "Walang Data",
    "no-data-yet": "Wala pang data",
    "bp-low": "Mababa",
    "bp-normal": "Normal",
    "bp-elevated": "Mataas",
    "bp-stage1": "Stage 1",
    "bp-stage2": "Stage 2",
    "bp-crisis": "Krisis",
    "bp-unknown": "Hindi Alam",
    "device-not-enabled": "Ang @@DEVICE@@ ay hindi pinagana para sa proyektong ito.",
    "download-pdf-report": "I-download ang PDF Report",
    "connect-to-device": "Kumonekta sa @@DEVICE@@",
    "symptoms-and-treatments": "Mga Sintomas at Paggamot",
    "subsequent-evaluation-note": "Kasunod na tala ng ebalwasyon",
    "summary": "Buod",
    "device-activity": "Aktibidad ng Device",
    "daily": "Araw-araw",
    "weekly": "Lingguhan",
    "monthly": "Buwanan",
    "bonus": "Bonus",
    "syncing-data": "Nag-si-sync ng data...",
    "health-connect-phr-sync-title": "Mag-sync sa Health Connect",
    "health-connect-phr-sync-prompt": "Pumili ng mga health record na babasahin mula sa at isusulat sa Health Connect"
};

export default strings;
    

