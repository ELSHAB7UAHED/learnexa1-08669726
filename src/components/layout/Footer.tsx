import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, ExternalLink, Heart } from 'lucide-react';
import logo from '@/assets/logo.png';

const Footer: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const quickLinks = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.services', href: '#services' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.contact', href: '#contact' },
  ];

  const contactLinks = [
    { icon: Mail, value: '0ahmednour1@gmail.com', href: 'mailto:0ahmednour1@gmail.com' },
    { icon: Phone, value: '+20 101 481 2328', href: 'tel:+201014812328' },
    { icon: ExternalLink, value: 'ahmednour.vercel.app', href: 'https://ahmednour.vercel.app' },
  ];

  return (
    <footer className="relative pt-20 pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/50" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      {/* Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/10 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-3 mb-6">
              <img src={logo} alt="LEARNEXA" className="h-12 w-auto" />
              <span className="text-2xl font-bold gradient-text">LEARNEXA</span>
            </a>
            <p className="text-muted-foreground max-w-md mb-6">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">{t('footer.links')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6">{t('footer.contact')}</h4>
            <ul className="space-y-3">
              {contactLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <link.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">{link.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-8">
          <div className={`flex flex-col md:flex-row items-center justify-between gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              © {new Date().getFullYear()} LEARNEXA. {t('footer.rights')}
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              {isRTL ? 'صنع بـ' : 'Made with'}
              <Heart className="h-4 w-4 text-destructive fill-destructive" />
              {isRTL ? 'بواسطة أحمد نور' : 'by Ahmed Nour'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
