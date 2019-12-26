import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import TRUECALLER, {TRUECALLER_EVENT, TRUECALLER_CONSENT_MODE, TRUECALLER_CONSENT_TITLE} from 'react-native-truecaller-sdk';

class App extends Component {
  componentDidMount() {
    TRUECALLER.initializeClient(
      TRUECALLER_CONSENT_MODE.Popup,
      TRUECALLER_CONSENT_TITLE.Login
    );
    TRUECALLER.isUsable(result => {
      if (result === true) {
        console.log('Authenticate via truecaller flow can be used');
      } else {
        console.log(
          'Either truecaller app is not installed or user is not logged in',
        );
      }
    });
  }

  loginViaTruecaller = () => {
    TRUECALLER.requestTrueProfile();
    TRUECALLER.on(TRUECALLER_EVENT.TrueProfileResponse, profile => {
      console.log('Truecaller profile data: ', profile);
      let details = `${profile.firstName}, ${profile.email}, ${profile.phoneNumber}`
      alert(details);
      // add other logic here related to login/sign-up as per your use-case.
    });

    TRUECALLER.on(TRUECALLER_EVENT.TrueProfileResponseError, error => {
      console.log('User rejected the truecaller consent request! ', error);
    });
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: '#1180FF',
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: '#fff',
            fontSize: 22,
          }}>
          Truecaller
        </Text>
        <View
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={this.loginViaTruecaller} style={{
            padding: 10,
            backgroundColor: "#fff",
            elevation: 2
          }}>
            <Text style={{color: '#1180FF', fontSize: 22}}>
              Login via truecaller
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default App;
