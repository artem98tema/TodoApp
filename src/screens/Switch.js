import React,{Component,useState,useContext,createContext} from 'react';
import {View,Text,StyleSheet,Button} from 'react-native';

// export default class Switcher extends Component {
//     state={
//         backgroundColor:'white'
//     };
//     setDark=()=>{
//         this.setState({backgroundColor:'pink'})
//     };
//     setLight=()=>{
//         this.setState({backgroundColor:'white'})
//     };
//     render(){
//
//         return(
//             <View style={{flex:1,backgroundColor:this.state.backgroundColor}}>
//                 <Text>dfd</Text>
//                 <Button title='light' onPress={()=>this.setLight()}/>
//                 <Button title='dark' onPress={()=>this.setDark()}/>
//             </View>
//         )
//     }
// }
const AppStateContext = React.createContext();

const Switcher=()=>{
    const [color,setColor] = useState('white');
    const value = useContext(AppStateContext);
    const setLight = ()=>setColor('white');
    const setDark = ()=>setColor('black');

    return(
        <View style={{flex:1,backgroundColor:color}} value="sdsdsd">
            {/*<Button title='light' onPress={setLight} />*/}
            {/*<Button title='dark' onPress={()=>setDark()} />*/}
            <AppStateContext.Provider value="sdsssds">
                <Text>{value}</Text>
                <Text></Text>
            </AppStateContext.Provider>
        </View>
    )
};
export default Switcher;
