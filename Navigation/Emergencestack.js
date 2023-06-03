import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Emergency from '../Orginationpages/Emergency';
import Emergencymap from '../Orginationpages/Emergencymap';

const Stack = createNativeStackNavigator();

const Emergencyfund = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{
                headerShown:false
            }} name="home" component={Emergency} />
            <Stack.Screen options={{
                headerShown:false
            }} name="map" component={Emergencymap} />
        </Stack.Navigator>
    )
}

export default Emergencyfund ;