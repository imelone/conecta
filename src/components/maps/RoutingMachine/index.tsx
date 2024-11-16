import React, { useRef, useEffect } from "react";
import L, { LatLngExpression } from "leaflet";
import "leaflet-routing-machine"; // This is necessary to add routing functionality

interface RoutingMachineProps {
  startPoint: LatLngExpression; // Define the type explicitly
  endPoint: LatLngExpression; // Define the type explicitly
}

const RoutingMachine: React.FC<RoutingMachineProps> = ({
  startPoint,
  endPoint,
}) => {
  //const map = useMap();
  const routingControlRef = useRef<L.Routing.Control | null>(null);

  useEffect(() => {
    if (routingControlRef.current && startPoint && endPoint) {
      routingControlRef.current.setWaypoints([
        L.latLng(startPoint),
        L.latLng(endPoint),
      ]);
    }
  }, [startPoint, endPoint]);

  return null; // Replace with your actual JSX
};

export default RoutingMachine;
