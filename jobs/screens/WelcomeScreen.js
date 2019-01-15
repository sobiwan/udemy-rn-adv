import _ from 'lodash';
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';

export default class WelcomeScreen extends Component {
  state = { token: null };

  async componentWillMount() {
    let token = await AsyncStorage.getItem('fb_token');

    if (token) {
      this.props.navigation.navigate('map');
      this.setState({ token });
    } else {
      this.setState({ token: false });
    }
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate('auth');
  };

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
    }

    return (
      <Slides
        data={SLIDE_DATA}
        onComplete={this.onSlidesComplete}
      />
    );
  }
}

const SLIDE_DATA = [
  {
    text:
      'Welcome to Career Match, here is how to use the app...',
    color: '#03A9F4'
  },
  {
    text:
      '...Set your ideal job location, return the opportunities closest to your prefered location...',
    color: '#009688'
  },
  {
    text:
      '...Watch the opportunities flow in and  swipe away to match with your favorites!',
    color: '#03A9F4'
  }
];
