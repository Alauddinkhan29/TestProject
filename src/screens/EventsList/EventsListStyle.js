import { StyleSheet, Dimensions } from "react-native";
import { verticalScale, horizontalScale } from "../../utils/Scale";

const OVERFLOW_HEIGHT = 110;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

const { height, width } = Dimensions.get("screen");

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
    listView: {
        marginTop: 10,
        alignItems: "center",
        marginLeft: 20,
        height: verticalScale(30),
        flexDirection: "row",
        width: horizontalScale(90)
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
        height: verticalScale(25),
        width: horizontalScale(115),
        flexDirection: "row",
        alignItems: 'center',
    },
});

export default styles