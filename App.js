import React, {useState} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {TabView, TabBar} from "react-native-tab-view"
import convert from 'convert-units'
import MeasureView from "./components/MeasureView"
import Constants from 'expo-constants'

const measures = convert().measures()
const mainColor = '#20272F'
const BackColor = "#c2c2c2"

function unCamelCase(value) {
  return value.replace(/([A-Z])/g, ' $1')
}

export default function App() {
  const [index, setIndex] = useState(0);
  const [routes] = useState(
    measures.map(measure => ({key: measure, title: unCamelCase(measure)}))
  )
  const [value, setValue] = useState('0')

  const renderScene = ({route}) => {
    return <MeasureView measure={route.key} value={value} setValue={setValue} />
  }
  
  return (
    <View style={[styles.container, {marginTop: Constants.statusBarHeight}]}>
      <Text style={styles.title}>Unit converter</Text>
      <TabView navigationState={{index, routes}} 
        renderScene={renderScene} 
        onIndexChange={setIndex}
        initialLayout={{width: Dimensions.get('window').width}}
        renderTabBar={(props  => (
          <TabBar {...props} scrollEnabled tabStyle={{width: 'auto'}} style={{ backgroundColor: mainColor }} indicatorStyle={{ backgroundColor: 'white' }} />
          ))}
        >
      </TabView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackColor,
  },
  title: {
    padding: 15,
    fontWeight: 'bold',
    color: mainColor,
    fontSize: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
