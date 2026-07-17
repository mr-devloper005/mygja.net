'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

function BrandMark() {
  return (
    <span className="grid h-8 w-8 shrink-0 grid-cols-3 gap-0.5">
      {['#ff2e63', '#08d9d6', '#ffc21c', '#08d9d6', '#252a34', '#ff2e63'].map((color, index) => (
        <span
          key={`${color}-${index}`}
          className={`rounded-[2px] ${index === 2 || index === 3 ? 'translate-y-1' : ''} ${index === 1 || index === 4 ? 'translate-x-1' : ''}`}
          style={{ backgroundColor: color }}
        />
      ))}
    </span>
  )
}

export function EditableFooter() {
  const year = new Date().getFullYear()
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile')
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="mt-auto bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 pb-6 pt-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 rounded-[2.5rem] border border-white/10 bg-white/[0.03] px-6 py-8 shadow-[0_28px_90px_rgba(0,0,0,0.24)] backdrop-blur-xl lg:grid-cols-[1.1fr_0.8fr_0.8fr] lg:px-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-4">
              <BrandMark />
              <div>
                <span className="editable-display block text-[1.9rem] font-semibold leading-none tracking-[-0.08em]">{SITE_CONFIG.name}</span>
                <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                  {globalContent.footer?.tagline || SITE_CONFIG.tagline}
                </span>
              </div>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/68">
              {globalContent.footer?.description || SITE_CONFIG.description}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Explore</p>
            <div className="mt-4 grid gap-2">
              {taskLinks.map((task) => (
                <Link key={task.key} href={task.route} className="inline-flex items-center gap-2 text-sm font-medium text-white/72 transition hover:text-white">
                  {task.label} <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Site</p>
            <div className="mt-4 grid gap-2 text-sm font-medium text-white/72">
              <Link href="/about" className="transition hover:text-white">About</Link>
              <Link href="/contact" className="transition hover:text-white">Contact</Link>
              {session ? (
                <>
                  <Link href="/create" className="transition hover:text-white">Create</Link>
                  <button type="button" onClick={logout} className="text-left transition hover:text-white">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="transition hover:text-white">Login</Link>
                  <Link href="/signup" className="transition hover:text-white">Sign up</Link>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 text-xs text-white/72 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/contact" className="transition hover:text-white">Privacy Rights & Requests</Link>
            <Link href="/about" className="transition hover:text-white">Legal</Link>
            <Link href="/image" className="transition hover:text-white">Gallery Policy</Link>
            <Link href="/profile" className="transition hover:text-white">Vendor Code</Link>
            <Link href="/listing" className="transition hover:text-white">Suppliers</Link>
          </div>
          <p className="font-medium">© {year} {SITE_CONFIG.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
