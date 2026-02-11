'use client'

/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js Catch-all Routes.
 */
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function AdminPage() {
    return <NextStudio config={config} />
}
