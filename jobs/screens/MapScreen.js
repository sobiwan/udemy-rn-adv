import React, { Component } from 'react';
import {
  View,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { Button } from 'react-native-elements';
import { MapView, Permissions } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../state/actions';

class MapScreen extends Component {
  state = {
    mapLoaded: false,
    region: {
      longitude: -122,
      latitude: 37,
      latitudeDelta: 0.09,
      longitudeDelta:
        (Dimensions.get('window').width /
          Dimensions.get('window').height) *
        0.09
    }
  };

  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      const currentCoords = {
        longitude: pos.coords.longitude,
        latitude: pos.coords.latitude
      };

      this.goToLocation(currentCoords);
    });
  };

  goToLocation = coords => {
    this.map.animateToRegion({
      ...this.state.region,
      longitude: coords.longitude,
      latitude: coords.latitude
    });
    this.setState(prevState => {
      return {
        region: {
          ...prevState.region,
          longitude: coords.longitude,
          latitude: coords.latitude
        }
      };
    });
  };

  componentDidMount() {
    Permissions.askAsync(Permissions.LOCATION);
    this.setState({ mapLoaded: true });
  }

  onRegionChangeComplete = region => {
    this.setState({ region });
  };

  searchJobsButtonPress = () => {
    this.props.fetchJobs(this.state.region, () => {
      this.props.navigation.navigate('deck');
    });
  };

  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={this.state.region}
          ref={ref => (this.map = ref)}
          onRegionChangeComplete={
            this.onRegionChangeComplete
          }
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Search for Jobs Here"
            buttonStyle={styles.button}
            icon={{ name: 'search' }}
            onPress={this.searchJobsButtonPress}
          />
          <Button
            title="Go to my location"
            buttonStyle={styles.button}
            onPress={this.getLocationHandler}
          />
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  actions
)(MapScreen);

const styles = {
  button: {
    backgroundColor: 'rgba(92, 99,216, 1)',
    borderColor: 'transparent',
    marginBottom: 10
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  }
};
