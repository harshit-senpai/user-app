import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, TouchableOpacity, Image, ScrollView, TextInput, ActivityIndicator } from "react-native";
import Modal from 'react-native-modal'
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Singledonation = ({ navigation, route }) => {
    const id = route.params;

    const [list, setList] = useState(false)
    const [isdonation, setIsdonation] = useState(false)
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [getterid, setGetterid] = useState('')
    const [amount, setAmount] = useState('')
    const [info, setInfo] = useState('')
    const [donordata, setDonordata] = useState('')
    const [load, setLoad] = useState(false)

    const [donname, setDonanme] = useState()
    const [images, setImages] = useState('');
    const [donamount, setdonAmount] = useState('')
    const [desc, setDesc] = useState('')

    useEffect(() => {
        getsingledonation();
    }, [])

    const getsingledonation = async () => {
        let data = await fetch(`https://noida-server.vercel.app/donation/getfund/${id}`)
        data = await data.json();
        if (data) {
            setGetterid(data._id)
            setDonanme(data.name)
            setdonAmount(data.amount)
            setImages(data.images)
            setDesc(data.desc)
        }
    }

    const pay = () => {
        setLoad(true)
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
        RazorpayCheckout.open(options).then((data) => {
            if (data) {
                setLoad(false)
                postdonation()
            }
        }).catch((error) => {
            alert(`Error: ${error.code} | ${error.description}`);
        });
    }

    const postdonation = async () => {
        let donorid = await AsyncStorage.getItem('users')
        donorid = await JSON.parse(donorid).data._id
        let data = await fetch(`https://noida-server.vercel.app/donor/savedonor`, {
            method: "post",
            body: JSON.stringify({ name, number, amount, donorid, getterid }),
            headers: {
                'content-type': 'application/json'
            }
        })

        data = await data.json()
        if (data) {

            setIsdonation(false)
            console.log(data)
        }
    }

    const donorlist = async () => {
        console.log(getterid)
        setList(true)
        let data = await fetch(`https://noida-server.vercel.app/donor/getdonor/${getterid}`)
        data = await data.json()
        if (data) {
            setDonordata(data)
            console.log(data)


        }
    }


    return (
        <View style={{ flex: 1 }}>

            <Modal isVisible={isdonation}>
                <View style={{ flex: 1, backgroundColor: "#fff", borderRadius: 10 }}>
                    <TouchableOpacity style={{ padding: 20 }} onPress={() => setIsdonation(false)}>
                        <Image source={require('../Images/cancel.png')}></Image>
                    </TouchableOpacity>
                    <Text style={{ textAlign: "center", fontSize: 20, color: "#000", fontWeight: "500" }}>Enter details</Text>
                    <View style={{
                        alignSelf: "center",
                        width: "95%",
                        height: 2,
                        backgroundColor: "rgba(154, 154, 154, 1)",
                        marginTop: 7
                    }}>
                    </View>

                    <TextInput style={{
                        width: 300,
                        padding: 7,
                        backgroundColor: "#fff",
                        alignSelf: "center",
                        paddingLeft: 15,
                        borderRadius: 10,
                        elevation: 20,
                        marginTop: 10
                    }} value={name} onChangeText={(text) => setName(text)} placeholder="Enter Name"></TextInput>
                    <TextInput style={{
                        width: 300,
                        padding: 7,
                        backgroundColor: "#fff",
                        alignSelf: "center",
                        paddingLeft: 15,
                        borderRadius: 10,
                        elevation: 20,
                        marginTop: 10
                    }} value={number} onChangeText={(text) => setNumber(text)} placeholder="Enter Number"></TextInput>
                    <TextInput style={{
                        width: 300,
                        padding: 7,
                        backgroundColor: "#fff",
                        alignSelf: "center",
                        paddingLeft: 15,
                        borderRadius: 10,
                        elevation: 20,
                        marginTop: 10
                    }} value={amount} onChangeText={(text) => setAmount(text)} placeholder="Amount"></TextInput>
                    <TextInput style={{
                        width: 300,
                        height: 100,
                        padding: 7,
                        backgroundColor: "#fff",
                        alignSelf: "center",
                        paddingLeft: 15,
                        borderRadius: 10,
                        elevation: 20,
                        marginTop: 10
                    }} placeholder="Any info" value={info} onChangeText={(text) => setInfo(text)}></TextInput>
                    <TouchableOpacity style={{
                        width: 230,
                        padding: 7,
                        backgroundColor: "#000",
                        alignSelf: "center",
                        paddingLeft: 15,
                        borderRadius: 7,
                        marginTop: 25
                    }} onPress={() => pay()}>
                        {
                            load ? <ActivityIndicator size={44}></ActivityIndicator> : <Text style={{ color: "#fff", textAlign: "center", fontSize: 15, fontWeight: "500" }}>Donate</Text>
                        }
                    </TouchableOpacity>


                </View>
            </Modal>

            <Modal isVisible={list}>
                <View style={{ flex: 1, backgroundColor: "#fff", borderRadius: 10 }}>
                    <TouchableOpacity style={{ padding: 20 }} onPress={() => setList(false)}>
                        <Image source={require('../Images/cancel.png')}></Image>
                    </TouchableOpacity>
                    <Text style={{ textAlign: "center", fontSize: 20, color: "#000", fontWeight: "500" }}>Donner Lists</Text>
                    <View style={{
                        alignSelf: "center",
                        width: "95%",
                        height: 2,
                        backgroundColor: "rgba(154, 154, 154, 1)",
                        marginTop: 7
                    }}>
                    </View>
                    <ScrollView>
                        <View style={{
                            marginTop: 10
                        }}>

                            {
                                donordata && donordata.length > 0 ?
                                    donordata.map((item, index) => (
                                        <View key={index} style={{
                                            width: 300,
                                            alignSelf: "center",
                                            height: 50,
                                            backgroundColor: "#fff",
                                            elevation: 20,
                                            flexDirection: "row",
                                            justifyContent: "space-around",
                                            marginTop: 10
                                        }}>
                                            <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 10 }}>{item.name}</Text>
                                            <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 10, color: "red" }}>Rs: {item.amount}</Text>
                                        </View>

                                    )) : <Text>No donor</Text>
                            }
                        </View>
                    </ScrollView>
                </View>
            </Modal>



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
            }}></View>
            <View style={{
                height: 290,
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
                    <Text style={{ fontSize: 20, color: "#000", fontWeight: "600" }}>Help {donname}</Text>
                    <Text style={{ fontSize: 25, color: "#000", fontWeight: "400" }}>Rs: <Text style={{ fontSize: 15, color: "rgba(39, 193, 0, 1)" }}>{amount} raised</Text></Text>
                </View>
                <TouchableOpacity style={{
                    width: 230,
                    padding: 7,
                    backgroundColor: "#000",
                    alignSelf: "center",
                    paddingLeft: 15,
                    borderRadius: 7,
                    marginTop: 10
                }} onPress={() => setIsdonation(true)}><Text style={{ color: "#fff", textAlign: "center", fontSize: 15, fontWeight: "500" }}>Donate</Text></TouchableOpacity>

                <View style={{ marginTop: 30 }}>
                    <Text style={{ fontSize: 20, color: "#000", fontWeight: "500" }}>Description</Text>
                    <Text style={{ fontSize: 11 }}>{desc}</Text>
                </View>
                <TouchableOpacity style={{
                    width: 230,
                    padding: 7,
                    backgroundColor: "rgba(255, 46, 0, 1)",
                    alignSelf: "center",
                    paddingLeft: 15,
                    borderRadius: 7,
                    marginTop: 2
                }} onPress={() => donorlist()}><Text style={{ color: "#fff", textAlign: "center", fontSize: 15, fontWeight: "500" }}>Doner List</Text></TouchableOpacity>

            </View>

        </View>
    )
}

export default Singledonation;