import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';

const workoutTableName = "workout"
const dbName = "workoutDB"

class Workout{
    name: string;
    exerciseIDs: number[];
    id: number;
    
    public constructor(name: string, exerciseIDStr: string, id: number) {
        this.name = name;
        this.id = id;
        
        let arr = exerciseIDStr.split(",")
        let numArr = arr.map((v) => Number.parseInt(v))
        this.exerciseIDs = numArr
    }

}

async function InitDB(){
    console.log("Init DB")
    let db = await SQLite.openDatabaseAsync(dbName)

    // Initalize database
    // TODO: re-add stuff, accidenally deleted
    // let ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    // let names = ["Upper (Body Weight)","Lower (Body Weight)","Full Body (Body Weight)","Cardio","Soccer Training","Upper (Dumbbell)","Lower (Dumbbell)","Full Body (Dumbbell)","Runner Workout","Core"]
    // let exerIds = ["36, 37, 71, 72, 47","51, 52, 63, 77","31, 37, 71, 23, 51, 52, 63, 77","23, 51, 77, 78, 63, 79","47, 25, 63, 64, 31, 37","11, 27, 65, 30, 7","49, 57, 59, 60","11, 27, 30, 7, 49, 57, 59, 60","80, 23, 37, 63, 64, 47","47, 37, 85, 77, 87"]
    let ids = [1, 2]
    let names = ["Work A", "Work B"]
    let exerIds = ["1, 2, 1, 2", "3, 4, 3, 4"]

    
    let r = await db.runAsync("CREATE TABLE IF NOT EXISTS " + workoutTableName + " (id int PRIMARY KEY, name text, exerciseIDs text)")
    await db.runAsync(jsObjToSQL(workoutTableName, ids, names, exerIds))

}


/**
 * Must init DB first
 * @returns Promise
 */
const GetAllWorkouts = async() => {
    let db = await SQLite.openDatabaseAsync(dbName)
    let workoutArr: Workout[] = []
    return db.getAllAsync("select * from " + workoutTableName)
}

/**
 * Must init DB first
 * @returns Promise
 */
const GetWorkout = async(id: number) => {
    let db = await SQLite.openDatabaseAsync(dbName)
    let workoutArr: Workout[] = []
    return db.getFirstAsync("select * from " + workoutTableName + " where ID = ?", [id])
}

function jsObjToSQL(tableName: string, idArr: number[], nameArr: string[], exerciseIDArr: string[]){
    let sqlite = "INSERT INTO " + tableName + " (id, name, exerciseIDs) VALUES "
    
    if (idArr.length != nameArr.length || idArr.length != exerciseIDArr.length){
        // throw Error("Init param arrays are not the same length")
        return "ERROR"
    }

    for (let i = 0; i < idArr.length; i++){
        sqlite = sqlite + " (" + idArr[i] + ", '" + nameArr[i] + "', '" + exerciseIDArr[i] + "')"
        if (i + 1 < idArr.length){
            sqlite = sqlite + ", "
        } 
    }

    sqlite = sqlite + " ON CONFLICT DO NOTHING"

    return sqlite
}

function clear(){
    console.log("DELETING ENTIRE DATABASE")
    // let db = SQLite.openDatabase(dbName)
    // let p = db.closeAsync()
    // p.then(() => {
    let db = SQLite.openDatabaseSync(dbName)
    db.closeSync()
    SQLite.deleteDatabaseSync(dbName)
        console.log("dead")
    // })
}

const _ = {
    InitDB,
    GetAllWorkouts,
    GetWorkout,
    Workout,
    clear
}
export default _