export const metadata = {
  title: 'Terms of Service — Global Chalkboard',
  description: 'Terms governing use of the Global Chalkboard website and recruitment service.',
}

const lastUpdated = '24 April 2026'

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="mt-4 text-white/60 text-sm">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl prose prose-slate prose-sm sm:prose-base">

          <h2>1. About these terms</h2>
          <p>
            These terms govern your use of the Global Chalkboard website (gchalkboard.com) and
            the recruitment services we provide. By using this website or submitting a registration
            or vacancy form, you agree to these terms.
          </p>
          <p>
            Global Chalkboard is a UK-based trading name. References to &quot;we&quot;, &quot;us&quot;, or
            &quot;Global Chalkboard&quot; refer to this entity. References to &quot;you&quot; refer to any person
            using the site or our services.
          </p>

          <h2>2. Our service</h2>
          <p>
            Global Chalkboard acts as an intermediary recruitment service. We connect UK-qualified
            teachers with international schools in the Gulf region. We are not an employer, and we
            do not make hiring decisions. We facilitate introductions and support the placement
            process — the employment relationship is between the teacher and the school directly.
          </p>
          <p>
            We do not guarantee that any teacher will receive a placement, or that any school will
            find a suitable candidate through our service.
          </p>

          <h2>3. Registration (teachers)</h2>
          <p>By submitting a talent pool registration, you confirm that:</p>
          <ul>
            <li>The information you provide is accurate and complete to the best of your knowledge</li>
            <li>You hold the qualifications and certifications you have described</li>
            <li>You consent to us storing and processing your data as described in our Privacy Policy</li>
            <li>You understand we may contact you when a potentially relevant role becomes available</li>
            <li>You understand that registration does not guarantee placement</li>
          </ul>

          <h2>4. Vacancy submissions (schools)</h2>
          <p>By submitting a vacancy, you confirm that:</p>
          <ul>
            <li>You have authority to recruit on behalf of the school</li>
            <li>The vacancy details are accurate</li>
            <li>You understand that our fee applies only upon successful placement</li>
            <li>You agree that the specific fee amount will be agreed separately before any introduction is made</li>
          </ul>

          <h2>5. Fees</h2>
          <p>
            Our service is entirely free for teachers at all times, with no exceptions.
          </p>
          <p>
            Schools pay a placement fee only when a candidate introduced by Global Chalkboard
            accepts and commences a role. The exact fee is agreed in writing before any
            introduction is made. No fee is payable if no placement results from our involvement.
          </p>

          <h2>6. Introductions and consent</h2>
          <p>
            We will not introduce a teacher to a school without first obtaining the teacher&apos;s
            explicit consent for that specific introduction. Teachers may decline any introduction
            at any time without consequence.
          </p>

          <h2>7. Limitation of liability</h2>
          <p>
            Global Chalkboard acts as an intermediary only. We are not liable for any loss,
            damage, or expense arising from: a placement not proceeding; the conduct or decisions
            of either the teacher or the school; any employment dispute between a placed teacher
            and a school; or information provided by either party that turns out to be inaccurate.
          </p>
          <p>
            We make reasonable efforts to verify the suitability of candidates and the legitimacy
            of vacancy submissions, but we cannot guarantee the accuracy of information provided
            to us by third parties.
          </p>
          <p>
            To the extent permitted by law, our total liability to any party in connection with
            our services shall not exceed the placement fee paid in respect of the relevant
            individual.
          </p>

          <h2>8. Acceptable use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Submit false, misleading, or fraudulent information through any of our forms</li>
            <li>Use the website or service for any unlawful purpose</li>
            <li>Attempt to access, interfere with, or disrupt any part of the website or its infrastructure</li>
            <li>Use automated tools to scrape or extract data from the website</li>
          </ul>

          <h2>9. Intellectual property</h2>
          <p>
            All content on this website — including text, design, and code — is owned by or
            licensed to Global Chalkboard. You may not reproduce, copy, or redistribute any part
            of it without our written permission. This does not affect your right to share links
            to our pages.
          </p>

          <h2>10. Governing law</h2>
          <p>
            These terms are governed by the laws of England and Wales. Any disputes arising from
            or relating to these terms or our services shall be subject to the exclusive
            jurisdiction of the courts of England and Wales.
          </p>

          <h2>11. Changes to these terms</h2>
          <p>
            We may update these terms from time to time. When we do, we will update the &quot;last
            updated&quot; date at the top of this page. Continued use of the website after changes
            are published constitutes acceptance of the updated terms.
          </p>

          <h2>12. Contact</h2>
          <p>
            If you have questions about these terms, contact us at:{' '}
            <a href="mailto:info@gchalkboard.com">info@gchalkboard.com</a>
          </p>
        </div>
      </section>
    </div>
  )
}
