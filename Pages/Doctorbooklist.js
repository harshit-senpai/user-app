import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from "@react-native-async-storage/async-storage";
const profiledoctor = ({ navigation, route }) => {
    const [book, setBook] = useState('')
    const [load, setLoad] = useState(true)

    useEffect(() => {
        getdata();
    }, [])

    const getdata = async () => {
        let id = await AsyncStorage.getItem('users');
        id = await JSON.parse(id).data._id
        let data = await fetch(`https://vertual-server.vercel.app/user/book/alldoctor/${id}`);
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
            <ScrollView>


                {
                    load ? <ActivityIndicator size={44}></ActivityIndicator> : <View>
                        {
                            book && book.length > 0 ?
                                book.map((item, index) => (

                                    <View style={{
                                        width: "90%",
                                        height: 200,
                                        backgroundColor: "#fff",
                                        alignItems: "center",
                                        elevation: 20,
                                        alignSelf: "center",
                                        marginTop: 20
                                    }} key={index}>
                                        <Text style={{
                                            fontSize: 25,
                                            color: "rgb(47,188,245)",
                                            fontWeight: "600"
                                        }}>Payment successful</Text>
                                        <Text style={{
                                            fontSize: 18,
                                            fontWeight: "500"
                                        }}>Doctor : <Text>{item.docname}(MBBS)</Text></Text>
                                        <Text>Doctor No : {item.Hostpitalnumber}</Text>
                                        <Text>Booking Id : {item._id}</Text>
                                        <Text>Call Id : {item.videoid}</Text>

                                        {
                                            item.status == 'booked' ? <TouchableOpacity style={{
                                                width: 250,
                                                backgroundColor: '#2cbfe6',
                                                alignSelf: "center",
                                                marginTop: 15,
                                                borderRadius: 10,
                                                padding: 5

                                            }} onPress={() => navigation.navigate('live')}>
                                                <Text style={{
                                                    textAlign: "center",
                                                    fontSize: 25,
                                                    color: "#fff",
                                                    fontWeight: "bold",
                                                }}>Appoinment time</Text>
                                            </TouchableOpacity> : <TouchableOpacity style={{
                                                width: 250,
                                                backgroundColor: '#2cbfe6',
                                                alignSelf: "center",
                                                marginTop: 15,
                                                borderRadius: 10,
                                                padding: 5

                                            }} onPress={() => navigation.navigate('patientmedical', item._id)}>
                                                <Text style={{
                                                    textAlign: "center",
                                                    fontSize: 25,
                                                    color: "#fff",
                                                    fontWeight: "bold",
                                                }}>Report</Text>
                                            </TouchableOpacity>
                                        }

                                    </View>

                                )) : <Text>No book</Text>
                        }

                    </View>
                }
            </ScrollView>
        </View>


    )
}

export default profiledoctor;  