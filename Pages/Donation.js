import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ImageBackground, ScrollView, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Donation = ({ navigation }) => {
    const [donation, setDonation] = useState('')
    const [load, setLoad] = useState(true)

    useEffect(() => {
        getdonation()
    }, [])

    const getdonation = async () => {
        let data = await fetch(`https://noida-server.vercel.app/donation/getfund`)
        data = await data.json()
        if (data) {
            setDonation(data)
            setLoad(false)


        }
    }

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={{ position: "absolute", right: 15, top: 10 }} onPress={() => navigation.navigate('risefund')}>
                <Icon name="add" size={54} color="rgba(0, 178, 255, 1)"></Icon>
            </TouchableOpacity>
            <Text style={{
                marginTop: 40,
                textAlign: "center",
                fontSize: 20,
                color: "#000",
                fontWeight: "500"
            }}>Donation</Text>
            <View style={{
                alignSelf: "center",
                width: "55%",
                height: 2,
                backgroundColor: "rgba(154, 154, 154, 1)",
                marginTop: 7
            }}>
            </View>
            <Text style={{ marginTop: 10, marginLeft: 10, fontSize: 17, fontWeight: "500", color: "#000" }}>Fundraiser’s by the Public</Text>
            {
                load ? <ActivityIndicator style={{ marginTop: 200 }} size={44}></ActivityIndicator> : <View style={{ marginBottom: 200 }}>
                    <ScrollView>

                        {
                            donation && donation.length > 0 ? donation.map((item, index) => (
                                <View key={index} style={{
                                    height: 270,
                                    width: "95%",
                                    alignSelf: "center",
                                    backgroundColor: "#fff",
                                    padding: 10,
                                    elevation: 20,
                                    borderRadius: 10,
                                    marginTop: 10
                                }}>
                                    <View>
                                        <ImageBackground style={{ height: 150, width: "100%" }} source={require('../Images/donate.png')}></ImageBackground>
                                    </View>
                                    <View style={{ marginTop5: 5 }}>
                                        <Text style={{ fontSize: 20, color: "#000", fontWeight: "600" }}>Help {item.name}</Text>
                                        <Text style={{ fontSize: 15, color: "#000", fontWeight: "400" }}>Rs {item.amount} <Text style={{ fontSize: 10 }}>raised</Text></Text>
                                        <Text style={{ fontWeight: "700" }}>Goal: Rs {item.totalamount} </Text>
                                    </View>
                                    <TouchableOpacity
                                        style={{ position: "absolute", bottom: 10, right: 15 }}><Text style={{ color: "rgba(0, 118, 255, 1)", fontWeight: "600", fontSize: 20 }} onPress={() => navigation.navigate('singledonation', item._id)}>Donate</Text></TouchableOpacity>
                                </View>

                            )) : <Text>No </Text>
                        }



                    </ScrollView>



                </View>

            }

        </View>
    )
}

export default Donation;