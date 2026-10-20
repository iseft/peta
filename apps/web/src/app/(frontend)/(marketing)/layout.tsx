import React from 'react'

// The root layout already renders the navigation and footer.
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
