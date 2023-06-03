import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, Alert, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import DocumentPicker from 'react-native-document-picker'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/MaterialIcons'

const Organigation = ({ navigation }) => {
    const [veri, setVeri] = useState(false)
    const [ngo, setNgo] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [desc, setdesc] = useState('')
    const [images, setImages] = useState('')
    const [ngoid, setNgoid] = useState()
    const [load, setLoad] = useState(false)
    const [totalamount, setTotamamount] = useState('')
    const [accountnumber, setAccountnumber] = useState('')
    const [bankname, setBankname] = useState('')
    const [ifsccode, setIfsccode] = useState('')
    const [next, setNext] = useState(false)



    useEffect(() => {
        getngo()
    }, [])


    const getngo = async () => {
        let data = await fetch(`https://noida-server.vercel.app/ngo/getorg`)
        data = await data.json()
        if (data) {
            setNgo(data)
            setNgoid(data._id)
        }
    }


    const Picker = async () => {
        try {
            let data = await DocumentPicker.pick(
                {
                    type: [DocumentPicker.types.images],
                }
            );
            handle(data[0].uri, data[0].type, data[0].name)
            console.log(data)
        } catch (error) {

            if (DocumentPicker.isCancel(error)) {
                console.log(error)
            }
            else {
                console.log(error)
            }
        }
    }


    async function handle(e, type, name) {
        setLoad(true)
        const data = new FormData()
        data.append("file", { uri: e, type: type, name: name })
        data.append("upload_preset", 'vsqmoxq9')
        const res = await fetch('https://api.cloudinary.com/v1_1/dxlmwq61j/image/upload', {
            method: 'post',
            body: data
        })
        const file = await res.json()
        if (file) {
            setImages(file.secure_url)
            setLoad(false)
        }
    }

    const open = (nogo) => {
        setNgoid(nogo)
        setVeri(true)

    }

    const applyfund = async () => {
        setLoad(true)
        let userid = await AsyncStorage.getItem('users')
        userid = await JSON.parse(userid).data._id
        let callid = Math.floor(Math.random() * 100000);
        let data = await fetch(`https://noida-server.vercel.app/appliedfund/fundpost`, {
            method: "post",
            body: JSON.stringify({ name, email, number, callid, desc, images, userid, ngoid, accountnumber, ifsccode, bankname, totalamount }),
            headers: {
                'content-type': 'application/json'
            }
        })
        data = await data.json()
        if (data) {
            setLoad(false)
            Alert.alert("Applied sucessfully")
            console.log(data)
            setVeri(false)

        }
    }
    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => navigation.navigate('userprofile')} >
                <View style={{ position: "absolute", top: 10, right: 20 }}>
                    <Icon name="face" color="black" size={44}></Icon>
                </View>
            </TouchableOpacity>


            <Modal isVisible={veri}>
                <View style={{ flex: 1, backgroundColor: "#fff", borderRadius: 10 }}>
                    <TouchableOpacity style={{ padding: 20 }} onPress={() => setVeri(false)}>
                        <Image source={require('../Images/cancel.png')}></Image>
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 16,
                        color: "#000",
                        textAlign: "center",
                        fontWeight: "bold"
                    }}>Enter your details to apply for funds</Text>
                    <View style={{
                        alignSelf: "center",
                        width: "95%",
                        height: 1,
                        backgroundColor: "rgba(154, 154, 154, 1)",
                        marginTop: 5
                    }}>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <TextInput style={{
                            width: 300,
                            padding: 7,
                            backgroundColor: "#f2f2f2",
                            alignSelf: "center",
                            paddingLeft: 15,
                            borderRadius: 10,
                            elevation: 20
                        }} value={name} onChangeText={(text) => setName(text)} placeholder="Enter Name"></TextInput>
                        <TextInput style={{
                            width: 300,
                            padding: 7,
                            backgroundColor: "#f2f2f2",
                            alignSelf: "center",
                            paddingLeft: 15,
                            borderRadius: 10,
                            elevation: 20,
                            marginTop: 10
                        }} value={number} onChangeText={(text) => setNumber(text)} placeholder="Enter Number"></TextInput>
                        <TextInput style={{
                            width: 300,
                            padding: 7,
                            backgroundColor: "#f2f2f2",
                            alignSelf: "center",
                            paddingLeft: 15,
                            borderRadius: 10,
                            elevation: 20,
                            marginTop: 10
                        }} value={email} onChangeText={(text) => setEmail(text)} placeholder="Enter Email"></TextInput>

                        <Text style={{ marginLeft: 10, marginTop: 10, fontSize: 16, color: "#000" }}>Why you want to raise funds?</Text>
                        <TextInput style={{
                            width: 300,
                            height: 100,
                            padding: 7,
                            backgroundColor: "#f2f2f2",
                            alignSelf: "center",
                            paddingLeft: 15,
                            borderRadius: 10,
                            elevation: 20,
                            marginTop: 10
                        }} value={desc} onChangeText={(text) => setdesc(text)} placeholder="Description about Fund"></TextInput>
                        <View style={{
                            width: 300,
                            height: 100,
                            alignSelf: "center",
                            borderWidth: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 10
                        }}>
                            <TouchableOpacity onPress={() => Picker()}>
                                <Image style={{ alignSelf: "center" }} source={require('../Images/gallery.png')}></Image>
                                <Text style={{ color: "#000", fontWeight: "500" }}>Upload from gallery or click.</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={{
                            width: 250,
                            padding: 7,
                            backgroundColor: "rgba(255, 46, 0, 1)",
                            alignSelf: "center",
                            paddingLeft: 15,
                            borderRadius: 7,
                            marginTop: 20
                        }} onPress={() => setNext(true)}>
                            {
                                load ? <ActivityIndicator size={44}></ActivityIndicator> : <Text style={{ color: "#fff", textAlign: "center", fontSize: 15, fontWeight: "500" }}>Submit</Text>
                            }

                        </TouchableOpacity>
                    </View>

                </View>

            </Modal>

            <Modal isVisible={next}>
                <View style={{ flex: 1, backgroundColor: "#fff", borderRadius: 10 }}>
                    <TouchableOpacity style={{ padding: 20 }} onPress={() => navigation.goBack()}>
                        <Image source={require('../Images/cancel.png')}></Image>
                    </TouchableOpacity>
                    <Text style={{
                        marginTop: 40,
                        textAlign: "center",
                        fontSize: 20,
                        color: "#000",
                        fontWeight: "500"
                    }}>Fill basic details</Text>
                    <View style={{
                        alignSelf: "center",
                        width: "70%",
                        height: 2,
                        backgroundColor: "rgba(154, 154, 154, 1)",
                        marginTop: 7
                    }}></View>
                    <TextInput style={{
                        width: 300,
                        padding: 7,
                        backgroundColor: "#fff",
                        alignSelf: "center",
                        paddingLeft: 15,
                        borderRadius: 10,
                        marginTop: 15,
                        elevation: 20
                    }} value={totalamount} onChangeText={(text) => setTotamamount(text)} placeholder="Enter Amount"></TextInput>
                    <TextInput style={{
                        width: 300,
                        padding: 7,
                        backgroundColor: "#fff",
                        alignSelf: "center",
                        paddingLeft: 15,
                        borderRadius: 10,
                        marginTop: 10,
                        elevation: 20
                    }} value={accountnumber} onChangeText={(text) => setAccountnumber(text)} placeholder="Enter Account number"></TextInput>
                    <TextInput style={{
                        width: 300,
                        padding: 7,
                        backgroundColor: "#fff",
                        alignSelf: "center",
                        paddingLeft: 15,
                        borderRadius: 10,
                        marginTop: 10,
                        elevation: 20
                    }} value={ifsccode} onChangeText={(text) => setIfsccode(text)} placeholder="Enter Ifsc code"></TextInput>
                    <TextInput style={{
                        width: 300,
                        padding: 7,
                        backgroundColor: "#fff",
                        alignSelf: "center",
                        paddingLeft: 15,
                        borderRadius: 10,
                        marginTop: 10,
                        elevation: 20
                    }} value={bankname} onChangeText={(text) => setBankname(text)} placeholder="Enter Bank Name"></TextInput>
                    <TouchableOpacity style={{
                        width: 200,
                        padding: 7,
                        backgroundColor: "#000",
                        alignSelf: "center",
                        paddingLeft: 15,
                        borderRadius: 7,
                        marginTop: 30
                    }} onPress={() => applyfund()}>
                        {
                            load ? <ActivityIndicator size={44}></ActivityIndicator> : <Text style={{ color: "#fff", fontSize: 15, fontWeight: "500", textAlign: "center" }}>Apply Now</Text>
                        }
                    </TouchableOpacity>

                </View>

            </Modal>


            <TouchableOpacity style={{ padding: 20, width: 10 }} onPress={() => navigation.goBack()}>
                <Image source={require('../Images/cancel.png')}></Image>
            </TouchableOpacity>
            <Text style={{ textAlign: "center", fontSize: 20, color: "#000" }}>Organization</Text>
            <View style={{
                alignSelf: "center",
                width: "70%",
                height: 2,
                backgroundColor: "rgba(154, 154, 154, 1)",
                marginTop: 5
            }}></View>
            <View style={{ marginBottom: 210 }}>
                <ScrollView>
                    <Text style={{ fontSize: 20, padding: 10, marginLeft: 10, color: "#000", fontWeight: "500" }}>Popular organization</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 5 }}>
                        <View style={{
                            width: 100,
                            height: 130,
                            backgroundColor: "#fff",
                            borderRadius: 5,
                            justifyContent: "center",
                            alignItems: "center",
                            elevation: 20
                        }}>
                            <Image source={require('../Images/first.png')}></Image>
                            <Text style={{ textAlign: "center" }}>Smile Foundation</Text>
                        </View>
                        <View style={{
                            width: 100,
                            height: 130,
                            backgroundColor: "#fff",
                            borderRadius: 5,
                            justifyContent: "center",
                            alignItems: "center",
                            elevation: 20
                        }}>
                            <Image source={require('../Images/second.png')}></Image>
                            <Text style={{ textAlign: "center" }}>Nanhi Kali</Text>
                        </View>
                        <View style={{
                            width: 100,
                            height: 130,
                            backgroundColor: "#fff",
                            borderRadius: 5,
                            justifyContent: "center",
                            alignItems: "center",
                            elevation: 20
                        }}>
                            <Image source={require('../Images/third.png')}></Image>
                            <Text style={{ textAlign: "center" }}>Goonj</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 10 }}>
                        <View style={{
                            width: 100,
                            height: 130,
                            backgroundColor: "#fff",
                            borderRadius: 5,
                            justifyContent: "center",
                            alignItems: "center",
                            elevation: 20
                        }}>
                            <Image source={require('../Images/first.png')}></Image>
                            <Text style={{ textAlign: "center" }}>Give India Foundation</Text>
                        </View>
                        <View style={{
                            width: 100,
                            height: 130,
                            backgroundColor: "#fff",
                            borderRadius: 5,
                            justifyContent: "center",
                            alignItems: "center",
                            elevation: 20
                        }}>
                            <Image source={require('../Images/second.png')}></Image>
                            <Text style={{ textAlign: "center" }}>HelpAge India</Text>
                        </View>
                        <View style={{
                            width: 100,
                            height: 120,
                            backgroundColor: "#fff",
                            borderRadius: 5,
                            justifyContent: "center",
                            alignItems: "center",
                            elevation: 20
                        }}>
                            <Image source={require('../Images/third.png')}></Image>
                            <Text style={{ textAlign: "center" }}>Care India</Text>
                        </View>
                    </View>
                    <Text style={{ fontSize: 20, padding: 10, marginLeft: 10, color: "#000", fontWeight: "500" }}>Registered organization</Text>


                    <View style={{ marginBottom: 20 }}>
                        {
                            ngo && ngo.length > 0 ? ngo.map((item, index) => (
                                <View key={index} style={{
                                    flexDirection: "row",
                                    width: "95%",
                                    alignSelf: "center",
                                    height: 130,
                                    backgroundColor: "#fff",
                                    elevation: 20,
                                    borderRadius: 10,
                                    marginTop: 10
                                }}>
                                    <View style={{ height: 120, width: "40%" }}>
                                        <Image style={{ height: 130, width: "100%" }} source={require('../Images/first.png')}></Image>
                                    </View>
                                    <View style={{ width: "60%", padding: 10 }}>
                                        <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                                        <Text style={{ fontSize: 12 }}>It is important to note that earthquakes are weird.</Text>
                                        <TouchableOpacity style={{
                                            width: 100,
                                            backgroundColor: "#fff",
                                            marginTop: 10,
                                            borderRadius: 5,
                                            elevation: 20
                                        }} onPress={() => open(item._id)}>
                                            <Text style={{ color: "rgba(0, 164, 216, 1)", textAlign: "center", fontWeight: "700" }}>Apply</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            )) : <Text>No ngo</Text>
                        }

                    </View>


                </ScrollView>

            </View>

        </View>
    )
}
export default Organigation;