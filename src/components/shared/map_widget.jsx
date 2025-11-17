// components/MapComponent.jsx
"use client"; // Penting untuk Next.js 13+ dengan App Router

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import L from "leaflet";

// Fix icon issue di Next.js
const fixLeafletIcon = () => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
};

export default function MapComponent({
  center = [-6.973213942396474, 107.63094244362806],
  zoom = 15,
  markers = [],
}) {
  useEffect(() => {
    fixLeafletIcon();
  }, []);

  return (
    <div style={{ height: "250px", width: "100%", position: "relative" }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Default marker di center */}
        <Marker position={center}>
          <Popup>
            Lokasi Anda di sini! <br /> Banjar, Jawa Barat
          </Popup>
        </Marker>

        {/* Custom markers jika ada */}
        {markers.map((marker, idx) => (
          <Marker key={idx} position={[marker.lat, marker.lng]}>
            <Popup>{marker.popup || "Marker"}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
