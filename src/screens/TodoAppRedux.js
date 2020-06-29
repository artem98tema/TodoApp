import 'react-native-gesture-handler';
import React from 'react';
import {View,Button,Text,TextInput,TouchableOpacit,Dimensions} from 'react-native';

const widthWindow = Dimensions.get('window').width;

export default class TodoAppRedux extends React.Component {

    state={
        count:0
    };

    increaseCount=()=>{
        this.setState({count:this.state.count+1})
    };

    decriseCount=()=>{
        this.setState({count:this.state.count-1})
    }
    render() {

        return (

            <View style={{flex:1}}>
            <View style={{height:50,backgroundColor:'purple'}}>
                <Text>Redux</Text>
            </View>

                <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',flex:1}}>
                    <TouchableOpacity onPress={()=>this.increaseCount()}>
                        <Text>Увеличить</Text>
                    </TouchableOpacity>
                    <Text>{this.state.count}</Text>
                    <TouchableOpacity onPress={()=>this.decriseCount()}>
                        <Text>уменшить</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
