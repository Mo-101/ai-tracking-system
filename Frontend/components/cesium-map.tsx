"use client"

import { useEffect, useRef, useState } from "react"
import * as Cesium from "cesium"
import React from "react"

const CESIUM_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMmRmYzcxNC0yZjM5LTQ0NzUtYWRkYi1kMjc1NzYwYTQ0NjYiLCJpZCI6MjE0OTQzLCJpYXQiOjE3MTU2NTMyNjN9.1fW--_-6R3TApPF2tAlOfXrqJadYPdwKqpPVkPetHP4"

export function CesiumMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!mapRef.current) return

    let viewer: Cesium.Viewer | undefined

    const initCesium = async () => {
      try {
        await import("cesium/Build/Cesium/Widgets/widgets.css")
        Cesium.Ion.defaultAccessToken = CESIUM_ACCESS_TOKEN;
        (window as any).CESIUM_BASE_URL = "/cesium/";

        const imageryProvider = new Cesium.IonImageryProvider({
          options: {
            assetId: 3954,
          },
        });
        viewer = new Cesium.Viewer(mapRef.current as Element, {
          imageryProvider,
          terrainProvider,
          baseLayerPicker: false,
          geocoder: false,
          homeButton: false,
          sceneModePicker: false,
          navigationHelpButton: false,
          animation: false,
          timeline: false,            
          fullscreenButton: false,
        })
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(10, 8, 1000000),
          duration: 0,
        })

        viewer.scene.fog.enabled = false
        viewer.scene.globe.showGroundAtmosphere = false
      } catch (err) {
        console.error("Error initializing Cesium:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred while initializing the map.")
      }
    }

    initCesium()

    return () => {
      if (viewer && !viewer.isDestroyed()) {
        viewer.destroy()
      }
    }
  }, [])

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#001a1a] text-[#0af0ff]">
        <p>Error: {error}</p>
      </div>
    )
  }
  return (
    <div className="container-panel p-4">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  )
}
//