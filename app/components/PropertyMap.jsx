"use client";

import { useEffect, useRef, useState } from "react";
import ClipLoader from 'react-spinners/ClipLoader';


const PropertyMap = ({ property }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Loading location...");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const initMap = async () => {
      setLoading(true);
      setStatus("Fetching location...");

      try {
        const L = (await import("leaflet")).default;

        const address = `${property.location.street}, ${property.location.city}, India`;

        const res = await fetch(
          `/api/geocode?q=${encodeURIComponent(address)}`
        );

        const data = await res.json();

        console.log("Geocode response:", data);

        if (!data.length) {
          setStatus("Location not found ❌");
          setLoading(false);
          return;
        }

        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);

        setStatus("Rendering map...");

        // fix icon issue
        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
          iconRetinaUrl: (
            await import("leaflet/dist/images/marker-icon-2x.png")
          ).default,
          iconUrl: (await import("leaflet/dist/images/marker-icon.png")).default,
          shadowUrl: (await import("leaflet/dist/images/marker-shadow.png"))
            .default,
        });

        // cleanup old map
        if (mapInstance.current) {
          mapInstance.current.remove();
        }

        const map = L.map(mapRef.current).setView([lat, lng], 13);
        mapInstance.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap",
        }).addTo(map);

        L.marker([lat, lng]).addTo(map);

        setLoading(false);
        setStatus("");
      } catch (err) {
        console.error(err);
        setStatus("Something went wrong ❌");
        setLoading(false);
      }
    };

    initMap();
  }, [mounted, property]);

  if (!mounted) {
    return (
      <div style={{ height: "400px" }} className="flex items-center justify-center">
        <ClipLoader />
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      {/* MAP */}
      <div
        ref={mapRef}
        style={{ height: "400px", width: "100%", borderRadius: "10px" }}
      />

      {/* OVERLAY UI */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70">
          <ClipLoader />
          <p className="mt-2 text-gray-600 text-sm">{status}</p>
        </div>
      )}
    </div>
  );
};

export default PropertyMap;