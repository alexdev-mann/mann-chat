import {} from '@types/googlemaps'
import * as React from 'react'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const Map = withGoogleMap((props: any) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
)

export default Map