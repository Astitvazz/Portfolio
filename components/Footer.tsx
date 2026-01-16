import React from 'react';
import { Github, Linkedin, Mail, Instagram, Twitter } from 'lucide-react';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface FooterProps {
  name?: string;
  email?: string;
  socialLinks?: SocialLink[];
}

const Footer: React.FC<FooterProps> = ({ 
  name = "Astitva",
  email = "hello@astitva.dev",
  socialLinks = [
    { name: 'GitHub', url: 'https://github.com/yourusername', icon: <Github size={18} /> },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: <Linkedin size={18} /> },
    { name: 'Instagram', url: 'https://instagram.com/yourusername', icon: <Instagram size={18} /> },
    { name: 'Twitter', url: 'https://twitter.com/yourusername', icon: <Twitter size={18} /> },
  ]
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Left: Name & Copyright */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium text-gray-900">{name}</span>
            <span className="hidden sm:inline">•</span>
            <span>© {currentYear}</span>
          </div>

          {/* Center: Social Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Right: Email */}
          <a 
            href={`mailto:${email}`}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <Mail size={16} className="group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">{email}</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer