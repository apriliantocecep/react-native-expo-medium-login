import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { Medium } from "./src";

export default class App extends React.Component {

  handlePress = async () => {
    const result = await Medium.logInAsync({
      'client_id': '70eaa8fd5369',
      'scope': Medium.getScopes(),
      'state': 'my arbitary state'
    })

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
