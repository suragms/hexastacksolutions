import { useEffect, useState } from 'react'
import { API_URL } from '@/lib/utils'

function authHeaders() {
  const token = sessionStorage.getItem('admin_token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

type ClientRow = {
  id: string
  name: string
  company: string | null
  email: string
  status: string
  leadId?: string | null
  _count?: { contracts: number; invoices: number; projects: number }
}

type ClientDetail = ClientRow & {
  phone?: string | null
  country?: string | null
  contracts: Array<{ id: string; scope: string; amount: number; currency: string; fileUrl?: string | null }>
  invoices: Array<{
    id: string
    invoiceNo: string
    amount: number
    currency: string
    status: string
    dueDate?: string | null
    paidAt?: string | null
  }>
  projects: Array<{
    id: string
    name: string
    tasks: Array<{ id: string; title: string; status: string }>
  }>
  retainers?: Array<{ id: string; monthlyAmount: number; status: string }>
  lead?: { id: string; name: string; requirement: string } | null
}

export function ClientsTab({
  onNotify,
}: {
  onNotify: (type: 'success' | 'error', message: string) => void
}) {
  const [rows, setRows] = useState<ClientRow[]>([])
  const [status, setStatus] = useState('')
  const [detail, setDetail] = useState<ClientDetail | null>(null)
  const [contractForm, setContractForm] = useState({ scope: '', amount: '', fileUrl: '' })
  const [invoiceForm, setInvoiceForm] = useState({ amount: '', dueDate: '' })
  const [busy, setBusy] = useState(false)

  const load = async () => {
    const q = status ? `?status=${encodeURIComponent(status)}` : ''
    const res = await fetch(`${API_URL}/api/clients${q}`, { headers: authHeaders() })
    if (res.ok) setRows(await res.json())
  }

  useEffect(() => {
    void load()
  }, [status])

  const openDetail = async (id: string) => {
    const res = await fetch(`${API_URL}/api/clients/${id}`, { headers: authHeaders() })
    if (!res.ok) {
      onNotify('error', 'Failed to load client')
      return
    }
    setDetail(await res.json())
    setContractForm({ scope: '', amount: '', fileUrl: '' })
    setInvoiceForm({ amount: '', dueDate: '' })
  }

  const addContract = async () => {
    if (!detail) return
    setBusy(true)
    const res = await fetch(`${API_URL}/api/contracts`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({
        clientId: detail.id,
        scope: contractForm.scope,
        amount: Number(contractForm.amount),
        fileUrl: contractForm.fileUrl || null,
      }),
    })
    setBusy(false)
    if (!res.ok) {
      onNotify('error', 'Failed to add contract')
      return
    }
    onNotify('success', 'Contract added')
    void openDetail(detail.id)
  }

  const addInvoice = async () => {
    if (!detail) return
    setBusy(true)
    const res = await fetch(`${API_URL}/api/invoices`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({
        clientId: detail.id,
        amount: Number(invoiceForm.amount),
        dueDate: invoiceForm.dueDate || null,
        status: 'sent',
      }),
    })
    setBusy(false)
    if (!res.ok) {
      onNotify('error', 'Failed to add invoice')
      return
    }
    onNotify('success', 'Invoice created')
    void openDetail(detail.id)
  }

  const markPaid = async (invoiceId: string) => {
    if (!detail) return
    const res = await fetch(`${API_URL}/api/invoices/${invoiceId}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ markPaid: true }),
    })
    if (!res.ok) {
      onNotify('error', 'Failed to mark paid')
      return
    }
    onNotify('success', 'Invoice marked paid')
    void openDetail(detail.id)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900">Clients</h2>
        <select
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All statuses</option>
          <option value="active">active</option>
          <option value="pending">pending</option>
          <option value="approved">approved</option>
          <option value="past">past</option>
          <option value="churned">churned</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Projects</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-slate-100">
                <td className="px-4 py-2 font-medium text-slate-900">{r.name}</td>
                <td className="px-4 py-2 text-slate-600">{r.company || '—'}</td>
                <td className="px-4 py-2">{r.status}</td>
                <td className="px-4 py-2">{r._count?.projects ?? 0}</td>
                <td className="px-4 py-2 text-right">
                  <button
                    type="button"
                    className="text-sm font-medium text-slate-700 underline"
                    onClick={() => void openDetail(r.id)}
                  >
                    Open
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  No clients yet. Convert a won CRM lead.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {detail && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex justify-between">
              <div>
                <h3 className="text-lg font-semibold">{detail.name}</h3>
                <p className="text-sm text-slate-500">
                  {detail.email} · {detail.status}
                </p>
              </div>
              <button type="button" onClick={() => setDetail(null)} className="text-slate-400">
                Close
              </button>
            </div>

            {detail.lead && (
              <p className="mb-3 text-xs text-slate-500">
                Source lead: {detail.lead.name} — {detail.lead.requirement.slice(0, 80)}
              </p>
            )}

            <section className="mb-6">
              <h4 className="mb-2 text-sm font-semibold text-slate-800">Projects & onboarding</h4>
              {detail.projects?.map((p) => (
                <div key={p.id} className="mb-3 rounded-xl border border-slate-200 p-3">
                  <p className="font-medium text-slate-900">{p.name}</p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    {p.tasks.map((t) => (
                      <li key={t.id}>
                        [{t.status}] {t.title}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {!detail.projects?.length && (
                <p className="text-sm text-slate-500">No linked project</p>
              )}
            </section>

            <section className="mb-6">
              <h4 className="mb-2 text-sm font-semibold text-slate-800">Contracts</h4>
              <ul className="mb-3 space-y-1 text-sm">
                {detail.contracts.map((c) => (
                  <li key={c.id}>
                    {c.currency} {c.amount.toLocaleString('en-IN')} — {c.scope.slice(0, 60)}
                    {c.fileUrl && (
                      <a href={c.fileUrl} className="ml-2 underline" target="_blank" rel="noreferrer">
                        PDF
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              <div className="grid gap-2 sm:grid-cols-3">
                <input
                  placeholder="Scope"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  value={contractForm.scope}
                  onChange={(e) => setContractForm((f) => ({ ...f, scope: e.target.value }))}
                />
                <input
                  placeholder="Amount"
                  type="number"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  value={contractForm.amount}
                  onChange={(e) => setContractForm((f) => ({ ...f, amount: e.target.value }))}
                />
                <input
                  placeholder="File URL (upload)"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  value={contractForm.fileUrl}
                  onChange={(e) => setContractForm((f) => ({ ...f, fileUrl: e.target.value }))}
                />
              </div>
              <button
                type="button"
                disabled={busy || !contractForm.scope || !contractForm.amount}
                onClick={() => void addContract()}
                className="mt-2 rounded-full bg-slate-900 px-4 py-2 text-sm text-white disabled:opacity-50"
              >
                Add contract
              </button>
            </section>

            <section>
              <h4 className="mb-2 text-sm font-semibold text-slate-800">Invoices</h4>
              <ul className="mb-3 space-y-2 text-sm">
                {detail.invoices.map((inv) => (
                  <li key={inv.id} className="flex items-center justify-between gap-2">
                    <span>
                      {inv.invoiceNo}: {inv.currency} {inv.amount.toLocaleString('en-IN')} ·{' '}
                      <span className={inv.status === 'overdue' ? 'text-red-600' : ''}>
                        {inv.status}
                      </span>
                    </span>
                    {inv.status !== 'paid' && (
                      <button
                        type="button"
                        className="text-xs font-medium underline"
                        onClick={() => void markPaid(inv.id)}
                      >
                        Mark paid
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                <input
                  placeholder="Amount"
                  type="number"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  value={invoiceForm.amount}
                  onChange={(e) => setInvoiceForm((f) => ({ ...f, amount: e.target.value }))}
                />
                <input
                  type="date"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  value={invoiceForm.dueDate}
                  onChange={(e) => setInvoiceForm((f) => ({ ...f, dueDate: e.target.value }))}
                />
                <button
                  type="button"
                  disabled={busy || !invoiceForm.amount}
                  onClick={() => void addInvoice()}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm disabled:opacity-50"
                >
                  Create invoice
                </button>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  )
}

/** Helper used from CRM won cards */
export async function convertLeadToClient(
  leadId: string,
  onNotify: (type: 'success' | 'error', message: string) => void
): Promise<string | null> {
  const res = await fetch(`${API_URL}/api/clients/from-lead/${leadId}`, {
    method: 'POST',
    headers: authHeaders(),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    onNotify('error', err.error || 'Convert failed')
    return err.clientId || null
  }
  const data = await res.json()
  onNotify('success', 'Client created with onboarding tasks')
  return data.id
}
