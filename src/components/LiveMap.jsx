import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// 1. Create a custom "Moving Dot" icon for the truck
const truckDotIcon = L.divIcon({
  className: 'custom-moving-dot',
  html: `<div style="
    background-color: #28a745; 
    width: 18px; 
    height: 18px; 
    border-radius: 12px; 
    border: 1px solid #E5E7EB; 
    box-shadow: 0 0 8px rgba(0,0,0,0.6);
  "></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9] // Centers the dot directly over the coordinate
});

// Default pins for Start and Destination
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;


export default function LiveMap({ lat, lng, startLat, startLng, destLat, destLng }) {
  const [roadPath, setRoadPath] = useState([]);

  const currentPosition = [lat, lng];
  const startPosition = startLat && startLng ? [startLat, startLng] : null;
  const destPosition = destLat && destLng ? [destLat, destLng] : null;

  // 2. Fetch the actual road route from OSRM
  useEffect(() => {
    if (!startPosition || !destPosition) return;

    const fetchRoadRoute = async () => {
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${destLng},${destLat}?overview=full&geometries=geojson`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (data.routes && data.routes[0]) {
          const mappedCoords = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
          setRoadPath(mappedCoords);
        }
      } catch (error) {
        console.error("OSRM server is down or blocked. Falling back to straight lines.", error);
        
        // THE FAIL-SAFE: If the API fails, just draw a line connecting the dots!
        const fallbackPath = [
          [startLat, startLng],
          [lat, lng],           // The current truck location
          [destLat, destLng]
        ];
        setRoadPath(fallbackPath);
      }
    };

    fetchRoadRoute();
  }, [startLat, startLng, destLat, destLng, lat, lng]); // Added lat, lng here so the fallback line moves with the truck

  if (!lat || !lng) return <p style={{ textAlign: 'center', padding: '20px' }}>Loading live map...</p>;

  return (
    <div style={{ height: '400px', width: '100%', marginTop: '30px', borderRadius: '12px', overflow: 'hidden', border: '2px solid #eee' }}>
      <MapContainer key={`${lat}-${lng}`} center={currentPosition} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* 3. Draw the solid road line */}
        {roadPath.length > 0 && (
          <Polyline 
            positions={roadPath} 
            color="#0056b3" // SmartLogix Blue
            weight={5} 
            opacity={0.7}
          />
        )}

        {/* Start Marker */}
        {startPosition && (
          <Marker position={startPosition}>
            <Popup><strong>Warehouse</strong><br/>Dispatched</Popup>
          </Marker>
        )}

        {/* Destination Marker */}
        {destPosition && (
          <Marker position={destPosition}>
            <Popup><strong>Customer</strong><br/>Drop-off point</Popup>
          </Marker>
        )}

        {/* 4. The Live Moving Truck Dot */}
        <Marker position={currentPosition} icon={truckDotIcon}>
          <Popup><strong>Truck is here!</strong><br/>Live Tracking</Popup>
        </Marker>

      </MapContainer>
    </div>
  );
}