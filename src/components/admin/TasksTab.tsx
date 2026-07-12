import { useEffect, useMemo, useState } from 'react'
import { API_URL } from '@/lib/utils'

type Task = {
  id: string
  title: string
  description?: string | null
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
  deadline?: string | null
  assignedToId?: string | null
  assignedTo?: { id: string; name: string } | null
  projectId: string
  project?: { id: string; name: string } | null
}

type Staff = { id: string; name: string; active: boolean }
type Project = { id: string; name: string }

const STATUSES = ['PENDING', 'IN_PROGRESS', 'COMPLETED'] as const

function authHeaders() {
  const token = sessionStorage.getItem('admin_token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export function TasksTab({
  onNotify,
}: {
  onNotify: (type: 'success' | 'error', message: string) => void
}) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [staff, setStaff] = useState<Staff[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [filterAssignee, setFilterAssignee] = useState('')
  const [form, setForm] = useState({
    title: '',
    projectId: '',
    assignedToId: '',
    deadline: '',
    description: '',
  })

  const load = async () => {
    const q = filterAssignee ? `?assignedToId=${encodeURIComponent(filterAssignee)}` : ''
    const [tRes, uRes, pRes] = await Promise.all([
      fetch(`${API_URL}/api/tasks${q}`, { headers: authHeaders() }),
      fetch(`${API_URL}/api/users`, { headers: authHeaders() }),
      fetch(`${API_URL}/api/projects`, { headers: authHeaders() }),
    ])
    if (tRes.ok) setTasks(await tRes.json())
    if (uRes.ok) {
      const users = await uRes.json()
      setStaff(users.filter((u: Staff) => u.active !== false))
    }
    if (pRes.ok) setProjects(await pRes.json())
  }

  useEffect(() => {
    void load()
  }, [filterAssignee])

  const grouped = useMemo(() => {
    const map: Record<string, Task[]> = { PENDING: [], IN_PROGRESS: [], COMPLETED: [] }
    for (const t of tasks) map[t.status]?.push(t)
    return map
  }, [tasks])

  const create = async () => {
    if (!form.title || !form.projectId) {
      onNotify('error', 'Title and project required')
      return
    }
    const res = await fetch(`${API_URL}/api/tasks`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({
        title: form.title,
        projectId: form.projectId,
        assignedToId: form.assignedToId || null,
        deadline: form.deadline || null,
        description: form.description || null,
      }),
    })
    if (!res.ok) {
      onNotify('error', 'Failed to create task')
      return
    }
    setForm({ title: '', projectId: '', assignedToId: '', deadline: '', description: '' })
    onNotify('success', 'Task created')
    void load()
  }

  const setStatus = async (id: string, status: string) => {
    await fetch(`${API_URL}/api/tasks/${id}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ status }),
    })
    void load()
  }

  const isOverdue = (t: Task) =>
    t.deadline && t.status !== 'COMPLETED' && new Date(t.deadline) < new Date()

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900">Tasks</h2>
        <select
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
          value={filterAssignee}
          onChange={(e) => setFilterAssignee(e.target.value)}
        >
          <option value="">All assignees</option>
          {staff.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-2 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-2">
        <input
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
          placeholder="Task title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <select
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
          value={form.projectId}
          onChange={(e) => setForm({ ...form, projectId: e.target.value })}
        >
          <option value="">Select project</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <select
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
          value={form.assignedToId}
          onChange={(e) => setForm({ ...form, assignedToId: e.target.value })}
        >
          <option value="">Unassigned</option>
          {staff.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
          value={form.deadline}
          onChange={(e) => setForm({ ...form, deadline: e.target.value })}
        />
        <button
          type="button"
          onClick={() => void create()}
          className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white md:col-span-2"
        >
          Add task
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {STATUSES.map((status) => (
          <div key={status} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-3">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              {status.replace('_', ' ')} ({grouped[status].length})
            </p>
            <div className="space-y-2">
              {grouped[status].map((t) => (
                <div
                  key={t.id}
                  className={`rounded-xl border bg-white p-3 ${
                    isOverdue(t) ? 'border-red-300' : 'border-slate-200'
                  }`}
                >
                  <p className={`font-medium ${isOverdue(t) ? 'text-red-700' : 'text-slate-900'}`}>
                    {t.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {t.project?.name || 'Project'} · {t.assignedTo?.name || 'Unassigned'}
                  </p>
                  {t.deadline && (
                    <p className={`mt-1 text-xs ${isOverdue(t) ? 'text-red-600' : 'text-slate-400'}`}>
                      Due {new Date(t.deadline).toLocaleDateString('en-IN')}
                    </p>
                  )}
                  <select
                    className="mt-2 w-full rounded-lg border border-slate-200 px-2 py-1 text-xs"
                    value={t.status}
                    onChange={(e) => void setStatus(t.id, e.target.value)}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
