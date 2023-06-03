import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, ImageBackground, TextInput, TouchableOpacity, Button } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'
import RazorpayCheckout from 'react-native-razorpay';
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Geolocation from '@react-native-community/geolocation';
import DocumentPicker from 'react-native-document-picker'

const Singleambulance = ({ navigation, route }) => {
    const [load, setLoad] = useState(false)
    const id = route.params;
    const [Patientname, setPatientName] = useState('');
    const [Patientemail, setPatientEmail] = useState('')
    const [problem, setProblem] = useState('');
    const [Patientnumber, setPatientNumber] = useState('');
    const [price, setprice] = useState('');
    const [Hospitalid, setHospitalId] = useState('')
    const [Hospitalname, setHospitalName] = useState('')
    const [status, setStatus] = useState("booked")
    const [Hostpitalnumber, setHostpitalNumber] = useState('')
    const [patientlat, setPatientlat] = useState(null);
    const [patientlog, setPatientlog] = useState(null);
    const [images, setImages] = useState()


    useEffect(() => {
        getdata();
        loc();
    }, [])
    const getdata = async () => {
        let data = await fetch(`https://vertual-server.vercel.app/doctor/single/${id}`);
        data = await data.json()
        if (data) {
            setHospitalId(data._id)
            setHospitalName(data.hosname)
            setHostpitalNumber(data.Hostpitalnumber)
        }
    }

    const Picker = async () => {

        try {
            let data = await DocumentPicker.pick();
            setImages(data)
        } catch (error) {

            if (DocumentPicker.isCancel(error)) {
                console.log(error)
            }
            else {
                console.log(error)
            }
        }
    }


    const pay = () => {
        var options = {
            currency: 'INR',
            key: 'rzp_test_MtraH0q566XjUb',
            amount: '5000',
            name: 'Virtual Hospital',
            prefill: {
                email: 'virtualhos1145@gmail.com',
                contact: '8340175751',
                name: 'virtual hospital'
            },
            theme: { color: '#F37254' }
        }
        RazorpayCheckout.open(options).then((data) => {
            if (data) {
                postamb();

            }
        }).catch((error) => {
            alert(`Error: ${error.code} | ${error.description}`);
        });
    }

    const loc = () => {
        Geolocation.getCurrentPosition(
            position => {
                setPatientlat(position.coords.latitude);
                setPatientlog(position.coords.longitude);
            }
        );
    }
    console.log(patientlat, patientlog)

    const postamb = async () => {
        let Patientid = await AsyncStorage.getItem('users');
        Patientid = await JSON.parse(Patientid).data._id
        let Patientemail = await AsyncStorage.getItem('users');
        Patientemail = await JSON.parse(Patientemail).data.email
        // Patientname = await JSON.parse(Patientname).data.name
        // Patientnumber = await JSON.parse(Patientnumber).data.number
        let data = await fetch(`https://vertual-server.vercel.app/user/amb`, {
            method: 'post',
            body: JSON.stringify({ Patientname, Patientid, patientlat, patientlog, Patientnumber, price, Hospitalid, Hospitalname, status }),
            headers: {
                'content-type': 'application/json'
            }
        })
        data = await data.json();
        if (data) {
            navigation.navigate('sucessamb', {
                Hospitalname,
                Hospitalid,
                Hostpitalnumber,
                status
            }

            )
            bookemail(Patientemail)
        }

    }

    const bookemail = async (Email) => {
        let data = await fetch('http://localhost:4500/user/book/notify', {
            method: "post",
            body: JSON.stringify({ Email }),
            headers: {
                "content-type": "application/json"
            }
        })
        data = await data.json();
        if (data) {
            console.log(data)
        }
    }

    // const getuser = async () => {
    //     try {
    //         let jsonValue = await AsyncStorage.getItem('user');
    //         jsonValue = await JSON.parse(jsonValue)
    //         setPatientId(jsonValue.data._id);
    //         setPatientName(data.data.name);
    //         setPatientNumber(data.data.number)
    //         setPatientEmail(data.data.email)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    return (
        <View style={{ flex: 1 }}>


            <Modal isVisible={load}>
                <View style={{ flex: 1, backgroundColor: "#fff", opacity: 0.8, borderRadius: 10 }}>
                    <Text style={{
                        position: "absolute",
                        right: 17,
                        top: 10,
                        fontSize: 15
                    }} onPress={() => setLoad(false)}><Icon name="close" size={30}></Icon></Text>
                    <ImageBackground style={{
                        height: 200,
                        marginTop: 30
                    }} source={require('../assets/do.png')}>

                    </ImageBackground>
                    <TextInput placeholder="Enter name" style={{
                        alignSelf: "center",
                        backgroundColor: "#fff",
                        width: 300,
                        marginTop: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        paddingLeft: 15
                    }} value={Patientname} onChangeText={(text) => setPatientName(text)} ></TextInput>
                    <TextInput placeholder="Enter Number" style={{
                        alignSelf: "center",
                        backgroundColor: "#fff",
                        width: 300,
                        marginTop: 17,
                        borderWidth: 1,
                        borderRadius: 5,
                        paddingLeft: 15
                    }} value={Patientnumber} onChangeText={(text) => setPatientNumber(text)} ></TextInput>
                    <TextInput placeholder="Enter Problem" style={{
                        alignSelf: "center",
                        backgroundColor: "#fff",
                        width: 300,
                        marginTop: 17,
                        borderWidth: 1,
                        borderRadius: 5,
                        paddingLeft: 15
                    }} value={problem} onChangeText={(text) => setPatientName(text)} ></TextInput>
                    <View style={{
                        marginTop: 15,
                        width: 300,
                        alignSelf: "center",
                        padding: 5
                    }}>
                        <Button onPress={Picker} title="Enter document"></Button>
                    </View>
                    <TouchableOpacity style={{
                        width: 230,
                        backgroundColor: "#2cbfe6",
                        alignSelf: "center",
                        marginTop: 30,
                        padding: 10,
                        borderRadius: 5
                    }} onPress={pay} >
                        <Text style={{
                            textAlign: "center",
                            fontSize: 20,
                            color: "#fff",
                            fontWeight: "700"
                        }}>Pay now</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <View style={{
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
                        width: "100%",
                        marginLeft: 10
                    }} source={require('../Images/do.png')}></ImageBackground>
                    </View>
                    <View style={{
                        width: "70%",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10
                    }}>
                        <Text style={{ fontWeight: '500' }}>Rims raipur</Text>
                        <Text>30 min to Reach</Text>
                        <TouchableOpacity style={{
                            backgroundColor: "rgb(47,188,245)",
                            padding: 5,
                            borderRadius: 5,
                            width: 150,
                            marginTop: 10
                        }} onPress={() => setLoad(true)}><Text style={{
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

            </View>





            <ScrollView>


                <View style={{
                    width: "100%",
                    height: "100%",
                    marginTop: 10
                }}>
                    <View style={{
                        width: "98%",
                        height: 130,
                        backgroundColor: "rgb(47,188,245)",
                        borderTopEndRadius: 20,
                        borderTopLeftRadius: 20,
                        alignSelf: "center"
                    }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row", marginTop: 30 }}>
                                <Icon name="person" size={55} color="#fff"></Icon>
                                <View style={{}}>
                                    <Text style={{ fontSize: 25, fontWeight: "600", color: "#fff" }}>1000+</Text>
                                    <Text style={{ fontSize: 20, fontWeight: "300" }}>Patients</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: 30 }}>
                                <Icon name="person" size={55} color="#fff"></Icon>
                                <View style={{}}>
                                    <Text style={{ fontSize: 25, fontWeight: "600", color: "#fff" }}>10 Year</Text>
                                    <Text style={{ fontSize: 20, fontWeight: "300" }}>experience</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        width: "98%",
                        height: "100%",
                        alignSelf: "center",
                        backgroundColor: "#fff",
                        borderTopEndRadius: 20,
                        borderTopLeftRadius: 20,
                        elevation: 20,
                        position: "relative",
                        bottom: 20
                    }}>
                        <View style={{ marginTop: 14, marginLeft: 13 }}>
                            <Text style={{ fontWeight: "600", fontSize: 16 }}>About Hospital</Text>
                            <Text style={{ marginTop: 5, fontSize: 13, }}>
                                Hospital, an institution that is built, staffed, and equipped for
                                the diagnosis of disease; for the treatment, both medical and surgical,
                                of the sick and the injured; and for their housing during this process.
                                The modern hospital also often serves as a centre for investigation and for teaching.
                            </Text>
                            <View style={{ marginTop: 15 }}>
                                <Text style={{ fontSize: 16, fontWeight: "600" }}>Working Time</Text>
                                <Text style={{ marginTop: 5, fontSize: 13 }}>Mon-Fri 9:00Am-8:00Pm</Text>
                            </View>
                            <View style={{ marginTop: 15 }}>
                                <Text style={{ fontSize: 16, fontWeight: "600" }}>Reaching time</Text>
                                <Text style={{ marginTop: 5, fontSize: 13 }}>30 mins</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Singleambulance;