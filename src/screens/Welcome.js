import React,{Component} from 'react';
import {View,Text,TextInput,TouchableOpacity,Image,KeyboardAvoidingView,StyleSheet,Animated,Dimensions} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
const widthWindow = Dimensions.get('screen').width;
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
            toValue:0.5,duration:900
        }).start()
    };

    animBack=()=>{
        const {animated} = this.state;
        Animated.timing(animated,{
            toValue:1,duration:1000
        }).start()
    };

    gotop=()=>{
        const {animated} = this.state;
    };

    goBacks=()=>{

    }
    render(){
        const {animated} = this.state;
        return(
            <KeyboardAvoidingView  behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={{backgroundColor:'white',alignItems:'center',flexDirection:'column',height:'100%'}}>

                <Animated.View style={{paddingTop:"10%",paddingBottom:40,transform:[
                        {
                            scale:animated
                        }

                    ]}}>
                    <Animated.Image style={[styles.trigerOff,]} source={require("../img/undraw_just_saying.png")}/>
                </Animated.View>


                <Animated.View style={{width:'100%',backgroundColor:'white',alignItems:'center',height:'auto',transform: [{
                        translateY: this.state.animated.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-200, 1]
                        })
                    }]}}>
                    <View style={{paddingBottom:50}}>
                        <Text style={{fontWeight:'bold',textAlign:'center',fontSize:35,marginBottom:5}}>Welcome</Text>
                        <Text style={{fontSize:20}}>Can you type your name for me?</Text>
                    </View>

                    <View >
                        <View style={{paddingBottom:20,width:widthWindow,height:80,paddingLeft:40,paddingRight:40}}>
                        <TextInput placeholderTextfontWeight='bold'
                                onFocus={()=>this.anim()}
                                onBlur={()=>this.animBack()}
                               value={this.state.name}
                               onChangeText={this.handleName}
                               placeholderTextColor='#CB98FC'
                               placeholder='Your name ...'
                                   // onSubmitEditing={()=>this.onPress(this.state.name)}
                                   // onSubmit={()=>this.onPress(this.state.name)}
                               style={{borderBottomWidth:1,borderColor:'#E4CCFC',color:'#E4CCFC',fontWeight:'bold',fontSize:15,}}/>
                        </View>
                        <TouchableOpacity
                            onPress={()=>this.onPress(this.state.name)}
                            // onPress={()=>this.anim()}
                                          style={{alignSelf:'center',width:200,height:50,backgroundColor:'#E4CCFC',
                                              borderRadius:200/2,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'#7512D7',fontWeight:'bold'}}>Let's start</Text>
                        </TouchableOpacity>
                </View>
                </Animated.View>


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
