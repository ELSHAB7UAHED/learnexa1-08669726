import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { 
  Users, Shield, Home, Search, UserPlus, Trash2, 
  Settings, BarChart3, LogOut, Menu, X, ChevronRight
} from 'lucide-react';
import logo from '@/assets/logo.png';

interface UserWithRole {
  id: string;
  user_id: string;
  full_name: string;
  phone: string | null;
  created_at: string;
  email?: string;
  roles: string[];
}

const Admin = () => {
  const { t, isRTL } = useLanguage();
  const { user, loading: authLoading, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
  const [stats, setStats] = useState({
    totalUsers: 0,
    admins: 0,
    newUsersThisMonth: 0
  });

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/auth');
      } else if (!isAdmin) {
        toast({
          title: isRTL ? 'غير مصرح' : 'Unauthorized',
          description: isRTL ? 'ليس لديك صلاحيات الوصول لهذه الصفحة' : 'You do not have permission to access this page',
          variant: 'destructive'
        });
        navigate('/');
      }
    }
  }, [user, authLoading, isAdmin, navigate, isRTL]);

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Fetch all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch all roles
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) throw rolesError;

      // Combine data
      const usersWithRoles: UserWithRole[] = (profiles || []).map(profile => {
        const userRoles = (roles || [])
          .filter(r => r.user_id === profile.user_id)
          .map(r => r.role);
        
        return {
          ...profile,
          roles: userRoles
        };
      });

      setUsers(usersWithRoles);

      // Calculate stats
      const now = new Date();
      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      
      setStats({
        totalUsers: usersWithRoles.length,
        admins: usersWithRoles.filter(u => u.roles.includes('admin')).length,
        newUsersThisMonth: usersWithRoles.filter(u => new Date(u.created_at) >= thisMonth).length
      });
    } catch (err) {
      console.error('Error fetching users:', err);
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'حدث خطأ أثناء تحميل المستخدمين' : 'Error loading users',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: 'admin' | 'user') => {
    try {
      if (newRole === 'admin') {
        // Add admin role
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: 'admin' });
        
        if (error && !error.message.includes('duplicate')) throw error;
      } else {
        // Remove admin role
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId)
          .eq('role', 'admin');
        
        if (error) throw error;
      }

      toast({
        title: isRTL ? 'تم التحديث' : 'Updated',
        description: isRTL ? 'تم تحديث صلاحيات المستخدم' : 'User role updated successfully'
      });

      fetchUsers();
    } catch (err: any) {
      console.error('Error updating role:', err);
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: err.message,
        variant: 'destructive'
      });
    }
  };

  const filteredUsers = users.filter(u => 
    u.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.phone?.includes(searchTerm)
  );

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (authLoading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-card border-e border-border transition-all duration-300 flex flex-col fixed h-full z-50`}>
        <div className="p-4 border-b border-border flex items-center justify-between">
          {sidebarOpen && (
            <img src={logo} alt="LEARNEXA" className="h-10 w-auto" />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Button
            variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
            className={`w-full justify-start gap-3 ${!sidebarOpen && 'justify-center px-2'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <BarChart3 className="h-5 w-5" />
            {sidebarOpen && (isRTL ? 'لوحة التحكم' : 'Dashboard')}
          </Button>
          
          <Button
            variant={activeTab === 'users' ? 'default' : 'ghost'}
            className={`w-full justify-start gap-3 ${!sidebarOpen && 'justify-center px-2'}`}
            onClick={() => setActiveTab('users')}
          >
            <Users className="h-5 w-5" />
            {sidebarOpen && (isRTL ? 'المستخدمين' : 'Users')}
          </Button>
          
          <Button
            variant={activeTab === 'settings' ? 'default' : 'ghost'}
            className={`w-full justify-start gap-3 ${!sidebarOpen && 'justify-center px-2'}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="h-5 w-5" />
            {sidebarOpen && (isRTL ? 'الإعدادات' : 'Settings')}
          </Button>
        </nav>
        
        <div className="p-4 border-t border-border space-y-2">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 ${!sidebarOpen && 'justify-center px-2'}`}
            onClick={() => navigate('/')}
          >
            <Home className="h-5 w-5" />
            {sidebarOpen && (isRTL ? 'الصفحة الرئيسية' : 'Home')}
          </Button>
          
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 text-destructive hover:text-destructive ${!sidebarOpen && 'justify-center px-2'}`}
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5" />
            {sidebarOpen && (isRTL ? 'تسجيل الخروج' : 'Sign Out')}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? 'ms-64' : 'ms-20'} transition-all duration-300`}>
        <header className="bg-card/80 backdrop-blur-xl border-b border-border p-6 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                {activeTab === 'dashboard' && (isRTL ? 'لوحة التحكم' : 'Dashboard')}
                {activeTab === 'users' && (isRTL ? 'إدارة المستخدمين' : 'User Management')}
                {activeTab === 'settings' && (isRTL ? 'الإعدادات' : 'Settings')}
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                {isRTL ? 'مرحباً بك في لوحة تحكم الأدمن' : 'Welcome to the admin dashboard'}
              </p>
            </div>
            
            <Badge variant="default" className="gap-2">
              <Shield className="h-4 w-4" />
              Admin
            </Badge>
          </div>
        </header>

        <div className="p-6">
          {activeTab === 'dashboard' && (
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'إجمالي المستخدمين' : 'Total Users'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.totalUsers}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'المشرفين' : 'Admins'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.admins}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'مستخدمين جدد هذا الشهر' : 'New Users This Month'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.newUsersThisMonth}</div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'users' && (
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>{isRTL ? 'جميع المستخدمين' : 'All Users'}</CardTitle>
                    <CardDescription>
                      {isRTL ? `${filteredUsers.length} مستخدم` : `${filteredUsers.length} users`}
                    </CardDescription>
                  </div>
                  
                  <div className="relative w-full md:w-64">
                    <Search className={`absolute top-3 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
                    <Input
                      placeholder={isRTL ? 'بحث...' : 'Search...'}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`${isRTL ? 'pr-10' : 'pl-10'}`}
                    />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{isRTL ? 'الاسم' : 'Name'}</TableHead>
                          <TableHead>{isRTL ? 'الهاتف' : 'Phone'}</TableHead>
                          <TableHead>{isRTL ? 'الدور' : 'Role'}</TableHead>
                          <TableHead>{isRTL ? 'تاريخ الانضمام' : 'Joined'}</TableHead>
                          <TableHead>{isRTL ? 'الإجراءات' : 'Actions'}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map((u) => (
                          <TableRow key={u.id}>
                            <TableCell className="font-medium">{u.full_name}</TableCell>
                            <TableCell>{u.phone || '-'}</TableCell>
                            <TableCell>
                              <div className="flex gap-1 flex-wrap">
                                {u.roles.map(role => (
                                  <Badge 
                                    key={role} 
                                    variant={role === 'admin' ? 'default' : 'secondary'}
                                  >
                                    {role === 'admin' ? (isRTL ? 'مشرف' : 'Admin') : (isRTL ? 'مستخدم' : 'User')}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              {new Date(u.created_at).toLocaleDateString(isRTL ? 'ar-EG' : 'en-US')}
                            </TableCell>
                            <TableCell>
                              <Select
                                value={u.roles.includes('admin') ? 'admin' : 'user'}
                                onValueChange={(value) => updateUserRole(u.user_id, value as 'admin' | 'user')}
                                disabled={u.user_id === user?.id}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="user">{isRTL ? 'مستخدم' : 'User'}</SelectItem>
                                  <SelectItem value="admin">{isRTL ? 'مشرف' : 'Admin'}</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === 'settings' && (
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'إعدادات النظام' : 'System Settings'}</CardTitle>
                <CardDescription>
                  {isRTL ? 'إدارة إعدادات التطبيق' : 'Manage application settings'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {isRTL ? 'سيتم إضافة المزيد من الإعدادات قريباً...' : 'More settings coming soon...'}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
