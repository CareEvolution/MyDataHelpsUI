let strings: { [key: string]: string } = {
    "back": "Indietro",
    "done": "Fatto",
    "close": "Chiudi",
    "save": "Salva",
    "add": "Aggiungi",
    "edit": "Modificare",
    "cancel": "Annulla",
    "clear": "chiaro",
    "settings": "Impostazioni",
    "connect": "Collega",
    "reconnect": "Riconnetti",
    "refresh": "Aggiorna",
    "remove": "Rimuovi",
    "help": "Aiuto",
    "view": "Visualizza",
    "health-records": "Cartelle cliniche",
    "connect-ehr-title-prefix": "Collega ",
    "connect-ehr-title-divider": " o ",
    "connect-ehr-title-providers": "Fornitore",
    "connect-ehr-title-health-plans": "Piano sanitario",
    "connect-ehr-connected": "Stiamo ricevendo i tuoi dati EHR!",
    "connect-ehr-needs-attention": "Uno dei tuoi account richiede attenzione.",
    "connect-ehr-text": "I tuoi registri sanitari elettronici sono una fonte importante di informazioni. Potrebbero aiutare i ricercatori a fare nuove scoperte. Collega il tuo fornitore o piano sanitario (es: Medicare) con @@PROJECT_NAME@@.",
    "connect-ehr-text-connected": "Grazie per aver condiviso i tuoi dati EHR con @@PROJECT_NAME@@. Collega un altro fornitore per condividere ulteriori dati o gestire le tue connessioni EHR.",
    "connect-ehr-not-enabled": "Il collegamento EHR non è abilitato per questo progetto.",
    "search-for-provider": "Cerca Fornitore o Piano sanitario",
    "expired-reconnect": "Connessione scaduta. Si prega di riconnettersi.",
    "connect-error-reconnect": "Errore imprevisto. Si prega di riconnettersi.",
    "connected": "Connesso",
    "search": "Cerca",
    "connect-fitbit-intro": "Puoi condividere i dati dal tuo account Fitbit se ne hai uno. Per iniziare, fai clic o tocca qui sotto per accedere con le tue credenziali Fitbit.",
    "connect-fitbit-button": "Collega Fitbit",
    "received-fitbit-data": "Stiamo ricevendo i tuoi dati Fitbit!",
    "connect-garmin-intro": "Puoi condividere i dati dal tuo account Garmin se ne hai uno. Per iniziare, fai clic o tocca qui sotto per accedere con le tue credenziali Garmin.",
    "connect-garmin-button": "Collega Garmin",
    "received-garmin-data": "Stiamo ricevendo i tuoi dati Garmin!",
    "connect-dexcom-intro": "Puoi condividere i dati dal tuo account Dexcom se ne hai uno. Per iniziare, fai clic o tocca qui sotto per accedere con le tue credenziali Dexcom.",
    "connect-dexcom-button": "Collega Dexcom",
    "received-dexcom-data": "Stiamo ricevendo i tuoi dati Dexcom!",
    "downloading-data": "Download dati in corso...",
    "downloading-data-menu": "Download Dati",
    "all-tasks-complete": "Tutti i compiti completati!",
    "view-all": "Visualizza tutto",
    "tasks": "Compiti",
    "incomplete-tasks": "Compiti incompleti",
    "completed-tasks": "Compiti completati",
    "overdue": "Scaduto",
    "due-today": "Scadenza oggi",
    "due-tomorrow": "Scadenza domani",
    "due": "Scadenza",
    "due-in": "Scadenza tra",
    "days": "giorni",
    "notifications": "Notifiche",
    "support": "Supporto",
    "all-notifications": "Tutte le notifiche",
    "steps": "Passi",
    "resting-heart-rate": "Frequenza cardiaca a riposo",
    "distance-traveled": "Distanza percorsa",
    "google-fit-share": "Tocca per condividere i dati di fitness",
    "devices": "Dispositivi",
    "last-sync": "Ultima sincronizzazione",
    "completed": "Completato",
    "ehr-intro": "I tuoi record sanitari elettronici (EHR) sono una fonte importante di informazioni. Se ci aiuti a raccogliere il tuo EHR, i ricercatori utilizzeranno questi dati per fare scoperte.",
    "external-accounts-title-divider": " / ",
    "external-accounts-title-providers": "Fornitori",
    "external-accounts-title-health-plans": "Piani sanitari",
    "external-accounts-title-devices": "Dispositivi",
    "external-accounts-error": "Uno dei tuoi account richiede attenzione",
    "external-accounts-loading": "I tuoi dati vengono attualmente scaricati dai piani sanitari e fornitori collegati. Si prega di controllare di nuovo tra qualche momento per visualizzare i tuoi dati.",
    "external-account-authorization-expired": "Autorizzazione scaduta",
    "external-account-fetching-data": "Recupero dati in corso...",
    "external-account-deleting": "Rimozione...",
    "external-account-last-updated": "Ultimo aggiornamento",
    "external-account-error": "Errore imprevisto",
    "external-account-reconnect": "Riconnetti",
    "external-account-refresh": "Aggiorna",
    "external-account-remove": "Rimuovi",
    "device-data-no-data": "Se hai collegato Apple Health, Google Fit, Fitbit o Garmin, torna più tardi per visualizzare i tuoi dati.",
    "no-notifications-received": "Nessuna notifica ricevuta",
    "next-button-text": "Avanti",
    "lab-results-title": "Risultati di laboratorio",
    "medications-title": "Medicinali",
    "immunizations-title": "Immunizzazioni",
    "reports-title": "Rapporti",
    "allergies-title": "Allergie",
    "conditions-title": "Condizioni",
    "procedures-title": "Procedure",
    "app-download-title": "Prossimo passo: Scarica l'app",
    "app-download-subtitle": "Scaricare l'app MyDataHelps rende ancora più facile partecipare a @@PROJECT_NAME@@.",
    "app-download-google-play-link-alt": "Scarica su Google Play Store",
    "app-download-app-store-link-alt": "Scarica su App Store di Apple",
    "start": "Inizia",
    "resume": "Riprendi",
    "start-survey": "Inizia sondaggio",
    "resume-survey": "Riprendi sondaggio",
    "30-day-average": "Media 30 giorni",
    "today": "Oggi",
    "yesterday": "Ieri",
    "tap-to-log-today": "Tocca qui per registrare i tuoi sintomi o trattamenti oggi!",
    "mild": "Lievi",
    "moderate": "Moderati",
    "severe": "Gravi",
    "severe-shortened": "grav",
    "moderate-shortened": "mod",
    "mild-shortened": "lievi",
    "log-todays-symptoms": "Registra i sintomi di oggi",
    "todays-log": "Registro di oggi",
    "symptoms": "Sintomi",
    "treatments": "Trattamenti",
    "symptoms-experiencing-today": "Quali sintomi stai sperimentando?",
    "symptoms-experiencing-previous": "Quali sintomi stavate sperimentando?",
    "treatments-experiencing-today": "Quali trattamenti hai eseguito?",
    "treatments-experiencing-previous": "Quali trattamenti hai eseguito?",
    "feeling-overall-today": "Come ti senti complessivamente oggi?",
    "feeling-overall-previous": "Come ti sentivi complessivamente?",
    "additional-notes": "Note aggiuntive?",
    "how-severe-is": "Quanto è grave il tuo",
    "how-severe-was": "Quanto era grave il tuo",
    "clear-symptom": "Cancella sintomo",
    "add-notes": "Aggiungi note",
    "notes": "Note",
    "enter-symptom-name": "Inserisci il nome del sintomo",
    "enter-treatment-name": "Inserisci il nome del trattamento",
    "severity-tracking-none": "Non monitorare gravità",
    "severity-tracking-3point": "Valutazione Leggera / Moderata / Grave",
    "severity-tracking-10point": "Valutazione da 1 a 10 punti",
    "muted": "Silenzioso",
    "not-muted": "Non silenzioso",
    "delete": "Elimina",
    "severity": "Gravità",
    "item-delete-warning": "Avviso: Continuare eliminerà definitivamente gli elementi sottostanti e tutti i dati associati dai tuoi registri. Se non desideri eliminare questi elementi, seleziona \"Annulla\".",
    "unsaved-changes": "Modifiche non salvate",
    "daily-overall-experience": "Esperienza complessiva giornaliera",
    "average": "Media",
    "include-symptoms": "Includi sintomi",
    "select-symptoms": "Seleziona sintomi",
    "include-treatments": "Includi trattamenti",
    "select-treatments": "Seleziona trattamenti",
    "download-mydatahelps": "Scarica MyDataHelps",
    "connect-devices-title": "Collega dispositivi",
    "connect-devices-text": "Condividi dati dai tuoi dispositivi indossabili, app e altri dispositivi.",
    "apple-health-troubleshooting-intro": "Se non hai approvato o hai disattivato la condivisione dei tuoi dati di Apple Health e desideri abilitarla, segui questi passaggi:",
    "apple-health-troubleshooting-li-1": "Apri l'app \"Impostazioni\"",
    "apple-health-troubleshooting-li-2": "Seleziona \"Privacy\"",
    "apple-health-troubleshooting-li-3": "Seleziona \"Salute\"",
    "apple-health-troubleshooting-li-4": "Seleziona \"MyDataHelps\"",
    "apple-health-troubleshooting-li-5": "Attiva le categorie di dati che desideri condividere",
    "how-to-enable": "Come abilitare",
    "new-points-title": "Ben fatto!",
    "new-points-text": "Ti sono stati assegnati punti per i seguenti elementi:",
    "new-points-next-reward-prefix": "Ora hai bisogno di ",
    "new-points-next-reward-suffix": " punti per sbloccare la tua prossima ricompensa.",
    "new-points-done-button-text": "Fatto",
    "systolic-average": "Media sistolica",
    "diastolic-average": "Media diastolica",
    "highest-systolic": "Sistolica più alta",
    "lowest-systolic": "Sistolica più bassa",
    "resource-default-button-text": "Apri",
    "inbox-message-completed-status": "VISTO",
    "inbox-resource-completed-status": "VISTO",
    "inbox-survey-completed-status": "COMPLETATO",
    "inbox-history-view-title": "Cronologia della Posta in Arrivo",
    "inbox-history-view-empty-text": "Non hai elementi nella cronologia della posta in arrivo.",
    "inbox-message-view-related-resources-title": "Correlati",
    "inbox-view-title": "Posta in Arrivo",
    "inbox-view-empty-text": "Non hai nuovi elementi nella tua posta in arrivo.",
    "inbox-view-messages-title": "Messaggi",
    "inbox-view-surveys-title": "Sondaggi",
    "inbox-view-resources-title": "Risorse",
    "inbox-view-recently-completed-title": "Recente",
    "inbox-view-recently-completed-empty-text": "Non hai elementi completati di recente nella tua posta in arrivo.",
    "inbox-view-history-button-text": "Visualizza cronologia della posta in arrivo",
    "choose-report-month": "Scegli il Mese del Report",
    "include-overall-experience": "Includi Esperienza Complessiva Giornaliera",
    "include-notes": "Includi Note",
    "create-report": "Crea Report in PDF",
    "reports": "Report",
    "recent-daily-data-bar-chart-subtitle": "Ultimi 7 giorni",
    "recent-daily-data-bar-chart-no-data": "Nessun Dato",
    "resource-list-empty-text": "Nessuna risorsa trovata.",
    "asthma-symptom-level-none": "Nessun sintomo",
    "asthma-symptom-level-mild": "Sintomi lievi",
    "asthma-symptom-level-moderate": "Sintomi moderati",
    "asthma-symptom-level-severe": "Sintomi gravi",
    "asthma-symptom-difficulty-breathing": "Difficoltà respiratoria",
    "asthma-symptom-wheezing": "Sibilanza",
    "asthma-symptom-coughing": "Tosse",
    "asthma-symptom-chest-tightness": "Stretta al petto o pressione",
    "asthma-impact-limit-daily-activity": "Limitare l'attività quotidiana",
    "asthma-impact-waking-at-night": "Svegliarsi di notte",
    "asthma-impact-using-rescue-inhaler": "Usare l'inhaler di salvataggio",
    "asthma-trigger-cold-illness": "Malattia fredda/virale",
    "asthma-trigger-animal-exposure": "Esposizione agli animali",
    "asthma-trigger-seasonal-allergens": "Allergeni stagionali/polline",
    "asthma-trigger-smoke": "Fumo",
    "asthma-trigger-weather-changes": "Cambiamenti climatici estremi",
    "asthma-trigger-air-pollution": "Inquinamento atmosferico",
    "asthma-trigger-strong-smells": "Odori forti",
    "asthma-trigger-chemicals": "Prodotti chimici/detergenti",
    "asthma-trigger-dust": "Polvere",
    "asthma-trigger-mold": "Muffa",
    "asthma-trigger-dust-mites": "Acari della polvere",
    "asthma-trigger-rodents": "Roditori",
    "asthma-trigger-cockroaches": "Scarafaggi",
    "asthma-trigger-nsaid": "FANS/Aspirina",
    "asthma-trigger-beta-blocker": "Bloccante beta",
    "asthma-trigger-heartburn": "Bruciore di stomaco",
    "asthma-trigger-red-wine": "Vino rosso",
    "asthma-trigger-new-foods": "Nuovi cibi",
    "asthma-trigger-cooked-without-ventilation": "Cottura (senza ventilazione)",
    "asthma-trigger-pet-in-bed": "Animale domestico nel letto",
    "asthma-trigger-incense-or-candle": "Candela/Incenso",
    "asthma-data-status-out-of-range": "Fuori intervallo",
    "asthma-data-status-in-range": "In intervallo",
    "asthma-data-status-offline": "Non in linea",
    "asthma-data-status-establishing": "In fase di stabilimento",
    "asthma-data-status-not-determined": "Valore base non stabilito",
    "asthma-data-status-not-found": "Nessun dato registrato",
    "asthma-data-status-not-configured": "Non configurato",
    "asthma-control-calendar-daily-entry-missed": "Mancato inserimento giornaliero",
    "asthma-control-calendar-not-logged-yet": "Non ancora registrato",
    "asthma-control-calendar-log-entries-symptoms-label": "Sintomi",
    "asthma-control-calendar-log-entries-impacts-label": "Impatti",
    "asthma-control-calendar-log-entries-triggers-label": "Scatenanti",
    "asthma-control-status-header-multiple-out-of-range-p1": "Più punti dati sono ",
    "asthma-control-status-header-multiple-out-of-range-p2": "al di fuori dei tuoi livelli normali",
    "asthma-control-status-header-multiple-out-of-range-p3": ". Completa il tuo inserimento giornaliero.",
    "asthma-control-status-header-abnormal-heart-rate-p1": "Il tuo battito cardiaco a riposo è ",
    "asthma-control-status-header-abnormal-heart-rate-p2": "sopra il tuo livello normale",
    "asthma-control-status-header-abnormal-heart-rate-p3": ". Completa il tuo inserimento giornaliero.",
    "asthma-control-status-header-abnormal-respiratory-rate-p1": "Il tuo tasso di respirazione è ",
    "asthma-control-status-header-abnormal-respiratory-rate-p2": "sopra il tuo livello normale",
    "asthma-control-status-header-abnormal-respiratory-rate-p3": ". Completa il tuo inserimento giornaliero.",
    "asthma-control-status-header-abnormal-steps-p1": "La tua attività è ",
    "asthma-control-status-header-abnormal-steps-p2": "sotto il tuo livello normale",
    "asthma-control-status-header-abnormal-steps-p3": ". Completa il tuo inserimento giornaliero.",
    "asthma-control-status-header-abnormal-sleep-p1": "Le tue disturbi del sonno sono ",
    "asthma-control-status-header-abnormal-sleep-p2": "sopra il tuo livello normale",
    "asthma-control-status-header-abnormal-sleep-p3": ". Completa il tuo inserimento giornaliero.",
    "asthma-control-status-header-abnormal-blood-oxygen-p1": "Il tuo livello di ossigeno nel sangue è ",
    "asthma-control-status-header-abnormal-blood-oxygen-p2": "sotto il tuo livello normale",
    "asthma-control-status-header-abnormal-blood-oxygen-p3": ". Completa il tuo inserimento giornaliero.",
    "asthma-control-status-header-abnormal-home-aqi-p1": "L'indice di qualità dell'aria nella tua casa è ",
    "asthma-control-status-header-abnormal-home-aqi-p2": ". Completa il tuo inserimento giornaliero.",
    "asthma-control-status-header-abnormal-work-aqi-p1": "L'indice di qualità dell'aria sul lavoro è ",
    "asthma-control-status-header-abnormal-work-aqi-p2": ". Completa il tuo inserimento giornaliero.",
    "asthma-control-status-header-no-data": "Aggiungi un inserimento giornaliero per valutare il controllo dell'asma.",
    "asthma-control-status-header-not-determined": "Sono necessari più inserimenti giornalieri per valutare il controllo dell'asma.",
    "asthma-control-status-header-controlled-p1": "In base ai tuoi inserimenti, il tuo asma è ",
    "asthma-control-status-header-controlled-p2": "sotto controllo.",
    "asthma-control-status-header-not-controlled-p1": "In base ai tuoi inserimenti, il tuo asma non è ",
    "asthma-control-status-header-not-controlled-p2": "sotto controllo.",
    "asthma-control-status-header-not-controlled-stat-symptom-days": "Giorni di sintomi",
    "asthma-control-status-header-not-controlled-stat-rescue-inhaler": "Inalatore di salvataggio",
    "asthma-control-status-header-not-controlled-stat-limited-activity": "Attività limitata",
    "asthma-control-status-header-not-controlled-stat-awakenings": "Svegli",
    "asthma-action-plan-manager-title": "Piano d'Azione per l'Asma",
    "asthma-action-plan-manager-instructions": "Salva una foto del tuo piano d'azione per l'asma per un facile riferimento.",
    "asthma-action-plan-manager-learn-more": "Cos'è un piano d'azione per l'asma?",
    "asthma-action-plan-manager-edit-button-text": "Modifica",
    "asthma-action-plan-manager-not-found-text": "Tocca per aggiungere una foto",
    "asthma-biometrics-title": "Salute & Attività",
    "asthma-biometrics-daytime-resting-heart-rate-label": "Frequenza cardiaca a riposo (Diurna)",
    "asthma-biometrics-nighttime-resting-heart-rate-label": "Frequenza cardiaca a riposo (Notturna)",
    "asthma-biometrics-beats-per-minute-units": "BPM",
    "asthma-biometrics-respiratory-rate-label": "Frequenza respiratoria",
    "asthma-biometrics-breaths-per-minute-units": "BPM",
    "asthma-biometrics-steps-label": "Passi",
    "asthma-biometrics-daytime-blood-oxygen-level-label": "Saturazione di ossigeno (Diurna)",
    "asthma-biometrics-nighttime-blood-oxygen-level-label": "Saturazione di ossigeno (Notturna)",
    "asthma-biometrics-percent-units": "%",
    "asthma-biometrics-sleep-disturbances-label": "Disturbi del Sonno",
    "asthma-air-qualities-title": "Qualità dell'Aria",
    "asthma-air-qualities-setup-button-text": "+ Imposta",
    "asthma-air-qualities-home-aqi-label": "AQI (Casa)",
    "asthma-air-qualities-work-aqi-label": "AQI (Lavoro)",
    "asthma-alert-takeover-notice-instructions": "Prenditi un momento per registrare eventuali sintomi di asma in un inserimento giornaliero.",
    "asthma-alert-takeover-notice-add-entry-button-text": "+ Inserimento Giornaliero",
    "asthma-alert-takeover-notice-not-now-button-text": "Non ora",
    "asthma-log-entry-details-not-editable": "Inserimento giornaliero mancato",
    "asthma-log-entry-details-not-logged-yet": "Non ancora registrato",
    "asthma-log-entry-details-edit-button-text": "Modifica",
    "asthma-log-entry-details-add-button-text": "Inserisci Ingresso",
    "asthma-log-entry-details-symptoms-label": "Sintomi",
    "asthma-log-entry-details-impacts-label": "Impatti",
    "asthma-log-entry-details-triggers-label": "Scatenanti",
    "asthma-log-entry-details-component-no-data-p1": "Nessun ",
    "asthma-log-entry-details-component-no-data-p2": " registrato",
    "asthma-log-entry-header-today-log-label": "Oggi",
    "asthma-log-entry-header-yesterday-log-label": "Ieri",
    "asthma-log-entry-header-not-logged-yet": "Non ancora registrato",
    "asthma-log-entry-header-add-button-text": "Inserisci Ingresso",
    "asthma-activity-view-title": "Attività",
    "asthma-activity-view-chart-title": "Passi",
    "asthma-activity-view-alert-message": "La tua attività è sotto il tuo normale livello.",
    "asthma-alert-takeover-message": "Più punti dati sono al di fuori dei tuoi livelli normali.",
    "asthma-air-quality-view-title": "Qualità dell'Aria",
    "asthma-air-quality-view-home-aqi-chart-title": "Qualità dell'Aria (Casa)",
    "asthma-air-quality-view-home-aqi-alert-message": "Il tuo AQI domestico è insalubre.",
    "asthma-air-quality-view-work-aqi-chart-title": "Qualità dell'Aria (Lavoro)",
    "asthma-air-quality-view-work-aqi-alert-message": "Il tuo AQI lavorativo è insalubre.",
    "asthma-heart-and-lungs-view-title": "Cuore & Polmoni",
    "asthma-heart-and-lungs-view-dhr-chart-title": "Frequenza Cardiaca a Riposo (Diurna)",
    "asthma-heart-and-lungs-view-dhr-alert-message": "La tua frequenza cardiaca a riposo diurna è sopra il tuo normale livello.",
    "asthma-heart-and-lungs-view-nhr-chart-title": "Frequenza Cardiaca a Riposo (Notturna)",
    "asthma-heart-and-lungs-view-nhr-alert-message": "La tua frequenza cardiaca a riposo notturna è sopra il tuo normale livello.",
    "asthma-heart-and-lungs-view-rr-chart-title": "Frequenza Respiratoria",
    "asthma-heart-and-lungs-view-rr-alert-message": "La tua frequenza respiratoria è sopra il tuo normale livello.",
    "asthma-heart-and-lungs-view-dbol-chart-title": "Ossigeno nel Sangue (Diurno)",
    "asthma-heart-and-lungs-view-dbol-alert-message": "Il tuo ossigeno nel sangue diurno è sotto il tuo livello normale.",
    "asthma-heart-and-lungs-view-nbol-chart-title": "Ossigeno nel Sangue (Notturno)",
    "asthma-heart-and-lungs-view-nbol-alert-message": "Il tuo ossigeno nel sangue notturno è sotto il tuo livello normale.",
    "asthma-sleep-view-title": "Sonno",
    "asthma-sleep-view-chart-title": "Disturbi del Sonno",
    "asthma-sleep-view-alert-message": "I tuoi disturbi del sonno sono sopra il tuo normale livello.",
    "asthma-log-entry-editor-view-symptom-level-title": "Livello dei Sintomi",
    "asthma-log-entry-editor-view-select-one-subtitle": "Seleziona uno",
    "asthma-log-entry-editor-view-select-all-subtitle": "Seleziona tutti quelli applicabili",
    "asthma-log-entry-editor-view-symptoms-title": "Sintomi",
    "asthma-log-entry-editor-view-impacts-title": "Impatti",
    "asthma-log-entry-editor-view-triggers-title": "Scatenanti",
    "asthma-air-quality-description-unhealthy": "Non salutare",
    "asthma-air-quality-description-very-unhealthy": "Molto non salutare",
    "asthma-air-quality-description-hazardous": "Pericoloso",
    "blood-type": "Gruppo Sanguigno",
    "device-data-month-chart-no-data": "Nessun Dato",
    "device-data-month-chart-daily-average": "Media Giornaliera",
    "term-information-not-found-header": "Nessuna Informazione Trovata",
    "term-information-not-found-body": "Impossibile trovare informazioni su questo argomento",
    "term-information-disclaimer": "<strong>DISCLAIMER:</strong> Le informazioni fornite non sono un consiglio medico. Servono a farvi comprendere meglio la vostra salute. Si prega di contattare il proprio fornitore di assistenza sanitaria se avete domande riguardanti la vostra condizione medica.",
    "term-information-view-on-medline": "Visualizza su MedlinePlus",
    "type": "Tipo",
    "location": "Posizione",
    "description": "Descrizione",
    "performed-by": "Eseguito da",
    "verified-by": "Verificato da",
    "normal-range": "Intervallo normale",
    "more": "Di più",
    "procedure": "Procedura",
    "procedures": "Procedure",
    "lab-report": "Referto di Laboratorio",
    "service-performed": "Servizio Eseguito",
    "services-performed": "Servizi Eseguiti",
    "device-data-month-chart-minutes": "Minuti",
    "device-data-month-chart-sleep": "Sonno",
    "air-quality-home": "Qualità dell'Aria (Casa)",
    "air-quality-work": "Qualità dell'Aria (Lavoro)",
    "sedentary-time": "Tempo Sedentario",
    "active-time": "Tempo Attivo",
    "lightly-active-time": "Tempo Leggermente Attivo",
    "fairly-active-time": "Tempo Moderatamente Attivo",
    "very-active-time": "Tempo Molto Attivo",
    "breathing-rate": "Frequenza Respiratoria",
    "calories-burned": "Calorie Bruciate",
    "elevated-heart-rate-time": "Tempo con Frequenza Cardiaca Elevata",
    "fat-burn-heart-rate-time": "Tempo di Bruciare Grassi",
    "cardio-heart-rate-time": "Tempo Cardio",
    "peak-heart-rate-time": "Tempo di Frequenza Cardiaca Massima",
    "floors-climbed": "Piani Saliti",
    "heart-rate-variability": "Variabilità della Frequenza Cardiaca",
    "sleep-time": "Tempo di Sonno",
    "light-sleep-time": "Tempo di Sonno Leggero",
    "deep-sleep-time": "Tempo di Sonno Profondo",
    "rem-sleep-time": "Tempo di Sonno REM",
    "spo2": "SpO2",
    "heart-rate-range": "Intervallo di Frequenza Cardiaca",
    "max-heart-rate": "Frequenza Cardiaca Massima",
    "core-sleep-time": "Tempo di Sonno Profondo",
    "in-bed-time": "Tempo a Letto",
    "stand-time": "Tempo in Piedi",
    "walking-heart-rate-average": "Media della Frequenza Cardiaca durante la Camminata",
    "active-energy-burned": "Energia Attiva Bruciata",
    "active-calories": "Calorie Attive",
    "resting-calories": "Calorie a Riposo",
    "total-calories": "Calorie Totali",
    "min-heart-rate": "Frequenza Cardiaca Minima",
    "average-heart-rate": "Frequenza Cardiaca Media",
    "max-stress-level": "Livello Massimo di Stress",
    "average-stress-level": "Livello Medio di Stress",
    "total-stress-time": "Tempo Totale di Stress",
    "low-stress-time": "Tempo a Basso Stress",
    "medium-stress-time": "Tempo a Stress Medio",
    "high-stress-time": "Tempo ad Alto Stress",
    "awake-time": "Tempo Sveglio",
    "sleep-score": "Punteggio del Sonno",
    "bpm": "bpm",
    "hours-abbreviation": "h",
    "minutes-abbreviation": "m",
    "points-until-next-badge": "{{points}} punti al prossimo badge",
    "fitbit-wear-time": "Tempo di utilizzo del Fitbit",
    "my-badges": "I miei badge ({{badges}})",
    "new-badge-title": "Ottimo lavoro!",
    "new-badge-text": "Hai ottenuto un nuovo badge!",
    "get-badge": "Ottieni badge",
    "glucose-chart-no-data": "Nessuna lettura della glicemia",
    "glucose-stats-range-label": "Intervallo di glicemia",
    "glucose-stats-avg-label": "Glicemia media",
    "glucose-stats-steps-label": "Passi",
    "glucose-stats-sleep-label": "Sonno",
    "stress-level-title": "Stress generale",
    "stress-level-min-label": "Nessuno stress",
    "stress-level-max-label": "Estremamente stressato",
    "meal-type-meal": "Pasto",
    "meal-type-snack": "Spuntino",
    "meal-type-drink": "Bevanda",
    "meal-log-title": "Registro pasti",
    "meal-log-no-data": "Nessun pasto registrato",
    "meal-editor-time-input-label": "Ora",
    "meal-editor-duplicate-timestamp-error": "Due pasti non possono avere la stessa ora.",
    "glucose-view-title": "Monitoraggio della glicemia"
};

export default strings;