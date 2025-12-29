import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Download, Smartphone, Monitor, Chrome, Apple, 
  CheckCircle2, Zap, Wifi, Bell, Shield
} from 'lucide-react';

const Install = () => {
  const { isRTL } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Listen for install prompt
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    
    window.addEventListener('beforeinstallprompt', handler);
    
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  const features = [
    {
      icon: Zap,
      title: isRTL ? 'سريع وخفيف' : 'Fast & Lightweight',
      description: isRTL ? 'تحميل فوري وأداء سلس' : 'Instant loading and smooth performance'
    },
    {
      icon: Wifi,
      title: isRTL ? 'يعمل بدون إنترنت' : 'Works Offline',
      description: isRTL ? 'استخدم التطبيق حتى بدون اتصال' : 'Use the app even without connection'
    },
    {
      icon: Bell,
      title: isRTL ? 'إشعارات فورية' : 'Push Notifications',
      description: isRTL ? 'احصل على تنبيهات مهمة' : 'Get important alerts instantly'
    },
    {
      icon: Shield,
      title: isRTL ? 'آمن وموثوق' : 'Secure & Reliable',
      description: isRTL ? 'تحديثات تلقائية وحماية كاملة' : 'Auto updates and full protection'
    }
  ];

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar />
      
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl animate-blob" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-secondary/10 to-primary/10 blur-3xl animate-blob animation-delay-2000" />
      </div>
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-6">
              <Download className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              {isRTL ? 'ثبّت التطبيق الآن' : 'Install the App Now'}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isRTL 
                ? 'احصل على تجربة أفضل مع تطبيق LEARNEXA على جهازك. سريع، يعمل بدون إنترنت، ومتاح دائماً.'
                : 'Get a better experience with the LEARNEXA app on your device. Fast, works offline, and always available.'}
            </p>
          </div>
          
          {/* Install Card */}
          <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-2xl mb-8 overflow-hidden animate-fade-in animation-delay-200">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
            
            <CardHeader className="relative text-center pb-0">
              <CardTitle className="text-2xl flex items-center justify-center gap-3">
                {isInstalled ? (
                  <>
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                    {isRTL ? 'التطبيق مثبت بالفعل!' : 'App Already Installed!'}
                  </>
                ) : (
                  <>
                    <Smartphone className="h-8 w-8 text-primary" />
                    {isRTL ? 'تثبيت على جهازك' : 'Install on Your Device'}
                  </>
                )}
              </CardTitle>
              <CardDescription className="text-base mt-2">
                {isInstalled 
                  ? (isRTL ? 'يمكنك الوصول للتطبيق من الشاشة الرئيسية' : 'You can access the app from your home screen')
                  : (isRTL ? 'اختر طريقة التثبيت المناسبة لجهازك' : 'Choose the installation method for your device')}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative pt-8 space-y-6">
              {!isInstalled && (
                <>
                  {/* Direct Install Button */}
                  {deferredPrompt && (
                    <Button 
                      onClick={handleInstall} 
                      size="lg" 
                      className="w-full gap-3 text-lg h-14 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    >
                      <Download className="h-6 w-6" />
                      {isRTL ? 'تثبيت الآن' : 'Install Now'}
                    </Button>
                  )}
                  
                  {/* Instructions */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Android/Chrome */}
                    <div className="p-4 rounded-xl bg-muted/30 border border-border/50 space-y-3">
                      <div className="flex items-center gap-2 text-lg font-semibold">
                        <Chrome className="h-5 w-5 text-primary" />
                        Android / Chrome
                      </div>
                      <ol className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center">1</span>
                          {isRTL ? 'اضغط على قائمة المتصفح (⋮)' : 'Tap browser menu (⋮)'}
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center">2</span>
                          {isRTL ? 'اختر "تثبيت التطبيق" أو "إضافة إلى الشاشة الرئيسية"' : 'Select "Install app" or "Add to Home Screen"'}
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center">3</span>
                          {isRTL ? 'اضغط "تثبيت"' : 'Tap "Install"'}
                        </li>
                      </ol>
                    </div>
                    
                    {/* iOS/Safari */}
                    <div className="p-4 rounded-xl bg-muted/30 border border-border/50 space-y-3">
                      <div className="flex items-center gap-2 text-lg font-semibold">
                        <Apple className="h-5 w-5 text-primary" />
                        iPhone / Safari
                      </div>
                      <ol className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center">1</span>
                          {isRTL ? 'اضغط على زر المشاركة (⎙)' : 'Tap the Share button (⎙)'}
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center">2</span>
                          {isRTL ? 'مرر لأسفل واختر "إضافة إلى الشاشة الرئيسية"' : 'Scroll and select "Add to Home Screen"'}
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center">3</span>
                          {isRTL ? 'اضغط "إضافة"' : 'Tap "Add"'}
                        </li>
                      </ol>
                    </div>
                    
                    {/* Desktop */}
                    <div className="md:col-span-2 p-4 rounded-xl bg-muted/30 border border-border/50 space-y-3">
                      <div className="flex items-center gap-2 text-lg font-semibold">
                        <Monitor className="h-5 w-5 text-primary" />
                        {isRTL ? 'الكمبيوتر / متصفح سطح المكتب' : 'Desktop / Browser'}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {isRTL 
                          ? 'ابحث عن أيقونة التثبيت في شريط العنوان (⊕) أو استخدم قائمة المتصفح واختر "تثبيت التطبيق"'
                          : 'Look for the install icon in the address bar (⊕) or use the browser menu and select "Install App"'}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          
          {/* Features */}
          <div className="grid sm:grid-cols-2 gap-4 animate-fade-in animation-delay-400">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card/60 backdrop-blur-sm border-border/30 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Install;
