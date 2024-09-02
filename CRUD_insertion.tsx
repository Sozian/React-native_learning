import React, { useState,useEffect } from 'react';
import { View, TextInput, Button ,Text, FlatList, StyleSheet} from 'react-native';
import database from '@react-native-firebase/database';

const App = () => {
  
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [message,setMessage]=useState('');
  const [users,setUsers]=useState<User[]>([]);

  type User = {
    id: string;
    name: string;
    age: string;
  };

  useEffect(() => {
    
      const fetchData = async () => {
        try {
          const snapshot = await database().ref('/users').once('value');
          const data = snapshot.val();
          let userList: User[] = [];
          if (data) {
            userList = Object.keys(data).map(key => ({
              id: key,
              ...data[key],
            }));
          }
          setUsers(userList);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
      fetchData();
  }, []);

  

  const addUser = () => {
    const reference = database().ref('/users').push();
    reference
      .set({
        name: name,
        age: age,
      })
      .then(() => {
        console.log('Data inserted successfully!');
        setMessage('Data inserted successfully!')
      })
      .catch(error => console.error('Error inserting data: ', error));
      setName('');
      setAge('');
  };

  return (
    <View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={text => setAge(text)}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Add User" onPress={addUser} />
      {message ?  <Text>{message}</Text> : null}
      <FlatList
        data={users}
        keyExtractor={item=>item.id}
        renderItem={({item})=>(
            <View style={styles.row}>
              <Text style={styles.cell}>{item.name}</Text>
              <Text style={styles.cell}>{item.age}</Text>
            </View>
        )}
        ListHeaderComponent={ 
          <View style={styles.header}>
            <Text style={styles.headerText}>Name</Text>
            <Text style={styles.headerText}>Age</Text>
          </View>
        }
        />
    </View>
    
  );
};
const styles=StyleSheet.create({
   input:{
    marginBottom:8,
    borderWidth:1,
    borderColor:'#ddd',
    padding:8
   },
   row:{
    flexDirection:'row',
    paddingVertical:8,
    borderBottomWidth:1,
    borderBottomColor:'#ddd'
   },
   cell:{
    flex:1,
    paddingHorizontal:8
   },
   header:{
     flexDirection:'row',
     borderBottomWidth: 2,
     borderBottomColor: '#ddd',
    backgroundColor: '#f9f9f9',
   },
   headerText:{
    flex:1,
    fontWeight:'bold',
   }
})

export default App;
