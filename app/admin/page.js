'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { allPosts } from '../data/posts';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';
const AUTH_STORAGE_KEY = 'adminAuth';
const AUTH_TTL_MS = 10 * 60 * 1000;
const HIDDEN_SITE_STORAGE_KEY = 'hiddenSiteCards';

const DEFAULT_AUTHORS = [
  { id: 'ayesha-ali', name: 'Ayesha Ali', image: '' },
  { id: 'kylie-jones', name: 'Kylie Jones', image: '' },
  { id: 'diana-lewis', name: 'Diana Lewis', image: '' },
  { id: 'sandra-jones', name: 'Sandra Jones', image: '' },
  { id: 'umar-aziz', name: 'Umar Aziz', image: '' }
];
const AUTHORS_STORAGE_KEY = 'adminAuthors';

const CATEGORIES = [
  'Application',
  'Design',
  'Technology',
  'News',
  'Culture'
];

const STATUS_OPTIONS = ['Draft', 'Review', 'Published'];
const SECTION_OPTIONS = [
  { value: 'latest', label: 'Latest Posts' },
  { value: 'trending', label: 'Trending Posts' },
  { value: 'editors-choice', label: "Editor's Choice" },
  { value: 'featured', label: 'Featured' }
];

const LAYOUTS = [
  { id: 'hero', label: 'Hero Card' },
  { id: 'standard', label: 'Standard Card' }
];

const FALLBACK_IMAGE = '/images/post-fallback.svg';

const SECONDARY_CARDS = [
  {
    id: 'sec-1',
    title: 'New Digital NFT Digest 2022',
    author: 'Kylie Jones',
    category: 'Application',
    date: '25 Mar 2020',
    comments: '0'
  },
  {
    id: 'sec-2',
    title: 'Must-haves in Your NFT Collection',
    author: 'Diana Lewis',
    category: 'Application',
    date: '28 Mar 2020',
    comments: '0'
  }
];

const VIEW_STORAGE_KEY = 'adminViews';
const VIEW_LOOKBACK_MS = 7 * 24 * 60 * 60 * 1000;

const formatCount = (value) => String(value).padStart(2, '0');

const formatViews = (value) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  return String(value);
};

const getToday = () => {
  const now = new Date();
  return now.toISOString().slice(0, 10);
};

const toSlug = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const toInputDate = (value) => {
  if (!value) return getToday();
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return getToday();
  return new Date(parsed).toISOString().slice(0, 10);
};

export default function AdminPage() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [adminPosts, setAdminPosts] = useState([]);
  const [authors, setAuthors] = useState(DEFAULT_AUTHORS);
  const [hiddenSiteCards, setHiddenSiteCards] = useState([]);
  const [authReady, setAuthReady] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [loginForm, setLoginForm] = useState({ user: '', pass: '' });
  const [loginError, setLoginError] = useState('');
  const [viewsLast7Days, setViewsLast7Days] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [editingSlug, setEditingSlug] = useState(null);
  const [form, setForm] = useState({
    title: '',
    imageUrl: '',
    author: DEFAULT_AUTHORS[0].name,
    category: CATEGORIES[0],
    tags: 'Design, UI, Feature',
    description: '',
    excerpt: '',
    publishDate: getToday(),
    readTime: '5',
    comments: '0',
    status: STATUS_OPTIONS[0],
    section: SECTION_OPTIONS[0].value,
    layout: LAYOUTS[0].id,
    featured: true
  });

  const calculateViews = () => {
    if (typeof window === 'undefined') return;
    const viewRaw = localStorage.getItem(VIEW_STORAGE_KEY);
    if (viewRaw) {
      try {
        const entries = JSON.parse(viewRaw);
        const cutoff = Date.now() - VIEW_LOOKBACK_MS;
        const count = entries.filter((entry) => entry?.at >= cutoff).length;
        setViewsLast7Days(count);
      } catch (error) {
        setViewsLast7Days(0);
      }
    } else {
      setViewsLast7Days(0);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const authRaw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (authRaw) {
      try {
        const parsed = JSON.parse(authRaw);
        const expiresAt = Number(parsed?.expiresAt || 0);
        if (parsed?.authed && expiresAt > Date.now()) {
          setIsAuthed(true);
        } else {
          localStorage.removeItem(AUTH_STORAGE_KEY);
          setIsAuthed(false);
        }
      } catch (error) {
        setIsAuthed(false);
      }
    }
    setAuthReady(true);

    const stored = localStorage.getItem('adminPosts');
    if (stored) {
      setAdminPosts(JSON.parse(stored));
    }
    const hiddenStored = localStorage.getItem(HIDDEN_SITE_STORAGE_KEY);
    if (hiddenStored) {
      try {
        const parsed = JSON.parse(hiddenStored);
        if (Array.isArray(parsed)) {
          setHiddenSiteCards(parsed);
        }
      } catch (error) {
        setHiddenSiteCards([]);
      }
    }
    const storedAuthors = localStorage.getItem(AUTHORS_STORAGE_KEY);
    if (storedAuthors) {
      try {
        const parsed = JSON.parse(storedAuthors);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAuthors(parsed);
        }
      } catch (error) {
        setAuthors(DEFAULT_AUTHORS);
      }
    } else {
      localStorage.setItem(AUTHORS_STORAGE_KEY, JSON.stringify(DEFAULT_AUTHORS));
    }
    calculateViews();

    const handleFocus = () => calculateViews();
    window.addEventListener('focus', handleFocus);
    const handleStorage = (event) => {
      if (event.key === AUTHORS_STORAGE_KEY && event.newValue) {
        try {
          const parsed = JSON.parse(event.newValue);
          if (Array.isArray(parsed)) {
            setAuthors(parsed);
          }
        } catch (error) {
          setAuthors(DEFAULT_AUTHORS);
        }
      }
      if (event.key === HIDDEN_SITE_STORAGE_KEY && event.newValue) {
        try {
          const parsed = JSON.parse(event.newValue);
          if (Array.isArray(parsed)) {
            setHiddenSiteCards(parsed);
          }
        } catch (error) {
          setHiddenSiteCards([]);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  useEffect(() => {
    if (!isAuthed || typeof window === 'undefined') return;
    const authRaw = localStorage.getItem(AUTH_STORAGE_KEY);
    const parsed = authRaw ? JSON.parse(authRaw) : null;
    const expiresAt = Number(parsed?.expiresAt || 0);
    if (!expiresAt) return;

    const remaining = expiresAt - Date.now();
    if (remaining <= 0) {
      handleLogout();
      return;
    }

    const timer = setTimeout(() => {
      handleLogout();
    }, remaining);

    return () => clearTimeout(timer);
  }, [isAuthed]);

  useEffect(() => {
    if (!authors.length) return;
    if (!form.author || !authors.some((author) => author.name === form.author)) {
      setForm((prev) => ({ ...prev, author: authors[0].name }));
    }
  }, [authors, form.author]);

  useEffect(() => {
    if (!imageFile) {
      setImagePreview('');
      return undefined;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const tags = useMemo(
    () =>
      form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    [form.tags]
  );

  const slug = useMemo(() => toSlug(form.title || 'untitled-card'), [form.title]);

  const websiteCards = useMemo(() => {
    const merged = new Map();

    allPosts.forEach((post) => {
      if (hiddenSiteCards.includes(post.slug)) return;
      merged.set(post.slug, { ...post, status: 'Published', source: 'site' });
    });

    adminPosts.forEach((post) => {
      const normalized = {
        ...post,
        title: post.title || 'Untitled Card',
        category: post.category || 'General',
        author: post.author || 'Editorial Team',
        date: post.date || '01 Jan 2020',
        image: post.image || FALLBACK_IMAGE,
        slug: post.slug || toSlug(post.title || 'untitled-card'),
        source: 'local',
        status: post.status || 'Draft'
      };
      merged.set(normalized.slug, normalized);
    });

    return Array.from(merged.values());
  }, [adminPosts, hiddenSiteCards]);

  const summaryCards = useMemo(() => {
    const drafts = adminPosts.filter((post) => post.status === 'Draft').length;
    const inReview = adminPosts.filter((post) => post.status === 'Review').length;
    const published = websiteCards.filter((post) => post.status === 'Published').length;

    return [
      { label: 'Drafts', value: formatCount(drafts) },
      { label: 'In Review', value: formatCount(inReview) },
      { label: 'Published', value: String(published) },
      { label: 'Views (7d)', value: formatViews(viewsLast7Days) }
    ];
  }, [adminPosts, websiteCards, viewsLast7Days]);

  const previewImage = imagePreview || form.imageUrl || FALLBACK_IMAGE;
  const previewTitle = form.title || 'This Is What Design Has Come To';
  const previewAuthor = form.author || 'Sandra Jones';
  const previewDate = form.publishDate
    ? new Date(form.publishDate).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    : '20 Jan 2020';

  const handleChange = (field) => (event) => {
    const value =
      event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setLoginError('');
    if (loginForm.user === ADMIN_USER && loginForm.pass === ADMIN_PASS) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify({ authed: true, at: Date.now(), expiresAt: Date.now() + AUTH_TTL_MS })
        );
      }
      setIsAuthed(true);
      setLoginForm({ user: '', pass: '' });
      return;
    }
    setLoginError('Invalid username or password.');
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    setIsAuthed(false);
  };

  const persistPosts = (posts) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('adminPosts', JSON.stringify(posts));
  };

  const upsertPost = (post) => {
    if (editingId) {
      return adminPosts.map((item) => (item.id === editingId ? post : item));
    }
    if (editingSlug) {
      const exists = adminPosts.some((item) => item.slug === editingSlug);
      if (exists) {
        return adminPosts.map((item) => (item.slug === editingSlug ? post : item));
      }
    }
    return [post, ...adminPosts];
  };

  const buildPostPayload = async (statusOverride) => {
    setStatusMessage('');
    const selectedAuthor = authors.find((author) => author.name === form.author);
    const imageFromFile = imageFile
      ? await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => resolve('');
          reader.readAsDataURL(imageFile);
        })
      : '';

    const formattedDate = form.publishDate
      ? new Date(form.publishDate).toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })
      : new Date().toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
      });

    return {
      id: editingId || Date.now(),
      title: form.title || 'Untitled Card',
      category: form.category || 'General',
      author: form.author || 'Editorial Team',
      authorImage: selectedAuthor?.image || '',
      date: formattedDate,
      comments: Number(form.comments || 0),
      image: imageFromFile || form.imageUrl || FALLBACK_IMAGE,
      slug: editingSlug || slug,
      tags,
      description: form.description || '',
      excerpt: form.excerpt || '',
      section: form.section || SECTION_OPTIONS[0].value,
      layout: form.layout,
      featured: form.featured,
      status: statusOverride || form.status,
      readTime: form.readTime || '5'
    };
  };

  const handlePublish = async () => {
    const newPost = await buildPostPayload('Published');

    if (typeof window !== 'undefined') {
      const updated = upsertPost(newPost);
      setAdminPosts(updated);
      persistPosts(updated);
      setStatusMessage(
        editingId ? 'Card updated and published.' : 'Card published and saved locally.'
      );
      setEditingId(null);
      setEditingSlug(null);
    } else {
      setStatusMessage('Publish failed. Please try again in the browser.');
    }
  };

  const handleSaveDraft = async () => {
    const newPost = await buildPostPayload('Draft');

    if (typeof window !== 'undefined') {
      const updated = upsertPost(newPost);
      setAdminPosts(updated);
      persistPosts(updated);
      setStatusMessage(editingId ? 'Draft updated.' : 'Draft saved.');
      setEditingId(null);
      setEditingSlug(null);
    } else {
      setStatusMessage('Draft save failed. Please try again in the browser.');
    }
  };

  const handleEditDraft = (post) => {
    setEditingId(post.id);
    setEditingSlug(post.slug || null);
    setImageFile(null);
    setImagePreview('');
    setForm({
      title: post.title || '',
      imageUrl: post.image || '',
      author: post.author || (authors[0] ? authors[0].name : ''),
      category: post.category || CATEGORIES[0],
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags || '',
      description: post.description || '',
      excerpt: post.excerpt || '',
      publishDate: toInputDate(post.date),
      readTime: post.readTime || '5',
      comments: String(post.comments ?? '0'),
      status: post.status || 'Draft',
      section: post.section || SECTION_OPTIONS[0].value,
      layout: post.layout || LAYOUTS[0].id,
      featured: Boolean(post.featured)
    });
    setStatusMessage('Draft loaded for editing.');
    if (typeof document !== 'undefined') {
      document.getElementById('upload-card')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEditCard = (post) => {
    setEditingId(post.source === 'local' ? post.id : null);
    setEditingSlug(post.slug || null);
    setImageFile(null);
    setImagePreview('');
    setForm({
      title: post.title || '',
      imageUrl: post.image || '',
      author: post.author || (authors[0] ? authors[0].name : ''),
      category: post.category || CATEGORIES[0],
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags || '',
      description: post.description || '',
      excerpt: post.excerpt || '',
      publishDate: toInputDate(post.date),
      readTime: post.readTime || '5',
      comments: String(post.comments ?? '0'),
      status: post.status || 'Published',
      section: post.section || SECTION_OPTIONS[0].value,
      layout: post.layout || LAYOUTS[0].id,
      featured: Boolean(post.featured)
    });
    setStatusMessage('Card loaded for editing.');
    if (typeof document !== 'undefined') {
      document.getElementById('upload-card')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePublishDraft = (postId) => {
    const updated = adminPosts.map((post) =>
      post.id === postId
        ? {
            ...post,
            status: 'Published',
            date: new Date().toLocaleDateString('en-US', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            })
          }
        : post
    );
    setAdminPosts(updated);
    persistPosts(updated);
    setStatusMessage('Draft published.');
  };

  const handleDelete = (postId) => {
    const updated = adminPosts.filter((post) => post.id !== postId);
    setAdminPosts(updated);
    persistPosts(updated);
    setStatusMessage('Card deleted.');
  };

  const handleDeleteCard = (post) => {
    if (post.source === 'site') {
      const updated = [...new Set([...hiddenSiteCards, post.slug])];
      setHiddenSiteCards(updated);
      if (typeof window !== 'undefined') {
        localStorage.setItem(HIDDEN_SITE_STORAGE_KEY, JSON.stringify(updated));
      }
      setStatusMessage('Website card hidden.');
      return;
    }
    handleDelete(post.id);
  };

  const handleClearAll = () => {
    setAdminPosts([]);
    persistPosts([]);
    setStatusMessage('All cards removed.');
  };

  const draftCards = useMemo(
    () => adminPosts.filter((post) => post.status === 'Draft'),
    [adminPosts]
  );

  return (
    <div className="min-h-screen bg-[#f6f4ef] text-slate-900">
      {!isAuthed && authReady ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 px-6">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                Admin Login
              </p>
              <h2 className="text-2xl font-semibold text-slate-900">
                Secure Access
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Admin panel access ke liye login karein.
              </p>
            </div>

            <form onSubmit={handleLogin} className="grid gap-4">
              <label className="text-sm font-medium text-slate-700">
                Username
                <input
                  value={loginForm.user}
                  onChange={(event) =>
                    setLoginForm((prev) => ({ ...prev, user: event.target.value }))
                  }
                  placeholder="admin"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
                />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Password
                <input
                  type="password"
                  value={loginForm.pass}
                  onChange={(event) =>
                    setLoginForm((prev) => ({ ...prev, pass: event.target.value }))
                  }
                  placeholder="********"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
                />
              </label>
              {loginError ? (
                <p className="text-sm font-semibold text-red-600">{loginError}</p>
              ) : null}
              <button
                type="submit"
                className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Login
              </button>
              <p className="text-xs text-slate-400">
                Default: admin / admin123
              </p>
            </form>
          </div>
        </div>
      ) : null}
      <div
        className={`relative overflow-hidden transition ${
          !isAuthed && authReady ? 'blur-sm pointer-events-none' : ''
        }`}
      >
        <div className="absolute -top-32 right-0 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle_at_top,rgba(253,186,116,0.45),transparent_70%)] blur-2xl" />
        <div className="absolute bottom-0 left-0 h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.35),transparent_70%)] blur-2xl" />

        <header className="relative border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Admin Studio</p>
              <h1 className="text-2xl font-semibold text-slate-900">Blog Card Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              {isAuthed ? (
                <button
                  onClick={handleLogout}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
                >
                  Logout
                </button>
              ) : null}
              <a
                href="#all-cards"
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
              >
                View All Cards
              </a>
              <Link
                href="/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
              >
                Preview Site
              </Link>
              <button className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800">
                Publish All
              </button>
            </div>
          </div>
        </header>

        <main className="relative mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-12">
          <section className="lg:col-span-4">
            <div className="grid gap-4">
              {summaryCards.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm"
                >
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
              <p className="mt-1 text-sm text-slate-600">
                Manage your content workflow and keep new cards moving.
              </p>
              <div className="mt-4 grid gap-2">
                <a
                  href="#draft-cards"
                  className="rounded-xl bg-[#f2efe8] px-4 py-3 text-left text-sm font-medium text-slate-800 transition hover:bg-[#e9e4da]"
                >
                  Review pending drafts
                </a>
                <Link
                  href="/admin/authors"
                  className="rounded-xl bg-[#f2efe8] px-4 py-3 text-left text-sm font-medium text-slate-800 transition hover:bg-[#e9e4da]"
                >
                  Manage authors
                </Link>
              </div>
            </div>
          </section>

          <section className="lg:col-span-8">
            <div
              id="upload-card"
              className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Upload New Blog Card</h2>
                  <p className="text-sm text-slate-600">
                    Title, image, author, tags, description sab yahan se set karo.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleSaveDraft}
                    className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
                  >
                    {editingId ? 'Update Draft' : 'Save Draft'}
                  </button>
                  <button
                    onClick={handlePublish}
                    className="rounded-full bg-[#0f172a] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#1e293b]"
                  >
                    {editingId ? 'Update & Publish' : 'Publish Card'}
                  </button>
                </div>
              </div>
              {statusMessage ? (
                <p className="mt-3 text-sm font-medium text-emerald-700">
                  {statusMessage}
                </p>
              ) : null}

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div className="grid gap-4">
                  <label className="text-sm font-medium text-slate-700">
                    Title
                    <input
                      value={form.title}
                      onChange={handleChange('title')}
                      placeholder="Card ka title likhein"
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
                    />
                  </label>

                  <label className="text-sm font-medium text-slate-700">
                    Image URL
                    <input
                      value={form.imageUrl}
                      onChange={handleChange('imageUrl')}
                      placeholder="https://..."
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
                    />
                  </label>

                  <label className="text-sm font-medium text-slate-700">
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => setImageFile(event.target.files?.[0] || null)}
                      className="mt-2 w-full rounded-xl border border-dashed border-slate-300 bg-[#f8f6f1] px-4 py-3 text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white hover:border-slate-900"
                    />
                  </label>

                  <label className="text-sm font-medium text-slate-700">
                    Author
                    <select
                      value={form.author}
                      onChange={handleChange('author')}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
                    >
                      {authors.length ? (
                        authors.map((author) => (
                          <option key={author.id} value={author.name}>
                            {author.name}
                          </option>
                        ))
                      ) : (
                        <option value="">No authors yet</option>
                      )}
                    </select>
                  </label>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="text-sm font-medium text-slate-700">
                      Category
                      <select
                        value={form.category}
                        onChange={handleChange('category')}
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
                      >
                        {CATEGORIES.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="text-sm font-medium text-slate-700">
                      Section
                      <select
                        value={form.section}
                        onChange={handleChange('section')}
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
                      >
                        {SECTION_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>

                <div className="grid gap-4">
                  <label className="text-sm font-medium text-slate-700">
                    Tags (comma separated)
                    <input
                      value={form.tags}
                      onChange={handleChange('tags')}
                      placeholder="Design, UI, Trend"
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
                    />
                  </label>

                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#f2efe8] px-3 py-1 text-xs font-semibold text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <label className="text-sm font-medium text-slate-700">
                    Description
                    <textarea
                      rows={4}
                      value={form.description}
                      onChange={handleChange('description')}
                      placeholder="Card ki short description likhein"
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
                    />
                  </label>

                  <label className="text-sm font-medium text-slate-700">
                    Excerpt
                    <textarea
                      rows={3}
                      value={form.excerpt}
                      onChange={handleChange('excerpt')}
                      placeholder="Short excerpt for cards"
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
                    />
                  </label>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <label className="text-sm font-medium text-slate-700">
                      Publish Date
                      <input
                        type="date"
                        value={form.publishDate}
                        onChange={handleChange('publishDate')}
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
                      />
                    </label>

                    <label className="text-sm font-medium text-slate-700">
                      Read Time (min)
                      <input
                        type="number"
                        min="1"
                        value={form.readTime}
                        onChange={handleChange('readTime')}
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
                      />
                    </label>

                    <label className="text-sm font-medium text-slate-700">
                      Comments
                      <input
                        type="number"
                        min="0"
                        value={form.comments}
                        onChange={handleChange('comments')}
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
                      />
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-[#faf8f4] p-4">
                      <p className="text-sm font-medium text-slate-700">Card Layout</p>
                      <div className="mt-3 grid gap-2">
                        {LAYOUTS.map((layout) => (
                          <label
                            key={layout.id}
                            className="flex items-center gap-2 text-sm text-slate-600"
                          >
                            <input
                              type="radio"
                              name="layout"
                              value={layout.id}
                              checked={form.layout === layout.id}
                              onChange={handleChange('layout')}
                            />
                            {layout.label}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-[#faf8f4] p-4">
                      <p className="text-sm font-medium text-slate-700">Visibility</p>
                      <label className="mt-3 flex items-center justify-between text-sm text-slate-600">
                        Featured card
                        <input
                          type="checkbox"
                          checked={form.featured}
                          onChange={handleChange('featured')}
                          className="h-4 w-4"
                        />
                      </label>
                      <div className="mt-3 text-xs text-slate-500">
                        Slug: <span className="font-semibold text-slate-700">{slug}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Live Card Preview</h3>
                  <p className="text-sm text-slate-600">
                    Apki card yahan live preview me show hogi.
                  </p>
                </div>
                <span className="rounded-full bg-[#f2efe8] px-3 py-1 text-xs font-semibold text-slate-600">
                  {form.layout === 'hero' ? 'Hero layout' : 'Standard layout'}
                </span>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div className="group relative h-[320px] overflow-hidden rounded-2xl bg-slate-900">
                  <img
                    src={previewImage}
                    alt={previewTitle}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                      {form.category}
                    </span>
                    <h4 className="mt-3 text-2xl font-semibold leading-tight">
                      {previewTitle}
                    </h4>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/80">
                      <span>By {previewAuthor}</span>
                      <span>{previewDate}</span>
                      <span>{form.comments || 0} Comments</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {SECONDARY_CARDS.map((card) => (
                    <div
                      key={card.id}
                      className="relative h-[150px] overflow-hidden rounded-2xl bg-slate-900"
                    >
                      <img
                        src={FALLBACK_IMAGE}
                        alt={card.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <span className="inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">
                          {card.category}
                        </span>
                        <h5 className="mt-2 text-sm font-semibold leading-tight">
                          {card.title}
                        </h5>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-white/80">
                          <span>By {card.author}</span>
                          <span>{card.date}</span>
                          <span>{card.comments} Comments</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              id="draft-cards"
              className="mt-8 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Draft Cards</h3>
                  <p className="text-sm text-slate-600">
                    Pending drafts ki list yahan show hoti hai.
                  </p>
                </div>
                <span className="rounded-full bg-[#f2efe8] px-3 py-1 text-xs font-semibold text-slate-600">
                  {draftCards.length} drafts
                </span>
              </div>

              {draftCards.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-[#faf8f4] p-6 text-center text-sm text-slate-500">
                  Abhi koi draft card nahi hai.
                </div>
              ) : (
                <div className="mt-6 grid gap-4">
                  {draftCards.map((post) => (
                    <div
                      key={post.id}
                      className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm"
                    >
                      <div className="h-20 w-24 overflow-hidden rounded-xl bg-slate-900">
                        <img
                          src={post.image || FALLBACK_IMAGE}
                          alt={post.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-[200px] flex-1">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                          {post.category || 'General'}
                        </p>
                        <h4 className="text-base font-semibold text-slate-900">
                          {post.title || 'Untitled Card'}
                        </h4>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span>By {post.author || 'Editorial Team'}</span>
                          <span>{post.date || '01 Jan 2020'}</span>
                          <span>Draft</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditDraft(post)}
                          className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handlePublishDraft(post.id)}
                          className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                        >
                          Publish
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 transition hover:border-red-400 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div
              id="all-cards"
              className="mt-8 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">All Cards</h3>
                  <p className="text-sm text-slate-600">
                    Website aur local cards yahan show hoti hain. Local cards delete ho sakti hain.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#f2efe8] px-3 py-1 text-xs font-semibold text-slate-600">
                    {websiteCards.length} total
                  </span>
                  <span className="rounded-full bg-[#f2efe8] px-3 py-1 text-xs font-semibold text-slate-600">
                    {adminPosts.length} local
                  </span>
                  {adminPosts.length > 0 ? (
                    <button
                      onClick={handleClearAll}
                      className="rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 transition hover:border-red-400 hover:text-red-700"
                    >
                      Delete All
                    </button>
                  ) : null}
                </div>
              </div>

              {websiteCards.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-[#faf8f4] p-6 text-center text-sm text-slate-500">
                  Abhi koi card publish nahi hua. Upar se card publish karein.
                </div>
              ) : (
                <div className="mt-6 grid gap-4">
                  {websiteCards.map((post) => (
                    <div
                      key={post.id}
                      className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm"
                    >
                      <div className="h-20 w-24 overflow-hidden rounded-xl bg-slate-900">
                        <img
                          src={post.image || FALLBACK_IMAGE}
                          alt={post.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-[200px] flex-1">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                          {post.category || 'General'}
                        </p>
                        <h4 className="text-base font-semibold text-slate-900">
                          {post.title || 'Untitled Card'}
                        </h4>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span>By {post.author || 'Editorial Team'}</span>
                          <span>{post.date || '01 Jan 2020'}</span>
                          <span>{post.status || 'Draft'}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#f2efe8] px-3 py-1 text-xs font-semibold text-slate-600">
                          {post.source === 'site' ? 'Website' : 'Local'}
                        </span>
                        <span className="rounded-full bg-[#f2efe8] px-3 py-1 text-xs font-semibold text-slate-600">
                          {post.layout === 'hero' ? 'Hero' : 'Standard'}
                        </span>
                        <button
                          onClick={() => handleEditCard(post)}
                          className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCard(post)}
                          className="rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 transition hover:border-red-400 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
