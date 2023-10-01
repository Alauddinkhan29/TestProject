import { StyleSheet } from "react-native"

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

export default styles