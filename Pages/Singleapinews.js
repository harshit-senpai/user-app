import react, { useState, useEffect } from 'react'
import { WebView } from 'react-native-webview';
import { View, Text, ActivityIndicator } from 'react-native'


const Singleapinews = ({ navigation, route }) => {
    const [load, setLoad] = useState(true)
    const url = route.params;
    useEffect(() => {
        setTimeout(() => {
            setLoad(false)
        }, 4000)
    })
    return (

        <View style={{ flex: 1, marginBottom: 80 }}>
            {
                load ? <ActivityIndicator style={{ marginTop: 200 }} size={44}></ActivityIndicator> : <WebView source={{ uri: `${url}` }} />
            }

        </View>

    )
}


export default Singleapinews;