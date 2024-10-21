import React,{useState} from 'react'
import {View,TextView,StyleSheet,Text} from 'react-native'
import {Dropdown} from 'react-native-element-dropdown'
import { Picker } from '@react-native-picker/picker';

const App = () => {

  const [value,setValue]=useState(null);

  const [quesNo, setQuesNo] = useState(''); // for number of operand
  const [noOfQues, setNoOfQues] = useState('');

  const data =[
    {label:'option1', value:'1'},
    {label:'option2',value:'2'},
    {label:'option3',value:'3'},
    
  ];
 
  return (
    <View style={styles.container}>
      <Text>App</Text>
      <Dropdown
         style={styles.dropdown}
         data={data}
         labelField="label"
         valueField="value"
         value={value}
         onChange={item =>{
          setValue(item.value)
         }}
      />
      <Text style={styles.text}>Selected:{value}</Text>

      <Picker
                                selectedValue={noOfQues}
                                onValueChange={(itemValue) => setNoOfQues(itemValue)}

                            >
                                <Picker.Item label="Please Choose" value="" />
                                <Picker.Item label="10" value="10" />
                                <Picker.Item label="20" value="20" />
                                <Picker.Item label="30" value="30" />
                                <Picker.Item label="40" value="40" />
                                <Picker.Item label="50" value="50" />


                            </Picker>
    </View>
  )

 
}

const styles=StyleSheet.create({
  container: {
    padding: 20,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
  },
})



export default App

