import React ,{Component} from 'react';
import {Text,View,TextInput,StyleSheet,Button,FlatList,TouchableOpacity,Animated} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends Component {

  state={
    text:'' ,
    list: [],
    count:0,
    fadeAnim: new Animated.Value(0),
  };


    componentDidMount = () => {
    this.getData();
    };

    addItem = (list,text) => {
        let copyText = text;
        let nestedCopyWithHack = JSON.parse(JSON.stringify(list));
        nestedCopyWithHack.push({todos:copyText,index:this.state.count++,isDone:false});
        this.setState({list:nestedCopyWithHack});
        let jsonValue = JSON.stringify(nestedCopyWithHack);
        AsyncStorage.setItem('saveList', jsonValue);
        this.setState({text:""});
    };

  delete = (list, index ) => {
      let nestedCopyWithHack = JSON.parse(JSON.stringify(list));
      nestedCopyWithHack.splice(index,1);
      this.setState({list:nestedCopyWithHack});
      let jsonValue = JSON.stringify(nestedCopyWithHack);
      AsyncStorage.setItem('saveList', jsonValue);
      console.log(nestedCopyWithHack.length);
  };

  doneTask = (list,index) => {
      let nestedCopyWithHack = JSON.parse(JSON.stringify(list));
      nestedCopyWithHack[index].isDone = !nestedCopyWithHack[index].isDone;
      this.setState({list:nestedCopyWithHack});
      let jsonValue = JSON.stringify(nestedCopyWithHack);
      AsyncStorage.setItem('saveList', jsonValue);


  };

    getData = async () => {
        try {
            let jsonValue = await AsyncStorage.getItem('saveList');
            let parseValue=  jsonValue != null ? JSON.parse(jsonValue) : [];
            this.setState({list:parseValue});
        } catch(e) {
            alert(e);
        }
    };

    handleChange=(text)=>{
        this.setState({text});
    };


    render(){
  let {list,text} = this.state;

  return(
      <View style={styles.container}>
        <Text style={styles.header}>ToDo app</Text>
        <View style={{height:"80%"}}>
          <FlatList data={list}
                    renderItem={({item, index})=>{
                    return(
                        <View key={index}  style={[styles.listbox]}>
                            <TouchableOpacity key={index}
                                      onPress={()=>{this.doneTask(list,index);
                            }}        style={styles.listbox_button}>
                            <Text style={[item.isDone?styles.done_text:styles.undone_text,{width:'80%'}]}>{item.todos}</Text>
                            </TouchableOpacity>
                            <Button  onPress={()=>this.delete(list,index)}
                                     title='Delete'/>
                        </View>
            )
                    }}/>

        </View>
        <TouchableOpacity  onPress={()=>{this.addItem(list,text)}}
                           style={styles.button} >
          <Text style={styles.button_text}>+</Text>
        </TouchableOpacity>
          <View style={styles.input_view}>
              <TextInput

                  onChangeText={this.handleChange}
                  value={text}
                  style={styles.input}/>
          </View>
      </View>
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
