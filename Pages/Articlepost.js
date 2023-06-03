import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import DocumentPicker from 'react-native-document-picker'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Geolocation from '@react-native-community/geolocation';

const ArticlePost = ({ navigation }) => {
    const [visi, setVisi] = useState(false)
    const [heading, setHeading] = useState('')
    const [subheading, setSubheading] = useState('')
    const [desc, setDesc] = useState('')
    const [images, setImages] = useState('')
    const [load, setLoad] = useState(false)
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')

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
            console.log(file)
            setImages(file.secure_url)
            setLoad(false)
        }
    }



    const postarctile = async () => {
        setLoad(true)
        let userid = await AsyncStorage.getItem('users')
        userid = await JSON.parse(userid).data._id
        let data = await fetch(`https://noida-server.vercel.app/post/postarticle`, {
            method: "post",
            body: JSON.stringify({ images, heading, subheading, desc, lat, lon, userid }),
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
    return (
        <View style={{ flex: 1 }}>
            <Modal isVisible={visi}>
                <View style={{ flex: 1, backgroundColor: "#fff", borderRadius: 10 }}>
                    <TouchableOpacity style={{ padding: 20 }} onPress={() => setVisi(false)}>
                        <Image source={require('../Images/cancel.png')}></Image>
                    </TouchableOpacity>
                    <Text style={{ textAlign: "center", fontSize: 20, color: "#000", fontWeight: "500" }}>Article Posted</Text>
                    <View style={{
                        alignSelf: "center",
                        width: "95%",
                        height: 2,
                        backgroundColor: "rgba(154, 154, 154, 1)",
                        marginTop: 7
                    }}>
                    </View>
                    <Image style={{ marginTop: 80, alignSelf: "center", width: 200, height: 200 }} source={require('../Images/sucess.png')}></Image>
                    <Text style={{ padding: 10 }}>Once this article is reviewed by our team it will be posted for the users.</Text>

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
            <Text style={{ textAlign: "center", fontSize: 20, color: "#000" }}>Post article</Text>
            <View style={{
                alignSelf: "center",
                width: "70%",
                height: 2,
                backgroundColor: "rgba(154, 154, 154, 1)",
                marginTop: 5
            }}></View>
            <View>
                <Text style={{
                    margin: 20,
                    fontSize: 20
                }}>Add Images</Text>
                <View style={{
                    width: 300,
                    height: 100,
                    alignSelf: "center",
                    borderWidth: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <TouchableOpacity onPress={() => Picker()}>
                        <Image style={{ alignSelf: "center" }} source={require('../Images/gallery.png')}></Image>
                        <Text style={{ color: "#000", fontWeight: "500" }}>Upload from gallery or click.</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 15 }}>
                    <TextInput style={{
                        width: 300,
                        padding: 7,
                        backgroundColor: "#fff",
                        alignSelf: "center",
                        paddingLeft: 15,
                        borderRadius: 10,
                        elevation: 20
                    }} value={heading} onChangeText={(text) => setHeading(text)} placeholder="Enter Heading"></TextInput>
                    <TextInput style={{
                        width: 300,
                        padding: 7,
                        backgroundColor: "#fff",
                        alignSelf: "center",
                        paddingLeft: 15,
                        borderRadius: 10,
                        elevation: 20,
                        marginTop: 10
                    }} value={subheading} onChangeText={(text) => setSubheading(text)} placeholder="Enter SubHeading"></TextInput>
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
                    }} value={desc} onChangeText={(text) => setDesc(text)} placeholder="Enter Heading"></TextInput>
                </View>
                <TouchableOpacity style={{
                    width: 250,
                    padding: 7,
                    backgroundColor: "rgba(255, 46, 0, 1)",
                    alignSelf: "center",
                    paddingLeft: 15,
                    borderRadius: 7,
                    marginTop: 20
                }} onPress={() => postarctile()}>
                    {
                        load ? <ActivityIndicator size={44}></ActivityIndicator> : <Text style={{ color: "#fff", textAlign: "center", fontSize: 15, fontWeight: "500" }}>Submit</Text>
                    }
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default ArticlePost