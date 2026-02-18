'use client'

import { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface MapClientProps {
  lat: number
  lng: number
  titulo: string
}

export default function MapClient({ lat, lng, titulo }: MapClientProps) {
  useEffect(() => {
    const mapContainer = document.getElementById('map')
    if (!mapContainer) return

    // Create map
    const map = L.map('map').setView([lat, lng], 16)

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map)

    // Add marker
    L.marker([lat, lng])
      .bindPopup(titulo)
      .addTo(map)
      .openPopup()

    // Fix map height
    map.invalidateSize()

    return () => {
      map.remove()
    }
  }, [lat, lng, titulo])

  return <div id="map" className="w-full h-96 border border-[#e5e5e5] rounded-sm overflow-hidden" />
}
