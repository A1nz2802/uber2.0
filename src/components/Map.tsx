import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { selectOrigin, selectDestination } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '@env';
import tw from 'twrnc';

const Map = () => {

  const origin = useSelector( selectOrigin );
  const destination = useSelector( selectDestination );
  const mapRef = useRef<MapView>( null );

  const handleFitMarkers = () => {
    mapRef.current?.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      animated: true,
    });
  }

  useEffect(() => {
    if ( !origin || !destination ) return;

    // Zoom & fit to markers
    setTimeout(handleFitMarkers, 300);
  }, [ origin, destination ])
  
  return (
    <MapView
      ref={ mapRef }
      mapType='mutedStandard'
      style={ tw`flex-1` }
      initialRegion={{
        latitude: origin!.location.lat,
        longitude: origin!.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >

      { origin && destination && (
        <MapViewDirections 
          origin={ origin.description }
          destination={ destination.description }
          apikey={ GOOGLE_MAPS_APIKEY }
          strokeWidth={ 3 }
          strokeColor="black"
        />
      
      )}

      { origin?.location && (
        <Marker 
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }} 
          title="Origin"
          description={ origin.description }
          identifier="origin"
        />
      )}

      { destination?.location && (
        <Marker 
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }} 
          title="Destination"
          description={ destination.description }
          identifier="destination"
        />
      )}
    </MapView>
  )
}

export default Map;