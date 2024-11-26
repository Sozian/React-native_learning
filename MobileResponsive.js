import { View, Text ,StyleSheet, SafeAreaView,Dimensions} from 'react-native'
import React from 'react'

const App = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
         <View style={styles.container1}>
          
          </View>
          <View style={styles.container2}>
          
          </View>
          <View style={styles.container3}>
          
          </View>
      </View>
        
    </SafeAreaView>
   
  )
}

const deviceWidth=Dimensions.get('window').width;

const styles=StyleSheet.create({

    container:{
       flexDirection:'column',
       gap:20,
       height:250,
       borderWidth:2,
       paddingStart:deviceWidth<3000 ? 5:30,
    },
    container1:{
       maxWidth:'80%',
      
       height:40,
       backgroundColor:'red',
       margin:10,
       paddingStart:deviceWidth<300 ? 5:20,
    },
    container2:{
       maxWidth:'80%',
       height:40,
       backgroundColor:'blue',
       margin:10,
       paddingStart:deviceWidth<300 ? 5:10,
    },
    container3:{
       maxWidth:'80%',
       height:40,
       backgroundColor:'green',
       margin:10,
       paddingStart:deviceWidth<300 ? 5:10,
    }
});

export default App
