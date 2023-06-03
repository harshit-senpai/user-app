import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, ImageBackground, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import Geolocation from '@react-native-community/geolocation';
const Doctorlist = ({ navigation }) => {
    const [db, setDb] = useState()
    const [load, setLoad] = useState(true)
    const [patientlat, setPatientlat] = useState('')
    const [patientlog, setPatientlog] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        getdata();
    }, [])

    const loc = () => {
        Geolocation.getCurrentPosition(
            position => {

                setPatientlat(position.coords.latitude);
                setPatientlog(position.coords.longitude);
            }
        );
        if (patientlat) {

        }
    }

    const getdata = async () => {
        console.log(patientlat, patientlog)
        let data = await fetch(`https://vertual-server.vercel.app/doctor/allhos`);
        data = await data.json()
        // if (data) {
        //     for (var i = 0; i < data.length; i++) {
        //         let dis = distance(patientlat, patientlog, data[i].lat, data[i].lon)
        //         if (dis < 1) {
        //             console.log("alok", dis)
        //             setName(data[i].name)
        //             console.log(db)
        //             setLoad(false)
        //         }
        //     }
        // }

        if (data) {
            setDb(data)
            setLoad(false)
        }
        else {
            setLoad(false)
        }
    }
    function distance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the earth in km
        const dLat = (lat2 - lat1) * Math.PI / 180;  // Convert degrees to radians
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in km
        return distance;
    }
    return (
        <View style={{ flex: 1 }}>
            <Text style={{
                margin: 15,
                fontSize: 20,
                fontWeight: "bold"
            }}>Doctors Near you</Text>
            {
                load ? <ActivityIndicator style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }} size={44}></ActivityIndicator> : <ScrollView >
                    {
                        db && db.length > 0 ?
                            db.map((item, index) => (
                                <View key={index} style={{
                                    width: "95%",
                                    alignSelf: "center",
                                    marginTop: 10
                                }}>
                                    <View style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        borderRadius: 10,
                                        height: 180,
                                        backgroundColor: "#fff",
                                        elevation: 20,
                                    }}>
                                        <View style={{
                                            width: "30%",
                                            height: "100%"
                                        }}><ImageBackground style={{
                                            height: "100%",
                                            width: "100%"
                                        }} source={require('../Images/hos.png')}></ImageBackground>
                                        </View>
                                        <View style={{
                                            width: "70%",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginTop: 10
                                        }}>
                                            <Text style={{
                                                fontWeight: "500"
                                            }}>DR. {item.name}(Mbbs)</Text>
                                            <Text>Speclist {item.speclist}</Text>
                                            <TouchableOpacity style={{
                                                backgroundColor: "rgb(47,188,245)",
                                                padding: 5,
                                                borderRadius: 5,
                                                width: 150,
                                                marginTop: 10
                                            }} onPress={() => navigation.navigate('doctorsingle', item._id)}><Text style={{
                                                textAlign: "center",
                                                color: "#fff",

                                            }}>Book</Text></TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{
                                        position: "absolute",
                                        right: 15,
                                        top: 8,
                                        backgroundColor: "red",
                                        padding: 4,
                                        borderRadius: 4
                                    }}>
                                        <Text style={{
                                            color: "#fff",
                                            fontWeight: "bold",
                                            fontSize: 8
                                        }}>Available</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: "row",
                                        position: "absolute",
                                        left: 10
                                    }}>
                                        <Text style={{ color: "orange", fontSize: 20 }}>*</Text>
                                        <Text style={{ marginLeft: 3, color: "orange", fontSize: 20 }}>*</Text>
                                        <Text style={{ marginLeft: 3, color: "orange", fontSize: 20 }}>*</Text>
                                        <Text style={{ marginLeft: 3, color: "orange", fontSize: 20 }}>*</Text>
                                        <Text style={{ marginLeft: 3, color: "orange", fontSize: 20 }}>*</Text>
                                    </View>

                                </View>




                            )) : <Text>No Doctor</Text>
                    }




                </ScrollView>
            }


        </View>
    )
}

export default Doctorlist;