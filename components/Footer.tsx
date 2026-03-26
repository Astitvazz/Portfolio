import React from 'react';
import { Mail } from 'lucide-react';

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
  socialLinks = [],
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
              Portfolio
            </p>
            <h3 className="font-[family:var(--font-display)] text-2xl font-semibold tracking-tight text-foreground">
              Building polished products with strong systems underneath.
            </h3>
            <p className="text-sm leading-6 text-muted-foreground">
              Designing and engineering web experiences that feel sharp, fast, and useful.
            </p>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between lg:gap-8">
            <div className="flex items-center gap-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background text-muted-foreground transition hover:-translate-y-0.5 hover:text-foreground"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <a
              href={`mailto:${email}`}
              className="group inline-flex items-center gap-3 rounded-full border border-border/70 bg-background px-4 py-3 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <Mail size={16} className="transition-transform group-hover:scale-110" />
              <span>{email}</span>
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">{name}</span>
            <span>© {currentYear}</span>
          </div>
          <p>Thoughtful interfaces. Reliable systems. Clean execution.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
