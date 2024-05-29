﻿let strings: { [key: string]: string } = {
    "back": "Atrás",
    "done": "Aceptar",
    "close": "Cerrar",
    "save": "Ahorrar",
    "add": "Agregar",
    "settings": "Configuración",
    "connect": "Conectar",
    "reconnect": "Volver a conectar",
    "refresh": "Actualizar",
    "remove": "Eliminar",
    "help": "Ayuda",
    "view": "Ver",
    "health-records": "Registros de salud",
    "connect-ehr-title-prefix": "Conectar ",
    "connect-ehr-title-divider": " o ",
    "connect-ehr-title-providers": "proveedor",
    "connect-ehr-title-health-plans": "plan de salud",
    "connect-ehr-connected": "¡Estamos recibiendo su información de EHR!",
    "connect-ehr-needs-attention": "Una de tus cuentas requiere atención.",
    "connect-ehr-text": "Sus registros electrónicos de salud son una fuente de información importante. Con ellos, usted podría ayudar a los investigadores de la salud a realizar nuevos descubrimientos. Conecte a su proveedor o a su plan de salud (por ejemplo: Medicare) con @@PROJECT_NAME@@.",
    "connect-ehr-text-connected": "Gracias por compartir tus datos de EHR con @@PROJECT_NAME@@. Conecta a otro proveedor para compartir más datos o administrar tus conexiones de EHR.",
    "connect-ehr-not-enabled": "EHR enlacando no está habilitado para este proyecto.",
    "search-for-provider": "Encontrar a mi Proveedor",
    "expired-reconnect": "Volver a conectar",
    "connect-error-reconnect": "Error imprevisto.  Volver a conectar.",
    "connected": "Conectado",
    "search": "Buscar",
    "connect-fitbit-intro": "Si ya tiene una cuenta Fitbit, puede compartir información desde allí. Para empezar, presione el siguiente botón para ingresar a su cuenta de Fitbit:",
    "connect-fitbit-button": "Conectar a Fitbit",
    "received-fitbit-data": "¡Estamos recibiendo su información de Fitbit!",
    "connect-garmin-intro": "Si ya tiene una cuenta Garmin, puede compartir información desde allí. Para empezar, presione el siguiente botón para ingresar a su cuenta de Garmin:",
    "connect-garmin-button": "Conectar a Garmin",
    "received-garmin-data": "¡Estamos recibiendo su información de Garmin!",
    "downloading-data": "Descargando datos...",
    "downloading-data-menu": "Descargando Datos",
    "all-tasks-complete": "¡Todas las tareas terminadas!",
    "view-all": "Ver todo",
    "tasks": "Tareas",
    "incomplete-tasks": "Tareas incompletas",
    "completed-tasks": "Tareas completadas",
    "overdue": "Vencidos",
    "due-today": "Vence hoy",
    "due-tomorrow": "Vence mañana",
    "due": "Vence",
    "due-in": "Vencido en",
    "days": "dias",
    "notifications": "Notificaciones",
    "support": "Soporte",
    "all-notifications": "Todas las notificaciones",
    "steps": "Pasos",
    "resting-heart-rate": "Ritmo cardíaco en reposo",
    "distance-traveled": "Distancia Viajada",
    "google-fit-share": "Toca para compartir datos de condición físic",
    "devices": "Dispositivos",
    "last-sync": "Última sincronización",
    "completed": "Completadas",
    "ehr-intro": "Sus registros de salud electrónicos son fuentes importantes de información. Pueden ayudar a investigadores hacer nuevos descubrimientos.",
    "external-accounts-title-divider": " / ",
    "external-accounts-title-providers": "Proveedores",
    "external-accounts-title-health-plans": "Planes de Salud",
    "external-accounts-title-devices": "Dispositivos",
    "external-accounts-error": "Una de tus cuentas requiere atención",
    "external-accounts-loading": "Actualmente tus datos se están descargando de tus planes de salud y proveedores vinculados. Por favor, vuelve a consultar en unos momentos para ver tus datos.",
    "external-account-authorization-expired": "Venció la autorización",
    "external-account-fetching-data": "Recuperando datos",
    "external-account-deleting": "Eliminando...",
    "external-account-last-updated": "Última actualización",
    "external-account-error": "Error imprevisto",
    "external-account-reconnect": "Volver a conectar",
    "external-account-refresh": "Actualizar",
    "external-account-remove": "Eliminar",
    "device-data-no-data": "Si ha conectado Apple Health, Google Fit, Fitbit o Garmin, vuelva más tarde para ver sus datos.",
    "no-notifications-received": "No se recibieron notificaciones.",
    "next-button-text": "Siguiente",
    "lab-results-title": "Resultados de laboratorio",
    "medications-title": "Medicamentos",
    "immunizations-title": "Vacunas",
    "reports-title": "Informes",
    "allergies-title": "Alergias",
    "conditions-title": "Enfermedades",
    "procedures-title": "Procedimientos",
    "app-download-title": "Siguiente: Descarga la aplicación",
    "app-download-subtitle": "La descarga de la aplicación MyDataHelps hace que sea aún más fácil participar en @@PROJECT_NAME@@.",
    "app-download-google-play-link-alt": "Descargar en Google Play Store",
    "app-download-app-store-link-alt": "Descargar en la tienda de aplicaciones de Apple",
    "start": "Inicio",
    "resume": "Continuar",
    "start-survey": "Iniciar encuesta",
    "resume-survey": "Reanudar encuesta",
    "30-day-average": "Promedio de 30 días",
    "today": "Hoy",
    "yesterday": "Ayer",
    "tap-to-log-today": "Pulse aquí para registrar sus síntomas o tratamientos.",
    "mild": "Leve",
    "moderate": "Moderado",
    "severe": "Grave",
    "severe-shortened": "graves",
    "moderate-shortened": "mod",
    "mild-shortened": "leves",
    "log-todays-symptoms": "Registra los síntomas de hoy",
    "todays-log": "Registro de hoy",
    "symptoms": "Síntomas",
    "treatments": "Tratamientos",
    "symptoms-experiencing-today": "¿Qué síntomas está experimentando?",
    "symptoms-experiencing-previous": "¿Qué síntomas estaba experimentando?",
    "treatments-experiencing-today": "¿Qué tratamientos ha hecho?",
    "treatments-experiencing-previous": "¿Qué tratamientos hizo?",
    "feeling-overall-today": "¿Cómo se siente en general?",
    "feeling-overall-previous": "¿Cómo se sentía en general?",
    "additional-notes": "¿Alguna nota adicional?",
    "how-severe-is": "¿Cuál es la gravedad de su",
    "how-severe-was": "¿Cuál era la gravedad de su",
    "clear-symptom": "Eliminar síntomas",
    "add-notes": "Agregar notas",
    "notes": "Notas",
    "enter-symptom-name": "Ingresar el nombre del síntoma",
    "enter-treatment-name": "Ingresar el nombre del tratamiento",
    "severity-tracking-none": "No hacer un seguimiento de la gravedad",
    "severity-tracking-3point": "Calificación leve/moderado/grave",
    "severity-tracking-10point": "Calificación de 1 a 10 puntos",
    "muted": "Silenciado",
    "not-muted": "No silenciado",
    "delete": "Eliminar",
    "severity": "Gravedad",
    "item-delete-warning": "Advertencia: Si continúa, se eliminarán de forma permanente los siguientes elementos y todos los datos asociados de sus registros. Si no desea eliminar estos elementos, seleccione \"Cancelar\".",
    "unsaved-changes": "Cambios no guardados",
    "daily-overall-experience": "Experiencia general diaria",
    "average": "Promedio",
    "include-symptoms": "Incluir síntomas",
    "select-symptoms": "Seleccionar síntomas",
    "include-treatments": "Incluir tratamientos",
    "select-treatments": "Seleccionar tratamientos",
    "download-mydatahelps": "Descargar MyDataHelps",
    "connect-devices-title": "Conectar aparatos",
    "connect-devices-text": "Comparta datos de sus dispositivos portátiles, aplicaciones y otros aparatos.",
    "apple-health-troubleshooting-intro": "Si no aprobó o ha desactivado el uso compartido de sus datos de Apple Health y desea habilitarlo, siga estos pasos:",
    "apple-health-troubleshooting-li-1": "Abra la aplicación \"Ajustes\"",
    "apple-health-troubleshooting-li-2": "Seleccione \"Privacidad\"",
    "apple-health-troubleshooting-li-3": "Seleccione \"Salud\"",
    "apple-health-troubleshooting-li-4": "Seleccione \"MyDataHelps\"",
    "apple-health-troubleshooting-li-5": "Habilite las categorías de datos que le gustaría compartir",
    "how-to-enable": "Cómo activar",
    "new-points-title": "¡Bien hecho!",
    "new-points-text": "Se le han otorgado puntos por lo siguiente:",
    "new-points-next-reward-prefix": "Ahora necesitas ",
    "new-points-next-reward-suffix": " puntos para desbloquear tu próxima recompensa.",
    "new-points-done-button-text": "Hecho",
    "systolic-average": "Promedio Sistólico",
    "diastolic-average": "Promedio Diastólico",
    "highest-systolic": "Sistólica más Alta",
    "lowest-systolic": "Sistólica más Baja",
    "resource-default-button-text": "Abierto",
    "inbox-message-completed-status": "VISTO",
    "inbox-resource-completed-status": "VISTO",
    "inbox-survey-completed-status": "TERMINADO",
    "inbox-history-view-title": "Historial de Bandeja de Entrada",
    "inbox-history-view-empty-text": "No tienes elementos en el historial de bandeja de entrada.",
    "inbox-message-view-related-resources-title": "Relacionado",
    "inbox-view-title": "Bandeja de Entrada",
    "inbox-view-empty-text": "No tienes nuevos elementos en tu bandeja de entrada.",
    "inbox-view-messages-title": "Mensajes",
    "inbox-view-surveys-title": "Encuestas",
    "inbox-view-resources-title": "Recursos",
    "inbox-view-recently-completed-title": "Reciente",
    "inbox-view-recently-completed-empty-text": "No tienes elementos recientemente completados en tu bandeja de entrada.",
    "inbox-view-history-button-text": "Ver historial de bandeja de entrada",
    "choose-report-month": "Elegir el mes del informe",
    "include-overall-experience": "Incluir la experiencia general diaria",
    "include-notes": "Incluir notas",
    "create-report": "Crear informe",
    "reports": "Informes",
    "recent-daily-data-bar-chart-subtitle": "Últimos 7 días",
    "recent-daily-data-bar-chart-no-data": "Sin datos",
    "resource-list-empty-text": "No se encontraron recursos.",
    "asthma-symptom-level-none": "Sin síntomas",
    "asthma-symptom-level-mild": "Síntomas leves",
    "asthma-symptom-level-moderate": "Síntomas moderados",
    "asthma-symptom-level-severe": "Síntomas graves",
    "asthma-symptom-difficulty-breathing": "Dificultad para respirar",
    "asthma-symptom-wheezing": "Sibilancias",
    "asthma-symptom-coughing": "Toser",
    "asthma-symptom-chest-tightness": "Opresión en el pecho",
    "asthma-impact-limit-daily-activity": "Limita tu actividad diaria",
    "asthma-impact-waking-at-night": "Despertarse por la noche",
    "asthma-impact-using-rescue-inhaler": "Usa tu inhalador de rescate",
    "asthma-trigger-cold-illness": "Enfermedad viral/resfriado",
    "asthma-trigger-animal-exposure": "Exposición a animales",
    "asthma-trigger-seasonal-allergens": "Alergenos estacionales/polen",
    "asthma-trigger-smoke": "Humo",
    "asthma-trigger-weather-changes": "Cambios extremos de clima",
    "asthma-trigger-air-pollution": "Contaminación del aire",
    "asthma-trigger-strong-smells": "Olores fuertes",
    "asthma-trigger-chemicals": "Productos químicos/materiales de limpieza",
    "asthma-trigger-dust": "Polvo",
    "asthma-trigger-mold": "Moho",
    "asthma-trigger-dust-mites": "Ácaros del polvo",
    "asthma-trigger-rodents": "Roedores",
    "asthma-trigger-cockroaches": "Cucarachas",
    "asthma-trigger-nsaid": "AINE/Aspirina",
    "asthma-trigger-beta-blocker": "Bloqueador beta",
    "asthma-trigger-heartburn": "Acidez estomacal/Reflujo",
    "asthma-trigger-red-wine": "Vino tinto",
    "asthma-trigger-new-foods": "Alimentos nuevos",
    "asthma-trigger-cooked-without-ventilation": "Cocinar (sin ventilación)",
    "asthma-trigger-pet-in-bed": "Mascota en tu cama",
    "asthma-trigger-incense-or-candle": "Vela/incienso",
    "asthma-data-status-out-of-range": "Fuera de rango",
    "asthma-data-status-in-range": "Dentro de rango",
    "asthma-data-status-offline": "Desconectado",
    "asthma-data-status-establishing": "Estableciendo",
    "asthma-data-status-not-determined": "No se ha establecido una línea base",
    "asthma-data-status-not-found": "No se encontraron datos",
    "asthma-data-status-not-configured": "No configurado",
    "asthma-control-calendar-daily-entry-missed": "Entrada diaria omitida",
    "asthma-control-calendar-not-logged-yet": "No ingresado todavía",
    "asthma-control-calendar-log-entries-symptoms-label": "Síntomas",
    "asthma-control-calendar-log-entries-impacts-label": "Impactos",
    "asthma-control-calendar-log-entries-triggers-label": "Disparadores",
    "asthma-control-status-header-multiple-out-of-range-p1": "Varios puntos de datos están ",
    "asthma-control-status-header-multiple-out-of-range-p2": "fuera de tus niveles normales",
    "asthma-control-status-header-multiple-out-of-range-p3": ". Completa tu registro diario.",
    "asthma-control-status-header-abnormal-heart-rate-p1": "Tu frecuencia cardíaca en reposo está ",
    "asthma-control-status-header-abnormal-heart-rate-p2": "por encima de tu nivel normal",
    "asthma-control-status-header-abnormal-heart-rate-p3": ". Completa tu registro diario.",
    "asthma-control-status-header-abnormal-respiratory-rate-p1": "Tu frecuencia respiratoria está ",
    "asthma-control-status-header-abnormal-respiratory-rate-p2": "por encima de tu nivel normal",
    "asthma-control-status-header-abnormal-respiratory-rate-p3": ". Completa tu registro diario.",
    "asthma-control-status-header-abnormal-steps-p1": "Tu actividad está ",
    "asthma-control-status-header-abnormal-steps-p2": "por debajo de tus niveles normales",
    "asthma-control-status-header-abnormal-steps-p3": ". Completa tu registro diario.",
    "asthma-control-status-header-abnormal-sleep-p1": "Tus trastornos del sueño están ",
    "asthma-control-status-header-abnormal-sleep-p2": "por encima de tu nivel normal",
    "asthma-control-status-header-abnormal-sleep-p3": ". Completa tu registro diario.",
    "asthma-control-status-header-abnormal-blood-oxygen-p1": "Tu nivel de oxígeno en la sangre está ",
    "asthma-control-status-header-abnormal-blood-oxygen-p2": "por debajo de tu nivel normal",
    "asthma-control-status-header-abnormal-blood-oxygen-p3": ". Completa tu registro diario.",
    "asthma-control-status-header-abnormal-home-aqi-p1": "El Índice de Calidad del Aire en tu hogar ",
    "asthma-control-status-header-abnormal-home-aqi-p2": ". Completa tu registro diario.",
    "asthma-control-status-header-abnormal-work-aqi-p1": "El Índice de Calidad del Aire en tu trabajo ",
    "asthma-control-status-header-abnormal-work-aqi-p2": ". Completa tu registro diario.",
    "asthma-control-status-header-no-data": "Agrega un registro diario para evaluar el control de tu asma.",
    "asthma-control-status-header-not-determined": "Se necesitan más registros diarios para evaluar el control de tu asma.",
    "asthma-control-status-header-controlled-p1": "Basado en tus registros, tu asma ",
    "asthma-control-status-header-controlled-p2": "está bajo control.",
    "asthma-control-status-header-not-controlled-p1": "Basado en tus registros, tu asma  ",
    "asthma-control-status-header-not-controlled-p2": "no está bajo control.",
    "asthma-control-status-header-not-controlled-stat-symptom-days": "Días con síntomas",
    "asthma-control-status-header-not-controlled-stat-rescue-inhaler": "Inhalador de rescate",
    "asthma-control-status-header-not-controlled-stat-limited-activity": "Actividad limitada",
    "asthma-control-status-header-not-controlled-stat-awakenings": "Despertares",
    "asthma-action-plan-manager-title": "Plan de Acción para el Asma",
    "asthma-action-plan-manager-instructions": "Guarda una foto de tu plan de acción para el asma para referencia fácil.",
    "asthma-action-plan-manager-learn-more": "¿Qué es un plan de acción para el asma?",
    "asthma-action-plan-manager-edit-button-text": "Editar",
    "asthma-action-plan-manager-not-found-text": "Toca para agregar foto",
    "asthma-biometrics-title": "Salud y Actividad",
    "asthma-biometrics-daytime-resting-heart-rate-label": "FC Reposo (Día)",
    "asthma-biometrics-nighttime-resting-heart-rate-label": "FC Reposo (Noche)",
    "asthma-biometrics-beats-per-minute-units": "ppm",
    "asthma-biometrics-respiratory-rate-label": "Frecuencia Respiratoria",
    "asthma-biometrics-breaths-per-minute-units": "bpm",
    "asthma-biometrics-steps-label": "Pasos",
    "asthma-biometrics-daytime-blood-oxygen-level-label": "Saturación de Oxígeno (Día)",
    "asthma-biometrics-nighttime-blood-oxygen-level-label": "Saturación de Oxígeno (Noche)",
    "asthma-biometrics-percent-units": "%",
    "asthma-biometrics-sleep-disturbances-label": "Trastornos del Sueño",
    "asthma-air-qualities-title": "Calidad del Aire",
    "asthma-air-qualities-setup-button-text": "+ Configurar",
    "asthma-air-qualities-home-aqi-label": "ICA (Casa)",
    "asthma-air-qualities-work-aqi-label": "ICA (Trabajo)",
    "asthma-alert-takeover-notice-instructions": "Tómate un momento para registrar cualquier síntoma de asma en un registro diario.",
    "asthma-alert-takeover-notice-add-entry-button-text": "+ Registro Diario",
    "asthma-alert-takeover-notice-not-now-button-text": "Ahora No",
    "asthma-log-entry-details-not-editable": "Registro diario perdido",
    "asthma-log-entry-details-not-logged-yet": "Aún no registrado",
    "asthma-log-entry-details-edit-button-text": "Editar",
    "asthma-log-entry-details-add-button-text": "Registrar Entrada",
    "asthma-log-entry-details-symptoms-label": "Síntomas",
    "asthma-log-entry-details-impacts-label": "Impactos",
    "asthma-log-entry-details-triggers-label": "Disparadores",
    "asthma-log-entry-details-component-no-data-p1": "No se han registrado ",
    "asthma-log-entry-details-component-no-data-p2": "",
    "asthma-log-entry-header-today-log-label": "Hoy",
    "asthma-log-entry-header-yesterday-log-label": "Ayer",
    "asthma-log-entry-header-not-logged-yet": "Aún no registrado",
    "asthma-log-entry-header-add-button-text": "Registrar Entrada",
    "asthma-activity-view-title": "Actividad",
    "asthma-activity-view-chart-title": "Pasos",
    "asthma-activity-view-alert-message": "Tu actividad está por debajo de tu nivel normal.",
    "asthma-alert-takeover-message": "Varios puntos de datos están fuera de tus niveles normales.",
    "asthma-air-quality-view-title": "Calidad del Aire",
    "asthma-air-quality-view-home-aqi-chart-title": "Calidad del Aire (Casa)",
    "asthma-air-quality-view-home-aqi-alert-message": "La ICA de tu hogar no es saludable.",
    "asthma-air-quality-view-work-aqi-chart-title": "Calidad del Aire (Trabajo)",
    "asthma-air-quality-view-work-aqi-alert-message": "La ICA de tu trabajo no es saludable.",
    "asthma-heart-and-lungs-view-title": "Corazón y Pulmones",
    "asthma-heart-and-lungs-view-dhr-chart-title": "Frecuencia Cardíaca en Reposo (Día)",
    "asthma-heart-and-lungs-view-dhr-alert-message": "Tu frecuencia cardíaca en reposo diurna está por encima de tu nivel normal.",
    "asthma-heart-and-lungs-view-nhr-chart-title": "Frecuencia Cardíaca en Reposo (Noche)",
    "asthma-heart-and-lungs-view-nhr-alert-message": "Tu frecuencia cardíaca en reposo nocturna está por encima de tu nivel normal.",
    "asthma-heart-and-lungs-view-rr-chart-title": "Frecuencia Respiratoria",
    "asthma-heart-and-lungs-view-rr-alert-message": "Tu frecuencia respiratoria está por encima de tu nivel normal.",
    "asthma-heart-and-lungs-view-dbol-chart-title": "Nivel de Oxígeno en Sangre (Día)",
    "asthma-heart-and-lungs-view-dbol-alert-message": "Tu nivel de oxígeno en sangre diurno está por debajo de tu nivel normal.",
    "asthma-heart-and-lungs-view-nbol-chart-title": "Nivel de Oxígeno en Sangre (Noche)",
    "asthma-heart-and-lungs-view-nbol-alert-message": "Tu nivel de oxígeno en sangre nocturno está por debajo de tu nivel normal.",
    "asthma-sleep-view-title": "Sueño",
    "asthma-sleep-view-chart-title": "Trastornos del Sueño",
    "asthma-sleep-view-alert-message": "Tus trastornos del sueño están por encima de tu nivel normal.",
    "asthma-log-entry-editor-view-symptom-level-title": "Nivel de Síntomas",
    "asthma-log-entry-editor-view-select-one-subtitle": "Selecciona uno",
    "asthma-log-entry-editor-view-select-all-subtitle": "Selecciona todos los que correspondan",
    "asthma-log-entry-editor-view-symptoms-title": "Síntomas",
    "asthma-log-entry-editor-view-impacts-title": "Impactos",
    "asthma-log-entry-editor-view-triggers-title": "Disparadores",
    "asthma-air-quality-description-unhealthy": "Insalubre",
    "asthma-air-quality-description-very-unhealthy": "Muy insalubre",
    "asthma-air-quality-description-hazardous": "Peligroso",
    "blood-type": "Tipo de sangre",
    "device-data-month-chart-no-data": "Sin Datos",
    "device-data-month-chart-daily-average": "Promedio Diario",
    "term-information-not-found-header": "No se encontró información",
    "term-information-not-found-body": "No se encontró información sobre este tema",
    "term-information-disclaimer": "<strong>AVISO: </strong>La información presentada no es asesoría médica. Es con el propósito de ayudarle a que entienda más sobre su salud. Por favor contacte a su proveedor de atención médica si tiene preguntas sobre su estado de salud.",
    "term-information-view-on-medline": "Ver en MedlinePlus",
    "type": "Tipo",
    "location": "Ubicación",
    "description": "Descripción",
    "performed-by": "Realizado Por",
    "verified-by": "Verificado Por",
    "normal-range": "Rango Normal",
    "more": "Más",
    "procedure": "Procedimiento",
    "procedures": "Procedimientos",
    "lab-report": "Informe de Laboratorio",
    "service-performed": "Servicio Realizado",
    "services-performed": "Servicios Realizados",
    "device-data-month-chart-minutes": "Minutos",
    "device-data-month-chart-sleep": "Dormir",
    "air-quality-home": "Calidad del Aire (Hogar)",
    "air-quality-work": "Calidad del Aire (Trabajo)",
    "sedentary-time": "Tiempo Sedentario",
    "active-time": "Tiempo Activo",
    "lightly-active-time": "Tiempo Ligero de Actividad",
    "fairly-active-time": "Tiempo Moderado de Actividad",
    "very-active-time": "Tiempo Muy Activo",
    "breathing-rate": "Frecuencia Respiratoria",
    "calories-burned": "Calorías Quemadas",
    "elevated-heart-rate-time": "Tiempo con Frecuencia Cardíaca Elevada",
    "fat-burn-heart-rate-time": "Tiempo de Quema de Grasa",
    "cardio-heart-rate-time": "Tiempo de Cardio",
    "peak-heart-rate-time": "Tiempo en Pico de Frecuencia Cardíaca",
    "floors-climbed": "Pisos Subidos",
    "heart-rate-variability": "Variabilidad de la Frecuencia Cardíaca",
    "sleep-time": "Tiempo de Sueño",
    "light-sleep-time": "Tiempo de Sueño Ligero",
    "deep-sleep-time": "Tiempo de Sueño Profundo",
    "rem-sleep-time": "Tiempo de Sueño REM",
    "spo2": "SpO2",
    "heart-rate-range": "Rango de Frecuencia Cardíaca",
    "max-heart-rate": "Frecuencia Cardíaca Máxima",
    "core-sleep-time": "Tiempo de Sueño Profundo",
    "in-bed-time": "Tiempo en la Cama",
    "stand-time": "Tiempo de Pie",
    "walking-heart-rate-average": "Promedio de Frecuencia Cardíaca al Caminar",
    "active-energy-burned": "Energía Activa Quemada",
    "active-calories": "Calorías Activas",
    "resting-calories": "Calorías en Reposo",
    "total-calories": "Calorías Totales",
    "min-heart-rate": "Frecuencia Cardíaca Mínima",
    "average-heart-rate": "Frecuencia Cardíaca Promedio",
    "max-stress-level": "Nivel Máximo de Estrés",
    "average-stress-level": "Nivel Promedio de Estrés",
    "total-stress-time": "Tiempo Total de Estrés",
    "low-stress-time": "Tiempo de Bajo Estrés",
    "medium-stress-time": "Tiempo de Estrés Moderado",
    "high-stress-time": "Tiempo de Alto Estrés",
    "awake-time": "Tiempo Despierto",
    "sleep-score": "Puntuación de Sueño",
    "bpm": "ppm",
    "hours-abbreviation": "h",
    "minutes-abbreviation": "m",
};

export default strings;