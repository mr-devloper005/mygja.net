'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogIn, Menu, PlusCircle, Search, UserPlus, X } from 'lucide-react'
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

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile').slice(0, 5).map((task) => ({ label: task.label, href: task.route })),
    []
  )

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[var(--editable-container)]">
        <div className="editable-glass-panel flex min-h-[78px] items-center justify-between gap-4 rounded-[2rem] px-5 py-4 text-[var(--editable-nav-text)] sm:px-6">
          <Link href="/" className="group flex min-w-0 items-center gap-4">
            <BrandMark />
            <div className="min-w-0">
              <span className="editable-display block truncate text-[1.9rem] font-semibold leading-none tracking-[-0.08em]">
                {SITE_CONFIG.name}
              </span>
              <span className="mt-1 block truncate text-[11px] font-semibold uppercase tracking-[0.24em] text-white/65">
                {globalContent.nav?.tagline || SITE_CONFIG.tagline}
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-2 xl:flex">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? 'bg-white text-[#1d222c]'
                      : 'text-white/72 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <form action="/search" className="hidden items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-white/70 lg:flex">
              <Search className="h-4 w-4" />
              <input
                name="q"
                type="search"
                placeholder="Search"
                className="w-28 bg-transparent text-sm outline-none placeholder:text-white/40"
              />
            </form>

            {session ? (
              <>
                <Link href="/create" className="hidden rounded-full bg-[var(--editable-cta-bg)] px-5 py-3 text-sm font-bold text-[var(--editable-cta-text)] shadow-[0_18px_40px_rgba(255,194,28,0.18)] transition hover:-translate-y-0.5 hover:brightness-95 sm:inline-flex sm:items-center sm:gap-2">
                  <PlusCircle className="h-4 w-4" /> Create
                </Link>
                <button type="button" onClick={logout} className="hidden rounded-full border border-white/12 px-4 py-3 text-sm font-semibold text-white/72 transition hover:border-white/24 hover:text-white lg:inline-flex">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hidden rounded-full border border-white/12 px-4 py-3 text-sm font-semibold text-white/72 transition hover:border-white/24 hover:text-white sm:inline-flex sm:items-center sm:gap-2">
                  <LogIn className="h-4 w-4" /> Login
                </Link>
                <Link href="/signup" className="hidden rounded-full bg-white px-5 py-3 text-sm font-bold text-[#15552b] transition hover:-translate-y-0.5 sm:inline-flex sm:items-center sm:gap-2">
                  <UserPlus className="h-4 w-4" /> Join
                </Link>
              </>
            )}

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-base font-bold text-[#15552b] transition hover:-translate-y-0.5"
              aria-label="Toggle menu"
            >
              <span>Menu</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#252a34]/12 text-[#252a34]">
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </span>
            </button>
          </div>
        </div>

        {open ? (
          <div className="mt-3 rounded-[2rem] border border-white/12 bg-[#201c29]/96 p-5 text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <form action="/search" className="mb-4 flex items-center gap-3 rounded-full border border-white/12 bg-white/6 px-4 py-3">
              <Search className="h-4 w-4 text-[var(--slot4-accent)]" />
              <input
                name="q"
                type="search"
                placeholder="Search stories, profiles, and images"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/40"
              />
            </form>

            <div className="grid gap-2 md:grid-cols-2">
              {[{ label: 'Home', href: '/' }, ...navItems, { label: 'Contact', href: '/contact' }, ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-[1.35rem] px-4 py-3 text-sm font-semibold transition ${
                      active ? 'bg-white text-[#1d222c]' : 'bg-white/5 text-white/72 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}
