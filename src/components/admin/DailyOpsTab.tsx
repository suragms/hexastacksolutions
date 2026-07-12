import { useEffect, useState } from 'react'
import { API_URL } from '@/lib/utils'

function authHeaders() {
  const token = sessionStorage.getItem('admin_token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

type Daily = {
  date: string
  outreachCount: number
  target: number
  streak: number
  redFlag: boolean
  afterHours: boolean
  allUsers?: Array<{
    userId: string
    name: string
    outreachCount: number
    streak: number
  }>
}

type SlaItem = {
  id: string
  name: string
  requirement: string
  ageHours: number
  createdAt: string
}

export function DailyOpsTab({
  onNotify,
  role,
  onJumpCrm,
}: {
  onNotify: (type: 'success' | 'error', message: string) => void
  role: string
  onJumpCrm?: () => void
}) {
  const [daily, setDaily] = useState<Daily | null>(null)
  const [sla, setSla] = useState<SlaItem[]>([])
  const [channel, setChannel] = useState('whatsapp')
  const [targetName, setTargetName] = useState('')
  const [metrics, setMetrics] = useState({
    weekStart: '',
    gscClicks: '',
    gbpViews: '',
    linkedInReach: '',
    notes: '',
  })
  const [busy, setBusy] = useState(false)
  const isSuper = role === 'SUPER_ADMIN'

  const load = async () => {
    const [dRes, sRes, mRes] = await Promise.all([
      fetch(`${API_URL}/api/ops/daily`, { headers: authHeaders() }),
      fetch(`${API_URL}/api/ops/sla`, { headers: authHeaders() }),
      fetch(`${API_URL}/api/ops/weekly-metrics`, { headers: authHeaders() }),
    ])
    if (dRes.ok) setDaily(await dRes.json())
    if (sRes.ok) setSla(await sRes.json())
    if (mRes.ok) {
      const m = await mRes.json()
      setMetrics({
        weekStart: m.weekStart || '',
        gscClicks: m.gscClicks != null ? String(m.gscClicks) : '',
        gbpViews: m.gbpViews != null ? String(m.gbpViews) : '',
        linkedInReach: m.linkedInReach != null ? String(m.linkedInReach) : '',
        notes: m.notes || '',
      })
    }
  }

  useEffect(() => {
    void load()
  }, [])

  const bumpOutreach = async () => {
    setBusy(true)
    const res = await fetch(`${API_URL}/api/ops/outreach`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ channel, targetName: targetName || null, bumpDaily: true }),
    })
    setBusy(false)
    if (!res.ok) {
      onNotify('error', 'Failed to log outreach')
      return
    }
    setTargetName('')
    onNotify('success', '+1 outreach logged')
    void load()
  }

  const saveMetrics = async () => {
    setBusy(true)
    const res = await fetch(`${API_URL}/api/ops/weekly-metrics`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify({
        weekStart: metrics.weekStart || undefined,
        gscClicks: metrics.gscClicks === '' ? null : Number(metrics.gscClicks),
        gbpViews: metrics.gbpViews === '' ? null : Number(metrics.gbpViews),
        linkedInReach: metrics.linkedInReach === '' ? null : Number(metrics.linkedInReach),
        notes: metrics.notes || null,
      }),
    })
    setBusy(false)
    if (!res.ok) {
      onNotify('error', 'Failed to save metrics')
      return
    }
    onNotify('success', 'Weekly metrics saved')
  }

  const sendDigest = async () => {
    setBusy(true)
    const res = await fetch(`${API_URL}/api/ops/digest`, {
      method: 'POST',
      headers: authHeaders(),
    })
    setBusy(false)
    if (!res.ok) {
      onNotify('error', 'Digest failed')
      return
    }
    const data = await res.json()
    onNotify('success', data.sent ? 'Digest emailed' : 'Digest built (email not sent — check Resend)')
  }

  const pct = daily ? Math.min(100, Math.round((daily.outreachCount / daily.target) * 100)) : 0

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-slate-900">Daily Ops</h2>

      <div
        className={`rounded-2xl border p-5 ${
          daily?.redFlag ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'
        }`}
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Outreach today ({daily?.date || '—'})
            </p>
            <p className="mt-1 text-3xl font-semibold text-slate-900">
              {daily?.outreachCount ?? 0}
              <span className="text-lg font-normal text-slate-400"> / {daily?.target ?? 5}</span>
            </p>
            <p className="mt-1 text-sm text-slate-600">Streak: {daily?.streak ?? 0} days at target</p>
            {daily?.redFlag && (
              <p className="mt-1 text-sm font-medium text-red-700">
                Zero outreach after 18:00 IST — log contacts now
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-end gap-2">
            <select
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
            >
              <option value="whatsapp">WhatsApp</option>
              <option value="linkedin">LinkedIn</option>
              <option value="email">Email</option>
              <option value="instagram_dm">Instagram DM</option>
            </select>
            <input
              placeholder="Target name (optional)"
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
              value={targetName}
              onChange={(e) => setTargetName(e.target.value)}
            />
            <button
              type="button"
              disabled={busy}
              onClick={() => void bumpOutreach()}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              +1 outreach
            </button>
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-slate-900" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {isSuper && daily?.allUsers && (
        <div className="rounded-xl border border-slate-200 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Staff</th>
                <th className="px-4 py-3">Today</th>
                <th className="px-4 py-3">Streak</th>
              </tr>
            </thead>
            <tbody>
              {daily.allUsers.map((u) => (
                <tr key={u.userId} className="border-t border-slate-100">
                  <td className="px-4 py-2">{u.name}</td>
                  <td className="px-4 py-2">
                    {u.outreachCount}/{daily.target}
                  </td>
                  <td className="px-4 py-2">{u.streak}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">SLA unreplied (&gt; 2h)</h3>
          {onJumpCrm && (
            <button type="button" className="text-xs underline text-slate-600" onClick={onJumpCrm}>
              Open CRM
            </button>
          )}
        </div>
        <ul className="space-y-2">
          {sla.map((s) => (
            <li key={s.id} className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm">
              <span className="font-medium text-slate-900">{s.name}</span>
              <span className="ml-2 text-red-700">{s.ageHours}h old</span>
              <p className="mt-1 line-clamp-1 text-slate-600">{s.requirement}</p>
            </li>
          ))}
          {sla.length === 0 && (
            <li className="text-sm text-slate-500">No SLA breaches — nice.</li>
          )}
        </ul>
      </div>

      <div className="rounded-2xl border border-slate-200 p-5">
        <h3 className="mb-3 text-sm font-semibold text-slate-800">
          Weekly manual metrics ({metrics.weekStart || 'this week'})
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="text-xs text-slate-600">
            GSC clicks
            <input
              type="number"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              value={metrics.gscClicks}
              onChange={(e) => setMetrics((m) => ({ ...m, gscClicks: e.target.value }))}
            />
          </label>
          <label className="text-xs text-slate-600">
            GBP views
            <input
              type="number"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              value={metrics.gbpViews}
              onChange={(e) => setMetrics((m) => ({ ...m, gbpViews: e.target.value }))}
            />
          </label>
          <label className="text-xs text-slate-600">
            LinkedIn reach
            <input
              type="number"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              value={metrics.linkedInReach}
              onChange={(e) => setMetrics((m) => ({ ...m, linkedInReach: e.target.value }))}
            />
          </label>
        </div>
        <textarea
          className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          placeholder="Notes"
          rows={2}
          value={metrics.notes}
          onChange={(e) => setMetrics((m) => ({ ...m, notes: e.target.value }))}
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={() => void saveMetrics()}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            Save metrics
          </button>
          {isSuper && (
            <button
              type="button"
              disabled={busy}
              onClick={() => void sendDigest()}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm disabled:opacity-50"
            >
              Send digest now
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
