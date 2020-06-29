import 'react-native-gesture-handler';
import React ,{Component} from 'react';
import {Text,View,TextInput,StyleSheet,Button,FlatList,TouchableOpacity,Animated} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import TodoApp from "./src/screens/TodoApp";
import TodoAppRedux from './src/screens/TodoAppRedux';
import Home from "./src"
import Switch from "./src/screens/Switch"
import LoginChat from "./src/screens/loginChat";
import Chat from "./src/screens/Chat";
import Welcome from "./src/screens/Welcome";
import Splach from "./src/screens/Splash";

const Stack = createStackNavigator();

export default class App extends Component {



    render(){

const isLogeIn = AsyncStorage.getItem('user');
  return(
      <NavigationContainer>
      <Stack.Navigator>
          {/*<Stack.Screen name="Splach"  options={{ headerShown: false }} component={Splach} />*/}
          <Stack.Screen name="Welcome"  options={{ headerShown: false }} component={Welcome} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="TodoApp" options={{ headerShown: false }} component={TodoApp} />
          <Stack.Screen name="TodoAppRedux" component={TodoAppRedux} />
          <Stack.Screen name="Switch" component={Switch} />
          <Stack.Screen name="LoginChat" component={LoginChat} />
          <Stack.Screen name="Chat" component={Chat} />

      </Stack.Navigator>
          </NavigationContainer>
  )
}
};



const styles = StyleSheet.create({
    container: {
        height:'100%',
        // backgroundColor:'grey'
    },
    input: {
        height:40,
        width:'100%',
        borderWidth:1,
        borderColor:'black',marginTop:0
    }
    ,
    input_view:{
        flexDirection:'row',
        position:'absolute',
        bottom:0
    },
    done_text: {
        textDecorationLine: 'line-through'
    },
    undone_text: {
        textDecorationLine: 'none'
    },
    button:{
        width:50,
        height:50,
        backgroundColor:'blue',
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',

        position:'absolute',
        right:2,
        bottom:50,
        color:'white',alignSelf:'flex-end',marginRight:20,
},
    button_text:{
        color:'white',
        fontSize:35
    },
    header:{
        backgroundColor:'blue',
        color:'white',
        height:30,
        textAlign:'center',
        paddingTop:5
    },
    listbox:{
        flexDirection:'row'
    },
    listbox_button:{
        flexDirection:'row'
    },


});
