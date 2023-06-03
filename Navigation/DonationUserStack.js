import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Donation from '../Pages/Donation';
import Singledonation from '../Pages/Singledonation';
import Risefund from '../Pages/Risefund';

const Stack = createNativeStackNavigator();

const Donationstack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{
                headerShown:false
            }} name="home" component={Donation} />
             <Stack.Screen options={{
                headerShown:false
            }} name="singledonation" component={Singledonation} />
             <Stack.Screen options={{
                headerShown:false
            }} name="risefund" component={Risefund} />
           
        </Stack.Navigator>
    )
}

export default Donationstack ;