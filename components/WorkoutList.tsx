import { Card, makeStyles, Text, Button, FAB, Divider, ListItem  } from "@rneui/base";
import {Icon} from "@rneui/themed"
import { Pressable, ScrollView, TouchableOpacity, View } from "react-native";
import {SetStateAction, useState} from "react"

import { Image } from '@rneui/themed';

import WorkoutDB from '../dbops/WorkoutDB'
import ExerciseDB from '../dbops/ExerciseDB'

WorkoutDB.InitDB()
ExerciseDB.InitDB()

let workoutStr = WorkoutDB.workoutNames
let ids = WorkoutDB.workoutIDs
let workouts = workoutStr.map((val, i) => {return [val, ids[i]]})

export default function App({navigation}){    

    const styles = useStyles()
    

    return (

        <View style={styles.contentContainer}>
        <Text h1 style={styles.title}>Workouts</Text>
            <View style={styles.mainContentContainer}>
                <ScrollView style={styles.listContainer}>
                <Card.Divider/>
                {
                    workouts.map((row, i) => {
                    return (
                        <TouchableOpacity key={row[1]} onPress={(v) => {
                            let w = workouts[i]
                            let id = w[1]
                            let name = w[0]
                            console.log(w.toString())
                            console.log(id)
                            console.log(name)
                            navigation.navigate('StartScreen', {workoutID: id, workoutName: name})
                        }}>
                            <Card>
                                <Text h4 style={styles.textListItem}>{row[0]}</Text>
                            </Card>
                        </TouchableOpacity>
                    );
                    })
                }
                </ScrollView>
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
    title:{
        marginTop: 48,
        marginBottom: 16
    },
    listContainer: { 
        flex: 9,
        width: "100%",
        marginHorizontal: 16
    },
    textListItem: {
        marginBottom: 16,
        width: "100%"
    },
    mainContentContainer: {
        display: "flex",
        flex: 1, 
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    bottomTab: {
        marginTop: 16,
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
}));