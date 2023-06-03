import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

const Post = ({ navigation }) => {
    return (
        <View style={{
            flex: 1, justifyContent: "center",
            alignItems: "center",
        }}>
            <View style={{
                width: "90%",
                backgroundColor: "#fff",
                height: 200,
                alignSelf: "center",
                elevation: 20,
            }}>
                <Text style={{ fontSize: 25, padding: 10, color: "#000" }}>Post</Text>
                <View style={{
                    alignSelf: "center",
                    width: "95%",
                    height: 2,
                    backgroundColor: "rgba(154, 154, 154, 1)",
                }}>
                </View>
                <TouchableOpacity style={{ width: "100%", marginTop: 10, marginLeft: 20 }} onPress={() => navigation.navigate('live')}>
                    <View style={{ flexDirection: "row" }}>
                        <Image source={require('../Images/live.png')}></Image>
                        <Text style={{ marginLeft: 20, fontSize: 15 }}>Go Live</Text>
                    </View>
                </TouchableOpacity>
                <View style={{
                    alignSelf: "center",
                    width: "100%",
                    height: 1,
                    backgroundColor: "rgba(154, 154, 154, 1)",
                    marginTop: 5
                }}>
                </View>
                <TouchableOpacity style={{ width: "100%", marginTop: 10, marginLeft: 20 }} onPress={() => navigation.navigate('emergency')}>
                    <View style={{ flexDirection: "row" }}>
                        <Image source={require('../Images/emergency.png')}></Image>
                        <Text style={{ marginLeft: 20, fontSize: 15 }}>Emergency</Text>
                    </View>
                </TouchableOpacity>
                <View style={{
                    alignSelf: "center",
                    width: "100%",
                    height: 1,
                    backgroundColor: "rgba(154, 154, 154, 1)",
                    marginTop: 5
                }}>
                </View>
                <TouchableOpacity style={{ width: "100%", marginTop: 10, marginLeft: 20 }} onPress={() => navigation.navigate('article')}>
                    <View style={{ flexDirection: "row" }}>
                        <Image source={require('../Images/articles.png')}></Image>
                        <Text style={{ marginLeft: 20, fontSize: 15 }}>Post article</Text>
                    </View>
                </TouchableOpacity>
                <View style={{
                    alignSelf: "center",
                    width: "100%",
                    height: 1,
                    backgroundColor: "rgba(154, 154, 154, 1)",
                    marginTop: 5
                }}>
                </View>



            </View>

        </View>
    )
}

export default Post;