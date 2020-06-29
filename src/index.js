import 'react-native-gesture-handler';
import React from 'react';
import {View,Button} from 'react-native';

export default class Home extends React.Component {
    render() {
        return (

            <View>
                <Button onPress={()=>this.props.navigation.navigate('TodoApp')} title='TodoApp'/>
                <Button onPress={()=>this.props.navigation.navigate('TodoAppRedux')} title='TodoAppWithRedux'/>
                <Button onPress={()=>this.props.navigation.navigate('Switch')} title='Switch'/>
                <Button onPress={()=>this.props.navigation.navigate('LoginChat')} title='LoginChat'/>
                <Button onPress={()=>this.props.navigation.navigate('Welcome')} title='Welcome'/>
            </View>
        );
    }
}
