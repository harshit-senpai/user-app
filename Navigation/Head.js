import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Starter from '../Pages/Starter';
import Oraganisationlist from './OrgantaionlistStack';
import Stackuser from './StackUser';
import { View } from 'react-native';

const Stack = createNativeStackNavigator();

const Head = () => {
    const [login, setLogin] = useState(true)
    return (
        // <NavigationContainer>
        //     {login ? <Stackuser></Stackuser> : <Oraganisationlist></Oraganisationlist>}
        // </NavigationContainer>
        <NavigationContainer>
            <Stackuser></Stackuser>

        </NavigationContainer>
        




    )
}

export default Head;