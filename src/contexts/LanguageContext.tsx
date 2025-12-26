import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.services': 'خدماتنا',
    'nav.about': 'من نحن',
    'nav.portfolio': 'أعمالنا',
    'nav.contact': 'تواصل معنا',
    'nav.login': 'تسجيل الدخول',
    'nav.signup': 'إنشاء حساب',
    
    // Hero Section
    'hero.badge': 'الريادة في تطوير المواقع التعليمية',
    'hero.title': 'نحوّل أفكارك التعليمية',
    'hero.titleHighlight': 'إلى واقع رقمي',
    'hero.description': 'شركة LEARNEXA متخصصة في تصميم وتطوير المواقع الإلكترونية للقطاع التعليمي. من المدارس إلى المراكز التعليمية، نحن شريكك في التحول الرقمي.',
    'hero.cta.start': 'ابدأ مشروعك',
    'hero.cta.explore': 'استكشف خدماتنا',
    'hero.stats.projects': 'مشروع منجز',
    'hero.stats.clients': 'عميل سعيد',
    'hero.stats.experience': 'سنوات خبرة',
    
    // Services Section
    'services.badge': 'خدماتنا المتميزة',
    'services.title': 'حلول متكاملة للتعليم الرقمي',
    'services.description': 'نقدم مجموعة شاملة من الخدمات لتلبية جميع احتياجاتك التقنية',
    'services.schools.title': 'مواقع المدارس',
    'services.schools.desc': 'مواقع احترافية للمدارس مع نظام إدارة متكامل للطلاب والمعلمين وأولياء الأمور',
    'services.centers.title': 'مراكز التعليم',
    'services.centers.desc': 'منصات متقدمة للمراكز التعليمية مع حجز الدورات والدفع الإلكتروني',
    'services.teachers.title': 'مواقع المدرسين',
    'services.teachers.desc': 'مواقع شخصية للمدرسين لعرض خدماتهم وحجز الحصص الخصوصية',
    'services.lms.title': 'أنظمة التعلم',
    'services.lms.desc': 'أنظمة إدارة تعلم متكاملة مع فيديوهات واختبارات وشهادات',
    'services.apps.title': 'تطبيقات الموبايل',
    'services.apps.desc': 'تطبيقات موبايل تعليمية لنظامي iOS و Android',
    'services.support.title': 'الدعم الفني',
    'services.support.desc': 'دعم فني على مدار الساعة وصيانة دورية لضمان استمرارية خدماتك',
    
    // About Section
    'about.badge': 'لماذا LEARNEXA؟',
    'about.title': 'نخبة من المبرمجين المحترفين',
    'about.description': 'نمتلك فريقاً من أفضل المطورين المتخصصين في القطاع التعليمي، قادرين على تحويل أي فكرة إلى منتج رقمي متميز.',
    'about.feature1.title': 'خبرة متخصصة',
    'about.feature1.desc': 'سنوات من الخبرة في تطوير المنصات التعليمية',
    'about.feature2.title': 'تقنيات حديثة',
    'about.feature2.desc': 'نستخدم أحدث التقنيات لضمان الأداء والأمان',
    'about.feature3.title': 'دعم مستمر',
    'about.feature3.desc': 'فريق دعم متاح على مدار الساعة لمساعدتك',
    'about.feature4.title': 'أسعار منافسة',
    'about.feature4.desc': 'جودة عالية بأسعار تناسب جميع الميزانيات',
    
    // Team Section
    'team.badge': 'فريقنا',
    'team.title': 'القائمون على الشركة',
    'team.founder': 'المؤسس والمدير التنفيذي',
    'team.founder.bio': 'مطور ويب متخصص مع شغف بتطوير الحلول التعليمية المبتكرة',
    
    // Contact Section
    'contact.badge': 'تواصل معنا',
    'contact.title': 'جاهزون لمساعدتك',
    'contact.description': 'راسلنا وسنتواصل معك في أقرب وقت لمناقشة مشروعك',
    'contact.name': 'الاسم الكامل',
    'contact.email': 'البريد الإلكتروني',
    'contact.phone': 'رقم الهاتف',
    'contact.message': 'رسالتك',
    'contact.send': 'إرسال الرسالة',
    'contact.info.email': 'البريد الإلكتروني',
    'contact.info.phone': 'الهاتف',
    'contact.info.website': 'الموقع الشخصي',
    
    // Footer
    'footer.description': 'شركة رائدة في تطوير المواقع الإلكترونية للقطاع التعليمي',
    'footer.links': 'روابط سريعة',
    'footer.contact': 'تواصل معنا',
    'footer.rights': 'جميع الحقوق محفوظة',
    
    // Common
    'common.learnMore': 'اعرف المزيد',
    'common.getStarted': 'ابدأ الآن',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About Us',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    
    // Hero Section
    'hero.badge': 'Leading in Educational Web Development',
    'hero.title': 'Transform Your Educational Ideas',
    'hero.titleHighlight': 'Into Digital Reality',
    'hero.description': 'LEARNEXA specializes in designing and developing websites for the education sector. From schools to educational centers, we are your partner in digital transformation.',
    'hero.cta.start': 'Start Your Project',
    'hero.cta.explore': 'Explore Services',
    'hero.stats.projects': 'Projects Completed',
    'hero.stats.clients': 'Happy Clients',
    'hero.stats.experience': 'Years Experience',
    
    // Services Section
    'services.badge': 'Our Services',
    'services.title': 'Complete Digital Education Solutions',
    'services.description': 'We offer a comprehensive range of services to meet all your technical needs',
    'services.schools.title': 'School Websites',
    'services.schools.desc': 'Professional school websites with integrated management system for students, teachers, and parents',
    'services.centers.title': 'Education Centers',
    'services.centers.desc': 'Advanced platforms for educational centers with course booking and online payment',
    'services.teachers.title': 'Teacher Websites',
    'services.teachers.desc': 'Personal websites for teachers to showcase services and book private sessions',
    'services.lms.title': 'Learning Systems',
    'services.lms.desc': 'Complete LMS with videos, tests, and certificates',
    'services.apps.title': 'Mobile Apps',
    'services.apps.desc': 'Educational mobile apps for iOS and Android',
    'services.support.title': 'Technical Support',
    'services.support.desc': '24/7 technical support and regular maintenance to ensure service continuity',
    
    // About Section
    'about.badge': 'Why LEARNEXA?',
    'about.title': 'Elite Professional Developers',
    'about.description': 'We have a team of the best developers specialized in the education sector, capable of transforming any idea into an outstanding digital product.',
    'about.feature1.title': 'Specialized Expertise',
    'about.feature1.desc': 'Years of experience in educational platform development',
    'about.feature2.title': 'Modern Technologies',
    'about.feature2.desc': 'We use latest technologies for performance and security',
    'about.feature3.title': 'Continuous Support',
    'about.feature3.desc': 'Support team available 24/7 to help you',
    'about.feature4.title': 'Competitive Prices',
    'about.feature4.desc': 'High quality at prices that suit all budgets',
    
    // Team Section
    'team.badge': 'Our Team',
    'team.title': 'Company Leadership',
    'team.founder': 'Founder & CEO',
    'team.founder.bio': 'Web developer specialized with a passion for developing innovative educational solutions',
    
    // Contact Section
    'contact.badge': 'Get In Touch',
    'contact.title': 'Ready to Help You',
    'contact.description': 'Send us a message and we will contact you soon to discuss your project',
    'contact.name': 'Full Name',
    'contact.email': 'Email Address',
    'contact.phone': 'Phone Number',
    'contact.message': 'Your Message',
    'contact.send': 'Send Message',
    'contact.info.email': 'Email',
    'contact.info.phone': 'Phone',
    'contact.info.website': 'Personal Website',
    
    // Footer
    'footer.description': 'A leading company in web development for the education sector',
    'footer.links': 'Quick Links',
    'footer.contact': 'Contact Us',
    'footer.rights': 'All rights reserved',
    
    // Common
    'common.learnMore': 'Learn More',
    'common.getStarted': 'Get Started',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar');

  useEffect(() => {
    const saved = localStorage.getItem('learnexa-language') as Language;
    if (saved && (saved === 'ar' || saved === 'en')) {
      setLanguageState(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('learnexa-language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
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
