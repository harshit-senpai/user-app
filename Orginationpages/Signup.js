import React, { useState } from "react";
import { View, Text, Image, ImageBackground, ActivityIndicator, TextInput, TouchableOpacity, ToastAndroid, ScrollView, Alert } from "react-native";


const Signupowner = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [load, setLoad] = useState(false)

    const signup = async () => {
        setLoad(true)
        let data = await fetch(`https://noida-server.vercel.app/ngo/check/${email}`)
        data = await data.json();
        if (data.email) {
            setLoad(false)
            Alert.alert("User already resistred")
        }
        else {
            let otp = Math.floor(Math.random() * 100000);
            console.log(otp)
            if (otp) {
                let data = await fetch(`https://noida-server.vercel.app/user/veri`, {
                    method: "post",
                    body: JSON.stringify({ email, otp }),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                data = await data.json();
                if (data) {
                    setLoad(false)
                    navigation.navigate('otpowner',
                        {
                            name, email, number, password, otp
                        })
                }
            }

        }
    }

    return (
        <View style={{ flex: 1, }}>
            <ScrollView>
                <View style={{
                    marginTop: 30,
                }}>
                    <Text style={{
                        textAlign: "center", color: "black", fontSize: 23,
                        fontWeight: "bold"
                    }}>Create an account(Ngo)</Text>
                    <View style={{
                        alignSelf: "center", width: 70, height: 70, borderRadius: 50,
                        marginTop: 50
                    }}>
                        <Image style={{
                            width: 70, height: 80
                        }} source={require('../Images/logo.png')}></Image>
                    </View>

                    <View style={{
                        alignSelf: "center",
                        marginTop: 45
                    }}>
                        <TextInput style={{
                            borderWidth: 1, width: 330,
                            padding: 8,
                            borderRadius: 7,
                            borderColor: "black"
                        }} placeholder="Enter Name " value={name} onChangeText={(text) => setName(text)} ></TextInput>
                        <TextInput style={{
                            borderWidth: 1, width: 330,
                            padding: 8,
                            borderRadius: 7,
                            marginTop: 10,
                            borderColor: "black"
                        }} placeholder="Enter Number " value={number} onChangeText={(text) => setNumber(text)} ></TextInput>
                        <TextInput style={{
                            borderWidth: 1, width: 330,
                            padding: 8,
                            borderRadius: 7,
                            marginTop: 10,
                            borderColor: "black"
                        }} placeholder="Enter Email" value={email} onChangeText={(text) => setEmail(text)} ></TextInput>
                        <TextInput style={{
                            borderWidth: 1, width: 330,
                            padding: 8,
                            borderRadius: 7,
                            marginTop: 10,
                            borderColor: "black"
                        }} placeholder="Email Password " value={password} onChangeText={(text) => setPassword(text)} ></TextInput>
                        <TouchableOpacity style={{
                            width: 330,
                            backgroundColor: "rgba(31, 31, 31, 1)",
                            padding: 10,
                            borderRadius: 5,
                            marginTop: 14,

                        }} onPress={() => signup()} >
                            {
                                load ? <ActivityIndicator size={"large"} /> : <Text style={{
                                    fontWeight: "500",
                                    fontSize: 20,
                                    textAlign: "center",
                                    color: "#fff"
                                }}
                                >Next </Text>
                            }

                        </TouchableOpacity>
                    </View>
                    <View style={{
                        marginTop: 40,
                        alignSelf: "center",
                    }}>
                        <Text>Already Have a account? <Text style={{
                            color: "rgba(45, 142, 254, 1)",
                            fontSize: 18,
                            fontWeight: "bold"
                        }} onPress={() => navigation.navigate('login')}>Login</Text></Text>
                    </View>
                    <View style={{
                        marginTop: 10,
                        alignSelf: "center",
                        width: 250
                    }}>
                        <Text style={{
                            textAlign: "center",
                        }}>By signing up, you agree to our
                            Terms, <Text style={{ fontWeight: "bold", color: "black" }}>Data Policy and Cookies Policy.</Text></Text>
                    </View>
                </View>

            </ScrollView>

        </View>
    )
}

export default Signupowner;