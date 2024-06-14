import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';

const exerciseTableName = "exercise"
const dbName = "workoutDB"



async function InitDB(){
    console.log("Init DB")
    let db = await SQLite.openDatabaseAsync(dbName)
    // Initalize database
    let ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]
    let names = ["V-Up", "Crunches (touch heels)", "Front Plank", "Mountain Climbers", "Wide-Grip Push-Up", "Close-grip Push-Up", "Bench Dips", "Burpees with Pushup", "Air Squats", "Forward Lunge", "Jumping Lateral Skaters", "Squat Jumps", "Push-Up", "Air Squats", "Jumping Lateral Skaters", "Burpees", "Alternating Lunge Jumps", "Crunches (touch heels)", "Standing Alternating Dumbbell Curl", "Incline Dumbbell Bench Press", "Arnold Dumbbell Press", "Flat Dumbbell Fly", "Romanian Dumbbell Deadlift", "Dumbbell Lunge", "Dumbbell Side Lunge", "Dumbbell Squat", "Standing Alternating Dumbbell Curl", "Incline Dumbbell Bench Press", "Dumbbell Lunge", "Dumbbell Squat", "Arnold Dumbbell Press", "Flat Dumbbell Fly", "Incline Bench Press", "Bent-Over Dumbbell Row", "Overhead Press", "Barbell Curl", "Barbell Squat", "Romanian Barbell Deadlift", "Barbell Lunge", "Deadlift", "Deadlift", "Barbell Squat", "Incline Press", "Overhead Press", "Burpees", "Air Squats", "Mountain Climbers", "Jumping Lateral Skaters", "Crunches (touch-heels)", "Squat Jumps", "Jumping Lateral Skaters", "Alternating Lunge Jumps", "Mountain Climbers", "Push-Up", "High Knee (running in place)", "Burpees", "Crunches (touch heels)", "Alternating Lunge Jumps", "Box Jumps", "Mountain Climbers"]
    let r = await db.runAsync("CREATE TABLE IF NOT EXISTS " + exerciseTableName + " (id int PRIMARY KEY, name text)")
    console.log("Result " + JSON.stringify(r))
    await db.runAsync(jsObjToSQL(exerciseTableName, ids, names))


}


/**
 * Must init DB first
 * @returns Promise
 */
const GetAllExercises = async() => {
    let db = await SQLite.openDatabaseAsync(dbName)

    return db.getAllAsync("select * from " + exerciseTableName)

}

/**
 * Must init DB first
 * @returns Promise
 */
const GetExercises = async(ids: []) => {
    let db = await SQLite.openDatabaseAsync(dbName)
    let exerciseArr: Exercise[] = []
    let questionStr = "?,".repeat(ids.length)
    let questions = questionStr.substring(0, questionStr.length - 1)
    console.log("select * from " + exerciseTableName + " where ID in (" + questions + ")")
    console.log(ids)
    return db.getAllAsync("select * from " + exerciseTableName + " where ID in (" + questions + ")", ids)

}

// TODO: Use ? syntax to prevent SQL injection
function jsObjToSQL(tableName: string, idArr: number[], nameArr: string[]){
    let sqlite = "INSERT INTO " + tableName + " (id, name) VALUES "
    
    if (idArr.length != nameArr.length){
        throw Error("Init param arrays are not the same length")
    }


    for (let i = 0; i < idArr.length; i++){
        sqlite = sqlite + " (" + idArr[i] + ", '" + nameArr[i] + "')"
        if (i + 1 < idArr.length){
            sqlite = sqlite + ", "
        } 
    }

    sqlite = sqlite + " ON CONFLICT DO NOTHING"

    return sqlite
}

function clear(){
    console.log("DELETING ENTIRE DATABASE")
    SQLite.deleteDatabaseSync(dbName)
}

const _ = {
    InitDB,
    GetExercises
}
export default _