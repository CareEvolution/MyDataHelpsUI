let strings: { [key: string]: string } = {
    "back": "Wstecz",
    "done": "Gotowe",
    "close": "Zamknij",
    "save": "Zapisz",
    "add": "Dodaj",
    "edit": "Edytować",
    "cancel": "Anuluj",
    "clear": "jasny",
    "settings": "Ustawienia",
    "connect": "Połącz",
    "reconnect": "Połącz ponownie",
    "refresh": "Odśwież",
    "remove": "Usuń",
    "help": "Pomoc",
    "view": "Wyświetl",
    "health-records": "Dokumentacja medyczna",
    "connect-ehr-title-prefix": "Połącz ",
    "connect-ehr-title-divider": " lub ",
    "connect-ehr-title-providers": "Dostawca",
    "connect-ehr-title-health-plans": "Plan zdrowotny",
    "connect-ehr-connected": "Otrzymujemy twoje dane EHR!",
    "connect-ehr-needs-attention": "Jedno z twoich kont wymaga uwagi.",
    "connect-ehr-text": "Twoje elektroniczne karty zdrowia są ważnym źródłem informacji. Mogą one pomóc badaczom w dokonywaniu nowych odkryć. Połącz swojego dostawcę lub plan zdrowotny (np. Medicare) z @@PROJECT_NAME@@.",
    "connect-ehr-text-connected": "Dziękujemy za udostępnienie danych EHR z @@PROJECT_NAME@@. Połącz inny dostawcę, aby udostępnić więcej danych lub zarządzać połączeniami EHR.",
    "connect-ehr-not-enabled": "Łączenie EHR nie jest włączone dla tego projektu.",
    "search-for-provider": "Szukaj dostawcy lub planu zdrowotnego",
    "expired-reconnect": "Połączenie wygasło. Proszę połączyć ponownie.",
    "connect-error-reconnect": "Nieoczekiwany błąd. Proszę połączyć ponownie.",
    "connected": "Połączono",
    "search": "Szukaj",
    "connect-fitbit-intro": "Możesz udostępniać dane ze swojego konta Fitbit, jeśli je posiadasz. Aby rozpocząć, kliknij poniżej, aby się zalogować za pomocą swoich danych do Fitbit.",
    "connect-fitbit-button": "Połącz Fitbit",
    "received-fitbit-data": "Otrzymujemy twoje dane z Fitbit!",
    "connect-garmin-intro": "Możesz udostępniać dane ze swojego konta Garmin, jeśli je posiadasz. Aby rozpocząć, kliknij poniżej, aby się zalogować za pomocą swoich danych do Garmin.",
    "connect-garmin-button": "Połącz Garmin",
    "received-garmin-data": "Otrzymujemy twoje dane z Garmin!",
    "connect-dexcom-intro": "Możesz udostępniać dane ze swojego konta Dexcom, jeśli je posiadasz. Aby rozpocząć, kliknij poniżej, aby się zalogować za pomocą swoich danych do Dexcom.",
    "connect-dexcom-button": "Połącz Dexcom",
    "received-dexcom-data": "Otrzymujemy twoje dane z Dexcom!",
    "downloading-data": "Pobieranie danych...",
    "downloading-data-menu": "Pobieranie danych",
    "empty-tasks-incomplete": "Brak otwartych zadań do wyświetlenia w tej chwili.",
    "empty-tasks-complete": "Ukończone zadania będą tutaj wyświetlane.",
    "view-all": "Wyświetl wszystko",
    "tasks": "Zadania",
    "incomplete-tasks": "Niekompletne zadania",
    "completed-tasks": "Ukończone zadania",
    "overdue": "Przeterminowane",
    "due-today": "Termin dzisiaj",
    "due-tomorrow": "Termin jutro",
    "due": "Termin",
    "due-in": "Termin za",
    "days": "dni",
    "notifications": "Powiadomienia",
    "support": "Wsparcie",
    "all-notifications": "Wszystkie powiadomienia",
    "steps": "Kroki",
    "resting-heart-rate": "Tętno spoczynkowe",
    "distance-traveled": "Przebyty dystans",
    "google-fit-share": "Kliknij, aby udostępnić dane dotyczące fitnessu",
    "devices": "Urządzenia",
    "last-sync": "Ostatnia synchronizacja",
    "completed": "Ukończono",
    "ehr-intro": "Twoje elektroniczne karty zdrowia (EHR) są ważnym źródłem informacji. Jeśli nam pomożesz zbierać swoje EHR, badacze wykorzystają te dane do dokonywania odkryć.",
    "external-accounts-title-divider": " / ",
    "external-accounts-title-providers": "Dostawcy",
    "external-accounts-title-health-plans": "Plany zdrowotne",
    "external-accounts-title-devices": "Urządzenia",
    "external-accounts-error": "Jedno z twoich kont wymaga uwagi",
    "external-accounts-loading": "Twoje dane są obecnie pobierane z podłączonych planów zdrowotnych i dostawców. Proszę sprawdzić ponownie za kilka chwil, aby zobaczyć swoje dane.",
    "external-account-authorization-expired": "Autoryzacja wygasła",
    "external-account-fetching-data": "Pobieranie danych...",
    "external-account-deleting": "Usuwanie...",
    "external-account-last-updated": "Ostatnia aktualizacja",
    "external-account-error": "Nieoczekiwany błąd",
    "external-account-reconnect": "Połącz ponownie",
    "external-account-refresh": "Odśwież",
    "external-account-remove": "Usuń",
    "device-data-no-data": "Jeśli podłączyłeś Apple Health, Google Fit, Fitbit lub Garmin, wróć później, aby zobaczyć swoje dane.",
    "no-notifications-received": "Nie otrzymano żadnych powiadomień",
    "next-button-text": "Dalej",
    "lab-results-title": "Wyniki badań laboratoryjnych",
    "medications-title": "Leki",
    "immunizations-title": "Szczepienia",
    "reports-title": "Raporty",
    "allergies-title": "Alergie",
    "conditions-title": "Warunki",
    "procedures-title": "Procedury",
    "app-download-title": "Następny krok: Pobierz aplikację",
    "app-download-subtitle": "Pobranie aplikacji MyDataHelps ułatwia udział w @@PROJECT_NAME@@.",
    "app-download-google-play-link-alt": "Pobierz ze sklepu Google Play",
    "app-download-app-store-link-alt": "Pobierz ze sklepu App Store",
    "start": "Rozpocznij",
    "resume": "Wznów",
    "start-survey": "Rozpocznij ankietę",
    "resume-survey": "Wznów ankietę",
    "30-day-average": "Średnia 30 dni",
    "today": "Dzisiaj",
    "yesterday": "Wczoraj",
    "tap-to-log-today": "Kliknij tutaj, aby zalogować dzisiejsze objawy lub leczenie!",
    "mild": "Łagodny",
    "moderate": "Umiarkowany",
    "severe": "Ciężki",
    "severe-shortened": "ciężki",
    "moderate-shortened": "umiarkowany",
    "mild-shortened": "łagodny",
    "log-todays-symptoms": "Zarejestruj dzisiejsze objawy",
    "todays-log": "Dziennik dzisiaj",
    "symptoms": "Objawy",
    "treatments": "Leczenie",
    "symptoms-experiencing-today": "Jakie objawy obecnie odczuwasz?",
    "symptoms-experiencing-previous": "Jakie objawy wcześniej odczuwałeś?",
    "treatments-experiencing-today": "Jakie leczenie przeprowadziłeś?",
    "treatments-experiencing-previous": "Jakie leczenie przeprowadziłeś wcześniej?",
    "feeling-overall-today": "Jak się dzisiaj ogólnie czujesz?",
    "feeling-overall-previous": "Jak się ogólnie czułeś?",
    "additional-notes": "Dodatkowe uwagi?",
    "how-severe-is": "Jak ciężkie są twoje",
    "how-severe-was": "Jak ciężkie było twoje",
    "clear-symptom": "Wyczyść objaw",
    "add-notes": "Dodaj notatki",
    "notes": "Notatki",
    "enter-symptom-name": "Wprowadź nazwę objawu",
    "enter-treatment-name": "Wprowadź nazwę leczenia",
    "severity-tracking-none": "Nie śledź ciężkości",
    "severity-tracking-3point": "Ocena łagodna / umiarkowana / ciężka",
    "severity-tracking-10point": "Ocena od 1 do 10 punktów",
    "muted": "Wyciszony",
    "not-muted": "Nie wyciszony",
    "delete": "Usuń",
    "severity": "Ciężkość",
    "item-delete-warning": "Ostrzeżenie: Kontynuowanie spowoduje trwałe usunięcie poniższych elementów i wszystkich powiązanych danych z twoich dzienników. Jeśli nie chcesz usunąć tych elementów, wybierz opcję „Anuluj”.",
    "unsaved-changes": "Nie zapisane zmiany",
    "daily-overall-experience": "Dzienne ogólne doświadczenie",
    "average": "Średnia",
    "include-symptoms": "Dołącz objawy",
    "select-symptoms": "Wybierz objawy",
    "include-treatments": "Dołącz leczenie",
    "select-treatments": "Wybierz leczenie",
    "download-mydatahelps": "Pobierz MyDataHelps",
    "connect-devices-title": "Połącz urządzenia",
    "connect-devices-text": "Udostępnij dane ze swoich urządzeń noszonych, aplikacji i innych urządzeń.",
    "apple-health-troubleshooting-intro": "Jeśli nie zatwierdziłeś lub wyłączyłeś udostępnianie swoich danych z Apple Health i chcesz je włączyć, wykonaj następujące kroki:",
    "apple-health-troubleshooting-li-1": "Otwórz aplikację „Ustawienia”",
    "apple-health-troubleshooting-li-2": "Wybierz „Prywatność”",
    "apple-health-troubleshooting-li-3": "Wybierz „Zdrowie”",
    "apple-health-troubleshooting-li-4": "Wybierz „MyDataHelps”",
    "apple-health-troubleshooting-li-5": "Włącz kategorie danych, które chcesz udostępnić",
    "how-to-enable": "Jak włączyć",
    "new-points-title": "Dobrze zrobione!",
    "new-points-text": "Zostały Ci przyznane punkty za następujące elementy:",
    "new-points-next-reward-prefix": "Teraz potrzebujesz ",
    "new-points-next-reward-suffix": " punktów, aby odblokować swoją następną nagrodę.",
    "new-points-done-button-text": "Gotowe",
    "systolic-average": "Średnie ciśnienie skurczowe",
    "diastolic-average": "Średnie ciśnienie rozkurczowe",
    "highest-systolic": "Najwyższe ciśnienie skurczowe",
    "lowest-systolic": "Najniższe ciśnienie skurczowe",
    "resource-default-button-text": "Otwórz",
    "inbox-message-completed-status": "WIDZIANE",
    "inbox-resource-completed-status": "WIDZIANE",
    "inbox-survey-completed-status": "ZAKOŃCZONE",
    "inbox-history-view-title": "Historia skrzynki odbiorczej",
    "inbox-history-view-empty-text": "Nie masz żadnych pozycji w historii skrzynki odbiorczej.",
    "inbox-message-view-related-resources-title": "Powiązane",
    "inbox-view-title": "Skrzynka odbiorcza",
    "inbox-view-empty-text": "Nie masz nowych pozycji w skrzynce odbiorczej.",
    "inbox-view-messages-title": "Wiadomości",
    "inbox-view-surveys-title": "Ankiety",
    "inbox-view-resources-title": "Zasoby",
    "inbox-view-recently-completed-title": "Ostatnie",
    "inbox-view-recently-completed-empty-text": "Nie masz ostatnio ukończonych pozycji w skrzynce odbiorczej.",
    "inbox-view-history-button-text": "Wyświetl historię skrzynki odbiorczej",
    "choose-report-month": "Wybierz miesiąc raportu",
    "include-overall-experience": "Dołącz codzienne ogólne doświadczenie",
    "include-notes": "Dołącz notatki",
    "create-report": "Utwórz raport PDF",
    "reports": "Raporty",
    "recent-daily-data-bar-chart-subtitle": "Ostatnie 7 dni",
    "recent-daily-data-bar-chart-no-data": "Brak danych",
    "resource-list-empty-text": "Nie znaleziono zasobów.",
    "asthma-symptom-level-none": "Brak objawów",
    "asthma-symptom-level-mild": "Łagodne objawy",
    "asthma-symptom-level-moderate": "Umiarkowane objawy",
    "asthma-symptom-level-severe": "Ciężkie objawy",
    "asthma-symptom-difficulty-breathing": "Trudności z oddychaniem",
    "asthma-symptom-wheezing": "Świszczący oddech",
    "asthma-symptom-coughing": "Kaszel",
    "asthma-symptom-chest-tightness": "Duszność lub ucisk w klatce piersiowej",
    "asthma-impact-limit-daily-activity": "Ograniczenie codziennej aktywności",
    "asthma-impact-waking-at-night": "Budzenie się w nocy",
    "asthma-impact-using-rescue-inhaler": "Użycie inhalatora ratunkowego",
    "asthma-trigger-cold-illness": "Choroba przeziębieniowa / wirusowa",
    "asthma-trigger-animal-exposure": "Ekspozycja na zwierzęta",
    "asthma-trigger-seasonal-allergens": "Sezonowe alergeny / pyłki",
    "asthma-trigger-exercise": "Ćwiczenie",
    "asthma-trigger-smoke": "Dym",
    "asthma-trigger-weather-changes": "Ekstremalne zmiany pogody",
    "asthma-trigger-air-pollution": "Zanieczyszczenie powietrza",
    "asthma-trigger-strong-smells": "Intensywne zapachy",
    "asthma-trigger-chemicals": "Substancje chemiczne / środki czystości",
    "asthma-trigger-dust": "Pył",
    "asthma-trigger-mold": "Pleśń",
    "asthma-trigger-dust-mites": "Roztocza kurzu",
    "asthma-trigger-rodents": "Gryzonie",
    "asthma-trigger-cockroaches": "Karaluchy",
    "asthma-trigger-nsaid": "Niesteroidowe leki przeciwzapalne / aspiryna",
    "asthma-trigger-beta-blocker": "Blokery beta",
    "asthma-trigger-heartburn": "Zgaga",
    "asthma-trigger-red-wine": "Czerwone wino",
    "asthma-trigger-new-foods": "Nowe potrawy",
    "asthma-trigger-cooked-without-ventilation": "Gotowanie (brak wentylacji)",
    "asthma-trigger-pet-in-bed": "Zwierzę w łóżku",
    "asthma-trigger-incense-or-candle": "Kadzidło / świeca",
    "asthma-data-status-out-of-range": "Poza zakresem",
    "asthma-data-status-in-range": "W zakresie",
    "asthma-data-status-offline": "Offline",
    "asthma-data-status-establishing": "Ustalanie",
    "asthma-data-status-not-determined": "Bazowy stan nieustalony",
    "asthma-data-status-not-found": "Brak danych",
    "asthma-data-status-not-configured": "Nie skonfigurowano",
    "asthma-control-calendar-daily-entry-missed": "Brak dziennego wpisu",
    "asthma-control-calendar-not-logged-yet": "Brak wpisu",
    "asthma-control-calendar-log-entries-symptoms-label": "Objawy",
    "asthma-control-calendar-log-entries-impacts-label": "Wpływy",
    "asthma-control-calendar-log-entries-triggers-label": "Czynniki wyzwalające",
    "asthma-control-status-header-multiple-out-of-range-p1": "Wiele punktów danych znajduje się ",
    "asthma-control-status-header-multiple-out-of-range-p2": "poza twoim normalnym poziomem",
    "asthma-control-status-header-multiple-out-of-range-p3": ". Uzupełnij swój dzienny wpis.",
    "asthma-control-status-header-abnormal-heart-rate-p1": "Twoje tętno spoczynkowe wynosi ",
    "asthma-control-status-header-abnormal-heart-rate-p2": "powyżej twojego normalnego poziomu",
    "asthma-control-status-header-abnormal-heart-rate-p3": ". Uzupełnij swój dzienny wpis.",
    "asthma-control-status-header-abnormal-respiratory-rate-p1": "Twój oddech jest ",
    "asthma-control-status-header-abnormal-respiratory-rate-p2": "ponad twoim normalnym poziomem",
    "asthma-control-status-header-abnormal-respiratory-rate-p3": ". Uzupełnij swój dzienny wpis.",
    "asthma-control-status-header-abnormal-steps-p1": "Twoja aktywność jest ",
    "asthma-control-status-header-abnormal-steps-p2": "poniżej twojego normalnego poziomu",
    "asthma-control-status-header-abnormal-steps-p3": ". Uzupełnij swój dzienny wpis.",
    "asthma-control-status-header-abnormal-sleep-p1": "Twój sen jest zaburzony ",
    "asthma-control-status-header-abnormal-sleep-p2": "powyżej twojego normalnego poziomu",
    "asthma-control-status-header-abnormal-sleep-p3": ". Uzupełnij swój dzienny wpis.",
    "asthma-control-status-header-abnormal-blood-oxygen-p1": "Poziom tlenu we krwi jest ",
    "asthma-control-status-header-abnormal-blood-oxygen-p2": "poniżej twojego normalnego poziomu",
    "asthma-control-status-header-abnormal-blood-oxygen-p3": ". Uzupełnij swój dzienny wpis.",
    "asthma-control-status-header-abnormal-home-aqi-p1": "Wskaźnik jakości powietrza w twoim domu wynosi ",
    "asthma-control-status-header-abnormal-home-aqi-p2": ". Uzupełnij swój dzienny wpis.",
    "asthma-control-status-header-abnormal-work-aqi-p1": "Wskaźnik jakości powietrza w twoim miejscu pracy wynosi ",
    "asthma-control-status-header-abnormal-work-aqi-p2": ". Uzupełnij swój dzienny wpis.",
    "asthma-control-status-header-no-data": "Dodaj dzienny wpis, aby ocenić kontrolę astmy.",
    "asthma-control-status-header-no-data-caregiver": "Dodaj codzienny wpis, aby ocenić kontrolę astmy u {name}.",
    "asthma-control-status-header-not-determined": "Konieczne jest wykonanie kolejnych dziennych wpisów w celu oceny kontroli astmy.",
    "asthma-control-status-header-not-determined-caregiver": "Potrzebnych jest więcej codziennych wpisów, aby ocenić kontrolę astmy u {name}.",
    "asthma-control-status-header-controlled-p1": "Na podstawie twoich wpisów twoja astma jest ",
    "asthma-control-status-header-controlled-p1-caregiver": "Na podstawie wpisów, astma u {name} jest ",
    "asthma-control-status-header-controlled-p2": "pod kontrolą.",
    "asthma-control-status-header-not-controlled-p1": "Na podstawie twoich wpisów twoja astma jest ",
    "asthma-control-status-header-not-controlled-p1-caregiver": "Na podstawie wpisów, astma u {name} jest ",
    "asthma-control-status-header-not-controlled-p2": "poza kontrolą.",
    "asthma-control-status-header-not-controlled-stat-symptom-days": "Dni z objawami",
    "asthma-control-status-header-not-controlled-stat-rescue-inhaler": "Inhalator ratunkowy",
    "asthma-control-status-header-not-controlled-stat-limited-activity": "Ograniczona aktywność",
    "asthma-control-status-header-not-controlled-stat-awakenings": "Budzenia",
    "asthma-action-plan-manager-title": "Plan działania w przypadku astmy",
    "asthma-action-plan-manager-instructions": "Zapisz zdjęcie swojego planu działania w przypadku astmy, aby mieć łatwy dostęp.",
    "asthma-action-plan-manager-instructions-caregiver": "Zapisz zdjęcie planu działania w przypadku astmy {name} dla łatwego dostępu.",
    "asthma-action-plan-manager-learn-more": "Czym jest plan działania w przypadku astmy?",
    "asthma-action-plan-manager-edit-button-text": "Edytuj",
    "asthma-action-plan-manager-not-found-text": "Kliknij, aby dodać zdjęcie",
    "asthma-biometrics-title": "Zdrowie i aktywność",
    "asthma-biometrics-daytime-resting-heart-rate-label": "Tętno w spoczynku (Dzień)",
    "asthma-biometrics-nighttime-resting-heart-rate-label": "Tętno w spoczynku (Noc)",
    "asthma-biometrics-beats-per-minute-units": "UDT",
    "asthma-biometrics-respiratory-rate-label": "Częstość oddechów",
    "asthma-biometrics-breaths-per-minute-units": "UDT",
    "asthma-biometrics-steps-label": "Kroki",
    "asthma-biometrics-daytime-blood-oxygen-level-label": "Nasycony tlenem krwi (Dzień)",
    "asthma-biometrics-nighttime-blood-oxygen-level-label": "Nasycony tlenem krwi (Noc)",
    "asthma-biometrics-percent-units": "%",
    "asthma-biometrics-sleep-disturbances-label": "Zaburzenia snu",
    "asthma-air-qualities-title": "Jakość powietrza",
    "asthma-air-qualities-setup-button-text": "+ Konfiguracja",
    "asthma-air-qualities-home-aqi-label": "Wskaźnik jakości powietrza (Dom)",
    "asthma-air-qualities-work-aqi-label": "Wskaźnik jakości powietrza (Praca)",
    "asthma-alert-takeover-notice-instructions": "Poświęć chwilę, aby zanotować wszelkie objawy astmy w codziennym wpisie.",
    "asthma-alert-takeover-notice-add-entry-button-text": "+ Codzienny wpis",
    "asthma-alert-takeover-notice-not-now-button-text": "Nie teraz",
    "asthma-log-entry-details-not-editable": "Brak dziennego wpisu",
    "asthma-log-entry-details-not-logged-yet": "Brak wpisu",
    "asthma-log-entry-details-edit-button-text": "Edytuj",
    "asthma-log-entry-details-add-button-text": "Dodaj wpis",
    "asthma-log-entry-details-symptoms-label": "Objawy",
    "asthma-log-entry-details-impacts-label": "Wpływy",
    "asthma-log-entry-details-triggers-label": "Czynniki wyzwalające",
    "asthma-log-entry-details-component-no-data-p1": "Brak ",
    "asthma-log-entry-details-component-no-data-p2": " zarejestrowanych",
    "asthma-log-entry-header-today-log-label": "Dzisiaj",
    "asthma-log-entry-header-yesterday-log-label": "Wczoraj",
    "asthma-log-entry-header-not-logged-yet": "Brak wpisu",
    "asthma-log-entry-header-add-button-text": "Dodaj wpis",
    "asthma-activity-view-title": "Aktywność",
    "asthma-activity-view-chart-title": "Kroki",
    "asthma-activity-view-alert-message": "Twoja aktywność jest poniżej twojego normalnego poziomu.",
    "asthma-alert-takeover-message": "Wiele punktów danych znajduje się poza twoim normalnym poziomem.",
    "asthma-air-quality-view-title": "Jakość powietrza",
    "asthma-air-quality-view-home-aqi-chart-title": "Jakość powietrza (Dom)",
    "asthma-air-quality-view-home-aqi-alert-message": "Wskaźnik jakości powietrza w twoim domu jest niezdrowy.",
    "asthma-air-quality-view-work-aqi-chart-title": "Jakość powietrza (Praca)",
    "asthma-air-quality-view-work-aqi-alert-message": "Wskaźnik jakości powietrza w twojej pracy jest niezdrowy.",
    "asthma-heart-and-lungs-view-title": "Serce i płuca",
    "asthma-heart-and-lungs-view-dhr-chart-title": "Tętno w spoczynku (Dzień)",
    "asthma-heart-and-lungs-view-dhr-alert-message": "Twoje tętno w spoczynku w ciągu dnia jest powyżej twojego normalnego poziomu.",
    "asthma-heart-and-lungs-view-nhr-chart-title": "Tętno w spoczynku (Noc)",
    "asthma-heart-and-lungs-view-nhr-alert-message": "Twoje tętno w spoczynku w nocy jest powyżej twojego normalnego poziomu.",
    "asthma-heart-and-lungs-view-rr-chart-title": "Częstość oddechów",
    "asthma-heart-and-lungs-view-rr-alert-message": "Twój oddech jest powyżej twojego normalnego poziomu.",
    "asthma-heart-and-lungs-view-dbol-chart-title": "Nasycony tlenem krwi (Dzień)",
    "asthma-heart-and-lungs-view-dbol-alert-message": "Twój poziom tlenu we krwi w ciągu dnia jest poniżej twojego normalnego poziomu.",
    "asthma-heart-and-lungs-view-nbol-chart-title": "Nasycony tlenem krwi (Noc)",
    "asthma-heart-and-lungs-view-nbol-alert-message": "Twój poziom tlenu we krwi w nocy jest poniżej twojego normalnego poziomu.",
    "asthma-sleep-view-title": "Sen",
    "asthma-sleep-view-chart-title": "Zaburzenia snu",
    "asthma-sleep-view-alert-message": "Twoje zaburzenia snu są powyżej twojego normalnego poziomu.",
    "asthma-log-entry-editor-view-symptom-level-title": "Poziom objawów",
    "asthma-log-entry-editor-view-select-one-subtitle": "Wybierz jedno",
    "asthma-log-entry-editor-view-select-all-subtitle": "Zaznacz wszystkie, które mają zastosowanie",
    "asthma-log-entry-editor-view-symptoms-title": "Objawy",
    "asthma-log-entry-editor-view-impacts-title": "Wpływy",
    "asthma-log-entry-editor-view-triggers-title": "Czynniki wyzwalające",
    "asthma-air-quality-description-unhealthy": "Niezdrowe",
    "asthma-air-quality-description-very-unhealthy": "Bardzo niezdrowe",
    "asthma-air-quality-description-hazardous": "Groźne",
    "asthma-recommended-article-21-title": "Jak utrzymać astmę pod kontrolą",
    "asthma-recommended-article-21-subtitle": "Pozostań bez objawów, przestrzegając swojego planu leczenia, rozumiejąc wyzwalacze i wcześnie rozpoznając zmiany w kontroli.",
    "asthma-recommended-article-22-title": "Czy twoja astma jest pod kontrolą?",
    "asthma-recommended-article-22-subtitle": "4 pytania, aby ocenić, czy twoja astma jest pod kontrolą. Jeśli doświadczasz objawów więcej niż 2 razy w tygodniu lub budzisz się w nocy z powodu objawów astmy, twoja astma nie jest pod kontrolą.",
    "asthma-recommended-article-24-title": "Jak przetrwać strefę zagrożenia: Przygotowanie na zaostrzenia astmy",
    "asthma-recommended-article-24-subtitle": "Wczesne rozpoznawanie poważnych objawów, takich jak intensywny kaszel i duszność, oraz aktywowanie dostosowanego planu działania w astmie, w tym natychmiastowe leki.",
    "asthma-recommended-article-25-title": "Przejęcie kontroli nad astmą",
    "asthma-recommended-article-25-subtitle": "Kiedy astma wydaje się nie do opanowania, czas na przemyślenie swojego podejścia. Kroki do podjęcia, gdy astma nie jest pod kontrolą.",
    "asthma-recommended-article-32-title": "Kto potrzebuje leków kontrolujących?",
    "asthma-recommended-article-32-subtitle": "Odkryj kluczową rolę leków kontrolujących w utrzymaniu astmy pod kontrolą.",
    "asthma-recommended-article-33-title": "Dostęp do leków",
    "asthma-recommended-article-33-subtitle": "Gdy koszt jest barierą do leków, dowiedz się o darmowych lub tanich lekach. Przyjmowanie leków zgodnie z zaleceniami jest ważne dla utrzymania kontroli nad astmą.",
    "asthma-recommended-article-34-title": "Uzupełnianie leków",
    "asthma-recommended-article-34-subtitle": "Utrzymuj kontrolę nad lekami na astmę dzięki prostym strategiom uzupełniania.",
    "asthma-recommended-article-35-title": "Problemy z pamiętaniem o lekach",
    "asthma-recommended-article-35-subtitle": "Odkryj proste, ale skuteczne strategie przypominania o codziennych dawkach, od sprytnych wskazówek dotyczących przechowywania po wykorzystanie przypomnień w aplikacjach.",
    "asthma-recommended-article-36-title": "Którego inhalatora używać i kiedy",
    "asthma-recommended-article-36-subtitle": "Opanuj zarządzanie astmą: inhalator ratunkowy działa szybko, aby złagodzić objawy, podczas gdy kontroler jest zapobiegawczy i działa poprzez zmniejszenie stanu zapalnego, zwykle przyjmowany codziennie.",
    "asthma-recommended-article-37a-title": "Technika inhalatora - MDI",
    "asthma-recommended-article-37a-subtitle": "Wskazówki dotyczące techniki dozownika inhalacyjnego (MDI). Bez odpowiedniej techniki możesz otrzymać tylko część dawki.",
    "asthma-recommended-article-37b-title": "Technika inhalatora - DPI",
    "asthma-recommended-article-37b-subtitle": "Wskazówki dotyczące techniki inhalatora w postaci suchego proszku (DPI). Bez odpowiedniej techniki możesz otrzymać tylko część dawki.",
    "asthma-recommended-article-37c-title": "Technika inhalatora - SMI",
    "asthma-recommended-article-37c-subtitle": "Wskazówki dotyczące techniki inhalatora wytwarzającego miękką mgłę (SMI). Bez odpowiedniej techniki możesz otrzymać tylko część dawki.",
    "asthma-recommended-article-37d-title": "Technika inhalatora - nebulizator",
    "asthma-recommended-article-37d-subtitle": "Wskazówki dotyczące techniki nebulizatora.",
    "asthma-recommended-article-38-title": "Dlaczego powinienem przyjmować swoje leki kontrolujące?",
    "asthma-recommended-article-38-subtitle": "Zrozum kluczową rolę leków kontrolujących i dlaczego są one kamieniem węgielnym twojego spersonalizowanego planu leczenia.",
    "asthma-recommended-article-39-title": "Skutki uboczne leków na astmę",
    "asthma-recommended-article-39-subtitle": "Dowiedz się, jak zidentyfikować częste i rzadkie skutki uboczne oraz jakie proste kroki można podjąć, aby uniknąć najczęstszych skutków ubocznych, takich jak pleśniawki (infekcja grzybicza w jamie ustnej).",
    "asthma-recommended-article-39a-title": "Jak sprawdzić, czy moje leki na astmę działają?",
    "asthma-recommended-article-39a-subtitle": "Leki kontrolujące mogą potrzebować dni lub tygodni, aby osiągnąć pełen efekt. Śledź codziennie swoje objawy, aby zobaczyć, czy następuje poprawa. Jeśli nie, skonsultuj się ze swoim lekarzem.",
    "asthma-recommended-article-41-title": "Niespodziewane wyzwalacze",
    "asthma-recommended-article-41-subtitle": "Odkryj niespodziewane wyzwalacze astmy w twoim codziennym życiu, od NLPZ (takich jak ibuprofen) po kieliszek wina. Wiedza, na co zwrócić uwagę, może pomóc w identyfikacji tych niespodziewanych wyzwalaczy.",
    "asthma-recommended-article-42-title": "Astma i sezonowe alergeny/polen",
    "asthma-recommended-article-42-subtitle": "Z łatwością przejdź przez sezon pyłkowy: zidentyfikuj swoje specyficzne alergeny pyłkowe, zrozum ich sezonowe wzorce i naucz się, jak minimalizować ekspozycję.",
    "asthma-recommended-article-43-title": "Astma i jakość powietrza",
    "asthma-recommended-article-43-subtitle": "Zrozum, że zła jakość powietrza może wywołać astmę. Dowiedz się, jak radzić sobie z dniami o wysokim AQI i co oznaczają poziomy AQI.",
    "asthma-recommended-article-43a-title": "Astma i infekcje dróg oddechowych",
    "asthma-recommended-article-43a-subtitle": "Infekcje dróg oddechowych są częstymi wyzwalaczami astmy. Jak ich unikać i co robić, gdy się pojawią.",
    "asthma-recommended-article-43b-title": "Astma i zwierzęta",
    "asthma-recommended-article-43b-subtitle": "Zwierzęta/pupile mogą być wyzwalaczem astmy. Dowiedz się, jak zdiagnozować alergię na zwierzęta/pupile i jakie kroki podjąć, aby zredukować ich wpływ.",
    "asthma-recommended-article-43c-title": "Astma i dym",
    "asthma-recommended-article-43c-subtitle": "Pożary lasów i dym tytoniowy mogą wywołać astmę. Dowiedz się, jakie kroki możesz podjąć, aby zmniejszyć ekspozycję.",
    "asthma-recommended-article-43d-title": "Astma i pogoda",
    "asthma-recommended-article-43d-subtitle": "Typowe wyzwalacze pogodowe to zimne powietrze, gorące i wilgotne powietrze oraz deszcz/burze. Dowiedz się, dlaczego mogą one wywołać astmę.",
    "asthma-recommended-article-43e-title": "Mocne zapachy i chemikalia/środki czyszczące",
    "asthma-recommended-article-43e-subtitle": "Odkryj, które zapachy mogą wywołać astmę i na co zwrócić uwagę podczas sprzątania.",
    "asthma-recommended-article-43f-title": "Astma i kurz/roztocza",
    "asthma-recommended-article-43f-subtitle": "Kurz jest częstym wyzwalaczem astmy, ale powód, dla którego jest wyzwalaczem, może cię zaskoczyć!",
    "asthma-recommended-article-43g-title": "Astma i pleśń",
    "asthma-recommended-article-43g-subtitle": "Pleśń potrzebuje wilgoci do wzrostu, dlatego zazwyczaj występuje w wilgotnych lub mokrych miejscach. Dowiedz się, jak zapobiegać pleśni w twoim domu.",
    "asthma-recommended-article-43h-title": "Astma i zgaga",
    "asthma-recommended-article-43h-subtitle": "Czym jest zgaga i co ma wspólnego z astmą?",
    "blood-type": "Grupa krwi",
    "device-data-month-chart-no-data": "Brak danych",
    "device-data-month-chart-daily-average": "Średnia dzienna",
    "term-information-not-found-header": "Nie znaleziono informacji",
    "term-information-not-found-body": "Nie udało się znaleźć żadnych informacji na ten temat",
    "term-information-disclaimer": "<strong>OSTRZEŻENIE:</strong> Dostarczone informacje nie są poradą medyczną. Mają na celu pomóc ci lepiej zrozumieć swoje zdrowie. Skontaktuj się ze swoim dostawcą opieki zdrowotnej, jeśli masz pytania dotyczące swojego stanu zdrowia.",
    "term-information-view-on-medline": "Zobacz na MedlinePlus",
    "type": "Typ",
    "location": "Lokalizacja",
    "description": "Opis",
    "performed-by": "Wykonane przez",
    "verified-by": "Zweryfikowane przez",
    "normal-range": "Normalny zakres",
    "more": "Więcej",
    "procedure": "Procedura",
    "procedures": "Procedury",
    "lab-report": "Raport laboratoryjny",
    "service-performed": "Wykonana usługa",
    "services-performed": "Wykonane usługi",
    "device-data-month-chart-minutes": "Minuty",
    "device-data-month-chart-sleep": "Sen",
    "air-quality-home": "Jakość powietrza (Dom)",
    "air-quality-work": "Jakość powietrza (Praca)",
    "sedentary-time": "Czas siedzenia",
    "active-time": "Czas aktywności",
    "lightly-active-time": "Lekko aktywny czas",
    "fairly-active-time": "Dość aktywny czas",
    "very-active-time": "Bardzo aktywny czas",
    "breathing-rate": "Częstość oddychania",
    "calories-burned": "Spalone kalorie",
    "elevated-heart-rate-time": "Czas z podwyższoną częstością akcji serca",
    "fat-burn-heart-rate-time": "Czas spalania tłuszczu",
    "cardio-heart-rate-time": "Czas treningu kardio",
    "peak-heart-rate-time": "Czas w szczytowej częstości akcji serca",
    "floors-climbed": "Pokonane piętra",
    "heart-rate-variability": "Zmiennność rytmu serca",
    "sleep-time": "Czas snu",
    "light-sleep-time": "Czas lekkiego snu",
    "deep-sleep-time": "Czas głębokiego snu",
    "rem-sleep-time": "Czas snu REM",
    "spo2": "SpO2",
    "heart-rate-range": "Zakres częstości akcji serca",
    "max-heart-rate": "Maksymalna częstość akcji serca",
    "core-sleep-time": "Głęboki czas snu",
    "in-bed-time": "Czas w łóżku",
    "stand-time": "Czas stania",
    "walking-heart-rate-average": "Średnie tętno podczas chodzenia",
    "active-energy-burned": "Spalone aktywne kalorie",
    "number-of-alcoholic-beverages": "Liczba napojów alkoholowych",
    "active-calories": "Aktywne kalorie",
    "resting-calories": "Spalone kalorie w spoczynku",
    "total-calories": "Łączne kalorie",
    "min-heart-rate": "Minimalna częstość akcji serca",
    "average-heart-rate": "Średnia częstość akcji serca",
    "max-stress-level": "Maksymalny poziom stresu",
    "average-stress-level": "Średni poziom stresu",
    "total-stress-time": "Łączny czas stresu",
    "low-stress-time": "Czas niskiego stresu",
    "medium-stress-time": "Czas średniego stresu",
    "high-stress-time": "Czas wysokiego stresu",
    "awake-time": "Czas czuwania",
    "sleep-score": "Wynik snu",
    "bpm": "bpm",
    "hours-abbreviation": " godz.",
    "minutes-abbreviation": " min.",
    "points-until-next-badge": "{{points}} punktów do następnej odznaki",
    "fitbit-wear-time": "Czas noszenia Fitbit",
    "my-badges": "Moje odznaki ({{badges}})",
    "new-badge-title": "Świetna robota!",
    "new-badge-text": "Zdobyłeś nową odznakę!",
    "get-badge": "Zdobyć odznakę",
    "glucose-chart-no-data": "Brak odczytów poziomu glukozy we krwi",
    "glucose-stats-range-label": "Zakres poziomu glukozy we krwi",
    "glucose-stats-avg-label": "Średni poziom glukozy we krwi",
    "glucose-stats-steps-label": "Kroki",
    "glucose-stats-sleep-label": "Sen",
    "stress-level-title": "Ogólny poziom stresu",
    "stress-level-min-label": "Brak stresu",
    "stress-level-max-label": "Bardzo zestresowany",
    "meal-type-meal": "Posiłek",
    "meal-type-snack": "Przekąska",
    "meal-type-drink": "Napój",
    "meal-log-title": "Dziennik posiłków",
    "meal-log-no-data": "Brak zarejestrowanych posiłków",
    "meal-editor-time-input-label": "Czas",
    "meal-editor-description-input-label": "Opis",
    "meal-editor-description-optional": "Opcjonalne",
    "meal-editor-duplicate-timestamp-error": "Dwa posiłki nie mogą mieć tej samej godziny.",
    "glucose-view-title": "Monitorowanie glukozy",
    "ai-assistant-loading": "Interakcja z Twoimi danymi...",
    "ai-assistant-suggestion-avg-weekly-heart-rate": "Jaki jest mój średni puls z ostatniego tygodnia?",
    "ai-assistant-suggestion-highest-heart-rate-week": "Jaki był mój najwyższy puls w tym tygodniu?",
    "ai-assistant-suggestion-graph-daily-steps-21-days": "Utwórz wykres moich codziennych kroków z ostatnich 21 dni",
    "ai-assistant-suggestion-weekly-workouts-average-month": "Ile treningów tygodniowo robiłem średnio w tym miesiącu?",
    "ai-assistant-suggestion-avg-monthly-blood-pressure": "Jakie jest moje średnie ciśnienie krwi z ostatniego miesiąca?",
    "ai-assistant-suggestion-daily-active-minutes-month": "Jaka jest moja średnia dzienna liczba aktywnych minut w tym miesiącu?",
    "ai-assistant-suggestion-resting-heart-rate-change-month": "Jak zmienił się mój puls w spoczynku w ostatnim miesiącu?",
    "ai-assistant-suggestion-stand-ups-yesterday": "Jak często wstawałem wczoraj?",
    "ai-assistant-suggestion-graph-heart-rate-trends-workouts": "Czy możesz stworzyć wykres trendów mojego pulsu podczas treningów w tym tygodniu?",
    "ai-assistant-suggestion-sleep-7-days": "Jaki był mój sen w ciągu ostatnich 7 dni?",
    "ai-assistant-suggestion-fall-asleep-time-2-weeks": "O której zwykle zasypiałem w ciągu ostatnich 2 tygodni?",
    "ai-assistant-suggestion-sleep-quality-change-month": "Jak zmieniła się jakość mojego snu w ciągu ostatniego miesiąca?",
    "ai-assistant-suggestion-last-tetanus-vaccine": "Kiedy otrzymałem ostatnią szczepionkę przeciwko tężcowi?",
    "ai-assistant-suggestion-last-blood-test-lab-work": "Kiedy miałem ostatnie badanie krwi lub test laboratoryjny?",
    "ai-assistant-suggestion-abnormal-lab-results": "Czy mam jakieś nieprawidłowe wyniki badań laboratoryjnych?",
    "ai-assistant-suggestion-last-cbc-test": "Kiedy wykonano moje ostatnie pełne badanie krwi (CBC)?",
    "ai-assistant-suggestion-glucose-a1c-levels-last-test": "Jakie były moje poziomy glukozy i A1c w ostatnim badaniu?",
    "ai-assistant-suggestion-graph-cholesterol-trends": "Czy możesz pokazać mi wykres zmian mojego poziomu cholesterolu w czasie?",
    "ai-assistant-suggestion-last-metabolic-panel": "Kiedy wykonano moje ostatnie badanie metaboliczne?",
    "ai-assistant-suggestion-hemoglobin-levels-trend": "Jaki jest trend mojego poziomu hemoglobiny?",
    "ai-assistant-suggestion-show-files": "Pokaż mi moje pliki."
};

export default strings;