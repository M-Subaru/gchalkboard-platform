export const metadata = {
  title: 'Privacy Policy — Global Chalkboard',
  description: 'How Global Chalkboard collects, uses, and protects your personal data.',
}

const lastUpdated = '24 April 2026'

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-[var(--gc-slate)] pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <p className="text-xs font-semibold tracking-widest uppercase text-[var(--gc-green)] mb-4"
            style={{ fontFamily: 'Outfit, sans-serif' }}>
            Legal
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: 'Outfit, sans-serif' }}>
            Privacy Policy
          </h1>
          <p className="mt-4 text-white/60 text-sm">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl prose prose-slate prose-base leading-relaxed
          prose-h2:text-xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-base prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-2
          prose-p:text-[var(--gc-muted)] prose-li:text-[var(--gc-muted)] prose-p:mb-4">

          <h2>1. Who we are</h2>
          <p>
            Global Chalkboard is a UK-based recruitment service that connects UK-qualified teachers
            with international schools in the Gulf region. We operate as a sole trader / small
            business under the trading name Global Chalkboard.
          </p>
          <p>
            As the data controller, we are responsible for the personal information you share with
            us. If you have any questions about how we handle your data, contact us at{' '}
            <a href="mailto:info@gchalkboard.com">info@gchalkboard.com</a>.
          </p>

          <h2>2. What data we collect</h2>
          <h3>Teachers (Talent Pool registration)</h3>
          <p>When you submit a registration, we collect:</p>
          <ul>
            <li>Full name, email address, phone number</li>
            <li>Current location and teaching qualifications</li>
            <li>QTS status, years of experience, subjects taught, grade level preferences</li>
            <li>Earliest available start date</li>
            <li>CV (uploaded document), professional headshot (photo), any additional documents you choose to include</li>
            <li>Your consent to us processing this data for recruitment purposes</li>
          </ul>
          <h3>Schools (Vacancy submissions)</h3>
          <p>When you post a vacancy, we collect:</p>
          <ul>
            <li>School name and location</li>
            <li>Contact person name, email, and phone number</li>
            <li>Role details: job title, subject area, grade level, contract type, start date</li>
            <li>Visa sponsorship availability and any additional requirements</li>
            <li>Your consent to us processing this data for recruitment purposes</li>
          </ul>
          <h3>Contact form</h3>
          <p>If you contact us via the contact form, we collect your name, email address, your role (teacher, school, or other), and the content of your message.</p>

          <h2>3. How we use your data</h2>
          <p>We use your data solely for the purposes you submitted it for:</p>
          <ul>
            <li>To assess your profile or vacancy and identify potential matches</li>
            <li>To contact you when we have a relevant match or need further information</li>
            <li>To introduce you (with your consent) to the other party</li>
            <li>To manage the placement process through to the start of the role</li>
            <li>To respond to enquiries submitted via our contact form</li>
          </ul>
          <p>We do not use your data for marketing, profiling, or any purpose unrelated to recruitment.</p>

          <h2>4. Legal basis for processing</h2>
          <p>We process your data on the following legal bases under UK GDPR:</p>
          <ul>
            <li>
              <strong>Consent</strong> — you tick the consent checkbox on our forms. You may withdraw
              consent at any time by contacting us at{' '}
              <a href="mailto:info@gchalkboard.com">info@gchalkboard.com</a>.
            </li>
            <li>
              <strong>Legitimate interests</strong> — responding to contact form enquiries and
              managing the ongoing placement relationship once initiated.
            </li>
          </ul>

          <h2>5. Who we share your data with</h2>
          <p>
            We share your information only as needed to facilitate the recruitment process:
          </p>
          <ul>
            <li>
              With schools (for teachers): we will always ask your permission before introducing
              you to a specific school.
            </li>
            <li>
              With teachers (for schools): we introduce candidates only from our own talent pool
              and with their prior agreement.
            </li>
            <li>
              With our service providers: we use Supabase (data storage, hosted in the EU), Resend
              (email delivery), and Cloudflare (website hosting). Each provider processes data only
              as instructed by us and under appropriate data processing agreements.
            </li>
          </ul>
          <p>We do not sell, rent, or share your data with third parties for marketing purposes.</p>

          <h2>6. Data retention</h2>
          <p>
            We retain teacher profiles and school vacancy records for up to two years from the date
            of submission, unless a placement is made (in which case records may be retained for
            up to five years for legitimate business purposes) or unless you request deletion sooner.
          </p>
          <p>Contact form messages are retained for up to one year.</p>

          <h2>7. Your rights</h2>
          <p>Under UK GDPR, you have the right to:</p>
          <ul>
            <li><strong>Access</strong> — request a copy of the personal data we hold about you</li>
            <li><strong>Correction</strong> — ask us to correct inaccurate or incomplete data</li>
            <li><strong>Erasure</strong> — ask us to delete your data, subject to our legitimate interests</li>
            <li><strong>Restriction</strong> — ask us to limit how we use your data while a dispute is resolved</li>
            <li><strong>Portability</strong> — request your data in a structured, machine-readable format</li>
            <li><strong>Objection</strong> — object to processing based on legitimate interests</li>
            <li><strong>Withdraw consent</strong> — at any time, for processing based on consent</li>
          </ul>
          <p>
            To exercise any of these rights, email{' '}
            <a href="mailto:info@gchalkboard.com">info@gchalkboard.com</a>. We will respond within
            30 days.
          </p>
          <p>
            If you are unsatisfied with how we have handled your data, you have the right to
            lodge a complaint with the Information Commissioner&apos;s Office (ICO) at{' '}
            <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a>.
          </p>

          <h2>8. Cookies</h2>
          <p>
            Our website uses strictly necessary cookies only — for session management and to store
            your cookie preference. We do not use advertising cookies or behavioural tracking.
            We will inform you on your first visit and store your preference.
          </p>

          <h2>9. Security</h2>
          <p>
            We store all personal data securely using Supabase, which provides encrypted storage
            and enforces row-level access controls. File uploads (CVs, photos) are stored in
            private Supabase Storage buckets, not publicly accessible. Access to your data is
            limited to the two administrators of Global Chalkboard.
          </p>

          <h2>10. Changes to this policy</h2>
          <p>
            If we make significant changes to this policy, we will update the &quot;last updated&quot; date
            at the top of this page. We encourage you to review this page periodically.
          </p>

          <h2>11. Contact</h2>
          <p>
            For any privacy-related questions or to exercise your rights, contact us at:{' '}
            <a href="mailto:info@gchalkboard.com">info@gchalkboard.com</a>
          </p>
        </div>
      </section>
    </div>
  )
}
