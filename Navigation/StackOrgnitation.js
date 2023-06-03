import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Organigation from '../Pages/Organigation';
import UserProfile from '../Pages/UserProfile';
import LiveVideocall from '../Pages/Livevideocall';
import profiledoctor from '../Pages/Doctorbooklist';
import Hospitalbook from '../Pages/Hospitalbook';
import Newmap from '../Pages/Newsmap';

const Stack = createNativeStackNavigator();

const StackOrgnation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{
                headerShown: false
            }} name="home" component={Organigation} />
            <Stack.Screen options={{
                headerShown: false
            }} name="userprofile" component={UserProfile} />
            <Stack.Screen options={{
                headerShown: false
            }} name="live" component={LiveVideocall} />
            <Stack.Screen options={{
                headerShown: false
            }} name="profile" component={profiledoctor} />
              <Stack.Screen options={{
                headerShown: false
            }} name="hospitalbook" component={Hospitalbook} />
             <Stack.Screen options={{
                headerShown: false
            }} name="newsmap" component={Newmap} />

        </Stack.Navigator>
    )
}

export default StackOrgnation;