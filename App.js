import React ,{Component} from 'react';
import {Text,View,TextInput,StyleSheet,Button,FlatList,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
export default class App extends Component {

  state={
    text:'',
    done:false,
    list: [{todos:'1',index:0,isDone:false},{todos:'2',index:1,isDone:true},{todos:'3',index:2,isDone:false},]

  };



  addItem = async ()=>{
    let copyList = this.state.list;
    let text = this.state.text;
    copyList.push({todos:text,index:Math.random(),isDone:false});

    this.setState({list:copyList});
    try {
        const jsonValue = JSON.stringify(this.state.list);
        await AsyncStorage.setItem('saveList', jsonValue);
        console.log(jsonValue);
    } catch (e) {
        alert(e)
    }

  };


  delite = async (item,index)=>{
        let copyList = this.state.list;
        copyList.splice(index,1);
        this.setState({list:copyList});
      try {
          const jsonValue = JSON.stringify(this.state.list);
          await AsyncStorage.setItem('saveList', jsonValue);
          console.log(jsonValue);
      } catch (e) {
          alert(e)
      }
  };
  doneTask = async  (index)=>{
      let copyList = this.state.list;
      copyList[index].isDone = !copyList[index].isDone;
      this.setState({list:copyList});
      try {
          const jsonValue = JSON.stringify(this.state.list);
          await AsyncStorage.setItem('saveList', jsonValue);
          console.log(jsonValue);
      } catch (e) {
          alert(e)
      }
      // alert(this.state.list[index].isDone);
  };

  componentDidMount= async ()=> {

      try {
          let {list} = this.state;
          let jsonValue = await AsyncStorage.getItem('saveList');
          let parsed = JSON.parse(jsonValue);
          // alert(jsonValue);
          this.setState({list:parsed});
      } catch(e) {
          alert(e);
      }

  };

    render(){
  let {list} = this.state;

  return(
      <View style={styles.container}>
        <Text style={styles.header}>ToDo app</Text>
        <View style={styles.input_view}>
          <TextInput

              onChangeText={(text)=>this.setState({text})}
              value={this.state.value}
              style={styles.input}/>
        </View>
        <View>
          <FlatList data={list} renderItem={({item, index})=>{
            return(
                <View  style={styles.listbox}>
                <TouchableOpacity key={index}  onPress={()=>this.doneTask(index)} style={styles.listbox_button}>
                  <Text style={[item.isDone?styles.done_text:styles.undone_text,{width:'80%'}]}>{item.todos}</Text>
                </TouchableOpacity>
                    <Button  onPress={()=>this.delite(item,index)} title='Delete'/>
                </View>
            )
          }}/>

        </View>
        <TouchableOpacity  onPress={this.addItem} style={styles.button} >
          <Text style={styles.button_text}>+</Text>
        </TouchableOpacity>
      </View>
  )
}
};
const styles = StyleSheet.create({
    container: {
        height:'100%'
    },
    input: {
        height:40,
        width:'100%',
        borderWidth:1,
        borderColor:'black'
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
        right:20,
        bottom:50,
        color:'white'
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
