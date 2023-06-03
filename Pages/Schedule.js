import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from 'react-native'


const Sceduletime = ({ navigation, route }) => {
    const {
        docname,
        Hospitalid,
        Hostpitalnumber,
        videoid,
        status
    } = route.params;

    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>

            <View style={{
                width: "90%",
                backgroundColor: "#fff",
                alignItems: "center",
                elevation: 20,
                padding: 10
            }}>
                <Text style={{
                    fontSize: 25,
                    color: "rgb(47,188,245)",
                    fontWeight: "600"
                }}>Payment successful</Text>
                <Text style={{
                    fontSize: 18,
                    fontWeight: "500"
                }}>Doctor : <Text>{docname}(MBBS)</Text></Text>
                <Text>Doctor No : {Hostpitalnumber}</Text>
                <Text>Appoiment Id:{Hospitalid}</Text>


                <TouchableOpacity style={{
                    width: 250,
                    backgroundColor: '#2cbfe6',
                    alignSelf: "center",
                    marginTop: 15,
                    borderRadius: 10,
                    padding: 5

                }} onPress={() => navigation.navigate('patientdoctor')}>
                    <Text style={{
                        textAlign: "center",
                        fontSize: 25,
                        color: "#fff",
                        fontWeight: "bold",
                    }}>My booking</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: 250,
                    backgroundColor: '#2cbfe6',
                    alignSelf: "center",
                    marginTop: 15,
                    borderRadius: 10,
                    padding: 5

                }} onPress={() => navigation.navigate('home')}>
                    <Text style={{
                        textAlign: "center",
                        fontSize: 25,
                        color: "#fff",
                        fontWeight: "bold",
                    }}>Home</Text>
                </TouchableOpacity>

            </View>
        </View>


    )
}

export default Sceduletime;