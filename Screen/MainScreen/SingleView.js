import { SafeAreaView, StatusBar, StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import { WindowHeight, WindowWidth } from '../GlobalCSS'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function SingleView({ route, navigation }) {
  let { item,allBooks } = route.params;


  const handleDelete=async()=>{
   // let value=await allBooks.filter((e)=>e!==item)
   // await AsyncStorage.setItem('Books ',JSON.stringify(value))
  //  console.log(value,'Remaining Books ');
    const updatedBooks = allBooks.filter(book => book.id !== item.id);
    await AsyncStorage.setItem('Books', JSON.stringify(updatedBooks));
    navigation.goBack()

  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View></View>
      <View>
        <Ionicons name='chevron-back-outline' size={25} color={'white'} style={styles.backIcon} onPress={() => navigation.goBack()} />
        <Feather name='edit-2' size={25} color={'white'} style={styles.EditIcon} onPress={() => navigation.navigate('Edit',{item:item,allBooks :allBooks })} />
        <Ionicons name='trash-outline' size={25} color={'white'} style={styles.DeleteIcon} onPress={handleDelete} />

        <Image resizeMode='cover' style={styles.image} source={{ uri: item.image }} />
      </View>


      <View style={styles.singleDetailDiv}>

        <ScrollView>

          <View style={styles.singleDetailDivInside}>


            <Text style={styles.BooksName}>{item.name}</Text>


            <View style={styles.BooksActions}>

              <View style={[styles.BooksActionsInside, { backgroundColor: 'rgba(240, 252, 136, 0.684)' }]}>
                <Feather name='smile' size={50} color={'black'} />
                <Text style={styles.AverageText}>{item.process}</Text>

              </View>
             
            </View>

           


            <View style={styles.instructionDiv}>
              <Text style={styles.instructionHeader}>Author:</Text>
              <Text>
                {item.author}
              </Text>


            </View>



            {/* Discription */}
            <View style={styles.instructionDiv}>
              <Text style={styles.instructionHeader}>Discription:</Text>
              <Text>
                {item.description}
              </Text>


            </View>



          </View>

        </ScrollView>

      </View>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  image: {
    height: WindowWidth * 0.7
  },
  singleDetailDiv: {
    backgroundColor: 'white',
    flex: 1,
    elevation: 10,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -30,
    paddingTop: 5
  },
  singleDetailDivInside: {
    flex: 1,
    margin: 18
  },
  backIcon: {
    position: 'absolute',
    top: 18,
    left: 20,
    zIndex: 10
  },
  EditIcon: {
    position: 'absolute',
    top: 18,
    right: 70,
    zIndex: 10,
    backgroundColor: 'blue',
    padding:5,
    borderRadius: 100,

  },

  DeleteIcon: {
    position: 'absolute',
    top: 18,
    right: 20,
    zIndex: 10,
    backgroundColor: 'red',
    padding:5,
    borderRadius: 100,

  },

  BooksName: {
    fontSize: 30,
    fontWeight: '500',
    margin: 5
  },
  BooksActions: {
    flexDirection: 'row',
    marginTop: 15,

  },

  BooksActionsInside: {
    height: 120,
    width: 102,
    borderRadius: 15,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ServeText: {
    paddingHorizontal: 10,
    marginTop: -2
  },
  AverageText: {
    marginTop: 8
  },
  minuteText: {
    marginTop: 6
  },

  instructionDiv: {
    paddingHorizontal: 2,
    marginBottom: 10,

  },
  instructionHeader: {
    fontSize: 23,
    marginVertical: 10,
  },

})