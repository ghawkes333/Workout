import React, { useEffect } from "react";
import { View } from "react-native";
import { makeStyles, Text, Button, useThemeMode } from "@rneui/themed";
import ExerciseDB from "../dbops/ExerciseDB"
import WorkoutDB from "../dbops/WorkoutDB"
import { Card, FAB, Divider, ListItem  } from "@rneui/base";
import {Icon} from "@rneui/themed"
import { Pressable, ScrollView, TouchableOpacity } from "react-native";

let Exercises: any[] = []

export default function App(){
    let styles = useStyles()
    useEffect(() => {

        ExerciseDB.GetAllExercises().then((exerArr) => {
            Exercises = exerArr
        })
    })
    return (
        <View>
            
            <ScrollView style={styles.listContainer}>
                <Card.Divider/>
                {
                    Exercises.map((e, i) => {
                    return (
                        <TouchableOpacity key={i} onPress={(v) => {
                            let w = e[i]
                            let id = w[1]
                            let name = w[0]
                            // navigation.navigate('StartWorkout', {workoutID: id, workoutName: name})
                        }}>
                            <Card>
                                <Text h4 style={styles.textListItem}>{e.name}</Text>
                            </Card>
                        </TouchableOpacity>
                    );
                    })
                }
                </ScrollView>
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