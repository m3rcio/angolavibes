import React, { useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const PlaceCard = ({ place }) => {
  const [showMap, setShowMap] = useState(false);

  // Estilo do mini-mapa dentro do card
  const mapContainerStyle = {
    width: '100%',
    height: '200px', // Mesma altura da imagem para não quebrar o layout
  };

  const center = {
    lat: place.geometry.location.lat,
    lng: place.geometry.location.lng,
  };

  return (
    <div className="card">
      <div className="card-media" style={{ position: 'relative' }}>
        {/* Lógica de Troca: Se showMap for true, mostra Mapa, senão mostra Imagem */}
        {showMap ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={15}
            center={center}
            options={{ disableDefaultUI: true }} // Remove botões do Google para ficar limpo
          >
            <Marker position={center} />
          </GoogleMap>
        ) : (
          <img 
            src={place.photoUrl || 'placeholder.jpg'} 
            alt={place.name} 
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
        )}

        {/* Botão de Troca (o pequeno botão sobre a imagem/mapa) */}
        <button 
          onClick={() => setShowMap(!showMap)}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 10,
            borderRadius: '50%',
            cursor: 'pointer'
          }}
        >
          {showMap ? '🖼️' : '📍'}
        </button>
      </div>

      <div className="card-content">
        <span className="category">{place.types[0]}</span>
        <h3>{place.name}</h3>
        <p><strong>Horário:</strong> {place.opening_hours?.open_now ? 'Aberto' : 'Fechado'}</p>
        <p><strong>Contacto:</strong> {place.formatted_phone_number || 'Não disponível'}</p>
      </div>
    </div>
  );
};

export default PlaceCard;