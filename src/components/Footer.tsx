import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-v-dark text-white/70 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <Image src="/logo.png" alt="Volta" width={28} height={28} className="object-contain brightness-200" />
              <span className="font-display font-bold text-lg text-white tracking-tight">VOLTA NYC</span>
            </div>
            <p className="font-body text-sm leading-relaxed text-white/50">
              A registered nonprofit connecting student teams with NYC small businesses.
            </p>
            <p className="font-body text-xs mt-4 text-white/30">volta.newyork@gmail.com</p>
          </div>

          <div>
            <p className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4">Navigate</p>
            <div className="flex flex-col gap-3">
              {[
                { href: "/", label: "Home" },
                { href: "/showcase", label: "Our Work" },
                { href: "/join", label: "Join Volta" },
                { href: "/partners", label: "For Businesses" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="font-body text-sm hover:text-white transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4">Leadership</p>
            <div className="space-y-3 mb-6">
              <div>
                <p className="font-body text-sm text-white/80 font-semibold">Ethan Zhang</p>
                <p className="font-body text-xs text-white/40">Director</p>
                <a href="mailto:ethan@voltanpo.org" className="font-body text-xs text-v-green hover:underline">ethan@voltanpo.org</a>
              </div>
              <div>
                <p className="font-body text-sm text-white/80 font-semibold">Andrew Chin</p>
                <p className="font-body text-xs text-white/40">Director</p>
                <a href="mailto:andrew@voltanpo.org" className="font-body text-xs text-v-green hover:underline">andrew@voltanpo.org</a>
              </div>
            </div>
            <Link
              href="/join"
              className="inline-block bg-v-green text-v-ink font-display font-bold text-sm px-5 py-2.5 rounded-full hover:bg-v-green-dark transition-colors mb-3"
            >
              Apply to Join
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-body text-xs text-white/30">© 2026 Volta NYC. A registered nonprofit organization.</p>
          <p className="font-body text-xs text-white/30">nyc.voltanpo.org — serving NYC&apos;s small business communities</p>
        </div>
      </div>
    </footer>
  );
}
