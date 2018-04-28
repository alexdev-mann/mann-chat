import * as React from 'react'
import Map from './Map'
import { GOOGLE_MAPS_API_KEY } from '../constants/'

const App = () => {
    return <>
        <Map
            isMarkerShown={true}
            googleMapURL={"https://maps.googleapis.com/maps/api/js?key="+GOOGLE_MAPS_API_KEY+"v=3.exp&libraries=geometry,drawing,places"}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />} />
    </>
}

export default App
