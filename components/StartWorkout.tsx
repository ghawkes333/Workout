import { makeStyles, Text, Button, FAB, Divider  } from "@rneui/base";
import {Icon} from "@rneui/themed"
import { Pressable, TouchableOpacity, View } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list'
import {useState} from 'react'
import WorkoutDB from '../dbops/WorkoutDB'


import { Image } from '@rneui/themed';

import ChooseDeckSize from './ChooseDeckSize'

const backButtonSize = 32;
const backButtonTopMargin = 54;

  
const data = [
    {key:'13', value:'Novice (Quarter Deck)'},
    {key:'26', value:'Mid (Half Deck)'},
    {key:'39', value:'Difficult (Three Quarter Deck)'},
    {key:'52', value:'Extreme (Full Deck)'},
]



export default function App({route, navigation}){
    const [selected, setSelected] = useState("");
    const styles = useStyles()
    let workoutID = -1
    let workoutName = ""
    if (route.params == undefined) {
        workoutID = WorkoutDB.workoutIDs[0]
        workoutName = WorkoutDB.workoutNames[0]
    } else {
        console.log(typeof route.params)
        workoutID = route.params.workoutID
        workoutName = route.params.workoutName
        
    }

    return (

        <View style={styles.contentContainer}>
            <Icon type="material" name="arrow-back-ios" color="#444444" size={backButtonSize} style={styles.back} onPress={() => {navigation.goBack()}}></Icon>
            <View style = {styles.mainContentContainer}>
                 <Text h1 style={styles.mainText}>{workoutName}</Text>
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
                
                <SelectList 
                    boxStyles={styles.dropdown}
                    setSelected={(val) => setSelected(val)} 
                    data={data} 
                    save="key"
                    search={false}
                    defaultOption={{key:'13', value:'Novice (Quarter Deck)'}}
                />
            </View>


        </View>
    );
}



const useStyles = makeStyles((theme) => ({
    back: {
        alignSelf: "flex-start",
        marginHorizontal: 16,
        marginTop: backButtonTopMargin,
    },
    contentContainer: {
        flex: 1, 
        flexDirection: "column",
        width: "100%",
        alignItems: "flex-start",
    },
    mainContentContainer: {
        display: "flex",
        flex: 1, 
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: backButtonSize + backButtonTopMargin + 32
    },
    mainText:{
        marginBottom: 32,
        marginTop: 32,
        marginHorizontal: 16,
        
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
    dropdown: {
        marginTop: 32
    }
}));