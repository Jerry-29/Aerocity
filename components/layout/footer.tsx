import Link from "next/link";
import { Droplets, Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import { PARK_INFO, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Wave top divider */}
      <div className="wave-divider -mb-1">
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="fill-background"
        >
          <path d="M0,0 C300,60 900,0 1200,60 L1200,0 L0,0 Z" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-8 pt-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/20">
                <Droplets className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold leading-tight">
                  Aerocity
                </span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-primary-foreground/70">
                  Water Park
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-primary-foreground/80">
              {PARK_INFO.tagline}. Your destination for unforgettable water
              adventures and family fun.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href={PARK_INFO.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={PARK_INFO.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={PARK_INFO.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href={PARK_INFO.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground/70">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/booking"
                  className="text-sm font-semibold text-accent transition-colors hover:text-accent/80"
                >
                  Book Tickets
                </Link>
              </li>
            </ul>
          </div>

          {/* Park Timings */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground/70">
              Park Timings
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground/60" />
                <div>
                  <p className="text-sm font-medium">Weekdays</p>
                  <p className="text-sm text-primary-foreground/70">
                    {PARK_INFO.timings.weekday}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground/60" />
                <div>
                  <p className="text-sm font-medium">Weekends</p>
                  <p className="text-sm text-primary-foreground/70">
                    {PARK_INFO.timings.weekend}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground/60" />
                <div>
                  <p className="text-sm font-medium">Holidays</p>
                  <p className="text-sm text-primary-foreground/70">
                    {PARK_INFO.timings.holiday}
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground/70">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground/60" />
                <p className="text-sm text-primary-foreground/80">
                  {PARK_INFO.address}, {PARK_INFO.city}, {PARK_INFO.state} -{" "}
                  {PARK_INFO.pincode}
                </p>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground/60" />
                <div className="flex flex-col gap-1">
                  {PARK_INFO.phone.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/\s/g, "")}`}
                      className="text-sm text-primary-foreground/80 hover:text-primary-foreground"
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground/60" />
                <a
                  href={`mailto:${PARK_INFO.email}`}
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground"
                >
                  {PARK_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/10 pt-6 md:flex-row">
          <p className="text-xs text-primary-foreground/60">
            &copy; {new Date().getFullYear()} Aerocity Water Park. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/contact"
              className="text-xs text-primary-foreground/60 hover:text-primary-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact"
              className="text-xs text-primary-foreground/60 hover:text-primary-foreground"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="text-xs text-primary-foreground/60 hover:text-primary-foreground"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
