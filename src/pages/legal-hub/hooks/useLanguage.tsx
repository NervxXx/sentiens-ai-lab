import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

type Language = 'ru' | 'en';

interface TranslationKeys {
  hero: {
    updated: string;
    title: string;
    subtitle: string;
  };
  nav: {
    home: string;
    privacy: string;
    terms: string;
    cookies: string;
  };
  footer: {
    contact: string;
    email: string;
    copyright: string;
    description: string;
    location: string;
    products: string;
    social: string;
    made_with: string;
    and_ai: string;
    systems_operational: string;
  };
  action: {
    search: string;
    scrollTop: string;
    collapse: string;
    expand: string;
  };
  privacy: {
    title: string;
    intro: string;
    section1: { title: string; content: string };
    section2: { title: string; content: string };
    section3: { title: string; content: string };
    section4: { title: string; content: string };
    section5: { title: string; content: string };
    section6: { title: string; content: string };
    section7: { title: string; content: string };
    section8: { title: string; content: string };
    important: string;
  };
  terms: {
    title: string;
    intro: string;
    section1: { title: string; content: string };
    section2: { title: string; content: string };
    section3: { title: string; content: string };
    section4: { title: string; content: string };
    section5: { title: string; content: string };
    section6: { title: string; content: string };
    section7: { title: string; content: string };
    important: string;
  };
  cookies: {
    title: string;
    intro: string;
    section1: { title: string; content: string };
    section2: { title: string; content: string };
    section3: { title: string; content: string };
    section4: { title: string; content: string };
    section5: { title: string; content: string };
    section6: { title: string; content: string };
    important: string;
  };
}

const translations: Record<Language, TranslationKeys> = {
  ru: {
    hero: {
      updated: 'Обновлено 29 января,2026',
      title: 'Юридический центр',
      subtitle: 'Политика конфиденциальности, условия использования и другая правовая информация'
    },
    nav: {
      home: 'Главная',
      privacy: 'Конфиденциальность',
      terms: 'Условия',
      cookies: 'Cookies'
    },
    footer: {
      contact: 'Контакты',
      email: 'info@sentiensapps.online',
      copyright: ' 2024 Sentiens AI Lab. Все права защищены.',
      description: 'Создаем интеллектуальные приложения, которые меняют способ взаимодействия человека с технологиями.',
      location: 'Global',
      products: 'Продукты',
      social: 'Социальные сети',
      made_with: 'Сделано с',
      and_ai: 'и ИИ',
      systems_operational: 'Все системы работают'
    },
    action: {
      search: 'Поиск',
      scrollTop: 'Наверх',
      collapse: 'Свернуть',
      expand: 'Развернуть'
    },
    privacy: {
      title: 'ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ',
      intro: 'SentiensApps создает экосистему приложений с AI-агентами — цифровыми сущностями с памятью, характером и целеполаганием. Наша работа основана на принципах прозрачности, этичности и законности. Эта политика объясняет, как мы обрабатываем ваши данные при использовании наших сервисов.',
      section1: { 
        title: 'Какие данные мы собираем', 
        content: 'Мы обрабатываем данные, необходимые для работы уникальных AI-агентов:\n\nДанные аккаунта: Электронная почта, хэшированный пароль.\n\nКонтент взаимодействий: Полная история ваших диалогов с AI-агентами, включая ваши сообщения, ответы агента, выбранные персонажи и темы. Это ключевые данные для обеспечения памяти и контекста наших агентов.\n\nТехнические данные: IP-адрес, тип браузера и ОС, данные об устройстве, записи в логах (дата, время использования).\n\nДанные обратной связи: Отзывы и сообщения в поддержку.'
      },
      section2: { 
        title: 'Как мы используем ваши данные', 
        content: 'Для предоставления услуг: Обеспечение диалога с AI-агентом, сохранение контекста беседы, персонализация взаимодействия.\n\nДля улучшения сервиса: Анонимизированный анализ диалогов для обучения и тонкой настройки моделей агентов, повышения релевантности ответов.\n\nДля безопасности и работы: Защита от мошенничества, обеспечение работоспособности приложений, техническая поддержка.'
      },
      section3: { 
        title: 'Передача данных сторонним AI-провайдерам (Ключевое положение)', 
        content: 'Наши агенты построены на базе больших языковых моделей (LLM). Для генерации ответов мы передаем содержание ваших диалогов (ваши сообщения и контекст) технологическим партнерам, таким как OpenAI (GPT) и/или OpenRouter. Эти провайдеры действуют как обработчики данных по нашему поручению. Мы не передаем ваши данные для их независимого маркетинга.'
      },
      section4: { 
        title: 'Ваши права',
        content: 'Вы имеете право:\n\nНа доступ и исправление ваших данных.\n\nНа удаление ("право на забвение"): Удалить аккаунт и всю историю диалогов через функцию в настройках профиля.\n\nНа возражение против обработки и на переносимость данных (в формате, пригодном для чтения машиной).\n\nДля запросов: Напишите на privacy@sentiensapps.online. Мы ответим в течение 30 дней.'
      },
      section5: {
        title: 'Хранение и безопасность',
        content: 'Срок хранения: Данные хранятся, пока активен аккаунт. После удаления основные данные стираются из рабочих баз за 30 дней, из резервных копий — за 90 дней.\n\nБезопасность: Мы используем современное шифрование (при передаче и хранении), контроль доступа и регулярные проверки безопасности.'
      },
      section6: {
        title: 'Изменения политики',
        content: 'Мы уведомим об существенных изменениях, разместив обновленную версию на сайте. Продолжение использования сервисов означает принятие новой политики.'
      },
      section7: {
        title: 'Контакты для вопросов по конфиденциальности',
        content: 'По всем вопросам, касающимся этой политики конфиденциальности, обращайтесь по адресу: privacy@sentiensapps.online.'
      },
      section8: {
        title: 'Обновления политики',
        content: 'Мы можем обновлять эту политику. Изменения будут опубликованы на этой странице с указанием даты последнего обновления. Существенные изменения будут доведены до сведения пользователей через уведомления в приложении или по электронной почте.'
      },
      important: 'По всем вопросам, касающимся этих документов, обращайтесь по адресу: legal@sentiensapps.online.'
    },
    terms: {
      title: 'УСЛОВИЯ ИСПОЛЬЗОВАНИЯ',
      intro: 'Используя приложения SentiensApps, вы подтверждаете, что прочитали, поняли и соглашаетесь с этими условиями.',
      section1: { 
        title: 'Правила использования и запреты', 
        content: 'Вы соглашаетесь использовать сервисы законно и этично. В частности, запрещается использовать AI-агентов для:\n\nВведения в заблуждение: Выдавать контент, сгенерированный агентом, за созданный человеком без соответствующих пояснений.\n\nВредоносной деятельности: Создания спама, дезинформации, контента, разжигающего ненависть или насилие.\n\nНезаконных консультаций: Получения или предоставления юридических, медицинских, финансовых консультаций, имеющих обязательные последствия.\n\nНарушения прав: Генерации контента, нарушающего интеллектуальные права третьих лиц.\n\nРаботы с конфиденциальными данными: Передачи агенту особо охраняемых персональных данных (о здоровье, убеждениях и т.д.) или коммерческой тайны.'
      },
      section2: { 
        title: 'Интеллектуальная собственность', 
        content: 'Со стороны SentiensApps: Платформа, дизайн, исходный код, фирменный стиль и сама архитектура Sentiens Engine являются нашей интеллектуальной собственностью.\n\nСо стороны пользователя: Вы сохраняете права на тексты, которые вы вводите (промпты). Сгенерированные агентом тексты и медиа предоставляются вам для личного некоммерческого использования.'
      },
      section3: { 
        title: 'Ответственность и отказ от гарантий', 
        content: '"Как есть": Сервисы и AI-агенты предоставляются "как есть". Мы не гарантируем их бесперебойную работу, точность, полноту или пригодность генераций для каких-либо конкретных целей.\n\n"Галлюцинации" ИИ: Вы понимаете и соглашаетесь с тем, что AI-агенты могут создавать правдоподобно звучащие, но фактологически неверные или вымышленные утверждения ("галлюцинации").\n\nОграничение ответственности: SentiensApps не несет ответственности за любые косвенные, случайные убытки или упущенную выгоду, возникшие в связи с использованием сервисов.'
      },
      section4: { 
        title: 'Прекращение доступа', 
        content: 'Мы оставляем за собой право приостановить или удалить ваш аккаунт при нарушении этих условий.'
      },
      section5: {
        title: 'Изменения условий',
        content: 'Мы можем изменять условия. О существенных изменениях сообщим по электронной почте или через уведомление в приложении. Продолжение использования означает согласие с новыми условиями.'
      },
      section6: {
        title: 'Контакты',
        content: 'По вопросам: support@sentiensapps.online.'
      },
      section7: {
        title: 'Применяемое право',
        content: 'Настоящие условия регулируются законодательством. Все споры подлежат разрешению в судах по месту нахождения SentiensApps.'
      },
      important: 'Продолжая использовать сервисы, вы подтверждаете свое согласие с обновленными условиями.'
    },
    cookies: {
      title: 'ПОЛИТИКА В ОТНОШЕНИИ ФАЙЛОВ COOKIE',
      intro: 'Это небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении сайта. Они помогают сайту работать, запоминать ваши предпочтения и анализировать использование.',
      section1: { 
        title: 'Что такое файлы cookie?', 
        content: 'Это небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении сайта. Они помогают сайту работать, запоминать ваши предпочтения и анализировать использование.'
      },
      section2: { 
        title: 'Строго необходимые cookie', 
        content: 'Эти файлы абсолютно необходимы для базовой работы наших веб-приложений. Они обеспечивают такие функции, как безопасный вход в ваш аккаунт (аутентификация), защита данных и сохранение текущей сессии. Без этих cookie наши сервисы не смогут функционировать корректно.\n\nПримеры: Идентификатор сессии (session_id), токен аутентификации (auth_token).'
      },
      section3: { 
        title: 'Функциональные cookie', 
        content: 'Эти файлы позволяют нашему сайту запоминать сделанные вами выборы и предпочтения, чтобы предоставлять более персонализированные и удобные функции. Они запоминают такие настройки, как выбранный язык интерфейса или конкретный AI-агент, с которым вы работали в последний раз.\n\nПримеры: Файлы для хранения предпочитаемого языка (preferred_lang), выбранного персонажа или агента (selected_agent).'
      },
      section4: { 
        title: 'Аналитические cookie', 
        content: 'Эти файлы помогают нам понять, как посетители взаимодействуют с нашими приложениями. Мы собираем анонимную и агрегированную информацию о том, какие функции используются чаще, с какими страницами возникают проблемы и как пользователи перемещаются по приложению. Эти данные критически важны для нас, чтобы анализировать и улучшать производительность, дизайн и пользовательский опыт наших продуктов.\n\nПримеры: Файлы сервисов аналитики, таких как Google Analytics или Яндекс.Метрика, которые используются исключительно в обезличенном виде (например, с обрезанным IP-адресом).'
      },
      section5: {
        title: 'Маркетинговые cookie',
        content: 'Эти файлы могут использоваться нашими рекламными партнерами (например, через платформы Meta или Google Ads) для показа вам релевантной рекламы наших продуктов на других сайтах. Они отслеживают посещения наших страниц и помогают нам оценивать эффективность рекламных кампаний. Эти cookie являются полностью опциональными.\n\nПримеры: Файлы ретаргетинга от рекламных сетей.'
      },
      section6: {
        title: 'Сторонние cookie',
        content: 'Наши сайты могут содержать элементы (кнопки соцсетей, встроенные видео), которые устанавливают cookie от их владельцев (например, Facebook, YouTube). Мы не контролируем эти файлы.'
      },
      important: 'Учтите, что отключение необходимых или функциональных cookie может нарушить работу приложений. По всем вопросам, касающимся этих документов, обращайтесь по адресу: legal@sentiensapps.online.'
    }
  },
  en: {
    hero: {
      updated: 'Updated January 29, 2026',
      title: 'Legal Hub',
      subtitle: 'Privacy policy, terms of use, and other legal information'
    },
    nav: {
      home: 'Home',
      privacy: 'Privacy',
      terms: 'Terms',
      cookies: 'Cookies'
    },
    footer: {
      contact: 'Contact',
      email: 'info@sentiensapps.online',
      copyright: ' 2024 Sentiens AI Lab. All rights reserved.',
      description: 'We create intelligent applications that change the way humans interact with technology.',
      location: 'Global',
      products: 'Products',
      social: 'Social Networks',
      made_with: 'Made with',
      and_ai: 'and AI',
      systems_operational: 'All systems operational'
    },
    action: {
      search: 'Search',
      scrollTop: 'Scroll to top',
      collapse: 'Collapse',
      expand: 'Expand'
    },
    privacy: {
      title: 'Privacy Policy',
      intro: 'SentiensApps creates an ecosystem of applications with AI agents—digital entities with memory, character, and goal-setting. Our work is based on the principles of transparency, ethics, and legality. This policy explains how we process your data when you use our services.',
      section1: { 
        title: 'What Data We Collect', 
        content: 'We process data necessary for the operation of our unique AI agents:\n\nAccount Data: Email address, hashed password.\n\nInteraction Content: The complete history of your dialogues with AI agents, including your messages, agent responses, chosen characters, and topics. This is key data for providing memory and context to our agents.\n\nTechnical Data: IP address, browser type and OS, device information, log records (date, time of use).\n\nFeedback Data: Reviews and support messages.'
      },
      section2: { 
        title: 'How We Use Your Data', 
        content: 'To Provide Services: Enabling dialogue with an AI agent, preserving conversation context, personalizing interaction.\n\nTo Improve Service: Anonymized analysis of dialogues for training and fine-tuning agent models, improving response relevance.\n\nFor Security and Operation: Fraud prevention, ensuring application functionality, technical support.'
      },
      section3: { 
        title: 'Data Transfer to Third-Party AI Providers (Key Provision)', 
        content: 'Our agents are built on large language models (LLMs). To generate responses, we transmit the content of your dialogues (your messages and context) to technological partners such as OpenAI (GPT) and/or OpenRouter. These providers act as data processors on our behalf. We do not transfer your data for their independent marketing purposes.'
      },
      section4: { 
        title: 'Your Rights',
        content: 'You have the right:\n\nAccess and correct your data.\n\nDeletion ("right to be forgotten"): Delete your account and entire dialogue history via a function in your profile settings.\n\nObject to processing and to data portability (in a machine-readable format).\n\nFor requests: Write to privacy@sentiensapps.online. We will respond within 30 days.'
      },
      section5: {
        title: 'Storage and Security',
        content: 'Retention Period: Data is stored while the account is active. After deletion, core data is erased from operational databases within 30 days, and from backup copies within 90 days.\n\nSecurity: We use modern encryption (in transit and at rest), access control, and regular security audits.'
      },
      section6: {
        title: 'Policy Changes',
        content: 'We will notify you of significant changes by posting the updated version on the site. Continued use of the services signifies acceptance of the new policy.'
      },
      section7: {
        title: 'Privacy Contact',
        content: 'For all questions regarding this privacy policy, please contact: privacy@sentiensapps.online.'
      },
      section8: {
        title: 'Policy Updates',
        content: 'We may update this policy. Changes will be published on this page with the date of the last update. Significant changes will be communicated to users through in-app notifications or email.'
      },
      important: 'For all questions regarding these documents, please contact: legal@sentiensapps.online.'
    },
    terms: {
      title: 'TERMS OF USE',
      intro: 'By using SentiensApps applications, you confirm that you have read, understood, and agree to these terms.',
      section1: { 
        title: 'Rules of Use and Prohibitions', 
        content: 'You agree to use the services legally and ethically. Specifically, it is prohibited to use AI agents for:\n\nMisleading Others: Presenting content generated by an agent as human-created without appropriate disclosure.\n\nMalicious Activity: Creating spam, disinformation, or content that incites hatred or violence.\n\nUnauthorized Consultations: Seeking or providing legal, medical, or financial advice that carries binding consequences.\n\nRights Infringement: Generating content that violates the intellectual property rights of third parties.\n\nHandling Confidential Data: Transmitting specially protected personal data (e.g., concerning health, beliefs) or trade secrets to the agent.'
      },
      section2: { 
        title: 'Intellectual Property', 
        content: 'By SentiensApps: The platform, design, source code, branding, and the Sentiens Engine architecture itself are our intellectual property.\n\nBy the User: You retain rights to the texts you input (prompts). Texts and media generated by the agent are provided to you for personal, non-commercial use.'
      },
      section3: { 
        title: 'Liability and Disclaimer of Warranties', 
        content: '"As Is": Services and AI agents are provided "as is". We do not guarantee their uninterrupted operation, accuracy, completeness, or the suitability of generated content for any specific purposes.\n\nAI "Hallucinations": You understand and agree that AI agents can produce plausible-sounding but factually incorrect or fictional statements ("hallucinations").\n\nLimitation of Liability: To the maximum extent permitted by law, SentiensApps shall not be liable for any indirect, incidental damages, or lost profits arising from the use of the services.'
      },
      section4: { 
        title: 'Access Termination', 
        content: 'We reserve the right to suspend or delete your account if you violate these terms.'
      },
      section5: {
        title: 'Changes to Terms',
        content: 'We may change the terms. We will notify you of significant changes via email or an in-app notification. Continued use signifies agreement to the new terms.'
      },
      section6: {
        title: 'Contacts',
        content: 'For questions: support@sentiensapps.online.'
      },
      section7: {
        title: 'Governing Law',
        content: 'These terms are governed by applicable law. All disputes shall be resolved in the courts at the location of SentiensApps.'
      },
      important: 'By continuing to use the services, you confirm your agreement with the updated terms.'
    },
    cookies: {
      title: 'COOKIE POLICY',
      intro: 'These are small text files saved on your device when you visit a site. They help the site work, remember your preferences, and analyze usage.',
      section1: { 
        title: 'What Are Cookies?', 
        content: 'These are small text files saved on your device when you visit a site. They help the site work, remember your preferences, and analyze usage.'
      },
      section2: { 
        title: 'Strictly Necessary Cookies', 
        content: 'These files are absolutely essential for the basic operation of our web applications. They enable functions such as secure login to your account (authentication), data protection, and maintaining your current session. Without these cookies, our services cannot function correctly.\n\nExamples: Session identifier (session_id), authentication token (auth_token).'
      },
      section3: { 
        title: 'Functional Cookies', 
        content: 'These files allow our site to remember choices and preferences you make to provide more personalized and convenient features. They remember settings like your chosen interface language or the specific AI agent you last worked with.\n\nExamples: Files storing your preferred language (preferred_lang), selected character or agent (selected_agent).'
      },
      section4: { 
        title: 'Analytical Cookies', 
        content: 'These files help us understand how visitors interact with our applications. We collect anonymous and aggregated information about which features are used most often, which pages have issues, and how users navigate the app. This data is critically important for us to analyze and improve the performance, design, and user experience of our products.\n\nExamples: Files from analytics services like Google Analytics or Yandex.Metrika, used exclusively in an anonymized form (e.g., with truncated IP addresses).'
      },
      section5: {
        title: 'Marketing Cookies',
        content: 'These files may be used by our advertising partners (e.g., via Meta or Google Ads platforms) to show you relevant advertisements for our products on other websites. They track visits to our pages and help us evaluate the effectiveness of advertising campaigns. These cookies are completely optional.\n\nExamples: Retargeting cookies from advertising networks.'
      },
      section6: {
        title: 'Third-Party Cookies',
        content: 'Our sites may contain elements (social media buttons, embedded videos) that set cookies from their owners (e.g., Facebook, YouTube). We do not control these files.'
      },
      important: 'For all questions regarding these documents, please contact: legal@sentiensapps.online.'
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('ru');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'ru' || savedLang === 'en')) {
      setLanguage(savedLang);
    }
  }, []);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};