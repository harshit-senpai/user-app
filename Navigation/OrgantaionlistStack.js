import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splah from '../Pages/Splash';
import Slide1 from '../Pages/Slide1';
import Slide2 from '../Pages/Slide2';
import Slide3 from '../Pages/Slide3';
import Starter from '../Pages/Starter';
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';
import Forget from '../Pages/Forget';
import Loginowner from '../Orginationpages/Login';
import Signupowner from '../Orginationpages/Signup';
import Forgetowner from '../Orginationpages/Forget';
import Orgnationbottom from './OrgnitaionBottom';
import Starterowner from '../Orginationpages/Starter';

const Stack = createNativeStackNavigator();

const Oraganisationlist = () => {
    const [load, setLoad] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoad(false)
        }, 3000)
    }, [])
    return (

        <Stack.Navigator>
            {
                load ? <Stack.Screen options={{
                    headerShown: false
                }} name="splash" component={Splah} /> : null
            }

            <Stack.Screen options={{
                headerShown: false
            }} name="slide1" component={Slide1} />
            <Stack.Screen options={{
                headerShown: false
            }} name="slide2" component={Slide2} />
            <Stack.Screen options={{
                headerShown: false
            }} name="slide3" component={Slide3} />
            <Stack.Screen options={{
                headerShown: false
            }} name="starter" component={Starter} />
            <Stack.Screen options={{
                headerShown: false
            }} name="loginowner" component={Loginowner} />
            <Stack.Screen options={{
                headerShown: false
            }} name="orgnigation" component={Orgnationbottom} />
            <Stack.Screen options={{
                headerShown: false
            }} name="signupowner" component={Signupowner} />
            <Stack.Screen options={{
                headerShown: false
            }} name="forgetowner" component={Forgetowner} />

        </Stack.Navigator>



    )
}

export default Oraganisationlist;