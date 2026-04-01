import { LegalDocument } from '../components/legal/LegalDocument'
import { site } from '../data/site'
import { usePageSeo } from '../hooks/usePageSeo'

export function SecurityPage() {
  usePageSeo({
    title: 'Security Practices',
    description:
      'Security practices for HexaStack Solutions projects: access control, HTTPS, deployment hygiene, and safe handling of credentials for clients in India and the Gulf.',
    canonicalPath: '/security',
  })

  return (
    <LegalDocument title="Security Practices" updated="26 March 2026">
      <p>
        We take security seriously for client projects, credentials, and production systems. This page summarises
        our baseline practices; project-specific requirements can be agreed in your contract.
      </p>

      <h2>1. Access control</h2>
      <ul>
        <li>Least-privilege access to repositories, hosting, and third-party dashboards.</li>
        <li>Strong passwords and multi-factor authentication where supported.</li>
        <li>No sharing of client credentials in plain text in public channels.</li>
      </ul>

      <h2>2. Development &amp; deployment</h2>
      <ul>
        <li>HTTPS for public-facing applications where we control hosting configuration.</li>
        <li>Dependency updates and security patches applied as part of maintenance agreements.</li>
        <li>Environment separation (staging vs production) where budgets allow.</li>
      </ul>

      <h2>3. Data handling</h2>
      <p>
        Sensitive data should not be emailed unencrypted when alternatives exist. We recommend vaults or secure
        channels for production secrets. Backups and retention follow your agreement and applicable regulations
        (e.g. healthcare or financial rules in your market).
      </p>

      <h2>4. Incident response</h2>
      <p>
        If a security issue affects your project, we notify you promptly and work on containment and remediation
        as defined in your statement of work or SLA.
      </p>

      <h2>5. Your responsibilities</h2>
      <p>
        Clients remain responsible for compliance in their industry (PCI, HIPAA-style requirements, UAE/KSA data
        rules, etc.), end-user policies, and legal content on their sites.
      </p>

      <h2>6. Contact</h2>
      <p>
        Security questions:{' '}
        <a href={`mailto:${site.email}`} className="font-medium text-orange-600 hover:underline">
          {site.email}
        </a>
      </p>
    </LegalDocument>
  )
}
