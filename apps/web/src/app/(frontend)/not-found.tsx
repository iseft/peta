import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-paper px-6 py-12 sm:py-16 lg:px-8 dark:bg-ink">
        <div className="text-center">
          <p className="text-base font-semibold text-brand-600 dark:text-brand-400">404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl dark:text-white">
            These aren&apos;t the droids you&apos;re looking for
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
            Obi-Wan can&apos;t help you here, but we might — either contact us or go back to the
            home page.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-brand-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 dark:bg-brand-500 dark:hover:bg-brand-600 dark:focus-visible:outline-brand-500"
            >
              Go back to the home page
            </Link>
            <Link href="/contact" className="text-sm font-semibold text-gray-900 dark:text-white">
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
