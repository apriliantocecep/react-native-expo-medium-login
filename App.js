import React from 'react';
import { AuthSession } from "expo";
import { StyleSheet, Text, View, Button } from 'react-native';

// import Medium  from "./src";

export default class App extends React.Component {

  handlePress = async () => {

    var m = require('./src')

    let medium = new m.Medium({
      client_id: '70eaa8fd5369',
      client_secret: 'f3c21130d72eafc0046dd8506051fdbc2b9e3b1f'
    });

    var redirect_url = AuthSession.getRedirectUrl();

    var authUrl = medium.getAuthorizationUrl('my state', redirect_url, medium.scopes());

    const result = await AuthSession.startAsync({
      authUrl: authUrl
    });

    console.log(result);
  }

  render() {
    return (
      <View style={styles.container}>
        <Button 
          title="Login with Medium"
          onPress={this.handlePress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
