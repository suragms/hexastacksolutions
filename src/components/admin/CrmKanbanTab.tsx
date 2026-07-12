import { useEffect, useMemo, useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from '@dnd-kit/core'
import { API_URL } from '@/lib/utils'
import { dealGapVsFloor } from '@/data/pricingTiers'

const STAGES = ['new', 'contacted', 'quoted', 'won', 'lost'] as const

type Enquiry = {
  id: string
  name: string
  email: string | null
  phone: string | null
  requirement: string
  companyName?: string | null
  stage?: string
  source?: string | null
  serviceOrProduct?: string | null
  dealValue?: number | null
  currency?: string | null
  invoiceStatus?: string | null
  firstRepliedAt?: string | null
  referredBy?: string | null
  lastStageChangeAt?: string | null
  createdAt: string
}

function authHeaders() {
  const token = sessionStorage.getItem('admin_token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

function slaFlags(item: Enquiry): { breached: boolean; reasons: string[] } {
  const reasons: string[] = []
  const now = Date.now()
  const created = new Date(item.createdAt).getTime()
  const ageH = (now - created) / 3600000

  if (!item.firstRepliedAt && ageH > 2) {
    reasons.push('Unreplied > 2h')
  }
  if (item.stage === 'quoted') {
    const stageAt = item.lastStageChangeAt
      ? new Date(item.lastStageChangeAt).getTime()
      : created
    if ((now - stageAt) / 3600000 > 72) {
      reasons.push('Quoted > 3 days')
    }
    if (!item.firstRepliedAt && ageH > 24) {
      reasons.push('Quoted, no reply > 24h')
    }
  }
  return { breached: reasons.length > 0, reasons }
}

function Card({
  item,
  onOpen,
}: {
  item: Enquiry
  onOpen: (e: Enquiry) => void
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.id,
  })
  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)`, opacity: isDragging ? 0.6 : 1 }
    : undefined
  const { breached, reasons } = slaFlags(item)

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-xl border bg-white p-3 shadow-sm ${
        breached ? 'border-red-500 ring-1 ring-red-200' : 'border-slate-200'
      } ${isDragging ? 'opacity-60' : ''}`}
    >
      <div
        {...listeners}
        {...attributes}
        className="cursor-grab active:cursor-grabbing"
        onClick={() => onOpen(item)}
      >
        <p className="font-medium text-slate-900">{item.name}</p>
        <p className="mt-1 line-clamp-2 text-xs text-slate-500">{item.requirement}</p>
        {item.dealValue != null && (
          <p className="mt-1 text-xs font-semibold text-slate-700">
            {item.currency || 'INR'} {Number(item.dealValue).toLocaleString('en-IN')}
          </p>
        )}
        {item.source && (
          <p className="mt-2 text-[10px] uppercase tracking-wide text-slate-400">{item.source}</p>
        )}
        {breached && (
          <p className="mt-1 text-[10px] font-medium text-red-600">{reasons.join(' · ')}</p>
        )}
      </div>
      <button
        type="button"
        className="mt-2 text-[11px] font-medium text-slate-600 underline"
        onClick={() => onOpen(item)}
      >
        Edit deal
      </button>
    </div>
  )
}

function Column({
  id,
  items,
  onOpen,
}: {
  id: string
  items: Enquiry[]
  onOpen: (e: Enquiry) => void
}) {
  const { setNodeRef, isOver } = useDroppable({ id })
  return (
    <div
      ref={setNodeRef}
      className={`min-h-[280px] flex-1 rounded-2xl border p-3 ${
        isOver ? 'border-slate-900 bg-slate-50' : 'border-slate-200 bg-slate-50/50'
      }`}
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
        {id} ({items.length})
      </p>
      <div className="space-y-2">
        {items.map((item) => (
          <Card key={item.id} item={item} onOpen={onOpen} />
        ))}
      </div>
    </div>
  )
}

export function CrmKanbanTab({
  onNotify,
  onConvertClient,
}: {
  onNotify: (type: 'success' | 'error', message: string) => void
  onConvertClient?: (leadId: string) => void
}) {
  const [items, setItems] = useState<Enquiry[]>([])
  const [selected, setSelected] = useState<Enquiry | null>(null)
  const [draft, setDraft] = useState({
    dealValue: '',
    currency: 'INR',
    invoiceStatus: '',
    referredBy: '',
  })
  const [caseStudy, setCaseStudy] = useState('')
  const [busy, setBusy] = useState(false)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  const load = async () => {
    const res = await fetch(`${API_URL}/api/contact`, { headers: authHeaders() })
    if (res.ok) setItems(await res.json())
  }

  useEffect(() => {
    void load()
  }, [])

  const byStage = useMemo(() => {
    const map: Record<string, Enquiry[]> = Object.fromEntries(STAGES.map((s) => [s, []]))
    for (const item of items) {
      const stage = STAGES.includes(item.stage as any) ? (item.stage as string) : 'new'
      map[stage].push(item)
    }
    return map
  }, [items])

  const openDetail = (e: Enquiry) => {
    setSelected(e)
    setCaseStudy('')
    setDraft({
      dealValue: e.dealValue != null ? String(e.dealValue) : '',
      currency: e.currency || 'INR',
      invoiceStatus: e.invoiceStatus || '',
      referredBy: e.referredBy || '',
    })
  }

  const saveDeal = async () => {
    if (!selected) return
    setBusy(true)
    const res = await fetch(`${API_URL}/api/contact/${selected.id}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({
        dealValue: draft.dealValue === '' ? null : Number(draft.dealValue),
        currency: draft.currency,
        invoiceStatus: draft.invoiceStatus || null,
        referredBy: draft.referredBy || null,
      }),
    })
    setBusy(false)
    if (!res.ok) {
      onNotify('error', 'Failed to save deal fields')
      return
    }
    const updated = await res.json()
    setItems((list) => list.map((i) => (i.id === updated.id ? { ...i, ...updated } : i)))
    setSelected({ ...selected, ...updated })
    onNotify('success', 'Deal updated')
  }

  const generateCaseStudy = async () => {
    if (!selected) return
    setBusy(true)
    const res = await fetch(`${API_URL}/api/ai/generate-post`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({
        title: `Case study: ${selected.companyName || selected.name}`,
        description: `Client success draft for human edit (do not auto-publish). Problem/requirement: ${selected.requirement}. Service: ${selected.serviceOrProduct || 'custom software'}. Deal value: ${draft.currency} ${draft.dealValue || 'n/a'}. Write problem → solution → outcome.`,
        techStack: selected.serviceOrProduct || 'custom',
        platform: 'case-study',
      }),
    })
    setBusy(false)
    if (!res.ok) {
      onNotify('error', 'Case study generation failed')
      return
    }
    const data = await res.json()
    const text =
      typeof data === 'string'
        ? data
        : [data.hook, data.caption, (data.hashtags || []).join(' ')].filter(Boolean).join('\n\n') ||
          data.post ||
          JSON.stringify(data, null, 2)
    setCaseStudy(text)
    onNotify('success', 'Case study draft ready — edit before publishing')
  }

  const onDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return
    const enquiryId = String(active.id)
    const stage = String(over.id)
    if (!STAGES.includes(stage as any)) return
    const prev = items.find((i) => i.id === enquiryId)
    if (!prev || prev.stage === stage) return
    setItems((list) => list.map((i) => (i.id === enquiryId ? { ...i, stage } : i)))
    const res = await fetch(`${API_URL}/api/contact/${enquiryId}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ stage, isRead: true }),
    })
    if (!res.ok) {
      onNotify('error', 'Failed to update stage')
      void load()
    } else {
      onNotify('success', `Moved to ${stage}`)
      void load()
    }
  }

  const gap =
    selected &&
    dealGapVsFloor(
      draft.dealValue === '' ? null : Number(draft.dealValue),
      selected.serviceOrProduct
    )

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">CRM pipeline</h2>
      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {STAGES.map((stage) => (
            <Column key={stage} id={stage} items={byStage[stage]} onOpen={openDetail} />
          ))}
        </div>
      </DndContext>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{selected.name}</h3>
                <p className="text-sm text-slate-500">{selected.email || selected.phone || '—'}</p>
              </div>
              <button
                type="button"
                className="text-slate-400 hover:text-slate-700"
                onClick={() => setSelected(null)}
              >
                Close
              </button>
            </div>
            <p className="mb-4 text-sm text-slate-600">{selected.requirement}</p>

            <div className="grid grid-cols-2 gap-3">
              <label className="col-span-1 text-xs font-medium text-slate-600">
                Deal value
                <input
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  value={draft.dealValue}
                  onChange={(e) => setDraft((d) => ({ ...d, dealValue: e.target.value }))}
                  type="number"
                />
              </label>
              <label className="col-span-1 text-xs font-medium text-slate-600">
                Currency
                <select
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  value={draft.currency}
                  onChange={(e) => setDraft((d) => ({ ...d, currency: e.target.value }))}
                >
                  <option value="INR">INR</option>
                  <option value="AED">AED</option>
                  <option value="USD">USD</option>
                </select>
              </label>
              <label className="col-span-1 text-xs font-medium text-slate-600">
                Invoice status
                <select
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  value={draft.invoiceStatus}
                  onChange={(e) => setDraft((d) => ({ ...d, invoiceStatus: e.target.value }))}
                >
                  <option value="">—</option>
                  <option value="not_invoiced">Not invoiced</option>
                  <option value="invoiced">Invoiced</option>
                  <option value="partial">Partial</option>
                  <option value="paid">Paid</option>
                </select>
              </label>
              <label className="col-span-1 text-xs font-medium text-slate-600">
                Referred by
                <input
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  value={draft.referredBy}
                  onChange={(e) => setDraft((d) => ({ ...d, referredBy: e.target.value }))}
                />
              </label>
            </div>

            {gap && (
              <p
                className={`mt-3 text-xs ${
                  gap.belowFloor ? 'font-medium text-amber-700' : 'text-slate-500'
                }`}
              >
                Pricing floor ({gap.floor.name}): ₹{gap.floor.floorInr.toLocaleString('en-IN')}
                {gap.gap != null && (
                  <>
                    {' '}
                    — {gap.belowFloor ? 'below floor by' : 'above floor by'} ₹
                    {Math.abs(gap.gap).toLocaleString('en-IN')}
                  </>
                )}
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                disabled={busy}
                onClick={() => void saveDeal()}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
              >
                Save deal
              </button>
              {selected.stage === 'won' && (
                <>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => onConvertClient?.(selected.id)}
                    className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-800"
                  >
                    Convert to client
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void generateCaseStudy()}
                    className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-800"
                  >
                    Generate case study draft
                  </button>
                </>
              )}
            </div>

            {caseStudy && (
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="mb-2 text-xs font-semibold uppercase text-slate-500">
                  Case study draft (edit before publish)
                </p>
                <textarea
                  className="min-h-[160px] w-full rounded-lg border border-slate-200 bg-white p-2 text-sm"
                  value={caseStudy}
                  onChange={(e) => setCaseStudy(e.target.value)}
                />
                <button
                  type="button"
                  className="mt-2 text-xs font-medium text-slate-600 underline"
                  onClick={() => {
                    void navigator.clipboard.writeText(caseStudy)
                    onNotify('success', 'Copied to clipboard')
                  }}
                >
                  Copy
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
