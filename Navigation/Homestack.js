import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Pages/Home';
import SingleNews from '../Pages/SingleNews';
import Newmap from '../Pages/Newsmap';
import Singleapinews from '../Pages/Singleapinews';

import Auidance from '../Pages/Auidancestream';

const Stack = createNativeStackNavigator();

const Homestack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{
                headerShown: false
            }} name="home" component={Home} />
            <Stack.Screen options={{
                headerShown: false
            }} name="singlenews" component={SingleNews} />
            <Stack.Screen options={{
                headerShown: false
            }} name="newsmap" component={Newmap} />
            <Stack.Screen options={{
                headerShown: false
            }} name="auidance" component={Auidance} />
            <Stack.Screen options={{
                headerShown: false
            }} name="singleapinews" component={Singleapinews} />
        </Stack.Navigator>
    )
}

export default Homestack;