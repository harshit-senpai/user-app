import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from 'react-native'

const Sucess = ({ navigation, route }) => {
    const [visible, setVisible] = useState(false)
    const {
        Hospitalname,
        Hospitalid,
        Hostpitalnumber,
        status } = route.params;
    console.log(Hospitalid, Hostpitalnumber, status)

    return (

        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>

            <View style={{
                width: "90%",
                height: 250,
                backgroundColor: "#fff",
                alignItems: "center",
                elevation: 20
            }}>
                <Text style={{
                    fontSize: 25,
                    color: "rgb(47,188,245)",
                    fontWeight: "600",
                    marginTop: 30
                }}>Payment successful</Text>
                <Text style={{
                    fontSize: 18,
                    fontWeight: "500"
                }}>Hospital : {Hospitalname} <Text></Text></Text>
                <Text>Driver No : {Hostpitalnumber}</Text>
                <Text>Hospital Id: {Hospitalid} </Text>



                <TouchableOpacity style={{
                    width: 250,
                    backgroundColor: '#2cbfe6',
                    alignSelf: "center",
                    marginTop: 15,
                    borderRadius: 10,
                    padding: 5

                }} >
                    <Text style={{
                        textAlign: "center",
                        fontSize: 25,
                        color: "#fff",
                        fontWeight: "bold",
                    }} onPress={() => navigation.navigate('Home')}>Home</Text>
                </TouchableOpacity>

                <View style={{
                    position: "absolute",
                    right: 10,
                    top: 1
                }}>
                    <Text style={{
                        fontWeight: 'bold'
                    }}>Status : <Text style={{ color: "red", fontSize: 20 }}></Text>{status}</Text>
                </View>
            </View>

        </View>


    )
}

export default Sucess;