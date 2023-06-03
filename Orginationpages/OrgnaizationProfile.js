import React, { useState } from "react";
import { ImageBackground, Image, TouchableOpacity, ActivityIndicator, ScrollView, TextInput, View, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'
import Modal from 'react-native-modal'

const OrgainationProfile = () => {
    const [load, setLoad] = useState(true)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, SetNumber] = useState('');
    const [gender, SetGender] = useState('');
    const [images, SetImages] = useState('');
    const [id, setId] = useState('');
    const [visible, setVisible] = useState(false);
    const [url, setUrl] = useState([])
    const [load1, setLoad1] = useState(false)

    return (
        <View style={{
            flex: 1
        }}>
            <Modal isVisible={visible}>
                <ScrollView>
                    <View style={{
                        flex: 1,
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        height: 600,
                        marginTop: 30
                    }}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            marginRight: 20

                        }}>
                            <View style={{
                                position: "relative",
                                right: 40,
                                bottom: 5
                            }}>
                                <Icon style={{
                                    fontWeight: "bold"
                                }} name={"arrow-left"} size={54} color="#000" onPress={() => setVisible(false)}></Icon>
                            </View>
                            <Text style={{
                                fontSize: 25,
                                color: "rgba(0, 0, 0, 1)",
                                fontWeight: "500"
                            }}>Edit Profile</Text>
                        </View>
                        <View>
                            <View>
                                <Image style={{
                                    width: 90,
                                    height: 90,
                                    borderRadius: 50,
                                    alignSelf: "center"
                                }} source={require('../Images/home.jpg')}></Image>
                                <TouchableOpacity>
                                    <Text style={{
                                        fontSize: 18,
                                        textAlign: "center",
                                        color: "rgba(45, 142, 254, 1)"
                                    }}>Change profile</Text>

                                </TouchableOpacity>

                            </View>
                        </View>

                        <View>
                            <TextInput placeholder="Name" style={{
                                borderBottomWidth: 2,
                                width: 300,
                                alignSelf: "center",
                                fontSize: 20,
                                fontWeight: "400"
                            }}></TextInput>

                            <TextInput placeholder="Email" style={{
                                borderBottomWidth: 2,
                                width: 300,
                                alignSelf: "center",
                                fontSize: 20,
                                fontWeight: "400"
                            }} ></TextInput>

                            <TextInput placeholder="Number" style={{
                                borderBottomWidth: 2,
                                width: 300,
                                alignSelf: "center",
                                fontSize: 20,
                                fontWeight: "400"
                            }} ></TextInput>

                            <TextInput placeholder="Gender" style={{
                                borderBottomWidth: 2,
                                width: 300,
                                alignSelf: "center",
                                fontSize: 20,
                                fontWeight: "400"
                            }} ></TextInput>
                        </View>
                        <TouchableOpacity style={{
                            width: 250,
                            backgroundColor: "#000",
                            padding: 10,
                            alignSelf: "center",
                            marginTop: 25,
                            borderRadius: 7
                        }} >
                            <Text style={{
                                color: "#fff",
                                textAlign: "center",
                                fontSize: 20,
                                fontWeight: "600"
                            }}>Done</Text>


                        </TouchableOpacity>

                    </View>
                </ScrollView>

            </Modal>
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <View>


                    <Text style={{
                        color: "rgba(0, 0, 0, 1)",
                        textAlign: "center",
                        fontSize: 23,
                        fontWeight: "500"
                    }}>Profile</Text>
                    <View style={{
                        width: "90%",
                        height: 180,
                        backgroundColor: "rgba(245, 245, 245, 1)",
                        alignSelf: "center",
                        elevation: 20,
                        marginTop: 10,
                        borderRadius: 7,
                        padding: 7
                    }}>
                        <View>
                            <Image style={{
                                width: 80,
                                height: 80,
                                borderRadius: 50,
                                alignSelf: "center"
                            }} source={require('../Images/home.jpg')}></Image>

                        </View>
                        <Text style={{
                            textAlign: "center",
                            fontSize: 20,
                            color: "#000",
                            fontWeight: "700"
                        }}>{name}({gender})</Text>
                        <Text style={{
                            textAlign: "center",
                            fontSize: 15,
                        }}>{email}</Text>
                        <Text style={{
                            textAlign: "center",
                            fontSize: 15,
                        }}>{number}</Text>
                    </View>
                    <Text style={{
                        textAlign: "right",
                        marginRight: 25,
                        marginTop: 8,
                        fontSize: 20,
                        color: "rgba(45, 142, 254, 1)",
                        fontWeight: "800"
                    }} onPress={() => setVisible(true)}>Edit</Text>


                    <View style={{
                        marginTop: 15,
                        marginBottom: 100
                    }}>
                        <TouchableOpacity style={{
                            flexDirection: "row",
                            width: 330,
                            backgroundColor: "#fff",
                            alignSelf: "center",
                            padding: 10,
                            justifyContent: "space-between",
                            elevation: 20,
                            borderRadius: 7
                        }}>
                            <Text style={{
                                fontSize: 20,
                                color: "#000",
                                fontWeight: "500"
                            }}>My Application</Text>
                            <Icon name={"arrow-right"} size={33} color="black"></Icon>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            flexDirection: "row",
                            width: 330,
                            backgroundColor: "#fff",
                            alignSelf: "center",
                            padding: 10,
                            justifyContent: "space-between",
                            elevation: 20,
                            borderRadius: 7,
                            marginTop: 8
                        }}>
                            <Text style={{
                                fontSize: 20,
                                color: "#000",
                                fontWeight: "500"
                            }}>Donation list</Text>
                            <Icon name={"arrow-right"} size={33} color="black"></Icon>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            flexDirection: "row",
                            width: 330,
                            backgroundColor: "#fff",
                            alignSelf: "center",
                            padding: 10,
                            justifyContent: "space-between",
                            elevation: 20,
                            borderRadius: 7,
                            marginTop: 8
                        }}>
                            <Text style={{
                                fontSize: 20,
                                color: "#000",
                                fontWeight: "500"
                            }}>My Post</Text>
                            <Icon name={"arrow-right"} size={33} color="black"></Icon>
                        </TouchableOpacity>





                        <TouchableOpacity style={{

                            width: 200,
                            backgroundColor: "#000",
                            alignSelf: "center",
                            padding: 10,

                            elevation: 20,
                            borderRadius: 7,
                            marginTop: 20
                        }} >
                            <Text style={{
                                fontSize: 20,
                                color: "#fff",
                                fontWeight: "700",
                                textAlign: "center"
                            }}>Logout</Text>
                        </TouchableOpacity>





                    </View>






                </View>




            </ScrollView>

        </View>
    )
}

export default OrgainationProfile;