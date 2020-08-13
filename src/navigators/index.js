import React,{useState,useEffect} from 'react'
import {View,TouchableWithoutFeedback,Text,Dimensions} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/AntDesign';
import Home from '../pages/home'
import Login from '../pages/login'
import AsyncStorage from '@react-native-community/async-storage';



const Stack = createStackNavigator()


const App  = (props) => {
	const [data,changedata] = useState({})
    const [islogged,changelogged] = useState(false)

	const getMyObject = async (key) => {
	  try {
	    const jsonValue = await AsyncStorage.getItem('current')
	    if(jsonValue !== null){
	    	const temp = JSON.parse(jsonValue)
	    	changedata({})
	    	changedata(temp)
	    	changelogged(temp.islogged)
	    	console.log(temp)
	    	console.log(islogged)
	    }
	  } catch(e) {
	    console.log(e)
	  }
	
	  console.log('Done.')
	
	}
	
	useEffect(() => {
    	getMyObject()
    	changelogged(data['islogged'])
    	console.log(data['islogged'])
  	}, []);
    
	return(
		<NavigationContainer>
			<Stack.Navigator>
				{!islogged ? 
					(<Stack.Screen name="login" initialParams={{isLoggedIn: islogged, changelogged: changelogged}} component={Login}/>) : 
					(<Stack.Screen name="home" initialParams={{isLoggedIn: islogged, changelogged: changelogged}} component={Home} 
						 />)
				}				 
			</Stack.Navigator>
		</NavigationContainer>
	)
}
export default App