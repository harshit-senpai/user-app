import React from "react";
import { View, Text } from "react-native";
import ZegoUIKitPrebuiltLiveStreaming, { HOST_DEFAULT_CONFIG } from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn'

const Hoststream = () => {
    return (
        <View style={{ flex: 1,marginBottom:90 }}>
            <ZegoUIKitPrebuiltLiveStreaming
                appID={381902427}
                appSign={'154b929fd08b0c163ae25c0ad0b6bfa9eb3220408ea9672e9366421e89405129'}
                userID={"alok"}
                userName={"alok"}
                liveID={"alok"}

                config={{
                    ...HOST_DEFAULT_CONFIG,
                    // onLeaveLiveStreaming: () => { props.navigation.navigate('HomePage') }
                }}
            />
        </View>
    )
}

export default Hoststream;