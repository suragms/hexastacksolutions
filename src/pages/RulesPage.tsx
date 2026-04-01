import { Link } from 'react-router-dom'
import { LegalDocument } from '../components/legal/LegalDocument'
import { site } from '../data/site'
import { usePageSeo } from '../hooks/usePageSeo'

export function RulesPage() {
  usePageSeo({
    title: 'Project & Communication Rules',
    description:
      'How we work with clients: communication channels, scope changes, approvals, and delivery expectations for HexaStack Solutions engagements in Kerala and abroad.',
    canonicalPath: '/rules',
  })

  return (
    <LegalDocument title="Project &amp; Communication Rules" updated="26 March 2026">
      <p>
        These rules help us deliver on time for clients in Kerala, the Gulf, and abroad. They complement your
        signed proposal and our Terms of Service.
      </p>

      <h2>1. Communication</h2>
      <ul>
        <li>Primary channels: email and scheduled calls. WhatsApp is for quick coordination, not legal notices.</li>
        <li>Business hours follow India Standard Time unless another window is agreed for Gulf clients.</li>
        <li>Urgent production issues: contact the lead on your project with clear steps to reproduce.</li>
      </ul>

      <h2>2. Scope &amp; changes</h2>
      <ul>
        <li>Work outside the signed scope requires a change request and may affect timeline and cost.</li>
        <li>Major feedback rounds are limited as per your proposal; extra rounds may be billed.</li>
      </ul>

      <h2>3. Assets &amp; approvals</h2>
      <ul>
        <li>You warrant you have rights to logos, images, and copy you supply.</li>
        <li>Delays in content or approvals extend delivery dates without penalty to HexaStack.</li>
      </ul>

      <h2>4. Conduct</h2>
      <p>
        We work professionally and expect the same: no harassment or abusive language. We may terminate services
        for repeated violations, subject to contract and applicable law.
      </p>

      <h2>5. Related documents</h2>
      <p>
        See also:{' '}
        <Link to="/terms" className="font-medium text-orange-600 hover:underline">
          Terms of Service
        </Link>
        ,{' '}
        <Link to="/privacy" className="font-medium text-orange-600 hover:underline">
          Privacy Policy
        </Link>
        ,{' '}
        <Link to="/security" className="font-medium text-orange-600 hover:underline">
          Security
        </Link>
        ,{' '}
        <Link to="/refund-policy" className="font-medium text-orange-600 hover:underline">
          No Refund Policy
        </Link>
        . Questions:{' '}
        <a href={`mailto:${site.email}`} className="font-medium text-orange-600 hover:underline">
          {site.email}
        </a>
        .
      </p>
    </LegalDocument>
  )
}
