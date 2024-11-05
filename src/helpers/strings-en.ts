﻿let strings: { [key: string]: string } = {
    "back": "Back",
    "done": "Done",
    "close": "Close",
    "save": "Save",
    "add": "Add",
    "edit": "Edit",
    "cancel": "Cancel",
    "clear": "clear",
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
    "connect-error-reconnect": "Unexpected error.  Please reconnect.",
    "connected": "Connected",
    "search": "Search",
    "connect-fitbit-intro": "You can share data from your Fitbit account if you have one.  To begin, click or tap below to log in with your Fitbit credentials.",
    "connect-fitbit-button": "Connect Fitbit",
    "received-fitbit-data": "We are receiving your Fitbit data!",
    "connect-garmin-intro": "You can share data from your Garmin account if you have one.  To begin, click or tap below to log in with your Garmin credentials.",
    "connect-garmin-button": "Connect Garmin",
    "received-garmin-data": "We are receiving your Garmin data!",
    "connect-dexcom-intro": "You can share data from your Dexcom account if you have one.  To begin, click or tap below to log in with your Dexcom credentials.",
    "connect-dexcom-button": "Connect Dexcom",
    "received-dexcom-data": "We are receiving your Dexcom data!",
    "downloading-data": "Downloading data...",
    "downloading-data-menu": "Downloading Data",
    "empty-tasks-incomplete": "No open tasks to show currently.",
    "empty-tasks-complete": "Completed tasks will be shown here.",
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
    "lowest-systolic": "Lowest Systolic",
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
    "choose-report-month": "Choose Report Month",
    "include-overall-experience": "Include Daily Overall Experience",
    "include-notes": "Include Notes",
    "create-report": "Create PDF Report",
    "reports": "Reports",
    "recent-daily-data-bar-chart-subtitle": "Past 7 days",
    "recent-daily-data-bar-chart-no-data": "No Data",
    "resource-list-empty-text": "No resources found.",
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
    "asthma-trigger-exercise": "Exercise",
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
    "asthma-control-status-header-no-data-caregiver": "Add a daily entry to assess {name}'s asthma control.",
    "asthma-control-status-header-not-determined": "More daily entries needed to assess your asthma control.",
    "asthma-control-status-header-not-determined-caregiver": "More daily entries needed to assess {name}'s asthma control.",
    "asthma-control-status-header-controlled-p1": "Based on your entries, your asthma is ",
    "asthma-control-status-header-controlled-p1-caregiver": "Based on the entries, {name}'s asthma is ",
    "asthma-control-status-header-controlled-p2": "under control.",
    "asthma-control-status-header-not-controlled-p1": "Based on your entries, your asthma is ",
    "asthma-control-status-header-not-controlled-p1-caregiver": "Based on the entries, {name}'s asthma is ",
    "asthma-control-status-header-not-controlled-p2": "not under control.",
    "asthma-control-status-header-not-controlled-stat-symptom-days": "Symptom days",
    "asthma-control-status-header-not-controlled-stat-rescue-inhaler": "Rescue inhaler",
    "asthma-control-status-header-not-controlled-stat-limited-activity": "Limited activity",
    "asthma-control-status-header-not-controlled-stat-awakenings": "Awakenings",
    "asthma-action-plan-manager-title": "Asthma Action Plan",
    "asthma-action-plan-manager-instructions": "Save a photo of your asthma action plan for easy reference.",
    "asthma-action-plan-manager-instructions-caregiver": "Save a photo of {name}'s asthma action plan for easy reference.",
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
    "asthma-log-entry-editor-view-triggers-title": "Triggers",
    "asthma-air-quality-description-unhealthy": "Unhealthy",
    "asthma-air-quality-description-very-unhealthy": "Very Unhealthy",
    "asthma-air-quality-description-hazardous": "Hazardous",
    "asthma-recommended-article-21-title": "How to keep your asthma under control",
    "asthma-recommended-article-21-subtitle": "Stay symptom-free by adhering to your treatment plan, understanding triggers, and early recognition of changes in control.",
    "asthma-recommended-article-22-title": "Is your asthma under control?",
    "asthma-recommended-article-22-subtitle": "4 questions to assess if your asthma is under control. If you\'re experiencing symptoms more than 2 times a week or if you are waking up at night from asthma symptoms - your asthma is not under control.",
    "asthma-recommended-article-24-title": "Navigating the Danger Zone: Preparedness for Asthma Flare-Ups",
    "asthma-recommended-article-24-subtitle": "Recognize severe symptoms like intense coughing and breathlessness early, and activate your tailored asthma action plan including immediate medications.",
    "asthma-recommended-article-25-title": "Taking charge of your asthma",
    "asthma-recommended-article-25-subtitle": "When your asthma feels unmanageable, it\'s time to reassess your approach. Steps to take when your asthma is not under control.",
    "asthma-recommended-article-32-title": "Who needs a controller medication?",
    "asthma-recommended-article-32-subtitle": "Discover the crucial role of controller medications in maintaining asthma under control.",
    "asthma-recommended-article-33-title": "Medication access",
    "asthma-recommended-article-33-subtitle": "For when cost is a barrier to medications, learn about free or low-cost medications. Taking medications as prescribed is important to maintaining asthma control.",
    "asthma-recommended-article-34-title": "Medication refills",
    "asthma-recommended-article-34-subtitle": "Stay on top of your asthma medication with easy refill strategies.",
    "asthma-recommended-article-35-title": "Trouble remembering medications",
    "asthma-recommended-article-35-subtitle": "Discover simple yet effective strategies to remember your daily doses, from smart storage tips to leveraging app reminders.",
    "asthma-recommended-article-36-title": "Which inhaler to use when",
    "asthma-recommended-article-36-subtitle": "Master your asthma management: Rescue inhaler works quickly to relieve symptoms while a controller is preventative and works by reducing inflammation, typically by being taken daily.",
    "asthma-recommended-article-37a-title": "Inhaler technique - MDI",
    "asthma-recommended-article-37a-subtitle": "Metered dose inhaler (MDI) technique tips. Without the right technique, you may be only getting part of the dose.",
    "asthma-recommended-article-37b-title": "Inhaler technique - DPI",
    "asthma-recommended-article-37b-subtitle": "Dry Powder inhaler (DPI) technique tips. Without the right technique, you may be only getting part of the dose.",
    "asthma-recommended-article-37c-title": "Inhaler technique - SMI",
    "asthma-recommended-article-37c-subtitle": "Soft Mist Inhaler (SMI) technique tips. Without the right technique, you may be only getting part of the dose.",
    "asthma-recommended-article-37d-title": "Inhaler technique - nebulizer",
    "asthma-recommended-article-37d-subtitle": "Nebulizer technique tips.",
    "asthma-recommended-article-38-title": "Why should I take my controller?",
    "asthma-recommended-article-38-subtitle": "Understand the critical role of controller medications and why they\'re a cornerstone of your personalized management plan.",
    "asthma-recommended-article-39-title": "Asthma medication side effects",
    "asthma-recommended-article-39-subtitle": "Learn how to identify common and uncommon side effects, and the simple steps you can take to avoid the common side effect - thrush (fungal infection in your mouth).",
    "asthma-recommended-article-39a-title": "How do I know if my asthma medications are working?",
    "asthma-recommended-article-39a-subtitle": "Controller medications can take days to weeks to reach full impact. Track your symptoms daily to see if there is an improvement and if there isn\'t, talk to your provider.",
    "asthma-recommended-article-41-title": "Surprise triggers",
    "asthma-recommended-article-41-subtitle": "Uncover unexpected asthma triggers lurking in your daily life, from NSAIDs (like ibuprofen) to your glass of wine. Knowing what to look for, may help you identify these surprise triggers.",
    "asthma-recommended-article-42-title": "Asthma and Seasonal Allergens/Pollen",
    "asthma-recommended-article-42-subtitle": "Navigate pollen season with ease: Identify your specific pollen triggers, understand their seasonal patterns, and learn how to minimize exposure.",
    "asthma-recommended-article-43-title": "Asthma and Air Quality",
    "asthma-recommended-article-43-subtitle": "Understand that poor air quality can trigger asthma. Learn how to navigate high AQI days and what AQI levels mean.",
    "asthma-recommended-article-43a-title": "Asthma and Respiratory Infections",
    "asthma-recommended-article-43a-subtitle": "Respiratory infections are common asthma triggers. How to prevent them and what to do when they occur.",
    "asthma-recommended-article-43b-title": "Asthma and Animals",
    "asthma-recommended-article-43b-subtitle": "Animals/Pets can be a trigger for asthma. Learn about how to diagnose an animal/pet allergy and steps to reduce the impact.",
    "asthma-recommended-article-43c-title": "Asthma and Smoke",
    "asthma-recommended-article-43c-subtitle": "Wildfires and tobacco smoke can trigger asthma. Learn about steps you can take to reduce your exposure.",
    "asthma-recommended-article-43d-title": "Asthma and Weather",
    "asthma-recommended-article-43d-subtitle": "Common weather triggers are cold air, hot and humid air, and rain/thunderstorms. Explore why these can trigger asthma.",
    "asthma-recommended-article-43e-title": "Strong Smells and Chemicals/Cleaning Supplies",
    "asthma-recommended-article-43e-subtitle": "Discover what smells may trigger your asthma and things to think about while cleaning.",
    "asthma-recommended-article-43f-title": "Asthma and Dust/Dust Mites",
    "asthma-recommended-article-43f-subtitle": "Dust is a common asthma trigger, but the reason it is a trigger may surprise you!",
    "asthma-recommended-article-43g-title": "Asthma and Mold",
    "asthma-recommended-article-43g-subtitle": "Mold needs moisture to grow, so is typically found in damp or wet places. Learn how to prevent mold in your house.",
    "asthma-recommended-article-43h-title": "Asthma and Heartburn",
    "asthma-recommended-article-43h-subtitle": "What is heartburn and what does it have to do with asthma?",
    "blood-type": "Blood Type",
    "device-data-month-chart-no-data": "No Data",
    "device-data-month-chart-daily-average": "Daily Average",
    "term-information-not-found-header": "No Information Found",
    "term-information-not-found-body": "Unable to find any information on this topic",
    "term-information-disclaimer": "<strong>DISCLAIMER:</strong> The information provided is not medical advice.  It is to help you better understand your health.  Please contact your healthcare provider if you have questions regarding your medical condition.",
    "term-information-view-on-medline": "View on MedlinePlus",
    "type": "Type",
    "location": "Location",
    "description": "Description",
    "performed-by": "Performed By",
    "verified-by": "Verified By",
    "normal-range": "Normal Range",
    "more": "More",
    "procedure": "Procedure",
    "procedures": "Procedures",
    "lab-report": "Lab Report",
    "service-performed": "Service Performed",
    "services-performed": "Services Performed",
    "device-data-month-chart-minutes": "Minutes",
    "device-data-month-chart-sleep": "Sleep",
    "air-quality-home": "Air Quality (Home)",
    "air-quality-work": "Air Quality (Work)",
    "sedentary-time": "Sedentary Time",
    "active-time": "Active Time",
    "lightly-active-time": "Lightly Active Time",
    "fairly-active-time": "Fairly Active Time",
    "very-active-time": "Very Active Time",
    "breathing-rate": "Breathing Rate",
    "calories-burned": "Calories Burned",
    "elevated-heart-rate-time": "Elevated Heart Rate Time",
    "fat-burn-heart-rate-time": "Fat Burn Time",
    "cardio-heart-rate-time": "Cardio Time",
    "peak-heart-rate-time": "Peak Time",
    "floors-climbed": "Floors Climbed",
    "heart-rate-variability": "Heart Rate Variability",
    "sleep-time": "Sleep Time",
    "light-sleep-time": "Light Sleep Time",
    "deep-sleep-time": "Deep Sleep Time",
    "rem-sleep-time": "REM Sleep Time",
    "spo2": "SpO2",
    "heart-rate-range": "Heart Rate Range",
    "max-heart-rate": "Max Heart Rate",
    "core-sleep-time": "Core Sleep Time",
    "in-bed-time": "In Bed Time",
    "stand-time": "Stand Time",
    "walking-heart-rate-average": "Walking HR Average",
    "active-energy-burned": "Active Energy Burned",
    "number-of-alcoholic-beverages": "Number of Alcoholic Beverages",
    "active-calories": "Active Calories",
    "resting-calories": "Resting Calories",
    "total-calories": "Total Calories",
    "min-heart-rate": "Min Heart Rate",
    "average-heart-rate": "Average Heart Rate",
    "max-stress-level": "Max Stress Level",
    "average-stress-level": "Average Stress Level",
    "total-stress-time": "Total Stress Time",
    "low-stress-time": "Low Stress Time",
    "medium-stress-time": "Medium Stress Time",
    "high-stress-time": "High Stress Time",
    "awake-time": "Awake Time",
    "sleep-score": "Sleep Score",
    "bpm": "bpm",
    "hours-abbreviation": "h",
    "minutes-abbreviation": "m",
    "points-until-next-badge": "{{points}} points to next badge",
    "fitbit-wear-time": "Fitbit Wear Time",
    "my-badges": "My Badges ({{badges}})",
    "new-badge-title": "Great job!",
    "new-badge-text": "You got a new badge!",
    "get-badge": "Get Badge",
    "glucose-chart-no-data": "No blood glucose readings",
    "glucose-stats-range-label": "Blood Glucose Range",
    "glucose-stats-avg-label": "Avg Blood Glucose",
    "glucose-stats-steps-label": "Steps",
    "glucose-stats-sleep-label": "Sleep",
    "stress-level-title": "Overall Stress",
    "stress-level-min-label": "No Stress",
    "stress-level-max-label": "Extremely Stressed",
    "meal-type-meal": "Meal",
    "meal-type-snack": "Snack",
    "meal-type-drink": "Drink",
    "meal-log-title": "Meal Log",
    "meal-log-no-data": "No meals logged",
    "meal-editor-time-input-label": "Time",
    "meal-editor-description-input-label": "Description",
    "meal-editor-description-optional": "Optional",
    "meal-editor-duplicate-timestamp-error": "Two meals cannot have the same timestamp.",
    "glucose-view-title": "Glucose Monitoring",
    "ai-assistant-loading": "Interacting with your data...",
    "ai-assistant-suggestion-avg-weekly-heart-rate": "What is my average heart rate for the past week?",
    "ai-assistant-suggestion-highest-heart-rate-week": "What was my highest heart rate this week?",
    "ai-assistant-suggestion-graph-daily-steps-21-days": "Make a graph of my daily steps for the past 21 days",
    "ai-assistant-suggestion-weekly-workouts-average-month": "How many workouts a week did I average this month?",
    "ai-assistant-suggestion-avg-monthly-blood-pressure": "What is my average blood pressure for the past month?",
    "ai-assistant-suggestion-daily-active-minutes-month": "What’s my daily average for active minutes this month?",
    "ai-assistant-suggestion-resting-heart-rate-change-month": "How has my resting heart rate changed over the past month?",
    "ai-assistant-suggestion-stand-ups-yesterday": "How often did I stand up yesterday?",
    "ai-assistant-suggestion-graph-heart-rate-trends-workouts": "Could you graph my heart rate trends during workouts this week?",
    "ai-assistant-suggestion-sleep-7-days": "How has my sleep been for the past 7 days?",
    "ai-assistant-suggestion-fall-asleep-time-2-weeks": "At what time did I usually fall asleep over the past 2 weeks?",
    "ai-assistant-suggestion-sleep-quality-change-month": "How has my sleep quality changed over the past month?",
    "ai-assistant-suggestion-last-tetanus-vaccine": "When was my last tetanus vaccine?",
    "ai-assistant-suggestion-last-blood-test-lab-work": "When was my last blood test or lab work?",
    "ai-assistant-suggestion-abnormal-lab-results": "Do I have any abnormal lab results?",
    "ai-assistant-suggestion-last-cbc-test": "When was my last complete blood count (CBC)?",
    "ai-assistant-suggestion-glucose-a1c-levels-last-test": "What were my glucose and A1c levels in my last test?",
    "ai-assistant-suggestion-graph-cholesterol-trends": "Can you show me a graph of how my cholesterol levels have changed over time?",
    "ai-assistant-suggestion-last-metabolic-panel": "When was my last metabolic panel done?",
    "ai-assistant-suggestion-hemoglobin-levels-trend": "What’s the trend in my hemoglobin levels?",
    "ai-assistant-suggestion-show-files": "Show me my files.",
    "ai-assistant-suggestion-save-graph-to-files": "Save the graph to my files",
    "mindful-minutes": "Mindful Minutes"
};

export default strings;