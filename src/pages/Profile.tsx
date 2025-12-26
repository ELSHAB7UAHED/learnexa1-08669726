import { useState, useEffect } from 'react';
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
import { toast } from '@/hooks/use-toast';
import { User, Mail, Phone, Edit3, Save, Shield, Calendar } from 'lucide-react';

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
  const { user, loading: authLoading, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');

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
        }
      } catch (err) {
        console.error('Error in fetchProfile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, isRTL]);

  const handleSave = async () => {
    if (!user || !profile) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName.trim(),
          phone: phone.trim() || null,
          bio: bio.trim() || null
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
          bio: bio.trim() || null
        });
        setEditing(false);
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

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-xl overflow-hidden">
            {/* Header Banner */}
            <div className="h-32 bg-gradient-to-r from-primary via-accent to-secondary" />
            
            <CardHeader className="relative -mt-16 pb-0">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-4">
                <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                  <AvatarImage src={profile?.avatar_url || ''} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                    {fullName?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center md:text-start pb-4">
                  <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                    <CardTitle className="text-2xl">{profile?.full_name}</CardTitle>
                    {isAdmin && (
                      <Badge variant="default" className="gap-1">
                        <Shield className="h-3 w-3" />
                        Admin
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="flex items-center justify-center md:justify-start gap-2 mt-1">
                    <Mail className="h-4 w-4" />
                    {user?.email}
                  </CardDescription>
                </div>
                
                <Button
                  variant={editing ? 'default' : 'outline'}
                  onClick={() => editing ? handleSave() : setEditing(true)}
                  disabled={saving}
                  className="gap-2"
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
              </div>
            </CardHeader>
            
            <CardContent className="pt-8 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {isRTL ? 'الاسم الكامل' : 'Full Name'}
                  </Label>
                  {editing ? (
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={isRTL ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                    />
                  ) : (
                    <p className="text-foreground p-2 bg-muted/50 rounded-md">{profile?.full_name || '-'}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {isRTL ? 'رقم الهاتف' : 'Phone Number'}
                  </Label>
                  {editing ? (
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={isRTL ? 'أدخل رقم هاتفك' : 'Enter your phone number'}
                    />
                  ) : (
                    <p className="text-foreground p-2 bg-muted/50 rounded-md">{profile?.phone || '-'}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio" className="flex items-center gap-2">
                  <Edit3 className="h-4 w-4" />
                  {isRTL ? 'نبذة عني' : 'Bio'}
                </Label>
                {editing ? (
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder={isRTL ? 'اكتب نبذة عن نفسك...' : 'Write something about yourself...'}
                    rows={4}
                  />
                ) : (
                  <p className="text-foreground p-2 bg-muted/50 rounded-md min-h-[100px]">
                    {profile?.bio || (isRTL ? 'لا يوجد وصف' : 'No bio yet')}
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t">
                <Calendar className="h-4 w-4" />
                {isRTL ? 'انضم في' : 'Joined'}: {new Date(profile?.created_at || '').toLocaleDateString(isRTL ? 'ar-EG' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>

              {editing && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setEditing(false);
                    setFullName(profile?.full_name || '');
                    setPhone(profile?.phone || '');
                    setBio(profile?.bio || '');
                  }}
                  className="w-full"
                >
                  {isRTL ? 'إلغاء' : 'Cancel'}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
