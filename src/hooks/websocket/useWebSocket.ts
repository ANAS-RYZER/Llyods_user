'use client';

import { useEffect, useRef, useState } from "react";

export const useWebSocket = (url: string) => {
  const [price, setPrice] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connect = () => {
      try {
        ws.current = new WebSocket(url);
        
        ws.current.onopen = () => {
          console.log("WebSocket Connected");
          setIsConnected(true);
          setError(null);
          
          // Subscribe to the trade stream
          if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            const subscribeMessage = {
              method: "SUBSCRIBE",
              params: ["usdtinr@trade"],
              id: 1
            };
            ws.current.send(JSON.stringify(subscribeMessage));
          }
        };

        ws.current.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            // Handle both trade stream data and subscription response
            if (data.p) {
              setPrice(Number(data.p));
            } else if (data.result === null && data.id === 1) {
              console.log("Successfully subscribed to trade stream");
            }
          } catch (err) {
            console.error("Error parsing WebSocket message:", err);
            setError("Failed to parse WebSocket message");
          }
        };

        ws.current.onerror = (event) => {
          console.error("WebSocket error:", event);
          setError("WebSocket connection error");
          setIsConnected(false);
        };

        ws.current.onclose = () => {
          console.log("WebSocket connection closed");
          setIsConnected(false);
          // Attempt to reconnect after 5 seconds
          setTimeout(connect, 5000);
        };

      } catch (err) {
        console.error("Failed to create WebSocket connection:", err);
        setError("Failed to create WebSocket connection");
        setIsConnected(false);
      }
    };

    connect();

    return () => {
      if (ws.current) {
        // Unsubscribe before closing
        if (ws.current.readyState === WebSocket.OPEN) {
          const unsubscribeMessage = {
            method: "UNSUBSCRIBE",
            params: ["usdtinr@trade"],
            id: 2
          };
          ws.current.send(JSON.stringify(unsubscribeMessage));
        }
        ws.current.close();
      }
    };
  }, [url]);

  return { price, isConnected, error };
};