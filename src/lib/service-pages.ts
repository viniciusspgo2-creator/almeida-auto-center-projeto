export type ServicePage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  image: string;
  imageAlt: string;
  introTitle: string;
  intro: string;
  pointsTitle: string;
  points: string[];
  processTitle: string;
  process: string[];
  limitsTitle: string;
  limits: string;
  faqs: { question: string; answer: string }[];
  related: { label: string; href: string }[];
  whatsappMessage: string;
};

export const SERVICE_PAGES: Record<string, ServicePage> = {
  "remap-reprogramacao-ecu": {
    slug: "remap-reprogramacao-ecu",
    title: "Remap e Reprogramação de ECU em Bady Bassitt | Almeida Auto Center",
    description:
      "Remap, ECU, Stage 1 e Stage 2 em Bady Bassitt, com foco em diesel, caminhonetes e TSI/importados. Consulte a aplicação no Almeida Auto Center.",
    h1: "Remap e reprogramação de ECU em Bady Bassitt",
    eyebrow: "Performance automotiva",
    image: "/images/eletronica-embarcada.webp",
    imageAlt: "Eletrônica embarcada em veículo no Almeida Auto Center",
    introTitle: "Performance começa com uma avaliação técnica",
    intro:
      "Nesta frente, Remap ou reprogramação de ECU significa ajustar o software da unidade de controle conforme o veículo, a motorização e o objetivo do projeto. O atendimento começa pela consulta das informações do carro e pela avaliação das condições que influenciam a aplicação.",
    pointsTitle: "Aplicações atendidas",
    points: [
      "Remap diesel conforme motorização e condição do veículo",
      "Projetos para caminhonetes, com modelo, ano e motor confirmados",
      "Veículos TSI e importados, com compatibilidade verificada individualmente",
      "Stage 1 e Stage 2 definidos de acordo com o projeto efetivamente oferecido",
    ],
    processTitle: "Como funciona o processo",
    process: [
      "Consulta inicial com modelo, ano, motorização e objetivo",
      "Avaliação técnica e identificação das condições do veículo",
      "Definição da aplicação, orçamento e etapas autorizadas",
      "Execução do serviço e conferência conforme o procedimento realizado",
    ],
    limitsTitle: "Stage 1, Stage 2 e limites do projeto",
    limits:
      "Stage 1 e Stage 2 não são pacotes universais. Componentes, etapas e critérios dependem da aplicação e do processo disponível para cada veículo. Não prometemos percentuais universais de potência, torque ou economia. Resultados só devem ser apresentados quando houver caso real, configuração identificada e método de medição informado.",
    faqs: [
      {
        question: "Todo veículo pode receber Remap?",
        answer:
          "Não. A compatibilidade depende da ECU, da motorização, do estado do veículo e do objetivo. Envie os dados do carro para uma avaliação.",
      },
      {
        question: "Qual é a diferença entre Stage 1 e Stage 2?",
        answer:
          "A diferença não é um padrão universal. As etapas e os componentes necessários dependem do projeto e precisam ser definidos pela equipe técnica.",
      },
      {
        question: "Remap é igual a chip de potência?",
        answer:
          "Não necessariamente. Reprogramação da ECU e módulo adicional são procedimentos diferentes. Consulte a equipe para saber o que é oferecido para o seu veículo.",
      },
      {
        question: "O serviço pode alterar o consumo ou a garantia?",
        answer:
          "O efeito depende da aplicação, do uso e das condições do veículo. A equipe deve explicar possíveis efeitos, limites e impactos antes do orçamento.",
      },
    ],
    related: [
      { label: "Remap diesel", href: "/servicos/remap-diesel" },
      { label: "Remap para caminhonetes", href: "/servicos/remap-caminhonetes" },
      { label: "TSI e importados", href: "/servicos/remap-tsi-importados" },
    ],
    whatsappMessage:
      "Olá! Quero consultar Remap para meu veículo. Modelo, ano, motorização e objetivo:",
  },
  "remap-diesel": {
    slug: "remap-diesel",
    title: "Remap Diesel em Bady Bassitt | Almeida Auto Center",
    description:
      "Remap diesel no Almeida Auto Center, em Bady Bassitt. Consulte a aplicação para sua motorização e conheça o processo de avaliação.",
    h1: "Remap diesel em Bady Bassitt",
    eyebrow: "Projetos diesel",
    image: "/images/hero-servicos.webp",
    imageAlt: "Oficina automotiva para avaliação de veículos diesel",
    introTitle: "Aplicação diesel depende da motorização",
    intro:
      "A frente diesel atende projetos que precisam ser avaliados conforme motor, ECU, uso do veículo e condições atuais. A consulta correta evita tratar motores diferentes como se fossem a mesma aplicação.",
    pointsTitle: "O que informar para consultar",
    points: [
      "Modelo e ano do veículo",
      "Motorização, combustível e configuração conhecida",
      "Objetivo do projeto e tipo de uso predominante",
      "Sintomas, modificações ou manutenção recente relevantes",
    ],
    processTitle: "Avaliação do projeto diesel",
    process: [
      "Recebimento dos dados do veículo e do objetivo",
      "Investigação das condições que podem limitar a aplicação",
      "Explicação das possibilidades e do orçamento",
      "Execução somente após autorização e definição do procedimento",
    ],
    limitsTitle: "Compatibilidade e responsabilidade técnica",
    limits:
      "A existência de uma frente diesel não significa que todos os motores sejam compatíveis. A aplicação precisa ser confirmada pela equipe. Não publicar resultados de potência, torque ou economia sem evidência do veículo e do método de medição.",
    faqs: [
      {
        question: "Vocês fazem Remap em qualquer veículo diesel?",
        answer:
          "Não. A aplicação deve ser consultada por motorização, ECU, estado do veículo e objetivo do projeto.",
      },
      {
        question: "O que devo enviar no primeiro contato?",
        answer:
          "Informe modelo, ano, motorização e objetivo. Se houver alterações ou sintomas, descreva também.",
      },
      {
        question: "O Remap diesel garante economia?",
        answer:
          "Não existe promessa universal. Consumo depende de aplicação, condução, carga, manutenção e condições do veículo.",
      },
    ],
    related: [
      { label: "Página principal de Remap", href: "/servicos/remap-reprogramacao-ecu" },
      { label: "Remap para caminhonetes", href: "/servicos/remap-caminhonetes" },
    ],
    whatsappMessage:
      "Olá! Quero consultar Remap diesel. Modelo, ano, motorização e objetivo:",
  },
  "remap-caminhonetes": {
    slug: "remap-caminhonetes",
    title: "Remap para Caminhonetes em Bady Bassitt | Almeida Auto Center",
    description:
      "Remap e reprogramação de ECU para caminhonetes em Bady Bassitt. Informe modelo, ano e motorização para avaliar seu projeto.",
    h1: "Remap e reprogramação de ECU para caminhonetes",
    eyebrow: "Projetos para caminhonetes",
    image: "/images/hero-oficina.webp",
    imageAlt: "Estrutura de oficina para avaliação de caminhonetes",
    introTitle: "Cada caminhonete exige uma consulta própria",
    intro:
      "Hilux, Ranger, S10 e Amarok podem ser exemplos de busca do público, mas a aplicação não deve ser presumida por nome do modelo. Ano, motor, ECU, alterações e objetivo precisam ser confirmados antes de qualquer proposta.",
    pointsTitle: "Informações necessárias",
    points: [
      "Marca, modelo e ano da caminhonete",
      "Motorização e configuração do conjunto",
      "Uso principal: trabalho, estrada, carga ou lazer",
      "Objetivo do projeto e eventuais modificações já realizadas",
    ],
    processTitle: "Da consulta ao orçamento",
    process: [
      "Análise das informações enviadas pelo proprietário",
      "Verificação da compatibilidade e das limitações do projeto",
      "Definição do escopo e apresentação do orçamento",
      "Agendamento, execução e conferência do procedimento autorizado",
    ],
    limitsTitle: "Sem duplicar a análise diesel",
    limits:
      "Uma caminhonete pode usar motor diesel, mas esta página trata da intenção por veículo e projeto. A confirmação por motorização continua obrigatória; quando a aplicação for diesel, a equipe pode direcionar para a avaliação específica dessa frente.",
    faqs: [
      {
        question: "Quais caminhonetes podem ser avaliadas?",
        answer:
          "A equipe deve confirmar a aplicação por modelo, ano e motorização. Os exemplos de modelos não representam casos executados sem material real.",
      },
      {
        question: "Preciso informar se a caminhonete é diesel?",
        answer:
          "Sim. Combustível e motorização mudam a análise e ajudam a direcionar o projeto correto.",
      },
      {
        question: "Posso solicitar Stage 1 ou Stage 2?",
        answer:
          "Você pode informar o objetivo, mas a definição do Stage depende da aplicação, das condições do veículo e do processo técnico oferecido.",
      },
    ],
    related: [
      { label: "Remap diesel", href: "/servicos/remap-diesel" },
      { label: "Página principal de Remap", href: "/servicos/remap-reprogramacao-ecu" },
    ],
    whatsappMessage:
      "Olá! Quero consultar Remap para minha caminhonete. Modelo, ano, motorização e objetivo:",
  },
  "remap-tsi-importados": {
    slug: "remap-tsi-importados",
    title: "Remap TSI e Importados em Bady Bassitt | Almeida Auto Center",
    description:
      "Remap para veículos TSI e importados em Bady Bassitt. Consulte compatibilidade, objetivos e condições do projeto no Almeida Auto Center.",
    h1: "Remap para veículos TSI e importados em Bady Bassitt",
    eyebrow: "TSI e veículos importados",
    image: "/images/diagnostico-eletronico.webp",
    imageAlt: "Diagnóstico eletrônico para veículos modernos",
    introTitle: "Motores modernos exigem identificação precisa",
    intro:
      "Projetos TSI e importados podem envolver famílias de motores, ECUs, câmbios e configurações diferentes. Por isso, o atendimento começa pela identificação do veículo e pela consulta do objetivo antes de falar em aplicação.",
    pointsTitle: "O que precisa ser distinguido",
    points: [
      "Família do motor e versão do veículo",
      "Ano, ECU e configuração eletrônica",
      "Câmbio, alterações e histórico de manutenção",
      "Objetivo de uso e expectativa do proprietário",
    ],
    processTitle: "Consulta para TSI e importados",
    process: [
      "Coleta dos dados do veículo e da configuração",
      "Avaliação técnica e investigação de limitações",
      "Definição do escopo, condições e orçamento",
      "Execução e conferência conforme o procedimento aprovado",
    ],
    limitsTitle: "Aplicação individual, sem promessa genérica",
    limits:
      "TSI e importados não formam uma única aplicação. Compatibilidade, necessidade de componentes e possíveis efeitos precisam ser discutidos para o veículo específico. Resultados só devem ser divulgados com evidência real e método de medição identificável.",
    faqs: [
      {
        question: "Todo motor TSI recebe o mesmo Remap?",
        answer:
          "Não. A família do motor, a ECU, o ano e a configuração precisam ser confirmados individualmente.",
      },
      {
        question: "Veículos importados também podem ser avaliados?",
        answer:
          "A equipe deve verificar a compatibilidade e as condições do projeto a partir dos dados do veículo.",
      },
      {
        question: "É necessário trocar componentes?",
        answer:
          "Isso depende do projeto e não deve ser presumido. A necessidade será explicada antes da execução.",
      },
    ],
    related: [
      { label: "Página principal de Remap", href: "/servicos/remap-reprogramacao-ecu" },
      { label: "Diagnóstico automotivo", href: "/servicos/diagnostico-automotivo" },
    ],
    whatsappMessage:
      "Olá! Quero consultar Remap para um veículo TSI/importado. Modelo, ano, motor e objetivo:",
  },
  "auto-eletrica": {
    slug: "auto-eletrica",
    title: "Auto Elétrica em Bady Bassitt | Almeida Auto Center",
    description:
      "Auto elétrica em Bady Bassitt para bateria, alternador, partida e falhas elétricas. Agende uma avaliação no Almeida Auto Center.",
    h1: "Auto elétrica em Bady Bassitt",
    eyebrow: "Elétrica automotiva",
    image: "/images/eletronica-embarcada.webp",
    imageAlt: "Diagnóstico de sistema elétrico automotivo",
    introTitle: "Testes elétricos antes da decisão de reparo",
    intro:
      "Dificuldade de partida, bateria descarregando, falhas intermitentes e problemas no alternador podem ter origens diferentes. A avaliação relaciona o sintoma aos testes necessários para indicar o reparo adequado.",
    pointsTitle: "Situações avaliadas",
    points: [
      "Dificuldade de partida e falhas no motor de partida",
      "Bateria descarregando ou sem retenção de carga",
      "Alternador e sistema de carregamento",
      "Falhas elétricas e eletrônica embarcada",
    ],
    processTitle: "Como a auto elétrica é investigada",
    process: [
      "Registro do sintoma e do histórico do veículo",
      "Testes no sistema relacionado à falha",
      "Explicação da causa provável e do orçamento",
      "Reparo autorizado e conferência do funcionamento",
    ],
    limitsTitle: "Diagnóstico orienta o reparo",
    limits:
      "Uma bateria nova nem sempre resolve uma falha de partida. O teste deve orientar a decisão entre bateria, alternador, cabos, partida ou outro componente relacionado.",
    faqs: [
      {
        question: "A bateria descarrega com frequência. O problema é a bateria?",
        answer:
          "Pode ser, mas alternador, fuga de corrente, cabos e outros componentes também precisam ser avaliados.",
      },
      {
        question: "Vocês avaliam alternador e motor de partida?",
        answer:
          "Sim, a consulta pode incluir esses sistemas conforme o sintoma apresentado.",
      },
      {
        question: "Uma falha intermitente pode ser encontrada?",
        answer:
          "A investigação depende do histórico, dos testes disponíveis e da reprodução do sintoma. Informe quando e como ele acontece.",
      },
    ],
    related: [
      { label: "Diagnóstico automotivo", href: "/servicos/diagnostico-automotivo" },
      { label: "Mecânica geral", href: "/servicos/mecanica-geral" },
    ],
    whatsappMessage:
      "Olá! Quero agendar uma avaliação de auto elétrica. Veículo e sintoma:",
  },
  "mecanica-geral": {
    slug: "mecanica-geral",
    title: "Oficina Mecânica em Bady Bassitt | Almeida Auto Center",
    description:
      "Oficina mecânica em Bady Bassitt para manutenção, freios, suspensão, óleo e correia, conforme a necessidade do veículo.",
    h1: "Mecânica geral e manutenção em Bady Bassitt",
    eyebrow: "Mecânica geral",
    image: "/images/mecanica-motor.webp",
    imageAlt: "Manutenção mecânica em motor de veículo",
    introTitle: "Manutenção preventiva e corretiva com prioridade clara",
    intro:
      "A oficina mecânica avalia o estado do veículo, o sintoma relatado e a prioridade de cada intervenção. O objetivo é separar o que precisa de atenção imediata do que pode ser programado.",
    pointsTitle: "Serviços e sinais de atenção",
    points: [
      "Manutenção preventiva e corretiva",
      "Freios, suspensão, óleo e correias conforme avaliação",
      "Ruídos, vibrações, desgaste e comportamento irregular",
      "Check-up para organizar prioridades de manutenção",
    ],
    processTitle: "Como o atendimento é organizado",
    process: [
      "Conversa sobre o sintoma, uso e histórico do veículo",
      "Inspeção e testes nos sistemas relacionados",
      "Orçamento com prioridades e explicação das alternativas",
      "Execução autorizada e conferência antes da entrega",
    ],
    limitsTitle: "Cada reparo depende da inspeção",
    limits:
      "O mesmo sintoma pode ter causas diferentes. O orçamento deve ser feito após a verificação do conjunto e não apenas pelo nome da peça ou pelo relato isolado.",
    faqs: [
      {
        question: "Quando devo fazer manutenção preventiva?",
        answer:
          "A periodicidade depende do veículo, do uso e das recomendações aplicáveis. Um check-up ajuda a organizar as próximas intervenções.",
      },
      {
        question: "Freios e suspensão são avaliados juntos?",
        answer:
          "Podem ser avaliados conforme o sintoma e o objetivo do atendimento, com prioridades explicadas no orçamento.",
      },
      {
        question: "Vocês fazem troca de óleo e correia?",
        answer:
          "Esses itens aparecem no catálogo, mas a aplicação e a necessidade devem ser confirmadas para o veículo.",
      },
    ],
    related: [
      { label: "Auto elétrica", href: "/servicos/auto-eletrica" },
      { label: "Diagnóstico automotivo", href: "/servicos/diagnostico-automotivo" },
    ],
    whatsappMessage:
      "Olá! Quero agendar uma avaliação de mecânica. Veículo e serviço desejado:",
  },
  "diagnostico-automotivo": {
    slug: "diagnostico-automotivo",
    title: "Diagnóstico Automotivo em Bady Bassitt | Almeida Auto Center",
    description:
      "Diagnóstico automotivo em Bady Bassitt com scanner e investigação de falhas. A leitura de códigos é parte da análise, não o diagnóstico completo.",
    h1: "Diagnóstico automotivo com scanner em Bady Bassitt",
    eyebrow: "Diagnóstico automotivo",
    image: "/images/diagnostico-eletronico.webp",
    imageAlt: "Scanner em diagnóstico eletrônico automotivo",
    introTitle: "Scanner é parte da investigação",
    intro:
      "Ler códigos de falha ajuda a direcionar a investigação, mas não representa sozinho um diagnóstico completo. A equipe relaciona alertas, sintomas, parâmetros e testes para buscar a origem do problema.",
    pointsTitle: "Quando procurar avaliação",
    points: [
      "Luzes acesas no painel",
      "Perda de potência ou consumo elevado",
      "Falhas intermitentes e funcionamento irregular",
      "Sintomas que permanecem mesmo após troca de peça",
    ],
    processTitle: "Etapas do diagnóstico",
    process: [
      "Levantamento do sintoma e do histórico",
      "Leitura de códigos e análise dos sistemas envolvidos",
      "Testes complementares conforme a investigação",
      "Explicação da causa provável e dos próximos passos",
    ],
    limitsTitle: "Código de falha não é sentença de troca",
    limits:
      "Um código aponta uma condição registrada pelo sistema, mas não determina sozinho qual peça deve ser substituída. A conclusão depende do conjunto de evidências e dos testes realizados.",
    faqs: [
      {
        question: "Scanner resolve qualquer falha?",
        answer:
          "Não. A leitura é uma etapa da investigação e pode precisar de testes adicionais para chegar à causa.",
      },
      {
        question: "Posso levar o carro só com a luz do painel acesa?",
        answer:
          "Sim. Informe quando a luz apareceu, se há perda de potência e qualquer mudança no funcionamento.",
      },
      {
        question: "O diagnóstico já inclui o reparo?",
        answer:
          "O diagnóstico orienta o orçamento. O reparo depende da autorização e da definição do serviço necessário.",
      },
    ],
    related: [
      { label: "Injeção eletrônica", href: "/servicos/injecao-eletronica" },
      { label: "Auto elétrica", href: "/servicos/auto-eletrica" },
    ],
    whatsappMessage:
      "Olá! Quero agendar um diagnóstico automotivo. Veículo e sintomas:",
  },
  "injecao-eletronica": {
    slug: "injecao-eletronica",
    title: "Injeção Eletrônica em Bady Bassitt | Almeida Auto Center",
    description:
      "Diagnóstico e reparo de injeção eletrônica em Bady Bassitt, com investigação de sensores, atuadores e funcionamento do motor.",
    h1: "Diagnóstico e reparo de injeção eletrônica",
    eyebrow: "Injeção eletrônica",
    image: "/images/reparo-motor.webp",
    imageAlt: "Reparo e diagnóstico de motor com injeção eletrônica",
    introTitle: "Falha de injeção exige investigação do conjunto",
    intro:
      "Sensores, atuadores, alimentação, ignição e controle do motor trabalham em conjunto. A avaliação procura diferenciar uma falha real de componente de um sintoma causado por outro sistema.",
    pointsTitle: "Sintomas que merecem avaliação",
    points: [
      "Luz de injeção acesa",
      "Falhas, engasgos ou dificuldade de partida",
      "Perda de potência e consumo elevado",
      "Marcha lenta irregular e comportamento intermitente",
    ],
    processTitle: "Diagnóstico e reparo",
    process: [
      "Registro dos sintomas e das condições em que aparecem",
      "Análise de códigos, parâmetros, sensores e atuadores",
      "Testes no sistema relacionado e orçamento explicado",
      "Reparo autorizado e conferência do funcionamento",
    ],
    limitsTitle: "Injeção não é a mesma coisa que performance",
    limits:
      "Esta página trata de investigação e reparo de falhas do sistema de injeção. Remap e reprogramação de ECU pertencem a uma frente diferente e devem ser avaliados conforme o projeto.",
    faqs: [
      {
        question: "A luz de injeção acesa indica qual peça trocar?",
        answer:
          "Não necessariamente. O código e os sintomas precisam ser investigados antes da substituição de componentes.",
      },
      {
        question: "Injeção eletrônica inclui sensores e atuadores?",
        answer:
          "A avaliação pode envolver esses itens conforme o sistema e o sintoma apresentado.",
      },
      {
        question: "Injeção eletrônica é Remap?",
        answer:
          "Não. Reparo de falhas e performance são frentes diferentes, embora ambas possam envolver a eletrônica do veículo.",
      },
    ],
    related: [
      { label: "Diagnóstico automotivo", href: "/servicos/diagnostico-automotivo" },
      { label: "Remap e ECU", href: "/servicos/remap-reprogramacao-ecu" },
    ],
    whatsappMessage:
      "Olá! Quero avaliar a injeção eletrônica do meu carro. Veículo e sintoma:",
  },
};

export const SERVICE_PAGE_SLUGS = Object.keys(SERVICE_PAGES);
