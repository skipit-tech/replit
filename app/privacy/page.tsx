import Link from "next/link"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="text-sm text-foreground/70 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 pb-32">
        <article className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              SKIP IT. Privacy Policy
            </h1>
            
            <div className="text-sm text-foreground/70 space-y-1 mb-8 pb-8 border-b border-white/10">
              <p><strong className="text-white">Effective Date:</strong> October 23, 2025</p>
              <p><strong className="text-white">Controller:</strong> SKIP IT. Tech, Inc. ("SKIP IT.", "we", "us", "our")</p>
              <p><strong className="text-white">Location:</strong> Boston, MA, USA</p>
            </div>

            <p className="text-lg leading-relaxed text-foreground/90 mb-4">
              This Privacy Policy explains what we collect, how we use it, and your choices when you use SKIP IT. products, including our app, Chrome extension, and related services.
            </p>

            <p className="text-foreground/80 leading-relaxed">
              We operate independently and are not affiliated with or endorsed by any streaming platform unless stated.
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white mt-12 mb-6">1. What We Collect</h2>
            <p className="text-foreground/90 leading-relaxed">
              We collect only what we need to operate and improve SKIP IT.:
            </p>

            <div className="space-y-6 mt-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">A. Account & Contact Information</h3>
                <p className="text-foreground/80 leading-relaxed">
                  Email (e.g., for waitlist, pilot onboarding, or admin accounts)
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">B. Preferences</h3>
                <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                  <li>Categories you choose to skip or blur</li>
                  <li>Sensitivity levels</li>
                  <li>Accessibility features you enable</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">C. Device & Usage Data</h3>
                <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                  <li>App/extension version</li>
                  <li>Performance logs & basic diagnostics</li>
                  <li>Non-identifying technical information</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">D. Support Communications</h3>
                <p className="text-foreground/80 leading-relaxed">
                  Messages you send to our support team
                </p>
              </div>
            </div>

            <p className="font-semibold text-white mt-6 bg-white/5 border border-white/10 rounded-lg p-4">
              We do not collect streaming account credentials, payment data from platforms, or raw video content.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white mt-12 mb-6">2. How We Use Information</h2>
            <p className="text-foreground/90 leading-relaxed">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80 mt-4">
              <li>Provide and secure the SKIP IT. experience</li>
              <li>Personalize content filtering and accessibility features</li>
              <li>Communicate product updates and pilot details</li>
              <li>Improve performance and safety</li>
              <li>Conduct analytics and research</li>
              <li>Comply with legal and security obligations</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white mt-12 mb-6">
              3. Aggregated & De-Identified Insights (Content-Level Data)
            </h2>
            <p className="font-semibold text-white text-lg mb-4">
              This is the core of SKIP IT.'s research mission.
            </p>

            <p className="text-foreground/90 leading-relaxed">
              We generate aggregated, de-identified insights such as:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80 mt-4">
              <li>Number of skips per category</li>
              <li>Overall skip patterns</li>
              <li>Timestamp-level trends (e.g., "violence spikes at 00:47")</li>
              <li>Accessibility usage (e.g., blur vs. skip rates)</li>
              <li>Performance/accuracy metrics</li>
            </ul>

            <p className="text-foreground/90 leading-relaxed mt-6">
              We may share or license this de-identified trend data to partners, such as:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80 mt-4">
              <li>Creators</li>
              <li>Studios</li>
              <li>Streaming platforms</li>
              <li>Accessibility researchers</li>
            </ul>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-6 space-y-2">
              <p className="text-foreground/90 leading-relaxed">This data:</p>
              <ul className="space-y-2 text-foreground/80 mt-2">
                <li>✔ Cannot identify any individual user</li>
                <li>✔ Contains no names, emails, IDs, or contact information</li>
                <li>✔ Is created using privacy-preserving methods</li>
                <li>✔ Does not count as "selling personal information" under CPRA or GDPR</li>
              </ul>
            </div>

            <p className="text-foreground/90 leading-relaxed mt-4">
              This helps improve content safety and advance accessibility without compromising user privacy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white mt-12 mb-6">
              4. Cookies & Similar Technologies
            </h2>
            <p className="text-foreground/90 leading-relaxed">We may use:</p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80 mt-4">
              <li>Essential cookies (required for core functionality)</li>
              <li>Privacy-respecting analytics</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed mt-4">
              You can disable non-essential cookies where controls are available.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white mt-12 mb-6">
              5. Legal Bases (EU/UK Only)
            </h2>
            <p className="text-foreground/90 leading-relaxed">We rely on:</p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80 mt-4">
              <li>Consent (optional analytics, certain features)</li>
              <li>Contract (providing services you request)</li>
              <li>Legitimate interests (safety, quality, research)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white mt-12 mb-6">6. Sharing Information</h2>
            <p className="font-semibold text-white mb-4">
              We do not sell personal information such as names, emails, or unique identifiers.
            </p>

            <p className="text-foreground/90 leading-relaxed mb-6">We may share information with:</p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">A. Trusted Processors</h3>
                <p className="text-foreground/80 leading-relaxed mb-3">
                  Vetted service providers for:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                  <li>Hosting</li>
                  <li>Error monitoring</li>
                  <li>Email communication</li>
                  <li>Analytics</li>
                </ul>
                <p className="text-foreground/70 text-sm mt-3 italic">
                  All under strict data protection agreements.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">B. Legal & Safety Requirements</h3>
                <p className="text-foreground/80 leading-relaxed">
                  If necessary to comply with law or protect the safety of users.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">C. Aggregated, De-Identified Insights</h3>
                <p className="text-foreground/80 leading-relaxed">
                  As described above — never identifying, never personal.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white mt-12 mb-6">7. Data Retention</h2>
            <p className="text-foreground/90 leading-relaxed">
              We retain personal information only as long as necessary for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80 mt-4">
              <li>Providing SKIP IT.</li>
              <li>Security and diagnostics</li>
              <li>Legal obligations</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed mt-4">
              We then delete or de-identify it. Logs are kept for shorter periods unless needed for safety or compliance.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white mt-12 mb-6">8. Security</h2>
            <p className="text-foreground/90 leading-relaxed">
              We use industry-standard safeguards, encryption, and access controls. No system is perfect, but we continuously improve protections.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white mt-12 mb-6">9. Children</h2>
            <p className="text-foreground/90 leading-relaxed">
              SKIP IT. is not directed to children under 13 (or the minimum age required in your region). If a child accidentally submits personal data, contact us for removal.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white mt-12 mb-6">10. Your Rights</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Depending on your region, you may have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Access your data</li>
              <li>Correct inaccuracies</li>
              <li>Delete information</li>
              <li>Export your data</li>
              <li>Restrict or object to certain processing</li>
            </ul>
            <p className="text-foreground/90 leading-relaxed mt-4">
              To exercise your rights, contact us at{" "}
              <a href="mailto:info@skipit.tech" className="text-[#4A5FBA] hover:text-[#3d4e9d] underline font-medium">
                info@skipit.tech
              </a>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white mt-12 mb-6">11. Region-Specific Notices</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">California (CPRA)</h3>
                <p className="text-foreground/80 leading-relaxed">
                  SKIP IT. does not sell personal information. If we ever begin activities that count as "sharing," we will provide legally required opt-outs.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">EU/UK (GDPR)</h3>
                <p className="text-foreground/80 leading-relaxed mb-3">You may:</p>
                <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                  <li>Contact us to exercise GDPR rights</li>
                  <li>Lodge complaints with your supervisory authority</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white mt-12 mb-6">12. Platform Independence</h2>
            <p className="text-foreground/90 leading-relaxed">
              SKIP IT. operates as an independent accessibility tool. Use of streaming platforms remains subject to their separate terms and privacy policies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white mt-12 mb-6">13. Intellectual Property</h2>
            <p className="text-foreground/90 leading-relaxed mb-3">
              SKIP IT.'s core technology — including AI-assisted content filtering and time-based scene control — is patent pending.
            </p>
            <p className="text-foreground/70 text-sm">© SKIP IT. Tech, Inc.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white mt-12 mb-6">14. Changes to This Policy</h2>
            <p className="text-foreground/90 leading-relaxed">
              We may update this Privacy Policy as SKIP IT. evolves. If changes are significant, we will provide reasonable notice.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white mt-12 mb-6">
              15. Mental Health Disclaimer (Important)
            </h2>
            <div className="bg-red-500/10 border-2 border-red-500/30 rounded-xl p-8 space-y-4">
              <p className="text-foreground/90 leading-relaxed">
                <strong className="text-white">SKIP IT. is an accessibility and content-filtering tool</strong> designed to help users manage their media experience.
              </p>
              <p className="text-white font-semibold text-lg">
                SKIP IT. does not provide mental health treatment, therapy, counseling, diagnosis, or medical advice.
              </p>
              <div>
                <p className="text-foreground/90 leading-relaxed mb-2">
                  Nothing in SKIP IT. should be interpreted as:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                  <li>clinical guidance</li>
                  <li>therapeutic recommendations</li>
                  <li>crisis support</li>
                  <li>a substitute for mental health professionals</li>
                </ul>
              </div>
              <p className="text-white font-semibold pt-2">
                If you are experiencing distress, crisis, or mental health symptoms, please contact a qualified professional or your local emergency/crisis hotline.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white mt-12 mb-6">
              16. Crisis Resources
            </h2>
            <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-xl p-8 space-y-6">
              <p className="text-white font-semibold text-lg">
                If you or someone you know is in crisis, help is available 24/7:
              </p>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    National Suicide Prevention Lifeline (USA)
                  </h3>
                  <p className="text-2xl font-bold text-[#4A5FBA] mb-2">988</p>
                  <p className="text-foreground/80 text-sm mb-2">
                    Call or text 988 to reach the Suicide & Crisis Lifeline
                  </p>
                  <p className="text-foreground/70 text-sm">
                    Available 24 hours a day, 7 days a week
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Crisis Text Line
                  </h3>
                  <p className="text-foreground/90 mb-2">
                    Text <span className="font-bold text-white">HELLO</span> to <span className="text-xl font-bold text-[#4A5FBA]">741741</span>
                  </p>
                  <p className="text-foreground/70 text-sm">
                    Free, confidential support via text message
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    International Crisis Resources
                  </h3>
                  <ul className="space-y-2 text-foreground/80">
                    <li>
                      <strong className="text-white">Canada:</strong> Call or text 988
                    </li>
                    <li>
                      <strong className="text-white">UK:</strong> Call 116 123 (Samaritans)
                    </li>
                    <li>
                      <strong className="text-white">Australia:</strong> Call 13 11 14 (Lifeline)
                    </li>
                    <li className="pt-2">
                      <a 
                        href="https://findahelpline.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#4A5FBA] hover:text-[#3d4e9d] underline font-medium"
                      >
                        Find a helpline in your country →
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <p className="text-foreground/90 leading-relaxed pt-4 border-t border-white/10">
                <strong className="text-white">Emergency:</strong> If you are in immediate danger, please call your local emergency number (911 in the USA) or go to your nearest emergency room.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white mt-12 mb-6">Contact Us</h2>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-2">
              <p className="text-white font-semibold text-lg">SKIP IT. Tech, Inc.</p>
              <p className="text-foreground/80">Boston, MA, USA</p>
              <p className="text-foreground/80">
                Email:{" "}
                <a href="mailto:info@skipit.tech" className="text-[#4A5FBA] hover:text-[#3d4e9d] underline font-medium">
                  info@skipit.tech
                </a>
              </p>
            </div>
          </section>
        </article>
      </main>

      <footer className="border-t border-border bg-background/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-foreground/60">
          <p>© 2025 SKIP IT. Tech, Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
