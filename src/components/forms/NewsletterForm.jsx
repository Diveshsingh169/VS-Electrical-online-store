'use client';

import { useState } from 'react';
import { cx } from '@/lib/utils';
import { Icon } from '@/components/ui/icons';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [msg, setMsg] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMsg(data.message || 'Subscribed! Welcome aboard.');
        setEmail('');
      } else {
        setStatus('error');
        setMsg(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMsg('Network error. Please try again.');
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Icon name="mail" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-400" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full rounded-full border border-white/15 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-accent-400 focus:ring-4 focus:ring-accent-400/20"
          />
        </div>
        <button type="submit" disabled={status === 'loading'} className="btn btn-accent shrink-0">
          {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
          {status !== 'loading' && <Icon name="arrowRight" className="h-4 w-4" />}
        </button>
      </form>
      {status !== 'idle' && status !== 'loading' && (
        <p
          className={cx(
            'mt-2 flex items-center gap-1.5 text-sm',
            status === 'success' ? 'text-emerald-400' : 'text-red-400'
          )}
        >
          {status === 'success' && <Icon name="check" className="h-4 w-4" />}
          {msg}
        </p>
      )}
    </div>
  );
}
