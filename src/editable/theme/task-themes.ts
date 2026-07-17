import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

export type TaskTheme = {
  kicker: string
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const DISPLAY_FONT = "'Space Grotesk', 'Sora', system-ui, sans-serif"
const BODY_FONT = "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif"

const base = {
  dark: false,
  fontDisplay: DISPLAY_FONT,
  fontBody: BODY_FONT,
  bg: '#f4f1ea',
  surface: 'rgba(255,255,255,0.74)',
  raised: '#e7ebf0',
  text: '#252a34',
  muted: '#5f6978',
  line: 'rgba(37,42,52,0.12)',
  accent: '#ff2e63',
  accentSoft: 'rgba(255,46,99,0.1)',
  onAccent: '#ffffff',
  glow: 'rgba(8,217,214,0.18)',
  radius: '1.75rem',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article: { ...base, kicker: 'Signal Feed', note: 'Perspective, product updates, and sharp editorial reads.' },
  listing: { ...base, kicker: 'Vendor Grid', note: 'Browse local operators with a cleaner, faster directory rhythm.' },
  classified: { ...base, kicker: 'Market Board', note: 'Live offers framed like a polished action board.' },
  image: { ...base, kicker: 'Visual Stream', note: 'Image-first storytelling with gallery energy and motion.' },
  sbm: { ...base, kicker: 'Reference Stack', note: 'Useful links and resources, organized like a research shelf.' },
  pdf: { ...base, kicker: 'Document Vault', note: 'Guides, brochures, and downloadable specs in one place.' },
  profile: { ...base, kicker: 'People Layer', note: 'Profiles built to feel credible, modern, and easy to scan.' },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    '--slot4-accent': '#08d9d6',
    '--slot4-accent-fill': t.accent,
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
