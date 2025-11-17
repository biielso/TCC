import React, { useState, useEffect } from 'react';

// ===============================
// IMPORTS CORRETOS PARA v5
// ===============================
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from 'react-leaflet/Marker'
import { Popup } from 'react-leaflet/Popup'
import { useMapEvents } from 'react-leaflet/hooks'

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// IMPORTANTE: você não tinha importado
import styles from './Mapa.module.css';

// ======================================================
// CONFIGURAÇÕES
// ======================================================

const API_URL = 'http://localhost:8080/localizacoes';
const initialPosition = [-15.78, -47.93];

// Ícone padrão corrigido
const defaultIcon = new L.Icon({
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// ======================================================
// Componente — Captura clique e salva
// ======================================================
function LocationSaver({ setLocations }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      console.log('Coordenada clicada:', lat, lng);

      try {
        await axios.post(API_URL, {
          latitude: lat,
          longitude: lng,
          nome: `Ponto Salvo em ${new Date().toLocaleTimeString()}`
        });

        const response = await axios.get(API_URL);
        setLocations(response.data);

        alert(`Localização salva: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      } catch (error) {
        console.error("Erro ao salvar:", error);
        alert("Erro ao salvar localização. Verifique a API!");
      }
    }
  });

  return null;
}

// ======================================================
// Componente Principal
// ======================================================
function Mapa() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(API_URL);
        setLocations(response.data);
      } catch (error) {
        console.error("Erro ao buscar localizações:", error);
      }
    };
    fetchLocations();
  }, []);

  return (
    <div className={styles.containerMapa}>
      <h2>Mapa de Localizações (Clique para Salvar)</h2>

      <div className={styles.mapaBox}>
        <MapContainer
          center={initialPosition}
          zoom={4}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          <LocationSaver setLocations={setLocations} />

          {locations.map((loc) => (
            <Marker
              key={loc.id}
              position={[loc.latitude, loc.longitude]}
              icon={defaultIcon}
            >
              <Popup>
                <strong>{loc.nome}</strong>
                <br />
                Lat: {loc.latitude.toFixed(4)}, Lng: {loc.longitude.toFixed(4)}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default Mapa;
