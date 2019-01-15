import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import * as actions from '../state/actions';
import { connect } from 'react-redux';

class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin();
    // AsyncStorage.removeItem('fb_token');
    this.onAuthComplete(this.props);
  }

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('map');
    }
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  render() {
    return (
      <View />
      //Add A Loading Spinner?
    );
  }
}

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(
  mapStateToProps,
  actions
)(AuthScreen);
