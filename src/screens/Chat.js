import React, { Component } from 'react';
import {View,Text,TextInput,TouchableOpacity} from "react-native";

export default class Chat extends Component {
    static navigationOptions = ({navigation})=>({
        title:(navigation.styles.params || {}).name || "Chat"
    });
    state={
        messages: [],
    }
    render(){
        return(
            <View>
                <Text> Chat</Text>
            </View>
        )
    }
}
