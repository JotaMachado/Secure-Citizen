import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import * as FileSystem from "expo-file-system";
import * as Location from "expo-location";
import { initializeApp } from "firebase/app";

let locationsOfInterest = [
  {
    title: "DPO",
    location: {
      latitude: -22.51939384500152,
      longitude: -42.97919807955623,
    },
    description: "2632-4853",
  },
  {
    title: "67º DP",
    location: { latitude: -22.535985631598265, longitude: -42.98549992963672 },
    description: "3633-1934",
  },
];

_getLocationAsync = async () => {
  const location_user = await Location.watchPositionAsync(
    {
      enableHighAccuracy: true,
      distanceInterval: 1,
      timeInterval: 1000,
    },
    false,
    (location_update) => {
      console.log(location_update.coordinate);
    }
  );
};

const requestLocationPermission = async () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permissão para acessar localização negada");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
};
export default function App() {
  const [count, setCount] = useState(0);
  const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
    latitude: -22.52939384500152,
    longitude: -42.98919807955623,
  });

  const onRegionChange = (region) => {
    return console.log(region);
  };
  const mapRef = useRef();
  const showLocationsOfInterest = () => {
    return locationsOfInterest.map((item, index) => {
      return (
        <Marker
          key={index}
          coordinate={item.location}
          title={item.title}
          description={item.description}
        />
      );
    });
  };
  return (
    requestLocationPermission(),
    _getLocationAsync(),
    (
      <View style={styles.container}>
        <MapView
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          ref={mapRef}
          style={styles.map}
          onRegionChange={onRegionChange}
          initialRegion={{
            latitude: -22.523607780513515,
            latitudeDelta: 0.07350184518492497,
            longitude: -42.97759981825948,
            longitudeDelta: 0.09442884474992752,
          }}
        >
          {showLocationsOfInterest()}
        </MapView>
        <StatusBar style="auto" />
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  mapOverlay: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "#ffff",
    borderRadius: 3,
    borderWidth: 2,
    padding: 16,
    left: "25%",
    width: "50%",
    textAlign: "center",
  },
});
