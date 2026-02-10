'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

const DEFAULT_AUTHORS = [
  { id: 'ayesha-ali', name: 'Ayesha Ali', image: '' },
  { id: 'kylie-jones', name: 'Kylie Jones', image: '' },
  { id: 'diana-lewis', name: 'Diana Lewis', image: '' },
  { id: 'sandra-jones', name: 'Sandra Jones', image: '' },
  { id: 'umar-aziz', name: 'Umar Aziz', image: '' }
];

const AUTHORS_STORAGE_KEY = 'adminAuthors';
const FALLBACK_AVATAR = '/images/post-fallback.svg';

const toSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export default function AuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');
  const [form, setForm] = useState({ name: '', imageUrl: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(AUTHORS_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAuthors(parsed);
          return;
        }
      } catch (error) {
        // ignore and set default below
      }
    }
    setAuthors(DEFAULT_AUTHORS);
    localStorage.setItem(AUTHORS_STORAGE_KEY, JSON.stringify(DEFAULT_AUTHORS));
  }, []);

  useEffect(() => {
    if (!imageFile) {
      setImagePreview('');
      return undefined;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const previewImage = imagePreview || form.imageUrl || '';

  const persistAuthors = (updated) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(AUTHORS_STORAGE_KEY, JSON.stringify(updated));
  };

  const handleAddAuthor = async (event) => {
    event.preventDefault();
    setStatusMessage('');
    if (!form.name.trim()) {
      setStatusMessage('Author name is required.');
      return;
    }

    const imageFromFile = imageFile
      ? await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => resolve('');
          reader.readAsDataURL(imageFile);
        })
      : '';

    const newAuthor = {
      id: `${toSlug(form.name)}-${Date.now()}`,
      name: form.name.trim(),
      image: imageFromFile || form.imageUrl || ''
    };

    const updated = [newAuthor, ...authors];
    setAuthors(updated);
    persistAuthors(updated);
    setForm({ name: '', imageUrl: '' });
    setImageFile(null);
    setStatusMessage('Author added.');
  };

  const handleRemoveAuthor = (authorId) => {
    const updated = authors.filter((author) => author.id !== authorId);
    setAuthors(updated);
    persistAuthors(updated);
    setStatusMessage('Author removed.');
  };

  const stats = useMemo(
    () => ({ count: authors.length }),
    [authors.length]
  );

  return (
    <div className="min-h-screen bg-[#f6f4ef] text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
              Admin Studio
            </p>
            <h1 className="text-2xl font-semibold text-slate-900">
              Manage Authors
            </h1>
          </div>
          <Link
            href="/admin"
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-6 px-6 py-10 lg:grid-cols-5">
        <section className="lg:col-span-2">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Add Author</h2>
            <p className="mt-1 text-sm text-slate-600">
              Author name aur image add kar ke list update karein.
            </p>

            <form onSubmit={handleAddAuthor} className="mt-4 grid gap-4">
              <label className="text-sm font-medium text-slate-700">
                Author Name
                <input
                  value={form.name}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, name: event.target.value }))
                  }
                  placeholder="Author name"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
                />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Image URL
                <input
                  value={form.imageUrl}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, imageUrl: event.target.value }))
                  }
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

              {previewImage ? (
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#faf8f4] p-3">
                  <div className="h-12 w-12 overflow-hidden rounded-full bg-slate-200">
                    <img src={previewImage} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                  <p className="text-xs text-slate-500">Image preview</p>
                </div>
              ) : null}

              {statusMessage ? (
                <p className="text-sm font-semibold text-emerald-700">{statusMessage}</p>
              ) : null}
              <button
                type="submit"
                className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Add Author
              </button>
            </form>
          </div>
        </section>

        <section className="lg:col-span-3">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Author List</h2>
                <p className="text-sm text-slate-600">
                  Total authors: {stats.count}
                </p>
              </div>
            </div>

            {authors.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-[#faf8f4] p-6 text-center text-sm text-slate-500">
                Abhi koi author add nahi hua.
              </div>
            ) : (
              <div className="mt-6 grid gap-4">
                {authors.map((author) => (
                  <div
                    key={author.id}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-full bg-slate-200">
                        <img
                          src={author.image || FALLBACK_AVATAR}
                          alt={author.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{author.name}</p>
                        <p className="text-xs text-slate-500">{author.id}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveAuthor(author.id)}
                      className="rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 transition hover:border-red-400 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
