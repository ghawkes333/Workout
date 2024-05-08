import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StartScreen from "../components/StartWorkout"
import WorkoutListScreen from "../components/WorkoutList"
import { Icon } from '@rneui/base';
import { mergeRealmConfiguration } from '@realm/react/dist/RealmProvider';

// import { makeStyles} from "@rneui/base";
// import {Icon} from "@rneui/themed"
// import { Pressable, TouchableOpacity } from "react-native";

// import { Image } from '@rneui/themed';

const Tab = createBottomTabNavigator();

// function MyTabBar({ state, descriptors, navigation }) {
//   return (
//     <View style={{ flexDirection: 'row' }}>
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//             canPreventDefault: true,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name, route.params);
//           }
//         };

//         const onLongPress = () => {
//           navigation.emit({
//             type: 'tabLongPress',
//             target: route.key,
//           });
//         };

//         return (
          
//             <View style={styles.bottomTab}>
                    
//             <Icon
//                 name="check-square-o"
//                 type="font-awesome"
//                 color="#000000"
//                 size={64}
//                 />
//             <Icon size={48} name="dumbbell" type="font-awesome-5" color="black"/>
//             <Icon size={48} name="bar-graph" type="entypo" /> 
//         </View>
//         );
//       })}
//     </View>
//   );
// }

export default function App({route, navigation}){
  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      <Tab.Screen name="WorkoutList" 
        options={{headerShown: false, tabBarShowLabel: false, tabBarIcon: ({focused, color, size}) => {
          let c = focused ? "black" : "gray"
            return (
              <Icon size={48} name="check-square-o" type="font-awesome" color={c}/>
            );
        }}} 
        component={WorkoutListScreen} />
      <Tab.Screen name="StartWorkout" 
        options={{headerShown: false, tabBarShowLabel: false, tabBarIcon: ({focused, color, size}) => {
          let c = focused ? "black" : "gray"
            return (
              <Icon size={48} name="dumbbell" type="font-awesome-5" color={c}/>
            );
        }}}  
        component={StartScreen} />
    </Tab.Navigator>
  );
}