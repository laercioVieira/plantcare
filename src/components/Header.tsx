import React from "react";
import {
    StyleSheet,
    Text,
    Image,
    View,
} from 'react-native'

import colors from "../styles/colors";
import userProfileImg from "../assets/laerson_profile.png"

import { getStatusBarHeight } from "react-native-iphone-x-helper";
import fonts from "../styles/fonts";


export default function Header() {
    return (
        <View style={styles.container} >
            <View>
                <Text style={styles.greeting} >Olá,</Text>
                <Text style={styles.userName} >Laerson</Text>
            </View>
            <Image style={styles.userProfileImg} source={userProfileImg} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading
    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.text
    },
    userProfileImg: {
        width: 70,
        height: 70,
        borderRadius: 35
    }
});