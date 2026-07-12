import { useEffect, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { API_URL } from '@/lib/utils'

function authHeaders() {
  const token = sessionStorage.getItem('admin_token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export function AnalyticsEnhanced({
  days = 30,
}: {
  days?: number
}) {
  const [viewsBySource, setViewsBySource] = useState<{ source: string; count: number }[]>([])
  const [daily, setDaily] = useState<{ date: string; totalViews: number }[]>([])
  const [projected, setProjected] = useState<{ date: string; views: number }[]>([])
  const [audit, setAudit] = useState<any[]>([])

  useEffect(() => {
    void (async () => {
      const [statsRes, auditRes] = await Promise.all([
        fetch(`${API_URL}/api/analytics/stats?days=${days}`, { headers: authHeaders() }),
        fetch(`${API_URL}/api/analytics/audit?limit=40`, { headers: authHeaders() }),
      ])
      if (statsRes.ok) {
        const data = await statsRes.json()
        setViewsBySource(data.viewsBySource || [])
        setDaily((data.dailyBreakdown || []).map((d: any) => ({ date: d.date, totalViews: d.totalViews })))
        setProjected(data.projectedTrend || [])
      }
      if (auditRes.ok) setAudit(await auditRes.json())
    })()
  }, [days])

  const trendData = [
    ...daily.map((d) => ({ date: d.date, views: d.totalViews, kind: 'actual' })),
    ...projected.map((d) => ({ date: d.date, views: d.views, kind: 'projected' })),
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="mb-3 text-sm font-semibold text-slate-900">Views by source ({days}d)</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={viewsBySource}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="source" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#0f172a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="mb-1 text-sm font-semibold text-slate-900">Views trend</p>
          <p className="mb-3 text-xs text-slate-500">
            Dashed segment is a projected trend (linear fit), not an AI prediction.
          </p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#0f172a"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray={undefined}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="mb-3 text-sm font-semibold text-slate-900">Audit log</p>
        <div className="max-h-64 space-y-2 overflow-y-auto text-sm">
          {audit.length === 0 && <p className="text-slate-500">No audit entries yet.</p>}
          {audit.map((row) => (
            <div key={row.id} className="flex justify-between gap-3 border-b border-slate-100 py-2">
              <div>
                <p className="font-medium text-slate-800">{row.action}</p>
                <p className="text-xs text-slate-500">
                  {row.user?.name || row.userId}
                  {row.targetId ? ` · ${row.targetId.slice(0, 8)}…` : ''}
                </p>
              </div>
              <p className="shrink-0 text-xs text-slate-400">
                {new Date(row.createdAt).toLocaleString('en-IN')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
