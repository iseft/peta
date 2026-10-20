import React from 'react'

interface BlogTitleComponentProps {
  title: string
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export default function BlogTitleComponent({ title, level }: BlogTitleComponentProps) {
  const HeadingTag = level as keyof React.JSX.IntrinsicElements

  const levelClasses = {
    h1: 'mt-16 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white',
    h2: 'mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white',
    h3: 'mt-12 text-2xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white',
    h4: 'mt-10 text-xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white',
    h5: 'mt-8 text-lg font-semibold tracking-tight text-pretty text-gray-900 dark:text-white',
    h6: 'mt-6 text-base font-semibold tracking-tight text-pretty text-gray-900 dark:text-white',
  }

  return <HeadingTag className={levelClasses[level]}>{title}</HeadingTag>
}
