let strings: { [key: string]: string } = {
    "back": "Voltar",
    "done": "Concluído",
    "close": "Fechar",
    "save": "Salvar",
    "add": "Adicionar",
    "settings": "Configurações",
    "connect": "Conectar",
    "reconnect": "Reconectar",
    "refresh": "Atualizar",
    "remove": "Remover",
    "help": "Ajuda",
    "view": "Visualizar",
    "health-records": "Registros de Saúde",
    "connect-ehr-title-prefix": "Conectar ",
    "connect-ehr-title-divider": " ou ",
    "connect-ehr-title-providers": "Fornecedor",
    "connect-ehr-title-health-plans": "Plano de Saúde",
    "connect-ehr-connected": "Estamos recebendo seus dados do EHR!",
    "connect-ehr-needs-attention": "Uma de suas contas requer atenção.",
    "connect-ehr-text": "Seus registros eletrônicos de saúde são uma fonte importante de informações. Eles podem ajudar os pesquisadores a fazer novas descobertas. Conecte seu provedor ou plano de saúde (ex: Medicare) com @@PROJECT_NAME@@.",
    "connect-ehr-text-connected": "Obrigado por compartilhar seus dados do EHR com @@PROJECT_NAME@@. Conecte outro provedor para compartilhar mais dados ou gerencie suas conexões do EHR.",
    "connect-ehr-not-enabled": "A vinculação do EHR não está ativada para este projeto.",
    "search-for-provider": "Pesquisar por Fornecedor ou Plano de Saúde",
    "expired-reconnect": "Conexão expirada. Por favor, reconecte.",
    "connect-error-reconnect": "Erro inesperado. Por favor, reconecte.",
    "connected": "Conectado",
    "search": "Pesquisar",
    "connect-fitbit-intro": "Você pode compartilhar dados de sua conta Fitbit se tiver uma. Para começar, clique ou toque abaixo para fazer login com suas credenciais do Fitbit.",
    "connect-fitbit-button": "Conectar Fitbit",
    "received-fitbit-data": "Estamos recebendo seus dados da Fitbit!",
    "connect-garmin-intro": "Você pode compartilhar dados de sua conta Garmin se tiver uma. Para começar, clique ou toque abaixo para fazer login com suas credenciais do Garmin.",
    "connect-garmin-button": "Conectar Garmin",
    "received-garmin-data": "Estamos recebendo seus dados da Garmin!",
    "downloading-data": "Baixando dados...",
    "downloading-data-menu": "Baixando Dados",
    "all-tasks-complete": "Todas as tarefas concluídas!",
    "view-all": "Ver tudo",
    "tasks": "Tarefas",
    "incomplete-tasks": "Tarefas incompletas",
    "completed-tasks": "Tarefas concluídas",
    "overdue": "Atrasado",
    "due-today": "Vencimento hoje",
    "due-tomorrow": "Vencimento amanhã",
    "due": "Vencimento",
    "due-in": "Vencimento em",
    "days": "dias",
    "notifications": "Notificações",
    "support": "Suporte",
    "all-notifications": "Todas as Notificações",
    "steps": "Passos",
    "resting-heart-rate": "Frequência cardíaca em repouso",
    "distance-traveled": "Distância percorrida",
    "google-fit-share": "Toque para compartilhar dados de condicionamento físico",
    "devices": "Dispositivos",
    "last-sync": "Última sincronização",
    "completed": "Concluído",
    "ehr-intro": "Seus registros eletrônicos de saúde (EHR) são uma fonte importante de informações. Se você nos ajudar a reunir seu EHR, os pesquisadores usarão esses dados para fazer descobertas.",
    "external-accounts-title-divider": " / ",
    "external-accounts-title-providers": "Provedores",
    "external-accounts-title-health-plans": "Planos de Saúde",
    "external-accounts-title-devices": "Dispositivos",
    "external-accounts-error": "Uma de suas contas requer atenção",
    "external-accounts-loading": "Seus dados estão sendo baixados de seus planos de saúde e provedores vinculados. Por favor, verifique novamente em alguns momentos para visualizar seus dados.",
    "external-account-authorization-expired": "Autorização expirada",
    "external-account-fetching-data": "Recuperando dados...",
    "external-account-deleting": "Removendo...",
    "external-account-last-updated": "Última atualização",
    "external-account-error": "Erro inesperado",
    "external-account-reconnect": "Reconectar",
    "external-account-refresh": "Atualizar",
    "external-account-remove": "Remover",
    "device-data-no-data": "Se você conectou o Apple Health, Google Fit, Fitbit ou Garmin, volte mais tarde para ver seus dados.",
    "no-notifications-received": "Nenhuma notificação recebida",
    "next-button-text": "Próximo",
    "lab-results-title": "Resultados de laboratório",
    "medications-title": "Medicamentos",
    "immunizations-title": "Imunizações",
    "reports-title": "Relatórios",
    "allergies-title": "Alergias",
    "conditions-title": "Condições",
    "procedures-title": "Procedimentos",
    "app-download-title": "Próximo passo: Baixe o aplicativo",
    "app-download-subtitle": "Baixar o aplicativo MyDataHelps torna ainda mais fácil participar do @@PROJECT_NAME@@.",
    "app-download-google-play-link-alt": "Baixar na Google Play Store",
    "app-download-app-store-link-alt": "Baixar na App Store da Apple",
    "start": "Iniciar",
    "resume": "Continuar",
    "start-survey": "Iniciar pesquisa",
    "resume-survey": "Continuar pesquisa",
    "30-day-average": "Média de 30 dias",
    "today": "Hoje",
    "yesterday": "Ontem",
    "tap-to-log-today": "Toque aqui para registrar seus sintomas ou tratamentos hoje!",
    "mild": "Leve",
    "moderate": "Moderado",
    "severe": "Grave",
    "severe-shortened": "grav",
    "moderate-shortened": "mod",
    "mild-shortened": "leve",
    "log-todays-symptoms": "Registrar os sintomas de hoje",
    "todays-log": "Registro de hoje",
    "symptoms": "Sintomas",
    "treatments": "Tratamentos",
    "symptoms-experiencing-today": "Quais sintomas você está sentindo?",
    "symptoms-experiencing-previous": "Quais sintomas você estava sentindo?",
    "treatments-experiencing-today": "Quais tratamentos você realizou?",
    "treatments-experiencing-previous": "Quais tratamentos você realizou?",
    "feeling-overall-today": "Como você se sente no geral hoje?",
    "feeling-overall-previous": "Como você estava se sentindo no geral?",
    "additional-notes": "Alguma observação adicional?",
    "how-severe-is": "Quão grave é o seu",
    "how-severe-was": "Quão grave era o seu",
    "clear-symptom": "Limpar sintoma",
    "add-notes": "Adicionar notas",
    "notes": "Notas",
    "enter-symptom-name": "Digite o nome do sintoma",
    "enter-treatment-name": "Digite o nome do tratamento",
    "severity-tracking-none": "Não rastrear gravidade",
    "severity-tracking-3point": "Avaliação Leve / Moderada / Grave",
    "severity-tracking-10point": "Avaliação de 1 a 10 pontos",
    "muted": "Silenciado",
    "not-muted": "Não Silenciado",
    "delete": "Excluir",
    "severity": "Gravidade",
    "item-delete-warning": "Aviso: Continuar excluirá permanentemente os itens abaixo e todos os dados associados de seus registros. Se você não deseja excluir esses itens, selecione \"Cancelar\".",
    "unsaved-changes": "Alterações não salvas",
    "daily-overall-experience": "Experiência geral diária",
    "average": "Média",
    "include-symptoms": "Incluir sintomas",
    "select-symptoms": "Selecionar sintomas",
    "include-treatments": "Incluir tratamentos",
    "select-treatments": "Selecionar tratamentos",
    "download-mydatahelps": "Baixar MyDataHelps",
    "connect-devices-title": "Conectar dispositivos",
    "connect-devices-text": "Compartilhe dados de seus dispositivos vestíveis, aplicativos e outros dispositivos.",
    "apple-health-troubleshooting-intro": "Se você não aprovou ou desativou o compartilhamento de seus dados do Apple Health e gostaria de ativá-lo, siga estas etapas:",
    "apple-health-troubleshooting-li-1": "Abra o aplicativo \"Ajustes\"",
    "apple-health-troubleshooting-li-2": "Selecione \"Privacidade\"",
    "apple-health-troubleshooting-li-3": "Selecione \"Saúde\"",
    "apple-health-troubleshooting-li-4": "Selecione \"MyDataHelps\"",
    "apple-health-troubleshooting-li-5": "Ative as categorias de dados que deseja compartilhar",
    "how-to-enable": "Como ativar",
    "new-points-title": "Bem feito!",
    "new-points-text": "Você recebeu pontos pelos seguintes itens:",
    "new-points-next-reward-prefix": "Agora você precisa de ",
    "new-points-next-reward-suffix": " pontos para desbloquear sua próxima recompensa.",
    "new-points-done-button-text": "Concluído",
    "systolic-average": "Média sistólica",
    "diastolic-average": "Média diastólica",
    "highest-systolic": "Sistólica mais alta",
    "lowest-systolic": "Sistólica mais baixa",
    "resource-default-button-text": "Abrir",
    "inbox-message-completed-status": "VISTO",
    "inbox-resource-completed-status": "VISTO",
    "inbox-survey-completed-status": "COMPLETADO",
    "inbox-history-view-title": "Histórico da Caixa de Entrada",
    "inbox-history-view-empty-text": "Você não tem itens no histórico da caixa de entrada.",
    "inbox-message-view-related-resources-title": "Relacionado",
    "inbox-view-title": "Caixa de Entrada",
    "inbox-view-empty-text": "Você não tem novos itens na sua caixa de entrada.",
    "inbox-view-messages-title": "Mensagens",
    "inbox-view-surveys-title": "Pesquisas",
    "inbox-view-resources-title": "Recursos",
    "inbox-view-recently-completed-title": "Recente",
    "inbox-view-recently-completed-empty-text": "Você não tem itens recentemente concluídos na sua caixa de entrada.",
    "inbox-view-history-button-text": "Ver histórico da caixa de entrada",
    "choose-report-month": "Escolher Mês do Relatório",
    "include-overall-experience": "Incluir Experiência Geral Diária",
    "include-notes": "Incluir Notas",
    "create-report": "Criar Relatório em PDF",
    "reports": "Relatórios",
    "recent-daily-data-bar-chart-subtitle": "Últimos 7 dias",
    "recent-daily-data-bar-chart-no-data": "Sem Dados",
    "resource-list-empty-text": "Nenhum recurso encontrado.",
    "asthma-symptom-level-none": "Sem sintomas",
    "asthma-symptom-level-mild": "Sintomas leves",
    "asthma-symptom-level-moderate": "Sintomas moderados",
    "asthma-symptom-level-severe": "Sintomas graves",
    "asthma-symptom-difficulty-breathing": "Dificuldade para respirar",
    "asthma-symptom-wheezing": "Chiado",
    "asthma-symptom-coughing": "Tosse",
    "asthma-symptom-chest-tightness": "Aperto ou pressão no peito",
    "asthma-impact-limit-daily-activity": "Limitar sua atividade diária",
    "asthma-impact-waking-at-night": "Acordar à noite",
    "asthma-impact-using-rescue-inhaler": "Usar seu inalador de resgate",
    "asthma-trigger-cold-illness": "Doença fria/viral",
    "asthma-trigger-animal-exposure": "Exposição a animais",
    "asthma-trigger-seasonal-allergens": "Alergenos sazonais/pólen",
    "asthma-trigger-smoke": "Fumaça",
    "asthma-trigger-weather-changes": "Mudanças climáticas extremas",
    "asthma-trigger-air-pollution": "Poluição do ar",
    "asthma-trigger-strong-smells": "Cheiros fortes",
    "asthma-trigger-chemicals": "Produtos químicos/produtos de limpeza",
    "asthma-trigger-dust": "Poeira",
    "asthma-trigger-mold": "Mofo",
    "asthma-trigger-dust-mites": "Ácaros",
    "asthma-trigger-rodents": "Roedores",
    "asthma-trigger-cockroaches": "Baratas",
    "asthma-trigger-nsaid": "Anti-inflamatórios não esteroidais/Aspirina",
    "asthma-trigger-beta-blocker": "Betabloqueador",
    "asthma-trigger-heartburn": "Azia",
    "asthma-trigger-red-wine": "Vinho tinto",
    "asthma-trigger-new-foods": "Alimentos novos",
    "asthma-trigger-cooked-without-ventilation": "Cozinhar (sem ventilação)",
    "asthma-trigger-pet-in-bed": "Animal de estimação na sua cama",
    "asthma-trigger-incense-or-candle": "Vela/Incenso",
    "asthma-data-status-out-of-range": "Fora do alcance",
    "asthma-data-status-in-range": "Dentro do alcance",
    "asthma-data-status-offline": "Offline",
    "asthma-data-status-establishing": "Estabelecendo",
    "asthma-data-status-not-determined": "Linha de base não estabelecida",
    "asthma-data-status-not-found": "Nenhum dado registrado",
    "asthma-data-status-not-configured": "Não configurado",
    "asthma-control-calendar-daily-entry-missed": "Inserção diária perdida",
    "asthma-control-calendar-not-logged-yet": "Ainda não registrado",
    "asthma-control-calendar-log-entries-symptoms-label": "Sintomas",
    "asthma-control-calendar-log-entries-impacts-label": "Impactos",
    "asthma-control-calendar-log-entries-triggers-label": "Desencadeadores",
    "asthma-control-status-header-multiple-out-of-range-p1": "Múltiplos pontos de dados estão ",
    "asthma-control-status-header-multiple-out-of-range-p2": "fora dos seus níveis normais",
    "asthma-control-status-header-multiple-out-of-range-p3": ". Complete sua inserção diária.",
    "asthma-control-status-header-abnormal-heart-rate-p1": "Sua frequência cardíaca de repouso está ",
    "asthma-control-status-header-abnormal-heart-rate-p2": "acima do seu nível normal",
    "asthma-control-status-header-abnormal-heart-rate-p3": ". Complete sua inserção diária.",
    "asthma-control-status-header-abnormal-respiratory-rate-p1": "Sua frequência respiratória está ",
    "asthma-control-status-header-abnormal-respiratory-rate-p2": "acima do seu nível normal",
    "asthma-control-status-header-abnormal-respiratory-rate-p3": ". Complete sua inserção diária.",
    "asthma-control-status-header-abnormal-steps-p1": "Sua atividade está ",
    "asthma-control-status-header-abnormal-steps-p2": "abaixo dos seus níveis normais",
    "asthma-control-status-header-abnormal-steps-p3": ". Complete sua inserção diária.",
    "asthma-control-status-header-abnormal-sleep-p1": "Suas perturbações do sono estão ",
    "asthma-control-status-header-abnormal-sleep-p2": "acima do seu nível normal",
    "asthma-control-status-header-abnormal-sleep-p3": ". Complete sua inserção diária.",
    "asthma-control-status-header-abnormal-blood-oxygen-p1": "Seu nível de oxigênio no sangue está ",
    "asthma-control-status-header-abnormal-blood-oxygen-p2": "abaixo do seu nível normal",
    "asthma-control-status-header-abnormal-blood-oxygen-p3": ". Complete sua inserção diária.",
    "asthma-control-status-header-abnormal-home-aqi-p1": "O Índice de Qualidade do Ar em sua casa é ",
    "asthma-control-status-header-abnormal-home-aqi-p2": ". Complete sua inserção diária.",
    "asthma-control-status-header-abnormal-work-aqi-p1": "O Índice de Qualidade do Ar no seu trabalho é ",
    "asthma-control-status-header-abnormal-work-aqi-p2": ". Complete sua inserção diária.",
    "asthma-control-status-header-no-data": "Adicione uma inserção diária para avaliar o controle da sua asma.",
    "asthma-control-status-header-not-determined": "Mais inserções diárias são necessárias para avaliar o controle da sua asma.",
    "asthma-control-status-header-controlled-p1": "Com base nas suas inserções, sua asma está ",
    "asthma-control-status-header-controlled-p2": "sob controle.",
    "asthma-control-status-header-not-controlled-p1": "Com base nas suas inserções, sua asma está ",
    "asthma-control-status-header-not-controlled-p2": "não está sob controle.",
    "asthma-control-status-header-not-controlled-stat-symptom-days": "Dias de sintomas",
    "asthma-control-status-header-not-controlled-stat-rescue-inhaler": "Inalador de resgate",
    "asthma-control-status-header-not-controlled-stat-limited-activity": "Atividade limitada",
    "asthma-control-status-header-not-controlled-stat-awakenings": "Acordares",
    "asthma-action-plan-manager-title": "Plano de Ação para Asma",
    "asthma-action-plan-manager-instructions": "Salve uma foto do seu plano de ação para asma para referência fácil.",
    "asthma-action-plan-manager-learn-more": "O que é um plano de ação para asma?",
    "asthma-action-plan-manager-edit-button-text": "Editar",
    "asthma-action-plan-manager-not-found-text": "Toque para adicionar uma foto",
    "asthma-biometrics-title": "Saúde e Atividade",
    "asthma-biometrics-daytime-resting-heart-rate-label": "FC de Repouso (Dia)",
    "asthma-biometrics-nighttime-resting-heart-rate-label": "FC de Repouso (Noite)",
    "asthma-biometrics-beats-per-minute-units": "BPM",
    "asthma-biometrics-respiratory-rate-label": "Frequência Respiratória",
    "asthma-biometrics-breaths-per-minute-units": "BPM",
    "asthma-biometrics-steps-label": "Passos",
    "asthma-biometrics-daytime-blood-oxygen-level-label": "Saturação de Oxigênio (Dia)",
    "asthma-biometrics-nighttime-blood-oxygen-level-label": "Saturação de Oxigênio (Noite)",
    "asthma-biometrics-percent-units": "%",
    "asthma-biometrics-sleep-disturbances-label": "Distúrbios do Sono",
    "asthma-air-qualities-title": "Qualidade do Ar",
    "asthma-air-qualities-setup-button-text": "+ Configuração",
    "asthma-air-qualities-home-aqi-label": "IAQ (Casa)",
    "asthma-air-qualities-work-aqi-label": "IAQ (Trabalho)",
    "asthma-alert-takeover-notice-instructions": "Tire um momento para registrar qualquer sintoma de asma em uma inserção diária.",
    "asthma-alert-takeover-notice-add-entry-button-text": "+ Inserção Diária",
    "asthma-alert-takeover-notice-not-now-button-text": "Agora não",
    "asthma-log-entry-details-not-editable": "Inserção diária perdida",
    "asthma-log-entry-details-not-logged-yet": "Ainda não registrado",
    "asthma-log-entry-details-edit-button-text": "Editar",
    "asthma-log-entry-details-add-button-text": "Inserir",
    "asthma-log-entry-details-symptoms-label": "Sintomas",
    "asthma-log-entry-details-impacts-label": "Impactos",
    "asthma-log-entry-details-triggers-label": "Desencadeadores",
    "asthma-log-entry-details-component-no-data-p1": "Nenhum ",
    "asthma-log-entry-details-component-no-data-p2": " registrado",
    "asthma-log-entry-header-today-log-label": "Hoje",
    "asthma-log-entry-header-yesterday-log-label": "Ontem",
    "asthma-log-entry-header-not-logged-yet": "Ainda não registrado",
    "asthma-log-entry-header-add-button-text": "Inserir",
    "asthma-activity-view-title": "Atividade",
    "asthma-activity-view-chart-title": "Passos",
    "asthma-activity-view-alert-message": "Sua atividade está abaixo do seu nível normal.",
    "asthma-alert-takeover-message": "Múltiplos pontos de dados estão fora dos seus níveis normais.",
    "asthma-air-quality-view-title": "Qualidade do Ar",
    "asthma-air-quality-view-home-aqi-chart-title": "Qualidade do Ar (Casa)",
    "asthma-air-quality-view-home-aqi-alert-message": "A IAQ da sua casa está insalubre.",
    "asthma-air-quality-view-work-aqi-chart-title": "Qualidade do Ar (Trabalho)",
    "asthma-air-quality-view-work-aqi-alert-message": "A IAQ do seu trabalho está insalubre.",
    "asthma-heart-and-lungs-view-title": "Coração e Pulmões",
    "asthma-heart-and-lungs-view-dhr-chart-title": "Frequência Cardíaca de Repouso (Dia)",
    "asthma-heart-and-lungs-view-dhr-alert-message": "Sua frequência cardíaca de repouso diurna está acima do seu nível normal.",
    "asthma-heart-and-lungs-view-nhr-chart-title": "Frequência Cardíaca de Repouso (Noite)",
    "asthma-heart-and-lungs-view-nhr-alert-message": "Sua frequência cardíaca de repouso noturna está acima do seu nível normal.",
    "asthma-heart-and-lungs-view-rr-chart-title": "Frequência Respiratória",
    "asthma-heart-and-lungs-view-rr-alert-message": "Sua frequência respiratória está acima do seu nível normal.",
    "asthma-heart-and-lungs-view-dbol-chart-title": "Oxigênio no Sangue (Dia)",
    "asthma-heart-and-lungs-view-dbol-alert-message": "Seu nível de oxigênio no sangue diurno está abaixo do seu nível normal.",
    "asthma-heart-and-lungs-view-nbol-chart-title": "Oxigênio no Sangue (Noite)",
    "asthma-heart-and-lungs-view-nbol-alert-message": "Seu nível de oxigênio no sangue noturno está abaixo do seu nível normal.",
    "asthma-sleep-view-title": "Sono",
    "asthma-sleep-view-chart-title": "Distúrbios do Sono",
    "asthma-sleep-view-alert-message": "Seus distúrbios do sono estão acima do seu nível normal.",
    "asthma-log-entry-editor-view-symptom-level-title": "Nível de Sintomas",
    "asthma-log-entry-editor-view-select-one-subtitle": "Selecione um",
    "asthma-log-entry-editor-view-select-all-subtitle": "Selecione todos que se aplicam",
    "asthma-log-entry-editor-view-symptoms-title": "Sintomas",
    "asthma-log-entry-editor-view-impacts-title": "Impactos",
    "asthma-log-entry-editor-view-triggers-title": "Desencadeadores",
    "asthma-air-quality-description-unhealthy": "Insalubre",
    "asthma-air-quality-description-very-unhealthy": "Muito insalubre",
    "asthma-air-quality-description-hazardous": "Perigoso",
    "blood-type": "Tipo Sanguíneo",
    "device-data-month-chart-no-data": "Sem Dados",
    "device-data-month-chart-daily-average": "Média Diária",
    "term-information-not-found-header": "Nenhuma Informação Encontrada",
    "term-information-not-found-body": "Não foi possível encontrar nenhuma informação sobre este tópico",
    "term-information-disclaimer": "<strong>AVISO:</strong> As informações fornecidas não são aconselhamento médico. Elas são para ajudá-lo a entender melhor sua saúde. Por favor, contate seu prestador de cuidados de saúde se tiver dúvidas sobre sua condição médica.",
    "term-information-view-on-medline": "Ver no MedlinePlus",
    "type": "Tipo",
    "location": "Localização",
    "description": "Descrição",
    "performed-by": "Realizado por",
    "verified-by": "Verificado por",
    "normal-range": "Faixa normal",
    "more": "Mais",
    "procedure": "Procedimento",
    "procedures": "Procedimentos",
    "lab-report": "Relatório de Laboratório",
    "service-performed": "Serviço Realizado",
    "services-performed": "Serviços Realizados",
    "device-data-month-chart-minutes": "Minutos",
    "device-data-month-chart-sleep": "Sono",
    "air-quality-home": "Qualidade do Ar (Casa)",
    "air-quality-work": "Qualidade do Ar (Trabalho)",
    "sedentary-time": "Tempo Sedentário",
    "active-time": "Tempo Ativo",
    "lightly-active-time": "Tempo Levemente Ativo",
    "fairly-active-time": "Tempo Moderadamente Ativo",
    "very-active-time": "Tempo Muito Ativo",
    "breathing-rate": "Taxa de Respiração",
    "calories-burned": "Calorias Queimadas",
    "elevated-heart-rate-time": "Tempo com Frequência Cardíaca Elevada",
    "fat-burn-heart-rate-time": "Tempo de Queima de Gordura",
    "cardio-heart-rate-time": "Tempo de Cardio",
    "peak-heart-rate-time": "Tempo de Frequência Cardíaca Máxima",
    "floors-climbed": "Pisos Subidos",
    "heart-rate-variability": "Variabilidade da Frequência Cardíaca",
    "sleep-time": "Tempo de Sono",
    "light-sleep-time": "Tempo de Sono Leve",
    "deep-sleep-time": "Tempo de Sono Profundo",
    "rem-sleep-time": "Tempo de Sono REM",
    "spo2": "SpO2",
    "heart-rate-range": "Faixa de Frequência Cardíaca",
    "max-heart-rate": "Frequência Cardíaca Máxima",
    "core-sleep-time": "Tempo de Sono Profundo",
    "in-bed-time": "Tempo na Cama",
    "stand-time": "Tempo em Pé",
    "walking-heart-rate-average": "Média da Frequência Cardíaca ao Caminhar",
    "active-energy-burned": "Energia Ativa Queimada",
    "active-calories": "Calorias Ativas",
    "resting-calories": "Calorias em Repouso",
    "total-calories": "Calorias Totais",
    "min-heart-rate": "Frequência Cardíaca Mínima",
    "average-heart-rate": "Frequência Cardíaca Média",
    "max-stress-level": "Nível Máximo de Estresse",
    "average-stress-level": "Nível Médio de Estresse",
    "total-stress-time": "Tempo Total de Estresse",
    "low-stress-time": "Tempo de Baixo Estresse",
    "medium-stress-time": "Tempo de Estresse Médio",
    "high-stress-time": "Tempo de Alto Estresse",
    "awake-time": "Tempo Acordado",
    "sleep-score": "Pontuação do Sono",
    "bpm": "bpm",
    "hours-abbreviation": "h",
    "minutes-abbreviation": "m"
};

export default strings;