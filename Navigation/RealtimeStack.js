import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Pages/Home';
import SingleNews from '../Pages/SingleNews';
import RealDate from '../Pages/Realdata';
import SingleAlert from '../Pages/Singlealert';
import Realtimemap from '../Pages/Realtimemap';

const Stack = createNativeStackNavigator();

const RealtimeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{
                headerShown: false
            }} name="home" component={RealDate} />
            <Stack.Screen options={{
                headerShown: false
            }} name="singlealert" component={SingleAlert} />
            <Stack.Screen options={{
                headerShown: false
            }} name="realmap" component={Realtimemap} />
        </Stack.Navigator>
    )
}

export default RealtimeStack;