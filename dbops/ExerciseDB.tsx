import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';

const exerciseTableName = "exercise"
const dbName = "workoutDB"



async function InitDB(){
    console.log("Init DB")
    let db = await SQLite.openDatabaseAsync(dbName)
    // Initalize database
    // TODO: re-add stuff, accidenally deleted
    // let ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95]
    // let categories = ["Back", "Back", "Back", "Back", "Back", "Back", "Back", "Back", "Back", "Back", "Biceps", "Biceps", "Biceps", "Biceps", "Biceps", "Biceps", "Biceps", "Biceps", "Calves", "Calves", "Calves", "Cardio", "Cardio", "Cardio", "Cardio", "Chest", "Chest", "Chest", "Chest", "Chest", "Chest", "Chest", "Chest", "Chest", "Chest", "Chest", "Core", "Core", "Core", "Core", "Core", "Core", "Core", "Core", "Core", "Core", "Core", "Legs - Hamstrings", "Legs - Hamstrings", "Legs - Hamstrings", "Legs - Quadriceps", "Legs - Quadriceps", "Legs - Quadriceps", "Legs - Quadriceps", "Legs - Quadriceps", "Legs - Quadriceps", "Legs - Quadriceps", "Legs - Quadriceps", "Legs - Quadriceps", "Legs - Quadriceps", "Legs - Quadriceps", "Legs - Quadriceps", "Legs - Quadriceps", "Legs - Quadriceps", "Shoulders", "Shoulders", "Shoulders", "Shoulders", "Shoulders", "Triceps", "Triceps", "Triceps", "Triceps", "Triceps", "Triceps", "Biceps", "Cardio", "Cardio", "Cardio", "Cardio", "Cardio", "Cardio", "Chest", "Core", "Core", "Core", "Core", "Core", "Core", "Core", "Legs - Quadriceps", "Legs - Quadriceps", "Legs - Quadriceps", "Legs - Quadriceps", "Shoulders"]
    // let names = ["Pull-Up", "Chin-Up", "Close-Grip Lat Pulldown", "Wide-Grip Lat Pulldown", "Lat Pulldown", "Bent-Over Barbell Row", "Bent-Over Dumbbell Row", "One Arm Dumbbell Row (alternating)", "Barbell Deadlift", "Dumbbell Deadlift", "Standing Alternating Dumbbell Curl", "Standing Alternating Hammer Curl", "Barbell Curl", "Bottom/Top/Full Barbell Curls", "Bottom/Top/Full Dumbbell Curls", "Incline Concentration Dumbbell Curl", "Preacher Barbell Curl", "Preacher Single-Arm Dumbbell Curl", "Barbell Calf Raise", "Dumbbell Calf Raise", "Single-leg Calf Raise", "Thrusters", "Burpees", "Box Jumps", "Squat Jumps", "Flat Dumbbell Bench Press", "Incline Dumbbell Bench Press", "Flat Barbell Bench Press", "Incline Barbell Bench Press", "Flat Dumbbell Fly", "Push-Up", "Dumbbell Push-Up", "Kneeling Push-Up", "Medicine Ball Crossover Push-Up", "Twisting Dumbbell Bench Press", "Wide-Grip Push-Up", "Crunches (touch heels)", "Weighted Crunch", "Superman", "Sit-Up", "Medicine Ball Sit-up", "Cross Crunch (Russian Twist)", "Cross Crunch (Russian Twist) w/ Medicine Ball", "Cross Crunch (Russian Twist) w/ Dumbbell", "Kneeling Ab Rollout", "Medicine Ball V-Up", "V-Up", "Romanian Barbell Deadlift", "Romanian Dumbbell Deadlift", "Single, Stiff-leg dumbbell deadlift", "Air Squats", "Forward Lunge", "Forward & Reverse Lunge", "Bulgarian Split Squat", "Barbell Squat", "Barbell Walking Lunge", "Dumbbell Lunge", "Dumbbell Forward & Reverse Lunge", "Dumbbell Side Lunge", "Dumbbell Squat", "Dumbbell Walking Lunge", "Bulgarian Split Squat with Dumbbell", "Jumping Lateral Skaters", "Alternating Lunge Jumps", "Arnold Dumbbell Press", "Barbell Overhead Shoulder Press", "Dumbbell Overhead Shoulder Press", "Dumbbell Front Raise", "Bent-Over Dumbbell Lateral Raise", "Close-Grip Bench Press", "Bench Dips", "Diamond Push-Up", "Single Dumbbell Triceps Extension (Kickback)", "Dumbbell Lying Tricep Extension (Skull-crushers)", "Overhead Dumbbell Triceps Extension", "Standing Alternating Dumbbell Curl", "Mountain Climbers", "Jumping Jacks", "Jump Rope", "High Knee (running in place)", "Burpees", "Thrusters", "Push-Up", "Flutter kicks", "Front Plank", "Side-Plank", "Bicycle crunch", "Sit-Up", "V-Up", "Crunches (touch heels)", "Air Squats", "Forward Lunge", "Jumping Lateral Skaters", "Alternating Lunge Jumps", "Arnold Dumbbell Press"]
    let ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51]
    let names = ["V-Ups", "Crunches (touch heels)", "Front Plank", "Mountain Climbers", "Wide-Grip Push-Ups", "Close-grip Push-Ups", "Bench Dips", "Burpees with Pushup", "Air Squats", "Forward Lunges", "Jumping Lateral Skaters", "Box Jumps", "Push-Ups", "Air Squats", "Jumping Lateral Skaters", "Burpees", "Standing Alternating Dumbbell Curls", "Incline Dumbbell Bench Press", "Arnold Dumbbell Press", "Flat Dumbbell Fly", "Romanian Dumbbell Deadlifts", "Dumbbell Lunges", "Dumbbell Side Lunge", "Dumbbell Squat", "Standing Alternating Dumbbell Curls", "Incline Dumbbell Bench Press", "Dumbbell Lunge", "Dumbbell Squat", "Incline Bench Press", "Bent-Over Dumbbell Row", "Overhead Press", "Barbell Curl", "Barbell Squats", "Romanian Barbell Deadlift", "Barbell Lunge", "Deadlifts", "Deadlifts", "Barbell Squat", "Incline Press", "Overhead Press", "Burpees", "Air Squats", "Mountain Climbers", "Jumping Lateral Skaters", "Crunches (touch-heels)", "Squat Jumps", "Jumping Lateral Skaters", "Alternating Lunge Jumps", "High Knees (running in place)", "Burpees", "Crunches (touch heels)", "Alternating Lunge Jumps"]
    
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
    GetExercises,
    GetAllExercises
}
export default _