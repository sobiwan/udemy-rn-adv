import React, { Component } from 'react';
import { View, Platform, Text } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import Swipe from '../components/Swipe';
import { Card, Button } from 'react-native-elements';

class DeckScreen extends Component {
  renderCard(job) {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };

    return (
      <Card style={{ color: 'blue' }} title={job.jobtitle}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={
              Platform.OS === 'android' ? true : false
            }
            initialRegion={initialRegion}
          >
            <MapView.Marker coordinate={initialRegion} />
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
          renderNoMoreCards={this.renderNoMoreCards}
          keyProp="jobkey"
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

export default connect(mapStateToProps)(DeckScreen);
