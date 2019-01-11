
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const rootURL = 'https://us-central1-one-time-pass-auth.cloudfunctions.net'

export default class SignUpForm extends Component {
    state = { phone: ''};


    handleSumbit = async () => {
        try{
            await axios.post(`${rootURL}/createUser`, {phone: this.state.phone})
            await axios.post(`${rootURL}/requestOTP`, {phone: this.state.phone})
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
                <Button title="Submit" onPress={this.handleSumbit}/>
            </View>
        )
    }
}