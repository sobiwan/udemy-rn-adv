import React, { Component } from 'react';
import {
  View,
  Platform,
  Text
} from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import Swipe from '../components/Swipe';
import {
  Card,
  Button, 
  Icon
} from 'react-native-elements';
import * as actions from '../state/actions';

class DeckScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Jobs',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name='description' size={30} color={tintColor} />
    }
  })

  renderCard(job) {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };

    return (
      <Card title={job.jobtitle}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={
              Platform.OS === 'android'
            }
            initialRegion={initialRegion}
          >
            <MapView.Marker
              coordinate={initialRegion}
            />
          </MapView>
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <View style={styles.snippetContainer}>
          <Text>
            {job.snippet
              .replace(/<b>/g, '')
              .replace(/<\/b/g, '')}
          </Text>
        </View>
      </Card>
    );
  }

  renderNoMoreCards = () => {
    return (
      <Card title="No More Jobs">
        <Button
          title="Back To Map"
          large
          icon={{ name: 'my-location' }}
          backgroundColor="#03A9F4"
          onPress={() =>
            this.props.navigation.navigate('map')
          }
        />
      </Card>
    );
  };

  render() {
    return (
      <View style={{ marginTop: 10 }}>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={
            this.renderNoMoreCards
          }
          keyProp="jobkey"
          onSwipeRight={job =>
            this.props.likeJob(job)
          }
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  snippetContainer: {
    height: 80
  },
  headerContainer: {
    height: 100
  }
};

function mapStateToProps({ jobs }) {
  return { jobs: jobs.results };
}

export default connect(
  mapStateToProps,
  actions
)(DeckScreen);
