import React, { Component } from 'react'
import MapView, { Marker } from 'react-native-maps'
export default class ChitMapView extends Component {
  render () {
    if (this.props.location && this.props.isVisible) {
      return (
        <MapView
          style={{ width: 500, height: 250 }}

          initialRegion={{
            latitude: this.props.location.latitude,
            longitude: this.props.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <Marker coordinate={{
            latitude: this.props.location.latitude,
            longitude: this.props.location.longitude
          }}
          />
        </MapView>
      )
    }
    return null
  }
}
