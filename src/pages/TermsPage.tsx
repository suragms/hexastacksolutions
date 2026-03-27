import { LegalDocument } from '../components/legal/LegalDocument'

export function TermsPage() {
  return (
    <LegalDocument title="Terms of Service" updated="26 March 2026">
      <p>
        By accessing <strong className="text-text-primary">hexastacksolutions.com</strong> or engaging HexaStack
        Solutions for services, you agree to these Terms. If you do not agree, do not use our site or services.
      </p>

      <h2>1. Services</h2>
      <p>
        We provide website design, web application development, SEO, integrations (including POS and billing),
        and related consulting. Deliverables, timelines, and fees are defined in a separate proposal, statement
        of work, or invoice, which takes precedence where it conflicts with this page.
      </p>

      <h2>2. Client responsibilities</h2>
      <ul>
        <li>Timely access to stakeholders, credentials, content, brand assets, and approvals.</li>
        <li>Accuracy of information you supply (business details, legal copy, product data).</li>
        <li>Compliance with applicable laws in your jurisdiction (including Gulf markets you serve).</li>
      </ul>

      <h2>3. Intellectual property</h2>
      <p>
        Upon full payment for a defined scope, ownership of custom deliverables transfers as stated in your
        agreement. Third-party libraries, frameworks, and stock assets remain subject to their respective
        licences. We may showcase non-confidential work in our portfolio unless you request otherwise in writing.
      </p>

      <h2>4. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, HexaStack Solutions is not liable for indirect, incidental, or
        consequential damages, or for loss of profits, data, or business opportunities arising from use of our
        services or site. Our total liability for any claim relating to a project is limited to fees paid to us
        for that project in the twelve (12) months preceding the claim.
      </p>

      <h2>5. Governing law</h2>
      <p>
        These Terms are governed by the laws of India. Courts at Thrissur, Kerala, shall have exclusive
        jurisdiction, without prejudice to mandatory consumer protections where applicable.
      </p>

      <h2>6. Changes</h2>
      <p>
        We may update this page periodically. Continued use after changes constitutes acceptance of the revised
        Terms.
      </p>
    </LegalDocument>
  )
}
