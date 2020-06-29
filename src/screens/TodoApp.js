import 'react-native-gesture-handler';
import React ,{Component} from 'react';
import {Text,View,TextInput,StyleSheet,Button,FlatList,TouchableOpacity,Dimensions,Modal} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';


const widthWindow = Dimensions.get('screen').width;
export default class TodoApp extends Component {

    state={
        text:'' ,
        list: [],
        count:0,
        filter:'all',
        term:'',
        name:'',
        visible:false
    };


    componentDidMount = () => {
        this.getData();
        this.getName();
        console.log(this.state.name)
    };

    addItem = (list,text) => {
        let copyText = text;
        let nestedCopyWithHack = JSON.parse(JSON.stringify(list));
        nestedCopyWithHack.push({todos:copyText,index:this.state.count++,isDone:false});
        this.setState({list:nestedCopyWithHack});
        let jsonValue = JSON.stringify(nestedCopyWithHack);
        AsyncStorage.setItem('saveList', jsonValue);
        this.setState({text:""});
        this.visible();
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

    resertName= async ()=>{
      await  AsyncStorage.removeItem('user');
        this.props.navigation.navigate('Welcome');
    };

    getName= async ()=>{
        try {
            let value = await AsyncStorage.getItem('user');
            if(value !== null) {
                this.setState({name:value});

            }
        } catch (e){
            alert(e);
        }

    };

    getData = async () => {
        try {
            let jsonValue = await AsyncStorage.getItem('saveList');

            let parseValue=  jsonValue != null ? JSON.parse(jsonValue) : [];
            // let parseName=  userName != null ? JSON.parse(userName) : [];
            this.setState({list:parseValue});
            // this.setState({name:parseName});
        } catch(e) {
            alert(e);
        }
    };
visible=()=>{
    this.setState(({visible})=>{
       return {
           visible:!visible
       }
    });
};
    handleChange=(text)=>{
        this.setState({text});
    };
    handleChangeTerm=(term)=>{
        this.setState({term});
    };
    handleChangeFilter=(filter,label)=>{
        console.log(label);
        this.setState({filter:label});
    };

    filter=(list,filter)=>{
      switch (filter) {
          case 'All' :
              return list;
          case 'Not Completed':
              return list.filter((item)=>!item.isDone);
          case  'Completed':
              return(
                 list.filter((item)=>item.isDone)
              );
          default:
            return  list;
      }
    };

    buttons = [
        {name:'all',label:'All'},
        {name:'done',label:'Completed'},
        {name:'active',label:'Not Completed'},
    ];

    search=(list,term) =>{
      if(term.length===0){
          return list;
      }

      return list.filter((list)=>{
          return list.todos.toLowerCase().indexOf(term.toLowerCase()) > -1
      })
    };

    render(){
        let {list,text,filter,term} = this.state;
        const visibleItems = this.search(this.filter(list, filter), term);
        let letter = this.state.name[0];
        const buttons = this.buttons.map(({name,label})=>{
            return (
            <TouchableOpacity key={name}
                onPress={()=>this.handleChangeFilter(filter,label)}
                style={{marginRight: 10,marginLeft:10}}>
                <Text style={{color:'#B7B7B7',fontWeight:'bold'}}>{label}</Text>
            </TouchableOpacity>
            )
        });

        return(
            <View style={styles.container}>
                <View style={{marginTop:10,marginLeft:10,marginRight:10,flexDirection:'row',justifyContent:'space-between'}}>
                    <View>
                    <Text style={{fontSize:25,fontWeight:'bold',}}>Hey, {this.state.name}</Text>
                        <Text style={{fontSize:13,color:'#B7B7B7',fontWeight:'bold'}}>You have <Text style={{color:'#9C38FF'}}>{list.length} tasks</Text> to complete</Text>
                    </View>
                    <TouchableOpacity onLongPress={()=>this.resertName()} style={{width:50,height:50,borderRadius:50,backgroundColor:'#9C38FF',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{color:'white',fontWeight:'bold',fontSize:25,textTransform:'uppercase'}}>{letter}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row',marginVertical: 10,justifyContent:'flex-start'}}>
                    {buttons}
                </View>
                <View style={{marginBottom:10,marginHorizontal:15,}}>
                    <TextInput style={styles.input}
                                onChangeText={this.handleChangeTerm}
                               placeholder='Search'
                    value={term}/>
                </View>
                <View >
                    <FlatList data={visibleItems}
                              style={{height:'65%'}}
                              renderItem={({item, index})=>{
                                  return(
                                      <View key={index}
                                            style={[styles.listbox,{marginHorizontal:15}]}>
                                          <TouchableOpacity onLongPress={()=>this.delete(list,index)}
                                              key={index}
                                                            onPress={()=>{this.doneTask(list,index);
                                                            }}        style={styles.listbox_button}>
                                              <Text style={[item.isDone?styles.done_text:styles.undone_text,
                                                  {fontWeight:'bold',color:'#9C38FF',paddingLeft:10,paddingTop:5}]}>{item.todos}</Text>
                                              {item.isDone?(<View style={{height:18,width:18,borderRadius:18/2,borderWidth:1,borderColor:'#45CF39',marginRight:10,backgroundColor:'#45CF39',justifyContent:'center',alignItems:'center'}}>
                                                  <Text style={{color:'white',fontSize:9}}>✔</Text>
                                              </View>):<View style={styles.undoneCirle}/>}

                                          </TouchableOpacity>

                                      </View>
                                  )
                              }}/>

                </View>


                <View style={{justifyContent:'flex-end',flex:1,marginBottom:60}}>
                    <TouchableOpacity onPress={()=>this.visible()}
                                      // onPress={()=>{this.addItem(list,text)}}
                                      style={{alignSelf:'center',width:200,height:50,backgroundColor:'#E4CCFC',borderRadius:200/2,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'#7512D7',fontWeight:'bold'}}>+ Add a new task</Text>
                    </TouchableOpacity>
                </View>

                <Modal style={{flex:1,justifyContent: 'space-between',backgroundColor:'#9C38FF'}} visible={this.state.visible} animationType='slide'>
                    <View style={{flex:1,justifyContent: 'space-between'}}>
                        <View >
                            <View style={{backgroundColor:'#9C38FF',height:100,position:'absolute',width:'100%',flexDirection:'row',paddingTop:25}}>
                                <TouchableOpacity onPress={()=>this.visible()}
                                    style={{marginRight:30,paddingLeft:15}}><Text style={{color:'white',fontSize:25}}>×</Text></TouchableOpacity>
                            <Text style={{color:'white',fontSize:25}}>Add Task</Text>
                            </View>
                            <View style={{backgroundColor:'white',borderTopLeftRadius:20,borderTopRightRadius:20,marginTop:70}}>
                    <TextInput
                        multiline={true}
                        placeholder={'What would you like to add here ?'}
                        onChangeText={this.handleChange}
                        value={text}
                        style={{width:'100%',fontSize:30,borderTopEndRadius:5,borderTopLeftRadius:5}}/>
                        </View>
                        </View>
                    <TouchableOpacity onPress={()=>this.addItem(list,text)}
                        // onPress={()=>{this.addItem(list,text)}}
                                      style={{width:100,height:50,backgroundColor:'#E4CCFC',borderRadius:100/2,justifyContent:'center',alignSelf:'flex-end',alignItems:'center',marginBottom:10,marginRight:10}}>
                        <Text style={{color:'#7512D7',fontWeight:'bold'}}>Add Task</Text>
                    </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        )
    }
};
const styles = StyleSheet.create({
    container: {
        height:'100%',
        width:widthWindow,
        backgroundColor:'white',
        paddingHorizontal:5

    },
    input: {
        height:40,
        width:'100%',
        borderWidth:1,
        borderColor:'#E4CCFC',
        marginTop:0,
        borderRadius:5,
        color:'#E4CCFC'
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
        flexDirection:'row',
        marginTop: 5,
        height:50,
        borderRadius:5,
        elevation:5,
        backgroundColor:'white',
        marginBottom:10
    },
    listbox_button:{
        flexDirection:'row',
        height:"100%",
        width:'100%',
        justifyContent: 'space-between',alignItems: 'center'

    },
    visible:{
        display:'flex'
    },
    invisible:{
        display:'none'
    },
    doneCirle:{

    },
    undoneCirle:{
        height:10,width:10,borderRadius:5,borderWidth:1,borderColor:'#9C38FF',marginRight:10
    }

});
