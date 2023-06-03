import React from 'react'
import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview';

const Realtimemap = ({ navigation, route }) => {
    const { lat, lon } = route.params;
    console.log(lat,lon)
    return (
        <View style={{flex:1}}>
            <WebView source={{ uri: `https://www.google.com/maps?q=${lat},${lon}&z=17&hl=en` }} />
        </View>
    )
}

export default Realtimemap;