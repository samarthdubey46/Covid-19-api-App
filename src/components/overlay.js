import React, { useState,useEffect } from 'react';
import {View,Text,Dimensions} from 'react-native'
import { Button, Overlay,Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { Base64 } from 'js-base64';





function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return true;
    }
    return false;
}
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}



const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const getAllKeys = async () => {
  let keys = []
  try {
    keys = await AsyncStorage.getAllKeys()
  } catch(e) {
    // read key error
  }

  console.log(keys)
}

const clearAll = async () => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    // clear error
  }

  console.log('Done.')
}


const App = (props) => {
	// const [change,]
  	const toggleOverlay = () => {
    	props.change(!props.visible);
  	};
  	const [name,changeName] = useState('')
	const [password,changePassword] = useState('')
	const [email,changeemail] = useState('')
	const [data,changedata] = useState({})
	const [err,changeerr] = useState('')
	useEffect(() => {
  	  changeerr(' ')
  	}, []);

	const getData = async (key) => {
	  try {
	  	let Json = {}
	    const jsonValue = await AsyncStorage.getItem('current')
	    if (jsonValue !== null && isEmpty(data)){
	    	changedata({})
	    	changedata(JSON.parse(jsonValue))
	    	console.log(JSON.parse(jsonValue))
	    }else{
	    	console.log("Empty")
	    }
	  } catch(e) {
	    	console.log(e)
	    	console.warn(e)
	    	return
	  }
	  return null
	}

	const storeData = async (name_,email_,password_) => {
	  if(name_.length > 0 &&  validateEmail(email) && password_.length > 4){
		  changedata({})
		  await getData(name)
		  const len = Object.keys(data).length
		  console.log(len)
		  await clearAll()
		  if(len === 0){
			  console.log("Started")
			  try {
			  	const value = {
			  		name:name,
			  		email:email,
			  		password:Base64.encode(password),
			  		islogged:false,
			  	}
			    const jsonValue = JSON.stringify(value)
			    await AsyncStorage.setItem('current', jsonValue)
			    console.log("Saved")
			    console.log(value)
			    changeemail('')
			    changePassword('')
			    changeName('')
			    changeerr("User Registered")
			  } catch (e) {
			    	console.log(e)
			    	console.warn(e)
			    	return 
			  }
			}
			return "User Alredy Registered"
		}else{
			changeerr("Enter Valid Details")}
	}
	
    return (
      <Overlay isVisible={props.visible} onBackdropPress={toggleOverlay} overlayStyle={{width:WIDTH / 1.2,height:HEIGHT / 2,alignItems:'center'}}>
        <Text style={{fontWeight:'bold',fontSize:22,letterSpacing:1}}>Register</Text>
        <View style={{width:WIDTH / 1.2,alignItems:'center',justifyContent:'center',height:HEIGHT / 2}}>
        <Input
		  placeholder='Username'
		  value={name}
		  leftIcon={{ type: 'material-community', name: 'account' }}
		  onChangeText={text => changeName(text)}
		/>
		<Input
		  placeholder='Password'
		  value={password}
		  secureTextEntry={true}
		  leftIcon={{ type: 'material-community', name: 'key' }}
		  onChangeText={text => changePassword(text)}
		/>
		<Input
		  placeholder='Email'
		  value={email}
	      errorStyle={{ color: 'red' }}
		  errorMessage={err}
		  leftIcon={{ type: 'material-community', name: 'email' }}
		  onChangeText={text => changeemail(text)}
		/>
		<Button
		  title="Register"
		  type="clear"
		  raised
		  onPress={() => storeData(name,email,password)}
		  titleStyle={{fontSize:20}}
		  buttonStyle={{alignSelf:'flex-end'}}
		/>
		</View>
      </Overlay>
  )
}
export default App