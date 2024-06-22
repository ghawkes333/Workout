import { View , ActivityIndicator, TouchableOpacity } from "react-native";
import { makeStyles, Text, Button, useThemeMode } from "@rneui/themed";
// import { Icon } from "@rneui/base";

export default function App({route, navigation}){
    const styles = useStyles()
    return(
        <View style={styles.bottomTab}>
{/*                 
            <Icon
                name="check-square-o"
                type="font-awesome"
                color="#000000"
                size={64}
                /> */}
        </View>

    )
}

const useStyles = makeStyles((theme) => ({
    
  topbar:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomTab: {
    flex: 1
  },
}))