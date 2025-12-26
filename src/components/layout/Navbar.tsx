import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun, Globe, Menu, X, Maximize, Minimize } from 'lucide-react';
import logo from '@/assets/logo.png';

const Navbar: React.FC = () => {
  const { t, language, setLanguage, isRTL } = useLanguage();
  const { theme, toggleTheme } = useTheme();
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

  const navLinks = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.services', href: '#services' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-strong py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="LEARNEXA"
              className="h-12 w-auto transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-2xl font-bold gradient-text hidden sm:block">
              LEARNEXA
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium relative group"
              >
                {t(link.key)}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 gradient-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Fullscreen Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="hidden md:flex"
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
              className="relative"
            >
              <Globe className="h-5 w-5" />
              <span className="absolute -bottom-1 -right-1 text-[10px] font-bold bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center">
                {language === 'ar' ? 'ع' : 'E'}
              </span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="relative overflow-hidden"
            >
              <Sun className={`h-5 w-5 transition-all duration-500 ${theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
              <Moon className={`absolute h-5 w-5 transition-all duration-500 ${theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
            </Button>

            {/* Login Button */}
            <Button variant="gradient" className="hidden md:flex">
              {t('nav.login')}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-slide-up">
            <div className="flex flex-col gap-4 glass rounded-2xl p-6">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(link.key)}
                </a>
              ))}
              <Button variant="gradient" className="mt-4">
                {t('nav.login')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
