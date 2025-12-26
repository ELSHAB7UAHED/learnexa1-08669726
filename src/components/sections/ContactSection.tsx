import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, ExternalLink, Send, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

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
    },
    {
      icon: Phone,
      label: t('contact.info.phone'),
      value: '+20 101 481 2328',
      href: 'tel:+201014812328',
    },
    {
      icon: ExternalLink,
      label: t('contact.info.website'),
      value: 'ahmednour.vercel.app',
      href: 'https://ahmednour.vercel.app',
    },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-muted/50" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 ${isRTL ? 'text-right' : 'text-left'} md:text-center`}>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full gradient-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              {t('contact.badge')}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-slide-up">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-muted-foreground animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {t('contact.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="glass rounded-3xl p-8 md:p-10 animate-slide-in-left">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">{t('contact.name')}</label>
                  <Input
                    type="text"
                    required
                    className="bg-background/50 border-border/50 focus:border-primary h-12 rounded-xl"
                    placeholder={isRTL ? 'أدخل اسمك' : 'Enter your name'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t('contact.email')}</label>
                  <Input
                    type="email"
                    required
                    className="bg-background/50 border-border/50 focus:border-primary h-12 rounded-xl"
                    placeholder={isRTL ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('contact.phone')}</label>
                <Input
                  type="tel"
                  className="bg-background/50 border-border/50 focus:border-primary h-12 rounded-xl"
                  placeholder={isRTL ? 'أدخل رقم هاتفك' : 'Enter your phone'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('contact.message')}</label>
                <Textarea
                  required
                  rows={5}
                  className="bg-background/50 border-border/50 focus:border-primary rounded-xl resize-none"
                  placeholder={isRTL ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                />
              </div>
              <Button
                type="submit"
                variant="hero"
                className="w-full"
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
          <div className="space-y-6 animate-slide-in-right">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                target={info.href.startsWith('http') ? '_blank' : undefined}
                rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group glass rounded-2xl p-6 flex items-center gap-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <info.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">{info.label}</div>
                  <div className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {info.value}
                  </div>
                </div>
              </a>
            ))}

            {/* Location Card */}
            <div className="glass rounded-2xl p-6 mt-8">
              <div className={`flex items-center gap-4 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
                  <MapPin className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {isRTL ? 'الموقع' : 'Location'}
                  </div>
                  <div className="text-lg font-semibold">
                    {isRTL ? 'مصر' : 'Egypt'}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground">
                {isRTL 
                  ? 'نعمل عن بُعد ونخدم العملاء في جميع أنحاء الوطن العربي والعالم.'
                  : 'We work remotely and serve clients across the Arab world and globally.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
