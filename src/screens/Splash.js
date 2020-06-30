import React, { Component }  from 'react'
import {View} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";

export default class Splash extends Component {

    componentDidMount=async ()=> {
        let value = await  AsyncStorage.getItem('user');
        console.log(value);
        if (value !== null) {
            this.props.navigation.navigate('TodoApp');
        } else{
            this.props.navigation.navigate('Welcome');
        }


    }
    render(){
        return(
            <View>

            </View>)
    }
}
