import { StyleSheet, Image, TouchableOpacity, Text, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { SharedElement } from 'react-native-shared-element';
const { height, width } = Dimensions.get("screen");
import * as Animatable from "react-native-animatable"
import { ImagePath } from '../utils/imagePath';


const fadeInBottom = {
    0: {
        opacity: 0,
        translateY: 100
    },
    1: {
        opacity: 1,
        translateY: 0
    }
}

const EventsDetails = ({ props, navigation, route }) => {
    const { item, indexes } = route.params
    console.log("Indexes ==== ", indexes, item)
    return (
        <View style={{ flex: 1 }}>
            <SharedElement id={`item.${item.key}.image`} style={[StyleSheet.absoluteFillObject]}>

                <Image
                    source={{ uri: item.poster }}
                    style={[StyleSheet.absoluteFillObject]}
                />
            </SharedElement>

            <Animatable.View
                duration={400 * 1.5}
                delay={400}
                animation='fadeIn'
                style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.3)', opacity: 0.3 }]}
            >
            </Animatable.View>

            <TouchableOpacity style={styles.backButton} onPress={() => {
                navigation.goBack()
            }}>
                <Image
                    source={ImagePath.BACKICON}
                    style={styles.closeImg}
                />
                <Text style={styles.titleList}>Event Details</Text>
            </TouchableOpacity>
            <SharedElement id='general.bg' style={[StyleSheet.absoluteFillObject, { transform: [{ translateY: height * 0.3 }] }]}>
                <View style={[StyleSheet.absoluteFillObject, { backgroundColor: "white", transform: [{ translateY: -height * 0.3 }], top: height * 0.7, padding: width * 0.05 }]}>
                    <Animatable.Text
                        animation={fadeInBottom}
                        duration={400}
                        delay={500}
                        style={{
                            fontWeight: "900",
                            fontSize: 28,
                        }} >{item.title}</Animatable.Text>
                    <Animatable.Text
                        animation={fadeInBottom}
                        duration={400}
                        delay={750}
                        style={{
                            fontWeight: "500",
                            fontSize: 16
                        }}>{item.location}</Animatable.Text>
                    <Animatable.Text
                        animation={fadeInBottom}
                        duration={400}
                        delay={900}
                        style={{

                            fontSize: 12
                        }}>{item.date}</Animatable.Text>
                </View>
            </SharedElement>

        </View>
    )
}

export default EventsDetails

EventsDetails.SharedElement = (route, otherRoute, showing) => {
    const { item } = route.params

    return [
        {
            id: `item.${item.key}.image`
        },
        {
            id: `general.bg`
        }
    ]
}


const styles = StyleSheet.create({
    closeImg: {
        height: 25,
        width: 25,
        resizeMode: "contain"
    },
    titleList: {
        fontSize: 18,
        fontWeight: '600',
        color: "black",
        letterSpacing: 1,
        marginLeft: 15
    },
    backButton: {
        height: 50,
        width: 200,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 20
    },
})