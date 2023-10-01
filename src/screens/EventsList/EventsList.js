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
import {
    FlingGestureHandler,
    Directions,
    State,
} from 'react-native-gesture-handler';
import events from '../../config/data/events';
import { SharedElement } from 'react-native-shared-element';
import { ImagePath } from '../../utils/imagePath';
import styles from "../EventsList/EventsListStyle"

const OVERFLOW_HEIGHT = 110;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;
var accurateIndex = 0

const OverflowItems = ({ data, scrollXAnimated }) => {
    const inputRange = [-1, 0, 1];
    const translateY = scrollXAnimated.interpolate({
        inputRange,
        outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
    });
    return (
        <View style={styles.overflowContainer}>
            <View style={styles.listView}>
                <Image
                    source={ImagePath.BACKICON}
                    style={styles.backImg}
                />
                <Text style={styles.titleList}>LIST</Text>
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
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const setActiveIndex = React.useCallback((activeIndex) => {
        scrollXIndex.setValue(activeIndex);
        setIndex(activeIndex);
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
                accurateIndex = index;
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
                    accurateIndex = index;
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
                            // const acInd = currentIndex
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
                                            props.navigation.navigate("eventsDetails", {
                                                item: events[accurateIndex],
                                                indexes: index
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

