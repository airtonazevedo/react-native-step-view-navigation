import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function stepView(props: any) {

    return (

        <View style={styles.content}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,

    },
});