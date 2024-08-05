import { FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeColor, WindowHeight, WindowWidth } from '../GlobalCSS';
import { DrawerActions, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
    const [allBooks, setAllBooks ]= useState([])
    const [easyBooks, setEasyBooks] = useState([])

    const GetAllBooks = async () => {
        let initialValue = await AsyncStorage.getItem('Books');
        let ParsedInitialValue = JSON.parse(initialValue) || [];
        setAllBooks(ParsedInitialValue);
        let EasyBooks = ParsedInitialValue.filter((item) => (item.process).toLowerCase()=='easy')
        console.log(EasyBooks,'EasyBooks')
        setEasyBooks(EasyBooks);
    }
        

    
    console.log(allBooks, 'ParsedInitialValue');

    useFocusEffect(
        useCallback(() => {
            GetAllBooks()
        }, [])
    )

    return (
        <>
            <SafeAreaView style={styles.container}>
                <ScrollView>

                    {/* top drawer Icons */}
                    <View style={styles.TopIconsDiv}>
                        <Ionicons style={styles.TopIcons} name='menu-outline' size={30} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />

                        <View style={{ flex: 1 }} />
                        <Ionicons style={styles.TopIcons} name='search-outline' onPress={() => navigation.navigate('Search', { allBooks: allBooks})} size={27} />

                    </View>



                    {/* topLabel */}
                    <View style={styles.topLabelView}>
                        <Text style={styles.topLabel}>
                            What would you
                        </Text>
                        <Text style={styles.topLabel}>
                            like to Learn?
                        </Text>
                    </View>




                    {/* all Books  */}
                    <View style={styles.BooksDiv}>
                        <Text style={styles.BooksText}>Top Books</Text>


                        {allBooks.length === 0 ? (
                            <View style={styles.EmptyData}>
                                <Image style={styles.EmptyImage} source={{ uri: 'https://img.freepik.com/free-vector/no-data-concept-illustration_114360-2506.jpg?size=626&ext=jpg&ga=GA1.1.1623246564.1699356450&semt=ais' }} />
                            </View>
                        ) : ''}

                        <FlatList
                            horizontal
                            data={allBooks}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => {
                                return (

                                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SingleView', { item: item, allBooks: allBooks})} style={styles.singleBooks}>
                                        <Image style={styles.BooksImage} source={{ uri: item.image }} />


                                        {/* Books Detail */}
                                        <View style={styles.BooksDetailDiv}>
                                            <Text style={styles.BooksDetailText}>{item.name}</Text>

                                            {/* BooksActionForDetail */}
                                            <View style={styles.BooksDetailInsideAction}>
                                               
                                              
                                                
                                            
                                                   
                                                
                                                    
                                                
                                                <Text style={styles.BooksDetailActionText}>{item.process}</Text>
                                                <Text style={{ color: 'yellow', height: 20 }}>    |    </Text>
                                                <Text style={styles.BooksDetailActionText}>By {item.author}</Text>
                                            </View>
                                           
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        />



                    </View>



                    {/* Recommended for Begginner Books  */}
                    <View style={{ alignItems: 'center' }}>

                        <View style={styles.recommendedDiv}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8 }}>
                                <Text style={styles.BooksText}> For beginner </Text>
                                <View style={{ flex: 1 }} />
                                {/* <Text style={styles.seeAll}>See All </Text> */}
                            </View>

                            {easyBooks.length === 0 ? (
                                <View style={styles.EmptyData}>
                                    <Image style={styles.EmptyImage} source={{ uri: 'https://img.freepik.com/free-vector/no-data-concept-illustration_114360-2506.jpg?size=626&ext=jpg&ga=GA1.1.1623246564.1699356450&semt=ais' }} />
                                </View>
                            ) : ''}

                            <FlatList
                                data={easyBooks}
                                keyExtractor={(item) => item.id}

                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SingleView', { item: item, allBooks: allBooks })} style={styles.recommendedsingleBooks}>
                                            <Image style={styles.recommendedBooksImage} source={{ uri: item.image }} />

                                            <View style={styles.DivinsideRecommended}>


                                                <View >
                                                    <Text style={styles.BooksName}>{item.name}</Text>

                                                </View>
                                                <View >
                                                    <Text style={styles.BooksOwner}>By {item.author}</Text>
                                                </View>

                                                <View style={styles.BooksActionDiv}>
                                                   
                                                    <View style={styles.BooksTime}>
                                                        <Text>😀</Text>
                                                        <Text style={styles.timeText}>{item.process}</Text>

                                                    </View>
                                                </View>


                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}
                            />



                        </View>

                    </View>



                </ScrollView>


            </SafeAreaView>
        </>


    )
     }

const styles = StyleSheet.create({
    container: {
        backgroundColor: ThemeColor,
        flex: 1,
    },
    TopIconsDiv: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    EmptyData: {
        marginVertical: 10,
        paddingHorizontal: 10,
        width: WindowWidth - 20,
        height: 180,
        alignItems: 'center',
        justifyContent: 'center'
    },
    EmptyImage: {
        height: 150,
        width: 150,
        borderRadius: 10
    },
    TopIcons: {
        marginVertical: 25,
        marginHorizontal: 18,

    },
    topLabelView: {
        // backgroundColor:'orange',
        marginHorizontal: 18,

    },
    topLabel: {
        // backgroundColor:'green',
        fontSize: 32,
        fontWeight: '400'
    },

    BooksDiv: {
        marginTop: 20,
        height: 250,
        marginLeft: 10
    },
    BooksDetailDiv: {

        backgroundColor: 'rgba(120, 93, 82, 0.684)',
        position: 'absolute',
        top: 110,
        left: 10,
        height: 90,
        width: 160,
        borderRadius: 15,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',

    },
    BooksDetailInsideAction: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 100,
        alignItems: "center"

    },
    BooksDetailText: {
        marginBottom: 8,
        color: 'white',
        fontWeight: '400',
        fontSize: 16

    },
    BooksDetailActionText: {
        color: 'white'

    },
    recommendedDiv: {
        marginVertical: 20,
        width: WindowWidth,

    },
    BooksText: {
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontWeight: '400'
    },


    singleBooks: {
        margin: 8,
        width: 180,
        height: 200,

    },
    recommendedsingleBooks: {
        flex: 1,
        margin: 8,
        backgroundColor: 'white',
        elevation: 2,
        borderRadius: 15,
        padding: 8,
        flexDirection: 'row',

        //for ios
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,

    },
    BooksImage: {
        flex: 1,
        borderRadius: 15,
    },
    recommendedBooksImage: {
        // flex:1,
        width: 120,
        height: 150,
        borderRadius: 15,
    },
    DivinsideRecommended: {
        padding: 10,
        flex: 1,
        justifyContent: 'space-around'

    },
    BooksName: {
        fontSize: 22,
        fontWeight: '400'
    },
    BooksOwner: {
        fontSize: 15,
        color: 'grey'
    },
    BooksActionDiv: {
        flexDirection: 'row'
    },
    BooksTime: {
        flexDirection: 'row',
    },
    timeText: {
        paddingHorizontal: 10
    },
})