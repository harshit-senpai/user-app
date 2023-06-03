import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, ImageBackground, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'
import RazorpayCheckout from 'react-native-razorpay';
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Singledoctor = ({ navigation, route }) => {
    const id = route.params;
    const [load, setLoad] = useState(false)
    const [name, setName] = useState('');
    const [sep, setSep] = useState('');
    const [des, setDes] = useState('');

    // const [Patientid, setPatientId] = useState('');
    const [Patientname, setPatientName] = useState('');
    const [Patientemail, setPatientEmail] = useState('')
    const [problem, setProblem] = useState('');
    const [Patientnumber, setPatientNumber] = useState('');
    const [price, setprice] = useState('');
    const [HospitalId, sethospitalId] = useState('')
    const [docname, setdocName] = useState('')
    const [status, setStatus] = useState("booked")
    const [Hostpitalnumber, setHostpitalNumber] = useState('')
    const [videoid, setVideoId] = useState('alok')

    useEffect(() => {
        getdata();
    }, [])

    const getdata = async () => {
        let data = await fetch(`https://vertual-server.vercel.app/doctor/single/${id}`);
        data = await data.json()
        console.log(data)
        if (data) {
            setdocName(data.name);
            setSep(data.speclist);
            setprice(data.docprice);
            setHostpitalNumber(data.number)
            sethospitalId(data._id)
            setLoad(false)
        }
    }

    const pay = () => {
        var options = {
            currency: 'INR',
            key: 'rzp_test_MtraH0q566XjUb', // Your api key
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
                postamb()
            }

        }).catch((error) => {
            alert(`Error: ${error.code} | ${error.description}`);
        });
    }

    const postamb = async () => {
        let PatientId = await AsyncStorage.getItem('users');
        PatientId = await JSON.parse(PatientId).data._id
        let Patientemail = await AsyncStorage.getItem('users');
        Patientemail = await JSON.parse(Patientemail).data.email

        if (videoid) {
            let data = await fetch(`https://vertual-server.vercel.app/user/doc`, {
                method: 'post',
                body: JSON.stringify({ Patientname, Patientemail, PatientId, Patientnumber, problem, Hostpitalnumber, price, HospitalId, docname, status, videoid }),
                headers: {
                    'content-type': 'application/json'
                }
            })
            data = await data.json();
            console.log(data)
            if (data) {
                setLoad(false)
                navigation.navigate('shedule', {
                    docname,
                    HospitalId,
                    Hostpitalnumber,
                    videoid,
                    status
                }
                )
                bookemail(Patientemail)
            }
            else {
                console.log("alok")
            }

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
                    }} source={require('../Images/hos.png')}>

                    </ImageBackground>
                    <TextInput placeholder="Enter name" style={{
                        alignSelf: "center",
                        backgroundColor: "#fff",
                        width: 300,
                        marginTop: 30,
                        borderWidth: 1,
                        borderRadius: 5,
                        paddingLeft: 15
                    }} ></TextInput>
                    <TextInput placeholder="Enter Number" style={{
                        alignSelf: "center",
                        backgroundColor: "#fff",
                        width: 300,
                        marginTop: 17,
                        borderWidth: 1,
                        borderRadius: 5,
                        paddingLeft: 15
                    }} ></TextInput>
                    <TextInput placeholder="Enter Problem" style={{
                        alignSelf: "center",
                        backgroundColor: "#fff",
                        width: 300,
                        marginTop: 17,
                        borderWidth: 1,
                        borderRadius: 5,
                        paddingLeft: 15
                    }} ></TextInput>
                    <TouchableOpacity style={{
                        width: 230,
                        backgroundColor: "#2cbfe6",
                        alignSelf: "center",
                        marginTop: 30,
                        padding: 10,
                        borderRadius: 5
                    }} onPress={pay}>
                        <Text style={{
                            textAlign: "center",
                            fontSize: 20,
                            color: "#fff",
                            fontWeight: "700"
                        }}>Pay now</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <View>
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
                            width: "100%"
                        }} source={require('../Images/hos.png')}></ImageBackground>
                        </View>
                        <View style={{
                            width: "70%",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 10
                        }}>
                            <Text style={{
                                fontWeight: "500"
                            }}>DR. {docname}(Mbbs)</Text>
                            <Text>Speclist {sep}</Text>
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
                    <View style={{
                        flexDirection: "row",
                        position: "absolute",
                        left: 10
                    }}>
                        <Text style={{ color: "orange", fontSize: 20 }}>*</Text>
                        <Text style={{ marginLeft: 3, color: "orange", fontSize: 20 }}>*</Text>
                        <Text style={{ marginLeft: 3, color: "orange", fontSize: 20 }}>*</Text>
                        <Text style={{ marginLeft: 3, color: "orange", fontSize: 20 }}>*</Text>
                        <Text style={{ marginLeft: 3, color: "orange", fontSize: 20 }}>*</Text>
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
                                    <Text style={{ fontWeight: "600", fontSize: 16 }}>About Doctor</Text>
                                    <Text style={{ marginTop: 5, fontSize: 13, }}> A doctor is someone who is experienced and certified to
                                        practice medicine to help maintain or restore physical and mental health.
                                        A doctor is tasked with interacting with patients, diagnosing medical problems
                                        and successfully treating illness or injury.
                                        There are many specific areas in the field of medicine that students can study</Text>
                                    <View style={{ marginTop: 15 }}>
                                        <Text style={{ fontSize: 16, fontWeight: "600" }}>Working Time</Text>
                                        <Text style={{ marginTop: 5, fontSize: 13 }}>Mon-Fri 9:00Am-8:00Pm</Text>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={{ fontSize: 16, fontWeight: "600" }}>Qualification</Text>
                                        <Text style={{ marginTop: 5, fontSize: 13 }}>MBBS</Text>
                                    </View>

                                </View>


                            </View>

                        </View>
                    </ScrollView>
                </View>
            </View>


        </View >







    )
}

export default Singledoctor;