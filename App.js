import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, FlatList, Text, View,SafeAreaView,Image,ActivityIndicator,TouchableHighlight} from 'react-native';
import firebaseApp from './firebase';
import database from 'firebase/compat/database';
import { Divider } from "react-native-elements";
import {ExpandableListView} from 'react-native-expandable-listview';
export default function App() {
  
  const[snaps,setSnaps]=useState([])
  const [cases, setCases] = useState({});
  let array=[]
  const getdata=()=>{
    firebaseApp.database().ref().child('missing data')
        .once('value').then((snapshot)=>{
            snapshot.forEach(element=>{
                array.push(element.val())
            })  
            setSnaps(array)
        }) 
}
const Details=(props)=>{
  return <View style={{flex:1,flexDirection:'column'}}>
    <Text>{props.case.age}</Text>
    <Text>{props.case.gender}</Text>
    <Text>{props.case.description}</Text>
  </View>
}
useEffect(() => {
     const getDetails=async()=>{
          await getdata()
          
      }
      getDetails();
      
},[snaps])
const onCase=({item})=>{
 return <TouchableHighlight onPress={()=>setCases(item)}>
  <View  style={styles.items}>
    <View style={styles.imageContainer}>
      <Image source={{uri:`${item.url}`,}} style={styles.image}/>
    </View>
    <Text style={styles.name}>{item.firstname+' '+item.lastname}</Text>
    {cases? <Details case={cases}/>:null}
  </View>
  
  </TouchableHighlight>
}
const headerComponent=()=>{
  return <View>

    <Text style={styles.listheadline}>Missing Cases</Text>
    <Divider  insetType='middle'  orientation='vertical' />
  </View>
}
const itemSeparator =()=>{
  return <View style={styles.separator}></View>
}
  return (
   <SafeAreaView>
     {!snaps && <ActivityIndicator size='large' />}
    {snaps &&
    <FlatList 
      
      ListHeaderComponentStyle={styles.listheader}
      ListHeaderComponent={headerComponent}
      data={snaps}
      renderItem={onCase}
      ItemSeparatorComponent={itemSeparator}
      
    />
    
}
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listheader: {
    height:55,
    alignItems:'center',
    justifyContent:'center'
  },
  listheadline: {
    color:'#333',
    fontSize:25,
    fontWeight:'bold',
    marginTop:7
  },
  items:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    paddingVertical:13
  },
  imageContainer:{
    
    height:89,
    width:89,
    justifyContent:'center',
    alignItems:'center'
  },
  image:{
    borderRadius:100,
    height:55,
    width:55
  },
  name:{
    fontWeight:"600",
    fontSize:16,
    marginLeft:13
  },
  separator: {
    height:1,
    width:'100%',
    backgroundColor:'#CCC'
  },
});
