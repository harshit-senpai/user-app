import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground, ScrollView, ActivityIndicator } from 'react-native'
import Modal from 'react-native-modal'
import AsyncStorage from "@react-native-async-storage/async-storage";
import RazorpayCheckout from 'react-native-razorpay';

const Askfund = ({ navigation }) => {
    const [veri, setVeri] = useState(false)
    const [appply, setApply] = useState('')
    const [name, SetName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [bankname, setBankname] = useState('')
    const [accountnumber, setAccountnumber] = useState('')
    const [ifsc, setIfsc] = useState('')
    const [desc, setDesc] = useState('')
    const [images, setImages] = useState('')
    const [amount, setAmount] = useState('')
    const [load, setLoad] = useState(true)


    useEffect(() => {
        getdata()
    }, [])

    const getdata = async () => {
        let userid = await AsyncStorage.getItem('users')
        userid = await JSON.parse(userid).data._id
        let data = await fetch(`https://noida-server.vercel.app/appliedfund/getapply/${userid}`)
        data = await data.json()
        if (data) {
            setApply(data)
            console.log(data[0].name)
            SetName(data[0].name)
            setEmail(data[0].email)
            setNumber(data[0].number)
            setBankname(data[0].bankname)
            setAccountnumber(data[0].accountnumber)
            setAmount(data[0].amount)
            setIfsc(data[0].ifsc)
            setDesc(data[0].desc)
            setLoad(false)
        }
    }

    const pay = async () => {
        var options = {
            currency: 'INR',
            key: 'rzp_test_MtraH0q566XjUb', // Your api key
            amount: "200",
            name: 'Help',
            prefill: {
                email: 'virtualhos1145@gmail.com',
                contact: '8340175751',
                name: 'virtual hospital'
            },
            theme: { color: '#F37254' }
        }
        RazorpayCheckout.open(options).then(() => {

            Alert.alert("Payment sucessful")

        }).catch((error) => {
            Alert.alert("payment error")
        });
    }
    return (
        <View style={{ flex: 1 }}>
            <Modal isVisible={veri}>
                <View style={{ flex: 1, backgroundColor: "#fff", borderRadius: 10 }}>
                    <TouchableOpacity style={{ padding: 20 }} onPress={() => setVeri(false)}>
                        <Image source={require('../Images/cancel.png')}></Image>
                    </TouchableOpacity>
                    <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "500" }}>Details</Text>
                    <ScrollView>
                        <View style={{ marginBottom: 80 }}>
                            <View style={{ marginTop: 5 }}>
                                <Text style={{ marginLeft: 20, fontSize: 18, fontWeight: "400" }}>Name</Text>
                                <Text style={{ marginLeft: 20, fontSize: 18, marginTop: 5, fontWeight: "bold" }}>{name}</Text>
                                <View style={{ width: "90%", height: 1, alignSelf: "center", backgroundColor: "rgba(168, 168, 168, 1)", marginTop: 10 }}>
                                </View>
                            </View>

                            <View style={{ marginTop: 5 }}>
                                <Text style={{ marginLeft: 20, fontSize: 18, fontWeight: "400" }}>amount</Text>
                                <Text style={{ marginLeft: 20, fontSize: 18, marginTop: 5, fontWeight: "bold" }}>{amount}</Text>
                                <View style={{ width: "90%", height: 1, alignSelf: "center", backgroundColor: "rgba(168, 168, 168, 1)", marginTop: 10 }}>
                                </View>
                            </View>

                            <View style={{ marginTop: 5 }}>
                                <Text style={{ marginLeft: 20, fontSize: 18, fontWeight: "400" }}>Number</Text>
                                <Text style={{ marginLeft: 20, fontSize: 18, marginTop: 5, fontWeight: "bold" }}>{number}</Text>
                                <View style={{ width: "90%", height: 1, alignSelf: "center", backgroundColor: "rgba(168, 168, 168, 1)", marginTop: 10 }}>
                                </View>
                            </View>

                            <View style={{ marginTop: 5 }}>
                                <Text style={{ marginLeft: 20, fontSize: 18, fontWeight: "400" }}>Bank Name</Text>
                                <Text style={{ marginLeft: 20, fontSize: 18, marginTop: 5, fontWeight: "bold" }}>{bankname}</Text>
                                <View style={{ width: "90%", height: 1, alignSelf: "center", backgroundColor: "rgba(168, 168, 168, 1)", marginTop: 10 }}>
                                </View>
                            </View>

                            <View style={{ marginTop: 5 }}>
                                <Text style={{ marginLeft: 20, fontSize: 18, fontWeight: "400" }}>accountnumber</Text>
                                <Text style={{ marginLeft: 20, fontSize: 18, marginTop: 5, fontWeight: "bold" }}>{accountnumber}</Text>
                                <View style={{ width: "90%", height: 1, alignSelf: "center", backgroundColor: "rgba(168, 168, 168, 1)", marginTop: 10 }}>
                                </View>
                            </View>

                            <View style={{ marginTop: 5 }}>
                                <Text style={{ marginLeft: 20, fontSize: 18, fontWeight: "400" }}>Ifsc code</Text>
                                <Text style={{ marginLeft: 20, fontSize: 18, marginTop: 5, fontWeight: "bold" }}>{ifsc}</Text>
                                <View style={{ width: "90%", height: 1, alignSelf: "center", backgroundColor: "rgba(168, 168, 168, 1)", marginTop: 10 }}>
                                </View>
                            </View>

                            <View style={{ marginTop: 5 }}>
                                <Text style={{ marginLeft: 20, fontSize: 18, fontWeight: "400" }}>Desc</Text>
                                <Text style={{ marginLeft: 20, fontSize: 18, marginTop: 5, fontWeight: "bold" }}>{desc}</Text>
                                <View style={{ width: "90%", height: 1, alignSelf: "center", backgroundColor: "rgba(168, 168, 168, 1)", marginTop: 10 }}>
                                </View>
                            </View>
                            <TouchableOpacity style={{
                                width: 200,
                                padding: 10,
                                backgroundColor: "#fff",
                                alignSelf: "center",
                                elevation: 20,
                                marginTop: 20,

                            }} onPress={() => pay()}>
                                <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "500" }}>Pay fund</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </Modal >

            <TouchableOpacity style={{ padding: 20 }} onPress={() => navigation.goBack()}>
                <Image source={require('../Images/cancel.png')}></Image>
            </TouchableOpacity>
            <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "500" }}>Fundraiser Applicants</Text>
            <View style={{
                alignSelf: "center",
                width: "45%",
                height: 2,
                backgroundColor: "rgba(154, 154, 154, 1)",
                marginTop: 7
            }}>
            </View>
            <Text style={{ marginLeft: 15, fontSize: 20, marginTop: 5, color: "#000", fontWeight: "600" }}>Applications</Text>
            {
                load ? <ActivityIndicator size={44}></ActivityIndicator> : <View style={{ marginBottom: 250 }}>
                    <ScrollView>
                        <View style={{ marginTop: 10, marginLeft: 5, flexDirection: "row" }}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                                {
                                    appply && appply.length > 0 ?
                                        appply.map((item, index) => (
                                            <View key={index} style={{ width: 200, height: 210, backgroundColor: "#fff", padding: 10, elevation: 20, borderRadius: 10 }}>
                                                <View >
                                                    <ImageBackground style={{ width: "100%", height: 120 }} source={{ uri: `${item.images}` }}></ImageBackground>
                                                </View>
                                                <View>
                                                    <Text style={{ fontSize: 15, color: "#000", fontWeight: "500" }}>Help {item.name}</Text>
                                                    <Text>Target: Rs {item.totalamount}</Text>
                                                    <View style={{ flexDirection: "row", marginTop: 4, justifyContent: "space-around" }}>
                                                        <TouchableOpacity style={{ width: 100, padding: 1, backgroundColor: '#000', borderRadius: 10 }} onPress={() => setVeri(true)}>
                                                            <Text style={{ color: "rgba(0, 164, 216, 1)", textAlign: "center", fontWeight: "600" }}>View</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => navigation.navigate('ngocall')}>
                                                            <Image source={require('../Images/video.png')}></Image>
                                                        </TouchableOpacity>

                                                    </View>

                                                </View>
                                            </View>

                                        )) : <Text>No applied</Text>
                                }


                            </ScrollView>
                        </View>

                        <Text style={{ marginLeft: 15, fontSize: 20, marginTop: 5, color: "#000", fontWeight: "600" }}>Recommended for you</Text>

                        <View style={{ marginTop: 10 }}>
                            <TouchableOpacity>
                                <View style={{
                                    height: 250,
                                    width: "90%",
                                    alignSelf: "center",
                                }}>
                                    <View >
                                        <Image style={{ height: 170, width: "100%", borderRadius: 7 }} source={require('../Images/home.jpg')}></Image>
                                    </View>
                                    <Text style={{ fontSize: 20, color: "#000", fontWeight: "600" }}>Magnitude 4.6 earthquake</Text>
                                    <Text>Affected countries: India, Myanmar (Burma), and China Arunachal Pradesh · 5:18 am</Text>
                                </View>

                            </TouchableOpacity>
                            <TouchableOpacity >
                                <View style={{
                                    height: 250,
                                    width: "90%",
                                    alignSelf: "center",
                                }}>
                                    <View >
                                        <Image style={{ height: 170, width: "100%", borderRadius: 7 }} source={require('../Images/home.jpg')}></Image>
                                    </View>
                                    <Text style={{ fontSize: 20, color: "#000", fontWeight: "600" }}>Magnitude 4.6 earthquake</Text>
                                    <Text>Affected countries: India, Myanmar (Burma), and China Arunachal Pradesh · 5:18 am</Text>
                                </View>

                            </TouchableOpacity>
                            <TouchableOpacity >
                                <View style={{
                                    height: 250,
                                    width: "90%",
                                    alignSelf: "center",
                                }}>
                                    <View >
                                        <Image style={{ height: 170, width: "100%", borderRadius: 7 }} source={require('../Images/home.jpg')}></Image>
                                    </View>
                                    <Text style={{ fontSize: 20, color: "#000", fontWeight: "600" }}>Magnitude 4.6 earthquake</Text>
                                    <Text>Affected countries: India, Myanmar (Burma), and China Arunachal Pradesh · 5:18 am</Text>
                                </View>

                            </TouchableOpacity>
                        </View>

                    </ScrollView>


                </View>
            }


        </View >
    )
}

export default Askfund;