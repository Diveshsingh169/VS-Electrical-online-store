'use client';

import { useState } from 'react';
import { cx } from '@/lib/utils';
import { Icon } from '@/components/ui/icons';

export default function EnquiryForm({ productId = null, productName = '', className }) {
  const initial = {
    name: '',
    email: '',
    phone: '',
    subject: productName ? `Enquiry about ${productName}` : '',
    message: productName ? `Hi, I'm interested in ${productName}. Please share pricing and availability.` : '',
  };
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [msg, setMsg] = useState('');

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, product_id: productId }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMsg(data.message || "Thank you! Our team will get back to you within one business day.");
      } else {
        setStatus('error');
        setMsg(data.error || 'Please check your details and try again.');
      }
    } catch {
      setStatus('error');
      setMsg('Network error. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className={cx('rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center', className)}>
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500 text-white">
          <Icon name="check" className="h-8 w-8" strokeWidth={2.4} />
        </div>
        <h3 className="mt-4 text-xl font-bold text-brand-900">Enquiry sent!</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-brand-500">{msg}</p>
        <button
          onClick={() => {
            setForm(initial);
            setStatus('idle');
          }}
          className="btn btn-outline mt-6"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cx('space-y-4', className)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="eq-name">Full name *</label>
          <input id="eq-name" required value={form.name} onChange={update('name')} className="field" placeholder="e.g. Rahul Sharma" />
        </div>
        <div>
          <label className="label" htmlFor="eq-phone">Phone *</label>
          <input id="eq-phone" required value={form.phone} onChange={update('phone')} className="field" placeholder="+91 98765 43210" />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="eq-email">Email *</label>
        <input id="eq-email" type="email" required value={form.email} onChange={update('email')} className="field" placeholder="you@example.com" />
      </div>
      <div>
        <label className="label" htmlFor="eq-subject">Subject</label>
        <input id="eq-subject" value={form.subject} onChange={update('subject')} className="field" placeholder="What is your enquiry about?" />
      </div>
      <div>
        <label className="label" htmlFor="eq-message">Message *</label>
        <textarea id="eq-message" required rows={4} value={form.message} onChange={update('message')} className="field resize-none" placeholder="Tell us what you need — quantities, models, timelines…" />
      </div>

      {status === 'error' && (
        <p className="flex items-center gap-1.5 text-sm text-red-600">
          <Icon name="close" className="h-4 w-4" /> {msg}
        </p>
      )}

      <button type="submit" disabled={status === 'loading'} className="btn btn-accent w-full sm:w-auto">
        {status === 'loading' ? 'Sending…' : 'Submit Enquiry'}
        {status !== 'loading' && <Icon name="arrowRight" className="h-4 w-4" />}
      </button>
      <p className="text-xs text-brand-400">
        By submitting, you agree to be contacted by VS Electricals regarding your enquiry.
      </p>
    </form>
  );
}
