import React, { useEffect, useState } from "react";
import { View , ActivityIndicator, TouchableOpacity } from "react-native";
import { makeStyles, Text, Button, useThemeMode } from "@rneui/themed";
import { Image } from '@rneui/themed';
import WorkoutDB from '../dbops/WorkoutDB'
import ExerciseDB from '../dbops/ExerciseDB'
import { Icon } from "@rneui/themed";

// import img from './icon.png'

let NumberCards = -1

const cardRes = require.context('../assets/PNG-cards-1.3', false);

var cardImages = importAll()

let DeckIndex = -1
let Deck = []

let NumberReps = 0

let StartTime : Date = new Date()
let NumExerInWorkout = 0


let Exercises: any[] = []
let CurrentWorkout


WorkoutDB.InitDB()
ExerciseDB.InitDB()


function importAll() {
  let images = {};
  cardRes.keys().forEach((item: string, index: number) => { images[item.replace('./', '')] = cardRes(item); });
  return images
}


// Shuffle - Adapted from https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
function shuffle (array: number[]) { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
}; 

// Takes a numer of cards <= 52
function getDeck(numCards: number){
  console.log("Reset deck")
  let arr = []
  for (let i = 0; i < 52; i++){
    arr.push(i)
  }
  arr = shuffle(arr)
  
  return arr.slice(0, numCards)
}

/**
 * 0 - 12 => diamonds
 * 13 - 25 => hearts
 * 26 - 38 => clubs
 * 39 - 51 => spades
 * @param cardID
 */
function cardToExercise(cardID: number){
  if (NumExerInWorkout == 4){
    let suit = Math.floor(cardID / 13)
    let exer = Exercises[suit]
    return exer
  } else {
    let num = cardID % NumExerInWorkout
    let exer = Exercises[num]
    return exer
  }
}

function getExerName(cardID: number){
  let e = cardToExercise(cardID)
  if (e != undefined){
    return e.name
  } else {
    return ""
  }
}

function getCardImage(cardID: number){
  let suit = Math.floor(cardID / 13)
  let suitStrArr = ["diamonds", "hearts", "clubs", "spades"]
  let suitStr = suitStrArr[suit]

  let num = (cardID - (suit * 13)) + 2
  let numStr

  switch(num){
    case 11: 
      numStr = "jack"
      break;
    case 12:
      numStr = "queen"
      break
    case 13:
      numStr = "king"
      break
    case 14:
      numStr = "ace"
      break
    default:
      numStr = num.toString()
  }

  let fileName: string = numStr + "_of_" + suitStr + ".png"
  return cardImages[fileName]
}

function getCardNum(cardID: number){
  let suit = Math.floor(cardID / 13)
  return (cardID - (suit * 13)) + 2
}

function getRemainingCards(){
  return NumberCards - DeckIndex - 1
}


export default function App({route, navigation}) {
  const [workoutName, setWorkoutName] = useState("")
  const [nextCardID, setNextCardID] = useState(-1)
  const {workoutID, numCards} = route.params

  

  const styles = useStyles();
  const { setMode, mode } = useThemeMode();
  
  useEffect(() =>{
    // At the beginning of each workout
    NumberCards = numCards
    Deck = getDeck(NumberCards)
    let workout = WorkoutDB.GetWorkout(workoutID)
    DeckIndex = -1
    workout.then((w:Workout) => {
        console.log(w.name + " has " + w.exerciseIDs)
        setWorkoutName(w.name)
        ExerciseDB.GetExercises(w.exerciseIDs.split(", ")).then((exercises) => {
          console.log(w.exerciseIDs.length)
          console.log(w.exerciseIDs + " are " + JSON.stringify(exercises))
          Exercises = exercises
          console.log(JSON.stringify(Exercises))
          // Exercises = []
          // for (let e of exercises){
          //   Exercises.push(e)
          // }
          StartTime = new Date()
          NumExerInWorkout = w.exerciseIDs.split(", ").length
          nextExer()
        })
    }).catch((e) => {console.log("err: " + e)})
  }, []) 


  const nextExer = () =>{
    if (nextCardID != -1){
      console.log("Next num reps" + getCardNum(nextCardID))
      NumberReps = NumberReps + getCardNum(nextCardID)
      console.log(NumberReps)

    }

    DeckIndex++
    if (DeckIndex >= NumberCards && NumberCards != -1){
      console.log("Workout ended!")
      let numCards = NumberCards
      let numReps = NumberReps
      let startTime = StartTime
      let end = new Date()
      let sec = (end.getTime() - startTime.getTime()) / 1000
      let min = Math.floor(sec / 60)
      let minStr = min.toString()
      sec = Math.floor(sec % 60)
      let secStr = sec.toString()
      if (min < 10){
        minStr = "0" + minStr
      }
      if (sec < 10){
        secStr = "0" + secStr
      }
      let timeStr = minStr + ":" + secStr

      reset()
      console.log(workoutName)
      console.log("About to navigate")
      navigation.navigate('EndWorkoutScreen', {workoutName: workoutName, numCards: numCards, numReps: numReps, time: timeStr})
      console.log("navigated")
      return
    }

    
  
    setNextCardID(Deck[DeckIndex])
    let e = cardToExercise(Deck[DeckIndex])

  }


  return (
    <View style={styles.contentContainer}>
      <View style={styles.topbar}>
        <Text h4 style={styles.stat}>{getRemainingCards() + 1}</Text>
        <Text h4 style = {styles.workoutNameStat} >{workoutName}</Text>
        <Text h4 style={styles.stat}></Text>
      </View>
      {/* <View style={styles.workoutNameContainer}>
      </View> */}
      <View style={styles.imageContainer}>
        <Image
              source={getCardImage(nextCardID)}
              style={styles.image}
              

            />
      </View>
      <View style={styles.instructionContainer}
      >
        <Text h2 style={styles.instruction} >{getCardNum(nextCardID)}</Text>
        <Text h2 style={styles.instruction}>{getExerName(Deck[DeckIndex])}</Text>
        
      </View>
      
      <TouchableOpacity
      style={styles.forwardBtnContainer}
      onPress={() => { 
        nextExer()
      }}
      >
        <Image source={require("../assets/images/forward-solid.png")} style={styles.nextBtn}/>
      </TouchableOpacity>
        

    </View>
  );

  
  function reset(){
    NumberCards = -1
    DeckIndex = -1
    NumberReps = 0
    StartTime = new Date()
    NumExerInWorkout = 0
    setNextCardID(-1)
    setWorkoutName("")
  }
}



const useStyles = makeStyles((theme) => ({
  contentContainer: {
    display: "flex",
    flex: 1,
    backgroundColor: "#ff3a30",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  topbar:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16
  },
  xContainer:{
    flex: 0.4,
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: 32,
  },
  instructionContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    marginTop: 16
  },
  statColumn: {
    flexDirection: "column",
    alignItems: "center"
  },
  statContainer: {
    // flex: 0.5,
    width: "100%",
    // height: "100%",
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignContent: "flex-start",
    flex: 0.75,
    marginBottom: 16
    
  },
  forwardBtnContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer:{
    alignItems: "center",
    justifyContent: "center",
    flex:3,
    width:"100%",
  },
  xIcon:{ 
    height: 42,
    width:42
  },
  endIcon:{ 
    height: 100,
    width:100,
    marginBottom: 16
  },
  workoutName:{
    color: "#ffffff",
    fontWeight: "bold",
    // textAlign: "center",
    marginTop: 64,
    flex: 1
  },
  nextBtn:{
    marginBottom: 32,
    marginTop: 16,
    height:128, 
    width:128
  },
  image: {
    // backgroundColor: "#ffffff",
    height: 363 * 1.1,
     width: 250 * 1.1,
    // alignSelf: "stretch",
    // height: "100%",


    // width: "100%",
      
    // height:"363",
    // width: "250"
    // width: "auto",
    // objectFit: "cover",
    // verticalAlign: "bottom"
  },
  icon:{
    width: 64,
    height: 64,
  },
  instruction:{
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    maxWidth: "80%",
    alignSelf: "center"
  },
  bottomTab: {
    flex: 1
  },
  stat: {
    color: "#ffffff",
    fontWeight: "bold",
    marginTop: 64,
    flex: 1,
    textAlign:"center"
  },
  workoutNameStat: {
    color: "#ffffff",
    fontWeight: "bold",
    marginTop: 64,
    flex: 3,
    textAlign:"center"
  }
}));
