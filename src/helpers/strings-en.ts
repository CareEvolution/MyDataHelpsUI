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
    "new-points-done-button-text": "Done"
};

export default strings;