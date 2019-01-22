import React, { Component } from 'react';
import {
  View,
  Dimensions,
  ActivityIndicator, 
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { MapView, Permissions } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../state/actions';
import MultiSelect from 'react-native-multiple-select';

class MapScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Map',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name='my-location' size={30} color={tintColor} />
    }
  })


  state = {
    mapLoaded: false,
    region: {
      longitude: -122.4194,
      latitude: 37.7749,
      latitudeDelta: 0.09,
      longitudeDelta:
        (Dimensions.get('window').width /
          Dimensions.get('window').height) *
        0.09
    },
    selectedItems:[]
  };

  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const currentCoords = {
          longitude: pos.coords.longitude,
          latitude: pos.coords.latitude
        };

        this.goToLocation(currentCoords);
      }
    );
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

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
    console.log(this.state.selectedItems)
  };

  searchJobsButtonPress = () => {
    this.props.fetchJobs(
      this.state.region, this.state.selectedItems,
      () => {
        this.props.navigation.navigate('deck');
      }
    );
  };

  render() {
    const { selectedItems } = this.state;

    if (!this.state.mapLoaded) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center'
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={{ position: 'absolute', top: 50, flex: 1, zIndex: 99, left: 20, right: 20 }}>
          <MultiSelect
            hideTags
            items={items}
            uniqueKey="job"
            ref={(component) => { this.multiSelect = component }}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText="    What Type of Career is for YOU?"
            searchInputPlaceholderText="Choose Your Occupation..."
            onChangeInput={ (text)=> console.log(text)}
            // altFontFamily="ProximaNova-Light"
            tagRemoveIconColor="white"
            tagBorderColor="white"
            tagTextColor="white"
            selectedItemTextColor="black"
            selectedItemIconColor="black"
            itemTextColor="black"
            displayKey="job"
            searchInputStyle={{ color: '#CCC' }}
            submitButtonColor="#CCC"
            submitButtonText="Submit"
          />
          <View>
          {
            this.multiselect
             ? 
            this.multiselect.getSelectedItemsExt()
             :
             null
         }
          </View>
        </View>

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
            icon={{ name: 'my-location' }}
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

const items = [{
  job: 'sales',
  id: '92iijs7yta',
}, {
  job: 'developer',
  id: 'a0s0a8ssbsd',
}, {
  job: 'marketing',
  id: '16hbajsabsd',
}, {
  job: 'intern',
  id: 'nahs75a5sg',
}, {
  job: 'designer',
  id: '667atsas',
}, {
  job: 'hospitality',
  id: 'hsyasajs',
}, {
  job: 'manager',
  id: 'djsjudksjd',
}, {
  job: 'engineer',
  id: 'sdhyaysdj',
}, {
  job: 'assistant',
  id: 'suudydjsjd',
}];
