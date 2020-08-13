import React,{useState,useEffect} from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import { SearchBar,Button,Card } from 'react-native-elements';


const App = (props) => {
	const {navigation, route} = props
	const [search,chanesearch] = useState('')
	const [data,changedata] = useState({})
	const [country,changecountry] = useState({})
	const [name,changename] = useState('')
	const [email,changeemail] = useState('')
	const setObjectValue = async (value) => {
		  try {
		    const jsonValue = JSON.stringify(value)
		    await AsyncStorage.setItem('current', jsonValue)
		  } catch(e) {
		    // save error
		  }
		
		  console.log('Done.')
		}
	const getMyObject = async () => {
		  try {
		    const jsonValue = await AsyncStorage.getItem('current')
		    if(jsonValue !== null){
		    	changedata(JSON.parse(jsonValue))
		    	changename(JSON.parse(jsonValue)['name'])
		    	changeemail(JSON.parse(jsonValue)['email'])
		    }
		  } catch(e) {
		  	console.log(e)
		  }
		
		  console.log('Done.')
		
		}
	const logout = async (props) => {
		const len = Object.keys(data).length
		console.log(data)
		if(len > 0){
			data['islogged'] = false
			await setObjectValue(data)
			route.params.changelogged(false)
		}
	
	}

	useEffect(()  => {
    	getMyObject()
		changecountry({})
		changeerr('')
    	console.log(data['islogged'])
  	}, []);
	const url = 'https://coronavirus-19-api.herokuapp.com/countries/'
	const [err,changeerr] = useState('')
	const fetchData = async (text) => {
			if(text.length > 0){
				try{
					changeerr('')
					console.log("sy")
					const res = await fetch(url + text)
					const json = await res.json()
					changecountry({})
					len = Object.keys(country).length
					if(len === 0 ){
						changeerr('No Matching found for' + String(search))
					}else{
					}
					changecountry(json)					

					chanesearch('')
					let len = 0
					console.log(country)
					
				} catch(e) {
					console.warn(e)
				}
			}
		}

	return(
		<View style={{flex:1}}>
			<View style={{flex:.35}}>
			      <SearchBar
			      	containerStyle={{backgroundColor:'white'}}
			      	inputContainerStyle={{backgroundColor:'white'}}
			      	lightTheme
      			    placeholder="Search"
      			    onChangeText={text => chanesearch(text)}
      			    value={search}
      			  />
      			  <Button title="Search" onPress={() => fetchData(String(search).toLowerCase())} buttonStyle={{alignSelf:'flex-end',paddingHorizontal:40}} />
      			  <Text style={{fontSize:16,letterSpacing:1,alignSelf:'center'}}>Hello : {data['name']}</Text>
      			  <Text style={{fontSize:16,letterSpacing:1,alignSelf:'center'}}>{data['email']}</Text>
		  	</View>
			<View style={{flex:.95}}>
				{Object.keys(country).length > 0 && (
					<Card title={country['country']} containerStyle={{height:270}} >
						<View style={{flexDirection:'row',justifyContent:'space-around',flex:1}}>
							<View>
								<Text style={{fontSize:16,opacity:.7,fontWeight:'bold',paddingBottom:10}}>Total Cases - </Text>
								<Text style={{fontSize:16,opacity:.7,fontWeight:'bold',paddingBottom:10}}>Total Recovered - </Text>
								<Text style={{fontSize:16,opacity:.7,fontWeight:'bold',paddingBottom:10}}>Total Died - </Text>
								<Text style={{fontSize:16,opacity:.7,fontWeight:'bold',paddingBottom:10}}>Cases Today - </Text>
								<Text style={{fontSize:16,opacity:.7,fontWeight:'bold',paddingBottom:10}}>Total Tests - </Text>
								<Text style={{fontSize:16,opacity:.7,fontWeight:'bold',paddingBottom:10}}> Critical - </Text>

							</View>
							<View>
								<Text style={{fontSize:16,opacity:.7,fontWeight:'bold',paddingBottom:10}}>{String(country['cases'])}</Text>
								<Text style={{fontSize:16,opacity:.7,fontWeight:'bold',paddingBottom:10}}>{String(country['recovered'])}</Text>
								<Text style={{fontSize:16,opacity:.7,fontWeight:'bold',paddingBottom:10}}>{String(country['deaths'])}</Text>
								<Text style={{fontSize:16,opacity:.7,fontWeight:'bold',paddingBottom:10}}>{String(country['todayCases'])}</Text>
								<Text style={{fontSize:16,opacity:.7,fontWeight:'bold',paddingBottom:10}}>{String(country['totalTests'])}</Text>
								<Text style={{fontSize:16,opacity:.7,fontWeight:'bold',paddingBottom:10}}>{String(country['critical'])}</Text>

							</View>
						</View>
					</Card>
				)}
			</View>
			<View  style={{backgroundColor:'black',padding:0,}}>
				<Button onPress={() => logout()} title="logout" />
			</View>
		</View>
	)
}
export default App
