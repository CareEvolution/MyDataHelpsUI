let strings: { [key: string]: string } = {
    "back": "Zurück",
    "done": "Fertig",
    "close": "Schließen",
    "save": "Speichern",
    "add": "Hinzufügen",
    "edit": "Bearbeiten",
    "cancel": "Abbrechen",
    "clear": "leeren",
    "settings": "Einstellungen",
    "connect": "Verbinden",
    "reconnect": "Erneut verbinden",
    "refresh": "Aktualisieren",
    "remove": "Entfernen",
    "help": "Hilfe",
    "view": "Anzeigen",
    "health-records": "Gesundheitsdaten",
    "connect-ehr-title-prefix": "Verbindung zu ",
    "connect-ehr-title-divider": " oder ",
    "connect-ehr-title-providers": "Anbieter",
    "connect-ehr-title-health-plans": "Krankenversicherung",
    "connect-ehr-connected": "Wir erhalten Ihre EHR-Daten!",
    "connect-ehr-needs-attention": "Ein Ihrer Konten benötigt Aufmerksamkeit.",
    "connect-ehr-text": "Verbinden Sie Ihren Anbieter oder Ihre Krankenkasse, um Ihre Laborergebnisse, Erkrankungen, Medikamente und mehr anzuzeigen.",
    "connect-ehr-text-connected": "Verbinden Sie einen weiteren Anbieter, um mehr Daten zu teilen oder Ihre EHR-Verbindungen zu verwalten.",
    "connect-ehr-not-enabled": "Die Verknüpfung von EHR ist für dieses Projekt nicht aktiviert.",
    "search-for-provider": "Suche nach Anbieter oder Krankenversicherung",
    "request-add": "Anfrage zum Hinzufügen",
    "expired-reconnect": "Verbindung abgelaufen. Bitte erneut verbinden.",
    "connect-error-reconnect": "Unerwarteter Fehler. Bitte erneut verbinden.",
    "connected": "Verbunden",
    "search": "Suche",
    "connect-fitbit-intro": "Sie können Daten von Ihrem Fitbit-Konto teilen, wenn Sie eins haben. Klicken Sie unten, um sich mit Ihren Fitbit-Anmeldeinformationen anzumelden.",
    "connect-fitbit-button": "Fitbit verbinden",
    "received-fitbit-data": "Wir erhalten Ihre Fitbit-Daten!",
    "connect-garmin-intro": "Sie können Daten von Ihrem Garmin-Konto teilen, wenn Sie eins haben. Klicken Sie unten, um sich mit Ihren Garmin-Anmeldeinformationen anzumelden.",
    "connect-garmin-button": "Garmin verbinden",
    "received-garmin-data": "Wir erhalten Ihre Garmin-Daten!",
    "connect-dexcom-intro": "Sie können Daten von Ihrem Dexcom-Konto teilen, wenn Sie eins haben. Klicken Sie unten, um sich mit Ihren Dexcom-Anmeldeinformationen anzumelden.",
    "connect-dexcom-button": "Dexcom verbinden",
    "received-dexcom-data": "Wir erhalten Ihre Dexcom-Daten!",
    "downloading-data": "Daten werden heruntergeladen...",
    "downloading-data-menu": "Daten werden heruntergeladen",
    "empty-tasks-incomplete": "Derzeit keine offenen Aufgaben anzuzeigen.",
    "empty-tasks-complete": "Abgeschlossene Aufgaben werden hier angezeigt.",
    "view-all": "Alle anzeigen",
    "tasks": "Aufgaben",
    "incomplete-tasks": "Unvollständige Aufgaben",
    "completed-tasks": "Abgeschlossene Aufgaben",
    "overdue": "Überfällig",
    "due-today": "Heute fällig",
    "due-tomorrow": "Morgen fällig",
    "due": "Fällig",
    "due-in": "Fällig in",
    "days": "Tagen",
    "notifications": "Benachrichtigungen",
    "support": "Support",
    "all-notifications": "Alle Benachrichtigungen",
    "steps": "Schritte",
    "resting-heart-rate": "Ruhepuls",
    "distance-traveled": "Zurückgelegte Entfernung",
    "google-fit-share": "Tippen Sie hier, um Fitnessdaten zu teilen",
    "devices": "Geräte",
    "last-sync": "Zuletzt synchronisiert",
    "completed": "Abgeschlossen",
    "ehr-intro-search": "Suchen Sie, indem Sie den Namen Ihres Anbieters oder des Mitgliederportals für Ihren Gesundheitsdienstleister oder Ihre Krankenkasse eingeben.",
    "external-accounts-title-divider": " / ",
    "external-accounts-title-providers": "Anbieter",
    "external-accounts-title-health-plans": "Krankenversicherungen",
    "external-accounts-title-devices": "Geräte",
    "external-accounts-error": "Eines Ihrer Konten benötigt Aufmerksamkeit",
    "external-accounts-loading": "Ihre Daten werden derzeit von Ihren verknüpften Krankenversicherungen und Anbietern heruntergeladen. Bitte überprüfen Sie später, um Ihre Daten anzuzeigen.",
    "external-account-authorization-expired": "Autorisierung abgelaufen",
    "external-account-fetching-data": "Daten werden abgerufen...",
    "external-account-deleting": "Wird gelöscht...",
    "external-account-last-updated": "Zuletzt aktualisiert",
    "external-account-error": "Unerwarteter Fehler",
    "external-account-reconnect": "Erneut verbinden",
    "external-account-refresh": "Aktualisieren",
    "external-account-remove": "Entfernen",
    "device-data-no-data": "Wenn Sie Apple Health, Google Fit, Fitbit oder Garmin verbunden haben, kommen Sie später zurück, um Ihre Daten anzuzeigen.",
    "no-notifications-received": "Keine Benachrichtigungen erhalten",
    "next-button-text": "Weiter",
    "lab-results-title": "Laborergebnisse",
    "medications-title": "Medikamente",
    "immunizations-title": "Impfungen",
    "reports-title": "Berichte",
    "allergies-title": "Allergien",
    "conditions-title": "Bedingungen",
    "procedures-title": "Verfahren",
    "app-download-title": "Nächstes: Laden Sie die App herunter",
    "app-download-subtitle": "Das Herunterladen der MyDataHelps-App erleichtert die Teilnahme an @@PROJECT_NAME@@.",
    "app-download-google-play-link-alt": "Im Google Play Store herunterladen",
    "app-download-app-store-link-alt": "Im Apple App Store herunterladen",
    "start": "Starten",
    "resume": "Fortsetzen",
    "start-survey": "Umfrage starten",
    "resume-survey": "Umfrage fortsetzen",
    "30-day-average": "Durchschnitt der letzten 30 Tage",
    "today": "Heute",
    "yesterday": "Gestern",
    "tap-to-log-today": "Tippen Sie hier, um Ihre Symptome oder Behandlungen zu protokollieren!",
    "mild": "Leicht",
    "moderate": "Mittel",
    "severe": "Schwer",
    "severe-shortened": "schw",
    "moderate-shortened": "mittel",
    "mild-shortened": "leicht",
    "log-todays-symptoms": "Symptome von heute protokollieren",
    "todays-log": "Protokoll von heute",
    "symptoms": "Symptome",
    "treatments": "Behandlungen",
    "symptoms-experiencing-today": "Welche Symptome treten bei Ihnen heute auf?",
    "symptoms-experiencing-previous": "Welche Symptome traten bei Ihnen früher auf?",
    "treatments-experiencing-today": "Welche Behandlungen haben Sie heute durchgeführt?",
    "treatments-experiencing-previous": "Welche Behandlungen haben Sie früher durchgeführt?",
    "feeling-overall-today": "Wie fühlen Sie sich insgesamt heute?",
    "feeling-overall-previous": "Wie haben Sie sich insgesamt früher gefühlt?",
    "additional-notes": "Weitere Anmerkungen?",
    "how-severe-is": "Wie schwer ist Ihr",
    "how-severe-was": "Wie schwer war Ihr",
    "clear-symptom": "Symptom löschen",
    "add-notes": "Notizen hinzufügen",
    "notes": "Notizen",
    "enter-symptom-name": "Symptomname eingeben",
    "enter-treatment-name": "Behandlungsname eingeben",
    "severity-tracking-none": "Keine Schweregradverfolgung",
    "severity-tracking-3point": "Mild / Mittel / Schwer Bewertung",
    "severity-tracking-10point": "1 - 10 Punkte Bewertung",
    "muted": "Stummgeschaltet",
    "not-muted": "Nicht stummgeschaltet",
    "delete": "Löschen",
    "severity": "Schweregrad",
    "item-delete-warning": "Warnung: Durch die Fortsetzung werden die unten aufgeführten Elemente und alle zugehörigen Daten aus Ihren Protokollen dauerhaft gelöscht. Wenn Sie diese Elemente nicht löschen möchten, wählen Sie \"Abbrechen\".",
    "unsaved-changes": "Ungespeicherte Änderungen",
    "daily-overall-experience": "Tägliches Gesamterlebnis",
    "average": "Durchschnitt",
    "include-symptoms": "Symptome einbeziehen",
    "select-symptoms": "Symptome auswählen",
    "include-treatments": "Behandlungen einbeziehen",
    "select-treatments": "Behandlungen auswählen",
    "download-mydatahelps": "MyDataHelps herunterladen",
    "connect-devices-title": "Geräte verbinden",
    "connect-devices-text": "Teilen Sie Daten von Ihren Wearables, Apps und anderen Geräten.",
    "apple-health-troubleshooting-intro": "Wenn Sie der Freigabe Ihrer Apple Health-Daten nicht zugestimmt haben oder diese deaktiviert haben und sie aktivieren möchten, befolgen Sie diese Schritte:",
    "apple-health-troubleshooting-li-1": "Öffnen Sie die \"Einstellungen\"-App",
    "apple-health-troubleshooting-li-2": "Wählen Sie \"Datenschutz\"",
    "apple-health-troubleshooting-li-3": "Wählen Sie \"Gesundheit\"",
    "apple-health-troubleshooting-li-4": "Wählen Sie \"MyDataHelps\"",
    "apple-health-troubleshooting-li-5": "Aktivieren Sie die Kategorien von Daten, die Sie teilen möchten",
    "how-to-enable": "So aktivieren Sie",
    "new-points-title": "Gut gemacht!",
    "new-points-text": "Sie haben Punkte für folgende Aktivitäten erhalten:",
    "new-points-next-reward-prefix": "Sie benötigen nun ",
    "new-points-next-reward-suffix": " Punkte, um Ihre nächste Belohnung freizuschalten.",
    "new-points-done-button-text": "Fertig",
    "systolic-average": "Durchschnittlicher systolischer Blutdruck",
    "diastolic-average": "Durchschnittlicher diastolischer Blutdruck",
    "highest-systolic": "Höchster systolischer Blutdruck",
    "lowest-systolic": "Niedrigster systolischer Blutdruck",
    "resource-default-button-text": "Öffnen",
    "inbox-message-completed-status": "ANGEGUCKT",
    "inbox-resource-completed-status": "ANGEGUCKT",
    "inbox-survey-completed-status": "ABGESCHLOSSEN",
    "inbox-history-view-title": "Postfachverlauf",
    "inbox-history-view-empty-text": "Sie haben keine Elemente in Ihrem Postfachverlauf.",
    "inbox-message-view-related-resources-title": "Verwandte",
    "inbox-view-title": "Postfach",
    "inbox-view-empty-text": "Sie haben keine neuen Elemente in Ihrem Postfach.",
    "inbox-view-messages-title": "Nachrichten",
    "inbox-view-surveys-title": "Umfragen",
    "inbox-view-resources-title": "Ressourcen",
    "inbox-view-recently-completed-title": "Kürzlich",
    "inbox-view-recently-completed-empty-text": "Sie haben keine kürzlich abgeschlossenen Elemente in Ihrem Postfach.",
    "inbox-view-history-button-text": "Postfachverlauf anzeigen",
    "choose-report-month": "Wählen Sie den Berichtsmonat",
    "include-overall-experience": "Tägliches Gesamterlebnis einschließen",
    "include-notes": "Notizen einschließen",
    "create-report": "PDF-Bericht erstellen",
    "reports": "Berichte",
    "recent-daily-data-bar-chart-subtitle": "Letzte 7 Tage",
    "recent-daily-data-bar-chart-no-data": "Keine Daten",
    "resource-list-empty-text": "Keine Ressourcen gefunden.",
    "asthma-symptom-level-none": "Keine Symptome",
    "asthma-symptom-level-mild": "Leichte Symptome",
    "asthma-symptom-level-moderate": "Mäßige Symptome",
    "asthma-symptom-level-severe": "Schwere Symptome",
    "asthma-symptom-difficulty-breathing": "Atembeschwerden",
    "asthma-symptom-wheezing": "Keuchen",
    "asthma-symptom-coughing": "Husten",
    "asthma-symptom-chest-tightness": "Enge oder Druck in der Brust",
    "asthma-impact-limit-daily-activity": "Tägliche Aktivitäten einschränken",
    "asthma-impact-waking-at-night": "Nachts aufwachen",
    "asthma-impact-using-rescue-inhaler": "Rettungsinhalator benutzen",
    "asthma-trigger-cold-illness": "Erkältung/Viruskrankheit",
    "asthma-trigger-animal-exposure": "Tierkontakt",
    "asthma-trigger-seasonal-allergens": "Saisonale Allergene/Pollen",
    "asthma-trigger-exercise": "Übung",
    "asthma-trigger-smoke": "Rauch",
    "asthma-trigger-weather-changes": "Extreme Wetteränderungen",
    "asthma-trigger-air-pollution": "Luftverschmutzung",
    "asthma-trigger-strong-smells": "Starke Gerüche",
    "asthma-trigger-chemicals": "Chemikalien/Reinigungsmittel",
    "asthma-trigger-dust": "Staub",
    "asthma-trigger-mold": "Schimmel",
    "asthma-trigger-dust-mites": "Hausstaubmilben",
    "asthma-trigger-rodents": "Nagetiere",
    "asthma-trigger-cockroaches": "Kakerlaken",
    "asthma-trigger-nsaid": "NSAID/Aspirin",
    "asthma-trigger-beta-blocker": "Betablocker",
    "asthma-trigger-heartburn": "Sodbrennen",
    "asthma-trigger-red-wine": "Rotwein",
    "asthma-trigger-new-foods": "Neue Lebensmittel",
    "asthma-trigger-cooked-without-ventilation": "Kochen (ohne Belüftung)",
    "asthma-trigger-pet-in-bed": "Haustier im Bett",
    "asthma-trigger-incense-or-candle": "Kerze/Räucherstäbchen",
    "asthma-data-status-out-of-range": "Außerhalb des Bereichs",
    "asthma-data-status-in-range": "Im Bereich",
    "asthma-data-status-offline": "Offline",
    "asthma-data-status-establishing": "Wird hergestellt",
    "asthma-data-status-not-determined": "Ausgangslinie nicht festgelegt",
    "asthma-data-status-not-found": "Keine Daten erfasst",
    "asthma-data-status-not-configured": "Nicht konfiguriert",
    "asthma-control-calendar-daily-entry-missed": "Täglicher Eintrag verpasst",
    "asthma-control-calendar-not-logged-yet": "Noch nicht protokolliert",
    "asthma-control-calendar-log-entries-symptoms-label": "Symptome",
    "asthma-control-calendar-log-entries-impacts-label": "Auswirkungen",
    "asthma-control-calendar-log-entries-triggers-label": "Auslöser",
    "asthma-control-status-header-multiple-out-of-range-p1": "Mehrere Datenpunkte liegen ",
    "asthma-control-status-header-multiple-out-of-range-p2": "außerhalb Ihrer normalen Werte",
    "asthma-control-status-header-multiple-out-of-range-p3": ". Führen Sie Ihren täglichen Eintrag durch.",
    "asthma-control-status-header-abnormal-heart-rate-p1": "Ihre Ruheherzfrequenz liegt ",
    "asthma-control-status-header-abnormal-heart-rate-p2": "über Ihrem normalen Wert",
    "asthma-control-status-header-abnormal-heart-rate-p3": ". Führen Sie Ihren täglichen Eintrag durch.",
    "asthma-control-status-header-abnormal-respiratory-rate-p1": "Ihre Atemfrequenz liegt ",
    "asthma-control-status-header-abnormal-respiratory-rate-p2": "über Ihrem normalen Wert",
    "asthma-control-status-header-abnormal-respiratory-rate-p3": ". Führen Sie Ihren täglichen Eintrag durch.",
    "asthma-control-status-header-abnormal-steps-p1": "Ihre Aktivität liegt ",
    "asthma-control-status-header-abnormal-steps-p2": "unter Ihrem normalen Wert",
    "asthma-control-status-header-abnormal-steps-p3": ". Führen Sie Ihren täglichen Eintrag durch.",
    "asthma-control-status-header-abnormal-sleep-p1": "Ihre Schlafstörungen liegen ",
    "asthma-control-status-header-abnormal-sleep-p2": "über Ihrem normalen Wert",
    "asthma-control-status-header-abnormal-sleep-p3": ". Führen Sie Ihren täglichen Eintrag durch.",
    "asthma-control-status-header-abnormal-blood-oxygen-p1": "Ihr Blutsauerstoffgehalt liegt ",
    "asthma-control-status-header-abnormal-blood-oxygen-p2": "unter Ihrem normalen Wert",
    "asthma-control-status-header-abnormal-blood-oxygen-p3": ". Führen Sie Ihren täglichen Eintrag durch.",
    "asthma-control-status-header-abnormal-home-aqi-p1": "Ihr Luftqualitätsindex zu Hause liegt ",
    "asthma-control-status-header-abnormal-home-aqi-p2": ". Führen Sie Ihren täglichen Eintrag durch.",
    "asthma-control-status-header-abnormal-work-aqi-p1": "Ihr Luftqualitätsindex bei der Arbeit liegt ",
    "asthma-control-status-header-abnormal-work-aqi-p2": ". Führen Sie Ihren täglichen Eintrag durch.",
    "asthma-control-status-header-no-data": "Fügen Sie einen täglichen Eintrag hinzu, um Ihre Asthmakontrolle zu bewerten.",
    "asthma-control-status-header-no-data-caregiver": "Fügen Sie einen täglichen Eintrag hinzu, um {name}s Asthmakontrolle zu bewerten.",
    "asthma-control-status-header-not-determined": "Weitere tägliche Einträge erforderlich, um Ihre Asthmakontrolle zu bewerten.",
    "asthma-control-status-header-not-determined-caregiver": "Es sind mehr tägliche Einträge erforderlich, um {name}s Asthmakontrolle zu bewerten.",
    "asthma-control-status-header-controlled-p1": "Basierend auf Ihren Einträgen ist Ihr Asthma ",
    "asthma-control-status-header-controlled-p1-caregiver": "Basierend auf den Einträgen ist {name}s Asthma ",
    "asthma-control-status-header-controlled-p2": "unter Kontrolle.",
    "asthma-control-status-header-not-controlled-p1": "Basierend auf Ihren Einträgen ist Ihr Asthma ",
    "asthma-control-status-header-not-controlled-p1-caregiver": "Basierend auf den Einträgen ist {name}s Asthma ",
    "asthma-control-status-header-not-controlled-p2": "nicht unter Kontrolle.",
    "asthma-control-status-header-not-controlled-stat-symptom-days": "Symptomtage",
    "asthma-control-status-header-not-controlled-stat-rescue-inhaler": "Rettungsinhalator",
    "asthma-control-status-header-not-controlled-stat-limited-activity": "Eingeschränkte Aktivität",
    "asthma-control-status-header-not-controlled-stat-awakenings": "Erwachen",
    "asthma-action-plan-manager-title": "Asthma-Aktionsplan",
    "asthma-action-plan-manager-instructions": "Speichern Sie ein Foto Ihres Asthma-Aktionsplans für einfache Referenz.",
    "asthma-action-plan-manager-instructions-caregiver": "Speichern Sie ein Foto von {name}s Asthma-Aktionsplan zur einfachen Referenz.",
    "asthma-action-plan-manager-learn-more": "Was ist ein Asthma-Aktionsplan?",
    "asthma-action-plan-manager-edit-button-text": "Bearbeiten",
    "asthma-action-plan-manager-not-found-text": "Tippen Sie hier, um ein Foto hinzuzufügen",
    "asthma-biometrics-title": "Gesundheit & Aktivität",
    "asthma-biometrics-daytime-resting-heart-rate-label": "Ruhe-HF (Tag)",
    "asthma-biometrics-nighttime-resting-heart-rate-label": "Ruhe-HF (Nacht)",
    "asthma-biometrics-beats-per-minute-units": "BPM",
    "asthma-biometrics-respiratory-rate-label": "Atemfrequenz",
    "asthma-biometrics-breaths-per-minute-units": "Atemzüge/Min",
    "asthma-biometrics-steps-label": "Schritte",
    "asthma-biometrics-daytime-blood-oxygen-level-label": "Sauerstoffsättigung (Tag)",
    "asthma-biometrics-nighttime-blood-oxygen-level-label": "Sauerstoffsättigung (Nacht)",
    "asthma-biometrics-percent-units": "%",
    "asthma-biometrics-sleep-disturbances-label": "Schlafstörungen",
    "asthma-air-qualities-title": "Luftqualität",
    "asthma-air-qualities-setup-button-text": "+ Einrichten",
    "asthma-air-qualities-home-aqi-label": "AQI (Zuhause)",
    "asthma-air-qualities-work-aqi-label": "AQI (Arbeit)",
    "asthma-alert-takeover-notice-instructions": "Nehmen Sie sich einen Moment Zeit, um etwaige Asthmasymptome in einem täglichen Eintrag zu erfassen.",
    "asthma-alert-takeover-notice-add-entry-button-text": "+ Täglicher Eintrag",
    "asthma-alert-takeover-notice-not-now-button-text": "Jetzt nicht",
    "asthma-log-entry-details-not-editable": "Täglicher Eintrag verpasst",
    "asthma-log-entry-details-not-logged-yet": "Noch nicht protokolliert",
    "asthma-log-entry-details-edit-button-text": "Bearbeiten",
    "asthma-log-entry-details-add-button-text": "Eintrag protokollieren",
    "asthma-log-entry-details-symptoms-label": "Symptome",
    "asthma-log-entry-details-impacts-label": "Auswirkungen",
    "asthma-log-entry-details-triggers-label": "Auslöser",
    "asthma-log-entry-details-component-no-data-p1": "Keine ",
    "asthma-log-entry-details-component-no-data-p2": " protokolliert",
    "asthma-log-entry-header-today-log-label": "Heute",
    "asthma-log-entry-header-yesterday-log-label": "Gestern",
    "asthma-log-entry-header-not-logged-yet": "Noch nicht protokolliert",
    "asthma-log-entry-header-add-button-text": "Eintrag protokollieren",
    "asthma-activity-view-title": "Aktivität",
    "asthma-activity-view-chart-title": "Schritte",
    "asthma-activity-view-alert-message": "Ihre Aktivität liegt unter Ihrem normalen Wert.",
    "asthma-alert-takeover-message": "Mehrere Datenpunkte liegen außerhalb Ihrer normalen Werte.",
    "asthma-air-quality-view-title": "Luftqualität",
    "asthma-air-quality-view-home-aqi-chart-title": "Luftqualität (Zuhause)",
    "asthma-air-quality-view-home-aqi-alert-message": "Ihr Zuhause AQI ist ungesund.",
    "asthma-air-quality-view-work-aqi-chart-title": "Luftqualität (Arbeit)",
    "asthma-air-quality-view-work-aqi-alert-message": "Ihr Arbeitsplatz AQI ist ungesund.",
    "asthma-heart-and-lungs-view-title": "Herz & Lungen",
    "asthma-heart-and-lungs-view-dhr-chart-title": "Ruhe-Herzfrequenz (Tag)",
    "asthma-heart-and-lungs-view-dhr-alert-message": "Ihre Ruhe-Herzfrequenz am Tag liegt über Ihrem normalen Wert.",
    "asthma-heart-and-lungs-view-nhr-chart-title": "Ruhe-Herzfrequenz (Nacht)",
    "asthma-heart-and-lungs-view-nhr-alert-message": "Ihre Ruhe-Herzfrequenz in der Nacht liegt über Ihrem normalen Wert.",
    "asthma-heart-and-lungs-view-rr-chart-title": "Atemfrequenz",
    "asthma-heart-and-lungs-view-rr-alert-message": "Ihre Atemfrequenz liegt über Ihrem normalen Wert.",
    "asthma-heart-and-lungs-view-dbol-chart-title": "Blutsauerstoff (Tag)",
    "asthma-heart-and-lungs-view-dbol-alert-message": "Ihr Blutsauerstoffgehalt am Tag liegt unter Ihrem normalen Wert.",
    "asthma-heart-and-lungs-view-nbol-chart-title": "Blutsauerstoff (Nacht)",
    "asthma-heart-and-lungs-view-nbol-alert-message": "Ihr Blutsauerstoffgehalt in der Nacht liegt unter Ihrem normalen Wert.",
    "asthma-sleep-view-title": "Schlaf",
    "asthma-sleep-view-chart-title": "Schlafstörungen",
    "asthma-sleep-view-alert-message": "Ihre Schlafstörungen liegen über Ihrem normalen Wert.",
    "asthma-log-entry-editor-view-symptom-level-title": "Symptomniveau",
    "asthma-log-entry-editor-view-select-one-subtitle": "Wählen Sie eines aus",
    "asthma-log-entry-editor-view-select-all-subtitle": "Alle auswählen, die zutreffen",
    "asthma-log-entry-editor-view-symptoms-title": "Symptome",
    "asthma-log-entry-editor-view-impacts-title": "Auswirkungen",
    "asthma-log-entry-editor-view-triggers-title": "Auslöser",
    "asthma-air-quality-description-unhealthy": "Ungesund",
    "asthma-air-quality-description-very-unhealthy": "Sehr ungesund",
    "asthma-air-quality-description-hazardous": "Gefährlich",
    "asthma-recommended-article-21-title": "Wie Sie Ihr Asthma unter Kontrolle halten",
    "asthma-recommended-article-21-subtitle": "Bleiben Sie symptomfrei, indem Sie Ihren Behandlungsplan einhalten, Auslöser verstehen und Veränderungen in der Kontrolle frühzeitig erkennen.",
    "asthma-recommended-article-22-title": "Haben Sie Ihr Asthma unter Kontrolle?",
    "asthma-recommended-article-22-subtitle": "4 Fragen, um zu beurteilen, ob Ihr Asthma unter Kontrolle ist. Wenn Sie mehr als zweimal pro Woche Symptome haben oder nachts aufgrund von Asthmasymptomen aufwachen - ist Ihr Asthma nicht unter Kontrolle.",
    "asthma-recommended-article-24-title": "Navigieren durch die Gefahrenzone: Vorbereitung auf Asthmaanfälle",
    "asthma-recommended-article-24-subtitle": "Erkennen Sie schwere Symptome wie intensiven Husten und Atemnot frühzeitig und aktivieren Sie Ihren individuellen Asthma-Aktionsplan, einschließlich sofortiger Medikamente.",
    "asthma-recommended-article-25-title": "Übernehmen Sie die Kontrolle über Ihr Asthma",
    "asthma-recommended-article-25-subtitle": "Wenn Ihr Asthma unbeherrschbar erscheint, ist es an der Zeit, Ihre Vorgehensweise neu zu bewerten. Schritte, die zu ergreifen sind, wenn Ihr Asthma nicht unter Kontrolle ist.",
    "asthma-recommended-article-32-title": "Wer benötigt Controller-Medikamente?",
    "asthma-recommended-article-32-subtitle": "Entdecken Sie die entscheidende Rolle von Controller-Medikamenten bei der Asthmakontrolle.",
    "asthma-recommended-article-33-title": "Zugang zu Medikamenten",
    "asthma-recommended-article-33-subtitle": "Wenn die Kosten eine Barriere darstellen, erfahren Sie mehr über kostenlose oder kostengünstige Medikamente. Die Einnahme der verschriebenen Medikamente ist wichtig, um die Asthmakontrolle aufrechtzuerhalten.",
    "asthma-recommended-article-34-title": "Medikamenten-Nachfüllungen",
    "asthma-recommended-article-34-subtitle": "Behalten Sie Ihre Asthma-Medikamente im Griff mit einfachen Nachfüllstrategien.",
    "asthma-recommended-article-35-title": "Probleme, sich an die Einnahme von Medikamenten zu erinnern",
    "asthma-recommended-article-35-subtitle": "Entdecken Sie einfache und effektive Strategien, um sich an Ihre tägliche Dosis zu erinnern, von intelligenten Aufbewahrungstipps bis hin zur Nutzung von App-Erinnerungen.",
    "asthma-recommended-article-36-title": "Welchen Inhalator wann verwenden",
    "asthma-recommended-article-36-subtitle": "Meistern Sie Ihr Asthmamanagement: Der Rettungsinhalator wirkt schnell, um Symptome zu lindern, während ein Controller präventiv wirkt und Entzündungen reduziert, indem er in der Regel täglich eingenommen wird.",
    "asthma-recommended-article-37a-title": "Inhalationstechnik - Dosieraerosol",
    "asthma-recommended-article-37a-subtitle": "Tipps zur Technik des Dosieraerosols (MDI). Ohne die richtige Technik erhalten Sie möglicherweise nur einen Teil der Dosis.",
    "asthma-recommended-article-37b-title": "Inhalationstechnik - Pulverinhalator",
    "asthma-recommended-article-37b-subtitle": "Tipps zur Technik des Trockenpulverinhalators (DPI). Ohne die richtige Technik erhalten Sie möglicherweise nur einen Teil der Dosis.",
    "asthma-recommended-article-37c-title": "Inhalationstechnik - Soft Mist Inhalator",
    "asthma-recommended-article-37c-subtitle": "Tipps zur Technik des Soft Mist Inhalators (SMI). Ohne die richtige Technik erhalten Sie möglicherweise nur einen Teil der Dosis.",
    "asthma-recommended-article-37d-title": "Inhalationstechnik - Vernebler",
    "asthma-recommended-article-37d-subtitle": "Tipps zur Technik des Verneblers.",
    "asthma-recommended-article-38-title": "Warum sollte ich meinen Controller einnehmen?",
    "asthma-recommended-article-38-subtitle": "Verstehen Sie die entscheidende Rolle von Controller-Medikamenten und warum sie ein Eckpfeiler Ihres individuellen Managementplans sind.",
    "asthma-recommended-article-39-title": "Nebenwirkungen von Asthma-Medikamenten",
    "asthma-recommended-article-39-subtitle": "Erfahren Sie, wie Sie häufige und seltene Nebenwirkungen erkennen und welche einfachen Schritte Sie unternehmen können, um die häufigste Nebenwirkung - Soor (Pilzinfektion im Mund) - zu vermeiden.",
    "asthma-recommended-article-39a-title": "Wie weiß ich, ob meine Asthma-Medikamente wirken?",
    "asthma-recommended-article-39a-subtitle": "Controller-Medikamente können Tage bis Wochen brauchen, um ihre volle Wirkung zu entfalten. Verfolgen Sie Ihre Symptome täglich, um festzustellen, ob es eine Verbesserung gibt, und wenn nicht, sprechen Sie mit Ihrem Arzt.",
    "asthma-recommended-article-41-title": "Überraschende Auslöser",
    "asthma-recommended-article-41-subtitle": "Entdecken Sie unerwartete Asthma-Auslöser in Ihrem täglichen Leben, von NSAIDs (wie Ibuprofen) bis hin zu Ihrem Glas Wein. Zu wissen, wonach man suchen muss, kann Ihnen helfen, diese überraschenden Auslöser zu erkennen.",
    "asthma-recommended-article-42-title": "Asthma und saisonale Allergene/Pollen",
    "asthma-recommended-article-42-subtitle": "Navigieren Sie durch die Pollensaison: Identifizieren Sie Ihre spezifischen Pollen-Auslöser, verstehen Sie deren saisonale Muster und lernen Sie, wie Sie die Exposition minimieren können.",
    "asthma-recommended-article-43-title": "Asthma und Luftqualität",
    "asthma-recommended-article-43-subtitle": "Verstehen Sie, dass schlechte Luftqualität Asthma auslösen kann. Lernen Sie, wie Sie sich an Tagen mit hohem AQI zurechtfinden und was AQI-Werte bedeuten.",
    "asthma-recommended-article-43a-title": "Asthma und Atemwegsinfektionen",
    "asthma-recommended-article-43a-subtitle": "Atemwegsinfektionen sind häufige Asthma-Auslöser. Erfahren Sie, wie Sie sie verhindern und was zu tun ist, wenn sie auftreten.",
    "asthma-recommended-article-43b-title": "Asthma und Tiere",
    "asthma-recommended-article-43b-subtitle": "Tiere/Haustiere können ein Auslöser für Asthma sein. Erfahren Sie, wie Sie eine Tierallergie diagnostizieren und wie Sie die Auswirkungen verringern können.",
    "asthma-recommended-article-43c-title": "Asthma und Rauch",
    "asthma-recommended-article-43c-subtitle": "Waldbrände und Tabakrauch können Asthma auslösen. Erfahren Sie, welche Schritte Sie unternehmen können, um Ihre Exposition zu verringern.",
    "asthma-recommended-article-43d-title": "Asthma und Wetter",
    "asthma-recommended-article-43d-subtitle": "Häufige Wetterauslöser sind kalte Luft, heiße und feuchte Luft sowie Regen/Gewitter. Erfahren Sie, warum diese Asthma auslösen können.",
    "asthma-recommended-article-43e-title": "Starke Gerüche und Chemikalien/Reinigungsmittel",
    "asthma-recommended-article-43e-subtitle": "Entdecken Sie, welche Gerüche Ihr Asthma auslösen können und worauf Sie beim Reinigen achten sollten.",
    "asthma-recommended-article-43f-title": "Asthma und Staub/Staubmilben",
    "asthma-recommended-article-43f-subtitle": "Staub ist ein häufiger Asthma-Auslöser, aber der Grund dafür könnte Sie überraschen!",
    "asthma-recommended-article-43g-title": "Asthma und Schimmel",
    "asthma-recommended-article-43g-subtitle": "Schimmel braucht Feuchtigkeit zum Wachsen, daher findet man ihn typischerweise an feuchten oder nassen Stellen. Erfahren Sie, wie Sie Schimmel in Ihrem Haus verhindern können.",
    "asthma-recommended-article-43h-title": "Asthma und Sodbrennen",
    "asthma-recommended-article-43h-subtitle": "Was ist Sodbrennen und was hat es mit Asthma zu tun?",
    "blood-type": "Blutgruppe",
    "device-data-month-chart-no-data": "Keine Daten",
    "device-data-month-chart-daily-average": "Tagesdurchschnitt",
    "term-information-not-found-header": "Keine Informationen gefunden",
    "term-information-not-found-body": "Keine Informationen zu diesem Thema gefunden",
    "term-information-disclaimer": "<strong>HAFTUNGSAUSSCHLUSS:</strong> Die bereitgestellten Informationen sind keine medizinische Beratung. Sie sollen Ihnen helfen, Ihre Gesundheit besser zu verstehen. Bitte kontaktieren Sie Ihren Gesundheitsdienstleister, wenn Sie Fragen zu Ihrem Gesundheitszustand haben.",
    "term-information-view-on-medline": "Auf MedlinePlus ansehen",
    "type": "Typ",
    "location": "Ort",
    "description": "Beschreibung",
    "performed-by": "Durchgeführt von",
    "verified-by": "Überprüft von",
    "normal-range": "Normaler Bereich",
    "more": "Mehr",
    "procedure": "Verfahren",
    "procedures": "Verfahren",
    "lab-report": "Laborbericht",
    "service-performed": "Durchgeführte Leistung",
    "services-performed": "Durchgeführte Leistungen",
    "device-data-month-chart-minutes": "Minuten",
    "device-data-month-chart-sleep": "Schlaf",
    "air-quality-home": "Luftqualität (Zuhause)",
    "air-quality-work": "Luftqualität (Arbeit)",
    "sedentary-time": "Sitzzeit",
    "active-time": "Aktive Zeit",
    "lightly-active-time": "Leicht aktive Zeit",
    "fairly-active-time": "Mäßig aktive Zeit",
    "very-active-time": "Sehr aktive Zeit",
    "breathing-rate": "Atemfrequenz",
    "calories-burned": "Kalorien verbrannt",
    "elevated-heart-rate-time": "Zeit mit erhöhter Herzfrequenz",
    "fat-burn-heart-rate-time": "Fettverbrennungszeit",
    "cardio-heart-rate-time": "Kardio-Zeit",
    "peak-heart-rate-time": "Höchstzeit der Herzfrequenz",
    "floors-climbed": "Etagen bestiegen",
    "heart-rate-variability": "Herzfrequenzvariabilität",
    "sleep-time": "Schlafzeit",
    "light-sleep-time": "Leichte Schlafzeit",
    "deep-sleep-time": "Tiefe Schlafzeit",
    "rem-sleep-time": "REM-Schlafzeit",
    "spo2": "SpO2",
    "heart-rate-range": "Herzfrequenzbereich",
    "max-heart-rate": "Maximale Herzfrequenz",
    "core-sleep-time": "Kernschlafzeit",
    "in-bed-time": "Im Bett Zeit",
    "stand-time": "Stehzeit",
    "walking-heart-rate-average": "Durchschnittliche Herzfrequenz beim Gehen",
    "active-energy-burned": "Verbrannte aktive Energie",
    "number-of-alcoholic-beverages": "Anzahl alkoholischer Getränke",
    "active-calories": "Aktive Kalorien",
    "resting-calories": "Ruhende Kalorien",
    "total-calories": "Gesamtkalorien",
    "min-heart-rate": "Minimale Herzfrequenz",
    "average-heart-rate": "Durchschnittliche Herzfrequenz",
    "max-stress-level": "Maximale Stressstufe",
    "average-stress-level": "Durchschnittliche Stressstufe",
    "total-stress-time": "Gesamtstresszeit",
    "low-stress-time": "Niedrige Stresszeit",
    "medium-stress-time": "Mittlere Stresszeit",
    "high-stress-time": "Hohe Stresszeit",
    "awake-time": "Wachzeit",
    "sleep-score": "Schlafscore",
    "bpm": "bpm",
    "hours-abbreviation": " Std.",
    "minutes-abbreviation": " Min.",
    "points-until-next-badge": "{{points}} Punkte bis zum nächsten Abzeichen",
    "fitbit-wear-time": "Fitbit-Tragezeit",
    "my-badges": "Meine Abzeichen ({{badges}})",
    "new-badge-title": "Gute Arbeit!",
    "new-badge-text": "Du hast ein neues Abzeichen bekommen!",
    "get-badge": "Abzeichen erhalten",
    "glucose-chart-no-data": "Keine Blutzuckermesswerte",
    "glucose-stats-range-label": "Blutzuckerspiegel",
    "glucose-stats-avg-label": "Durchschnittlicher Blutzucker",
    "glucose-stats-steps-label": "Schritte",
    "glucose-stats-sleep-label": "Schlaf",
    "stress-level-title": "Gesamtstress",
    "stress-level-min-label": "Kein Stress",
    "stress-level-max-label": "Extrem gestresst",
    "meal-type-meal": "Mahlzeit",
    "meal-type-snack": "Snack",
    "meal-type-drink": "Getränk",
    "meal-log-title": "Mahlzeitenprotokoll",
    "meal-log-no-data": "Keine Mahlzeiten protokolliert",
    "meal-editor-time-input-label": "Zeit",
    "meal-editor-description-input-label": "Beschreibung",
    "meal-editor-description-optional": "Optional",
    "meal-editor-duplicate-timestamp-error": "Zwei Mahlzeiten können nicht die gleiche Uhrzeit haben.",
    "meal-editor-add-image": "Bild hinzufügen",
    "meal-editor-image-upload-error": "Ein Fehler ist beim Hochladen des ausgewählten Bildes aufgetreten. Bitte versuchen Sie es erneut, verwenden Sie ein anderes Bild oder entfernen Sie das Bild, um zu speichern.",
    "glucose-view-title": "Blutzuckerüberwachung",
    "ai-assistant-loading": "Interaktion mit Ihren Daten...",
    "ai-assistant-suggestion-avg-weekly-heart-rate": "Wie ist meine durchschnittliche Herzfrequenz der letzten Woche?",
    "ai-assistant-suggestion-highest-heart-rate-week": "Was war meine höchste Herzfrequenz diese Woche?",
    "ai-assistant-suggestion-graph-daily-steps-21-days": "Erstelle ein Diagramm meiner täglichen Schritte der letzten 21 Tage",
    "ai-assistant-suggestion-weekly-workouts-average-month": "Wie viele Workouts pro Woche habe ich diesen Monat im Durchschnitt gemacht?",
    "ai-assistant-suggestion-avg-monthly-blood-pressure": "Wie ist mein durchschnittlicher Blutdruck des letzten Monats?",
    "ai-assistant-suggestion-daily-active-minutes-month": "Was ist mein täglicher Durchschnitt an aktiven Minuten diesen Monat?",
    "ai-assistant-suggestion-resting-heart-rate-change-month": "Wie hat sich meine Ruheherzfrequenz im letzten Monat verändert?",
    "ai-assistant-suggestion-stand-ups-yesterday": "Wie oft bin ich gestern aufgestanden?",
    "ai-assistant-suggestion-graph-heart-rate-trends-workouts": "Könntest du meine Herzfrequenztrends während der Workouts dieser Woche grafisch darstellen?",
    "ai-assistant-suggestion-sleep-7-days": "Wie war mein Schlaf in den letzten 7 Tagen?",
    "ai-assistant-suggestion-fall-asleep-time-2-weeks": "Zu welcher Zeit bin ich in den letzten 2 Wochen normalerweise eingeschlafen?",
    "ai-assistant-suggestion-sleep-quality-change-month": "Wie hat sich meine Schlafqualität im letzten Monat verändert?",
    "ai-assistant-suggestion-last-tetanus-vaccine": "Wann war meine letzte Tetanusimpfung?",
    "ai-assistant-suggestion-last-blood-test-lab-work": "Wann war mein letzter Bluttest oder Labortest?",
    "ai-assistant-suggestion-abnormal-lab-results": "Habe ich irgendwelche abnormalen Laborergebnisse?",
    "ai-assistant-suggestion-last-cbc-test": "Wann war mein letztes großes Blutbild (CBC)?",
    "ai-assistant-suggestion-glucose-a1c-levels-last-test": "Wie waren meine Glukose- und A1c-Werte in meinem letzten Test?",
    "ai-assistant-suggestion-graph-cholesterol-trends": "Könntest du mir ein Diagramm zeigen, wie sich meine Cholesterinwerte über die Zeit verändert haben?",
    "ai-assistant-suggestion-last-metabolic-panel": "Wann war mein letztes metabolisches Panel?",
    "ai-assistant-suggestion-hemoglobin-levels-trend": "Wie ist der Trend meiner Hämoglobinwerte?",
    "ai-assistant-suggestion-show-files": "Zeige mir meine Dateien.",
    "ai-assistant-suggestion-save-graph-to-files": "Speichere das Diagramm in meinen Dateien",
    "mindful-minutes": "Achtsame Minuten",
    "therapy-minutes": "Therapieminuten",
    "insight-matrix-no-comparison-data": "Keine Vergleichsdaten-Typen konfiguriert.",
    "allergylist-reactions": "Reaktionen",
    "points-abbreviation": "Pkt",
    "no-data": "Keine Daten",
    "no-data-yet": "Noch keine Daten",
    "bp-low": "Niedrig",
    "bp-normal": "Normal",
    "bp-elevated": "Erhöht",
    "bp-stage1": "Stufe 1",
    "bp-stage2": "Stufe 2",
    "bp-crisis": "Krise",
    "bp-unknown": "Unbekannt",
    "device-not-enabled": "@@DEVICE@@ ist für dieses Projekt nicht aktiviert.",
    "download-pdf-report": "PDF-Bericht herunterladen",
    "connect-to-device": "Mit @@DEVICE@@ verbinden",
    "symptoms-and-treatments": "Symptome & Behandlungen",
    "subsequent-evaluation-note": "Nachfolgende Bewertungsnotiz",
    "summary": "Zusammenfassung",
    "device-activity": "Geräteaktivität",
    "daily": "Täglich",
    "weekly": "Wöchentlich",
    "monthly": "Monatlich",
    "syncing-data": "Daten werden synchronisiert...",
    "health-connect-phr-sync-title": "Mit Health Connect synchronisieren",
    "health-connect-phr-sync-prompt": "Wähle Gesundheitsdaten zum Lesen und Schreiben in Health Connect aus"
};

export default strings;