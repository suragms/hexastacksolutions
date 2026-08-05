import { useCallback, useEffect, useMemo, useState } from 'react'
import {
    BarChart3,
    LineChart as LineChartIcon,
    Plus,
    RefreshCw,
    Send,
    Trash2,
} from 'lucide-react'
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import { API_URL } from '@/lib/utils'

function authHeaders(json = true): Record<string, string> {
    const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('admin_token') : null
    const headers: Record<string, string> = {}
    if (json) headers['Content-Type'] = 'application/json'
    if (token) headers['Authorization'] = `Bearer ${token}`
    return headers
}

function istToday(): string {
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date())
}

type DailyReport = {
    date: string
    enquiriesByStage: Record<string, number>
    totalEnquiries: number
    pageViews: number
    organicViews: number
    formSubmissions: number
    tasksCreated: number
    tasksCompleted: number
    outreachCount: number
    outreachEvents: number
    revenue: { wonMtd: number; wonDeals: number; quotedPipeline: number; quotedDeals: number }
    slaBreaches: number
    newClients: number
}

type HistoryItem = { id: string; date: string; summary: string; json?: string; emailedTo: string[]; sentAt: string | null }

type SeoOverview = {
    keywords: Array<{
        id: string
        keyword: string
        latestPosition: number | null
        prevPosition: number | null
        delta: number | null
        volume: number | null
        kd: number | null
        traffic: number | null
        priorityScore: number | null
        historyCount: number
    }>
    weeklyMetrics: Array<{ weekStart: string; gscClicks: number | null; gbpViews: number | null; linkedInReach: number | null }>
    organicViews: Array<{ date: string; count: number }>
    backlinks: Array<{ id: string; sourceSite: string | null; sourceUrl: string; daDr: string | null; status: string | null; linkType: string | null }>
}

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
            <p className="mt-1.5 text-2xl font-bold text-slate-900">{value}</p>
            {sub ? <p className="mt-0.5 text-xs text-slate-500">{sub}</p> : null}
        </div>
    )
}

export function ReportsTab({ onNotify }: { onNotify: (type: string, message: string) => void }) {
    const [date, setDate] = useState<string>(istToday())
    const [report, setReport] = useState<DailyReport | null>(null)
    const [history, setHistory] = useState<HistoryItem[]>([])
    const [loading, setLoading] = useState(false)
    const [sending, setSending] = useState(false)

    // SEO state
    const [seo, setSeo] = useState<SeoOverview | null>(null)
    const [seoKeyword, setSeoKeyword] = useState<string>('')
    const [historyData, setHistoryData] = useState<Array<{ snapshotDate: string; position: number }>>([])
    const [newKeyword, setNewKeyword] = useState('')
    const [posKeyword, setPosKeyword] = useState('')
    const [posValue, setPosValue] = useState('')

    const loadReport = useCallback(async (d: string) => {
        setLoading(true)
        try {
            const res = await fetch(`${API_URL}/api/reports/daily?date=${encodeURIComponent(d)}`, {
                headers: authHeaders(),
            })
            if (!res.ok) throw new Error('Failed to load')
            setReport((await res.json()) as DailyReport)
        } catch {
            onNotify('error', 'Could not load daily report.')
        } finally {
            setLoading(false)
        }
    }, [onNotify])

    const loadHistory = useCallback(async () => {
        try {
            const res = await fetch(`${API_URL}/api/reports/history`, { headers: authHeaders() })
            if (res.ok) setHistory((await res.json()) as HistoryItem[])
        } catch {
            /* ignore */
        }
    }, [])

    const loadSeo = useCallback(async () => {
        try {
            const res = await fetch(`${API_URL}/api/seo-tracking/overview`, { headers: authHeaders() })
            if (res.ok) setSeo((await res.json()) as SeoOverview)
        } catch {
            /* ignore */
        }
    }, [])

    useEffect(() => {
        loadReport(date)
    }, [date, loadReport])

    useEffect(() => {
        loadHistory()
        loadSeo()
    }, [loadHistory, loadSeo])

    const sendReport = useCallback(async () => {
        setSending(true)
        try {
            const res = await fetch(`${API_URL}/api/reports/daily/send`, {
                method: 'POST',
                headers: authHeaders(),
                body: JSON.stringify({ date }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data?.error || 'Failed')
            onNotify('success', `Daily report sent for ${data.date}.`)
            loadHistory()
        } catch {
            onNotify('error', 'Could not send daily report. Is RESEND_API_KEY set?')
        } finally {
            setSending(false)
        }
    }, [date, loadHistory, onNotify])

    const loadKeywordHistory = useCallback(async (keyword: string) => {
        if (!keyword) {
            setHistoryData([])
            return
        }
        setSeoKeyword(keyword)
        try {
            const res = await fetch(`${API_URL}/api/seo-tracking/history?keyword=${encodeURIComponent(keyword)}`, {
                headers: authHeaders(),
            })
            if (res.ok) {
                const rows = await res.json()
                setHistoryData(
                    (rows as Array<{ snapshotDate: string; position: number }>).map((r) => ({
                        snapshotDate: r.snapshotDate,
                        position: r.position,
                    })),
                )
            }
        } catch {
            setHistoryData([])
        }
    }, [])

    const addKeyword = useCallback(async () => {
        const keyword = newKeyword.trim()
        if (!keyword) return
        try {
            const res = await fetch(`${API_URL}/api/seo-tracking/keywords`, {
                method: 'POST',
                headers: authHeaders(),
                body: JSON.stringify({ keyword }),
            })
            if (!res.ok) throw new Error('Failed')
            setNewKeyword('')
            onNotify('success', `Added "${keyword}".`)
            loadSeo()
        } catch {
            onNotify('error', 'Could not add keyword.')
        }
    }, [newKeyword, loadSeo, onNotify])

    const logPosition = useCallback(async () => {
        const keyword = posKeyword.trim()
        const position = Number(posValue)
        if (!keyword || !Number.isFinite(position) || position < 1) return
        try {
            const res = await fetch(`${API_URL}/api/seo-tracking/positions`, {
                method: 'POST',
                headers: authHeaders(),
                body: JSON.stringify({ keyword, position, snapshotDate: date }),
            })
            if (!res.ok) throw new Error('Failed')
            setPosKeyword('')
            setPosValue('')
            onNotify('success', `Logged position ${position} for "${keyword}".`)
            loadSeo()
            if (seoKeyword === keyword) loadKeywordHistory(keyword)
        } catch {
            onNotify('error', 'Could not log position.')
        }
    }, [posKeyword, posValue, date, loadSeo, loadKeywordHistory, seoKeyword, onNotify])

    const deleteKeyword = useCallback(async (id: string, keyword: string) => {
        try {
            const res = await fetch(`${API_URL}/api/seo-tracking/keywords/${id}`, {
                method: 'DELETE',
                headers: authHeaders(),
            })
            if (!res.ok) throw new Error('Failed')
            onNotify('success', `Removed "${keyword}".`)
            loadSeo()
        } catch {
            onNotify('error', 'Could not delete keyword.')
        }
    }, [loadSeo, onNotify])

    const keywordOptions = useMemo(() => seo?.keywords?.map((k) => k.keyword) ?? [], [seo])

    const chartData = useMemo(
        () =>
            historyData.map((h) => ({
                name: h.snapshotDate,
                position: h.position,
            })),
        [historyData],
    )

    const weeklyChart = useMemo(
        () =>
            (seo?.weeklyMetrics ?? []).map((w) => ({
                name: w.weekStart,
                'GSC clicks': w.gscClicks ?? 0,
                'GBP views': w.gbpViews ?? 0,
                'LinkedIn reach': w.linkedInReach ?? 0,
            })),
        [seo],
    )

    const organicChart = useMemo(() => (seo?.organicViews ?? []).map((v) => ({ name: v.date, organic: v.count })), [seo])

    const renderStat = (k: 'new' | 'contacted' | 'quoted' | 'won' | 'lost') => report?.enquiriesByStage?.[k] ?? 0

    return (
        <div className="space-y-10">
            {/* ═══════════════ DAILY REPORT ═══════════════ */}
            <section>
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">Daily Website Report</h2>
                        <p className="text-sm text-slate-500">Aggregated activity for a chosen day (IST) — emailed to Lead 1/2/3 addresses.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        />
                        <button
                            onClick={() => loadReport(date)}
                            className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                        >
                            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </button>
                        <button
                            onClick={sendReport}
                            disabled={sending}
                            className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
                        >
                            <Send className="h-4 w-4" />
                            {sending ? 'Sending…' : 'Generate & Email'}
                        </button>
                    </div>
                </div>

                {report ? (
                    <div className="mt-6 space-y-6">
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-5">
                            <StatCard label="New enquiries" value={report.totalEnquiries} />
                            <StatCard label="Page views" value={report.pageViews} sub={`${report.organicViews} organic`} />
                            <StatCard label="Form submissions" value={report.formSubmissions} />
                            <StatCard label="Tasks" value={`${report.tasksCreated}/${report.tasksCompleted}`} sub="created/completed" />
                            <StatCard label="Outreach" value={report.outreachCount} sub={`${report.outreachEvents} events`} />
                            <StatCard label="Won (MTD)" value={`₹${report.revenue.wonMtd.toLocaleString('en-IN')}`} sub={`${report.revenue.wonDeals} deals`} />
                            <StatCard label="Quoted pipeline" value={`₹${report.revenue.quotedPipeline.toLocaleString('en-IN')}`} sub={`${report.revenue.quotedDeals} deals`} />
                            <StatCard label="SLA breaches" value={report.slaBreaches} />
                            <StatCard label="New clients" value={report.newClients} />
                        </div>

                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">Stage</th>
                                        <th className="px-4 py-3 font-medium">Count</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {(['new', 'contacted', 'quoted', 'won', 'lost'] as const).map((s) => (
                                        <tr key={s}>
                                            <td className="px-4 py-2.5 capitalize text-slate-700">{s}</td>
                                            <td className="px-4 py-2.5 text-slate-900">{renderStat(s)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : loading ? (
                    <p className="mt-6 text-sm text-slate-500">Loading report…</p>
                ) : null}
            </section>

            {/* ═══════════════ SAVED REPORTS ═══════════════ */}
            <section>
                <h2 className="text-lg font-semibold text-slate-900">Saved Reports</h2>
                <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
                    {history.length === 0 ? (
                        <p className="p-4 text-sm text-slate-500">No saved reports yet. Generate & email one to save it here.</p>
                    ) : (
                        <table className="w-full text-sm">
                            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Date</th>
                                    <th className="px-4 py-3 font-medium">Summary</th>
                                    <th className="px-4 py-3 font-medium">Sent</th>
                                    <th className="px-4 py-3 font-medium">To</th>
                                    <th className="px-4 py-3 font-medium" />
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {history.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50">
                                        <td className="px-4 py-2.5 font-medium text-slate-900">{item.date}</td>
                                        <td className="px-4 py-2.5 text-slate-600">{item.summary}</td>
                                        <td className="px-4 py-2.5 text-slate-600">{item.sentAt ? new Date(item.sentAt).toLocaleString('en-IN') : '—'}</td>
                                        <td className="px-4 py-2.5 text-xs text-slate-500">{(item.emailedTo || []).join(', ')}</td>
                                        <td className="px-4 py-2.5">
                                            <button
                                                onClick={() => {
                                                    if (item.json) {
                                                        setReport(JSON.parse(item.json) as DailyReport)
                                                        setDate(item.date)
                                                    }
                                                }}
                                                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>

            {/* ═══════════════ SEO ANALYTICS ═══════════════ */}
            <section className="border-t border-slate-200 pt-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                            <BarChart3 className="h-5 w-5 text-slate-500" />
                            SEO Performance
                        </h2>
                        <p className="text-sm text-slate-500">
                            Keyword positions, weekly GSC/GBP metrics, organic traffic, and backlinks.
                        </p>
                    </div>
                    <button onClick={loadSeo} className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                        <RefreshCw className="h-4 w-4" />
                        Refresh
                    </button>
                </div>

                {/* Keyword tracker */}
                <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
                    <h3 className="text-sm font-semibold text-slate-700">Keyword Tracker</h3>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        <input
                            type="text"
                            value={newKeyword}
                            onChange={(e) => setNewKeyword(e.target.value)}
                            placeholder="Add a keyword to track"
                            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        />
                        <button onClick={addKeyword} className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                            <Plus className="h-4 w-4" />
                            Add
                        </button>
                        <span className="mx-1 text-slate-300">|</span>
                        <input
                            type="text"
                            list="seo-keyword-list"
                            value={posKeyword}
                            onChange={(e) => setPosKeyword(e.target.value)}
                            placeholder="Log position for keyword"
                            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        />
                        <input
                            type="number"
                            min={1}
                            value={posValue}
                            onChange={(e) => setPosValue(e.target.value)}
                            placeholder="Position (1 = best)"
                            className="w-32 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        />
                        <button onClick={logPosition} className="inline-flex items-center gap-2 rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-700">
                            <LineChartIcon className="h-4 w-4" />
                            Log position
                        </button>
                        <datalist id="seo-keyword-list">
                            {keywordOptions.map((k) => (
                                <option key={k} value={k} />
                            ))}
                        </datalist>
                    </div>

                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full min-w-[640px] text-sm">
                            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                                <tr>
                                    <th className="px-4 py-2.5 font-medium">Keyword</th>
                                    <th className="px-4 py-2.5 font-medium">Position</th>
                                    <th className="px-4 py-2.5 font-medium">Δ</th>
                                    <th className="px-4 py-2.5 font-medium">Vol</th>
                                    <th className="px-4 py-2.5 font-medium">KD</th>
                                    <th className="px-4 py-2.5 font-medium">Traffic</th>
                                    <th className="px-4 py-2.5 font-medium">Priority</th>
                                    <th className="px-4 py-2.5 font-medium">Snapshots</th>
                                    <th className="px-4 py-2.5 font-medium" />
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {(seo?.keywords ?? []).length === 0 ? (
                                    <tr>
                                        <td colSpan={9} className="px-4 py-4 text-slate-500">
                                            No keywords tracked yet. Run <code className="rounded bg-slate-100 px-1">npm run seo:import</code> to import the Ahrefs CSV, or add keywords above.
                                        </td>
                                    </tr>
                                ) : (
                                    (seo?.keywords ?? []).map((k) => (
                                        <tr key={k.id ?? k.keyword} className="hover:bg-slate-50">
                                            <td className="px-4 py-2.5">
                                                <button onClick={() => loadKeywordHistory(k.keyword)} className="font-medium text-slate-900 hover:text-orange-600">
                                                    {k.keyword}
                                                </button>
                                            </td>
                                            <td className="px-4 py-2.5 text-slate-900">{k.latestPosition ?? '—'}</td>
                                            <td className="px-4 py-2.5">
                                                {k.delta != null && k.delta !== 0 ? (
                                                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${k.delta > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                                                        {k.delta > 0 ? `▲${k.delta}` : `▼${Math.abs(k.delta)}`}
                                                    </span>
                                                ) : (
                                                    <span className="text-slate-300">—</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-2.5 text-slate-600">{k.volume ?? '—'}</td>
                                            <td className="px-4 py-2.5 text-slate-600">{k.kd ?? '—'}</td>
                                            <td className="px-4 py-2.5 text-slate-600">{k.traffic ?? '—'}</td>
                                            <td className="px-4 py-2.5 text-slate-600">{k.priorityScore ?? '—'}</td>
                                            <td className="px-4 py-2.5 text-slate-600">{k.historyCount}</td>
                                            <td className="px-4 py-2.5">
                                                {k.id ? (
                                                    <button onClick={() => deleteKeyword(k.id, k.keyword)} className="text-slate-400 hover:text-red-600" aria-label={`Delete ${k.keyword}`}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                ) : null}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Position history chart */}
                <div className="mt-5 grid gap-5 lg:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-white p-5">
                        <div className="flex items-center justify-between gap-2">
                            <h3 className="text-sm font-semibold text-slate-700">Keyword position history</h3>
                            <select
                                value={seoKeyword}
                                onChange={(e) => loadKeywordHistory(e.target.value)}
                                className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700"
                            >
                                <option value="">Select keyword…</option>
                                {keywordOptions.map((k) => (
                                    <option key={k} value={k}>
                                        {k}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <p className="mt-1 text-xs text-slate-500">Lower position = better (1 is top).</p>
                        <div className="mt-4 h-56">
                            {chartData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                        <XAxis dataKey="name" fontSize={11} />
                                        <YAxis reversed fontSize={11} allowDecimals={false} />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="position" stroke="#ea580c" strokeWidth={2} dot={{ r: 3 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <p className="text-sm text-slate-400">Select a keyword to see its position trend.</p>
                            )}
                        </div>
                    </div>

                    {/* Weekly metrics */}
                    <div className="rounded-xl border border-slate-200 bg-white p-5">
                        <h3 className="text-sm font-semibold text-slate-700">Weekly GSC / GBP / LinkedIn</h3>
                        <p className="mt-1 text-xs text-slate-500">Entered manually in Daily Ops → Weekly metrics.</p>
                        <div className="mt-4 h-56">
                            {weeklyChart.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={weeklyChart}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                        <XAxis dataKey="name" fontSize={10} />
                                        <YAxis fontSize={11} />
                                        <Tooltip />
                                        <Legend wrapperStyle={{ fontSize: 11 }} />
                                        <Bar dataKey="GSC clicks" fill="#ea580c" />
                                        <Bar dataKey="GBP views" fill="#3b82f6" />
                                        <Bar dataKey="LinkedIn reach" fill="#64748b" />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <p className="text-sm text-slate-400">No weekly metrics yet.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Organic views + backlinks */}
                <div className="mt-5 grid gap-5 lg:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-white p-5">
                        <h3 className="text-sm font-semibold text-slate-700">Organic page views (90 days)</h3>
                        <div className="mt-4 h-52">
                            {organicChart.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={organicChart}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                        <XAxis dataKey="name" fontSize={10} />
                                        <YAxis fontSize={11} allowDecimals={false} />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="organic" stroke="#16a34a" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <p className="text-sm text-slate-400">No organic traffic recorded yet.</p>
                            )}
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-5">
                        <h3 className="text-sm font-semibold text-slate-700">Backlinks</h3>
                        <div className="mt-4 overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                                    <tr>
                                        <th className="px-3 py-2 font-medium">Site</th>
                                        <th className="px-3 py-2 font-medium">DA/DR</th>
                                        <th className="px-3 py-2 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {(seo?.backlinks ?? []).length === 0 ? (
                                        <tr>
                                            <td colSpan={3} className="px-3 py-3 text-slate-500">No backlinks recorded.</td>
                                        </tr>
                                    ) : (
                                        (seo?.backlinks ?? []).map((b) => (
                                            <tr key={b.id}>
                                                <td className="px-3 py-2 text-slate-700">{b.sourceSite || b.sourceUrl}</td>
                                                <td className="px-3 py-2 text-slate-600">{b.daDr || '—'}</td>
                                                <td className="px-3 py-2 text-slate-600">{b.status || '—'}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
