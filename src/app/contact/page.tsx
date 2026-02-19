import AnimatedSection from "@/components/AnimatedSection";
import { MailIcon } from "@/components/Icons";

const directors = [
  { name: "Ethan Zhang", role: "Director, NYC Branch", email: "ethan@voltanpo.org", school: "Stuyvesant High School" },
  { name: "Andrew Chin", role: "Director, NYC Branch", email: "andrew@voltanpo.org", school: "Stuyvesant High School" },
];

export default function Contact() {
  return (
    <>
      <section className="bg-v-bg pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8">
          <AnimatedSection>
            <p className="font-body text-sm font-semibold text-v-green uppercase tracking-widest mb-4">Get in touch</p>
            <h1
              className="font-display font-bold text-v-ink leading-none tracking-tight mb-6"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
            >
              Contact<br />
              <span className="text-v-green">Volta NYC</span>
            </h1>
            <p className="font-body text-v-muted text-lg max-w-xl leading-relaxed">
              Reach out to our directors directly, or use the business inquiry form on the{" "}
              <a href="/partners#contact" className="text-v-blue hover:underline">For Businesses</a> page.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-v-border">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <AnimatedSection className="mb-10">
            <p className="font-body text-sm font-semibold text-v-blue uppercase tracking-widest mb-3">Leadership</p>
            <h2 className="font-display font-bold text-v-ink text-3xl">Directors</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-5">
            {directors.map((d, i) => (
              <AnimatedSection key={d.email} delay={i * 0.1}>
                <div className="bg-v-bg border border-v-border rounded-2xl p-8 project-card">
                  <div className="w-14 h-14 rounded-full bg-v-green/20 flex items-center justify-center mb-5">
                    <span className="font-display font-bold text-v-green text-2xl">{d.name[0]}</span>
                  </div>
                  <h3 className="font-display font-bold text-v-ink text-xl">{d.name}</h3>
                  <p className="font-body text-sm text-v-muted mt-1">{d.role}</p>
                  <p className="font-body text-xs text-v-muted/60 mt-0.5">{d.school}</p>
                  <a
                    href={`mailto:${d.email}`}
                    className="flex items-center gap-2.5 mt-5 font-body text-sm text-v-blue hover:underline"
                  >
                    <MailIcon className="w-4 h-4 flex-shrink-0" />
                    {d.email}
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-v-bg">
        <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
          <AnimatedSection>
            <p className="font-body text-sm font-semibold text-v-green uppercase tracking-widest mb-3">General inquiries</p>
            <h2 className="font-display font-bold text-v-ink text-3xl mb-4">General Email</h2>
            <p className="font-body text-v-muted mb-6">For general questions, BID partnerships, or press:</p>
            <a
              href="mailto:volta.newyork@gmail.com"
              className="inline-flex items-center gap-3 bg-white border border-v-border rounded-2xl px-8 py-5 font-display font-bold text-v-ink text-lg hover:border-v-green transition-colors project-card"
            >
              <MailIcon className="w-5 h-5 text-v-green" />
              volta.newyork@gmail.com
            </a>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
