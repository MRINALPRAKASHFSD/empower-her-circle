import { Link } from 'react-router-dom';
import { Shield, Heart, BookOpen, ArrowRight } from 'lucide-react';

export function Footer() {
  const footerLinks = {
    Platform: [
      { label: 'Find a Mentor', href: '/mentors' },
      { label: 'Learning Library', href: '/library' },
      { label: 'Community', href: '/community' },
      { label: 'Emergency Help', href: '/emergency' },
    ],
    Resources: [
      { label: 'Safety Guidelines', href: '/safety' },
      { label: 'Mental Health', href: '/mental-health' },
      { label: 'Career Resources', href: '/career' },
      { label: 'Blog', href: '/blog' },
    ],
    Support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Report an Issue', href: '/report' },
      { label: 'Become a Mentor', href: '/become-mentor' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  };

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <span className="text-xl font-display font-bold text-primary-foreground">E</span>
              </div>
              <span className="font-display text-xl font-bold text-gradient-primary">
                EmpowerHer
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Empowering women through mentorship, education, and community support.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Heart className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <BookOpen className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Shield className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground text-sm hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Emergency Banner */}
        <div className="mt-12 p-4 rounded-2xl bg-emergency/10 border border-emergency/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-emergency" />
            <div>
              <p className="font-semibold">Need immediate help?</p>
              <p className="text-sm text-muted-foreground">Women Helpline: 181 | Emergency: 112</p>
            </div>
          </div>
          <Link
            to="/emergency"
            className="flex items-center gap-2 text-emergency font-semibold hover:underline"
          >
            Emergency Resources
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 EmpowerHer. All rights reserved.</p>
          <p>Made with 💜 for women everywhere</p>
        </div>
      </div>
    </footer>
  );
}
