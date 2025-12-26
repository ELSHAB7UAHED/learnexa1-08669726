import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft } from 'lucide-react';
import { z } from 'zod';
import logo from '@/assets/logo.png';

const emailSchema = z.string().email('Invalid email address');
const passwordSchema = z.string().min(8, 'Password must be at least 8 characters');
const phoneSchema = z.string().regex(/^(\+?[0-9]{10,15})$/, 'Invalid phone number');

const Auth = () => {
  const { t, isRTL } = useLanguage();
  const { user, signUp, signIn, signInWithPhone, verifyOtp } = useAuth();
  const navigate = useNavigate();
  
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate inputs
      emailSchema.parse(email);
      passwordSchema.parse(password);

      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: isRTL ? 'خطأ في تسجيل الدخول' : 'Login Error',
            description: error.message,
            variant: 'destructive'
          });
        } else {
          toast({
            title: isRTL ? 'تم تسجيل الدخول بنجاح' : 'Login Successful',
            description: isRTL ? 'مرحباً بك!' : 'Welcome back!'
          });
          navigate('/');
        }
      } else {
        if (!fullName.trim()) {
          toast({
            title: isRTL ? 'خطأ' : 'Error',
            description: isRTL ? 'الرجاء إدخال الاسم الكامل' : 'Please enter your full name',
            variant: 'destructive'
          });
          setLoading(false);
          return;
        }

        const { error } = await signUp(email, password, fullName, phone);
        if (error) {
          if (error.message.includes('already registered')) {
            toast({
              title: isRTL ? 'المستخدم موجود بالفعل' : 'User Already Exists',
              description: isRTL ? 'هذا البريد الإلكتروني مسجل بالفعل. جرب تسجيل الدخول.' : 'This email is already registered. Try logging in.',
              variant: 'destructive'
            });
          } else {
            toast({
              title: isRTL ? 'خطأ في إنشاء الحساب' : 'Signup Error',
              description: error.message,
              variant: 'destructive'
            });
          }
        } else {
          toast({
            title: isRTL ? 'تم إنشاء الحساب' : 'Account Created',
            description: isRTL ? 'تم إرسال رابط التفعيل إلى بريدك الإلكتروني' : 'A confirmation link has been sent to your email'
          });
        }
      }
    } catch (err: any) {
      toast({
        title: isRTL ? 'خطأ في التحقق' : 'Validation Error',
        description: err.message,
        variant: 'destructive'
      });
    }

    setLoading(false);
  };

  const handlePhoneAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      phoneSchema.parse(phone);

      if (!otpSent) {
        const { error } = await signInWithPhone(phone);
        if (error) {
          toast({
            title: isRTL ? 'خطأ' : 'Error',
            description: error.message,
            variant: 'destructive'
          });
        } else {
          setOtpSent(true);
          toast({
            title: isRTL ? 'تم إرسال الكود' : 'Code Sent',
            description: isRTL ? 'تم إرسال كود التفعيل إلى هاتفك' : 'Verification code sent to your phone'
          });
        }
      } else {
        if (otp.length !== 6) {
          toast({
            title: isRTL ? 'خطأ' : 'Error',
            description: isRTL ? 'الرجاء إدخال كود التفعيل المكون من 6 أرقام' : 'Please enter the 6-digit verification code',
            variant: 'destructive'
          });
          setLoading(false);
          return;
        }

        const { error } = await verifyOtp(phone, otp);
        if (error) {
          toast({
            title: isRTL ? 'خطأ في التحقق' : 'Verification Error',
            description: error.message,
            variant: 'destructive'
          });
        } else {
          toast({
            title: isRTL ? 'تم التحقق بنجاح' : 'Verified Successfully'
          });
          navigate('/');
        }
      }
    } catch (err: any) {
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: err.message,
        variant: 'destructive'
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background flex items-center justify-center p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
      </div>

      <Card className="w-full max-w-md relative z-10 bg-card/80 backdrop-blur-xl border-border/50 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}
          >
            <ArrowLeft className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
          </Button>
          
          <div className="flex justify-center">
            <img src={logo} alt="LEARNEXA" className="h-16 w-auto" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {isLogin 
              ? (isRTL ? 'تسجيل الدخول' : 'Sign In')
              : (isRTL ? 'إنشاء حساب' : 'Create Account')
            }
          </CardTitle>
          <CardDescription>
            {isLogin
              ? (isRTL ? 'مرحباً بعودتك! سجل دخولك للمتابعة' : 'Welcome back! Sign in to continue')
              : (isRTL ? 'انضم إلينا اليوم' : 'Join us today')
            }
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Tabs value={authMethod} onValueChange={(v) => setAuthMethod(v as 'email' | 'phone')} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email" className="gap-2">
                <Mail className="h-4 w-4" />
                {isRTL ? 'البريد الإلكتروني' : 'Email'}
              </TabsTrigger>
              <TabsTrigger value="phone" className="gap-2">
                <Phone className="h-4 w-4" />
                {isRTL ? 'الهاتف' : 'Phone'}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="mt-6">
              <form onSubmit={handleEmailAuth} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{isRTL ? 'الاسم الكامل' : 'Full Name'}</Label>
                    <div className="relative">
                      <User className={`absolute top-3 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
                      <Input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={isRTL ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                        className={`${isRTL ? 'pr-10' : 'pl-10'}`}
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">{isRTL ? 'البريد الإلكتروني' : 'Email'}</Label>
                  <div className="relative">
                    <Mail className={`absolute top-3 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={isRTL ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                      className={`${isRTL ? 'pr-10' : 'pl-10'}`}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{isRTL ? 'كلمة المرور' : 'Password'}</Label>
                  <div className="relative">
                    <Lock className={`absolute top-3 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={isRTL ? 'أدخل كلمة المرور' : 'Enter your password'}
                      className={`${isRTL ? 'pr-10 pl-10' : 'pl-10 pr-10'}`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute top-3 text-muted-foreground hover:text-foreground ${isRTL ? 'left-3' : 'right-3'}`}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="phone">{isRTL ? 'رقم الهاتف (اختياري)' : 'Phone (optional)'}</Label>
                    <div className="relative">
                      <Phone className={`absolute top-3 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={isRTL ? 'أدخل رقم هاتفك' : 'Enter your phone number'}
                        className={`${isRTL ? 'pr-10' : 'pl-10'}`}
                      />
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full" variant="gradient" disabled={loading}>
                  {loading 
                    ? (isRTL ? 'جاري التحميل...' : 'Loading...') 
                    : isLogin 
                      ? (isRTL ? 'تسجيل الدخول' : 'Sign In')
                      : (isRTL ? 'إنشاء حساب' : 'Create Account')
                  }
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="phone" className="mt-6">
              <form onSubmit={handlePhoneAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">{isRTL ? 'رقم الهاتف' : 'Phone Number'}</Label>
                  <div className="relative">
                    <Phone className={`absolute top-3 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={isRTL ? '+201234567890' : '+201234567890'}
                      className={`${isRTL ? 'pr-10' : 'pl-10'}`}
                      required
                      disabled={otpSent}
                    />
                  </div>
                </div>

                {otpSent && (
                  <div className="space-y-2">
                    <Label htmlFor="otp">{isRTL ? 'كود التفعيل' : 'Verification Code'}</Label>
                    <Input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="000000"
                      className="text-center text-2xl tracking-widest"
                      required
                      maxLength={6}
                    />
                    <p className="text-sm text-muted-foreground text-center">
                      {isRTL ? 'أدخل الكود المرسل إلى هاتفك' : 'Enter the code sent to your phone'}
                    </p>
                  </div>
                )}

                <Button type="submit" className="w-full" variant="gradient" disabled={loading}>
                  {loading 
                    ? (isRTL ? 'جاري التحميل...' : 'Loading...')
                    : otpSent
                      ? (isRTL ? 'تحقق' : 'Verify')
                      : (isRTL ? 'إرسال كود التفعيل' : 'Send Verification Code')
                  }
                </Button>

                {otpSent && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => {
                      setOtpSent(false);
                      setOtp('');
                    }}
                  >
                    {isRTL ? 'تغيير رقم الهاتف' : 'Change Phone Number'}
                  </Button>
                )}
              </form>
            </TabsContent>
          </Tabs>

          {authMethod === 'email' && (
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline text-sm"
              >
                {isLogin
                  ? (isRTL ? 'ليس لديك حساب؟ أنشئ واحداً' : "Don't have an account? Create one")
                  : (isRTL ? 'لديك حساب بالفعل؟ سجل دخولك' : 'Already have an account? Sign in')
                }
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
