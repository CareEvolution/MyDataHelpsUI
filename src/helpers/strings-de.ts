let strings: { [key: string]: string } = {
    "back": "Zurück",
    "done": "Fertig",
    "close": "Schließen",
    "save": "Speichern",
    "add": "Hinzufügen",
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
    "connect-ehr-text": "Ihre elektronischen Gesundheitsdaten sind eine wichtige Informationsquelle. Sie könnten Forschern helfen, neue Entdeckungen zu machen. Verbinden Sie Ihren Anbieter oder Ihre Krankenversicherung (z. B. Medicare) mit @@PROJECT_NAME@@.",
    "connect-ehr-text-connected": "Vielen Dank, dass Sie Ihre EHR-Daten mit @@PROJECT_NAME@@ geteilt haben. Verbinden Sie einen weiteren Anbieter, um mehr Daten zu teilen, oder verwalten Sie Ihre EHR-Verbindungen.",
    "connect-ehr-not-enabled": "Die Verknüpfung von EHR ist für dieses Projekt nicht aktiviert.",
    "search-for-provider": "Suche nach Anbieter oder Krankenversicherung",
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
    "downloading-data": "Daten werden heruntergeladen...",
    "downloading-data-menu": "Daten werden heruntergeladen",
    "all-tasks-complete": "Alle Aufgaben abgeschlossen!",
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
    "ehr-intro": "Ihre elektronischen Gesundheitsdaten (EHR) sind eine wichtige Informationsquelle. Wenn Sie uns dabei helfen, Ihre EHR zu sammeln, werden Forscher diese Daten nutzen, um Entdeckungen zu machen.",
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
    "asthma-control-status-header-not-determined": "Weitere tägliche Einträge erforderlich, um Ihre Asthmakontrolle zu bewerten.",
    "asthma-control-status-header-controlled-p1": "Basierend auf Ihren Einträgen ist Ihr Asthma ",
    "asthma-control-status-header-controlled-p2": "unter Kontrolle.",
    "asthma-control-status-header-not-controlled-p1": "Basierend auf Ihren Einträgen ist Ihr Asthma ",
    "asthma-control-status-header-not-controlled-p2": "nicht unter Kontrolle.",
    "asthma-control-status-header-not-controlled-stat-symptom-days": "Symptomtage",
    "asthma-control-status-header-not-controlled-stat-rescue-inhaler": "Rettungsinhalator",
    "asthma-control-status-header-not-controlled-stat-limited-activity": "Eingeschränkte Aktivität",
    "asthma-control-status-header-not-controlled-stat-awakenings": "Erwachen",
    "asthma-action-plan-manager-title": "Asthma-Aktionsplan",
    "asthma-action-plan-manager-instructions": "Speichern Sie ein Foto Ihres Asthma-Aktionsplans für einfache Referenz.",
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
    "blood-type": "Blutgruppe",
    "device-data-month-chart-no-data": "Keine Daten",
    "device-data-month-chart-daily-average": "Tagesdurchschnitt",
    "device-data-month-chart-minutes": "Minuten",
    "device-data-month-chart-sleep": "Schlaf",
};

export default strings;