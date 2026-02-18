'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

interface MapClientProps {
  cep: string
  titulo: string
}

interface Coordenadas {
  lat: number
  lng: number
}

// Dynamic import to avoid window is not defined error
let L: any = null

const loadLeaflet = async () => {
  if (typeof window !== 'undefined' && !L) {
    const leaflet = await import('leaflet')
    L = leaflet.default
    await import('leaflet/dist/leaflet.css')
  }
  return L
}

export default function MapClient({ cep, titulo }: MapClientProps) {
  const [coordenadas, setCoordenadas] = useState<Coordenadas | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [leafletReady, setLeafletReady] = useState(false)

  useEffect(() => {
    loadLeaflet().then(() => setLeafletReady(true))
  }, [])

  useEffect(() => {
    // Buscar coordenadas via Nominatim (OpenStreetMap)
    const buscarCoordenadas = async () => {
      try {
        const cepLimpo = cep.replace(/\D/g, '') // Remove caracteres não-numéricos
        if (cepLimpo.length !== 8) {
          setErro('CEP inválido')
          console.error('CEP inválido:', cep)
          return
        }

        console.log('Buscando coordenadas para CEP:', cepLimpo)

        const url = `https://nominatim.openstreetmap.org/search?postalcode=${cepLimpo}&country=Brazil&format=json&limit=1`
        console.log('URL:', url)

        const response = await fetch(url, {
          headers: {
            'Accept': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log('Resposta Nominatim:', data)

        if (data.length > 0) {
          setCoordenadas({
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
          })
          setErro(null)
          console.log('Coordenadas encontradas:', data[0].lat, data[0].lon)
        } else {
          setErro('CEP não encontrado. Tente usar o endereço no lugar do CEP.')
          console.warn('Nenhum resultado para CEP:', cepLimpo)
        }
      } catch (err) {
        setErro('Erro ao buscar localização. Verifique sua conexão.')
        console.error('Erro ao buscar localização:', err)
      }
    }

    if (cep) {
      buscarCoordenadas()
    }
  }, [cep])

  useEffect(() => {
    if (!coordenadas || !leafletReady || !L) return

    const mapContainer = document.getElementById('map')
    if (!mapContainer) return

    try {
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
    } catch (err) {
      console.error('Erro ao criar mapa:', err)
      setErro('Erro ao exibir mapa')
    }
  }, [coordenadas, titulo, leafletReady])

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
