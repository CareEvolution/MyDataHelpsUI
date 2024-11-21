let strings: { [key: string]: string } = {
    "back": "Retour",
    "done": "Terminé",
    "close": "Fermer",
    "save": "Enregistrer",
    "add": "Ajouter",
    "edit": "Éditer",
    "cancel": "Annuler",
    "clear": "effacer",
    "settings": "Paramètres",
    "connect": "Connecter",
    "reconnect": "Reconnecter",
    "refresh": "Actualiser",
    "remove": "Supprimer",
    "help": "Aide",
    "view": "Voir",
    "health-records": "Dossiers médicaux",
    "connect-ehr-title-prefix": "Connecter ",
    "connect-ehr-title-divider": " ou ",
    "connect-ehr-title-providers": "Fournisseur",
    "connect-ehr-title-health-plans": "Plan de santé",
    "connect-ehr-connected": "Nous recevons vos données EHR !",
    "connect-ehr-needs-attention": "Un de vos comptes nécessite une attention particulière.",
    "connect-ehr-text": "Vos dossiers médicaux électroniques sont une source d'information importante. Ils pourraient aider les chercheurs à faire de nouvelles découvertes. Connectez votre fournisseur ou votre plan de santé (par exemple, Medicare) avec @@PROJECT_NAME@@.",
    "connect-ehr-text-connected": "Merci d'avoir partagé vos données EHR avec @@PROJECT_NAME@@. Connectez un autre fournisseur pour partager plus de données ou gérez vos connexions EHR.",
    "connect-ehr-not-enabled": "Le lien EHR n'est pas activé pour ce projet.",
    "search-for-provider": "Rechercher un fournisseur ou un plan de santé",
    "expired-reconnect": "Connexion expirée. Veuillez reconnecter.",
    "connect-error-reconnect": "Erreur inattendue. Veuillez reconnecter.",
    "connected": "Connecté",
    "search": "Recherche",
    "connect-fitbit-intro": "Vous pouvez partager des données de votre compte Fitbit si vous en avez un. Pour commencer, cliquez ou appuyez ci-dessous pour vous connecter avec vos identifiants Fitbit.",
    "connect-fitbit-button": "Connecter Fitbit",
    "received-fitbit-data": "Nous recevons vos données Fitbit !",
    "connect-garmin-intro": "Vous pouvez partager des données de votre compte Garmin si vous en avez un. Pour commencer, cliquez ou appuyez ci-dessous pour vous connecter avec vos identifiants Garmin.",
    "connect-garmin-button": "Connecter Garmin",
    "received-garmin-data": "Nous recevons vos données Garmin !",
    "connect-dexcom-intro": "Vous pouvez partager des données de votre compte Dexcom si vous en avez un. Pour commencer, cliquez ou appuyez ci-dessous pour vous connecter avec vos identifiants Dexcom.",
    "connect-dexcom-button": "Connecter Dexcom",
    "received-dexcom-data": "Nous recevons vos données Dexcom !",
    "downloading-data": "Téléchargement des données...",
    "downloading-data-menu": "Téléchargement des données",
    "empty-tasks-incomplete": "Aucune tâche ouverte à afficher actuellement.",
    "empty-tasks-complete": "Les tâches terminées seront affichées ici.",
    "view-all": "Voir tout",
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
    "support": "Support",
    "all-notifications": "Toutes les notifications",
    "steps": "Pas",
    "resting-heart-rate": "Fréquence cardiaque au repos",
    "distance-traveled": "Distance parcourue",
    "google-fit-share": "Appuyez pour partager des données de fitness",
    "devices": "Appareils",
    "last-sync": "Dernière synchronisation",
    "completed": "Terminé",
    "ehr-intro": "Vos dossiers médicaux électroniques (EHR) sont une source d'information importante. Si vous nous aidez à rassembler vos EHR, les chercheurs utiliseront ces données pour faire des découvertes.",
    "external-accounts-title-divider": " / ",
    "external-accounts-title-providers": "Fournisseurs",
    "external-accounts-title-health-plans": "Plans de santé",
    "external-accounts-title-devices": "Appareils",
    "external-accounts-error": "Un de vos comptes nécessite une attention",
    "external-accounts-loading": "Vos données sont actuellement en cours de téléchargement à partir de vos plans de santé et fournisseurs liés. Veuillez revenir dans quelques instants pour consulter vos données.",
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
    "immunizations-title": "Immunisations",
    "reports-title": "Rapports",
    "allergies-title": "Allergies",
    "conditions-title": "Conditions",
    "procedures-title": "Procédures",
    "app-download-title": "Étape suivante : Téléchargez l'application",
    "app-download-subtitle": "Télécharger l'application MyDataHelps rend votre participation à @@PROJECT_NAME@@ encore plus facile.",
    "app-download-google-play-link-alt": "Télécharger sur le Google Play Store",
    "app-download-app-store-link-alt": "Télécharger sur l'App Store d'Apple",
    "start": "Démarrer",
    "resume": "Reprendre",
    "start-survey": "Commencer l'enquête",
    "resume-survey": "Reprendre l'enquête",
    "30-day-average": "Moyenne sur 30 jours",
    "today": "Aujourd'hui",
    "yesterday": "Hier",
    "tap-to-log-today": "Appuyez ici pour enregistrer vos symptômes ou traitements aujourd'hui !",
    "mild": "Léger",
    "moderate": "Modéré",
    "severe": "Sévère",
    "severe-shortened": "sev",
    "moderate-shortened": "mod",
    "mild-shortened": "léger",
    "log-todays-symptoms": "Enregistrer les symptômes d'aujourd'hui",
    "todays-log": "Journal d'aujourd'hui",
    "symptoms": "Symptômes",
    "treatments": "Traitements",
    "symptoms-experiencing-today": "Quels symptômes ressentez-vous aujourd'hui ?",
    "symptoms-experiencing-previous": "Quels symptômes ressentiez-vous ?",
    "treatments-experiencing-today": "Quels traitements avez-vous effectués aujourd'hui ?",
    "treatments-experiencing-previous": "Quels traitements avez-vous effectués ?",
    "feeling-overall-today": "Comment vous sentez-vous globalement aujourd'hui ?",
    "feeling-overall-previous": "Comment vous sentiez-vous globalement ?",
    "additional-notes": "Des notes supplémentaires ?",
    "how-severe-is": "À quel point est grave votre",
    "how-severe-was": "À quel point était grave votre",
    "clear-symptom": "Effacer le symptôme",
    "add-notes": "Ajouter des notes",
    "notes": "Notes",
    "enter-symptom-name": "Saisissez le nom du symptôme",
    "enter-treatment-name": "Saisissez le nom du traitement",
    "severity-tracking-none": "Ne pas suivre la gravité",
    "severity-tracking-3point": "Évaluation légère / modérée / sévère",
    "severity-tracking-10point": "Évaluation de 1 à 10 points",
    "muted": "Silencieux",
    "not-muted": "Non silencieux",
    "delete": "Supprimer",
    "severity": "Gravité",
    "item-delete-warning": "Attention : la poursuite entraînera la suppression permanente des éléments ci-dessous et de toutes les données associées de vos journaux. Si vous ne souhaitez pas supprimer ces éléments, sélectionnez \"Annuler\".",
    "unsaved-changes": "Modifications non enregistrées",
    "daily-overall-experience": "Expérience globale quotidienne",
    "average": "Moyenne",
    "include-symptoms": "Inclure les symptômes",
    "select-symptoms": "Sélectionner les symptômes",
    "include-treatments": "Inclure les traitements",
    "select-treatments": "Sélectionner les traitements",
    "download-mydatahelps": "Télécharger MyDataHelps",
    "connect-devices-title": "Connecter des appareils",
    "connect-devices-text": "Partagez des données de vos dispositifs portables, applications et autres appareils.",
    "apple-health-troubleshooting-intro": "Si vous n'avez pas approuvé ou avez désactivé le partage de vos données Apple Health et souhaitez l'activer, suivez ces étapes :",
    "apple-health-troubleshooting-li-1": "Ouvrez l'application \"Réglages\"",
    "apple-health-troubleshooting-li-2": "Sélectionnez \"Confidentialité\"",
    "apple-health-troubleshooting-li-3": "Sélectionnez \"Santé\"",
    "apple-health-troubleshooting-li-4": "Sélectionnez \"MyDataHelps\"",
    "apple-health-troubleshooting-li-5": "Activez les catégories de données que vous souhaitez partager",
    "how-to-enable": "Comment activer",
    "new-points-title": "Bien joué !",
    "new-points-text": "Vous avez reçu des points pour les éléments suivants :",
    "new-points-next-reward-prefix": "Il vous manque maintenant ",
    "new-points-next-reward-suffix": " points pour débloquer votre prochaine récompense.",
    "new-points-done-button-text": "Terminé",
    "systolic-average": "Moyenne systolique",
    "diastolic-average": "Moyenne diastolique",
    "highest-systolic": "Systolique le plus élevé",
    "lowest-systolic": "Systolique la plus basse",
    "resource-default-button-text": "Ouvrir",
    "inbox-message-completed-status": "VU",
    "inbox-resource-completed-status": "VU",
    "inbox-survey-completed-status": "COMPLÉTÉ",
    "inbox-history-view-title": "Historique de la boîte de réception",
    "inbox-history-view-empty-text": "Vous n'avez aucun élément dans votre historique de la boîte de réception.",
    "inbox-message-view-related-resources-title": "Lié",
    "inbox-view-title": "Boîte de réception",
    "inbox-view-empty-text": "Vous n'avez aucun nouvel élément dans votre boîte de réception.",
    "inbox-view-messages-title": "Messages",
    "inbox-view-surveys-title": "Enquêtes",
    "inbox-view-resources-title": "Ressources",
    "inbox-view-recently-completed-title": "Récent",
    "inbox-view-recently-completed-empty-text": "Vous n'avez aucun élément récemment complété dans votre boîte de réception.",
    "inbox-view-history-button-text": "Voir l'historique de la boîte de réception",
    "choose-report-month": "Choisir le mois du rapport",
    "include-overall-experience": "Inclure l'expérience globale quotidienne",
    "include-notes": "Inclure des notes",
    "create-report": "Créer un rapport PDF",
    "reports": "Rapports",
    "recent-daily-data-bar-chart-subtitle": "7 derniers jours",
    "recent-daily-data-bar-chart-no-data": "Pas de données",
    "resource-list-empty-text": "Aucune ressource trouvée.",
    "asthma-symptom-level-none": "Aucun symptôme",
    "asthma-symptom-level-mild": "Symptômes légers",
    "asthma-symptom-level-moderate": "Symptômes modérés",
    "asthma-symptom-level-severe": "Symptômes sévères",
    "asthma-symptom-difficulty-breathing": "Difficulté à respirer",
    "asthma-symptom-wheezing": "Sifflements",
    "asthma-symptom-coughing": "Toux",
    "asthma-symptom-chest-tightness": "Sensation d'oppression ou de pression thoracique",
    "asthma-impact-limit-daily-activity": "Limitez votre activité quotidienne",
    "asthma-impact-waking-at-night": "Se réveiller la nuit",
    "asthma-impact-using-rescue-inhaler": "Utiliser votre inhalateur de secours",
    "asthma-trigger-cold-illness": "Maladie froide/virale",
    "asthma-trigger-animal-exposure": "Exposition aux animaux",
    "asthma-trigger-seasonal-allergens": "Allergènes saisonniers/pollens",
    "asthma-trigger-exercise": "Exercice",
    "asthma-trigger-smoke": "Fumée",
    "asthma-trigger-weather-changes": "Changements météorologiques extrêmes",
    "asthma-trigger-air-pollution": "Pollution de l'air",
    "asthma-trigger-strong-smells": "Odeurs fortes",
    "asthma-trigger-chemicals": "Produits chimiques/produits de nettoyage",
    "asthma-trigger-dust": "Poussière",
    "asthma-trigger-mold": "Moisissure",
    "asthma-trigger-dust-mites": "Acariens",
    "asthma-trigger-rodents": "Rongeurs",
    "asthma-trigger-cockroaches": "Cafards",
    "asthma-trigger-nsaid": "AINS/aspirine",
    "asthma-trigger-beta-blocker": "Bêta-bloquant",
    "asthma-trigger-heartburn": "Brûlures d'estomac",
    "asthma-trigger-red-wine": "Vin rouge",
    "asthma-trigger-new-foods": "Nouveaux aliments",
    "asthma-trigger-cooked-without-ventilation": "Cuisson (sans ventilation)",
    "asthma-trigger-pet-in-bed": "Animal de compagnie dans votre lit",
    "asthma-trigger-incense-or-candle": "Bougie/encens",
    "asthma-data-status-out-of-range": "Hors de portée",
    "asthma-data-status-in-range": "Dans la plage",
    "asthma-data-status-offline": "Hors ligne",
    "asthma-data-status-establishing": "Établissement",
    "asthma-data-status-not-determined": "Ligne de base non établie",
    "asthma-data-status-not-found": "Aucune donnée enregistrée",
    "asthma-data-status-not-configured": "Non configuré",
    "asthma-control-calendar-daily-entry-missed": "Entrée quotidienne manquée",
    "asthma-control-calendar-not-logged-yet": "Pas encore enregistré",
    "asthma-control-calendar-log-entries-symptoms-label": "Symptômes",
    "asthma-control-calendar-log-entries-impacts-label": "Impacts",
    "asthma-control-calendar-log-entries-triggers-label": "Déclencheurs",
    "asthma-control-status-header-multiple-out-of-range-p1": "Plusieurs points de données sont ",
    "asthma-control-status-header-multiple-out-of-range-p2": "en dehors de vos niveaux normaux",
    "asthma-control-status-header-multiple-out-of-range-p3": ". Terminez votre entrée quotidienne.",
    "asthma-control-status-header-abnormal-heart-rate-p1": "Votre fréquence cardiaque au repos est ",
    "asthma-control-status-header-abnormal-heart-rate-p2": "au-dessus de votre niveau normal",
    "asthma-control-status-header-abnormal-heart-rate-p3": ". Terminez votre entrée quotidienne.",
    "asthma-control-status-header-abnormal-respiratory-rate-p1": "Votre fréquence respiratoire est ",
    "asthma-control-status-header-abnormal-respiratory-rate-p2": "au-dessus de votre niveau normal",
    "asthma-control-status-header-abnormal-respiratory-rate-p3": ". Terminez votre entrée quotidienne.",
    "asthma-control-status-header-abnormal-steps-p1": "Votre activité est ",
    "asthma-control-status-header-abnormal-steps-p2": "en dessous de vos niveaux normaux",
    "asthma-control-status-header-abnormal-steps-p3": ". Terminez votre entrée quotidienne.",
    "asthma-control-status-header-abnormal-sleep-p1": "Vos perturbations du sommeil sont ",
    "asthma-control-status-header-abnormal-sleep-p2": "au-dessus de votre niveau normal",
    "asthma-control-status-header-abnormal-sleep-p3": ". Terminez votre entrée quotidienne.",
    "asthma-control-status-header-abnormal-blood-oxygen-p1": "Votre taux d'oxygène dans le sang est ",
    "asthma-control-status-header-abnormal-blood-oxygen-p2": "en dessous de votre niveau normal",
    "asthma-control-status-header-abnormal-blood-oxygen-p3": ". Terminez votre entrée quotidienne.",
    "asthma-control-status-header-abnormal-home-aqi-p1": "Votre indice de qualité de l'air à domicile est ",
    "asthma-control-status-header-abnormal-home-aqi-p2": ". Terminez votre entrée quotidienne.",
    "asthma-control-status-header-abnormal-work-aqi-p1": "Votre indice de qualité de l'air au travail est ",
    "asthma-control-status-header-abnormal-work-aqi-p2": ". Terminez votre entrée quotidienne.",
    "asthma-control-status-header-no-data": "Ajoutez une entrée quotidienne pour évaluer le contrôle de votre asthme.",
    "asthma-control-status-header-no-data-caregiver": "Ajoutez une entrée quotidienne pour évaluer le contrôle de l'asthme de {name}.",
    "asthma-control-status-header-not-determined": "Plus d'entrées quotidiennes nécessaires pour évaluer le contrôle de votre asthme.",
    "asthma-control-status-header-not-determined-caregiver": "Plus d'entrées quotidiennes sont nécessaires pour évaluer le contrôle de l'asthme de {name}.",
    "asthma-control-status-header-controlled-p1": "Selon vos entrées, votre asthme est ",
    "asthma-control-status-header-controlled-p1-caregiver": "D'après les entrées, l'asthme de {name} est ",
    "asthma-control-status-header-controlled-p2": "sous contrôle.",
    "asthma-control-status-header-not-controlled-p1": "Selon vos entrées, votre asthme n'est pas ",
    "asthma-control-status-header-not-controlled-p1-caregiver": "D'après les entrées, l'asthme de {name} est ",
    "asthma-control-status-header-not-controlled-p2": "sous contrôle.",
    "asthma-control-status-header-not-controlled-stat-symptom-days": "Jours de symptômes",
    "asthma-control-status-header-not-controlled-stat-rescue-inhaler": "Inhalateur de secours",
    "asthma-control-status-header-not-controlled-stat-limited-activity": "Activité limitée",
    "asthma-control-status-header-not-controlled-stat-awakenings": "Réveils",
    "asthma-action-plan-manager-title": "Plan d'action contre l'asthme",
    "asthma-action-plan-manager-instructions": "Enregistrez une photo de votre plan d'action contre l'asthme pour une référence facile.",
    "asthma-action-plan-manager-instructions-caregiver": "Enregistrez une photo du plan d'action de l'asthme de {name} pour un accès facile.",
    "asthma-action-plan-manager-learn-more": "Qu'est-ce qu'un plan d'action contre l'asthme?",
    "asthma-action-plan-manager-edit-button-text": "Modifier",
    "asthma-action-plan-manager-not-found-text": "Appuyez pour ajouter une photo",
    "asthma-biometrics-title": "Santé & Activité",
    "asthma-biometrics-daytime-resting-heart-rate-label": "Fréquence cardiaque au repos (jour)",
    "asthma-biometrics-nighttime-resting-heart-rate-label": "Fréquence cardiaque au repos (nuit)",
    "asthma-biometrics-beats-per-minute-units": "BPM",
    "asthma-biometrics-respiratory-rate-label": "Fréquence respiratoire",
    "asthma-biometrics-breaths-per-minute-units": "BPM",
    "asthma-biometrics-steps-label": "Pas",
    "asthma-biometrics-daytime-blood-oxygen-level-label": "Saturation en oxygène (jour)",
    "asthma-biometrics-nighttime-blood-oxygen-level-label": "Saturation en oxygène (nuit)",
    "asthma-biometrics-percent-units": "%",
    "asthma-biometrics-sleep-disturbances-label": "Perturbations du sommeil",
    "asthma-air-qualities-title": "Qualité de l'air",
    "asthma-air-qualities-setup-button-text": "+ Configuration",
    "asthma-air-qualities-home-aqi-label": "Indice de qualité de l'air (Domicile)",
    "asthma-air-qualities-work-aqi-label": "Indice de qualité de l'air (Travail)",
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
    "asthma-log-entry-details-component-no-data-p1": "Aucun(e) ",
    "asthma-log-entry-details-component-no-data-p2": " enregistré(e)",
    "asthma-log-entry-header-today-log-label": "Aujourd'hui",
    "asthma-log-entry-header-yesterday-log-label": "Hier",
    "asthma-log-entry-header-not-logged-yet": "Pas encore enregistré",
    "asthma-log-entry-header-add-button-text": "Enregistrer l'entrée",
    "asthma-activity-view-title": "Activité",
    "asthma-activity-view-chart-title": "Pas",
    "asthma-activity-view-alert-message": "Votre activité est en dessous de votre niveau normal.",
    "asthma-alert-takeover-message": "Plusieurs points de données sont en dehors de vos niveaux normaux.",
    "asthma-air-quality-view-title": "Qualité de l'air",
    "asthma-air-quality-view-home-aqi-chart-title": "Qualité de l'air (Domicile)",
    "asthma-air-quality-view-home-aqi-alert-message": "Votre AQI à domicile est mauvaise pour la santé.",
    "asthma-air-quality-view-work-aqi-chart-title": "Qualité de l'air (Travail)",
    "asthma-air-quality-view-work-aqi-alert-message": "Votre AQI au travail est mauvaise pour la santé.",
    "asthma-heart-and-lungs-view-title": "Cœur & Poumons",
    "asthma-heart-and-lungs-view-dhr-chart-title": "Fréquence cardiaque au repos (Jour)",
    "asthma-heart-and-lungs-view-dhr-alert-message": "Votre fréquence cardiaque au repos pendant la journée est au-dessus de votre niveau normal.",
    "asthma-heart-and-lungs-view-nhr-chart-title": "Fréquence cardiaque au repos (Nuit)",
    "asthma-heart-and-lungs-view-nhr-alert-message": "Votre fréquence cardiaque au repos pendant la nuit est au-dessus de votre niveau normal.",
    "asthma-heart-and-lungs-view-rr-chart-title": "Fréquence respiratoire",
    "asthma-heart-and-lungs-view-rr-alert-message": "Votre fréquence respiratoire est au-dessus de votre niveau normal.",
    "asthma-heart-and-lungs-view-dbol-chart-title": "Oxygène dans le sang (Jour)",
    "asthma-heart-and-lungs-view-dbol-alert-message": "Votre taux d'oxygène dans le sang pendant la journée est en dessous de votre niveau normal.",
    "asthma-heart-and-lungs-view-nbol-chart-title": "Oxygène dans le sang (Nuit)",
    "asthma-heart-and-lungs-view-nbol-alert-message": "Votre taux d'oxygène dans le sang pendant la nuit est en dessous de votre niveau normal.",
    "asthma-sleep-view-title": "Sommeil",
    "asthma-sleep-view-chart-title": "Perturbations du sommeil",
    "asthma-sleep-view-alert-message": "Vos perturbations du sommeil sont au-dessus de votre niveau normal.",
    "asthma-log-entry-editor-view-symptom-level-title": "Niveau de symptôme",
    "asthma-log-entry-editor-view-select-one-subtitle": "Sélectionnez un",
    "asthma-log-entry-editor-view-select-all-subtitle": "Sélectionnez tout ce qui s'applique",
    "asthma-log-entry-editor-view-symptoms-title": "Symptômes",
    "asthma-log-entry-editor-view-impacts-title": "Impacts",
    "asthma-log-entry-editor-view-triggers-title": "Déclencheurs",
    "asthma-air-quality-description-unhealthy": "Malsaine",
    "asthma-air-quality-description-very-unhealthy": "Très malsaine",
    "asthma-air-quality-description-hazardous": "Dangereuse",
    "asthma-recommended-article-21-title": "Comment garder votre asthme sous contrôle",
    "asthma-recommended-article-21-subtitle": "Restez sans symptômes en respectant votre plan de traitement, en comprenant les déclencheurs et en reconnaissant tôt les changements de contrôle.",
    "asthma-recommended-article-22-title": "Votre asthme est-il sous contrôle?",
    "asthma-recommended-article-22-subtitle": "4 questions pour évaluer si votre asthme est sous contrôle. Si vous ressentez des symptômes plus de 2 fois par semaine ou si vous vous réveillez la nuit à cause de symptômes d'asthme, votre asthme n'est pas sous contrôle.",
    "asthma-recommended-article-24-title": "Naviguer dans la zone de danger: Préparation aux exacerbations d'asthme",
    "asthma-recommended-article-24-subtitle": "Reconnaître tôt les symptômes graves tels que la toux intense et l'essoufflement, et activer votre plan d'action pour l'asthme personnalisé, y compris les médicaments immédiats.",
    "asthma-recommended-article-25-title": "Prendre en charge votre asthme",
    "asthma-recommended-article-25-subtitle": "Lorsque votre asthme semble ingérable, il est temps de réévaluer votre approche. Les étapes à suivre lorsque votre asthme n'est pas sous contrôle.",
    "asthma-recommended-article-32-title": "Qui a besoin d'une médication de contrôle?",
    "asthma-recommended-article-32-subtitle": "Découvrez le rôle crucial des médicaments de contrôle pour maintenir l'asthme sous contrôle.",
    "asthma-recommended-article-33-title": "Accès aux médicaments",
    "asthma-recommended-article-33-subtitle": "Lorsque le coût est un obstacle aux médicaments, découvrez des médicaments gratuits ou à faible coût. Prendre les médicaments prescrits est important pour maintenir le contrôle de l'asthme.",
    "asthma-recommended-article-34-title": "Renouvellement des médicaments",
    "asthma-recommended-article-34-subtitle": "Restez à jour sur vos médicaments contre l'asthme avec des stratégies de renouvellement faciles.",
    "asthma-recommended-article-35-title": "Problèmes pour se souvenir des médicaments",
    "asthma-recommended-article-35-subtitle": "Découvrez des stratégies simples mais efficaces pour vous rappeler vos doses quotidiennes, des conseils de stockage intelligents à l'utilisation des rappels d'applications.",
    "asthma-recommended-article-36-title": "Quel inhalateur utiliser et quand",
    "asthma-recommended-article-36-subtitle": "Maîtrisez la gestion de votre asthme : L'inhalateur de secours agit rapidement pour soulager les symptômes tandis que celui de contrôle est préventif et agit en réduisant l'inflammation, généralement pris quotidiennement.",
    "asthma-recommended-article-37a-title": "Technique d'inhalateur - MDI",
    "asthma-recommended-article-37a-subtitle": "Conseils pour la technique de l'inhalateur à dose mesurée (MDI). Sans la bonne technique, vous ne recevez peut-être qu'une partie de la dose.",
    "asthma-recommended-article-37b-title": "Technique d'inhalateur - DPI",
    "asthma-recommended-article-37b-subtitle": "Conseils pour la technique de l'inhalateur de poudre sèche (DPI). Sans la bonne technique, vous ne recevez peut-être qu'une partie de la dose.",
    "asthma-recommended-article-37c-title": "Technique d'inhalateur - SMI",
    "asthma-recommended-article-37c-subtitle": "Conseils pour la technique de l'inhalateur à brume douce (SMI). Sans la bonne technique, vous ne recevez peut-être qu'une partie de la dose.",
    "asthma-recommended-article-37d-title": "Technique de nébuliseur",
    "asthma-recommended-article-37d-subtitle": "Conseils pour la technique de nébuliseur.",
    "asthma-recommended-article-38-title": "Pourquoi dois-je prendre mon médicament de contrôle?",
    "asthma-recommended-article-38-subtitle": "Comprenez le rôle essentiel des médicaments de contrôle et pourquoi ils sont une pierre angulaire de votre plan de gestion personnalisé.",
    "asthma-recommended-article-39-title": "Effets secondaires des médicaments contre l'asthme",
    "asthma-recommended-article-39-subtitle": "Apprenez à identifier les effets secondaires courants et rares, et les mesures simples que vous pouvez prendre pour éviter l'effet secondaire courant - le muguet (infection fongique dans la bouche).",
    "asthma-recommended-article-39a-title": "Comment savoir si mes médicaments contre l'asthme fonctionnent?",
    "asthma-recommended-article-39a-subtitle": "Les médicaments de contrôle peuvent prendre des jours à des semaines pour atteindre leur plein effet. Suivez vos symptômes quotidiennement pour voir s'il y a une amélioration et s'il n'y en a pas, parlez-en à votre fournisseur.",
    "asthma-recommended-article-41-title": "Déclencheurs surprises",
    "asthma-recommended-article-41-subtitle": "Découvrez des déclencheurs d'asthme inattendus dans votre vie quotidienne, des AINS (comme l'ibuprofène) à votre verre de vin. Savoir ce qu'il faut rechercher peut vous aider à identifier ces déclencheurs surprises.",
    "asthma-recommended-article-42-title": "Asthme et allergènes saisonniers/pollen",
    "asthma-recommended-article-42-subtitle": "Naviguez facilement dans la saison des pollens : Identifiez vos déclencheurs spécifiques de pollen, comprenez leurs schémas saisonniers et apprenez à minimiser l'exposition.",
    "asthma-recommended-article-43-title": "Asthme et qualité de l'air",
    "asthma-recommended-article-43-subtitle": "Comprenez que la mauvaise qualité de l'air peut déclencher l'asthme. Apprenez à naviguer les jours avec un AQI élevé et ce que signifient les niveaux d'AQI.",
    "asthma-recommended-article-43a-title": "Asthme et infections respiratoires",
    "asthma-recommended-article-43a-subtitle": "Les infections respiratoires sont des déclencheurs courants de l'asthme. Comment les prévenir et que faire lorsqu'elles surviennent.",
    "asthma-recommended-article-43b-title": "Asthme et animaux",
    "asthma-recommended-article-43b-subtitle": "Les animaux/animaux de compagnie peuvent être un déclencheur de l'asthme. Apprenez à diagnostiquer une allergie aux animaux/animaux de compagnie et les mesures à prendre pour réduire l'impact.",
    "asthma-recommended-article-43c-title": "Asthme et fumée",
    "asthma-recommended-article-43c-subtitle": "Les incendies de forêt et la fumée de tabac peuvent déclencher l'asthme. Découvrez les mesures que vous pouvez prendre pour réduire votre exposition.",
    "asthma-recommended-article-43d-title": "Asthme et météo",
    "asthma-recommended-article-43d-subtitle": "Les déclencheurs météorologiques courants sont l'air froid, l'air chaud et humide, et la pluie/les orages. Explorez pourquoi ceux-ci peuvent déclencher l'asthme.",
    "asthma-recommended-article-43e-title": "Odeurs fortes et produits chimiques/produits de nettoyage",
    "asthma-recommended-article-43e-subtitle": "Découvrez quelles odeurs peuvent déclencher votre asthme et ce à quoi vous devez penser lors du nettoyage.",
    "asthma-recommended-article-43f-title": "Asthme et poussière/acariens",
    "asthma-recommended-article-43f-subtitle": "La poussière est un déclencheur d'asthme courant, mais la raison pour laquelle elle est un déclencheur peut vous surprendre!",
    "asthma-recommended-article-43g-title": "Asthme et moisissure",
    "asthma-recommended-article-43g-subtitle": "La moisissure a besoin d'humidité pour se développer, elle se trouve donc généralement dans des endroits humides ou mouillés. Apprenez comment prévenir la moisissure dans votre maison.",
    "asthma-recommended-article-43h-title": "Asthme et brûlures d'estomac",
    "asthma-recommended-article-43h-subtitle": "Qu'est-ce que les brûlures d'estomac et quel est leur lien avec l'asthme?",
    "blood-type": "Groupe sanguin",
    "device-data-month-chart-no-data": "Pas de données",
    "device-data-month-chart-daily-average": "Moyenne quotidienne",
    "term-information-not-found-header": "Aucune Information Trouvée",
    "term-information-not-found-body": "Impossible de trouver des informations sur ce sujet",
    "term-information-disclaimer": "<strong>AVERTISSEMENT :</strong> Les informations fournies ne constituent pas un avis médical. Elles sont destinées à vous aider à mieux comprendre votre santé. Veuillez contacter votre fournisseur de soins de santé si vous avez des questions concernant votre état de santé.",
    "term-information-view-on-medline": "Voir sur MedlinePlus",
    "type": "Type",
    "location": "Emplacement",
    "description": "Description",
    "performed-by": "Réalisé par",
    "verified-by": "Vérifié par",
    "normal-range": "Plage normale",
    "more": "Plus",
    "procedure": "Procédure",
    "procedures": "Procédures",
    "lab-report": "Rapport de Laboratoire",
    "service-performed": "Service Réalisé",
    "services-performed": "Services Réalisés",
    "device-data-month-chart-minutes": "Minutes",
    "device-data-month-chart-sleep": "Sommeil",
    "air-quality-home": "Qualité de l'Air (Domicile)",
    "air-quality-work": "Qualité de l'Air (Travail)",
    "sedentary-time": "Temps Sédentaire",
    "active-time": "Temps Actif",
    "lightly-active-time": "Temps Légèrement Actif",
    "fairly-active-time": "Temps Modérément Actif",
    "very-active-time": "Temps Très Actif",
    "breathing-rate": "Fréquence Respiratoire",
    "calories-burned": "Calories Brûlées",
    "elevated-heart-rate-time": "Temps avec Fréquence Cardiaque Élevée",
    "fat-burn-heart-rate-time": "Temps de Combustion des Graisses",
    "cardio-heart-rate-time": "Temps de Cardio",
    "peak-heart-rate-time": "Temps de Fréquence Cardiaque Maximale",
    "floors-climbed": "Étages Gravis",
    "heart-rate-variability": "Variabilité de la Fréquence Cardiaque",
    "sleep-time": "Temps de Sommeil",
    "light-sleep-time": "Temps de Sommeil Léger",
    "deep-sleep-time": "Temps de Sommeil Profond",
    "rem-sleep-time": "Temps de Sommeil REM",
    "spo2": "SpO2",
    "heart-rate-range": "Plage de Fréquence Cardiaque",
    "max-heart-rate": "Fréquence Cardiaque Maximale",
    "core-sleep-time": "Temps de Sommeil Profond",
    "in-bed-time": "Temps au Lit",
    "stand-time": "Temps Debout",
    "walking-heart-rate-average": "Moyenne de la Fréquence Cardiaque en Marchant",
    "active-energy-burned": "Énergie Active Brûlée",
    "number-of-alcoholic-beverages": "Nombre de boissons alcoolisées",
    "active-calories": "Calories Actives",
    "resting-calories": "Calories au Repos",
    "total-calories": "Calories Totales",
    "min-heart-rate": "Fréquence Cardiaque Minimale",
    "average-heart-rate": "Fréquence Cardiaque Moyenne",
    "max-stress-level": "Niveau de Stress Maximum",
    "average-stress-level": "Niveau de Stress Moyen",
    "total-stress-time": "Temps Total de Stress",
    "low-stress-time": "Temps de Faible Stress",
    "medium-stress-time": "Temps de Stress Modéré",
    "high-stress-time": "Temps de Fort Stress",
    "awake-time": "Temps Éveillé",
    "sleep-score": "Score de Sommeil",
    "bpm": "bpm",
    "hours-abbreviation": "h",
    "minutes-abbreviation": "m",
    "points-until-next-badge": "{{points}} points avant la prochaine badge",
    "fitbit-wear-time": "Temps de port du Fitbit",
    "my-badges": "Mes badges ({{badges}})",
    "new-badge-title": "Bon travail !",
    "new-badge-text": "Vous avez obtenu un nouveau badge !",
    "get-badge": "Obtenir un badge",
    "glucose-chart-no-data": "Aucune lecture de glycémie",
    "glucose-stats-range-label": "Plage de glycémie",
    "glucose-stats-avg-label": "Glycémie moyenne",
    "glucose-stats-steps-label": "Pas",
    "glucose-stats-sleep-label": "Sommeil",
    "stress-level-title": "Stress global",
    "stress-level-min-label": "Aucun stress",
    "stress-level-max-label": "Extrêmement stressé",
    "meal-type-meal": "Repas",
    "meal-type-snack": "Snack",
    "meal-type-drink": "Boisson",
    "meal-log-title": "Journal des repas",
    "meal-log-no-data": "Aucun repas enregistré",
    "meal-editor-time-input-label": "Heure",
    "meal-editor-description-input-label": "Description",
    "meal-editor-description-optional": "Optionnel",
    "meal-editor-duplicate-timestamp-error": "Deux repas ne peuvent pas avoir la même heure.",
    "glucose-view-title": "Surveillance de la glycémie",
    "ai-assistant-loading": "Interagir avec vos données...",
    "ai-assistant-suggestion-avg-weekly-heart-rate": "Quelle est ma fréquence cardiaque moyenne de la semaine dernière ?",
    "ai-assistant-suggestion-highest-heart-rate-week": "Quelle a été ma fréquence cardiaque maximale cette semaine ?",
    "ai-assistant-suggestion-graph-daily-steps-21-days": "Fais un graphique de mes pas quotidiens pour les 21 derniers jours",
    "ai-assistant-suggestion-weekly-workouts-average-month": "Combien d'entraînements par semaine ai-je fait en moyenne ce mois-ci ?",
    "ai-assistant-suggestion-avg-monthly-blood-pressure": "Quelle est ma tension artérielle moyenne du dernier mois ?",
    "ai-assistant-suggestion-daily-active-minutes-month": "Quelle est ma moyenne quotidienne de minutes actives ce mois-ci ?",
    "ai-assistant-suggestion-resting-heart-rate-change-month": "Comment ma fréquence cardiaque au repos a-t-elle changé au cours du dernier mois ?",
    "ai-assistant-suggestion-stand-ups-yesterday": "À quelle fréquence me suis-je levé hier ?",
    "ai-assistant-suggestion-graph-heart-rate-trends-workouts": "Peux-tu tracer les tendances de ma fréquence cardiaque pendant les entraînements de cette semaine ?",
    "ai-assistant-suggestion-sleep-7-days": "Comment s'est passé mon sommeil ces 7 derniers jours ?",
    "ai-assistant-suggestion-fall-asleep-time-2-weeks": "À quelle heure me suis-je généralement endormi au cours des 2 dernières semaines ?",
    "ai-assistant-suggestion-sleep-quality-change-month": "Comment la qualité de mon sommeil a-t-elle changé au cours du dernier mois ?",
    "ai-assistant-suggestion-last-tetanus-vaccine": "Quand ai-je reçu mon dernier vaccin contre le tétanos ?",
    "ai-assistant-suggestion-last-blood-test-lab-work": "Quand ai-je fait mon dernier test sanguin ou examen de laboratoire ?",
    "ai-assistant-suggestion-abnormal-lab-results": "Ai-je des résultats de laboratoire anormaux ?",
    "ai-assistant-suggestion-last-cbc-test": "Quand a eu lieu ma dernière numération globulaire complète (CBC) ?",
    "ai-assistant-suggestion-glucose-a1c-levels-last-test": "Quels étaient mes niveaux de glucose et A1c lors de mon dernier test ?",
    "ai-assistant-suggestion-graph-cholesterol-trends": "Peux-tu me montrer un graphique de l'évolution de mes niveaux de cholestérol au fil du temps ?",
    "ai-assistant-suggestion-last-metabolic-panel": "Quand a eu lieu mon dernier bilan métabolique ?",
    "ai-assistant-suggestion-hemoglobin-levels-trend": "Quelle est la tendance de mes niveaux d'hémoglobine ?",
    "ai-assistant-suggestion-show-files": "Montre-moi mes fichiers.",
    "ai-assistant-suggestion-save-graph-to-files": "Enregistre le graphique dans mes fichiers",
    "mindful-minutes": "Minutes de Pleine Conscience",
    "therapy-minutes": "Minutes de Thérapie",
    "insight-matrix-no-comparison-data": "Aucun type de données de comparaison configuré.",
    "allergylist-reactions": "Réactions",
    "points-abbreviation": "pts",
    "no-data": "Pas de données",
    "no-data-yet": "Pas encore de données",
    "bp-low": "Bas",
    "bp-normal": "Normal",
    "bp-elevated": "Élevé",
    "bp-stage1": "Stade 1",
    "bp-stage2": "Stade 2",
    "bp-crisis": "Crise",
    "bp-unknown": "Inconnu",
    "device-not-enabled": "@@DEVICE@@ n'est pas activé pour ce projet.",
    "download-pdf-report": "Télécharger le rapport PDF",
    "connect-to-device": "Connecter à @@DEVICE@@",
    "symptoms-and-treatments": "Symptômes et traitements",
    "subsequent-evaluation-note": "Note d'évaluation ultérieure",
    "summary": "Résumé"
};

export default strings;