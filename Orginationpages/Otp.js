import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native";
import { ImageBackground, ActivityIndicator } from "react-native";


const Otpowner = ({ navigation, route }) => {
    const { name, email, number, password, otp } = route.params;
    const [veri0, setVeri0] = useState('');
    const [veri1, setVeri1] = useState('');
    const [veri2, setVeri2] = useState('');
    const [veri3, setVeri3] = useState('');
    const [veri4, setVeri4] = useState('');
    const [load, setLoad] = useState(false)

    let veri = `${veri0}${veri1}${veri2}${veri3}${veri4}`
    const fun = async () => {
        setLoad(true)
        if (veri == otp) {
            let result = await fetch(`https://noida-server.vercel.app/ngo/signup`, {
                method: 'post',
                body: JSON.stringify({ name, number, email, password }),
                headers: {
                    'content-type': 'application/json'
                }
            })
            result = await result.json();
            console.log(result)
            if (result) {
                setLoad(false)
                navigation.navigate('loginowner')
            }
            else {
                setLoad(false)
                ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
            }
        }
        else {
            setLoad(false)
            ToastAndroid.show('Wrong Otp', ToastAndroid.SHORT);
        }
    }
    return (
        <View style={{
            flex: 1,
        }}>
            <View style={{ flex: 1, alignItems: "center", marginTop: "30%" }} >
                <View >
                    <Text>OTP Verification</Text>
                    <View style={styles.input}>
                        <TextInput onChangeText={(text) => setVeri0(text)} maxLength={1} style={styles.otp}></TextInput>
                        <TextInput onChangeText={(text) => setVeri1(text)} maxLength={1} style={styles.otp}></TextInput>
                        <TextInput onChangeText={(text) => setVeri2(text)} maxLength={1} style={styles.otp}></TextInput>
                        <TextInput onChangeText={(text) => setVeri3(text)} maxLength={1} style={styles.otp}></TextInput>
                        <TextInput onChangeText={(text) => setVeri4(text)} maxLength={1} style={styles.otp}></TextInput>
                    </View>
                </View>
                <Text style={{
                    marginTop: 10,
                    fontSize: 15
                }}>Resend Otp 30s</Text>
                <View>
                    <TouchableOpacity style={{
                        marginTop: 40,
                        backgroundColor: "rgba(51, 176, 246, 1)",
                        padding: 10,
                        width: 300,
                        borderRadius: 10
                    }}>
                        {
                            load ? <ActivityIndicator size={'large'} /> : <Text style={{ textAlign: "center", fontSize: 15 }} onPress={() => fun()}>Continue</Text>
                        }

                    </TouchableOpacity>
                </View>

            </View>


        </View>
    )
}

export default Otpowner;

const styles = StyleSheet.create({
    btn: {
        borderWidth: 2,
        padding: 20,
        width: 300,
        textAlign: "center",
        borderColor: "rgba(51, 176, 246, 1)",
        borderRadius: 10
    },
    input: {
        borderEndWidth: 2,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        padding: 18,
        width: 300,
        textAlign: "center",
        borderColor: "rgba(51, 176, 246, 1)",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center"

    },
    otp: {
        width: 30,
        borderBottomWidth: 2,
        marginLeft: 10,
        textAlign: "center"

    },
    Otptext: {
        fontSize: 30,
        marginBottom: 30,
        marginRight: 220
    }

})