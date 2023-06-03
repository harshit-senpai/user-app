import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Homestack from "./Homestack";
import RealtimeStack from "./RealtimeStack";
import PostStack from "./PostStack";
import Donationstack from "./DonationUserStack";
import StackOrgnation from "./StackOrgnitation";
import { Image } from "react-native";
import AppliedfundStack from "./AppliedFundStack";
import Emergencyfund from "./Emergencestack";

const Tab = createBottomTabNavigator();
const Orgnationbottom = () => {
    return (
        
            <Tab.Navigator initialRouteName="home"
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: "rgba(248, 89, 53, 1)",
                    tabBarLabelStyle: {
                        marginBottom: 10,
                        fontSize: 13,
                        fontWeight: "bold"
                    },
                    tabBarStyle: {
                        height: 80,
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        borderTopEndRadius: 45,
                        borderTopStartRadius: 45,
                        flexDirection: "row",
                        justifyContent: "center",

                    }
                }}

            >
                <Tab.Screen options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            // <Icon style={{
                            //     color: focused ? "rgba(248, 89, 53, 1)" : "black"
                            // }} name="home" size={34} color="aqua" />
                            <Image style={{
                                color: focused ? "rgba(248, 89, 53, 1)" : "#000"
                            }} source={require('../Images/homeicon.png')}></Image>
                        )
                    }
                }} name="Home" component={Homestack} />
                <Tab.Screen options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            // <Icon style={{
                            //     color: focused ? "rgba(248, 89, 53, 1)" : "black"
                            // }} name="home" size={34} color="aqua" />
                            <Image style={{
                                color: focused ? "rgba(248, 89, 53, 1)" : "#000"
                            }} source={require('../Images/newsicon.png')}></Image>
                        )
                    }
                }} name="real" component={RealtimeStack} />

                <Tab.Screen options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icon style={{
                                color: focused ? "rgba(248, 89, 53, 1)" : "#fff",
                                position: "relative",
                                bottom: 20,
                                backgroundColor: "black",
                                borderRadius: 50
                            }} name="add" size={44} color="aqua" />
                        )
                    }
                }} name="post" component={PostStack} />

                <Tab.Screen options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            // <Icon style={{
                            //     color: focused ? "rgba(248, 89, 53, 1)" : "#000",
                            // }} name="money" size={44} color="aqua" />
                            <Image style={{
                                color: focused ? "rgba(248, 89, 53, 1)" : "#000"
                            }} source={require('../Images/askfund.png')}></Image>
                        )
                    }
                }} name="Askfund" component={AppliedfundStack} />

                <Tab.Screen options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            // <Icon style={{
                            //     color: focused ? "rgba(248, 89, 53, 1)" : "#000",
                            // }} name="ngo" size={44} color="aqua" />
                            <Image style={{
                                color: focused ? "rgba(248, 89, 53, 1)" : "#000"
                            }} source={require('../Images/emergency.png')}></Image>
                        )
                    }
                }} name="Risk" component={Emergencyfund} />

            </Tab.Navigator>



    )
}

export default Orgnationbottom;