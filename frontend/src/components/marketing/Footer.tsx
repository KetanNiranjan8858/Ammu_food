"use client";

import React from "react";
import { Phone, Mail, ShieldCheck, Award, Sparkles, MessageCircle } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.889-9.888 9.889m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Footer() {
  const { content } = useSiteContent();
  const company = content.company;
  const theme = content.theme || { activeTheme: "traditional" };
  const activeTheme = theme.activeTheme || "traditional";
  const isTraditional = activeTheme === "traditional";
  const isProfessional = activeTheme === "professional";

  return (
    <footer
      className={`text-stone-400 pt-16 pb-12 relative z-10 transition-colors duration-500 border-t ${
        isTraditional
          ? "bg-[#0D0407] border-[#D4AF37]/30"
          : isProfessional
          ? "bg-[#08090B] border-stone-800"
          : "bg-[#0D0B0A] border-[#D4AF37]/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 group cursor-default">
              {company.logo ? (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B33010] p-0.5 group-hover:scale-104 shadow-gold-glow flex items-center justify-center overflow-hidden flex-shrink-0 transition duration-500">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B33010] flex items-center justify-center p-0.5 group-hover:scale-104 group-hover:shadow-[0_0_12px_rgba(212,175,55,0.3)] transition duration-500">
                  <div className="w-full h-full rounded-full bg-[#181210] flex items-center justify-center font-serif font-bold text-[#D4AF37] text-lg">
                    A
                  </div>
                </div>
              )}
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider text-white group-hover:text-[#FDD835] transition duration-300">
                  {company.name.toUpperCase()}
                </span>
                <span className="text-xs font-semibold px-1.5 py-0.5 bg-[#881337] text-[#FDD835] rounded ml-1.5 uppercase">
                  Foods
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              <strong>{company.brandTitle}</strong> &bull; Delivering authentic Grade A++ Kashmiri Kesar directly to homes, connoisseurs, and premium kitchens across India.
            </p>
            <div className="text-[11px] text-stone-400 space-y-1 pt-1">
              <p><strong>Packaged By:</strong> {company.manufacturer}</p>
              <p><strong>FSSAI Lic. No.:</strong> <span className="text-[#FDD835] font-mono">{company.fssaiLicense}</span></p>
              <p><strong>Facility:</strong> {company.address}</p>
            </div>
          </div>

          {/* Quick Links with Slide-Right Hover */}
          <div className="space-y-3">
            <h4 className="text-white font-serif font-bold text-sm tracking-wider uppercase">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { name: "All Products Collection (Full Catalog)", href: "/products" },
                { name: "Featured Products & Packs", href: "/#products" },
                { name: "Nutritional Facts & FSSAI", href: "/#nutrition" },
                { name: "Why AMMu Saffron", href: "/#why-ammu" },
                { name: "Purity Test Guide", href: "/#purity-test" },
                { name: "Culinary & Health Uses", href: "/#benefits" },
                { name: "Verified Customer Reviews (4.9★)", href: "/reviews" },
                { name: "Single Inquiry Desk", href: "/#inquiry" },
                { name: "Frequently Asked Questions", href: "/#faqs" },
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="inline-block hover:text-[#FDD835] hover:translate-x-1 transition-all duration-300"
                  >
                    &bull; {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Inquiries with Hover Highlight */}
          <div className="space-y-3">
            <h4 className="text-white font-serif font-bold text-sm tracking-wider uppercase">
              Customer Support
            </h4>
            <div className="space-y-2.5 text-xs">
              {/* WhatsApp Direct Chat */}
              <a
                href={`https://wa.me/${company.whatsappNumber || "917303817365"}?text=${encodeURIComponent(
                  `Hello ${company.name}, I need Customer Support regarding Kashmir Saffron.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-lift flex items-center gap-2.5 p-2 rounded-xl bg-[#142319] hover:bg-[#1B3023] hover:border-[#25D366]/60 border border-[#25D366]/35 text-[#25D366] hover:text-white transition-all duration-200 cursor-pointer shadow-sm"
              >
                <WhatsAppIcon className="w-4 h-4 fill-[#25D366] flex-shrink-0" />
                <span className="font-semibold text-white">WhatsApp Chat: +91 {company.rawPhone || "7303817365"}</span>
              </a>

              <a
                href={`tel:${company.rawPhone}`}
                className="hover-lift flex items-center gap-2.5 p-2 rounded-xl bg-stone-900/50 hover:bg-[#1A1412] hover:border-[#D4AF37]/50 border border-transparent text-stone-300 hover:text-[#FDD835] transition-all duration-200 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>Sales: {company.phone}</span>
              </a>

              <a
                href={`tel:${company.helpDesk.replace(/[^0-9]/g, '')}`}
                className="hover-lift flex items-center gap-2.5 p-2 rounded-xl bg-stone-900/50 hover:bg-[#1A1412] hover:border-[#D4AF37]/50 border border-transparent text-stone-300 hover:text-[#FDD835] transition-all duration-200 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>Help Desk: {company.helpDesk}</span>
              </a>

              <a
                href="#inquiry"
                className="hover-lift flex items-center gap-2.5 p-2 rounded-xl bg-stone-900/50 hover:bg-[#1A1412] hover:border-[#D4AF37]/50 border border-transparent text-stone-300 hover:text-[#FDD835] transition-all duration-200 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <span>Inquiry: Online Desk</span>
              </a>

              <a
                href={`mailto:${company.email}`}
                className="hover-lift flex items-center gap-2.5 p-2 rounded-xl bg-stone-900/50 hover:bg-[#1A1412] hover:border-[#D4AF37]/50 border border-transparent text-stone-300 hover:text-[#FDD835] transition-all duration-200 break-all cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <span>{company.email}</span>
              </a>
            </div>
          </div>

          {/* Purity Guarantee & Quality Promise */}
          <div className="space-y-4">
            <h4 className="text-white font-serif font-bold text-sm tracking-wider uppercase">
              Our Purity Guarantee
            </h4>
            <div className="p-4 rounded-2xl bg-[#171311] border border-stone-800 hover:border-[#D4AF37]/50 transition duration-300 space-y-2 card-hover-effect">
              <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Zero-Adulteration</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                If your AMMu Saffron fails any standard cold water or purity test, we offer an unconditional replacement or full refund.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#1a1413] border border-[#D4AF37]/25 text-xs text-stone-300 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#881337]/50 text-[#D4AF37]">
                <Award className="w-4 h-4" />
              </div>
              <div className="text-[11px]">
                <span className="font-bold text-white block">Certified Grade-1 Kashmir Mongra</span>
                <span className="text-stone-400">Crocin color strength &gt; 240+</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 text-center sm:text-left">
          <p>&copy; {new Date().getFullYear()} {company.name} &bull; {company.manufacturer}. All rights reserved.</p>
          <p className="text-[11px]">
            Grown & Harvested in Kashmir, India &bull; Certified FSSAI Lic. {company.fssaiLicense}
          </p>
        </div>
      </div>
    </footer>
  );
}
