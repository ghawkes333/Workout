import React, { useEffect, useState } from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import { makeStyles, Text, Button, useThemeMode } from "@rneui/themed";
import ExerciseDB from "../dbops/ExerciseDB"
import WorkoutDB from "../dbops/WorkoutDB"
import { Card, FAB, Divider, ListItem  } from "@rneui/base";
import {Icon} from "@rneui/themed"
import { Pressable, ScrollView, TouchableOpacity } from "react-native";


export default function App(){
    let [Exercises, setExercises]: any[] = useState([{"name": "Not loaded", "id": 0}])

    let styles = useStyles()



    useEffect(() => {
        ExerciseDB.InitDB()
        console.log("getting")
        
        ExerciseDB.GetAllExercises().then((exerArr) => {
            // setExercises(exerArr)
            console.log("exerarr: ")
            console.log(exerArr)
            console.log("Exercises: ")
            console.log(Exercises)
        })
    }, [])



    return (
        <SafeAreaView style={styles.contentContainer}>
        <FlatList
            data={Exercises}
            renderItem={(e) => <Text>{e.name} is great</Text>}
            keyExtractor={item => item.id}
        />
        </SafeAreaView>
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