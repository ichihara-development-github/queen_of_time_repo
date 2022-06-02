import React from "react"
import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";

const GOOGLE_MAP_API_KEY="AIzaSyBKnVvlCy9D9nY3-WJ5frpbVzuZK3DIy2Y"

import Icon from "../../images/offices-buildings-svgrepo-com.svg";
const containerStyle = {
    width: "100%",
    height: "300px",
  };
  
  
  const circleOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
  };

export const TimestampMap = ({myPosition, officePosition}) => (

        <LoadScript googleMapsApiKey={GOOGLE_MAP_API_KEY}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={myPosition}
                zoom={18}
            >
            <Marker position={myPosition} zIndex={2} />
            <Marker 
              position={officePosition}
              icon={{
                url:Icon,
                scale: 0.05
              }}
              
            />
            

            <Circle
            center={myPosition}
            radius={30}
            options={circleOptions}
            />
            </GoogleMap>
    </LoadScript>
    
)