import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/hooks/useAuth';
import { Moon, Sun, Globe, Menu, X, User, Shield, LogOut, Sparkles } from 'lucide-react';
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

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = useCallback(async () => {
    await signOut();
    navigate('/');
  }, [signOut, navigate]);

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  const navLinks = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.services', href: '#services' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-morphism py-2 md:py-3 shadow-glow'
          : 'bg-transparent py-3 md:py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 md:gap-3 group touch-scale">
            <img
              src={logo}
              alt="LEARNEXA"
              className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
              loading="eager"
            />
            <span className="text-xl md:text-2xl font-bold gradient-text-animated hidden sm:block">
              LEARNEXA
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-200 font-semibold relative group"
              >
                {t(link.key)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-primary transition-all duration-300 group-hover:w-full rounded-full" />
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="relative h-9 w-9 md:h-10 md:w-10 hover:bg-secondary/10 hover:text-secondary touch-scale"
            >
              <Globe className="h-4 w-4 md:h-5 md:w-5" />
              <span className="absolute -bottom-0.5 -right-0.5 text-[9px] font-bold gradient-primary text-primary-foreground rounded-full w-3.5 h-3.5 flex items-center justify-center">
                {language === 'ar' ? 'ع' : 'E'}
              </span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="relative h-9 w-9 md:h-10 md:w-10 overflow-hidden hover:bg-accent/10 hover:text-accent touch-scale"
            >
              <Sun className={`h-4 w-4 md:h-5 md:w-5 transition-all duration-500 ${theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
              <Moon className={`absolute h-4 w-4 md:h-5 md:w-5 transition-all duration-500 ${theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
            </Button>

            {/* User Menu or Login Button */}
            {!loading && (
              user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative h-9 w-9 md:h-10 md:w-10 touch-scale">
                      <Avatar className="h-8 w-8 md:h-9 md:w-9 ring-2 ring-primary/30">
                        <AvatarFallback className="gradient-primary text-primary-foreground text-sm font-bold">
                          {user.user_metadata?.full_name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      {isAdmin && (
                        <span className="absolute -bottom-0.5 -right-0.5 bg-gradient-to-br from-accent to-primary rounded-full p-0.5">
                          <Shield className="h-2.5 w-2.5 text-white" />
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align={isRTL ? 'start' : 'end'} className="w-48 glass-morphism border-primary/20">
                    <DropdownMenuItem onClick={() => navigate('/profile')} className="gap-3 cursor-pointer">
                      <User className="h-4 w-4 text-primary" />
                      {isRTL ? 'الملف الشخصي' : 'Profile'}
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem onClick={() => navigate('/admin')} className="gap-3 cursor-pointer">
                        <Shield className="h-4 w-4 text-secondary" />
                        {isRTL ? 'لوحة التحكم' : 'Admin Panel'}
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator className="bg-border/50" />
                    <DropdownMenuItem onClick={handleSignOut} className="gap-3 cursor-pointer text-destructive focus:text-destructive">
                      <LogOut className="h-4 w-4" />
                      {isRTL ? 'تسجيل الخروج' : 'Sign Out'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant="hero" 
                  className="hidden md:flex gap-2 h-9 px-4 text-sm glow-primary touch-scale" 
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
              className="lg:hidden h-9 w-9 md:h-10 md:w-10 touch-scale"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pb-3 animate-slide-up-bounce">
            <div className="flex flex-col gap-2 glass-morphism rounded-2xl p-4">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="text-foreground/80 hover:text-primary transition-colors font-semibold text-base py-3 px-4 rounded-xl hover:bg-primary/5 touch-scale"
                  onClick={closeMobileMenu}
                >
                  {t(link.key)}
                </a>
              ))}
              
              <div className="h-px bg-border/50 my-2" />
              
              {user ? (
                <div className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start gap-3 h-12 text-base touch-scale" 
                    onClick={() => { navigate('/profile'); closeMobileMenu(); }}
                  >
                    <User className="h-5 w-5 text-primary" />
                    {isRTL ? 'الملف الشخصي' : 'Profile'}
                  </Button>
                  {isAdmin && (
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start gap-3 h-12 text-base touch-scale" 
                      onClick={() => { navigate('/admin'); closeMobileMenu(); }}
                    >
                      <Shield className="h-5 w-5 text-secondary" />
                      {isRTL ? 'لوحة التحكم' : 'Admin Panel'}
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start gap-3 h-12 text-base text-destructive touch-scale" 
                    onClick={() => { handleSignOut(); closeMobileMenu(); }}
                  >
                    <LogOut className="h-5 w-5" />
                    {isRTL ? 'تسجيل الخروج' : 'Sign Out'}
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="hero" 
                  className="w-full h-12 text-base glow-primary touch-scale" 
                  onClick={() => { navigate('/auth'); closeMobileMenu(); }}
                >
                  <Sparkles className="h-5 w-5 me-2" />
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
