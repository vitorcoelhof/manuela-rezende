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
