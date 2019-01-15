import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Slides extends Component {
  renderLastSlide(i) {
    if (i === this.props.data.length - 1) {
      return (
        <Button
          title="Let the Swiping Begin!"
          raised
          buttonStyle={styles.button}
          onPress={this.props.onSlidesComplete}
        />
      );
    }
  }

  renderSlides() {
    return this.props.data.map((slide, i) => {
      return (
        <View
          key={slide.text}
          style={[
            styles.slide,
            {
              backgroundColor: slide.color
            }
          ]}
        >
          <Text style={styles.slideText}>{slide.text}</Text>
          {this.renderLastSlide(i)}
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView
        horizontal
        style={{
          flex: 1
        }}
        pagingEnabled
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  slideText: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white'
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  button: {
    backgroundColor: '#0288D1',
    marginTop: 20
  }
});
