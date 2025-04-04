﻿let strings: { [key: string]: string } = {
    "back": "Retour",
    "done": "Terminé",
    "close": "Fermer",
    "save": "Enregistrer",
    "add": "Ajouter",
    "edit": "Modifier",
    "cancel": "Annuler",
    "clear": "effacer",
    "settings": "Paramètres",
    "connect": "Connecter",
    "reconnect": "Reconnecter",
    "setup": "Configuration",
    "refresh": "Actualiser",
    "remove": "Supprimer",
    "help": "Aide",
    "view": "Afficher",
    "health-records": "Dossiers de santé",
    "connect-ehr-title-prefix": "Connecter ",
    "connect-ehr-title-divider": " ou ",
    "connect-ehr-title-providers": "Fournisseur",
    "connect-ehr-title-health-plans": "Régime de santé",
    "connect-ehr-connected": "Nous recevons vos données DSE!",
    "connect-ehr-needs-attention": "L'un de vos comptes nécessite une attention.",
    "connect-ehr-text": "Connectez votre fournisseur ou régime de santé pour consulter vos résultats de laboratoire, conditions, médicaments et plus.",
    "connect-ehr-text-connected": "Connectez un autre fournisseur pour partager plus de données ou gérer vos connexions DSE.",
    "connect-ehr-not-enabled": "La liaison DSE n'est pas activée pour ce projet.",
    "search-for-provider": "Rechercher un fournisseur ou régime de santé",
    "request-add": "Demander d'ajouter",
    "expired-reconnect": "Connexion expirée. Veuillez vous reconnecter.",
    "connect-error-reconnect": "Erreur inattendue. Veuillez vous reconnecter.",
    "connected": "Connecté",
    "search": "Rechercher",
    "connect-fitbit-intro": "Vous pouvez partager les données de votre compte Fitbit si vous en avez un. Pour commencer, cliquez ou appuyez ci-dessous pour vous connecter avec vos identifiants Fitbit.",
    "connect-fitbit-button": "Connecter Fitbit",
    "received-fitbit-data": "Nous recevons vos données Fitbit!",
    "connect-garmin-intro": "Vous pouvez partager les données de votre compte Garmin si vous en avez un. Pour commencer, cliquez ou appuyez ci-dessous pour vous connecter avec vos identifiants Garmin.",
    "connect-garmin-button": "Connecter Garmin",
    "received-garmin-data": "Nous recevons vos données Garmin!",
    "connect-oura-intro": "Vous pouvez partager les données de votre compte Oura si vous en avez un. Pour commencer, cliquez ou appuyez ci-dessous pour vous connecter avec vos identifiants Oura.",
    "connect-oura-button": "Connecter Oura",
    "received-oura-data": "Nous recevons vos données Oura!",
    "connect-dexcom-intro": "Vous pouvez partager les données de votre compte Dexcom si vous en avez un. Pour commencer, cliquez ou appuyez ci-dessous pour vous connecter avec vos identifiants Dexcom.",
    "connect-dexcom-button": "Connecter Dexcom",
    "received-dexcom-data": "Nous recevons vos données Dexcom!",
    "downloading-data": "Téléchargement des données...",
    "downloading-data-menu": "Téléchargement des données",
    "empty-tasks-incomplete": "Aucune tâche ouverte à afficher actuellement.",
    "empty-tasks-complete": "Les tâches terminées seront affichées ici.",
    "view-all": "Tout afficher",
    "tasks": "Tâches",
    "incomplete-tasks": "Tâches incomplètes",
    "completed-tasks": "Tâches terminées",
    "overdue": "En retard",
    "due-today": "À faire aujourd'hui",
    "due-tomorrow": "À faire demain",
    "due": "À faire",
    "due-in": "À faire dans",
    "days": "jours",
    "notifications": "Notifications",
    "support": "Soutien",
    "all-notifications": "Toutes les notifications",
    "steps": "Pas",
    "resting-heart-rate": "Fréquence cardiaque au repos",
    "distance-traveled": "Distance parcourue",
    "google-fit-share": "Appuyez pour partager les données de condition physique",
    "devices": "Appareils",
    "last-sync": "Dernière synchronisation",
    "completed": "Terminé",
    "ehr-intro-search": "Recherchez en saisissant le nom de votre fournisseur ou le portail membre pour votre fournisseur de soins de santé ou régime de santé.",
    "external-accounts-title-divider": " / ",
    "external-accounts-title-providers": "Fournisseurs",
    "external-accounts-title-health-plans": "Régimes de santé",
    "external-accounts-title-devices": "Appareils",
    "external-accounts-error": "L'un de vos comptes nécessite une attention",
    "external-accounts-loading": "Vos données sont actuellement téléchargées depuis vos régimes de santé et fournisseurs liés. Veuillez revenir dans quelques instants pour consulter vos données.",
    "external-account-authorization-expired": "Autorisation expirée",
    "external-account-fetching-data": "Récupération des données...",
    "external-account-deleting": "Suppression...",
    "external-account-last-updated": "Dernière mise à jour",
    "external-account-error": "Erreur inattendue",
    "external-account-reconnect": "Reconnecter",
    "external-account-refresh": "Actualiser",
    "external-account-remove": "Supprimer",
    "device-data-no-data": "Si vous avez connecté Apple Health, Google Fit, Fitbit ou Garmin, revenez plus tard pour consulter vos données.",
    "no-notifications-received": "Aucune notification reçue",
    "next-button-text": "Suivant",
    "lab-results-title": "Résultats de laboratoire",
    "medications-title": "Médicaments",
    "immunizations-title": "Vaccinations",
    "reports-title": "Rapports",
    "allergies-title": "Allergies",
    "conditions-title": "Conditions",
    "procedures-title": "Procédures",
    "app-download-title": "Suivant: Télécharger l'application",
    "app-download-subtitle": "Télécharger l'application MyDataHelps facilite encore plus la participation à @@PROJECT_NAME@@.",
    "app-download-google-play-link-alt": "Télécharger sur Google Play Store",
    "app-download-app-store-link-alt": "Télécharger sur l'App Store d'Apple",
    "start": "Commencer",
    "resume": "Reprendre",
    "start-survey": "Commencer le sondage",
    "resume-survey": "Reprendre le sondage",
    "30-day-average": "Moyenne sur 30 jours",
    "today": "Aujourd'hui",
    "yesterday": "Hier",
    "tap-to-log-today": "Appuyez ici pour enregistrer vos symptômes ou traitements!",
    "mild": "Léger",
    "moderate": "Modéré",
    "severe": "Sévère",
    "severe-shortened": "sév",
    "moderate-shortened": "mod",
    "mild-shortened": "léger",
    "log-todays-symptoms": "Enregistrer les symptômes d'aujourd'hui",
    "todays-log": "Journal d'aujourd'hui",
    "symptoms": "Symptômes",
    "treatments": "Traitements",
    "symptoms-experiencing-today": "Quels symptômes ressentez-vous?",
    "symptoms-experiencing-previous": "Quels symptômes ressentiez-vous?",
    "treatments-experiencing-today": "Quels traitements avez-vous effectués?",
    "treatments-experiencing-previous": "Quels traitements avez-vous effectués?",
    "feeling-overall-today": "Comment vous sentez-vous globalement?",
    "feeling-overall-previous": "Comment vous sentiez-vous globalement?",
    "additional-notes": "Des notes supplémentaires?",
    "how-severe-is": "Quelle est la gravité de votre",
    "how-severe-was": "Quelle était la gravité de votre",
    "clear-symptom": "Effacer le symptôme",
    "add-notes": "Ajouter des notes",
    "notes": "Notes",
    "enter-symptom-name": "Entrer le nom du symptôme",
    "enter-treatment-name": "Entrer le nom du traitement",
    "severity-tracking-none": "Ne pas suivre la gravité",
    "severity-tracking-3point": "Évaluation Léger / Modéré / Sévère",
    "severity-tracking-10point": "Évaluation de 1 à 10 points",
    "muted": "Muet",
    "not-muted": "Non muet",
    "delete": "Supprimer",
    "severity": "Gravité",
    "item-delete-warning": "Avertissement: Continuer supprimera définitivement les éléments ci-dessous et toutes les données associées de vos journaux. Si vous ne souhaitez pas supprimer ces éléments, sélectionnez \"Annuler\".",
    "unsaved-changes": "Modifications non enregistrées",
    "daily-overall-experience": "Expérience globale quotidienne",
    "average": "Moyenne",
    "include-symptoms": "Inclure les symptômes",
    "select-symptoms": "Sélectionner les symptômes",
    "include-treatments": "Inclure les traitements",
    "select-treatments": "Sélectionner les traitements",
    "download-mydatahelps": "Télécharger MyDataHelps",
    "connect-devices-title": "Connecter des appareils",
    "connect-devices-text": "Partagez les données de vos objets connectés, applications et autres appareils.",
    "apple-health-troubleshooting-intro": "Si vous n'avez pas approuvé ou avez désactivé le partage de vos données Apple Health et souhaitez l'activer, suivez ces étapes:",
    "apple-health-troubleshooting-li-1": "Ouvrez l'application \"Réglages\"",
    "apple-health-troubleshooting-li-2": "Sélectionnez \"Confidentialité\"",
    "apple-health-troubleshooting-li-3": "Sélectionnez \"Santé\"",
    "apple-health-troubleshooting-li-4": "Sélectionnez \"MyDataHelps\"",
    "apple-health-troubleshooting-li-5": "Activez les catégories de données que vous souhaitez partager",
    "how-to-enable": "Comment activer",
    "new-points-title": "Bien joué!",
    "new-points-text": "Vous avez reçu des points pour ce qui suit:",
    "new-points-next-reward-prefix": "Vous avez maintenant besoin de ",
    "new-points-next-reward-suffix": " points pour débloquer votre prochaine récompense.",
    "new-points-done-button-text": "Terminé",
    "systolic-average": "Moyenne systolique",
    "diastolic-average": "Moyenne diastolique",
    "highest-systolic": "Systolique la plus élevée",
    "lowest-systolic": "Systolique la plus basse",
    "resource-default-button-text": "Ouvrir",
    "inbox-message-completed-status": "VU",
    "inbox-resource-completed-status": "VU",
    "inbox-survey-completed-status": "TERMINÉ",
    "inbox-history-view-title": "Historique de la boîte de réception",
    "inbox-history-view-empty-text": "Vous n'avez aucun élément dans l'historique de votre boîte de réception.",
    "inbox-message-view-related-resources-title": "Connexe",
    "inbox-view-title": "Boîte de réception",
    "inbox-view-empty-text": "Vous n'avez aucun nouvel élément dans votre boîte de réception.",
    "inbox-view-messages-title": "Messages",
    "inbox-view-surveys-title": "Sondages",
    "inbox-view-resources-title": "Ressources",
    "inbox-view-recently-completed-title": "Récent",
    "inbox-view-recently-completed-empty-text": "Vous n'avez aucun élément récemment terminé dans votre boîte de réception.",
    "inbox-view-history-button-text": "Voir l'historique de la boîte de réception",
    "choose-report-month": "Choisir le mois du rapport",
    "include-overall-experience": "Inclure l'expérience globale quotidienne",
    "include-notes": "Inclure les notes",
    "create-report": "Créer un rapport PDF",
    "reports": "Rapports",
    "recent-daily-data-bar-chart-subtitle": "7 derniers jours",
    "recent-daily-data-bar-chart-no-data": "Aucune donnée",
    "resource-list-empty-text": "Aucune ressource trouvée.",
    "asthma-symptom-level-none": "Aucun symptôme",
    "asthma-symptom-level-mild": "Symptômes légers",
    "asthma-symptom-level-moderate": "Symptômes modérés",
    "asthma-symptom-level-severe": "Symptômes sévères",
    "asthma-symptom-difficulty-breathing": "Difficulté à respirer",
    "asthma-symptom-wheezing": "Respiration sifflante",
    "asthma-symptom-coughing": "Toux",
    "asthma-symptom-chest-tightness": "Oppression ou pression thoracique",
    "asthma-impact-limit-daily-activity": "Limiter votre activité quotidienne",
    "asthma-impact-waking-at-night": "Se réveiller la nuit",
    "asthma-impact-using-rescue-inhaler": "Utiliser votre inhalateur de secours",
    "asthma-trigger-cold-illness": "Rhume/maladie virale",
    "asthma-trigger-animal-exposure": "Exposition aux animaux",
    "asthma-trigger-seasonal-allergens": "Allergènes saisonniers/pollen",
    "asthma-trigger-exercise": "Exercice",
    "asthma-trigger-smoke": "Fumée",
    "asthma-trigger-weather-changes": "Changements météorologiques extrêmes",
    "asthma-trigger-air-pollution": "Pollution de l'air",
    "asthma-trigger-strong-smells": "Odeurs fortes",
    "asthma-trigger-chemicals": "Produits chimiques/de nettoyage",
    "asthma-trigger-dust": "Poussière",
    "asthma-trigger-mold": "Moisissure",
    "asthma-trigger-dust-mites": "Acariens",
    "asthma-trigger-rodents": "Rongeurs",
    "asthma-trigger-cockroaches": "Cafards",
    "asthma-trigger-nsaid": "AINS/Aspirine",
    "asthma-trigger-beta-blocker": "Bêta-bloquant",
    "asthma-trigger-heartburn": "Brûlures d'estomac",
    "asthma-trigger-red-wine": "Vin rouge",
    "asthma-trigger-new-foods": "Nouveaux aliments",
    "asthma-trigger-cooked-without-ventilation": "Cuisine (sans ventilation)",
    "asthma-trigger-pet-in-bed": "Animal dans votre lit",
    "asthma-trigger-incense-or-candle": "Bougie/encens",
    "asthma-data-status-out-of-range": "Hors plage",
    "asthma-data-status-in-range": "Dans la plage",
    "asthma-data-status-offline": "Hors ligne",
    "asthma-data-status-establishing": "Établissement",
    "asthma-data-status-not-determined": "Référence non établie",
    "asthma-data-status-not-found": "Aucune donnée enregistrée",
    "asthma-data-status-not-configured": "Non configuré",
    "asthma-control-calendar-daily-entry-missed": "Entrée quotidienne manquée",
    "asthma-control-calendar-not-logged-yet": "Pas encore enregistré",
    "asthma-control-calendar-log-entries-symptoms-label": "Symptômes",
    "asthma-control-calendar-log-entries-impacts-label": "Impacts",
    "asthma-control-calendar-log-entries-triggers-label": "Déclencheurs",
    "asthma-control-status-header-complete-daily-entry": "Complétez votre entrée quotidienne.",
    "asthma-control-status-header-multiple-out-of-range": "Plusieurs points de données sont |||en dehors de vos niveaux normaux|||.",
    "asthma-control-status-header-abnormal-heart-rate": "Votre fréquence cardiaque au repos est |||au-dessus de votre niveau normal|||.",
    "asthma-control-status-header-abnormal-respiratory-rate": "Votre fréquence respiratoire est |||au-dessus de votre niveau normal|||.",
    "asthma-control-status-header-abnormal-steps": "Votre activité est |||en dessous de vos niveaux normaux|||.",
    "asthma-control-status-header-abnormal-sleep": "Vos perturbations du sommeil sont |||au-dessus de votre niveau normal|||.",
    "asthma-control-status-header-abnormal-blood-oxygen": "Votre niveau d'oxygène sanguin est |||en dessous de votre niveau normal|||.",
    "asthma-control-status-header-abnormal-home-aqi": "L'indice de qualité de l'air de votre domicile est |||{aqi}|||.",
    "asthma-control-status-header-abnormal-work-aqi": "L'indice de qualité de l'air de votre lieu de travail est |||{aqi}|||.",
    "asthma-control-status-header-no-data": "Ajoutez une entrée quotidienne pour évaluer le contrôle de votre asthme.",
    "asthma-control-status-header-no-data-caregiver": "Ajoutez une entrée quotidienne pour évaluer le contrôle de l'asthme de {name}.",
    "asthma-control-status-header-not-determined": "Plus d'entrées quotidiennes nécessaires pour évaluer le contrôle de votre asthme.",
    "asthma-control-status-header-not-determined-caregiver": "Plus d'entrées quotidiennes nécessaires pour évaluer le contrôle de l'asthme de {name}.",
    "asthma-control-status-header-controlled": "Selon vos entrées, votre asthme est |||sous contrôle|||.",
    "asthma-control-status-header-controlled-caregiver": "Selon les entrées, l'asthme de {name} est |||sous contrôle|||.",
    "asthma-control-status-header-not-controlled": "Selon vos entrées, votre asthme n'est |||pas sous contrôle|||.",
    "asthma-control-status-header-not-controlled-caregiver": "Selon les entrées, l'asthme de {name} n'est |||pas sous contrôle|||.",
    "asthma-control-status-header-not-controlled-stat-symptom-days": "Jours avec symptômes",
    "asthma-control-status-header-not-controlled-stat-rescue-inhaler": "Inhalateur de secours",
    "asthma-control-status-header-not-controlled-stat-limited-activity": "Activité limitée",
    "asthma-control-status-header-not-controlled-stat-awakenings": "Réveils",
    "asthma-action-plan-manager-title": "Plan d'action pour l'asthme",
    "asthma-action-plan-manager-instructions": "Enregistrez une photo de votre plan d'action pour l'asthme pour une référence facile.",
    "asthma-action-plan-manager-instructions-caregiver": "Enregistrez une photo du plan d'action pour l'asthme de {name} pour une référence facile.",
    "asthma-action-plan-manager-learn-more": "Qu'est-ce qu'un plan d'action pour l'asthme?",
    "asthma-action-plan-manager-edit-button-text": "Modifier",
    "asthma-action-plan-manager-not-found-text": "Appuyez pour ajouter une photo",
    "asthma-biometrics-title": "Santé et activité",
    "asthma-biometrics-daytime-resting-heart-rate-label": "FC repos (jour)",
    "asthma-biometrics-nighttime-resting-heart-rate-label": "FC repos (nuit)",
    "asthma-biometrics-beats-per-minute-units": "BPM",
    "asthma-biometrics-respiratory-rate-label": "Fréquence respiratoire",
    "asthma-biometrics-breaths-per-minute-units": "RPM",
    "asthma-biometrics-steps-label": "Pas",
    "asthma-biometrics-daytime-blood-oxygen-level-label": "Saturation en oxygène (jour)",
    "asthma-biometrics-nighttime-blood-oxygen-level-label": "Saturation en oxygène (nuit)",
    "asthma-biometrics-percent-units": "%",
    "asthma-biometrics-sleep-disturbances-label": "Perturbations du sommeil",
    "asthma-air-qualities-title": "Qualité de l'air",
    "asthma-air-qualities-setup-button-text": "+ Configuration",
    "asthma-air-qualities-home-aqi-label": "IQA (domicile)",
    "asthma-air-qualities-work-aqi-label": "IQA (travail)",
    "asthma-alert-takeover-notice-instructions": "Prenez un moment pour enregistrer tout symptôme d'asthme dans une entrée quotidienne.",
    "asthma-alert-takeover-notice-add-entry-button-text": "+ Entrée quotidienne",
    "asthma-alert-takeover-notice-not-now-button-text": "Pas maintenant",
    "asthma-log-entry-details-not-editable": "Entrée quotidienne manquée",
    "asthma-log-entry-details-not-logged-yet": "Pas encore enregistré",
    "asthma-log-entry-details-edit-button-text": "Modifier",
    "asthma-log-entry-details-add-button-text": "Enregistrer l'entrée",
    "asthma-log-entry-details-symptoms-label": "Symptômes",
    "asthma-log-entry-details-impacts-label": "Impacts",
    "asthma-log-entry-details-triggers-label": "Déclencheurs",
    "asthma-log-entry-details-component-no-data-p1": "Aucun ",
    "asthma-log-entry-details-component-no-data-p2": " enregistré",
    "asthma-log-entry-header-today-log-label": "Aujourd'hui",
    "asthma-log-entry-header-yesterday-log-label": "Hier",
    "asthma-log-entry-header-not-logged-yet": "Pas encore enregistré",
    "asthma-log-entry-header-add-button-text": "Enregistrer l'entrée",
    "asthma-activity-view-title": "Activité",
    "asthma-activity-view-chart-title": "Pas",
    "asthma-activity-view-alert-message": "Votre activité est en dessous de votre niveau normal.",
    "asthma-alert-takeover-message": "Plusieurs points de données sont en dehors de vos niveaux normaux.",
    "asthma-air-quality-view-title": "Qualité de l'air",
    "asthma-air-quality-view-home-aqi-chart-title": "Qualité de l'air (domicile)",
    "asthma-air-quality-view-home-aqi-alert-message": "L'IQA de votre domicile est malsain.",
    "asthma-air-quality-view-work-aqi-chart-title": "Qualité de l'air (travail)",
    "asthma-air-quality-view-work-aqi-alert-message": "L'IQA de votre lieu de travail est malsain.",
    "asthma-heart-and-lungs-view-title": "Cœur et poumons",
    "asthma-heart-and-lungs-view-dhr-chart-title": "Fréquence cardiaque au repos (jour)",
    "asthma-heart-and-lungs-view-dhr-alert-message": "Votre fréquence cardiaque au repos diurne est au-dessus de votre niveau normal.",
    "asthma-heart-and-lungs-view-nhr-chart-title": "Fréquence cardiaque au repos (nuit)",
    "asthma-heart-and-lungs-view-nhr-alert-message": "Votre fréquence cardiaque au repos nocturne est au-dessus de votre niveau normal.",
    "asthma-heart-and-lungs-view-rr-chart-title": "Fréquence respiratoire",
    "asthma-heart-and-lungs-view-rr-alert-message": "Votre fréquence respiratoire est au-dessus de votre niveau normal.",
    "asthma-heart-and-lungs-view-dbol-chart-title": "Oxygène sanguin (jour)",
    "asthma-heart-and-lungs-view-dbol-alert-message": "Votre oxygène sanguin diurne est en dessous de votre niveau normal.",
    "asthma-heart-and-lungs-view-nbol-chart-title": "Oxygène sanguin (nuit)",
    "asthma-heart-and-lungs-view-nbol-alert-message": "Votre oxygène sanguin nocturne est en dessous de votre niveau normal.",
    "asthma-sleep-view-title": "Sommeil",
    "asthma-sleep-view-chart-title": "Perturbations du sommeil",
    "asthma-sleep-view-alert-message": "Vos perturbations du sommeil sont au-dessus de votre niveau normal.",
    "asthma-log-entry-editor-view-symptom-level-title": "Niveau de symptôme",
    "asthma-log-entry-editor-view-select-one-subtitle": "Sélectionnez-en un",
    "asthma-log-entry-editor-view-select-all-subtitle": "Sélectionnez tout ce qui s'applique",
    "asthma-log-entry-editor-view-symptoms-title": "Symptômes",
    "asthma-log-entry-editor-view-impacts-title": "Impacts",
    "asthma-log-entry-editor-view-triggers-title": "Déclencheurs",
    "asthma-air-quality-description-unhealthy": "Malsain",
    "asthma-air-quality-description-very-unhealthy": "Très malsain",
    "asthma-air-quality-description-hazardous": "Dangereux",
    "asthma-recommended-article-21-title": "Comment garder votre asthme sous contrôle",
    "asthma-recommended-article-21-subtitle": "Restez sans symptômes en adhérant à votre plan de traitement, en comprenant les déclencheurs et en reconnaissant tôt les changements de contrôle.",
    "asthma-recommended-article-22-title": "Votre asthme est-il sous contrôle?",
    "asthma-recommended-article-22-subtitle": "4 questions pour évaluer si votre asthme est sous contrôle. Si vous ressentez des symptômes plus de 2 fois par semaine ou si vous vous réveillez la nuit à cause des symptômes d'asthme - votre asthme n'est pas sous contrôle.",
    "asthma-recommended-article-24-title": "Naviguer dans la zone de danger: Préparation aux crises d'asthme",
    "asthma-recommended-article-24-subtitle": "Reconnaissez tôt les symptômes graves comme la toux intense et l'essoufflement, et activez votre plan d'action personnalisé pour l'asthme, y compris les médicaments immédiats.",
    "asthma-recommended-article-25-title": "Prendre en charge votre asthme",
    "asthma-recommended-article-25-subtitle": "Quand votre asthme semble ingérable, il est temps de réévaluer votre approche. Mesures à prendre lorsque votre asthme n'est pas sous contrôle.",
    "asthma-recommended-article-32-title": "Qui a besoin d'un médicament de contrôle?",
    "asthma-recommended-article-32-subtitle": "Découvrez le rôle crucial des médicaments de contrôle pour maintenir l'asthme sous contrôle.",
    "asthma-recommended-article-33-title": "Accès aux médicaments",
    "asthma-recommended-article-33-subtitle": "Pour quand le coût est un obstacle aux médicaments, apprenez à propos des médicaments gratuits ou à faible coût. Prendre les médicaments comme prescrit est important pour maintenir le contrôle de l'asthme.",
    "asthma-recommended-article-34-title": "Renouvellements de médicaments",
    "asthma-recommended-article-34-subtitle": "Restez à jour avec votre médicament pour l'asthme grâce à des stratégies de renouvellement faciles.",
    "asthma-recommended-article-35-title": "Difficulté à se souvenir des médicaments",
    "asthma-recommended-article-35-subtitle": "Découvrez des stratégies simples mais efficaces pour vous rappeler vos doses quotidiennes, des conseils de stockage intelligents à l'utilisation des rappels d'applications.",
    "asthma-recommended-article-36-title": "Quel inhalateur utiliser quand",
    "asthma-recommended-article-36-subtitle": "Maîtrisez la gestion de votre asthme: L'inhalateur de secours agit rapidement pour soulager les symptômes tandis qu'un contrôleur est préventif et agit en réduisant l'inflammation, généralement en étant pris quotidiennement.",
    "asthma-recommended-article-37a-title": "Technique d'inhalateur - MDI",
    "asthma-recommended-article-37a-subtitle": "Conseils de technique pour inhalateur-doseur (MDI). Sans la bonne technique, vous ne recevez peut-être qu'une partie de la dose.",
    "asthma-recommended-article-37b-title": "Technique d'inhalateur - DPI",
    "asthma-recommended-article-37b-subtitle": "Conseils de technique pour inhalateur de poudre sèche (DPI). Sans la bonne technique, vous ne recevez peut-être qu'une partie de la dose.",
    "asthma-recommended-article-37c-title": "Technique d'inhalateur - SMI",
    "asthma-recommended-article-37c-subtitle": "Conseils de technique pour inhalateur à brume douce (SMI). Sans la bonne technique, vous ne recevez peut-être qu'une partie de la dose.",
    "asthma-recommended-article-37d-title": "Technique d'inhalateur - nébuliseur",
    "asthma-recommended-article-37d-subtitle": "Conseils de technique pour nébuliseur.",
    "asthma-recommended-article-38-title": "Pourquoi devrais-je prendre mon contrôleur?",
    "asthma-recommended-article-38-subtitle": "Comprenez le rôle critique des médicaments de contrôle et pourquoi ils sont une pierre angulaire de votre plan de gestion personnalisé.",
    "asthma-recommended-article-39-title": "Effets secondaires des médicaments pour l'asthme",
    "asthma-recommended-article-39-subtitle": "Apprenez à identifier les effets secondaires courants et rares, et les étapes simples que vous pouvez prendre pour éviter l'effet secondaire courant - le muguet (infection fongique dans votre bouche).",
    "asthma-recommended-article-39a-title": "Comment savoir si mes médicaments pour l'asthme fonctionnent?",
    "asthma-recommended-article-39a-subtitle": "Les médicaments de contrôle peuvent prendre des jours à des semaines pour atteindre leur plein impact. Suivez vos symptômes quotidiennement pour voir s'il y a une amélioration et s'il n'y en a pas, parlez à votre fournisseur.",
    "asthma-recommended-article-41-title": "Déclencheurs surprises",
    "asthma-recommended-article-41-subtitle": "Découvrez les déclencheurs d'asthme inattendus qui se cachent dans votre vie quotidienne, des AINS (comme l'ibuprofène) à votre verre de vin. Savoir quoi chercher peut vous aider à identifier ces déclencheurs surprises.",
    "asthma-recommended-article-42-title": "Asthme et allergènes saisonniers/pollen",
    "asthma-recommended-article-42-subtitle": "Naviguez facilement pendant la saison du pollen: Identifiez vos déclencheurs de pollen spécifiques, comprenez leurs modèles saisonniers et apprenez comment minimiser l'exposition.",
    "asthma-recommended-article-43-title": "Asthme et qualité de l'air",
    "asthma-recommended-article-43-subtitle": "Comprenez que la mauvaise qualité de l'air peut déclencher l'asthme. Apprenez comment naviguer les jours à IQA élevé et ce que signifient les niveaux d'IQA.",
    "asthma-recommended-article-43a-title": "Asthme et infections respiratoires",
    "asthma-recommended-article-43a-subtitle": "Les infections respiratoires sont des déclencheurs courants de l'asthme. Comment les prévenir et quoi faire quand elles surviennent.",
    "asthma-recommended-article-43b-title": "Asthme et animaux",
    "asthma-recommended-article-43b-subtitle": "Les animaux/animaux de compagnie peuvent être un déclencheur pour l'asthme. Apprenez comment diagnostiquer une allergie aux animaux/animaux de compagnie et les étapes pour réduire l'impact.",
    "asthma-recommended-article-43c-title": "Asthme et fumée",
    "asthma-recommended-article-43c-subtitle": "Les feux de forêt et la fumée de tabac peuvent déclencher l'asthme. Apprenez les étapes que vous pouvez prendre pour réduire votre exposition.",
    "asthma-recommended-article-43d-title": "Asthme et météo",
    "asthma-recommended-article-43d-subtitle": "Les déclencheurs météorologiques courants sont l'air froid, l'air chaud et humide, et la pluie/orages. Explorez pourquoi ceux-ci peuvent déclencher l'asthme.",
    "asthma-recommended-article-43e-title": "Odeurs fortes et produits chimiques/de nettoyage",
    "asthma-recommended-article-43e-subtitle": "Découvrez quelles odeurs peuvent déclencher votre asthme et les choses à considérer pendant le nettoyage.",
    "asthma-recommended-article-43f-title": "Asthme et poussière/acariens",
    "asthma-recommended-article-43f-subtitle": "La poussière est un déclencheur courant de l'asthme, mais la raison pour laquelle c'est un déclencheur pourrait vous surprendre!",
    "asthma-recommended-article-43g-title": "Asthme et moisissure",
    "asthma-recommended-article-43g-subtitle": "La moisissure a besoin d'humidité pour se développer, donc se trouve généralement dans des endroits humides ou mouillés. Apprenez comment prévenir la moisissure dans votre maison.",
    "asthma-recommended-article-43h-title": "Asthme et brûlures d'estomac",
    "asthma-recommended-article-43h-subtitle": "Qu'est-ce que les brûlures d'estomac et quel rapport ont-elles avec l'asthme?",
    "blood-type": "Groupe sanguin",
    "device-data-month-chart-no-data": "Aucune donnée",
    "device-data-month-chart-daily-average": "Moyenne quotidienne",
    "term-information-not-found-header": "Aucune information trouvée",
    "term-information-not-found-body": "Impossible de trouver des informations sur ce sujet",
    "term-information-disclaimer": "<strong>AVERTISSEMENT:</strong> Les informations fournies ne constituent pas un avis médical. Elles visent à vous aider à mieux comprendre votre santé. Veuillez contacter votre professionnel de la santé si vous avez des questions concernant votre état de santé.",
    "term-information-view-on-medline": "Voir sur MedlinePlus",
    "type": "Type",
    "location": "Emplacement",
    "description": "Description",
    "performed-by": "Effectué par",
    "verified-by": "Vérifié par",
    "normal-range": "Plage normale",
    "more": "Plus",
    "procedure": "Procédure",
    "procedures": "Procédures",
    "lab-report": "Rapport de laboratoire",
    "service-performed": "Service effectué",
    "services-performed": "Services effectués",
    "device-data-month-chart-minutes": "Minutes",
    "device-data-month-chart-sleep": "Sommeil",
    "air-quality": "Qualité de l'air",
    "air-quality-home": "Qualité de l'air (domicile)",
    "air-quality-work": "Qualité de l'air (travail)",
    "sedentary-time": "Temps sédentaire",
    "active-time": "Temps actif",
    "lightly-active-time": "Temps légèrement actif",
    "fairly-active-time": "Temps assez actif",
    "very-active-time": "Temps très actif",
    "breathing-rate": "Fréquence respiratoire",
    "calories-burned": "Calories brûlées",
    "elevated-heart-rate-time": "Temps de fréquence cardiaque élevée",
    "fat-burn-heart-rate-time": "Temps de combustion des graisses",
    "cardio-heart-rate-time": "Temps cardio",
    "peak-heart-rate-time": "Temps de pointe",
    "floors-climbed": "Étages montés",
    "heart-rate-variability": "Variabilité de la fréquence cardiaque",
    "sleep-time": "Temps de sommeil",
    "light-sleep-time": "Temps de sommeil léger",
    "deep-sleep-time": "Temps de sommeil profond",
    "rem-sleep-time": "Temps de sommeil paradoxal",
    "spo2": "SpO2",
    "heart-rate-range": "Plage de fréquence cardiaque",
    "max-heart-rate": "Fréquence cardiaque maximale",
    "core-sleep-time": "Temps de sommeil principal",
    "in-bed-time": "Temps au lit",
    "stand-time": "Temps debout",
    "walking-heart-rate-average": "FC moyenne en marchant",
    "active-energy-burned": "Énergie active brûlée",
    "number-of-alcoholic-beverages": "Nombre de boissons alcoolisées",
    "active-calories": "Calories actives",
    "resting-calories": "Calories au repos",
    "total-calories": "Calories totales",
    "min-heart-rate": "FC minimale",
    "average-heart-rate": "FC moyenne",
    "max-stress-level": "Niveau de stress maximal",
    "average-stress-level": "Niveau de stress moyen",
    "total-stress-time": "Temps de stress total",
    "low-stress-time": "Temps de stress faible",
    "medium-stress-time": "Temps de stress moyen",
    "high-stress-time": "Temps de stress élevé",
    "awake-time": "Temps éveillé",
    "sleep-score": "Score de sommeil",
    "bpm": "bpm",
    "hours-abbreviation": "h",
    "minutes-abbreviation": "m",
    "points-until-next-badge": "{points} points jusqu'au prochain badge",
    "fitbit-wear-time": "Temps de port Fitbit",
    "my-badges": "Mes badges ({badges})",
    "new-badge-title": "Bon travail!",
    "new-badge-text": "Vous avez obtenu un nouveau badge!",
    "get-badge": "Obtenir le badge",
    "glucose-chart-no-data": "Aucune lecture de glycémie",
    "glucose-stats-range-label": "Plage de glycémie",
    "glucose-stats-avg-label": "Glycémie moyenne",
    "glucose-stats-steps-label": "Pas",
    "glucose-stats-sleep-label": "Sommeil",
    "stress-level-title": "Stress global",
    "stress-level-min-label": "Pas de stress",
    "stress-level-max-label": "Extrêmement stressé",
    "meal-type-meal": "Repas",
    "meal-type-snack": "Collation",
    "meal-type-drink": "Boisson",
    "meal-log-title": "Journal des repas",
    "meal-log-no-data": "Aucun repas enregistré",
    "meal-editor-time-input-label": "Heure",
    "meal-editor-description-input-label": "Description",
    "meal-editor-description-optional": "Optionnel",
    "meal-editor-duplicate-timestamp-error": "Deux repas ne peuvent pas avoir le même horodatage.",
    "meal-editor-add-image": "Ajouter une image",
    "meal-editor-image-upload-error": "Une erreur s'est produite lors du téléchargement de l'image sélectionnée. Veuillez réessayer, utiliser une image différente ou supprimer l'image pour pouvoir sauvegarder.",
    "glucose-view-title": "Surveillance de la glycémie",
    "ai-assistant-loading": "Interaction avec vos données...",
    "ai-assistant-suggestion-avg-weekly-heart-rate": "Quelle est ma fréquence cardiaque moyenne pour la semaine dernière?",
    "ai-assistant-suggestion-highest-heart-rate-week": "Quelle a été ma fréquence cardiaque la plus élevée cette semaine?",
    "ai-assistant-suggestion-graph-daily-steps-21-days": "Faites un graphique de mes pas quotidiens pour les 21 derniers jours",
    "ai-assistant-suggestion-weekly-workouts-average-month": "Combien d'entraînements par semaine ai-je fait en moyenne ce mois-ci?",
    "ai-assistant-suggestion-avg-monthly-blood-pressure": "Quelle est ma tension artérielle moyenne pour le mois dernier?",
    "ai-assistant-suggestion-daily-active-minutes-month": "Quelle est ma moyenne quotidienne de minutes actives ce mois-ci?",
    "ai-assistant-suggestion-resting-heart-rate-change-month": "Comment ma fréquence cardiaque au repos a-t-elle changé au cours du mois dernier?",
    "ai-assistant-suggestion-stand-ups-yesterday": "Combien de fois me suis-je levé hier?",
    "ai-assistant-suggestion-graph-heart-rate-trends-workouts": "Pourriez-vous représenter graphiquement les tendances de ma fréquence cardiaque pendant les entraînements cette semaine?",
    "ai-assistant-suggestion-sleep-7-days": "Comment a été mon sommeil ces 7 derniers jours?",
    "ai-assistant-suggestion-fall-asleep-time-2-weeks": "À quelle heure me suis-je habituellement endormi au cours des 2 dernières semaines?",
    "ai-assistant-suggestion-sleep-quality-change-month": "Comment la qualité de mon sommeil a-t-elle changé au cours du mois dernier?",
    "ai-assistant-suggestion-last-tetanus-vaccine": "Quand ai-je reçu mon dernier vaccin contre le tétanos?",
    "ai-assistant-suggestion-last-blood-test-lab-work": "Quand ai-je fait ma dernière analyse de sang ou travail de laboratoire?",
    "ai-assistant-suggestion-abnormal-lab-results": "Ai-je des résultats de laboratoire anormaux?",
    "ai-assistant-suggestion-last-cbc-test": "Quand ai-je fait ma dernière formule sanguine complète (FSC)?",
    "ai-assistant-suggestion-glucose-a1c-levels-last-test": "Quels étaient mes niveaux de glucose et d'A1c lors de mon dernier test?",
    "ai-assistant-suggestion-graph-cholesterol-trends": "Pouvez-vous me montrer un graphique de l'évolution de mes niveaux de cholestérol au fil du temps?",
    "ai-assistant-suggestion-last-metabolic-panel": "Quand mon dernier bilan métabolique a-t-il été effectué?",
    "ai-assistant-suggestion-hemoglobin-levels-trend": "Quelle est la tendance de mes niveaux d'hémoglobine?",
    "ai-assistant-suggestion-show-files": "Montrez-moi mes fichiers.",
    "ai-assistant-suggestion-save-graph-to-files": "Enregistrez le graphique dans mes fichiers",
    "mindful-minutes": "Minutes de pleine conscience",
    "therapy-minutes": "Minutes de thérapie",
    "insight-matrix-no-comparison-data": "Aucun type de données de comparaison configuré.",
    "allergylist-reactions": "Réactions",
    "points-abbreviation": "pts",
    "no-data": "Aucune donnée",
    "no-data-yet": "Pas encore de données",
    "bp-low": "Basse",
    "bp-normal": "Normale",
    "bp-elevated": "Élevée",
    "bp-stage1": "Stade 1",
    "bp-stage2": "Stade 2",
    "bp-crisis": "Crise",
    "bp-unknown": "Inconnue",
    "device-not-enabled": "@@DEVICE@@ n'est pas activé pour ce projet.",
    "download-pdf-report": "Télécharger le rapport PDF",
    "connect-to-device": "Se connecter à @@DEVICE@@",
    "symptoms-and-treatments": "Symptômes et traitements",
    "subsequent-evaluation-note": "Note d'évaluation subséquente",
    "summary": "Résumé",
    "device-activity": "Activité de l'appareil",
    "daily": "Quotidien",
    "weekly": "Hebdomadaire",
    "monthly": "Mensuel",
    "bonus": "Bonus",
    "syncing-data": "Synchronisation des données...",
    "health-connect-phr-sync-title": "Synchroniser avec Health Connect",
    "health-connect-phr-sync-prompt": "Choisissez les dossiers de santé à lire et à écrire dans Health Connect"
};

export default strings;



