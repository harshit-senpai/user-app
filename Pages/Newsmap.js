import React from "react";
import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview';

const Newmap = ({ navigatin, route }) => {
    const { lat, lon } = route.params;

    return (
        <View style={{flex:1,marginBottom:50}}>
            <WebView source={{ uri: `https://www.google.com/maps?q=${lat},${lon}&z=17&hl=en` }} />
        </View>
        
    )
}

export default Newmap;
