import React,{Component} from 'react';
import {View,Text,TextInput,TouchableOpacity,Image,KeyboardAvoidingView,StyleSheet,Animated} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

export default class Welcome extends Component {
    state={
        name:null,
        triger:false,
        animated : new Animated.Value(1)
    };

    // componentDidMount() {
    //     let value = AsyncStorage.getItem('user');
    //     if (value !== null) {
    //         this.props.navigation.navigate('TodoApp');
    //     }
    // }

    handleName = (name)=>{
        this.setState({name});
    };

    onPress = (name)=>{
        let user = name;
        AsyncStorage.setItem('user', user);
        this.props.navigation.navigate('TodoApp');
    };

    anim=()=>{
        const {animated} = this.state;
        Animated.timing(animated,{
            toValue:0.5,duration:800
        }).start()
    };

    animBack=()=>{
        const {animated} = this.state;
        Animated.timing(animated,{
            toValue:1,duration:1000
        }).start()
    };

    render(){
        const {animated} = this.state;
        return(
            <KeyboardAvoidingView  behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={{flex:1,backgroundColor:'white',alignItems:'center',flexDirection:'column'}}>

                <View style={{marginTop:100,flex:1,marginBottom:40}}>
                    <Animated.Image style={[styles.trigerOff,{transform:[
                            {
                                scale:animated
                            }

                        ]}]} source={require("../img/undraw_just_saying.png")}/>
                </View>


                <View style={{flex:2,width:'100%',justifyContent:'space-between',alignItems:'center'}}>
                    <View style={{marginBottom:20,flex:1}}>
                        <Text style={{fontWeight:'bold',textAlign:'center',fontSize:35,marginBottom:5}}>Welcome</Text>
                        <Text style={{fontSize:20}}>Can you type your name for me?</Text>
                    </View>

                    <View  style={{flex:2,width:'100%',paddingHorizontal:50,}}>
                        <TextInput placeholderTextfontWeight='bold'
                                onFocus={()=>this.anim()}
                                onBlur={()=>this.animBack()}
                               value={this.state.name}
                               onChangeText={this.handleName}
                               placeholderTextColor='#CB98FC'
                               placeholder='Your name ...'
                                   // onSubmitEditing={()=>this.onPress(this.state.name)}
                                   // onSubmit={()=>this.onPress(this.state.name)}
                               style={{borderBottomWidth:1,borderColor:'#E4CCFC',color:'#E4CCFC',fontWeight:'bold',fontSize:15,marginBottom:30}}/>

                        <TouchableOpacity
                            onPress={()=>this.onPress(this.state.name)}
                            // onPress={()=>this.anim()}
                                          style={{alignSelf:'center',width:200,height:50,backgroundColor:'#E4CCFC',
                                              borderRadius:200/2,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'#7512D7',fontWeight:'bold'}}>Let's start</Text>
                        </TouchableOpacity>
                </View>
                </View>


            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    trigerOff:{
        height:250,
        width:250
    },
    triggerOn:{
        height:150,
        width:150
    }
});
