'use client'

import { useEffect, useState } from 'react'

// Import CSS statically
import 'leaflet/dist/leaflet.css'

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

    // Fix Leaflet marker icon paths
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })
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
    // Buscar coordenadas: ViaCEP → Nominatim
    const buscarCoordenadas = async () => {
      try {
        const cepLimpo = cep.replace(/\D/g, '') // Remove caracteres não-numéricos
        if (cepLimpo.length !== 8) {
          setErro('CEP inválido. Use o formato 88015-902 ou 88015902')
          console.error('CEP inválido:', cep)
          return
        }

        console.log('Buscando coordenadas para CEP:', cepLimpo)

        // Passo 1: Obter endereço via ViaCEP
        const viaCepUrl = `https://viacep.com.br/ws/${cepLimpo}/json/`
        const viaCepResponse = await fetch(viaCepUrl)
        const viaCepData = await viaCepResponse.json()

        if (viaCepData.erro) {
          setErro('CEP não encontrado.')
          console.warn('CEP não encontrado no ViaCEP:', cepLimpo)
          return
        }

        // Montar endereço completo
        const endereco = `${viaCepData.logradouro}, ${viaCepData.localidade}, ${viaCepData.uf}`
        console.log('Endereço obtido:', endereco)

        // Passo 2: Geocodificar com Nominatim
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(endereco)}&format=json&limit=1`
        console.log('URL Nominatim:', nominatimUrl)

        const nominatimResponse = await fetch(nominatimUrl, {
          headers: {
            'Accept': 'application/json'
          }
        })

        if (!nominatimResponse.ok) {
          throw new Error(`HTTP error! status: ${nominatimResponse.status}`)
        }

        const nominatimData = await nominatimResponse.json()
        console.log('Resposta Nominatim:', nominatimData)

        if (nominatimData.length > 0) {
          setCoordenadas({
            lat: parseFloat(nominatimData[0].lat),
            lng: parseFloat(nominatimData[0].lon),
          })
          setErro(null)
          console.log('Coordenadas encontradas:', nominatimData[0].lat, nominatimData[0].lon)
        } else {
          setErro('Não foi possível localizar as coordenadas. Tente novamente.')
          console.warn('Nenhum resultado para endereço:', endereco)
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
