﻿let strings: { [key: string]: string } = {
    "back": "Back",
    "done": "Done",
    "close": "Close",
    "save": "Save",
    "add": "Add",
    "settings": "Settings",
    "connect": "Connect",
    "reconnect": "Reconnect",
    "refresh": "Refresh",
    "remove": "Remove",
    "help": "Help",
    "view": "View",
    "health-records": "Health Records",
    "connect-ehr-title-prefix": "Connect ",
    "connect-ehr-title-divider": " or ",
    "connect-ehr-title-providers": "Provider",
    "connect-ehr-title-health-plans": "Health Plan",
    "connect-ehr-connected": "We are receiving your EHR data!",
    "connect-ehr-needs-attention": "One of your accounts requires attention.",
    "connect-ehr-text": "Your electronic health records are an important source of information. They could help researchers make new discoveries. Connect your provider or health plan (ex: Medicare) with @@PROJECT_NAME@@.",
    "connect-ehr-text-connected": "Thank you for sharing your EHR data with @@PROJECT_NAME@@. Connect another provider to share more data or manage your EHR connections.",
    "connect-ehr-not-enabled": "EHR linking is not enabled for this project.",
    "search-for-provider": "Search for Provider or Health Plan",
    "expired-reconnect": "Connection expired.  Please reconnect.",
    "connected": "Connected",
    "search": "Search",
    "connect-fitbit-intro": "You can share data from your Fitbit account if you have one.  To begin, click or tap below to log in with your Fitbit credentials.",
    "connect-fitbit-button": "Connect Fitbit",
    "received-fitbit-data": "We are receiving your Fitbit data!",
    "connect-garmin-intro": "You can share data from your Garmin account if you have one.  To begin, click or tap below to log in with your Garmin credentials.",
    "connect-garmin-button": "Connect Garmin",
    "received-garmin-data": "We are receiving your Garmin data!",
    "downloading-data": "Downloading data...",
    "downloading-data-menu": "Downloading Data",
    "all-tasks-complete": "All Tasks Complete!",
    "view-all": "View All",
    "tasks": "Tasks",
    "incomplete-tasks": "Incomplete Tasks",
    "completed-tasks": "Completed Tasks",
    "overdue": "Overdue",
    "due-today": "Due Today",
    "due-tomorrow": "Due Tomorrow",
    "due": "Due",
    "due-in": "Due in",
    "days": "days",
    "notifications": "Notifications",
    "support": "Support",
    "all-notifications": "All Notifications",
    "steps": "Steps",
    "resting-heart-rate": "Resting Heart Rate",
    "distance-traveled": "Distance Traveled",
    "google-fit-share": "Tap to share fitness data",
    "devices": "Devices",
    "last-sync": "Last synced",
    "completed": "Completed",
    "ehr-intro": "Your electronic health records (EHR) are an important source of information. If you help us gather your EHR, researchers will use this data to make discoveries.",
    "external-accounts-title-divider": " / ",
    "external-accounts-title-providers": "Providers",
    "external-accounts-title-health-plans": "Health Plans",
    "external-accounts-title-devices": "Devices",
    "external-accounts-error": "One of your accounts requires attention",
    "external-accounts-loading": "Your data is currently being downloaded from your linked health plans and providers.  Please check back in a few moments to view your data.",
    "external-account-authorization-expired": "Authorization expired",
    "external-account-fetching-data": "Retrieving data...",
    "external-account-deleting": "Removing...",
    "external-account-last-updated": "Last updated",
    "external-account-error": "Unexpected error",
    "external-account-reconnect": "Reconnect",
    "external-account-refresh": "Refresh",
    "external-account-remove": "Remove",
    "device-data-no-data": "If you have connected Apple Health, Google Fit, Fitbit, or Garmin, check back later to view your data.",
    "no-notifications-received": "No notifications received",
    "next-button-text": "Next",
    "lab-results-title": "Lab Results",
    "medications-title": "Medications",
    "immunizations-title": "Immunizations",
    "reports-title": "Reports",
    "allergies-title": "Allergies",
    "conditions-title": "Conditions",
    "procedures-title": "Procedures",
    "app-download-title": "Next: Download the App",
    "app-download-subtitle": "Downloading the MyDataHelps app makes it even easier to participate in @@PROJECT_NAME@@.",
    "app-download-google-play-link-alt": "Download on the Google Play Store",
    "app-download-app-store-link-alt": "Download on the Apple App Store",
    "start": "Start",
    "resume": "Resume",
    "start-survey": "Start Survey",
    "resume-survey": "Resume Survey",
    "30-day-average": "30 Day Average",
    "today": "Today",
    "yesterday": "Yesterday",
    "tap-to-log-today": "Tap here to log your symptoms or treatments!",
    "mild": "Mild",
    "moderate": "Moderate",
    "severe": "Severe",
    "severe-shortened": "sev",
    "moderate-shortened": "mod",
    "mild-shortened": "mild",
    "log-todays-symptoms": "Log Today's Symptoms",
    "todays-log": "Today's Log",
    "symptoms": "Symptoms",
    "treatments": "Treatments",
    "symptoms-experiencing-today": "What symptoms are you experiencing?",
    "symptoms-experiencing-previous": "What symptoms were you experiencing?",
    "treatments-experiencing-today": "What treatments have you performed?",
    "treatments-experiencing-previous": "What treatments did you perform?",
    "feeling-overall-today": "How are you feeling overall?",
    "feeling-overall-previous": "How were you feeling overall?",
    "additional-notes": "Any additional notes?",
    "how-severe-is": "How severe is your",
    "how-severe-was": "How severe was your",
    "clear-symptom": "Clear Symptom",
    "add-notes": "Add notes",
    "notes": "Notes",
    "enter-symptom-name": "Enter Symptom Name",
    "enter-treatment-name": "Enter Treatment Name",
    "severity-tracking-none": "Don't Track Severity",
    "severity-tracking-3point": "Mild / Moderate / Severe Rating",
    "severity-tracking-10point": "1 - 10 Point Rating",
    "muted": "Muted",
    "not-muted": "Not Muted",
    "delete": "Delete",
    "severity": "Severity",
    "item-delete-warning": "Warning: Continuing will permanently delete the below items and all the associated data from your logs.  If you would not like to delete these items, select \"Cancel\".",
    "unsaved-changes": "Unsaved Changes",
    "daily-overall-experience": "Daily Overall Experience",
    "average": "Average",
    "include-symptoms": "Include Symptoms",
    "select-symptoms": "Select Symptoms",
    "include-treatments": "Include Treatments",
    "select-treatments": "Select Treatments",
    "download-mydatahelps": "Download MyDataHelps",
    "connect-devices-title": "Connect Devices",
    "connect-devices-text": "Share data from your wearables, apps, and other devices.",
    "apple-health-troubleshooting-intro": "If you did not approve or have disabled sharing of your Apple Health data and would like to enable it, follow these steps:",
    "apple-health-troubleshooting-li-1": "Open the \"Settings\" app",
    "apple-health-troubleshooting-li-2": "Select \"Privacy\"",
    "apple-health-troubleshooting-li-3": "Select \"Health\"",
    "apple-health-troubleshooting-li-4": "Select \"MyDataHelps\"",
    "apple-health-troubleshooting-li-5": "Enable the categories of data you would like to share",
    "how-to-enable": "How to enable",
    "new-points-title": "Well Done!",
    "new-points-text": "You've been awarded points for the following:",
    "new-points-next-reward-prefix": "You now need ",
    "new-points-next-reward-suffix": " points to unlock your next reward.",
    "new-points-done-button-text": "Done",
    "systolic-average": "Systolic Average",
    "diastolic-average": "Diastolic Average",
    "highest-systolic": "Highest Systolic",
    "lowest-diastolic": "Lowest Diastolic",
    "resource-default-button-text": "Open",
    "inbox-message-completed-status": "VIEWED",
    "inbox-resource-completed-status": "VIEWED",
    "inbox-survey-completed-status": "COMPLETED",
    "inbox-history-view-title": "Inbox History",
    "inbox-history-view-empty-text": "You have no items in your inbox history.",
    "inbox-message-view-related-resources-title": "Related",
    "inbox-view-title": "Inbox",
    "inbox-view-empty-text": "You have no new items in your inbox.",
    "inbox-view-messages-title": "Messages",
    "inbox-view-surveys-title": "Surveys",
    "inbox-view-resources-title": "Resources",
    "inbox-view-recently-completed-title": "Recent",
    "inbox-view-recently-completed-empty-text": "You have no recently completed items in your inbox.",
    "inbox-view-history-button-text": "View inbox history",
    "asthma-symptom-level-none": "No symptoms",
    "asthma-symptom-level-mild": "Mild symptoms",
    "asthma-symptom-level-moderate": "Moderate symptoms",
    "asthma-symptom-level-severe": "Severe symptoms",
    "asthma-symptom-difficulty-breathing": "Difficulty breathing",
    "asthma-symptom-wheezing": "Wheezing",
    "asthma-symptom-coughing": "Coughing",
    "asthma-symptom-chest-tightness": "Chest tightness or pressure",
    "asthma-impact-limit-daily-activity": "Limit your daily activity",
    "asthma-impact-waking-at-night": "Wake up at night",
    "asthma-impact-using-rescue-inhaler": "Use your rescue inhaler",
    "asthma-trigger-cold-illness": "Cold/viral illness",
    "asthma-trigger-animal-exposure": "Animal exposure",
    "asthma-trigger-seasonal-allergens": "Seasonal allergens/pollen",
    "asthma-trigger-smoke": "Smoke",
    "asthma-trigger-weather-changes": "Extreme weather changes",
    "asthma-trigger-air-pollution": "Air pollution",
    "asthma-trigger-strong-smells": "Strong smells",
    "asthma-trigger-chemicals": "Chemicals/cleaning supplies",
    "asthma-trigger-dust": "Dust",
    "asthma-trigger-mold": "Mold",
    "asthma-trigger-dust-mites": "Dust mites",
    "asthma-trigger-rodents": "Rodents",
    "asthma-trigger-cockroaches": "Cockroaches",
    "asthma-trigger-nsaid": "NSAID/Aspirin",
    "asthma-trigger-beta-blocker": "Beta blocker",
    "asthma-trigger-heartburn": "Heartburn",
    "asthma-trigger-red-wine": "Red wine",
    "asthma-trigger-new-foods": "New foods",
    "asthma-trigger-cooked-without-ventilation": "Cooking (no ventilation)",
    "asthma-trigger-pet-in-bed": "Pet in your bed",
    "asthma-trigger-incense-or-candle": "Candle/incense",
    "asthma-data-status-out-of-range": "Out of range",
    "asthma-data-status-in-range": "In range",
    "asthma-data-status-offline": "Offline",
    "asthma-data-status-establishing": "Establishing",
    "asthma-data-status-not-determined": "Baseline not established",
    "asthma-data-status-not-found": "No data recorded",
    "asthma-data-status-not-configured": "Not configured",
    "asthma-control-calendar-daily-entry-missed": "Daily entry missed",
    "asthma-control-calendar-not-logged-yet": "Not logged yet",
    "asthma-control-calendar-log-entries-symptoms-label": "Symptoms",
    "asthma-control-calendar-log-entries-impacts-label": "Impacts",
    "asthma-control-calendar-log-entries-triggers-label": "Triggers",
    "asthma-control-status-header-multiple-out-of-range-p1": "Multiple data points are ",
    "asthma-control-status-header-multiple-out-of-range-p2": "outside your normal levels",
    "asthma-control-status-header-multiple-out-of-range-p3": ". Complete your daily entry.",
    "asthma-control-status-header-abnormal-heart-rate-p1": "Your resting heart rate is ",
    "asthma-control-status-header-abnormal-heart-rate-p2": "above your normal level",
    "asthma-control-status-header-abnormal-heart-rate-p3": ". Complete your daily entry.",
    "asthma-control-status-header-abnormal-respiratory-rate-p1": "Your respiratory rate is ",
    "asthma-control-status-header-abnormal-respiratory-rate-p2": "above your normal level",
    "asthma-control-status-header-abnormal-respiratory-rate-p3": ". Complete your daily entry.",
    "asthma-control-status-header-abnormal-steps-p1": "Your activity is ",
    "asthma-control-status-header-abnormal-steps-p2": "below your normal levels",
    "asthma-control-status-header-abnormal-steps-p3": ". Complete your daily entry.",
    "asthma-control-status-header-abnormal-sleep-p1": "Your sleep disturbances are ",
    "asthma-control-status-header-abnormal-sleep-p2": "above your normal level",
    "asthma-control-status-header-abnormal-sleep-p3": ". Complete your daily entry.",
    "asthma-control-status-header-abnormal-blood-oxygen-p1": "Your blood oxygen level is ",
    "asthma-control-status-header-abnormal-blood-oxygen-p2": "below your normal level",
    "asthma-control-status-header-abnormal-blood-oxygen-p3": ". Complete your daily entry.",
    "asthma-control-status-header-abnormal-home-aqi-p1": "Your home Air Quality Index is ",
    "asthma-control-status-header-abnormal-home-aqi-p2": ". Complete your daily entry.",
    "asthma-control-status-header-abnormal-work-aqi-p1": "Your work Air Quality Index is ",
    "asthma-control-status-header-abnormal-work-aqi-p2": ". Complete your daily entry.",
    "asthma-control-status-header-no-data": "Add a daily entry to assess your asthma control.",
    "asthma-control-status-header-not-determined": "More daily entries needed to assess your asthma control.",
    "asthma-control-status-header-controlled-p1": "Based on your entries, your asthma is ",
    "asthma-control-status-header-controlled-p2": "under control.",
    "asthma-control-status-header-not-controlled-p1": "Based on your entries, your asthma is ",
    "asthma-control-status-header-not-controlled-p2": "not under control.",
    "asthma-control-status-header-not-controlled-stat-symptom-days": "Symptom days",
    "asthma-control-status-header-not-controlled-stat-rescue-inhaler": "Rescue inhaler",
    "asthma-control-status-header-not-controlled-stat-limited-activity": "Limited activity",
    "asthma-control-status-header-not-controlled-stat-awakenings": "Awakenings",
    "asthma-action-plan-manager-title": "Asthma Action Plan",
    "asthma-action-plan-manager-instructions": "Save a photo of your asthma action plan for easy reference.",
    "asthma-action-plan-manager-learn-more": "What's an asthma action plan?",
    "asthma-action-plan-manager-edit-button-text": "Edit",
    "asthma-action-plan-manager-not-found-text": "Tap to add photo",
    "asthma-biometrics-title": "Health & Activity",
    "asthma-biometrics-daytime-resting-heart-rate-label": "Resting HR (Day)",
    "asthma-biometrics-nighttime-resting-heart-rate-label": "Resting HR (Night)",
    "asthma-biometrics-beats-per-minute-units": "BPM",
    "asthma-biometrics-respiratory-rate-label": "Respiratory Rate",
    "asthma-biometrics-breaths-per-minute-units": "BPM",
    "asthma-biometrics-steps-label": "Steps",
    "asthma-biometrics-daytime-blood-oxygen-level-label": "Oxygen Saturation (Day)",
    "asthma-biometrics-nighttime-blood-oxygen-level-label": "Oxygen Saturation (Night)",
    "asthma-biometrics-percent-units": "%",
    "asthma-biometrics-sleep-disturbances-label": "Sleep Disturbances",
    "asthma-air-qualities-title": "Air Quality",
    "asthma-air-qualities-setup-button-text": "+ Setup",
    "asthma-air-qualities-home-aqi-label": "AQI (Home)",
    "asthma-air-qualities-work-aqi-label": "AQI (Work)",
    "asthma-alert-takeover-notice-instructions": "Take a moment to record any asthma symptoms in a daily entry.",
    "asthma-alert-takeover-notice-add-entry-button-text": "+ Daily Entry",
    "asthma-alert-takeover-notice-not-now-button-text": "Not Now",
    "asthma-library-articles-empty-text": "No articles found.",
    "asthma-log-entry-details-not-editable": "Daily entry missed",
    "asthma-log-entry-details-not-logged-yet": "Not logged yet",
    "asthma-log-entry-details-edit-button-text": "Edit",
    "asthma-log-entry-details-add-button-text": "Log Entry",
    "asthma-log-entry-details-symptoms-label": "Symptoms",
    "asthma-log-entry-details-impacts-label": "Impacts",
    "asthma-log-entry-details-triggers-label": "Triggers",
    "asthma-log-entry-details-component-no-data-p1": "No ",
    "asthma-log-entry-details-component-no-data-p2": " logged",
    "asthma-log-entry-header-today-log-label": "Today",
    "asthma-log-entry-header-yesterday-log-label": "Yesterday",
    "asthma-log-entry-header-not-logged-yet": "Not logged yet",
    "asthma-log-entry-header-add-button-text": "Log Entry",
    "asthma-activity-view-title": "Activity",
    "asthma-activity-view-chart-title": "Steps",
    "asthma-activity-view-alert-message": "Your activity is below your normal level.",
    "asthma-alert-takeover-message": "Multiple data points are outside your normal levels.",
    "asthma-air-quality-view-title": "Air Quality",
    "asthma-air-quality-view-home-aqi-chart-title": "Air Quality (Home)",
    "asthma-air-quality-view-home-aqi-alert-message": "Your home AQI is unhealthy.",
    "asthma-air-quality-view-work-aqi-chart-title": "Air Quality (Work)",
    "asthma-air-quality-view-work-aqi-alert-message": "Your work AQI is unhealthy.",
    "asthma-heart-and-lungs-view-title": "Heart & Lungs",
    "asthma-heart-and-lungs-view-dhr-chart-title": "Resting Heart Rate (Day)",
    "asthma-heart-and-lungs-view-dhr-alert-message": "Your daytime resting heart rate is above your normal level.",
    "asthma-heart-and-lungs-view-nhr-chart-title": "Resting Heart Rate (Night)",
    "asthma-heart-and-lungs-view-nhr-alert-message": "Your nighttime resting heart rate is above your normal level.",
    "asthma-heart-and-lungs-view-rr-chart-title": "Respiratory Rate",
    "asthma-heart-and-lungs-view-rr-alert-message": "Your respiratory rate is above your normal level.",
    "asthma-heart-and-lungs-view-dbol-chart-title": "Blood Oxygen (Day)",
    "asthma-heart-and-lungs-view-dbol-alert-message": "Your daytime blood oxygen is below your normal level.",
    "asthma-heart-and-lungs-view-nbol-chart-title": "Blood Oxygen (Night)",
    "asthma-heart-and-lungs-view-nbol-alert-message": "Your nighttime blood oxygen is below your normal level.",
    "asthma-sleep-view-title": "Sleep",
    "asthma-sleep-view-chart-title": "Sleep Disturbances",
    "asthma-sleep-view-alert-message": "Your sleep disturbances are above your normal level.",
    "asthma-log-entry-editor-view-symptom-level-title": "Symptom level",
    "asthma-log-entry-editor-view-select-one-subtitle": "Select one",
    "asthma-log-entry-editor-view-select-all-subtitle": "Select all that apply",
    "asthma-log-entry-editor-view-symptoms-title": "Symptoms",
    "asthma-log-entry-editor-view-impacts-title": "Impacts",
    "asthma-log-entry-editor-view-triggers-title": "Triggers"
};

export default strings;