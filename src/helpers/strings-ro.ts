﻿let strings: { [key: string]: string } = {
    "back": "Înapoi",
    "done": "Gata",
    "close": "Închide",
    "save": "Salvează",
    "add": "Adaugă",
    "edit": "Editează",
    "cancel": "Anulează",
    "clear": "șterge",
    "settings": "Setări",
    "connect": "Conectează",
    "reconnect": "Reconectează",
    "setup": "Configurare",
    "refresh": "Reîmprospătează",
    "remove": "Elimină",
    "help": "Ajutor",
    "view": "Vizualizează",
    "health-records": "Înregistrări medicale",
    "connect-ehr-title-prefix": "Conectează ",
    "connect-ehr-title-divider": " sau ",
    "connect-ehr-title-providers": "Furnizor",
    "connect-ehr-title-health-plans": "Plan de sănătate",
    "connect-ehr-connected": "Primim datele tale EHR!",
    "connect-ehr-needs-attention": "Unul dintre conturile tale necesită atenție.",
    "connect-ehr-text": "Conectează-ți furnizorul sau planul de sănătate pentru a vizualiza rezultatele analizelor, afecțiunile, medicamentele și altele.",
    "connect-ehr-text-connected": "Conectează un alt furnizor pentru a partaja mai multe date sau pentru a-ți gestiona conexiunile EHR.",
    "connect-ehr-not-enabled": "Conectarea EHR nu este activată pentru acest proiect.",
    "search-for-provider": "Caută furnizor sau plan de sănătate",
    "request-add": "Solicită adăugarea",
    "expired-reconnect": "Conexiunea a expirat. Te rugăm să te reconectezi.",
    "connect-error-reconnect": "Eroare neașteptată. Te rugăm să te reconectezi.",
    "connected": "Conectat",
    "search": "Caută",
    "connect-fitbit-intro": "Poți partaja date din contul tău Fitbit dacă ai unul. Pentru a începe, apasă mai jos pentru a te autentifica cu credențialele tale Fitbit.",
    "connect-fitbit-button": "Conectează Fitbit",
    "received-fitbit-data": "Primim datele tale Fitbit!",
    "connect-garmin-intro": "Poți partaja date din contul tău Garmin dacă ai unul. Pentru a începe, apasă mai jos pentru a te autentifica cu credențialele tale Garmin.",
    "connect-garmin-button": "Conectează Garmin",
    "received-garmin-data": "Primim datele tale Garmin!",
    "connect-oura-intro": "Poți partaja date din contul tău Oura dacă ai unul. Pentru a începe, apasă mai jos pentru a te autentifica cu credențialele tale Oura.",
    "connect-oura-button": "Conectează Oura",
    "received-oura-data": "Primim datele tale Oura!",
    "connect-dexcom-intro": "Poți partaja date din contul tău Dexcom dacă ai unul. Pentru a începe, apasă mai jos pentru a te autentifica cu credențialele tale Dexcom.",
    "connect-dexcom-button": "Conectează Dexcom",
    "received-dexcom-data": "Primim datele tale Dexcom!",
    "downloading-data": "Se descarcă datele...",
    "downloading-data-menu": "Se descarcă datele",
    "empty-tasks-incomplete": "Nu există sarcini deschise de afișat momentan.",
    "empty-tasks-complete": "Sarcinile finalizate vor fi afișate aici.",
    "view-all": "Vezi toate",
    "tasks": "Sarcini",
    "incomplete-tasks": "Sarcini nefinalizate",
    "completed-tasks": "Sarcini finalizate",
    "overdue": "Întârziate",
    "due-today": "Scadente azi",
    "due-tomorrow": "Scadente mâine",
    "due": "Scadent",
    "due-in": "Scadent în",
    "days": "zile",
    "notifications": "Notificări",
    "support": "Asistență",
    "all-notifications": "Toate notificările",
    "steps": "Pași",
    "resting-heart-rate": "Ritm cardiac în repaus",
    "distance-traveled": "Distanță parcursă",
    "google-fit-share": "Apasă pentru a partaja date fitness",
    "devices": "Dispozitive",
    "last-sync": "Ultima sincronizare",
    "completed": "Finalizat",
    "ehr-intro-search": "Caută introducând numele furnizorului tău sau portalul de membru pentru furnizorul tău de servicii medicale sau planul de sănătate.",
    "external-accounts-title-divider": " / ",
    "external-accounts-title-providers": "Furnizori",
    "external-accounts-title-health-plans": "Planuri de sănătate",
    "external-accounts-title-devices": "Dispozitive",
    "external-accounts-error": "Unul dintre conturile tale necesită atenție",
    "external-accounts-loading": "Datele tale sunt în curs de descărcare de la planurile de sănătate și furnizorii conectați. Te rugăm să revii în câteva momente pentru a-ți vizualiza datele.",
    "external-account-authorization-expired": "Autorizația a expirat",
    "external-account-fetching-data": "Se recuperează datele...",
    "external-account-deleting": "Se elimină...",
    "external-account-last-updated": "Ultima actualizare",
    "external-account-error": "Eroare neașteptată",
    "external-account-reconnect": "Reconectează",
    "external-account-refresh": "Reîmprospătează",
    "external-account-remove": "Elimină",
    "device-data-no-data": "Dacă ai conectat Apple Health, Google Fit, Fitbit sau Garmin, revino mai târziu pentru a-ți vizualiza datele.",
    "no-notifications-received": "Nu s-au primit notificări",
    "next-button-text": "Următorul",
    "lab-results-title": "Rezultate analize",
    "medications-title": "Medicamente",
    "immunizations-title": "Imunizări",
    "reports-title": "Rapoarte",
    "allergies-title": "Alergii",
    "conditions-title": "Afecțiuni",
    "procedures-title": "Proceduri",
    "app-download-title": "Următor: Descarcă aplicația",
    "app-download-subtitle": "Descărcarea aplicației MyDataHelps face și mai ușoară participarea la @@PROJECT_NAME@@.",
    "app-download-google-play-link-alt": "Descarcă din Google Play Store",
    "app-download-app-store-link-alt": "Descarcă din Apple App Store",
    "start": "Începe",
    "resume": "Continuă",
    "start-survey": "Începe sondajul",
    "resume-survey": "Continuă sondajul",
    "30-day-average": "Media pe 30 de zile",
    "today": "Astăzi",
    "yesterday": "Ieri",
    "tap-to-log-today": "Apasă aici pentru a înregistra simptomele sau tratamentele!",
    "mild": "Ușor",
    "moderate": "Moderat",
    "severe": "Sever",
    "severe-shortened": "sev",
    "moderate-shortened": "mod",
    "mild-shortened": "ușor",
    "log-todays-symptoms": "Înregistrează simptomele de azi",
    "todays-log": "Înregistrarea de azi",
    "symptoms": "Simptome",
    "treatments": "Tratamente",
    "symptoms-experiencing-today": "Ce simptome experimentezi?",
    "symptoms-experiencing-previous": "Ce simptome ai experimentat?",
    "treatments-experiencing-today": "Ce tratamente ai efectuat?",
    "treatments-experiencing-previous": "Ce tratamente ai efectuat?",
    "feeling-overall-today": "Cum te simți în general?",
    "feeling-overall-previous": "Cum te-ai simțit în general?",
    "additional-notes": "Note suplimentare?",
    "how-severe-is": "Cât de sever este",
    "how-severe-was": "Cât de sever a fost",
    "clear-symptom": "Șterge simptomul",
    "add-notes": "Adaugă note",
    "notes": "Note",
    "enter-symptom-name": "Introdu numele simptomului",
    "enter-treatment-name": "Introdu numele tratamentului",
    "severity-tracking-none": "Nu urmări severitatea",
    "severity-tracking-3point": "Evaluare Ușor / Moderat / Sever",
    "severity-tracking-10point": "Evaluare de la 1 la 10 puncte",
    "muted": "Dezactivat",
    "not-muted": "Activat",
    "delete": "Șterge",
    "severity": "Severitate",
    "item-delete-warning": "Avertisment: Continuarea va șterge definitiv elementele de mai jos și toate datele asociate din înregistrările tale. Dacă nu dorești să ștergi aceste elemente, selectează \"Anulează\".",
    "unsaved-changes": "Modificări nesalvate",
    "daily-overall-experience": "Experiența generală zilnică",
    "average": "Medie",
    "include-symptoms": "Include simptome",
    "select-symptoms": "Selectează simptome",
    "include-treatments": "Include tratamente",
    "select-treatments": "Selectează tratamente",
    "download-mydatahelps": "Descarcă MyDataHelps",
    "connect-devices-title": "Conectează dispozitive",
    "connect-devices-text": "Partajează date de la dispozitivele tale purtabile, aplicații și alte dispozitive.",
    "apple-health-troubleshooting-intro": "Dacă nu ai aprobat sau ai dezactivat partajarea datelor Apple Health și dorești să o activezi, urmează acești pași:",
    "apple-health-troubleshooting-li-1": "Deschide aplicația \"Setări\"",
    "apple-health-troubleshooting-li-2": "Selectează \"Confidențialitate\"",
    "apple-health-troubleshooting-li-3": "Selectează \"Sănătate\"",
    "apple-health-troubleshooting-li-4": "Selectează \"MyDataHelps\"",
    "apple-health-troubleshooting-li-5": "Activează categoriile de date pe care dorești să le partajezi",
    "how-to-enable": "Cum să activezi",
    "new-points-title": "Bravo!",
    "new-points-text": "Ai primit puncte pentru următoarele:",
    "new-points-next-reward-prefix": "Acum ai nevoie de ",
    "new-points-next-reward-suffix": " puncte pentru a debloca următoarea recompensă.",
    "new-points-done-button-text": "Gata",
    "systolic-average": "Media sistolică",
    "diastolic-average": "Media diastolică",
    "highest-systolic": "Cea mai mare sistolică",
    "lowest-systolic": "Cea mai mică sistolică",
    "resource-default-button-text": "Deschide",
    "inbox-message-completed-status": "VIZUALIZAT",
    "inbox-resource-completed-status": "VIZUALIZAT",
    "inbox-survey-completed-status": "FINALIZAT",
    "inbox-history-view-title": "Istoric inbox",
    "inbox-history-view-empty-text": "Nu ai elemente în istoricul inbox-ului.",
    "inbox-message-view-related-resources-title": "Conexe",
    "inbox-view-title": "Inbox",
    "inbox-view-empty-text": "Nu ai elemente noi în inbox.",
    "inbox-view-messages-title": "Mesaje",
    "inbox-view-surveys-title": "Sondaje",
    "inbox-view-resources-title": "Resurse",
    "inbox-view-recently-completed-title": "Recent",
    "inbox-view-recently-completed-empty-text": "Nu ai elemente finalizate recent în inbox.",
    "inbox-view-history-button-text": "Vezi istoricul inbox-ului",
    "choose-report-month": "Alege luna raportului",
    "include-overall-experience": "Include experiența generală zilnică",
    "include-notes": "Include note",
    "create-report": "Creează raport PDF",
    "reports": "Rapoarte",
    "recent-daily-data-bar-chart-subtitle": "Ultimele 7 zile",
    "recent-daily-data-bar-chart-no-data": "Fără date",
    "resource-list-empty-text": "Nu s-au găsit resurse.",
    "asthma-symptom-level-none": "Fără simptome",
    "asthma-symptom-level-mild": "Simptome ușoare",
    "asthma-symptom-level-moderate": "Simptome moderate",
    "asthma-symptom-level-severe": "Simptome severe",
    "asthma-symptom-difficulty-breathing": "Dificultăți de respirație",
    "asthma-symptom-wheezing": "Wheezing",
    "asthma-symptom-coughing": "Tuse",
    "asthma-symptom-chest-tightness": "Senzație de apăsare sau presiune în piept",
    "asthma-impact-limit-daily-activity": "Limitarea activității zilnice",
    "asthma-impact-waking-at-night": "Trezire în timpul nopții",
    "asthma-impact-using-rescue-inhaler": "Utilizarea inhalatorului de urgență",
    "asthma-trigger-cold-illness": "Răceală/boală virală",
    "asthma-trigger-animal-exposure": "Expunere la animale",
    "asthma-trigger-seasonal-allergens": "Alergeni sezonieri/polen",
    "asthma-trigger-exercise": "Exerciții fizice",
    "asthma-trigger-smoke": "Fum",
    "asthma-trigger-weather-changes": "Schimbări extreme de vreme",
    "asthma-trigger-air-pollution": "Poluarea aerului",
    "asthma-trigger-strong-smells": "Mirosuri puternice",
    "asthma-trigger-chemicals": "Substanțe chimice/produse de curățare",
    "asthma-trigger-dust": "Praf",
    "asthma-trigger-mold": "Mucegai",
    "asthma-trigger-dust-mites": "Acarieni",
    "asthma-trigger-rodents": "Rozătoare",
    "asthma-trigger-cockroaches": "Gândaci",
    "asthma-trigger-nsaid": "AINS/Aspirină",
    "asthma-trigger-beta-blocker": "Beta-blocant",
    "asthma-trigger-heartburn": "Arsuri la stomac",
    "asthma-trigger-red-wine": "Vin roșu",
    "asthma-trigger-new-foods": "Alimente noi",
    "asthma-trigger-cooked-without-ventilation": "Gătit (fără ventilație)",
    "asthma-trigger-pet-in-bed": "Animal de companie în pat",
    "asthma-trigger-incense-or-candle": "Lumânare/tămâie",
    "asthma-data-status-out-of-range": "În afara intervalului",
    "asthma-data-status-in-range": "În interval",
    "asthma-data-status-offline": "Offline",
    "asthma-data-status-establishing": "Se stabilește",
    "asthma-data-status-not-determined": "Valoarea de referință nu a fost stabilită",
    "asthma-data-status-not-found": "Nu s-au înregistrat date",
    "asthma-data-status-not-configured": "Neconfigurat",
    "asthma-control-calendar-daily-entry-missed": "Înregistrare zilnică omisă",
    "asthma-control-calendar-not-logged-yet": "Încă neînregistrat",
    "asthma-control-calendar-log-entries-symptoms-label": "Simptome",
    "asthma-control-calendar-log-entries-impacts-label": "Impacturi",
    "asthma-control-calendar-log-entries-triggers-label": "Factori declanșatori",
    "asthma-control-status-header-complete-daily-entry": "Completează înregistrarea zilnică.",
    "asthma-control-status-header-multiple-out-of-range": "Mai multe puncte de date sunt |||în afara nivelurilor normale|||.",
    "asthma-control-status-header-abnormal-heart-rate": "Ritmul tău cardiac în repaus este |||peste nivelul normal|||.",
    "asthma-control-status-header-abnormal-respiratory-rate": "Rata ta respiratorie este |||peste nivelul normal|||.",
    "asthma-control-status-header-abnormal-steps": "Activitatea ta este |||sub nivelurile normale|||.",
    "asthma-control-status-header-abnormal-sleep": "Perturbările tale de somn sunt |||peste nivelul normal|||.",
    "asthma-control-status-header-abnormal-blood-oxygen": "Nivelul tău de oxigen din sânge este |||sub nivelul normal|||.",
    "asthma-control-status-header-abnormal-home-aqi": "Indicele de calitate a aerului din casa ta este |||{aqi}|||.",
    "asthma-control-status-header-abnormal-work-aqi": "Indicele de calitate a aerului de la locul tău de muncă este |||{aqi}|||.",
    "asthma-control-status-header-no-data": "Adaugă o înregistrare zilnică pentru a evalua controlul astmului tău.",
    "asthma-control-status-header-no-data-caregiver": "Adaugă o înregistrare zilnică pentru a evalua controlul astmului lui {name}.",
    "asthma-control-status-header-not-determined": "Sunt necesare mai multe înregistrări zilnice pentru a evalua controlul astmului tău.",
    "asthma-control-status-header-not-determined-caregiver": "Sunt necesare mai multe înregistrări zilnice pentru a evalua controlul astmului lui {name}.",
    "asthma-control-status-header-controlled": "Pe baza înregistrărilor tale, astmul tău este |||sub control|||.",
    "asthma-control-status-header-controlled-caregiver": "Pe baza înregistrărilor, astmul lui {name} este |||sub control|||.",
    "asthma-control-status-header-not-controlled": "Pe baza înregistrărilor tale, astmul tău nu este |||sub control|||.",
    "asthma-control-status-header-not-controlled-caregiver": "Pe baza înregistrărilor, astmul lui {name} nu este |||sub control|||.",
    "asthma-control-status-header-not-controlled-stat-symptom-days": "Zile cu simptome",
    "asthma-control-status-header-not-controlled-stat-rescue-inhaler": "Inhalator de urgență",
    "asthma-control-status-header-not-controlled-stat-limited-activity": "Activitate limitată",
    "asthma-control-status-header-not-controlled-stat-awakenings": "Treziri",
    "asthma-action-plan-manager-title": "Plan de acțiune pentru astm",
    "asthma-action-plan-manager-instructions": "Salvează o fotografie a planului tău de acțiune pentru astm pentru referință ușoară.",
    "asthma-action-plan-manager-instructions-caregiver": "Salvează o fotografie a planului de acțiune pentru astm al lui {name} pentru referință ușoară.",
    "asthma-action-plan-manager-learn-more": "Ce este un plan de acțiune pentru astm?",
    "asthma-action-plan-manager-edit-button-text": "Editează",
    "asthma-action-plan-manager-not-found-text": "Apasă pentru a adăuga o fotografie",
    "asthma-biometrics-title": "Sănătate și activitate",
    "asthma-biometrics-daytime-resting-heart-rate-label": "Ritm cardiac în repaus (Zi)",
    "asthma-biometrics-nighttime-resting-heart-rate-label": "Ritm cardiac în repaus (Noapte)",
    "asthma-biometrics-beats-per-minute-units": "BPM",
    "asthma-biometrics-respiratory-rate-label": "Rată respiratorie",
    "asthma-biometrics-breaths-per-minute-units": "BPM",
    "asthma-biometrics-steps-label": "Pași",
    "asthma-biometrics-daytime-blood-oxygen-level-label": "Saturație de oxigen (Zi)",
    "asthma-biometrics-nighttime-blood-oxygen-level-label": "Saturație de oxigen (Noapte)",
    "asthma-biometrics-percent-units": "%",
    "asthma-biometrics-sleep-disturbances-label": "Perturbări de somn",
    "asthma-air-qualities-title": "Calitatea aerului",
    "asthma-air-qualities-setup-button-text": "+ Configurare",
    "asthma-air-qualities-home-aqi-label": "AQI (Acasă)",
    "asthma-air-qualities-work-aqi-label": "AQI (Muncă)",
    "asthma-alert-takeover-notice-instructions": "Ia-ți un moment pentru a înregistra orice simptome de astm într-o înregistrare zilnică.",
    "asthma-alert-takeover-notice-add-entry-button-text": "+ Înregistrare zilnică",
    "asthma-alert-takeover-notice-not-now-button-text": "Nu acum",
    "asthma-log-entry-details-not-editable": "Înregistrare zilnică omisă",
    "asthma-log-entry-details-not-logged-yet": "Încă neînregistrat",
    "asthma-log-entry-details-edit-button-text": "Editează",
    "asthma-log-entry-details-add-button-text": "Înregistrează",
    "asthma-log-entry-details-symptoms-label": "Simptome",
    "asthma-log-entry-details-impacts-label": "Impacturi",
    "asthma-log-entry-details-triggers-label": "Factori declanșatori",
    "asthma-log-entry-details-component-no-data": "Niciun {dataType} înregistrat",
    "asthma-log-entry-header-today-log-label": "Astăzi",
    "asthma-log-entry-header-yesterday-log-label": "Ieri",
    "asthma-log-entry-header-not-logged-yet": "Încă neînregistrat",
    "asthma-log-entry-header-add-button-text": "Înregistrează",
    "asthma-activity-view-title": "Activitate",
    "asthma-activity-view-chart-title": "Pași",
    "asthma-activity-view-alert-message": "Activitatea ta este sub nivelul normal.",
    "asthma-alert-takeover-message": "Mai multe puncte de date sunt în afara nivelurilor normale.",
    "asthma-air-quality-view-title": "Calitatea aerului",
    "asthma-air-quality-view-home-aqi-chart-title": "Calitatea aerului (Acasă)",
    "asthma-air-quality-view-home-aqi-alert-message": "AQI-ul din casa ta este nesănătos.",
    "asthma-air-quality-view-work-aqi-chart-title": "Calitatea aerului (Muncă)",
    "asthma-air-quality-view-work-aqi-alert-message": "AQI-ul de la locul tău de muncă este nesănătos.",
    "asthma-heart-and-lungs-view-title": "Inimă și plămâni",
    "asthma-heart-and-lungs-view-dhr-chart-title": "Ritm cardiac în repaus (Zi)",
    "asthma-heart-and-lungs-view-dhr-alert-message": "Ritmul tău cardiac în repaus din timpul zilei este peste nivelul normal.",
    "asthma-heart-and-lungs-view-nhr-chart-title": "Ritm cardiac în repaus (Noapte)",
    "asthma-heart-and-lungs-view-nhr-alert-message": "Ritmul tău cardiac în repaus din timpul nopții este peste nivelul normal.",
    "asthma-heart-and-lungs-view-rr-chart-title": "Rată respiratorie",
    "asthma-heart-and-lungs-view-rr-alert-message": "Rata ta respiratorie este peste nivelul normal.",
    "asthma-heart-and-lungs-view-dbol-chart-title": "Oxigen în sânge (Zi)",
    "asthma-heart-and-lungs-view-dbol-alert-message": "Nivelul de oxigen din sânge din timpul zilei este sub nivelul normal.",
    "asthma-heart-and-lungs-view-nbol-chart-title": "Oxigen în sânge (Noapte)",
    "asthma-heart-and-lungs-view-nbol-alert-message": "Nivelul de oxigen din sânge din timpul nopții este sub nivelul normal.",
    "asthma-sleep-view-title": "Somn",
    "asthma-sleep-view-chart-title": "Perturbări de somn",
    "asthma-sleep-view-alert-message": "Perturbările tale de somn sunt peste nivelul normal.",
    "asthma-log-entry-editor-view-symptom-level-title": "Nivel simptome",
    "asthma-log-entry-editor-view-select-one-subtitle": "Selectează unul",
    "asthma-log-entry-editor-view-select-all-subtitle": "Selectează tot ce se aplică",
    "asthma-log-entry-editor-view-symptoms-title": "Simptome",
    "asthma-log-entry-editor-view-impacts-title": "Impacturi",
    "asthma-log-entry-editor-view-triggers-title": "Factori declanșatori",
    "asthma-air-quality-description-unhealthy": "Nesănătos",
    "asthma-air-quality-description-very-unhealthy": "Foarte nesănătos",
    "asthma-air-quality-description-hazardous": "Periculos",
    "asthma-recommended-article-21-title": "Cum să îți ții astmul sub control",
    "asthma-recommended-article-21-subtitle": "Rămâi fără simptome respectând planul de tratament, înțelegând factorii declanșatori și recunoscând din timp schimbările în control.",
    "asthma-recommended-article-22-title": "Este astmul tău sub control?",
    "asthma-recommended-article-22-subtitle": "4 întrebări pentru a evalua dacă astmul tău este sub control. Dacă ai simptome mai mult de 2 ori pe săptămână sau dacă te trezești noaptea din cauza simptomelor de astm - astmul tău nu este sub control.",
    "asthma-recommended-article-24-title": "Navigarea în zona de pericol: Pregătirea pentru exacerbările astmului",
    "asthma-recommended-article-24-subtitle": "Recunoaște din timp simptomele severe precum tuse intensă și dificultăți de respirație, și activează planul tău personalizat de acțiune pentru astm, inclusiv medicamentele imediate.",
    "asthma-recommended-article-25-title": "Preluarea controlului asupra astmului tău",
    "asthma-recommended-article-25-subtitle": "Când astmul tău pare incontrolabil, este timpul să îți reevaluezi abordarea. Pași de urmat când astmul tău nu este sub control.",
    "asthma-recommended-article-32-title": "Cine are nevoie de medicament de control?",
    "asthma-recommended-article-32-subtitle": "Descoperă rolul crucial al medicamentelor de control în menținerea astmului sub control.",
    "asthma-recommended-article-33-title": "Accesul la medicamente",
    "asthma-recommended-article-33-subtitle": "Pentru cazurile în care costul este o barieră pentru medicamente, află despre medicamente gratuite sau la cost redus. Luarea medicamentelor conform prescripției este importantă pentru menținerea controlului astmului.",
    "asthma-recommended-article-34-title": "Reînnoirea rețetelor",
    "asthma-recommended-article-34-subtitle": "Fii la curent cu medicamentele tale pentru astm cu strategii ușoare de reînnoire a rețetelor.",
    "asthma-recommended-article-35-title": "Probleme în a-ți aminti medicamentele",
    "asthma-recommended-article-35-subtitle": "Descoperă strategii simple dar eficiente pentru a-ți aminti dozele zilnice, de la sfaturi de depozitare inteligentă până la utilizarea memento-urilor din aplicații.",
    "asthma-recommended-article-36-title": "Ce inhalator să folosești când",
    "asthma-recommended-article-36-subtitle": "Stăpânește gestionarea astmului tău: Inhalatorul de urgență acționează rapid pentru a ameliora simptomele, în timp ce un controller este preventiv și funcționează prin reducerea inflamației, de obicei fiind luat zilnic.",
    "asthma-recommended-article-37a-title": "Tehnica inhalatorului - MDI",
    "asthma-recommended-article-37a-subtitle": "Sfaturi pentru tehnica inhalatorului cu doză măsurată (MDI). Fără tehnica corectă, este posibil să primești doar o parte din doză.",
    "asthma-recommended-article-37b-title": "Tehnica inhalatorului - DPI",
    "asthma-recommended-article-37b-subtitle": "Sfaturi pentru tehnica inhalatorului cu pulbere uscată (DPI). Fără tehnica corectă, este posibil să primești doar o parte din doză.",
    "asthma-recommended-article-37c-title": "Tehnica inhalatorului - SMI",
    "asthma-recommended-article-37c-subtitle": "Sfaturi pentru tehnica inhalatorului cu ceață fină (SMI). Fără tehnica corectă, este posibil să primești doar o parte din doză.",
    "asthma-recommended-article-37d-title": "Tehnica inhalatorului - nebulizator",
    "asthma-recommended-article-37d-subtitle": "Sfaturi pentru tehnica nebulizatorului.",
    "asthma-recommended-article-38-title": "De ce ar trebui să iau medicamentul de control?",
    "asthma-recommended-article-38-subtitle": "Înțelege rolul critic al medicamentelor de control și de ce sunt o piatră de temelie a planului tău personalizat de management.",
    "asthma-recommended-article-39-title": "Efecte secundare ale medicamentelor pentru astm",
    "asthma-recommended-article-39-subtitle": "Învață cum să identifici efectele secundare comune și mai puțin comune, și pașii simpli pe care îi poți face pentru a evita efectul secundar comun - candidoza (infecție fungică în gură).",
    "asthma-recommended-article-39a-title": "Cum știu dacă medicamentele mele pentru astm funcționează?",
    "asthma-recommended-article-39a-subtitle": "Medicamentele de control pot dura zile până la săptămâni pentru a atinge impactul complet. Urmărește-ți simptomele zilnic pentru a vedea dacă există o îmbunătățire și dacă nu există, discută cu medicul tău.",
    "asthma-recommended-article-41-title": "Factori declanșatori surpriză",
    "asthma-recommended-article-41-subtitle": "Descoperă factori declanșatori neașteptați ai astmului ascunși în viața ta de zi cu zi, de la AINS (precum ibuprofenul) până la paharul tău de vin. Știind la ce să fii atent, te poate ajuta să identifici acești factori declanșatori surpriză.",
    "asthma-recommended-article-42-title": "Astmul și alergenii sezonieri/polenul",
    "asthma-recommended-article-42-subtitle": "Navighează sezonul de polen cu ușurință: Identifică factorii declanșatori specifici de polen, înțelege modelele lor sezoniere și învață cum să minimizezi expunerea.",
    "asthma-recommended-article-43-title": "Astmul și calitatea aerului",
    "asthma-recommended-article-43-subtitle": "Înțelege că o calitate slabă a aerului poate declanșa astmul. Învață cum să navighezi zilele cu AQI ridicat și ce înseamnă nivelurile AQI.",
    "asthma-recommended-article-43a-title": "Astmul și infecțiile respiratorii",
    "asthma-recommended-article-43a-subtitle": "Infecțiile respiratorii sunt factori declanșatori comuni ai astmului. Cum să le previi și ce să faci când apar.",
    "asthma-recommended-article-43b-title": "Astmul și animalele",
    "asthma-recommended-article-43b-subtitle": "Animalele/Animalele de companie pot fi un factor declanșator pentru astm. Află despre cum să diagnostichezi o alergie la animale/animale de companie și pașii pentru a reduce impactul.",
    "asthma-recommended-article-43c-title": "Astmul și fumul",
    "asthma-recommended-article-43c-subtitle": "Incendiile de vegetație și fumul de tutun pot declanșa astmul. Află despre pașii pe care îi poți face pentru a-ți reduce expunerea.",
    "asthma-recommended-article-43d-title": "Astmul și vremea",
    "asthma-recommended-article-43d-subtitle": "Factorii declanșatori comuni legați de vreme sunt aerul rece, aerul cald și umed, și ploaia/furtunile. Explorează de ce acestea pot declanșa astmul.",
    "asthma-recommended-article-43e-title": "Mirosuri puternice și substanțe chimice/produse de curățare",
    "asthma-recommended-article-43e-subtitle": "Descoperă ce mirosuri îți pot declanșa astmul și lucruri la care să te gândești în timp ce faci curățenie.",
    "asthma-recommended-article-43f-title": "Astmul și praful/acarienii",
    "asthma-recommended-article-43f-subtitle": "Praful este un factor declanșator comun al astmului, dar motivul pentru care este un factor declanșator te-ar putea surprinde!",
    "asthma-recommended-article-43g-title": "Astmul și mucegaiul",
    "asthma-recommended-article-43g-subtitle": "Mucegaiul are nevoie de umiditate pentru a crește, așa că se găsește de obicei în locuri umede sau ude. Învață cum să previi mucegaiul în casa ta.",
    "asthma-recommended-article-43h-title": "Astmul și arsurile la stomac",
    "asthma-recommended-article-43h-subtitle": "Ce sunt arsurile la stomac și ce legătură au cu astmul?",
    "blood-type": "Grupa de sânge",
    "device-data-month-chart-no-data": "Nu există date",
    "device-data-month-chart-daily-average": "Media zilnică",
    "term-information-not-found-header": "Nu s-au găsit informații",
    "term-information-not-found-body": "Nu s-au putut găsi informații despre acest subiect",
    "term-information-disclaimer": "<strong>NOTĂ:</strong> Informațiile furnizate nu reprezintă sfaturi medicale. Sunt pentru a te ajuta să înțelegi mai bine sănătatea ta. Te rugăm să contactezi furnizorul tău de servicii medicale dacă ai întrebări privind afecțiunea ta medicală.",
    "term-information-view-on-medline": "Vezi pe MedlinePlus",
    "type": "Tip",
    "location": "Locație",
    "description": "Descriere",
    "performed-by": "Efectuat de",
    "verified-by": "Verificat de",
    "normal-range": "Interval normal",
    "more": "Mai mult",
    "procedure": "Procedură",
    "procedures": "Proceduri",
    "lab-report": "Raport de laborator",
    "service-performed": "Serviciu efectuat",
    "services-performed": "Servicii efectuate",
    "device-data-month-chart-minutes": "Minute",
    "device-data-month-chart-sleep": "Somn",
    "air-quality": "Calitatea aerului",
    "air-quality-home": "Calitatea aerului (Acasă)",
    "air-quality-work": "Calitatea aerului (Muncă)",
    "sedentary-time": "Timp sedentar",
    "active-time": "Timp activ",
    "lightly-active-time": "Timp ușor activ",
    "fairly-active-time": "Timp moderat activ",
    "very-active-time": "Timp foarte activ",
    "breathing-rate": "Rată de respirație",
    "calories-burned": "Calorii arse",
    "elevated-heart-rate-time": "Timp cu ritm cardiac ridicat",
    "fat-burn-heart-rate-time": "Timp de ardere a grăsimilor",
    "cardio-heart-rate-time": "Timp cardio",
    "peak-heart-rate-time": "Timp de vârf",
    "floors-climbed": "Etaje urcate",
    "heart-rate-variability": "Variabilitatea ritmului cardiac",
    "sleep-time": "Timp de somn",
    "light-sleep-time": "Timp de somn ușor",
    "deep-sleep-time": "Timp de somn profund",
    "rem-sleep-time": "Timp de somn REM",
    "spo2": "SpO2",
    "heart-rate-range": "Interval ritm cardiac",
    "max-heart-rate": "Ritm cardiac maxim",
    "core-sleep-time": "Timp de somn de bază",
    "in-bed-time": "Timp în pat",
    "stand-time": "Timp în picioare",
    "walking-heart-rate-average": "Media ritmului cardiac la mers",
    "active-energy-burned": "Energie activă arsă",
    "number-of-alcoholic-beverages": "Număr de băuturi alcoolice",
    "active-calories": "Calorii active",
    "resting-calories": "Calorii în repaus",
    "total-calories": "Total calorii",
    "min-heart-rate": "Ritm cardiac minim",
    "average-heart-rate": "Ritm cardiac mediu",
    "max-stress-level": "Nivel maxim de stres",
    "average-stress-level": "Nivel mediu de stres",
    "total-stress-time": "Timp total de stres",
    "low-stress-time": "Timp de stres scăzut",
    "medium-stress-time": "Timp de stres mediu",
    "high-stress-time": "Timp de stres ridicat",
    "awake-time": "Timp treaz",
    "sleep-score": "Scor de somn",
    "bpm": "bpm",
    "hours-abbreviation": "h",
    "minutes-abbreviation": "m",
    "points-until-next-badge": "{points} puncte până la următorul insignă",
    "fitbit-wear-time": "Timp de purtare Fitbit",
    "my-badges": "Insignele mele ({badges})",
    "new-badge-title": "Bună treabă!",
    "new-badge-text": "Ai primit o nouă insignă!",
    "get-badge": "Obține insignă",
    "glucose-chart-no-data": "Nu există citiri ale glicemiei",
    "glucose-stats-range-label": "Interval glicemie",
    "glucose-stats-avg-label": "Glicemie medie",
    "glucose-stats-steps-label": "Pași",
    "glucose-stats-sleep-label": "Somn",
    "stress-level-title": "Stres general",
    "stress-level-min-label": "Fără stres",
    "stress-level-max-label": "Extrem de stresat",
    "meal-type-meal": "Masă",
    "meal-type-snack": "Gustare",
    "meal-type-drink": "Băutură",
    "meal-log-title": "Jurnal de mese",
    "meal-log-no-data": "Nu există mese înregistrate",
    "meal-editor-time-input-label": "Ora",
    "meal-editor-description-input-label": "Descriere",
    "meal-editor-description-optional": "Opțional",
    "meal-editor-duplicate-timestamp-error": "Două mese nu pot avea aceeași marcă de timp.",
    "meal-editor-add-image": "Adaugă imagine",
    "meal-editor-image-upload-error": "A apărut o eroare la încărcarea imaginii selectate. Te rugăm să încerci din nou, să folosești o imagine diferită sau să elimini imaginea pentru a salva.",
    "glucose-view-title": "Monitorizarea glicemiei",
    "ai-assistant-loading": "Interacționez cu datele tale...",
    "ai-assistant-suggestion-avg-weekly-heart-rate": "Care este ritmul meu cardiac mediu pentru ultima săptămână?",
    "ai-assistant-suggestion-highest-heart-rate-week": "Care a fost cel mai ridicat ritm cardiac al meu în această săptămână?",
    "ai-assistant-suggestion-graph-daily-steps-21-days": "Fă un grafic al pașilor mei zilnici pentru ultimele 21 de zile",
    "ai-assistant-suggestion-weekly-workouts-average-month": "Câte antrenamente pe săptămână am avut în medie luna aceasta?",
    "ai-assistant-suggestion-avg-monthly-blood-pressure": "Care este tensiunea mea arterială medie pentru ultima lună?",
    "ai-assistant-suggestion-daily-active-minutes-month": "Care este media mea zilnică pentru minutele active în această lună?",
    "ai-assistant-suggestion-resting-heart-rate-change-month": "Cum s-a schimbat ritmul meu cardiac în repaus în ultima lună?",
    "ai-assistant-suggestion-stand-ups-yesterday": "De câte ori m-am ridicat ieri?",
    "ai-assistant-suggestion-graph-heart-rate-trends-workouts": "Poți să faci un grafic al tendințelor ritmului meu cardiac în timpul antrenamentelor din această săptămână?",
    "ai-assistant-suggestion-sleep-7-days": "Cum a fost somnul meu în ultimele 7 zile?",
    "ai-assistant-suggestion-fall-asleep-time-2-weeks": "La ce oră am adormit de obicei în ultimele 2 săptămâni?",
    "ai-assistant-suggestion-sleep-quality-change-month": "Cum s-a schimbat calitatea somnului meu în ultima lună?",
    "ai-assistant-suggestion-last-tetanus-vaccine": "Când a fost ultimul meu vaccin antitetanos?",
    "ai-assistant-suggestion-last-blood-test-lab-work": "Când a fost ultimul meu test de sânge sau analiză de laborator?",
    "ai-assistant-suggestion-abnormal-lab-results": "Am rezultate anormale la analize?",
    "ai-assistant-suggestion-last-cbc-test": "Când a fost ultima mea hemoleucogramă completă (CBC)?",
    "ai-assistant-suggestion-glucose-a1c-levels-last-test": "Care au fost nivelurile mele de glucoză și A1c la ultimul test?",
    "ai-assistant-suggestion-graph-cholesterol-trends": "Poți să-mi arăți un grafic despre cum s-au schimbat nivelurile mele de colesterol în timp?",
    "ai-assistant-suggestion-last-metabolic-panel": "Când a fost făcut ultimul meu panel metabolic?",
    "ai-assistant-suggestion-hemoglobin-levels-trend": "Care este tendința nivelurilor mele de hemoglobină?",
    "ai-assistant-suggestion-show-files": "Arată-mi fișierele mele.",
    "ai-assistant-suggestion-save-graph-to-files": "Salvează graficul în fișierele mele",
    "mindful-minutes": "Minute de mindfulness",
    "therapy-minutes": "Minute de terapie",
    "insight-matrix-no-comparison-data": "Nu sunt configurate tipuri de date pentru comparație.",
    "allergylist-reactions": "Reacții",
    "points-abbreviation": "pct",
    "no-data": "Nu există date",
    "no-data-yet": "Nu există date încă",
    "bp-low": "Scăzută",
    "bp-normal": "Normală",
    "bp-elevated": "Ridicată",
    "bp-stage1": "Stadiul 1",
    "bp-stage2": "Stadiul 2",
    "bp-crisis": "Criză",
    "bp-unknown": "Necunoscută",
    "device-not-enabled": "@@DEVICE@@ nu este activat pentru acest proiect.",
    "download-pdf-report": "Descarcă raport PDF",
    "connect-to-device": "Conectează-te la @@DEVICE@@",
    "symptoms-and-treatments": "Simptome și tratamente",
    "subsequent-evaluation-note": "Notă de evaluare ulterioară",
    "summary": "Rezumat",
    "device-activity": "Activitate dispozitiv",
    "daily": "Zilnic",
    "weekly": "Săptămânal",
    "monthly": "Lunar",
    "bonus": "Bonus",
    "syncing-data": "Se sincronizează datele...",
    "health-connect-phr-sync-title": "Sincronizare cu Health Connect",
    "health-connect-phr-sync-prompt": "Alege înregistrările de sănătate pentru a citi din și a scrie în Health Connect"
};

export default strings;
    