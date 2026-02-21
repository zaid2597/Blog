'use client';

import { useState } from 'react';

const INITIAL_STATE = {
  name: '',
  email: '',
  phone: '',
  message: ''
};

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_STATE);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: 'error', message: 'Name, email, and message are required.' });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim()
        })
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.error || 'Failed to send message.');
      }

      setStatus({ type: 'success', message: 'Message sent successfully.' });
      setForm(INITIAL_STATE);
    } catch (error) {
      setStatus({
        type: 'error',
        message: error?.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-xs uppercase tracking-[0.24em] text-black/60">
          Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange('name')}
            placeholder="Your full name"
            className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8f4ee] px-4 py-3 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-black/30"
            required
          />
        </label>
        <label className="text-xs uppercase tracking-[0.24em] text-black/60">
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange('email')}
            placeholder="you@email.com"
            className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8f4ee] px-4 py-3 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-black/30"
            required
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-xs uppercase tracking-[0.24em] text-black/60">
          Phone
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange('phone')}
            placeholder="+92 300 000 0000"
            className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8f4ee] px-4 py-3 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-black/30"
          />
        </label>
      </div>

      <label className="text-xs uppercase tracking-[0.24em] text-black/60">
        Tell us about your space
        <textarea
          name="message"
          rows="4"
          value={form.message}
          onChange={handleChange('message')}
          placeholder="Room size, style, timeline, and must-haves."
          className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8f4ee] px-4 py-3 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-black/30"
          required
        />
      </label>

      {status.message ? (
        <p
          className={`text-sm ${
            status.type === 'success' ? 'text-green-700' : 'text-red-600'
          }`}
        >
          {status.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-black px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-white transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? 'Sending...' : 'Send Request'}
      </button>
    </form>
  );
}
