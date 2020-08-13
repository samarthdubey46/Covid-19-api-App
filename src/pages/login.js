import React,{useState,useEffect} from 'react'
import {View,Text,Dimensions,TouchableOpacity} from 'react-native'
import {Card,Input,Button} from 'react-native-elements'
import Overlay from '../components/overlay'
import AsyncStorage from '@react-native-community/async-storage';
import { Base64 } from 'js-base64';


const clearAll = async () => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    // clear error
  }

  console.log('Done.')
}


const WIDTH = Dimensions.get('screen').width
const App = (props) => {
	
	const {navigation} = props
	const {route} = props
	const [name,changeName] = useState('')
	const [password,changePassword] = useState('')
	const [err,changeerr] = useState('')
	const [visible,changevisible] = useState(false)
	const [data,changedata] = useState({})
	const [isvalid,changevalid] = useState(false)

    const clearAll = async () => {
	  try {
	    await AsyncStorage.clear()
	  } catch(e) {
	    	console.log(e)
	  }
	
	  console.log('Done.')
	}

	const setObjectValue = async (value) => {
	  try {
	    const jsonValue = JSON.stringify(value)
	    await AsyncStorage.setItem('current', jsonValue)
	  } catch(e) {
	  	console.log('Error')

	  }
	
	  console.log('Done.')
	}

	const getMyObject = async (key) => {
	  try {
	    const jsonValue = await AsyncStorage.getItem('current')
	    if(jsonValue !== null){
	    	const temp = JSON.parse(jsonValue)
	    	if(temp['islogged'] === true){
	    		console.log("ASd")
	    	}
	    	console.log(temp)
	    	changedata({})
	    	changedata(temp)
	    }
	  } catch(e) {
	    console.log(e)
	  }
	
	  console.log('Done.')
	
	}
	useEffect(() => {
    	getMyObject()
    	console.log(data['islogged'])
  	}, []);
	const Login = async (name,password) => {
		changedata({})
		await getMyObject()
		const len = Object.keys(data).length
		console.log(len)
		if(len > 0){
			const isnamevalid = String(name) === String(data['name'])
			const ispasswordvalid = String(password) === String(Base64.decode(data['password']))
			if(isnamevalid && ispasswordvalid){
				data['islogged'] = true
				await clearAll()
				await setObjectValue(data)
				route.params.changelogged(true)
			}else{
				changeerr('Enter Valid Details')
			}
		}else{
			changeerr('No one registered')
		}
	}

	return(
		<View style={{flex:1}}>
			<View style={{marginBottom:0,flex:.5,elevation:40,backgroundColor:'#008cde',alignItems:'center',justifyContent:'center'}}>
				<Text style={{fontSize:45,letterSpacing:2,color:'white',fontWeight:'900'}}>Welcome</Text>
			</View>
			<Card containerStyle={{flex:1,marginLeft:0,marginTop:0,marginRight:0,justifyContent:'center',}}>
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
				  errorStyle={{ color: 'red' }}
		  		  errorMessage={err}
				  onChangeText={text => changePassword(text)}
				/>
				<Button
				  title="Log In"
				  type="clear"
				  raised
				  onPress={() => Login(name,password)}
				  titleStyle={{fontSize:20}}
				  buttonStyle={{alignSelf:'flex-end'}}
				/>
				<TouchableOpacity onPress={() => changevisible(!visible)}>
					<Text style={{alignSelf:'center',paddingVertical:10,color:'#0e9bed',fontSize:19}}>Dont Have a account  Register</Text>
				</TouchableOpacity>
			</Card>
				<Overlay visible={visible} change={changevisible}/>
		</View>
	)
}
export default App