import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrigin, selectDestination, setTravelTimeInformation } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '@env';
import tw from 'twrnc';
import { Data } from '../types/distanceMatrix';

const Map = () => {

  const origin = useSelector( selectOrigin );
  const destination = useSelector( selectDestination );
  const mapRef = useRef<MapView>( null );
  const dispatch = useDispatch();

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

  useEffect(() => {
    if ( !origin || !destination ) return;
    
    const getTravelTime = async() => {
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?
      units=imperial&origins=${origin.description}&destinations=${destination.description}
      &key=${GOOGLE_MAPS_APIKEY}`)
        .then( res => res.json() )
        .then( ( data: Data ) => {
          dispatch(setTravelTimeInformation( data.rows[0].elements[0] ))
        })
    }

    getTravelTime();

  }, [origin, destination, GOOGLE_MAPS_APIKEY])
  
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

