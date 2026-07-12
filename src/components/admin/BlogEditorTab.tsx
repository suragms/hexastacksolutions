import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { API_URL } from '@/lib/utils'

type Post = {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  body: string
  featuredImageUrl?: string | null
  videoUrl?: string | null
  published: boolean
}

function authHeaders(json = true) {
  const token = sessionStorage.getItem('admin_token')
  const h: Record<string, string> = {}
  if (json) h['Content-Type'] = 'application/json'
  if (token) h.Authorization = `Bearer ${token}`
  return h
}

const empty = {
  title: '',
  slug: '',
  excerpt: '',
  category: 'General',
  body: '',
  featuredImageUrl: '',
  videoUrl: '',
  published: false,
}

export function BlogEditorTab({
  onNotify,
}: {
  onNotify: (type: 'success' | 'error', message: string) => void
}) {
  const [posts, setPosts] = useState<Post[]>([])
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState<string | null>(null)

  const load = async () => {
    const res = await fetch(`${API_URL}/api/blog/manage`, { headers: authHeaders() })
    if (res.ok) setPosts(await res.json())
  }

  useEffect(() => {
    void load()
  }, [])

  const save = async () => {
    const payload = {
      ...form,
      featuredImageUrl: form.featuredImageUrl || null,
      videoUrl: form.videoUrl || null,
    }
    const res = await fetch(editingId ? `${API_URL}/api/blog/${editingId}` : `${API_URL}/api/blog`, {
      method: editingId ? 'PATCH' : 'POST',
      headers: authHeaders(),
      body: JSON.stringify(payload),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      onNotify('error', data.error || 'Save failed')
      return
    }
    onNotify('success', editingId ? 'Post updated' : 'Post created')
    setForm(empty)
    setEditingId(null)
    void load()
  }

  const edit = (p: Post) => {
    setEditingId(p.id)
    setForm({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      category: p.category,
      body: p.body,
      featuredImageUrl: p.featuredImageUrl || '',
      videoUrl: p.videoUrl || '',
      published: p.published,
    })
  }

  const remove = async (id: string) => {
    await fetch(`${API_URL}/api/blog/${id}`, { method: 'DELETE', headers: authHeaders(false) })
    void load()
  }

  const uploadCover = async (file: File) => {
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      headers: authHeaders(false),
      body: fd,
    })
    if (res.ok) {
      const data = await res.json()
      setForm((f) => ({ ...f, featuredImageUrl: data.url }))
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-slate-900">Blog</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
          <input
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            placeholder="Slug (optional)"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
          />
          <input
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <textarea
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            rows={2}
            placeholder="Excerpt"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          />
          <textarea
            className="w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-sm"
            rows={12}
            placeholder="Markdown body"
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
          />
          <input
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            placeholder="YouTube / Vimeo URL"
            value={form.videoUrl}
            onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
          />
          <label className="block text-sm text-slate-600">
            Cover image
            <input
              type="file"
              accept="image/*"
              className="mt-1 block w-full text-sm"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) void uploadCover(f)
              }}
            />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
            />
            Published
          </label>
          <button
            type="button"
            onClick={() => void save()}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white"
          >
            {editingId ? 'Update post' : 'Create post'}
          </button>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Preview</p>
          <h3 className="text-xl font-semibold text-slate-900">{form.title || 'Untitled'}</h3>
          <div className="prose prose-sm mt-3 max-w-none text-slate-700">
            <ReactMarkdown>{form.body || '_Nothing yet_'}</ReactMarkdown>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {posts.map((p) => (
          <div
            key={p.id}
            className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3"
          >
            <div>
              <p className="font-medium text-slate-900">{p.title}</p>
              <p className="text-xs text-slate-500">
                /blog/{p.slug} · {p.published ? 'published' : 'draft'}
              </p>
            </div>
            <div className="flex gap-2 text-sm">
              <button type="button" className="underline" onClick={() => edit(p)}>
                Edit
              </button>
              <button type="button" className="text-red-600 underline" onClick={() => void remove(p.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
