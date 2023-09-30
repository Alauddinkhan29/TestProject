import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Routes from './src/navigation/Routes'


const App = () => {
  return (
    <View style={styles.mainContainer}>

      <Routes />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  }
})