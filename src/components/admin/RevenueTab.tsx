import { useEffect, useState } from 'react'
import { API_URL } from '@/lib/utils'

function authHeaders() {
  const token = sessionStorage.getItem('admin_token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

type Summary = {
  pipeline: { value: number; count: number }
  funnel: {
    counts: Record<string, number>
    rates: { newToContacted: number; contactedToQuoted: number; quotedToWon: number }
  }
  mtd: { wonRevenue: number; target: number; progressPct: number }
  retainers: { mrr: number; count: number }
  unpaid: { count: number; amount: number; overdueCount: number; overdueAmount: number }
}

export function RevenueTab({
  onNotify,
}: {
  onNotify: (type: 'success' | 'error', message: string) => void
}) {
  const [data, setData] = useState<Summary | null>(null)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const res = await fetch(`${API_URL}/api/revenue/summary`, { headers: authHeaders() })
    setLoading(false)
    if (!res.ok) {
      onNotify('error', 'Failed to load revenue')
      return
    }
    setData(await res.json())
  }

  useEffect(() => {
    void load()
  }, [])

  if (loading && !data) {
    return <p className="text-sm text-slate-500">Loading revenue…</p>
  }
  if (!data) return null

  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Revenue</h2>
        <button
          type="button"
          onClick={() => void load()}
          className="text-sm text-slate-600 hover:text-slate-900"
        >
          Refresh
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Pipeline (quoted)" value={fmt(data.pipeline.value)} hint={`${data.pipeline.count} deals`} />
        <Stat
          label="MTD won"
          value={fmt(data.mtd.wonRevenue)}
          hint={`Target ${fmt(data.mtd.target)} · ${data.mtd.progressPct}%`}
        />
        <Stat label="Retainer MRR" value={fmt(data.retainers.mrr)} hint={`${data.retainers.count} active`} />
        <Stat
          label="Unpaid invoices"
          value={fmt(data.unpaid.amount)}
          hint={`${data.unpaid.count} open · ${data.unpaid.overdueCount} overdue`}
          warn={data.unpaid.overdueCount > 0}
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">MTD vs target</p>
        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-slate-900 transition-all"
            style={{ width: `${Math.min(100, data.mtd.progressPct)}%` }}
          />
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-slate-700">Funnel</p>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Stage</th>
                <th className="px-4 py-3">Count</th>
              </tr>
            </thead>
            <tbody>
              {['new', 'contacted', 'quoted', 'won', 'lost'].map((s) => (
                <tr key={s} className="border-t border-slate-100">
                  <td className="px-4 py-2 capitalize">{s}</td>
                  <td className="px-4 py-2">{data.funnel.counts[s] || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Conversion: contacted {data.funnel.rates.newToContacted}% · quoted{' '}
          {data.funnel.rates.contactedToQuoted}% · won {data.funnel.rates.quotedToWon}%
        </p>
      </div>
    </div>
  )
}

function Stat({
  label,
  value,
  hint,
  warn,
}: {
  label: string
  value: string
  hint?: string
  warn?: boolean
}) {
  return (
    <div className={`rounded-2xl border p-4 ${warn ? 'border-amber-300 bg-amber-50' : 'border-slate-200 bg-white'}`}>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  )
}
