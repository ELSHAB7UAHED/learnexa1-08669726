import React, { useState, memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, ExternalLink, Send, MapPin, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection: React.FC = memo(() => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1200));

    toast({
      title: isRTL ? 'تم إرسال رسالتك!' : 'Message sent!',
      description: isRTL ? 'سنتواصل معك قريباً' : 'We will contact you soon',
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t('contact.info.email'),
      value: '0ahmednour1@gmail.com',
      href: 'mailto:0ahmednour1@gmail.com',
      gradient: 'from-primary to-secondary',
    },
    {
      icon: Phone,
      label: t('contact.info.phone'),
      value: '+20 101 481 2328',
      href: 'tel:+201014812328',
      gradient: 'from-secondary to-tertiary',
    },
    {
      icon: ExternalLink,
      label: t('contact.info.website'),
      value: 'ahmednour.vercel.app',
      href: 'https://ahmednour.vercel.app',
      gradient: 'from-accent to-primary',
    },
  ];

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-muted/50" />
      
      {/* Blobs */}
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 glass-morphism px-4 py-2 rounded-full mb-6 animate-scale-in touch-scale">
            <div className="w-2 h-2 rounded-full gradient-primary" />
            <span className="text-xs md:text-sm font-semibold text-muted-foreground">
              {t('contact.badge')}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 animate-slide-up">
            <span className="gradient-text">{t('contact.title')}</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground animate-slide-up animation-delay-200">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="glass-morphism rounded-2xl md:rounded-3xl p-6 md:p-8 animate-slide-up relative overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6 relative z-10">
              <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">{t('contact.name')}</label>
                  <Input
                    type="text"
                    required
                    className="bg-background/50 border-border/50 focus:border-primary h-12 rounded-xl text-base touch-scale"
                    placeholder={isRTL ? 'اسمك' : 'Your name'}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">{t('contact.email')}</label>
                  <Input
                    type="email"
                    required
                    className="bg-background/50 border-border/50 focus:border-primary h-12 rounded-xl text-base touch-scale"
                    placeholder={isRTL ? 'بريدك الإلكتروني' : 'Your email'}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold">{t('contact.phone')}</label>
                <Input
                  type="tel"
                  className="bg-background/50 border-border/50 focus:border-primary h-12 rounded-xl text-base touch-scale"
                  placeholder={isRTL ? 'رقم هاتفك' : 'Your phone'}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold">{t('contact.message')}</label>
                <Textarea
                  required
                  rows={5}
                  className="bg-background/50 border-border/50 focus:border-primary rounded-xl resize-none text-base touch-scale"
                  placeholder={isRTL ? 'رسالتك...' : 'Your message...'}
                />
              </div>
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full h-12 md:h-14 text-base md:text-lg glow-primary touch-scale"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    {isRTL ? 'جاري الإرسال...' : 'Sending...'}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    {t('contact.send')}
                  </span>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 md:space-y-5 animate-slide-up animation-delay-200">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                target={info.href.startsWith('http') ? '_blank' : undefined}
                rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group glass-morphism rounded-2xl p-5 md:p-6 flex items-center gap-4 hover:shadow-glow transition-all duration-300 hover:-translate-y-1 touch-scale"
              >
                {/* Icon */}
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform`}>
                  <info.icon className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="text-xs md:text-sm text-muted-foreground mb-1">{info.label}</div>
                  <div className="text-base md:text-lg font-bold truncate group-hover:text-primary transition-colors">
                    {info.value}
                  </div>
                </div>

                {/* Arrow */}
                <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:bg-primary flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-primary-foreground" />
                </div>
              </a>
            ))}

            {/* Location Card */}
            <div className="glass-morphism rounded-2xl p-5 md:p-6 touch-scale">
              <div className={`flex items-center gap-4 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-tertiary to-accent flex items-center justify-center shadow-glow">
                  <MapPin className="h-5 w-5 md:h-6 md:w-6 text-tertiary-foreground" />
                </div>
                <div>
                  <div className="text-xs md:text-sm text-muted-foreground mb-1">
                    {isRTL ? 'الموقع' : 'Location'}
                  </div>
                  <div className="text-base md:text-lg font-bold">
                    {isRTL ? 'مصر 🇪🇬' : 'Egypt 🇪🇬'}
                  </div>
                </div>
              </div>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {isRTL 
                  ? 'نعمل عن بُعد ونخدم العملاء في جميع أنحاء العالم. 🌍'
                  : 'We work remotely and serve clients worldwide. 🌍'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';

export default ContactSection;
