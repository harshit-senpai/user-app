import React, { useEffect, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'
import Modal from 'react-native-modal'
import AsyncStorage from "@react-native-async-storage/async-storage";
import DocumentPicker from 'react-native-document-picker'

const Risefund = ({ navigation }) => {
    const [veri, setVeri] = useState(false)
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')
    const [desc, setDesc] = useState('');
    const [amount, setAmount] = useState('')
    const [totalamount, setTotamamount] = useState('')
    const [bankname, setBankname] = useState('')
    const [accountnumber, setAccountnumber] = useState('');
    const [ifsccode, setIfsccode] = useState('')
    const [heading, setHeading] = useState('')
    const [images, setImages] = useState('')
    const [load, setLoad] = useState(false)
    const [load1, setLoad1] = useState(false)


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
            console.log(images)
            setLoad(false)

        }
    }

    const postdonation = async () => {
        setLoad1(true)
        let userid = await AsyncStorage.getItem('users')
        userid = await JSON.parse(userid).data._id
        let callid = Math.floor(Math.random * 10000)
        let data = await fetch(`https://noida-server.vercel.app/donation/savefund`, {
            method: "post",
            body: JSON.stringify({ name, number, email, desc, amount, images, userid, totalamount, bankname, accountnumber, ifsccode, heading, callid }),
            headers: {
                'content-type': 'application/json'
            }
        })
        data = await data.json()
        if (data) {
            console.log(data)
            setVeri(false)
            navigation.goBack()
            setLoad1(false)

        }
        else {
            setLoad1(false)
        }
    }

    return (
        <View style={{ flex: 1 }}>

            <Modal isVisible={veri}>
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
                    }} onPress={() => postdonation()}>
                        {
                            load1 ? <ActivityIndicator size={44}></ActivityIndicator> : <Text style={{ color: "#fff", fontSize: 15, fontWeight: "500", textAlign: "center" }}>Apply Now</Text>
                        }
                    </TouchableOpacity>

                </View>

            </Modal>
            <TouchableOpacity style={{ position: "absolute", right: 15, top: 10 }} onPress={() => setVeri(true)}>
                <Icon name="arrow-right" size={54} color="rgba(0, 178, 255, 1)"></Icon>
            </TouchableOpacity>
            <Text style={{
                marginTop: 40,
                textAlign: "center",
                fontSize: 20,
                color: "#000",
                fontWeight: "500"
            }}>Setup Fundraiser</Text>
            <View style={{
                alignSelf: "center",
                width: "70%",
                height: 2,
                backgroundColor: "rgba(154, 154, 154, 1)",
                marginTop: 7
            }}></View>
            <Text style={{ fontSize: 20, padding: 5, color: "#000", marginLeft: 20 }}>Add some basic details about yourself</Text>
            <View style={{ marginBottom: 200 }}>
                <ScrollView>
                    <TextInput style={{
                        width: 300,
                        padding: 7,
                        backgroundColor: "#fff",
                        alignSelf: "center",
                        paddingLeft: 15,
                        borderRadius: 10,
                        marginTop: 10,
                        elevation: 20
                    }} value={name} onChangeText={(text) => setName(text)} placeholder="Enter Name"></TextInput>
                    <TextInput style={{
                        width: 300,
                        padding: 7,
                        backgroundColor: "#fff",
                        alignSelf: "center",
                        paddingLeft: 15,
                        borderRadius: 10,
                        marginTop: 10,
                        elevation: 20
                    }} value={number} onChangeText={(text) => setNumber(text)} placeholder="Enter Number"></TextInput>
                    <TextInput style={{
                        width: 300,
                        padding: 7,
                        backgroundColor: "#fff",
                        alignSelf: "center",
                        paddingLeft: 15,
                        borderRadius: 10,
                        marginTop: 10,
                        elevation: 20
                    }} value={heading} onChangeText={(text) => setHeading(text)} placeholder="Enter Heading"></TextInput>
                    <View style={{
                        alignSelf: "center",
                        width: "95%",
                        height: 2,
                        backgroundColor: "rgba(154, 154, 154, 1)",
                        marginTop: 15
                    }}></View>
                    <Text style={{ fontSize: 20, padding: 5, color: "#000", marginLeft: 20 }}>Why are you raising this fund?</Text>
                    <TextInput style={{
                        width: 300,
                        height: 100,
                        padding: 7,
                        backgroundColor: "#fff",
                        alignSelf: "center",
                        paddingLeft: 15,
                        borderRadius: 10,
                        marginTop: 10,
                        elevation: 20
                    }} placeholder="Add Description"></TextInput>
                    <Text style={{ fontSize: 20, padding: 5, color: "#000", marginLeft: 20 }}>Add Images for Prove?</Text>
                    <TouchableOpacity style={{
                        width: 200,
                        padding: 7,
                        backgroundColor: "rgba(0, 164, 216, 1)",
                        alignSelf: "center",
                        paddingLeft: 15,
                        borderRadius: 10,
                        marginTop: 10
                    }} onPress={() => Picker()}>
                        {
                            load ? <ActivityIndicator size={44}></ActivityIndicator> : <Text style={{ color: "#fff", fontSize: 15, fontWeight: "500", textAlign: "center" }}>Add Images</Text>
                        }

                    </TouchableOpacity>


                </ScrollView>

            </View>
        </View>
    )
}

export default Risefund;