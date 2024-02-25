import React from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const MapContainer = ({ searchValue }) => {
  const defaultCenter = { lat: 40.7128, lng: -74.0060 }; // Default center coordinates

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_API_Key}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '500px' }}
        center={defaultCenter}
        zoom={10}
      >
        {/* Marker component */}
        <Marker position={defaultCenter} title="Your Marker Title" />

      </GoogleMap>
    </LoadScript>
  );
}


MapContainer.propTypes = {
  searchValue: PropTypes.string.isRequired,
};

export default MapContainer;
