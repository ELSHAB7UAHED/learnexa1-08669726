import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, ExternalLink, Send, MapPin, Sparkles, CheckCircle } from 'lucide-react';
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
      gradient: 'from-primary to-secondary',
      delay: '0s',
    },
    {
      icon: Phone,
      label: t('contact.info.phone'),
      value: '+20 101 481 2328',
      href: 'tel:+201014812328',
      gradient: 'from-secondary to-tertiary',
      delay: '0.1s',
    },
    {
      icon: ExternalLink,
      label: t('contact.info.website'),
      value: 'ahmednour.vercel.app',
      href: 'https://ahmednour.vercel.app',
      gradient: 'from-accent to-primary',
      delay: '0.2s',
    },
  ];

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/40 to-muted/60" />
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      <div className="absolute inset-0 bg-grid-pattern bg-grid-size opacity-15" />
      
      {/* Animated Blobs */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-secondary/10 rounded-full blur-3xl animate-blob" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-secondary/20 to-tertiary/10 rounded-full blur-3xl animate-blob-reverse animation-delay-2000" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent/15 rounded-full blur-3xl animate-blob animation-delay-4000" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-20 ${isRTL ? 'text-right' : 'text-left'} md:text-center`}>
          <div className="inline-flex items-center gap-3 glass-morphism px-5 py-3 rounded-full mb-8 animate-scale-in-bounce group">
            <div className="w-2 h-2 rounded-full gradient-primary animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">
              {t('contact.badge')}
            </span>
            <Sparkles className="h-4 w-4 text-primary animate-glow-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 animate-slide-up-bounce">
            <span className="gradient-text-animated">{t('contact.title')}</span>
          </h2>
          <p className="text-xl text-muted-foreground animate-slide-up animation-delay-200 leading-relaxed">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Enhanced Contact Form */}
          <div className="glass-morphism rounded-4xl p-10 md:p-12 animate-slide-in-left relative overflow-hidden group hover:shadow-glow-xl transition-all duration-700">
            {/* Background Effect */}
            <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-foreground">{t('contact.name')}</label>
                  <Input
                    type="text"
                    required
                    className="bg-background/60 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 h-14 rounded-xl text-lg transition-all duration-300 hover:border-primary/50"
                    placeholder={isRTL ? 'أدخل اسمك' : 'Enter your name'}
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-foreground">{t('contact.email')}</label>
                  <Input
                    type="email"
                    required
                    className="bg-background/60 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 h-14 rounded-xl text-lg transition-all duration-300 hover:border-primary/50"
                    placeholder={isRTL ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-foreground">{t('contact.phone')}</label>
                <Input
                  type="tel"
                  className="bg-background/60 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 h-14 rounded-xl text-lg transition-all duration-300 hover:border-primary/50"
                  placeholder={isRTL ? 'أدخل رقم هاتفك' : 'Enter your phone'}
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-foreground">{t('contact.message')}</label>
                <Textarea
                  required
                  rows={6}
                  className="bg-background/60 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl resize-none text-lg transition-all duration-300 hover:border-primary/50"
                  placeholder={isRTL ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                />
              </div>
              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full group glow-primary hover:glow-intense transition-all duration-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 border-3 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    {isRTL ? 'جاري الإرسال...' : 'Sending...'}
                  </span>
                ) : (
                  <span className="flex items-center gap-3">
                    <Send className="h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    {t('contact.send')}
                  </span>
                )}
              </Button>
            </form>
          </div>

          {/* Enhanced Contact Info */}
          <div className="space-y-8 animate-slide-in-right">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                target={info.href.startsWith('http') ? '_blank' : undefined}
                rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group glass-morphism rounded-3xl p-8 flex items-center gap-6 hover:shadow-glow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] animate-scale-in"
                style={{ animationDelay: info.delay }}
              >
                {/* Icon */}
                <div className="relative">
                  <div className={`w-18 h-18 rounded-2xl bg-gradient-to-br ${info.gradient} flex items-center justify-center shadow-glow-lg group-hover:shadow-glow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <info.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className={`absolute -inset-2 rounded-2xl bg-gradient-to-br ${info.gradient} blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500`} />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground mb-2 font-medium">{info.label}</div>
                  <div className="text-xl font-bold group-hover:gradient-text transition-all duration-300">
                    {info.value}
                  </div>
                </div>

                {/* Arrow Indicator */}
                <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-primary group-hover:shadow-glow">
                  <CheckCircle className="h-5 w-5 text-primary-foreground" />
                </div>
              </a>
            ))}

            {/* Enhanced Location Card */}
            <div className="glass-morphism rounded-3xl p-8 animate-scale-in animation-delay-300 relative overflow-hidden group hover:shadow-glow-xl transition-all duration-500">
              {/* Background Effect */}
              <div className="absolute inset-0 gradient-accent opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              
              <div className={`flex items-center gap-6 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="relative">
                  <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-tertiary to-accent flex items-center justify-center shadow-glow-lg group-hover:shadow-glow-xl group-hover:scale-110 transition-all duration-500">
                    <MapPin className="h-8 w-8 text-tertiary-foreground" />
                  </div>
                  <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-tertiary to-accent blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2 font-medium">
                    {isRTL ? 'الموقع' : 'Location'}
                  </div>
                  <div className="text-xl font-bold group-hover:gradient-text transition-all duration-300">
                    {isRTL ? 'مصر 🇪🇬' : 'Egypt 🇪🇬'}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {isRTL 
                  ? 'نعمل عن بُعد ونخدم العملاء في جميع أنحاء الوطن العربي والعالم. 🌍'
                  : 'We work remotely and serve clients across the Arab world and globally. 🌍'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;