import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Pages/Home';
import SingleNews from '../Pages/SingleNews';
import Askfund from '../Orginationpages/AskFund';
import Ngocall from '../Orginationpages/Ngocall';

const Stack = createNativeStackNavigator();

const AppliedfundStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{
                headerShown: false
            }} name="home" component={Askfund} />
            <Stack.Screen options={{
                headerShown: false
            }} name="ngocall" component={Ngocall} />

        </Stack.Navigator>
    )
}

export default AppliedfundStack;