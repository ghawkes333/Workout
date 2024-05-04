import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';

const workoutTableName = "workout"
const dbName = "workoutDB"

class Workout{
    name: string;
    exerciseIDs: number[];
    
    public constructor(name: string, exerciseIDStr: string) {
        this.name = name;
        
        let arr = exerciseIDStr.split(",")
        let numArr = arr.map((v) => Number.parseInt(v))
        this.exerciseIDs = numArr
    }

}

async function InitDB(){
    console.log("Init DB")
    let db = SQLite.openDatabase(dbName)

    // Initalize database
    // TODO: re-add stuff, accidenally deleted
    let ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let names = ["Upper (Body Weight)","Lower (Body Weight)","Full Body (Body Weight)","Cardio","Soccer Training","Upper (Dumbbell)","Lower (Dumbbell)","Full Body (Dumbbell)","Runner\'s Workout","Core"]
    let exerIds = ["36, 37, 71, 72, 47","51, 52, 63, 77","31, 37, 71, 23, 51, 52, 63, 77","23, 51, 77, 78, 63, 79","47, 25, 63, 64, 31, 37","11, 27, 65, 30, 7","49, 57, 59, 60","11, 27, 30, 7, 49, 57, 59, 60","80, 23, 37, 63, 64, 47","47, 37, 85, 77, 87"]
    db.transaction(tx => {
        tx.executeSql("CREATE TABLE IF NOT EXISTS " + workoutTableName + " (id int PRIMARY KEY, name text, exerciseIDs text)"
        , [], undefined, (t, e) => {
            console.log("can't create: " + e)
            console.log("Statement was " + "CREATE TABLE IF NOT EXISTS " + workoutTableName + " (id int PRIMARY KEY, name text, exerciseIDs text)")
            return false
        })
        tx.executeSql(jsObjToSQL(workoutTableName, ids, names, exerIds)
        , [], undefined, (t, e) => {
            console.log("can't create: " + e)
            console.log("Statement was " + jsObjToSQL(workoutTableName, ids, names, exerIds))
            return false
        })
        
    })


}


/**
 * Must init DB first
 * @returns Promise
 */
const GetAllWorkouts = async(): Promise<Array<Workout>> => {
    let db = SQLite.openDatabase(dbName)
    let workoutArr: Workout[] = []
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql("select * from " + workoutTableName, [], (_, { rows }) =>{
                console.log(JSON.stringify(rows))
                rows._array.forEach((r) => {
                    let w = new Workout(r.name, r.exerciseIDs)
                    workoutArr.push(w)
                })
                resolve(workoutArr)
    
            });
    
        })
    }
    )
}

/**
 * Must init DB first
 * @returns Promise
 */
const GetWorkout = async(id: number): Promise<Workout> => {
    let db = SQLite.openDatabase(dbName)
    let workoutArr: Workout[] = []
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql("select * from " + workoutTableName + " where ID = ?", [id], (_, { rows }) =>{
                let r = rows._array[0]
                let w = new Workout(r.name, r.exerciseIDs)
                resolve(w)
    
            });
    
        })
    }
    )
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
    const dbName = "workoutDB"
    let db = SQLite.openDatabase(dbName)
    let p = db.closeAsync()
    p.then(() => {
        db.deleteAsync()
        console.log("dead")
    })
}

const _ = {
    InitDB,
    GetAllWorkouts,
    GetWorkout,
    Workout
}
export default _