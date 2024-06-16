import { makeStyles, Text, Button, FAB, Divider  } from "@rneui/base";
import {Icon} from "@rneui/themed"
import { Pressable, TouchableOpacity, View } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list'
import {useEffect, useState} from 'react'
import WorkoutDB from '../dbops/WorkoutDB'
import ExerciseDB from '../dbops/ExerciseDB'


import { Image } from '@rneui/themed';

import ChooseDeckSize from './ChooseDeckSize'

const backButtonSize = 32;
const backButtonTopMargin = 54;
const backButtonExtraSpace = 16;


  
const data = [
    {key:'13', value:'Novice (Quarter Deck)'},
    {key:'26', value:'Mid (Half Deck)'},
    {key:'39', value:'Difficult (Three Quarter Deck)'},
    {key:'52', value:'Extreme (Full Deck)'},
]



export default function App({route, navigation}){
    const [selected, setSelected] = useState("");
    const [exerciseNames, setExercisesNames] = useState("temp")
    const styles = useStyles()
    let workoutID = -1
    let workoutName = ""
    if (route.params == undefined) {
        workoutID = WorkoutDB.workoutIDs[0]
        workoutName = WorkoutDB.workoutNames[0]
    } else {
        workoutID = route.params.workoutID
        workoutName = route.params.workoutName   
    }

    // Get exercises
    let p = WorkoutDB.GetWorkout(workoutID)
    p.then((w) => {
        let pE = ExerciseDB.GetExercises(w.exerciseIDs)
        let eNames = ""
        pE.then((v) => {
            for (let exer of v){
                eNames = eNames + exer.name + "\n"
            }
            console.log(eNames)
            setExercisesNames(eNames)
        })
    })


    return (

        <View style={styles.contentContainer}>
            <TouchableOpacity style={styles.touchBack} onPress={() => {navigation.goBack()}}>
                <Icon type="material" name="arrow-back-ios" color="#444444" size={backButtonSize} style={styles.back} ></Icon>
            </TouchableOpacity>
            <View style = {styles.mainContentContainer}>
                 <Text h2 style={styles.mainText}>{workoutName}</Text>
                
                
                <TouchableOpacity onPress={() => {navigation.navigate('WorkoutScreen', {workoutID: workoutID, numCards: selected})}}>
                    <View style={styles.startBtn}>    
                        <Icon  
                            name="circle"
                            type="font-awesome"
                            color="#ff3a30" 
                            
                            size={150}/>
                        <Text h1 style={styles.startLabel}>Start</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.selectContainer}>
                <SelectList 
                    dropdownTextStyles={styles.dropdownText}
                    inputStyles={styles.dropdownText}
                    setSelected={(val) => setSelected(val)} 
                    data={data} 
                    save="key"
                    search={false}
                    defaultOption={data[0]}
                />
                </View>
                
                <Text style={styles.exerNames}>{exerciseNames}</Text>

            </View>

        </View>
    );
}



const useStyles = makeStyles((theme) => ({
    touchBack:{
        width: 80,
        height: backButtonSize + backButtonTopMargin + backButtonExtraSpace
    },
    back: {
        alignSelf: "flex-start",
        marginHorizontal: 16,
        marginTop: backButtonTopMargin,
    },
    selectContainer: {
        marginTop: 16,
        flex: 2,
    },
    contentContainer: {
        flex: 1, 
        flexDirection: "column",
        width: "100%",
        alignItems: "flex-start",
    },
    mainContentContainer: {
        marginTop:64,
        display: "flex",
        flex: 1, 
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: backButtonSize + backButtonTopMargin + backButtonExtraSpace + 32
    },
    mainText:{
        marginBottom: 32,
        marginTop: 32,
        marginHorizontal: 16,
        textAlign: "center"
        
    },
    startLabel: {
        position: "absolute",
        color: "white"
    },
    startBtn: {
        alignItems:'center',
        alignSelf:'center', 
        justifyContent: "center"
    },
    dropdownText: {
        fontSize: 16
    },
    exerNames: {
        textAlign: "center",
        marginTop: 16,
        fontSize: 16,
        position: "absolute",
        bottom: 16
    }
}));