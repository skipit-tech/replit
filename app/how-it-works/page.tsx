export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#0D0B3B] text-white font-dm-sans">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-12 pb-24">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How SKIP IT. Works</h1>

          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Watch your favorite movies and shows without the stress. SKIP IT. automatically detects and skips triggering
            content based on your preferences.
          </p>
        </section>

        {/* Three Steps */}
        <section className="grid md:grid-cols-3 gap-6 mb-16">
          <StepCard
            number="1"
            title="Connect Your Services"
            description="Link your Netflix, Hulu, Disney+, and other streaming accounts to SKIP IT."
          />
          <StepCard
            number="2"
            title="Choose Your Triggers"
            description="Select which content types you want to skip: violence, abuse, substance use, and more."
          />
          <StepCard
            number="3"
            title="Watch with Peace of Mind"
            description="SKIP IT. automatically detects and skips triggering scenes in real-time as you watch."
          />
        </section>

        {/* Mock Player */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">See It In Action</h2>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
            <div className="aspect-video bg-black rounded-2xl mb-4 relative overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%284%29-Lg2mbjOyyiycYw5tSaZb1D37qXFaBc.png"
                alt="SKIP IT trigger warning overlay showing gun violence detection with description, skip, and dismiss buttons"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Timeline */}
            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="absolute left-0 top-0 h-full w-[35%] bg-white/30" />
              <div className="absolute left-[35%] top-0 h-full w-[8%] bg-[#d0e3ff]" />
              <div className="absolute left-[43%] top-0 h-full w-[57%] bg-white/30" />
            </div>

            <div className="flex items-center justify-between mt-4 text-sm text-white/60">
              <span>12:34</span>
              <div className="flex items-center gap-2 text-[#d0e3ff]">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Violence detected - skipping 15 seconds</span>
              </div>
              <span>1:45:20</span>
            </div>
          </div>
        </section>

        {/* What We Can Flag */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">What We Can Flag</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Abuse",
              "Violence",
              "Mental Illness",
              "Substance Use",
              "Discrimination",
              "Self-Harm",
              "Sexual Content",
              "Animal Cruelty",
              "Death",
              "Trauma",
            ].map((trigger) => (
              <span key={trigger} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                {trigger}
              </span>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            <FAQItem
              question="How does SKIP IT. detect triggering content?"
              answer="SKIP IT. uses advanced AI and community-sourced data to identify triggering scenes in movies and TV shows. Our system is constantly learning and improving."
            />
            <FAQItem
              question="Can I customize which triggers to skip?"
              answer="You have full control over which content types you want to skip. You can enable or disable specific triggers at any time in your settings."
            />
            <FAQItem
              question="Does SKIP IT. work with all streaming services?"
              answer="SKIP IT. currently supports Netflix, Hulu, Disney+, Prime Video, HBO Max, and more. We're constantly adding support for new platforms."
            />
            <FAQItem
              question="Will I miss important plot points?"
              answer="SKIP IT. only skips the triggering moments themselves, not entire scenes. You'll see a brief notification when content is skipped, and you can always rewind if needed."
            />
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Watch Safely?</h2>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              Join thousands of users who are enjoying their favorite content without the stress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="px-8 py-3 rounded-xl bg-[#d0e3ff] text-[#0D0B3B] font-semibold hover:brightness-95 transition"
              >
                Sign Up Free
              </a>
              <a
                href="/signin"
                className="px-8 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition"
              >
                Sign In
              </a>
            </div>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
      <div className="w-12 h-12 rounded-full bg-[#d0e3ff] text-[#0D0B3B] font-bold text-xl flex items-center justify-center mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-white/70 text-sm">{description}</p>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="bg-white/5 border border-white/10 rounded-2xl p-5 group">
      <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
        {question}
        <svg
          className="w-5 h-5 transition-transform group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <p className="mt-3 text-white/70 text-sm">{answer}</p>
    </details>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-[#0D0B3B]/70 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <a href="/">
            <img src="/skipit-logo.png" alt="SKIP IT." className="h-8 w-auto" />
          </a>
        </div>
        <nav className="hidden md:flex items-center gap-6 ml-6 text-sm text-white/80">
          <a className="hover:text-white" href="/">
            Movies
          </a>
          <a className="hover:text-white" href="/">
            TV Shows
          </a>
          <a className="hover:text-white text-white" href="/how-it-works">
            How it Works
          </a>
          <a className="hover:text-white" href="/hidden">
            Hidden
          </a>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <a
            href="/signin"
            className="px-4 py-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition text-sm"
          >
            Sign In
          </a>
          <a
            href="/signup"
            className="px-4 py-2 rounded-xl bg-[#d0e3ff] text-[#0D0B3B] font-semibold hover:brightness-95 transition text-sm"
          >
            Sign Up
          </a>
        </div>
      </div>
    </header>
  )
}

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0D0B3B]/95 backdrop-blur border-t border-white/10 z-50 md:hidden">
      <div className="max-w-md mx-auto flex justify-around py-3 text-sm text-white/70">
        <a href="/" className="flex flex-col items-center gap-1 hover:text-white transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="text-xs">Home</span>
        </a>
        <a href="/explore" className="flex flex-col items-center gap-1 hover:text-white transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span className="text-xs">Explore</span>
        </a>
        <a href="/settings" className="flex flex-col items-center gap-1 hover:text-white transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="text-xs">Profile</span>
        </a>
      </div>
    </nav>
  )
}
