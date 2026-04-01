import { LegalDocument } from '../components/legal/LegalDocument'
import { site } from '../data/site'
import { usePageSeo } from '../hooks/usePageSeo'

export function PrivacyPage() {
  usePageSeo({
    title: 'Privacy Policy',
    description:
      'Privacy Policy for HexaStack Solutions: how we collect, use, and protect contact, project, and technical data when you use our site and services from Thrissur, Kerala.',
    canonicalPath: '/privacy',
  })

  return (
    <LegalDocument title="Privacy Policy" updated="26 March 2026">
      <p>
        HexaStack Solutions respects your privacy. This policy explains what we collect when you use{' '}
        <strong className="text-text-primary">{site.siteUrl.replace('https://', '')}</strong>, contact us, or
        engage our services.
      </p>

      <h2>1. Information we collect</h2>
      <ul>
        <li>
          <strong className="text-text-primary">Contact details:</strong> name, email, phone, company, and
          messages you send via forms, email, or WhatsApp.
        </li>
        <li>
          <strong className="text-text-primary">Project data:</strong> files, credentials, and content you share
          for delivery (handled under confidentiality).
        </li>
        <li>
          <strong className="text-text-primary">Technical data:</strong> basic server logs and analytics (e.g.
          page views) where enabled, used to improve performance and security.
        </li>
      </ul>

      <h2>2. How we use information</h2>
      <p>
        To respond to enquiries, deliver contracted work, send project updates, invoice, and comply with law. We
        do not sell personal data. Marketing communications are only sent where you have opted in or have an
        existing business relationship.
      </p>

      <h2>3. Storage and security</h2>
      <p>
        Data may be processed in India or on cloud services with appropriate safeguards. We apply reasonable
        technical and organisational measures; see our Security page for practices relevant to projects.
      </p>

      <h2>4. Retention</h2>
      <p>
        We retain project and contact data as needed for service delivery, legal, and accounting obligations,
        then delete or anonymise where appropriate.
      </p>

      <h2>5. Your rights</h2>
      <p>
        Depending on applicable law (including India’s Digital Personal Data Protection Act where relevant), you
        may request access, correction, or deletion of personal data. Contact us at{' '}
        <a href={`mailto:${site.email}`} className="font-medium text-orange-600 hover:underline">
          {site.email}
        </a>
        .
      </p>

      <h2>6. Third-party links</h2>
      <p>Our site may link to external sites; their privacy practices are their own responsibility.</p>

      <h2>7. Updates</h2>
      <p>We may revise this policy; the &quot;Last updated&quot; date will change accordingly.</p>
    </LegalDocument>
  )
}
