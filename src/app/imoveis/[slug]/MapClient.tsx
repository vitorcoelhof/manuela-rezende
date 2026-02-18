'use client'

import { useEffect, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface MapClientProps {
  cep: string
  titulo: string
}

interface Coordenadas {
  lat: number
  lng: number
}

export default function MapClient({ cep, titulo }: MapClientProps) {
  const [coordenadas, setCoordenadas] = useState<Coordenadas | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    // Buscar coordenadas via ViaCEP
    const buscarCoordenadas = async () => {
      try {
        const cepLimpo = cep.replace(/\D/g, '') // Remove caracteres não-numéricos
        if (cepLimpo.length !== 8) {
          setErro('CEP inválido')
          return
        }

        const response = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${cepLimpo}&country=BR&format=json`)
        const data = await response.json()

        if (data.length > 0) {
          setCoordenadas({
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
          })
          setErro(null)
        } else {
          setErro('CEP não encontrado')
        }
      } catch (err) {
        setErro('Erro ao buscar localização')
        console.error(err)
      }
    }

    buscarCoordenadas()
  }, [cep])

  useEffect(() => {
    if (!coordenadas) return

    const mapContainer = document.getElementById('map')
    if (!mapContainer) return

    // Create map
    const map = L.map('map').setView([coordenadas.lat, coordenadas.lng], 16)

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map)

    // Add marker
    L.marker([coordenadas.lat, coordenadas.lng])
      .bindPopup(titulo)
      .addTo(map)
      .openPopup()

    // Fix map height
    map.invalidateSize()

    return () => {
      map.remove()
    }
  }, [coordenadas, titulo])

  if (erro) {
    return (
      <div className="w-full h-96 border border-[#e5e5e5] rounded-sm overflow-hidden flex items-center justify-center bg-[#f5f5f5]">
        <p className="text-[#999999] text-[14px]">{erro}</p>
      </div>
    )
  }

  if (!coordenadas) {
    return (
      <div className="w-full h-96 border border-[#e5e5e5] rounded-sm overflow-hidden flex items-center justify-center bg-[#f5f5f5]">
        <p className="text-[#999999] text-[14px]">Carregando mapa...</p>
      </div>
    )
  }

  return <div id="map" className="w-full h-96 border border-[#e5e5e5] rounded-sm overflow-hidden" />
}
