import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Post from '../Pages/Post';
import Live from '../Pages/Live';
import Emergencypost from '../Pages/Emergencypost';
import ArticlePost from '../Pages/Articlepost';
import LiveVideocall from '../Pages/Livevideocall';
import Hoststream from '../Pages/Hoststream';
import Doctorlist from '../Pages/Doctorlist';
import Singledoctor from '../Pages/Singledoctor';
import Sceduletime from '../Pages/Schedule';
import Hospital from '../Pages/Ambulancelist';
import Singleamb from '../Pages/Singleamb';
import Sucess from '../Pages/Sucess';
import Hospitalbook from '../Pages/Hospitalbook';


const Stack = createNativeStackNavigator();

const PostStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{
                headerShown: false
            }} name="home" component={Post} />
            <Stack.Screen options={{
                headerShown: false
            }} name="live" component={Live} />
            <Stack.Screen options={{
                headerShown: false
            }} name="stream" component={Hoststream} />

            <Stack.Screen options={{
                headerShown: false
            }} name="emergency" component={Emergencypost} />
            <Stack.Screen options={{
                headerShown: false
            }} name="article" component={ArticlePost} />
            <Stack.Screen options={{
                headerShown: false
            }} name="doctorlist" component={Doctorlist} />
            <Stack.Screen options={{
                headerShown: false
            }} name="doctorsingle" component={Singledoctor} />
            <Stack.Screen options={{
                headerShown: false
            }} name="shedule" component={Sceduletime} />
            <Stack.Screen options={{
                headerShown: false
            }} name="hospital" component={Hospital} />
            <Stack.Screen options={{
                headerShown: false
            }} name="singleamb" component={Singleamb} />
            <Stack.Screen options={{
                headerShown: false
            }} name="sucess" component={Sucess} />
             <Stack.Screen options={{
                headerShown: false
            }} name="hospitalbook" component={Hospitalbook} />


        </Stack.Navigator>
    )
}

export default PostStack;