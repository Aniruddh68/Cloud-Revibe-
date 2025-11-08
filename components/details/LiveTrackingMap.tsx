
import React, { useEffect, useRef } from 'react';
import { Bus } from '../../types';

// Let TypeScript know that 'L' is a global object from the Leaflet script
declare const L: any;

interface LiveTrackingMapProps {
  bus: Bus;
}

export const LiveTrackingMap: React.FC<LiveTrackingMapProps> = ({ bus }) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any | null>(null);
    const markerRef = useRef<any | null>(null);

    // Effect to initialize the map
    useEffect(() => {
        if (mapContainerRef.current && !mapInstanceRef.current && bus.live_lat && bus.live_lng) {
            const map = L.map(mapContainerRef.current).setView([bus.live_lat, bus.live_lng], 14);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            mapInstanceRef.current = map;
        }
    }, [bus.live_lat, bus.live_lng]);

    // Effect to update the marker position
    useEffect(() => {
        if (mapInstanceRef.current && bus.live_lat && bus.live_lng) {
            const newLatLng = L.latLng(bus.live_lat, bus.live_lng);

            // Custom icon for the bus
            const busIcon = L.divIcon({
                html: `
                    <div style="transform: rotate(120deg);">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 text-brand-primary drop-shadow-lg">
                            <path d="M18.92 6.09C18.51 5.41 17.81 5 17 5H7c-.81 0-1.51.41-1.92 1.09L3 11v6c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-6l-2.08-4.91zM7.5 14c-.83 0-1.5-.67-1.5-1.5S6.67 11 7.5 11s1.5.67 1.5 1.5S8.33 14 7.5 14zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 9.5l1.5-3.5h9L17 9.5H5z"/>
                        </svg>
                    </div>
                `,
                className: '', // prevent default L-div-icon styles
                iconSize: [40, 40],
                iconAnchor: [20, 20],
                popupAnchor: [0, -20]
            });

            if (markerRef.current) {
                markerRef.current.setLatLng(newLatLng);
            } else {
                markerRef.current = L.marker(newLatLng, { icon: busIcon }).addTo(mapInstanceRef.current);
                markerRef.current
                    .bindPopup(`<b>${bus.operator_details.name}</b><br>Bus is currently here.`)
                    .openPopup();
            }

            // Smoothly pan the map to the new location
            mapInstanceRef.current.panTo(newLatLng, { animate: true, duration: 1.5 });
        }
    }, [bus.live_lat, bus.live_lng, bus.operator_details.name]);

    if (!bus.live_lat || !bus.live_lng) {
        return <div className="text-center p-8 text-gray-500">Live tracking is not available for this bus.</div>;
    }

    return (
        <div 
            ref={mapContainerRef} 
            className="h-[450px] w-full rounded-lg z-10" 
            aria-label="Map showing bus location"
        />
    );
};
