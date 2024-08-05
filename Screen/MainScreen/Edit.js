import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { WindowWidth } from '../GlobalCSS'
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Edit({ route, navigation }) {
    const { item, allBooks } = route.params;
    console.log(allBooks, 'AlllBooksFrom Route');

    const [single, setSingle] = useState(item);

    const [method, setMethod] = useState('')
    const [image, setImage] = useState('')
    

    const [selectedDifficulty, setSelectedDifficulty] = useState(single.process);

    console.log(selectedDifficulty, 'selectedDifficulty');


    const handleChange = (type, value) => {
        setSingle({ ...single, [type]: value })

    }

   

    const SubmitBooks = async () => {
        single.process = selectedDifficulty
        let value = { ...single, image: image || single.image}
        console.log(value, 999999);
        let index = allBooks.findIndex((e) => e.id === single.id)
        console.log(index);
        await allBooks.splice(index, 1, value)
        await AsyncStorage.setItem('Books', JSON.stringify(allBooks))
        navigation.navigate('Home')
    }

    // image select
    const PickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            // videoQuality: 1,


        })
        console.log(result, 'ImageSelect');
        if (!result.canceled) {
            setImage(result.uri);
            console.log(result.uri);
        }


    }

    useEffect(() => {

        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            console.log(status);
            if (status !== 'granted') {
                console.error('Permission to access media library denied');
            }

        })()
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView >

                <View style={styles.mainInsertDiv}>

                    <Text style={styles.insertBooksHeader}>
                        Let's Edit the Book
                    </Text>

                    <View style={styles.InputParent}>

                        <View style={styles.inputDiv}>
                            <Text style={styles.BooksLabel}>Book name</Text>
                            <TextInput style={styles.input} value={single.name} onChangeText={(name) => handleChange('name', name)} />
                        </View>

                        {/* 2 items */}
                        <View style={styles.TwoItems}>
                            <View style={styles.imageDiv}>

                                <TouchableOpacity onPress={PickImage} style={styles.PickImageDiv}>
                                    <Text style={styles.PickImageLabel}>Pick image</Text>
                                </TouchableOpacity>

                                {image ? (
                                    <Image source={{ uri: image }} style={styles.image} />

                                ) : (
                                    <Image source={{ uri: single.image }} style={styles.image} />
                                )}

                            </View>
                           
                        </View>
                        

                        <View style={styles.inputDiv}>
                            <Text style={styles.BooksLabel}> Description:</Text>
                            <TextInput style={styles.Instructioninput} value={single.description} multiline onChangeText={(description) => handleChange('description', description)}/>
                        </View>

                        <View style={styles.inputDiv}>
                            <Text style={styles.BooksLabel}>Is it easy to Read?</Text>

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
                            <Text style={styles.BooksLabel}>Book author</Text>
                            <TextInput style={styles.input} value={single.author} onChangeText={(author) => handleChange('author', author)} />
                        </View>

                    </View>

                    {/* button */}
                    <View style={styles.BtnMainDiv}>
                        <TouchableOpacity style={styles.BtnDiv} onPress={SubmitBooks}>
                            <Text style={styles.BtnText}>Continue</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    BooksProcessOptionDiv: {
        flexDirection: 'row',
        marginTop: 10,
    },
    Selected: {
        fontWeight: 'bold',
        backgroundColor: 'green'
    },
    Options: {
        paddingHorizontal: 10,
        backgroundColor: 'black',
        color: 'white',
        padding: 8,
        borderRadius: 10,
        margin: 5

    },
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
        justifyContent: "space-between",
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






