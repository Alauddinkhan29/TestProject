import * as React from 'react';
import {
    StatusBar,
    Image,
    FlatList,
    Dimensions,
    Animated,
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
const { height, width } = Dimensions.get("screen");
// import { EvilIcons } from '@expo/vector-icons';
import {
    FlingGestureHandler,
    Directions,
    State,
} from 'react-native-gesture-handler';
import events from '../config/data/events';
import { SharedElement } from 'react-native-shared-element';
import { ImagePath } from '../utils/imagePath';
import { horizontalScale, verticalScale } from '../utils/Scale';



const OVERFLOW_HEIGHT = 100;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

const OverflowItems = ({ data, scrollXAnimated }) => {
    const inputRange = [-1, 0, 1];
    const translateY = scrollXAnimated.interpolate({
        inputRange,
        outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
    });
    return (
        <View style={styles.overflowContainer}>
            <View style={{ marginTop: 10, alignItems: "center", marginLeft: 20, height: verticalScale(30), flexDirection: "row", width: horizontalScale(90) }}>
                <Image
                    source={ImagePath.BACKICON}
                    style={styles.backImg}
                />
                <Text style={styles.titleList}>List</Text>
            </View>
            <Animated.View style={{ transform: [{ translateY }] }}>
                {data.map((item, index) => {
                    return (
                        <View key={index} style={styles.itemContainer}>
                            <Text style={[styles.title]} numberOfLines={1}>
                                {item.title}
                            </Text>
                            <View style={styles.itemContainerRow}>
                                <View style={styles.locitemContainerRow}>
                                    <Image
                                        source={ImagePath.LOCATION}
                                        style={styles.locationImg}
                                    />
                                    <Text style={[styles.location]}>


                                        {item.location}
                                    </Text>
                                </View>
                                <Text style={[styles.date]}>{item.date}</Text>
                            </View>
                        </View>
                    );
                })}
            </Animated.View>
        </View>
    );
};

export default function EventsList(props) {
    const [data, setData] = React.useState(events);
    const scrollXIndex = React.useRef(new Animated.Value(0)).current;
    const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
    const [index, setIndex] = React.useState(0);
    const setActiveIndex = React.useCallback((activeIndex) => {
        scrollXIndex.setValue(activeIndex);
        setIndex(activeIndex);
    });

    React.useEffect(() => {
        if (index === data.length - VISIBLE_ITEMS - 1) {
            // get new data
            // fetch more data
            const newData = [...data, ...data];
            setData(newData);
        }
    });

    React.useEffect(() => {
        Animated.spring(scrollXAnimated, {
            toValue: scrollXIndex,
            useNativeDriver: true,
        }).start();
    });

    return (
        <FlingGestureHandler
            key='left'
            direction={Directions.LEFT}
            onHandlerStateChange={(ev) => {
                if (ev.nativeEvent.state === State.END) {
                    if (index === data.length - 1) {
                        return;
                    }
                    setActiveIndex(index + 1);
                }
            }}
        >
            <FlingGestureHandler
                key='right'
                direction={Directions.RIGHT}
                onHandlerStateChange={(ev) => {
                    if (ev.nativeEvent.state === State.END) {
                        if (index === 0) {
                            return;
                        }
                        setActiveIndex(index - 1);
                    }
                }}
            >
                <SafeAreaView style={styles.container}>
                    <StatusBar hidden />
                    <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.key}
                        horizontal
                        inverted
                        contentContainerStyle={{
                            flex: 1,
                            justifyContent: 'center',
                            padding: SPACING * 2,
                            marginTop: 50,
                        }}
                        scrollEnabled={false}
                        removeClippedSubviews={false}
                        CellRendererComponent={({
                            item,
                            index,
                            children,
                            style,
                            ...props
                        }) => {
                            const newStyle = [style, { zIndex: data.length - index }];
                            return (
                                <View style={newStyle} index={index} {...props}>
                                    {children}
                                </View>
                            );
                        }}
                        renderItem={({ item, index }) => {
                            console.log("=== index in item ====", index)
                            const inputRange = [index - 1, index, index + 1];
                            const translateX = scrollXAnimated.interpolate({
                                inputRange,
                                outputRange: [50, 0, -100],
                            });
                            const scale = scrollXAnimated.interpolate({
                                inputRange,
                                outputRange: [0.8, 1, 1.3],
                            });
                            const opacity = scrollXAnimated.interpolate({
                                inputRange,
                                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
                            });

                            return (
                                <Animated.View
                                    style={{
                                        position: 'absolute',
                                        left: -ITEM_WIDTH / 2,
                                        opacity,
                                        transform: [
                                            {
                                                translateX,
                                            },
                                            { scale },
                                        ],
                                    }}
                                >
                                    <TouchableOpacity
                                        activeOpacity={.9}
                                        onPress={() => {
                                            console.log("Index ==== ", index)
                                            props.navigation.navigate("eventsDetails", {
                                                item: events[index]
                                            })

                                        }}
                                    >
                                        <SharedElement id={`item.${item.key}.image`}>

                                            <Image
                                                source={{ uri: item.poster }}
                                                style={{
                                                    width: ITEM_WIDTH,
                                                    height: ITEM_HEIGHT,
                                                    borderRadius: 14,
                                                }}
                                            />
                                        </SharedElement>
                                    </TouchableOpacity>
                                </Animated.View>
                            );
                        }}
                    />
                    <SharedElement id='general.bg' style={[StyleSheet.absoluteFillObject, { transform: [{ translateY: height }] }]}>
                        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: "red", transform: [{ translateY: height }], borderTopLeftRadius: 16, borderTopRightRadius: 16 }]}></View>
                    </SharedElement>
                </SafeAreaView>
            </FlingGestureHandler>
        </FlingGestureHandler>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: -1,
    },
    titleList: {
        fontSize: 15,
        fontWeight: '600',
        color: "black",
        letterSpacing: 1,
        marginLeft: 5
    },
    location: {
        fontSize: 16,
        marginLeft: 5
    },
    date: {
        fontSize: 12,
    },
    itemContainer: {
        height: OVERFLOW_HEIGHT,
        // padding: SPACING * 2,
        paddingLeft: SPACING * 2,
        paddingTop: SPACING * 0.5
    },
    itemContainerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    overflowContainer: {
        height: OVERFLOW_HEIGHT,
        overflow: 'hidden',
    },
    locationImg: {
        height: 15,
        width: 15,
        resizeMode: "contain",
        paddingRight: 10
    },
    backImg: {
        height: 18,
        width: 23,
        resizeMode: "contain",
    },
    locitemContainerRow: {
        height: verticalScale(20),
        width: horizontalScale(115),
        flexDirection: "row",
        alignItems: 'center',
    },
});