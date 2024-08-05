import { Button, SafeAreaView, ScrollView,ScrollViewRef, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { WindowWidth } from '../GlobalCSS'
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Insert({ navigation }) {
  const [book, setBook] = useState({
    name: '',
    image: null,
    description: '',
    author: '',
  });


  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const handleInputChange = (type, value) => {
    setBook({ ...book, [type]: value });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setBook({ ...book, image: result.uri });
    }
  };

  const SubmitBooks = async () => {
    try {
      let initialValue = await AsyncStorage.getItem('Books');
      let parsedInitialValue = JSON.parse(initialValue) || [];
      
      let id = parsedInitialValue.length === 0 ? 101 : parsedInitialValue[parsedInitialValue.length - 1].id + 1;
      
      let value = { ...book, id, process:selectedDifficulty };
      let allBooksData = [...parsedInitialValue, value];
      
      await AsyncStorage.setItem('Books', JSON.stringify(allBooksData));
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access media library denied');
      }
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView ref={ScrollViewRef} >

        <View style={styles.mainInsertDiv}>

          <Text style={styles.insertBooksHeader}>
            Let's Add a Book
          </Text>

          <View style={styles.InputParent}>
          

            <View style={styles.inputDiv}>
              <Text style={styles.BooksLabel}>Book name</Text>
              <TextInput style={styles.input} value={book.name} onChangeText={(name) => handleInputChange('name', name)} />
            </View>

            {/* 2 items */}
            {/* <View style={styles.TwoItems}> */}
              <View style={styles.imageDiv}>

                <TouchableOpacity onPress={pickImage} style={styles.PickImageDiv}>
                  <Text style={styles.PickImageLabel}>Pick image</Text>
                </TouchableOpacity>

                {book.image && (
                  <Image source={{ uri: book.image }} style={styles.image} />
                )}

              </View>
             
     

            <View style={styles.inputDiv}>
              <Text style={styles.BooksLabel}>Books Discription</Text>
              <TextInput style={styles.Instructioninput} value={book.description} multiline onChangeText={(description) => handleInputChange('description', description)} />
            </View>



            <View style={styles.inputDiv}>
              <Text style={styles.BooksLabel}>Difficulty Level!</Text>

              <View style={styles.BooksProcessOptionDiv}>
                <TouchableOpacity onPress={() => setSelectedDifficulty('Easy')}>
                  <Text style={[styles.Options, selectedDifficulty === 'Easy' && styles.Selected]}>Easy</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setSelectedDifficulty('Hard')}>
                  <Text style={[styles.Options, selectedDifficulty === 'Hard' && styles.Selected]}>Hard</Text>
                </TouchableOpacity>
              </View>
            </View>




            <View style={styles.inputDiv}>
              <Text style={styles.BooksLabel}>Books author</Text>
              <TextInput
            style={styles.input}
            
            value={book.author}
            onChangeText={(author) =>setBook({ ...book, author })}
          />
            </View>


          </View>

          {/* button */}
          <View style={styles.BtnMainDiv}>
            <TouchableOpacity style={styles.BtnDiv} onPress={SubmitBooks}>
              <Text style={styles.BtnText}>Submit</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainInsertDiv: {
    // backgroundColor: 'yellow',
    flex: 1,
  },
  insertBooksHeader: {
    fontSize: 30,
    fontWeight: '500',
    color: 'grey',
    padding: 15,
    paddingTop: 30
  },
  BooksProcessOptionDiv: {
    flexDirection: 'row',
    marginTop: 10,
  },
  Selected: {
    fontWeight: 'bold', 
    backgroundColor:'green'
  },
  Options: {
    paddingHorizontal: 10,
    backgroundColor: 'black',
    color: 'white',
    padding: 8,
    borderRadius: 10,
    margin: 5

  },
  InputParent: {
    marginTop: 10,
    alignItems: 'center'
  },

  input: {
    backgroundColor: 'rgba(228, 236, 250, 0.696)',
    color: '#595c5b',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    flex: 1,
  },

  Instructioninput: {
    backgroundColor: 'rgba(228, 236, 250, 0.696)',
    minHeight: 50,
    maxHeight: 150,
    color: '#595c5b',
    borderRadius: 10,
    paddingHorizontal: 10,
    flex: 1,


  },
  inputDiv: {
    // backgroundColor: 'orange',
    padding: 5,
    paddingBottom: 0,
    width: WindowWidth - 20,

  },
  BooksLabel: {
    padding: 5,
    color: 'grey'
  },
  BtnMainDiv: {
    alignItems: 'center',
    marginVertical: 30
  },
  BtnDiv: {
    backgroundColor: '#8fad4e',
    width: WindowWidth - 26,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    elevation: 2,


    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,



  },
  BtnText: {
    color: 'white',
    fontSize: 20,
    textTransform: 'uppercase'
  },


  TwoItems: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    width: WindowWidth - 20,
    justit: "sfyContenpace-between",
    paddingHorizontal: 20


  },
  
  imageDiv: {
    // backgroundColor: 'red',
    padding: 5,
    // width: WindowWidth - 20,
    marginVertical: 10
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 15,
    marginVertical: 10
  },
  PickImageDiv: {
    fontSize: 18,
    backgroundColor: 'rgba(59, 124, 164, 0.521)144, 144, 144',
    padding: 10,
    borderRadius: 12,



  },
  PickImageLabel: {
    fontSize: 18,


  },


})



