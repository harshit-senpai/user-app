import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator, Alert } from "react-native";
import Modal from "react-native-modal";
import DocumentPicker from 'react-native-document-picker'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Geolocation from '@react-native-community/geolocation';

const Emergencypost = ({ navigation }) => {
    const [visi, setVisi] = useState(false)
    const [heading, setHeading] = useState('')
    const [subheading, setSubheading] = useState('')
    const [desc, setDesc] = useState('')
    const [images, setImages] = useState('')
    const [emergency, setEmergency] = useState("true")
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [load, setLoad] = useState(false)
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')
    const [notify, setNotify] = useState(true)
    const [load1, setLoad1] = useState(false)

    useEffect(() => {
        loc()
    }, [])

    const loc = () => {
        Geolocation.getCurrentPosition(
            position => {
                console.log(position.coords.latitude)
                setLat(position.coords.latitude)
                setLon(position.coords.longitude)
            }
        );
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
            console.log(file)

        }
    }
    const postemergency = async () => {
        setLoad(true)
        let userid = await AsyncStorage.getItem('users')
        userid = await JSON.parse(userid).data._id
        let data = await fetch(`https://noida-server.vercel.app/post/postarticle`, {
            method: "post",
            body: JSON.stringify({ emergency, images, name, email, heading, subheading, desc, userid, lat, lon }),
            headers: {
                'content-type': 'application/json'
            }
        })
        data = await data.json()
        console.log(data)
        if (data) {
            console.log(data)
            setLoad(false)
            setVisi(true)
        }
        else {
            setLoad(false)
        }

    }

    const notifyemail = async () => {
        setLoad1(true)
        let data = fetch(`https://noida-server.vercel.app/ngo/notify`, {
            method: "post",
            body: JSON.stringify({ lat, lon }),
            headers: {
                'content-type': 'application/json'
            }
        })
        data = (await data).json()
        if (data) {
            Alert.alert("Send sucessfully")
            setLoad1(false)
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <Modal isVisible={notify}>

                {
                    load1 ? <ActivityIndicator size={44}></ActivityIndicator> : <View style={{ flex: 1, borderRadius: 10, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" }}>
                        <TouchableOpacity style={{ padding: 20 }} onPress={() => setNotify(false)}>
                            <Image source={require('../Images/cancel.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: 200, backgroundColor: "red", padding: 10
                        }} onPress={() => notifyemail()}>
                            <Text style={{ textAlign: "center", fontSize: 25, borderRadius: 12, color: "#fff" }}>Notify All</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: 200, backgroundColor: "red", padding: 10,
                            marginTop: 10
                        }} onPress={() => navigation.navigate('doctorlist')}>
                            <Text style={{ textAlign: "center", fontSize: 25, borderRadius: 12, color: "#fff" }}>Find Doctor</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: 200, backgroundColor: "red", padding: 10,
                            marginTop: 10
                        }} onPress={() => navigation.navigate('hospital')}>
                            <Text style={{ textAlign: "center", fontSize: 20, borderRadius: 12, color: "#fff" }}>Find Ambulance</Text>
                        </TouchableOpacity>

                    </View>
                }


            </Modal>

            <Modal isVisible={visi}>
                <View style={{ flex: 1, backgroundColor: "#fff", borderRadius: 10 }}>
                    <TouchableOpacity style={{ padding: 20 }} onPress={() => setVisi(false)}>
                        <Image source={require('../Images/cancel.png')}></Image>
                    </TouchableOpacity>
                    <Text style={{ textAlign: "center", fontSize: 20, color: "#000", fontWeight: "500" }}>Success</Text>
                    <View style={{
                        alignSelf: "center",
                        width: "95%",
                        height: 2,
                        backgroundColor: "rgba(154, 154, 154, 1)",
                        marginTop: 7
                    }}>
                    </View>
                    <Image style={{ marginTop: 80, alignSelf: "center", width: 200, height: 200 }} source={require('../Images/sucess.png')}></Image>
                    <Text style={{ padding: 10 }}>Your emergency report has been sent to the official’s
                        and our team will get back to you ASAP!!</Text>

                    <TouchableOpacity style={{
                        width: 250,
                        padding: 7,
                        backgroundColor: "#000",
                        alignSelf: "center",
                        paddingLeft: 15,
                        borderRadius: 7,
                        marginTop: 10
                    }} onPress={() => navigation.goBack()}><Text style={{ color: "#fff", fontSize: 15, fontWeight: "500", textAlign: "center" }}>Back</Text></TouchableOpacity>

                </View>

            </Modal>


            <TouchableOpacity style={{ padding: 20 }} onPress={() => navigation.goBack()}>
                <Image source={require('../Images/cancel.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={{ position: "absolute", right: 20, top: 10 }} onPress={() => setNotify(true)}>
                <Image source={require('../Images/cancel.png')}></Image>
            </TouchableOpacity>
            <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "500" }}>Enter your details</Text>
            <View style={{
                alignSelf: "center",
                width: "95%",
                height: 2,
                backgroundColor: "rgba(154, 154, 154, 1)",
                marginTop: 7
            }}>
            </View>
            <View style={{ marginTop: 30 }}>
                <TextInput style={{
                    width: 300,
                    padding: 7,
                    backgroundColor: "#fff",
                    alignSelf: "center",
                    paddingLeft: 15,
                    borderRadius: 10
                }} value={name} onChangeText={(text) => setName(text)} placeholder="Enter Name"></TextInput>
                <TextInput style={{
                    width: 300,
                    padding: 7,
                    backgroundColor: "#fff",
                    alignSelf: "center",
                    paddingLeft: 15,
                    borderRadius: 10,
                    marginTop: 10
                }} value={email} onChangeText={(text) => setEmail(text)} placeholder="Enter Email"></TextInput>
                <TextInput style={{
                    width: 300,
                    padding: 7,
                    backgroundColor: "#fff",
                    alignSelf: "center",
                    paddingLeft: 15,
                    borderRadius: 10,
                    marginTop: 10
                }} value={heading} onChangeText={(text) => setHeading(text)} placeholder="Add Heading"></TextInput>
                <TextInput style={{
                    width: 300,
                    padding: 7,
                    backgroundColor: "#fff",
                    alignSelf: "center",
                    paddingLeft: 15,
                    borderRadius: 10,
                    marginTop: 10
                }} value={subheading} onChangeText={(text) => setSubheading(text)} placeholder="Add SunHeading"></TextInput>
                <TouchableOpacity style={{
                    width: 300,
                    padding: 7,
                    backgroundColor: "rgba(0, 164, 216, 1)",
                    alignSelf: "center",
                    paddingLeft: 15,
                    borderRadius: 10,
                    marginTop: 10
                }} onPress={() => Picker()}><Text style={{ color: "#fff", fontSize: 15, fontWeight: "500" }}>Add Images</Text></TouchableOpacity>
                <TextInput style={{
                    width: 300,
                    height: 100,
                    padding: 7,
                    backgroundColor: "#fff",
                    alignSelf: "center",
                    paddingLeft: 15,
                    borderRadius: 10,
                    marginTop: 10
                }} value={desc} onChangeText={(text) => setDesc(text)} placeholder="Descripition"></TextInput>

                <TouchableOpacity style={{
                    width: 250,
                    padding: 7,
                    backgroundColor: "rgba(255, 46, 0, 1)",
                    alignSelf: "center",
                    paddingLeft: 15,
                    borderRadius: 7,
                    marginTop: 20
                }} onPress={() => postemergency()}>
                    {
                        load ? <ActivityIndicator size={44}></ActivityIndicator> : <Text style={{ color: "#fff", textAlign: "center", fontSize: 15, fontWeight: "500" }}>Submit</Text>
                    }
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Emergencypost;