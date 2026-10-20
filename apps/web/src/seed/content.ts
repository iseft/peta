import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseMarkdownPage } from './markdown'

// Launch content (drafted 2026-10-20). Home is published; the legal pages are
// drafts until they have been reviewed.

export const homePage = {
  title: 'Home',
  slug: 'home',
  _status: 'published' as const,
  content: [
    {
      blockType: 'hero-centered' as const,
      supertitle: 'Coming soon to Android',
      title: 'Plan your money. See where it really goes.',
      description:
        'Peta puts your monthly plan next to what you actually spend, and tells you at a glance whether you are keeping to the 50/30/20 rule.',
    },
    {
      blockType: 'feature-three-columns-icons' as const,
      badge: 'How it works',
      title: 'Plan, record, compare.',
      description: 'A budget you can understand in ten seconds.',
      features: [
        {
          name: 'Plan your month',
          description: 'Add your income and regular costs once: rent, bills, subscriptions, savings.',
          iconName: 'CalendarDaysIcon',
        },
        {
          name: 'Keep to 50/30/20',
          description: 'Needs, wants and saving as a share of your income, green when on target.',
          iconName: 'ChartPieIcon',
        },
        {
          name: 'Any currency',
          description: 'Plan in euros, get paid in forints: everything is converted at the day’s rate.',
          iconName: 'CurrencyEuroIcon',
        },
      ],
    },
    {
      blockType: 'faq' as const,
      title: 'Questions',
      faqs: [
        {
          question: 'What is the 50/30/20 rule?',
          answer:
            'Elizabeth Warren’s rule of thumb: at most 50% of your income on needs, at most 30% on wants, and at least 20% into savings.',
        },
        {
          question: 'Does it connect to my bank?',
          answer: 'No. You add your plan and your spending yourself, so nothing has access to your accounts.',
        },
        {
          question: 'iPhone?',
          answer: 'Android first. iPhone later.',
        },
      ],
    },
    {
      blockType: 'cta-simple-stacked' as const,
      title: 'Know where your money goes.',
    },
  ],
}

// The legal pages are written in src/legal/*.md (format: src/seed/markdown.ts)
// and stay drafts until reviewed and published in /admin.
const legalPage = (file: string) => {
  const { title, slug, content } = parseMarkdownPage(
    readFileSync(join(dirname(fileURLToPath(import.meta.url)), '../legal', file), 'utf8'),
  )
  return { title, slug, _status: 'draft' as const, content: [{ blockType: 'rich-text' as const, content }] }
}

export const privacyPage = legalPage('privacy.md')
export const termsPage = legalPage('terms.md')
export const deleteAccountPage = legalPage('delete-account.md')

export const pages = [homePage, privacyPage, termsPage, deleteAccountPage]
