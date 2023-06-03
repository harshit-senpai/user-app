import React, { useState } from "react";
import { View, Text, ImageBackground, TextInput, ActivityIndicator, TouchableOpacity, ToastAndroid, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'


const Forget = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [load, setLoad] = useState(false)
    const [data, setData] = useState(false)
    const [otpp, setOtpp] = useState('')
    const [loading, setLoading] = useState(false)
    const [passset, setPassset] = useState(false)
    const [password, setPassword] = useState('');
    const [compassword, setCompassword] = useState('')
    const [veri0, setVeri0] = useState('');
    const [veri1, setVeri1] = useState('');
    const [veri2, setVeri2] = useState('');
    const [veri3, setVeri3] = useState('');
    const [veri4, setVeri4] = useState('');

    let veri = `${veri0}${veri1}${veri2}${veri3}${veri4}`


    async function fun() {
        setLoad(true)
        let data = await fetch(`https://noida-server.vercel.app/user/checkemail/${email}`)
        data = await data.json()
        if (data.email) {
            let otp = Math.floor(Math.random() * 100000);
            setOtpp(otp);
            let result = await fetch('https://noida-server.vercel.app/user/veri', {
                method: "post",
                body: JSON.stringify({ email, otp }),
                headers: {
                    'content-type': 'application/json'
                }
            });
            result = await result.json()
            if (result) {
                setData(true)
                setLoad(false)
            }
        }
        else {
            setLoad(false)
            ToastAndroid.show('Incorrect Email', ToastAndroid.SHORT);
        }

    }
    const verify = async () => {
        setLoad(true)
        if (veri == otpp) {
            setPassset(true)
            setData(false)
            setLoad(false)
        }
        else {
            setLoad(false);
        }
    }
    const changepass = async () => {
        setLoad(true)
        if (password == compassword) {
            let result = await fetch('https://noida-server.vercel.app/user/forget', {
                method: "put",
                body: JSON.stringify({ email, password }),
                headers: {
                    'content-type': 'application/json'
                }
            });
            if (result) {
                console.log(result)
                navigation.navigate('login')
            }

        }
        else {
            setLoad(false)
            ToastAndroid.show('Password not matched', ToastAndroid.SHORT);
        }


    }

    return (
        <View style={{
            flex: 1,
        }}>

            {
                data ? <View style={{ flex: 1, marginTop: "10%" }} >
                    <View style={{
                        flexDirection: "row"
                    }}>
                        <Icon style={{
                            marginBottom: 10
                        }} onPress={() => navigation.goBack()} name="arrow-left" size={54} color="black" />
                        <Text style={{
                            fontSize: 30,
                            color: "black",
                            fontWeight: "bold",
                            marginTop: 5
                        }}>OTP Verification</Text>
                    </View>
                    <View style={{
                        width: 220,
                        alignSelf: "center",
                        marginTop: 30
                    }}>
                        <Text style={{
                            textAlign: "center",
                            fontSize: 20,
                            color: "black"
                        }}>Enter 6 digit OTP sent to your mobile number.</Text>
                    </View>

                    <View style={{
                        alignSelf: "center",
                        marginTop: "10%"
                    }} >
                        <View style={styles.input}>
                            <TextInput onChangeText={(text) => setVeri0(text)} maxLength={1} style={styles.otp}></TextInput>
                            <TextInput onChangeText={(text) => setVeri1(text)} maxLength={1} style={styles.otp}></TextInput>
                            <TextInput onChangeText={(text) => setVeri2(text)} maxLength={1} style={styles.otp}></TextInput>
                            <TextInput onChangeText={(text) => setVeri3(text)} maxLength={1} style={styles.otp}></TextInput>
                            <TextInput onChangeText={(text) => setVeri4(text)} maxLength={1} style={styles.otp}></TextInput>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={{
                            marginTop: 10,
                            backgroundColor: "rgba(31, 31, 31, 1)",
                            padding: 10,
                            width: 300,
                            marginLeft: 15,
                            borderRadius: 10,
                            alignSelf: "center"
                        }} onPress={() => verify()}>
                            {
                                load ? <ActivityIndicator size={'large'} /> : <Text style={{
                                    textAlign: "center",
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    color: "#fff"
                                }}>Sign in</Text>

                            }

                        </TouchableOpacity>
                    </View>

                </View>
                    : passset ? <View style={{
                        marginTop: "5%"
                    }}>

                        <View style={{
                            flexDirection: "row"
                        }}>

                            <Icon style={{
                                marginBottom: 10
                            }} onPress={() => navigation.goBack()} name="arrow-left" size={54} color="black" />
                            <Text style={{
                                fontSize: 25,
                                color: "black",
                                fontWeight: "bold",
                                marginTop: 5
                            }}> Reset Your Password</Text>
                        </View>

                        <View style={{
                            marginTop: 60,
                            justifyContent: "center",
                            alignItems: "center",

                        }}>
                            <TextInput style={{
                                borderWidth: 1, width: 330,
                                padding: 8,
                                borderRadius: 7,
                                borderColor: "black"
                            }} placeholder="Enter New password " value={password} onChangeText={(text) => setPassword(text)}></TextInput>
                            <TextInput style={{
                                borderWidth: 1, width: 330,
                                padding: 8,
                                marginTop: 10,
                                borderRadius: 7,
                                borderColor: "black"
                            }} placeholder="Re-Enter password  " value={compassword} onChangeText={(text) => setCompassword(text)}></TextInput>


                            <TouchableOpacity style={{
                                width: 330,
                                backgroundColor: "rgba(31, 31, 31, 1)",
                                padding: 14,
                                borderRadius: 5,
                                marginTop: 14,

                            }} onPress={() => changepass()} >

                                {
                                    load ? <ActivityIndicator size={"large"} /> : <Text style={{
                                        fontWeight: "500",
                                        fontSize: 22,
                                        textAlign: "center",
                                        color: "#fff"
                                    }} >  Continue </Text>
                                }
                            </TouchableOpacity>


                        </View>
                    </View> :

                        <View style={{
                            marginTop: "5%"
                        }}>

                            <View style={{
                                flexDirection: "row"
                            }}>

                                <Icon style={{
                                    marginBottom: 10
                                }} onPress={() => navigation.goBack()} name="arrow-left" size={54} color="black" />
                                <Text style={{
                                    fontSize: 30,
                                    color: "black",
                                    fontWeight: "bold",
                                    marginTop: 5
                                }}> Recovering Your Account</Text>
                            </View>

                            <View style={{
                                marginTop: 50,
                                width: 320,
                                alignSelf: "center"
                            }}>
                                <Text style={{
                                    fontSize: 20,
                                    textAlign: "center",
                                    color: "black"
                                }}>
                                    Enter your Phone Number you used while creating your account
                                </Text>
                            </View>


                            <View style={{
                                marginTop: 60,
                                justifyContent: "center",
                                alignItems: "center",

                            }}>

                                <TextInput style={{
                                    borderWidth: 1, width: 330,
                                    padding: 8,
                                    borderRadius: 7,
                                    borderColor: "black",
                                    fontSize: 15
                                }} placeholder="Email and Number " value={email} onChangeText={(text) => setEmail(text)}></TextInput>

                                <TouchableOpacity style={{
                                    width: 330,
                                    backgroundColor: "rgba(31, 31, 31, 1)",
                                    padding: 10,
                                    borderRadius: 5,
                                    marginTop: 20,

                                }} onPress={() => fun()} >

                                    {
                                        load ? <ActivityIndicator size={"large"} /> : <Text style={{
                                            fontWeight: "500",
                                            fontSize: 20,
                                            textAlign: "center",
                                            color: "#fff"
                                        }} >  Get Otp </Text>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>

            }


        </View>
    )
}

export default Forget;

const styles = StyleSheet.create({
    btn: {
        borderWidth: 2,
        padding: 20,
        width: 300,
        textAlign: "center",
        borderColor: "rgba(51, 176, 246, 1)",
        borderRadius: 10,
        alignSelf: "center"
    },
    input: {
        padding: 18,
        width: 300,
        textAlign: "center",
        borderColor: "rgba(51, 176, 246, 1)",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center"
    },
    otp: {
        width: 50,
        borderWidth: 1,
        marginLeft: 10,
        textAlign: "center",
        borderRadius: 10,
    },
    Otptext: {
        fontSize: 30,
        marginBottom: 30,
        marginRight: 220
    }

})













