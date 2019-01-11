
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const rootURL = 'https://us-central1-one-time-pass-auth.cloudfunctions.net'

export default class SignInForm extends Component {
    state = { phone: '', code: ''};


    handleSumbit = async () => {
        const { phone, code } = this.state
        try {
            let { data } = await axios.post(`${rootURL}/verifyOTP`, {
                phone, code
            })

            firebase.auth().signInAndRetrieveDataWithCustomToken(data.token);
            
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <View>
                <View style={{ marginBottom: 10 }}>
                    <FormLabel>Enter Phone Number</FormLabel>
                    <FormInput 
                        value={this.state.phone}
                        onChangeText={ phone => this.setState({ phone })}
                    />
                </View>
                <View style={{ marginBottom: 10 }}>
                    <FormLabel>Enter Code</FormLabel>
                    <FormInput 
                        value={this.state.code}
                        onChangeText={ code => this.setState({ code })}
                    />
                </View>
                <Button title="Submit" onPress={this.handleSumbit}/>
            </View>
        )
    }
}