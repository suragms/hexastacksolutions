import { Link } from 'react-router-dom'
import { LegalDocument } from '../components/legal/LegalDocument'
import { site } from '../data/site'
import { usePageSeo } from '../hooks/usePageSeo'

export function RefundPolicyPage() {
  usePageSeo({
    title: 'Refund Policy',
    description:
      'Refund and cancellation policy for HexaStack Solutions: deposits, milestones, and how fees apply to software and creative services.',
    canonicalPath: '/refund-policy',
  })

  return (
    <LegalDocument title="No Refund Policy" updated="26 March 2026">
      <p>
        <strong className="text-text-primary">All fees paid to HexaStack Solutions are non-refundable</strong>{' '}
        except where required by applicable law or explicitly stated otherwise in a signed written agreement.
      </p>

      <h2>1. Why we operate this way</h2>
      <p>
        Software and creative services involve immediate allocation of senior time, tooling, and opportunity cost
        once work begins. Deposits and milestone payments secure calendar capacity and cover discovery,
        architecture, and delivery work that cannot be &quot;returned&quot; like a physical product.
      </p>

      <h2>2. Deposits &amp; milestones</h2>
      <ul>
        <li>Project deposits are credited toward the agreed scope and are not refundable after kickoff.</li>
        <li>Milestone invoices are due as stated in your proposal; late payment may pause work per contract.</li>
      </ul>

      <h2>3. Cancellations</h2>
      <p>
        If you cancel a project after work has started, fees for completed milestones and work-in-progress remain
        payable. Any prepaid unused balance may be applied to a future engagement within six (6) months, at our
        discretion, unless your contract says otherwise.
      </p>

      <h2>4. Defects &amp; warranty</h2>
      <p>
        Bugs or defects within the agreed warranty window (if any) are remediated as per your statement of work.
        This is separate from refunds; our goal is a working deliverable, not cash back for subjective design
        preferences outside scope.
      </p>

      <h2>5. Disputes</h2>
      <p>
        Good-faith resolution first via direct discussion. Escalation follows the dispute clause in your Terms of
        Service or master agreement.
      </p>

      <h2>6. Questions</h2>
      <p>
        Clarify billing before you sign:{' '}
        <a href={`mailto:${site.email}`} className="font-medium text-orange-600 hover:underline">
          {site.email}
        </a>{' '}
        or{' '}
        <Link to="/contact" className="font-medium text-orange-600 hover:underline">
          contact form
        </Link>
        .
      </p>
    </LegalDocument>
  )
}
