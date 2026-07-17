import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Bookmark, Building2, FileText, Image as ImageIcon, Megaphone, UserRound } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditableExcerpt, getEditablePostImage, getEditableCategory, postHref } from '@/editable/cards/PostCards'
import { EditableHeroCollage } from '@/editable/sections/EditableHeroCollage'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const taskIcon: Record<TaskKey, typeof FileText> = {
  article: FileText,
  listing: Building2,
  classified: Megaphone,
  image: ImageIcon,
  sbm: Bookmark,
  pdf: FileText,
  profile: UserRound,
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

function dedupePosts(posts: SitePost[]) {
  return Array.from(new Map(posts.map((post) => [post.slug || post.id || post.title, post])).values())
}

function withFallback<T>(values: T[], fallback: T[]) {
  return values.length ? values : fallback
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function postPool(posts: SitePost[], timeSections: HomeTimeSection[]) {
  return dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)]).filter(Boolean)
}

function latestImages(posts: SitePost[], limit = 8) {
  return posts
    .map((post) => getEditablePostImage(post))
    .filter((image, index, all) => Boolean(image) && !image.includes('placeholder') && all.indexOf(image) === index)
    .slice(0, limit)
}

function FeatureCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group relative block min-h-[540px] overflow-hidden rounded-[2.4rem] border border-white/10 bg-[#1d222c] shadow-[0_34px_90px_rgba(0,0,0,0.3)]">
      <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,20,28,0.18),rgba(18,20,28,0.88))]" />
      <div className="relative z-10 flex h-full flex-col justify-end p-7 sm:p-9">
        <span className="w-fit rounded-full bg-[#ffc21c] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#1b2027]">
          Featured signal
        </span>
        <h3 className="mt-5 max-w-3xl text-4xl font-semibold leading-[0.94] tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
          {post.title}
        </h3>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72 sm:text-base">
          {getEditableExcerpt(post, 200)}
        </p>
        <span className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-white/14 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm">
          Open story <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}

function CompactCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group rounded-[1.8rem] border border-[#252a34]/10 bg-white/80 p-5 shadow-[0_18px_44px_rgba(18,22,29,0.08)] backdrop-blur-sm transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(18,22,29,0.12)]">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#252a34] text-xs font-black text-white">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--slot4-accent-fill)]">
            {getEditableCategory(post)}
          </p>
          <h3 className="mt-2 line-clamp-2 text-xl font-semibold leading-tight tracking-[-0.04em] text-[#222733]">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#5f6978]">
            {getEditableExcerpt(post, 92)}
          </p>
        </div>
      </div>
    </Link>
  )
}

function HorizontalCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group grid gap-4 rounded-[2rem] border border-[#252a34]/10 bg-white/82 p-4 shadow-[0_18px_44px_rgba(18,22,29,0.08)] backdrop-blur-sm transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_70px_rgba(18,22,29,0.14)] sm:grid-cols-[220px_minmax(0,1fr)]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] bg-[#d7dde6]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="min-w-0 py-1 sm:py-4 sm:pr-3">
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#08d9d6]">
          {getEditableCategory(post)}
        </p>
        <h3 className="mt-3 line-clamp-2 text-[1.75rem] font-semibold leading-[1.02] tracking-[-0.05em] text-[#202530]">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#5f6978]">
          {getEditableExcerpt(post, 155)}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--slot4-accent-fill)]">
          Explore now <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}

function EditorialCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group block border-b border-white/10 py-5 text-white/86 transition hover:text-white">
      <div className="flex items-start gap-5">
        <span className="mt-1 text-xs font-black uppercase tracking-[0.24em] text-[#08d9d6]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/42">
            {getEditableCategory(post)}
          </p>
          <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.04em]">
            {post.title}
          </h3>
          <p className="mt-3 line-clamp-2 text-sm leading-7 text-white/58">
            {getEditableExcerpt(post, 125)}
          </p>
        </div>
      </div>
    </Link>
  )
}

function ImageFirstCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group block overflow-hidden rounded-[2rem] border border-white/10 bg-[#222833] shadow-[0_24px_70px_rgba(0,0,0,0.28)] transition duration-500 hover:-translate-y-1.5">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(20,24,31,0.86))]" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#08d9d6]">
            {getEditableCategory(post)}
          </p>
          <h3 className="mt-2 line-clamp-2 text-2xl font-semibold leading-tight tracking-[-0.04em] text-white">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/68">
            {getEditableExcerpt(post, 90)}
          </p>
        </div>
      </div>
    </Link>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = postPool(posts, timeSections)
  const heroImages = latestImages(pool)
  const heroTitle = pagesContent.home.hero.title?.join(' ') || `Explore ${SITE_CONFIG.name}`

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 editable-dot-grid opacity-50" />
      <div className="relative min-h-[calc(100vh-6.5rem)] overflow-hidden">
        <div className="absolute inset-0">
          <EditableHeroCollage images={heroImages} />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,19,31,0.86),rgba(32,20,33,0.9))]" />
        <div className={`${container} relative flex min-h-[calc(100vh-6.5rem)] flex-col items-center justify-center py-16 text-center`}>
          <div className="editable-float">
            <div className="mx-auto grid w-12 grid-cols-3 gap-1">
              {['#ff2e63', '#08d9d6', '#ffc21c', '#08d9d6', '#252a34', '#ff2e63'].map((color, index) => (
                <span
                  key={`${color}-${index}`}
                  className={`h-3 w-3 rounded-[3px] ${index === 2 || index === 3 ? 'translate-y-2' : ''} ${index === 1 || index === 4 ? 'translate-x-2' : ''}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:items-end">
            <span className="editable-display text-7xl font-semibold leading-none tracking-[-0.1em] text-white sm:text-8xl">
              mygja
            </span>
            <div className="text-left text-3xl font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-5xl">
              <div>Build Your</div>
              <div>Vendor Presence</div>
            </div>
          </div>
          <p className="mt-8 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
            {heroTitle}. Designed for local vendors who want stronger image-led discovery, cleaner profiles, and a sharper public presence.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="#signal-grid" className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-[#ffc21c] px-8 py-4 text-lg font-black text-[#1d222c] shadow-[0_20px_44px_rgba(255,194,28,0.22)] transition hover:-translate-y-1 hover:brightness-95">
              Enter Site
            </Link>
            <Link href={primaryRoute} className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/14 bg-white/8 px-8 py-4 text-lg font-bold text-white transition hover:bg-white/12">
              Browse {taskLabel(primaryTask)}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = postPool(posts, timeSections)
  const lead = pool[0]
  const secondary = pool.slice(1, 5)

  return (
    <section id="signal-grid" className="bg-[var(--slot4-cream)] text-[#1f2430]">
      <div className={`${container} py-14 sm:py-20`}>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.28em] text-[#08d9d6]">
              <span>Signal Layer</span>
              <span className="h-1 w-1 rounded-full bg-[#ff2e63]" />
              <span className="text-[#667181]">Scroll to explore</span>
            </div>
            <h2 className="mt-8 max-w-5xl text-[clamp(4rem,9vw,8.6rem)] font-semibold leading-[0.9] tracking-[-0.09em] text-[#241f2a]">
              IMAGE DRIVES LOCAL DEMAND.
            </h2>
          </div>
          <div className="lg:pb-6">
            <p className="max-w-xl text-2xl leading-[1.22] tracking-[-0.03em] text-[#2d3441] sm:text-4xl">
              We help vendors present work, profiles, and updates in a layout that feels modern, focused, and memorable.
            </p>
          </div>
        </div>

        {lead ? (
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <FeatureCard post={lead} href={postHref(primaryTask, lead, primaryRoute)} />
            <div className="grid gap-4 self-end">
              {secondary.map((post, index) => (
                <CompactCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = postPool(posts, timeSections)
  const horizontal = withFallback(pool.slice(5, 8), pool.slice(0, 3))
  const imageFirst = withFallback(pool.slice(8, 11), pool.slice(0, 3))

  return (
    <section className="relative overflow-hidden bg-[#231e2a] text-white">
      <div className="absolute inset-0 opacity-28">
        <EditableHeroCollage images={latestImages(pool, 6)} />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,24,37,0.88),rgba(31,24,37,0.92))]" />
      <div className={`${container} relative py-16 sm:py-20`}>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="max-w-md">
            <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[#08d9d6]">
              Explore our build process
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-[0.96] tracking-[-0.06em] text-[#ffc21c] sm:text-6xl">
              Build image-heavy pages that still feel direct and useful.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/68">
              Strong profiles, visual proof, and fast routing through your content stack keep the experience polished without hiding the practical details.
            </p>
          </div>

          <div className="grid gap-5">
            {horizontal.map((post) => (
              <HorizontalCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {imageFirst.map((post) => (
            <ImageFirstCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = postPool(posts, timeSections)
  const sections = timeSections.length
    ? timeSections
    : [
        { key: 'recent', posts: pool.slice(0, 4), href: primaryRoute },
        { key: 'seasonal', posts: pool.slice(4, 8), href: primaryRoute },
      ]

  return (
    <section className="bg-[#f4f1ea]">
      <div className={`${container} py-14 sm:py-18`}>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-accent-fill)]">
              Active collections
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-[0.96] tracking-[-0.05em] text-[#222733] sm:text-5xl">
              Multiple reading rhythms, one visual system.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-[#5f6978]">
            Each section uses a different card rhythm so the site feels curated instead of repetitive, while still keeping the same search, route, and data behavior underneath.
          </p>
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          {sections.slice(0, 2).map((section, sectionIndex) => (
            <div key={section.key} className={`rounded-[2.4rem] border p-6 shadow-[0_24px_70px_rgba(18,22,29,0.16)] ${sectionIndex === 0 ? 'border-white/10 bg-[#252a34] text-white' : 'border-white/10 bg-[#1f1b26] text-white'}`}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className={`text-[11px] font-black uppercase tracking-[0.24em] ${sectionIndex === 0 ? 'text-[#08d9d6]' : 'text-[#ffc21c]'}`}>
                    {section.key}
                  </p>
                  <h3 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">
                    {sectionIndex === 0 ? 'Fresh arrivals' : 'Editorial picks'}
                  </h3>
                </div>
                <Link href={section.href || primaryRoute} className={`inline-flex items-center gap-1 text-sm font-bold ${sectionIndex === 0 ? 'text-[var(--slot4-accent-fill)]' : 'text-white'}`}>
                  See all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-6">
                {section.posts.slice(0, 4).map((post, index) => (
                  <EditorialCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'image' && task.key !== 'profile').map((task) => {
            const Icon = taskIcon[task.key] || FileText
            return (
              <Link
                key={task.key}
                href={task.route}
                className="group rounded-[1.8rem] border border-[#252a34]/10 bg-white/75 p-5 shadow-[0_18px_44px_rgba(18,22,29,0.08)] transition duration-500 hover:-translate-y-1.5 hover:border-[#08d9d6]"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(8,217,214,0.1)] text-[#08d9d6]">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="mt-4 text-lg font-semibold tracking-[-0.03em] text-[#222733]">{task.label}</p>
                <p className="mt-1 text-sm leading-6 text-[#667181]">Jump into the {task.label.toLowerCase()} stream.</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-[#211d28] text-white">
      <div className={`${container} py-14 sm:py-18`}>
        <div className="grid gap-6 rounded-[2.6rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,46,99,0.14),rgba(8,217,214,0.08))] px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl lg:grid-cols-[1fr_auto] lg:items-center lg:px-10">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[#08d9d6]">
              Launch faster
            </p>
            <h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-[0.96] tracking-[-0.06em] text-white sm:text-5xl">
              Put your visuals, profiles, and updates into a sharper public layout.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/66">
              Keep your content current, your identity consistent, and your audience moving naturally between your best pages.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/create" className="inline-flex items-center justify-center rounded-full bg-[#ffc21c] px-7 py-3 text-sm font-black text-[#1d222c] transition hover:-translate-y-0.5">
              Create a post
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/8 px-7 py-3 text-sm font-bold text-white transition hover:bg-white/12">
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
