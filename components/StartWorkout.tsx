import { makeStyles, Text, Button, FAB, Divider  } from "@rneui/base";
import {Icon} from "@rneui/themed"
import { Pressable, TouchableOpacity, View } from "react-native";

import { Image } from '@rneui/themed';



export default function App({route, navigation}){
    const styles = useStyles()
    let workoutID = -1
    let workoutName = ""
    if (route.params == undefined) {
        workoutID = 1
        workoutName = "Upper (Body Weight)"
    } else {
        console.log(typeof route.params)
        workoutID = route.params.workoutID
        workoutName = route.params.workoutName
        
    }

    return (

        <View style={styles.contentContainer}>
            <View style = {styles.mainContentContainer}>
                 <Text h1 style={styles.mainText}>{workoutName}</Text>
                 <TouchableOpacity onPress={() => {navigation.navigate('WorkoutScreen', {workoutID: workoutID})}}>
                    <View style={styles.startBtn}>    
                        <Icon  
                            name="circle"
                            type="font-awesome"
                            color="#ff3a30"                          
                            
                            size={150}/>
                        <Text h1 style={styles.startLabel}>Start</Text>
                    </View>
                </TouchableOpacity>
                <Text h3 style={styles.mainText}>Full Deck</Text>
            </View>


        </View>
    );
}



const useStyles = makeStyles((theme) => ({
    contentContainer: {
        display: "flex",
        flex: 1, 
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
    },
    mainContentContainer: {
        display: "flex",
        flex: 1, 
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    mainText:{
        marginBottom: 32,
        marginTop: 32
    },
    bottomTab: {
        marginBottom: 16,
        flex: 0.1,
        flexDirection: "row",
        display: "flex",
        justifyContent:"space-around",
        width: "100%",
    },
    icon:{
        height: 64,
        width: 64
    }, 
    startLabel: {
        position: "absolute",
        color: "white"
    },
    startBtn: {
        // color: "white"
        alignItems:'center',
        alignSelf:'center', 
        justifyContent: "center"
    }
}));