import { useEffect, useState } from 'react'
import { API_URL } from '@/lib/utils'
import { Copy, Plus, RefreshCw, UserX } from 'lucide-react'

type StaffUser = {
  id: string
  name: string
  email: string
  role: string
  active: boolean
  lastLoginAt: string | null
  mustChangePassword?: boolean
}

function authHeaders() {
  const token = sessionStorage.getItem('admin_token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export function TeamTab({
  currentRole,
  onNotify,
}: {
  currentRole: string
  onNotify: (type: 'success' | 'error', message: string) => void
}) {
  const [users, setUsers] = useState<StaffUser[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [tempPassword, setTempPassword] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', email: '', role: 'STAFF' })

  const isSuper = currentRole === 'SUPER_ADMIN'

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/users`, { headers: authHeaders() })
      if (res.ok) setUsers(await res.json())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
  }, [])

  if (!isSuper) {
    return (
      <p className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
        Only SUPER_ADMIN can manage the team.
      </p>
    )
  }

  const createUser = async () => {
    const res = await fetch(`${API_URL}/api/users`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(form),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      onNotify('error', data.error || 'Failed to create')
      return
    }
    setTempPassword(data.tempPassword)
    setShowAdd(false)
    setForm({ name: '', email: '', role: 'STAFF' })
    onNotify('success', 'Staff created — copy the temp password now')
    void load()
  }

  const resetPassword = async (id: string) => {
    const res = await fetch(`${API_URL}/api/users/${id}/reset-password`, {
      method: 'POST',
      headers: authHeaders(),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      onNotify('error', data.error || 'Reset failed')
      return
    }
    setTempPassword(data.tempPassword)
    onNotify('success', 'Temp password generated')
  }

  const toggleActive = async (u: StaffUser) => {
    if (u.active) {
      const res = await fetch(`${API_URL}/api/users/${u.id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        onNotify('error', data.error || 'Failed')
        return
      }
    } else {
      await fetch(`${API_URL}/api/users/${u.id}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({ active: true }),
      })
    }
    void load()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900">Team</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void load()}
            className="rounded-full border border-slate-200 px-3 py-2 text-sm"
          >
            <RefreshCw className="inline h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm text-white"
          >
            <Plus className="h-4 w-4" /> Add staff
          </button>
        </div>
      </div>

      {tempPassword && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm">
          <p className="font-medium text-amber-900">Temp password (shown once)</p>
          <p className="mt-1 font-mono text-amber-950">{tempPassword}</p>
          <p className="mt-2 text-amber-800">They must change this on first login.</p>
          <button
            type="button"
            className="mt-2 inline-flex items-center gap-1 text-amber-900 underline"
            onClick={() => {
              void navigator.clipboard.writeText(tempPassword)
              onNotify('success', 'Copied')
            }}
          >
            <Copy className="h-3.5 w-3.5" /> Copy
          </button>
          <button type="button" className="ml-3 text-slate-500" onClick={() => setTempPassword(null)}>
            Dismiss
          </button>
        </div>
      )}

      {showAdd && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
          <input
            className="w-full rounded-xl border border-slate-200 px-3 py-2"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="w-full rounded-xl border border-slate-200 px-3 py-2"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <select
            className="w-full rounded-xl border border-slate-200 px-3 py-2"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="STAFF">STAFF</option>
            <option value="ADMIN">ADMIN</option>
            <option value="SUPER_ADMIN">SUPER_ADMIN</option>
          </select>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => void createUser()}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white"
            >
              Create
            </button>
            <button type="button" onClick={() => setShowAdd(false)} className="rounded-full px-4 py-2 text-sm">
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Last login</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-900">{u.name}</td>
                  <td className="px-4 py-3 text-slate-600">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium">{u.role}</span>
                  </td>
                  <td className="px-4 py-3">{u.active ? 'Active' : 'Inactive'}</td>
                  <td className="px-4 py-3 text-slate-500">
                    {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString('en-IN') : '—'}
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      type="button"
                      className="text-xs font-medium text-slate-700 underline"
                      onClick={() => void resetPassword(u.id)}
                    >
                      Reset password
                    </button>
                    <button
                      type="button"
                      className="text-xs font-medium text-red-600 underline"
                      onClick={() => void toggleActive(u)}
                    >
                      <UserX className="mr-1 inline h-3 w-3" />
                      {u.active ? 'Deactivate' : 'Reactivate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
