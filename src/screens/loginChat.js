import React, { Component } from 'react';
import {View,Text,TextInput,TouchableOpacity} from "react-native";

export default class LoginChat extends Component {
    state={
        name:''
    }

    onPress=()=>{
        this.props.navigation.navigate('Chat',{name:this.state.name})
    };

    onHandleChange=(name)=>{

        this.setState({name})
    }
    render(){
        return(
            <View>
                <TextInput  placeholder="name"
                            onChangeText={this.onHandleChange}
                            value={this.state.name}
                            style={{width:300,height:40,borderWidth:1,borderColor:"black",marginBottom:10}}/>
                            <TouchableOpacity onPress={()=>this.onPress()} style={{width:40,height:40,backgroundColor:'blue',justifyContent:'center',borderRadius:40/2}}>
                                <Text style={{color:"white",textAlign:'center'}}>Go</Text>
                            </TouchableOpacity>
            </View>
        )
    }
}
