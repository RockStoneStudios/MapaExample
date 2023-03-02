import React, {useEffect, useState} from 'react';
import * as Location from 'expo-location';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {Marker,Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions'
import {GOOGLE_MAPS_KEY} from '@env';
import { mapStyle } from './config/mapStyle';
const avatar = require('./assets/image/avatar.png');

export default function App() {

  const [origin,setOrigin] = useState({
     latitude: 6.501,
     longitude: -75.7299
  });

  const [destination,setDestination]= useState({
    latitude : 6.5,
    longitude : -75.73922
  });

  useEffect(()=>{
      const origen = async () => {
        let location = await Location.getCurrentPositionAsync({});
        setOrigin({
           latitude : location.coords.latitude,
           longitude : location.coords.longitude
        })
      }
      origen();
     getLocationPermission();
    
  },[])

async function getLocationPermission ()  {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if(status !== 'granted'){
        alert('Permiso Denegado');
        return
      }
    

  }
  return (
    <View style={styles.container}>
     
     <MapView 
      
      provider= {PROVIDER_GOOGLE}
      customMapStyle={mapStyle}
      initialRegion={{
      latitude : origin.latitude,
      longitude : origin.longitude,
      latitudeDelta : 0.09,
      longitudeDelta : 0.04
     }}
     style={styles.map}
     > 
      <Marker 
        title='Origen'
        pinColor= {'blue'}
       
        coordinate={origin}
        
        
        style={styles.markerUser}
      />
       <Marker 
        title='destino'
        draggable
        coordinate={destination}
        onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}
      />

      <MapViewDirections 
        origin={origin}
        destination={destination}
        apikey={GOOGLE_MAPS_KEY}
        strokeColor='cyan'
        strokeWidth={5}
      />
     
     </MapView>    
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
   map :{
      width : '100%',
      height : '100%'
   },
   markerUser:{
     width : 50,
     height : 50
   }
});
