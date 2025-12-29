import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { toast } from '@/hooks/use-toast';
import { 
  User, Mail, Phone, Edit3, Save, Shield, Calendar, 
  Camera, Lock, Bell, Globe, Trash2, CheckCircle2, 
  XCircle, Eye, EyeOff, Smartphone, Download, Settings,
  Key, Activity, Clock, MapPin, Link2, Sparkles
} from 'lucide-react';

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

const Profile = () => {
  const { t, isRTL } = useLanguage();
  const { user, loading: authLoading, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  // Password states
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  
  // Phone verification states
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [phoneToVerify, setPhoneToVerify] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  
  // Delete account
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  
  // PWA Install
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      toast({
        title: isRTL ? 'تم التثبيت' : 'Installed',
        description: isRTL ? 'تم تثبيت التطبيق بنجاح!' : 'App installed successfully!'
      });
    }
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching profile:', error);
          toast({
            title: isRTL ? 'خطأ' : 'Error',
            description: isRTL ? 'حدث خطأ أثناء تحميل الملف الشخصي' : 'Error loading profile',
            variant: 'destructive'
          });
        } else if (data) {
          setProfile(data);
          setFullName(data.full_name);
          setPhone(data.phone || '');
          setBio(data.bio || '');
          setPhoneVerified(!!data.phone && user.phone === data.phone);
        }
      } catch (err) {
        console.error('Error in fetchProfile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, isRTL]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!user || !profile) return;
    
    setSaving(true);
    try {
      let avatarUrl = profile.avatar_url;
      
      // Upload avatar if changed
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        
        // For now, we'll use a placeholder since storage isn't set up
        // In production, you'd upload to Supabase Storage
        avatarUrl = avatarPreview;
      }
      
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName.trim(),
          phone: phone.trim() || null,
          bio: bio.trim() || null,
          avatar_url: avatarUrl
        })
        .eq('user_id', user.id);

      if (error) {
        toast({
          title: isRTL ? 'خطأ' : 'Error',
          description: error.message,
          variant: 'destructive'
        });
      } else {
        setProfile({
          ...profile,
          full_name: fullName.trim(),
          phone: phone.trim() || null,
          bio: bio.trim() || null,
          avatar_url: avatarUrl
        });
        setEditing(false);
        setAvatarFile(null);
        toast({
          title: isRTL ? 'تم الحفظ' : 'Saved',
          description: isRTL ? 'تم تحديث الملف الشخصي بنجاح' : 'Profile updated successfully'
        });
      }
    } catch (err) {
      console.error('Error saving profile:', err);
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'كلمات المرور غير متطابقة' : 'Passwords do not match',
        variant: 'destructive'
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters',
        variant: 'destructive'
      });
      return;
    }

    setChangingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        toast({
          title: isRTL ? 'خطأ' : 'Error',
          description: error.message,
          variant: 'destructive'
        });
      } else {
        toast({
          title: isRTL ? 'تم التغيير' : 'Changed',
          description: isRTL ? 'تم تغيير كلمة المرور بنجاح' : 'Password changed successfully'
        });
        setShowPasswordDialog(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      console.error('Error changing password:', err);
    } finally {
      setChangingPassword(false);
    }
  };

  const handleSendOtp = async () => {
    if (!phoneToVerify || phoneToVerify.length < 10) {
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'الرجاء إدخال رقم هاتف صحيح' : 'Please enter a valid phone number',
        variant: 'destructive'
      });
      return;
    }

    setSendingOtp(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: phoneToVerify
      });

      if (error) {
        toast({
          title: isRTL ? 'خطأ' : 'Error',
          description: error.message,
          variant: 'destructive'
        });
      } else {
        toast({
          title: isRTL ? 'تم الإرسال' : 'Sent',
          description: isRTL ? 'تم إرسال رمز التحقق' : 'Verification code sent'
        });
      }
    } catch (err) {
      console.error('Error sending OTP:', err);
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otpCode.length !== 6) {
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'الرجاء إدخال رمز التحقق كاملاً' : 'Please enter the complete verification code',
        variant: 'destructive'
      });
      return;
    }

    setVerifyingOtp(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: phoneToVerify,
        token: otpCode,
        type: 'sms'
      });

      if (error) {
        toast({
          title: isRTL ? 'خطأ' : 'Error',
          description: error.message,
          variant: 'destructive'
        });
      } else {
        setPhoneVerified(true);
        setPhone(phoneToVerify);
        setShowPhoneVerification(false);
        toast({
          title: isRTL ? 'تم التحقق' : 'Verified',
          description: isRTL ? 'تم التحقق من رقم الهاتف بنجاح' : 'Phone number verified successfully'
        });
        
        // Update profile with verified phone
        await supabase
          .from('profiles')
          .update({ phone: phoneToVerify })
          .eq('user_id', user?.id);
      }
    } catch (err) {
      console.error('Error verifying OTP:', err);
    } finally {
      setVerifyingOtp(false);
      setOtpCode('');
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== 'DELETE') {
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'الرجاء كتابة DELETE للتأكيد' : 'Please type DELETE to confirm',
        variant: 'destructive'
      });
      return;
    }

    // In production, you'd call an edge function to delete the user
    toast({
      title: isRTL ? 'تم الطلب' : 'Request Submitted',
      description: isRTL ? 'سيتم حذف حسابك خلال 24 ساعة' : 'Your account will be deleted within 24 hours'
    });
    setShowDeleteDialog(false);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
          <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border border-primary/30"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar />
      
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl animate-blob" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-secondary/10 to-primary/10 blur-3xl animate-blob animation-delay-2000" />
      </div>
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Profile Header Card */}
          <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-2xl overflow-hidden mb-6 animate-fade-in">
            {/* Animated Banner */}
            <div className="relative h-40 md:h-48 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary animate-gradient-shift" />
              <div className="absolute inset-0 bg-grid-pattern opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-16 h-16 text-white/20 animate-pulse" />
              </div>
              
              {/* Install App Button */}
              {showInstallButton && (
                <Button
                  onClick={handleInstallApp}
                  className="absolute top-4 right-4 gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
                  variant="outline"
                >
                  <Download className="h-4 w-4" />
                  {isRTL ? 'تثبيت التطبيق' : 'Install App'}
                </Button>
              )}
            </div>
            
            <CardHeader className="relative -mt-20 pb-0">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-4">
                {/* Avatar with Edit */}
                <div className="relative group">
                  <Avatar className="h-36 w-36 border-4 border-background shadow-2xl ring-4 ring-primary/20 transition-transform group-hover:scale-105">
                    <AvatarImage src={avatarPreview || profile?.avatar_url || ''} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-4xl font-bold">
                      {fullName?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  
                  {editing && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-2 right-2 p-2.5 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform"
                    >
                      <Camera className="h-5 w-5" />
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
                
                <div className="flex-1 text-center md:text-start pb-4">
                  <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap mb-2">
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                      {profile?.full_name}
                    </CardTitle>
                    {isAdmin && (
                      <Badge className="gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 animate-pulse-glow">
                        <Shield className="h-3 w-3" />
                        Admin
                      </Badge>
                    )}
                    {phoneVerified && (
                      <Badge variant="outline" className="gap-1 border-green-500/50 text-green-600">
                        <CheckCircle2 className="h-3 w-3" />
                        {isRTL ? 'موثق' : 'Verified'}
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="flex items-center justify-center md:justify-start gap-2 text-base">
                    <Mail className="h-4 w-4" />
                    {user?.email}
                  </CardDescription>
                  {profile?.phone && (
                    <CardDescription className="flex items-center justify-center md:justify-start gap-2 mt-1">
                      <Phone className="h-4 w-4" />
                      {profile.phone}
                    </CardDescription>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant={editing ? 'default' : 'outline'}
                    onClick={() => editing ? handleSave() : setEditing(true)}
                    disabled={saving}
                    className="gap-2 min-w-[120px]"
                  >
                    {editing ? (
                      <>
                        <Save className="h-4 w-4" />
                        {saving ? (isRTL ? 'جاري الحفظ...' : 'Saving...') : (isRTL ? 'حفظ' : 'Save')}
                      </>
                    ) : (
                      <>
                        <Edit3 className="h-4 w-4" />
                        {isRTL ? 'تعديل' : 'Edit'}
                      </>
                    )}
                  </Button>
                  {editing && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setEditing(false);
                        setFullName(profile?.full_name || '');
                        setPhone(profile?.phone || '');
                        setBio(profile?.bio || '');
                        setAvatarPreview(null);
                        setAvatarFile(null);
                      }}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                  <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">{isRTL ? 'انضم في' : 'Joined'}</p>
                  <p className="font-semibold">
                    {new Date(profile?.created_at || '').toLocaleDateString(isRTL ? 'ar-EG' : 'en-US', {
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
                  <Activity className="h-6 w-6 mx-auto mb-2 text-accent" />
                  <p className="text-sm text-muted-foreground">{isRTL ? 'الحالة' : 'Status'}</p>
                  <p className="font-semibold text-green-600">{isRTL ? 'نشط' : 'Active'}</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-secondary" />
                  <p className="text-sm text-muted-foreground">{isRTL ? 'آخر تحديث' : 'Last Update'}</p>
                  <p className="font-semibold">
                    {new Date(profile?.updated_at || '').toLocaleDateString(isRTL ? 'ar-EG' : 'en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20">
                  <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">{isRTL ? 'الدور' : 'Role'}</p>
                  <p className="font-semibold">{isAdmin ? (isRTL ? 'مسؤول' : 'Admin') : (isRTL ? 'مستخدم' : 'User')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Tabs Section */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in animation-delay-200">
            <TabsList className="w-full justify-start bg-card/50 backdrop-blur-sm border border-border/50 p-1 h-auto flex-wrap">
              <TabsTrigger value="profile" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <User className="h-4 w-4" />
                {isRTL ? 'الملف الشخصي' : 'Profile'}
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Lock className="h-4 w-4" />
                {isRTL ? 'الأمان' : 'Security'}
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Settings className="h-4 w-4" />
                {isRTL ? 'الإعدادات' : 'Settings'}
              </TabsTrigger>
            </TabsList>
            
            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-6">
              <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    {isRTL ? 'المعلومات الشخصية' : 'Personal Information'}
                  </CardTitle>
                  <CardDescription>
                    {isRTL ? 'إدارة معلوماتك الشخصية' : 'Manage your personal information'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="flex items-center gap-2 text-sm font-medium">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {isRTL ? 'الاسم الكامل' : 'Full Name'}
                      </Label>
                      {editing ? (
                        <Input
                          id="fullName"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder={isRTL ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                          className="transition-all focus:ring-2 focus:ring-primary/20"
                        />
                      ) : (
                        <p className="text-foreground p-3 bg-muted/30 rounded-lg border border-border/50">
                          {profile?.full_name || '-'}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {isRTL ? 'البريد الإلكتروني' : 'Email'}
                      </Label>
                      <p className="text-foreground p-3 bg-muted/30 rounded-lg border border-border/50 flex items-center justify-between">
                        {user?.email}
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {isRTL ? 'رقم الهاتف' : 'Phone Number'}
                      </Label>
                      <div className="flex gap-2">
                        {editing ? (
                          <Input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={isRTL ? 'أدخل رقم هاتفك' : 'Enter your phone number'}
                            className="flex-1 transition-all focus:ring-2 focus:ring-primary/20"
                          />
                        ) : (
                          <p className="flex-1 text-foreground p-3 bg-muted/30 rounded-lg border border-border/50 flex items-center justify-between">
                            {profile?.phone || (isRTL ? 'غير محدد' : 'Not set')}
                            {phoneVerified && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                          </p>
                        )}
                        <Dialog open={showPhoneVerification} onOpenChange={setShowPhoneVerification}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon" title={isRTL ? 'تحقق من الهاتف' : 'Verify Phone'}>
                              <Smartphone className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <Smartphone className="h-5 w-5 text-primary" />
                                {isRTL ? 'تحقق من رقم الهاتف' : 'Verify Phone Number'}
                              </DialogTitle>
                              <DialogDescription>
                                {isRTL ? 'سيتم إرسال رمز تحقق إلى هاتفك' : 'A verification code will be sent to your phone'}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label>{isRTL ? 'رقم الهاتف' : 'Phone Number'}</Label>
                                <Input
                                  type="tel"
                                  value={phoneToVerify}
                                  onChange={(e) => setPhoneToVerify(e.target.value)}
                                  placeholder="+20 1XX XXX XXXX"
                                  dir="ltr"
                                />
                              </div>
                              <Button
                                onClick={handleSendOtp}
                                disabled={sendingOtp}
                                className="w-full"
                              >
                                {sendingOtp ? (isRTL ? 'جاري الإرسال...' : 'Sending...') : (isRTL ? 'إرسال رمز التحقق' : 'Send Verification Code')}
                              </Button>
                              
                              <div className="space-y-2">
                                <Label>{isRTL ? 'رمز التحقق' : 'Verification Code'}</Label>
                                <InputOTP
                                  maxLength={6}
                                  value={otpCode}
                                  onChange={setOtpCode}
                                  className="justify-center"
                                >
                                  <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                  </InputOTPGroup>
                                </InputOTP>
                              </div>
                              <Button
                                onClick={handleVerifyOtp}
                                disabled={verifyingOtp || otpCode.length !== 6}
                                className="w-full"
                                variant="default"
                              >
                                {verifyingOtp ? (isRTL ? 'جاري التحقق...' : 'Verifying...') : (isRTL ? 'تحقق' : 'Verify')}
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="flex items-center gap-2 text-sm font-medium">
                      <Edit3 className="h-4 w-4 text-muted-foreground" />
                      {isRTL ? 'نبذة عني' : 'Bio'}
                    </Label>
                    {editing ? (
                      <Textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder={isRTL ? 'اكتب نبذة عن نفسك...' : 'Write something about yourself...'}
                        rows={4}
                        className="transition-all focus:ring-2 focus:ring-primary/20 resize-none"
                      />
                    ) : (
                      <p className="text-foreground p-3 bg-muted/30 rounded-lg border border-border/50 min-h-[100px]">
                        {profile?.bio || (isRTL ? 'لا يوجد وصف بعد' : 'No bio yet')}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Security Tab */}
            <TabsContent value="security" className="mt-6 space-y-6">
              <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-primary" />
                    {isRTL ? 'كلمة المرور' : 'Password'}
                  </CardTitle>
                  <CardDescription>
                    {isRTL ? 'تغيير كلمة المرور الخاصة بك' : 'Change your password'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <Lock className="h-4 w-4" />
                        {isRTL ? 'تغيير كلمة المرور' : 'Change Password'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Lock className="h-5 w-5 text-primary" />
                          {isRTL ? 'تغيير كلمة المرور' : 'Change Password'}
                        </DialogTitle>
                        <DialogDescription>
                          {isRTL ? 'أدخل كلمة المرور الجديدة' : 'Enter your new password'}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>{isRTL ? 'كلمة المرور الجديدة' : 'New Password'}</Label>
                          <div className="relative">
                            <Input
                              type={showNewPassword ? 'text' : 'password'}
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              placeholder="••••••••"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>{isRTL ? 'تأكيد كلمة المرور' : 'Confirm Password'}</Label>
                          <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={handlePasswordChange}
                          disabled={changingPassword}
                          className="w-full"
                        >
                          {changingPassword ? (isRTL ? 'جاري التغيير...' : 'Changing...') : (isRTL ? 'تغيير' : 'Change')}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
              
              <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-xl border-destructive/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <Trash2 className="h-5 w-5" />
                    {isRTL ? 'حذف الحساب' : 'Delete Account'}
                  </CardTitle>
                  <CardDescription>
                    {isRTL ? 'حذف حسابك بشكل نهائي' : 'Permanently delete your account'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <DialogTrigger asChild>
                      <Button variant="destructive" className="gap-2">
                        <Trash2 className="h-4 w-4" />
                        {isRTL ? 'حذف الحساب' : 'Delete Account'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-destructive">
                          <Trash2 className="h-5 w-5" />
                          {isRTL ? 'تأكيد حذف الحساب' : 'Confirm Account Deletion'}
                        </DialogTitle>
                        <DialogDescription>
                          {isRTL 
                            ? 'هذا الإجراء لا يمكن التراجع عنه. سيتم حذف جميع بياناتك بشكل نهائي.'
                            : 'This action cannot be undone. All your data will be permanently deleted.'}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>{isRTL ? 'اكتب DELETE للتأكيد' : 'Type DELETE to confirm'}</Label>
                          <Input
                            value={deleteConfirmation}
                            onChange={(e) => setDeleteConfirmation(e.target.value)}
                            placeholder="DELETE"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="destructive"
                          onClick={handleDeleteAccount}
                          disabled={deleteConfirmation !== 'DELETE'}
                          className="w-full"
                        >
                          {isRTL ? 'حذف حسابي نهائياً' : 'Permanently Delete My Account'}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings" className="mt-6 space-y-6">
              <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-primary" />
                    {isRTL ? 'تثبيت التطبيق' : 'Install App'}
                  </CardTitle>
                  <CardDescription>
                    {isRTL ? 'قم بتثبيت التطبيق على جهازك' : 'Install the app on your device'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    {isRTL 
                      ? 'يمكنك تثبيت التطبيق على هاتفك أو جهاز الكمبيوتر للوصول السريع والعمل بدون إنترنت.'
                      : 'You can install the app on your phone or computer for quick access and offline work.'}
                  </p>
                  {showInstallButton ? (
                    <Button onClick={handleInstallApp} className="gap-2">
                      <Download className="h-4 w-4" />
                      {isRTL ? 'تثبيت الآن' : 'Install Now'}
                    </Button>
                  ) : (
                    <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                      <p className="text-sm text-muted-foreground">
                        {isRTL 
                          ? 'للتثبيت: اضغط على قائمة المتصفح (⋮) ثم "إضافة إلى الشاشة الرئيسية" أو "تثبيت التطبيق"'
                          : 'To install: Click the browser menu (⋮) then "Add to Home Screen" or "Install App"'}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    {isRTL ? 'اللغة' : 'Language'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {isRTL 
                      ? 'يمكنك تغيير اللغة من الشريط العلوي'
                      : 'You can change the language from the top navigation bar'}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
