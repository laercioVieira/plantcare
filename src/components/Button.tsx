import React from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface ButtonProps extends TouchableOpacityProps {
    text: string,
}

export default function Button({ text, ...anotherProps }: ButtonProps) {
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.7}
            {...anotherProps}
        >
            <Text style={styles.text}>
                {text}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.green,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        height: 56
    },
    text: {
        fontSize: 16,
        color: colors.white,
        fontFamily: fonts.heading
    }
});
