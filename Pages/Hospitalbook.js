import React, { useEffect, useState } from "react";
import {
    View, Text, TouchableOpacity, ActivityIndicator, ScrollView
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from "@react-native-async-storage/async-storage";

const Hospitalbook = ({ navigation }) => {
    const [load, setLoad] = useState(true)
    const [book, setBook] = useState('')

    useEffect(() => {
        getdata();
    }, [])

    const getdata = async () => {
        let id = await AsyncStorage.getItem('users');
        id = await JSON.parse(id).data._id
        let data = await fetch(`https://vertual-server.vercel.app/user/book/allambulance/${id}`);
        data = await data.json();
        if (data) {
            setBook(data)
            setLoad(false)
        }
    }

    return (
        <View style={{
            flex: 1,
        }}>
            <View style={{
                marginTop: 20,
                marginLeft: 20
            }}>
                <Icon onPress={() => navigation.goBack()} name="close" size={48}></Icon>
            </View>
            <View style={{ marginBottom: 150 }}>

                <ScrollView>


                    {
                        load ? <ActivityIndicator size={44}></ActivityIndicator> :

                            <View>

                                {
                                    book && book.length > 0 ?
                                        book.map((item, index) => (
                                            <View style={{
                                                width: "90%",
                                                // height: 200,
                                                backgroundColor: "#fff",
                                                alignItems: "center",
                                                elevation: 20,
                                                alignSelf: "center",
                                                marginTop: 30,
                                                padding: 14
                                            }} key={index}>
                                                <Text style={{
                                                    fontSize: 25,
                                                    color: "rgb(47,188,245)",
                                                    fontWeight: "600",
                                                    marginTop: 30
                                                }}>Payment successful</Text>
                                                <Text style={{
                                                    fontSize: 18,
                                                    fontWeight: "500"
                                                }}>Hospital : <Text>{item.Hospitalname}</Text></Text>
                                                <Text>Driver No : {item.Hostpitalnumber}</Text>
                                                <Text>Appoiment Id : {item._id} </Text>
                                                {
                                                    item.status == "booked" ? <TouchableOpacity style={{
                                                        width: 250,
                                                        backgroundColor: '#2cbfe6',
                                                        alignSelf: "center",
                                                        marginTop: 15,
                                                        borderRadius: 10,
                                                        padding: 5

                                                    }}  >
                                                        <Text style={{
                                                            textAlign: "center",
                                                            fontSize: 25,
                                                            color: "#fff",
                                                            fontWeight: "bold",
                                                        }} >Not yet started</Text>
                                                    </TouchableOpacity> : <TouchableOpacity style={{
                                                        width: 250,
                                                        backgroundColor: '#2cbfe6',
                                                        alignSelf: "center",
                                                        marginTop: 15,
                                                        borderRadius: 10,
                                                        padding: 5

                                                    }} onPress={() => navigation.navigate('newsmap', item.lat)}>
                                                        <Text style={{
                                                            textAlign: "center",
                                                            fontSize: 25,
                                                            color: "#fff",
                                                            fontWeight: "bold",
                                                        }} >Track location</Text>
                                                    </TouchableOpacity>
                                                }


                                                <View style={{
                                                    position: "absolute",
                                                    right: 10,
                                                    top: 1
                                                }}>
                                                    <Text style={{
                                                        fontWeight: 'bold'
                                                    }}>Status : <Text style={{ color: "red", fontSize: 20 }}>{item.status}</Text></Text>
                                                </View>
                                            </View>


                                        )) : <Text>no book</Text>
                                }


                            </View>
                    }
                </ScrollView>

            </View>

        </View>





    )
}

export default Hospitalbook;