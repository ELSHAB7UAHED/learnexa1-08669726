import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/hooks/useAuth';
import { Moon, Sun, Globe, Menu, X, Maximize, Minimize, User, Shield, LogOut, Sparkles } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import logo from '@/assets/logo.png';

const Navbar: React.FC = () => {
  const { t, language, setLanguage, isRTL } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, isAdmin, signOut, loading } = useAuth();
  const navigate = useNavigate();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navLinks = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.services', href: '#services' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled
          ? 'glass-morphism py-3 shadow-glow'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src={logo}
                alt="LEARNEXA"
                className="h-12 w-auto transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 gradient-primary rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
            </div>
            <span className="text-2xl font-black gradient-text-animated hidden sm:block">
              LEARNEXA
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link, index) => (
              <a
                key={link.key}
                href={link.href}
                className="text-foreground/80 hover:text-primary transition-all duration-300 font-semibold relative group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {t(link.key)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-primary transition-all duration-500 group-hover:w-full rounded-full" />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-primary blur-sm transition-all duration-500 group-hover:w-full opacity-50" />
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Fullscreen Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="hidden md:flex hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? (
                <Minimize className="h-5 w-5" />
              ) : (
                <Maximize className="h-5 w-5" />
              )}
            </Button>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="relative hover:bg-secondary/10 hover:text-secondary transition-all duration-300 hover:scale-110"
            >
              <Globe className="h-5 w-5" />
              <span className="absolute -bottom-1 -right-1 text-[10px] font-bold gradient-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center shadow-glow">
                {language === 'ar' ? 'ع' : 'E'}
              </span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="relative overflow-hidden hover:bg-accent/10 hover:text-accent transition-all duration-300 hover:scale-110"
            >
              <Sun className={`h-5 w-5 transition-all duration-700 ${theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
              <Moon className={`absolute h-5 w-5 transition-all duration-700 ${theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
            </Button>

            {/* User Menu or Login Button */}
            {!loading && (
              user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative group">
                      <Avatar className="h-9 w-9 ring-2 ring-primary/30 group-hover:ring-primary/60 transition-all duration-300">
                        <AvatarFallback className="gradient-primary text-primary-foreground font-bold">
                          {user.user_metadata?.full_name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      {isAdmin && (
                        <span className="absolute -bottom-1 -right-1 bg-gradient-to-br from-accent to-primary rounded-full p-1 shadow-glow">
                          <Shield className="h-3 w-3 text-accent-foreground" />
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align={isRTL ? 'start' : 'end'} className="w-52 glass-morphism border-primary/20">
                    <DropdownMenuItem onClick={() => navigate('/profile')} className="gap-3 cursor-pointer hover:bg-primary/10 transition-colors">
                      <User className="h-4 w-4 text-primary" />
                      {isRTL ? 'الملف الشخصي' : 'Profile'}
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem onClick={() => navigate('/admin')} className="gap-3 cursor-pointer hover:bg-secondary/10 transition-colors">
                        <Shield className="h-4 w-4 text-secondary" />
                        {isRTL ? 'لوحة التحكم' : 'Admin Panel'}
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator className="bg-border/50" />
                    <DropdownMenuItem onClick={handleSignOut} className="gap-3 cursor-pointer text-destructive focus:text-destructive hover:bg-destructive/10 transition-colors">
                      <LogOut className="h-4 w-4" />
                      {isRTL ? 'تسجيل الخروج' : 'Sign Out'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant="hero" 
                  className="hidden md:flex gap-2 glow-primary hover:glow-intense hover:scale-105 transition-all duration-300" 
                  onClick={() => navigate('/auth')}
                >
                  <Sparkles className="h-4 w-4" />
                  {t('nav.login')}
                </Button>
              )
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-primary/10 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-slide-up-bounce">
            <div className="flex flex-col gap-4 glass-morphism rounded-3xl p-8">
              {navLinks.map((link, index) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="text-foreground/80 hover:text-primary transition-all duration-300 font-semibold text-lg py-2 border-b border-border/30 last:border-0"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {t(link.key)}
                </a>
              ))}
              {user ? (
                <div className="space-y-3 mt-4">
                  <Button variant="outline" className="w-full justify-start gap-3" onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }}>
                    <User className="h-4 w-4" />
                    {isRTL ? 'الملف الشخصي' : 'Profile'}
                  </Button>
                  {isAdmin && (
                    <Button variant="outline" className="w-full justify-start gap-3" onClick={() => { navigate('/admin'); setIsMobileMenuOpen(false); }}>
                      <Shield className="h-4 w-4" />
                      {isRTL ? 'لوحة التحكم' : 'Admin Panel'}
                    </Button>
                  )}
                  <Button variant="destructive" className="w-full justify-start gap-3" onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }}>
                    <LogOut className="h-4 w-4" />
                    {isRTL ? 'تسجيل الخروج' : 'Sign Out'}
                  </Button>
                </div>
              ) : (
                <Button variant="hero" className="mt-4 w-full glow-primary" onClick={() => { navigate('/auth'); setIsMobileMenuOpen(false); }}>
                  <Sparkles className="h-4 w-4 me-2" />
                  {t('nav.login')}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;