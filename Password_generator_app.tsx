import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React,{useState} from 'react';
import { Formik } from 'formik';
import BouncyCheckox from "react-native-bouncy-checkbox";

// form validation
import * as Yup from 'yup'



export default function App() {

  const [password,setPassword]=useState('');
  const [isPassword,setIsPasswordGenerated]=useState(false);
  // useState(false);

  const [lowerCase,setLowerCase]=useState(true);
  const [upperCase,setUpperCase]=useState(false);
  const [numbers,setNumbers]=useState(false);
  const [symbols,setSymbols]=useState(false);

  const PasswordSchema=Yup.object().shape({
    passwordLength:Yup.number()
    .min(4,'should be of min of 4 characters')
    .max(16,'should be max of 16 character')
    .required('length is required')
   })
   const generatePasswordString=(passwordLength:number) =>{
  
     let characterList='';
     const upperCaseChars='ABCDEFGHIJKLMNOPQRSTUVXYZ';
     const lowerCaseChars='abcdefghijklmnopqrstuv';
     const digitChars='0123456789';
     const specialChars='!@#$%^&*-+';
  
     if(upperCase){
      characterList +=upperCaseChars;
     }
     if(lowerCase){
       characterList+=lowerCaseChars;
     }
     if(numbers){
      characterList+=digitChars;
     }
     if(symbols){
      characterList+=specialChars;
     }

     const passwordResult=createPassword(characterList,passwordLength);
      
     setPassword(passwordResult);
     setIsPasswordGenerated(true);
     
  
   }
   const createPassword=(characters:string,passwordLength:number)=>{
       let result=''
       for(let i=0;i<passwordLength;i++){
        const characterIndex=Math.round(Math.random()*characters.length);
        result+=characters.charAt(characterIndex);
       }
       return result;
   }
   const resetPassword=()=>{
    setPassword('');
    setIsPasswordGenerated(true);
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  
   }
  
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.heading1}>Password Generator</Text>
        <Formik
          initialValues={{ passwordLength: '' }}
          validationSchema={PasswordSchema}
          onSubmit={values => {
            console.log(values);
            console.log("data sent")
            generatePasswordString(+values.passwordLength); // Adding + converts to number
          }}
        >
          {({
            values,
            errors,
            touched,
            isValid,
            handleChange,
            handleSubmit,
            isSubmitting,
            handleReset,
          }) => (
            <>
            <View style={styles.inputWrapper}>
              <View style={styles.inputColumn}>
                <Text style={styles.heading}>password Length</Text>
                {touched.passwordLength && errors.passwordLength &&(
                  <Text style={styles.errorText}>
                    {errors.passwordLength}
                  </Text>
                )}
              <TextInput
                style={styles.inputWrapper}  
                value={values.passwordLength}
                onChangeText={handleChange('passwordLength')}
                keyboardType="numeric"
                placeholder='please enter'
              
              />
              </View>
            </View>
           <View style={styles.inputWrapper}>
           <Text style={styles.heading}>Include LowerCase</Text>
            < BouncyCheckox
              disableBuiltInState
              isChecked={lowerCase}
              onPress={()=> setLowerCase(!lowerCase)}
              fillColor='#29AB87'
            />
           </View>
           <View style={styles.inputWrapper}>
           <Text style={styles.heading}>Include UpperCase</Text>
            < BouncyCheckox
              disableBuiltInState
              isChecked={upperCase}
              onPress={()=> setUpperCase(!upperCase)}
              fillColor='#29AB87'
            />
           </View>

           <View style={styles.inputWrapper}>
           <Text style={styles.heading}>Include Number</Text>
            < BouncyCheckox
              disableBuiltInState
              isChecked={numbers}
              onPress={()=> setNumbers(!numbers)}
              fillColor='#29AB87'
            />
           </View>
           <View style={styles.inputWrapper}>
           <Text style={styles.heading}>Include Symbol</Text>
            < BouncyCheckox
              disableBuiltInState
              isChecked={symbols}
              onPress={()=> setSymbols(!symbols)}
              fillColor='#29AB87'
            />
           </View>
           
           
              {/* Add any additional input fields here */}
              
              <View style={styles.formActions}>
                <TouchableOpacity 
                  disabled={!isValid}
                  style={styles.primaryBtn}
                  onPress={() => {
                    console.log('Button Pressed');
                    handleSubmit();
                  }}
                  
                >
                  <Text>Password Generator</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.secondaryBtn}
                  onPress={()=>{
                    handleReset();
                    resetPassword
                  }}
                >
                  <Text>Reset</Text>
                </TouchableOpacity>
              </View>
           
            </>
           
          )}
        </Formik>
      </View>
      {isPassword ?(
        <View style={[styles.card, styles.cardElevated]}>
        <Text style={styles.subTitle}>Result:</Text>
        <Text style={styles.description}>Long Press to copy</Text>
        <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
      </View>

      ):null}
    </SafeAreaView>
  </ScrollView>

  )
}

const styles = StyleSheet.create({
  heading1:{
     fontSize:20,
     fontWeight:'bold'
  },
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
})
