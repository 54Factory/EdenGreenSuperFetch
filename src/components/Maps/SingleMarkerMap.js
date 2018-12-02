
import React from 'react'
import { compose, withProps } from "recompose"
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"


const SingleMarkerMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDrBHOe-S7kqtVP9cPz-RHwz0ntd8wRndI&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div id="map"style={{ height: `100%` }} />,

  }),
  // withScriptjs,
  withGoogleMap,
  // withScriptjs,
  // withGoogleMap
)(props =>
  <GoogleMap
    ref={props.onMapMounted}
    placeId={props.placeId}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
 
{props.markers.map(marker => (
          <Marker
            {...marker}
          />
        ))}
</GoogleMap>
)


const SingleMarkerMapComponent = ({ markers }) => {
  return (
    <div style={{height: `100%`}}>
    <SingleMarkerMap
      center={{ lat: markers.lat, lng: markers.lng }}
      markers={[{
        position: {
          lat: markers.lat,
          lng: markers.lng,
        },
        key: `id`,
        defaultAnimation: 3,
      }]}
    />
  </div>
  )
}

export default SingleMarkerMapComponent
