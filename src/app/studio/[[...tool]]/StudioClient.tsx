'use client'

import { useEffect } from 'react'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioClient() {
  useEffect(() => {
    // Signal to LayoutWrapper that we're in studio mode
    document.documentElement.dataset.studio = 'true'

    return () => {
      delete document.documentElement.dataset.studio
    }
  }, [])

  return <NextStudio config={config} />
}
