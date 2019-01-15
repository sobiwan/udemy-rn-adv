import { FB_LOGIN_SUCCESS, FB_LOGIN_FAIL } from './types';
import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');

  if (token) {
    // Dispatch an action saying FB login is done
    dispatch({
      type: FB_LOGIN_SUCCESS,
      payload: token
    });
  } else {
    // Start up FB Login process
    doFacebookLogin(dispatch);
  }
};

const doFacebookLogin = async dispatch => {
  let {
    type,
    token
  } = await Facebook.logInWithReadPermissionsAsync(
    '959736667553223',
    {
      permissions: ['public_profile']
    }
  );
  if (type === 'cancel') {
    console.log('fail');
    return dispatch({
      type: FB_LOGIN_FAIL
    });
  }

  await AsyncStorage.setItem('fb_token', token);
  console.log('success');
  dispatch({
    type: FB_LOGIN_SUCCESS,
    payload: token
  });
};
