import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

export default ({navigation}) => (
  <View style={styles.container}>
    <Text style={styles.text}>Something went wrong at our end.</Text>
    <View style={styles.button}>
      <Button
        title="Retry"
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {padding: 10, fontSize: 20, lineHeight: 30},
  button: {marginTop: 30, padding: 10},
});
