import React, { Component }  from 'react'
import {View} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";

export default class Splach extends Component {
    componentDidMount() {
        let value = AsyncStorage.getItem('user');
        if (value !== null) {
            this.props.navigation.navigate('TodoApp');
        }
            this.props.navigation.navigate('Welcome');

    }
    render(){
        return(
            <View>

            </View>)
    }
}
