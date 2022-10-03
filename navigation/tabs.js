import React from "react";
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet
} from "react-native";
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"
// In Transaction their is liner Gradent that why we install it 
import LinearGradient from "react-native-linear-gradient";

import { Home } from "../screens"
import { COLORS, FONTS, icons } from "../constants"

const Tab = createBottomTabNavigator()

// Custom button Component For transcription tab 
// This button getting 2 properties 1st is childeren which in this case is icon and second the onPress functionality 
const TabBarCustomeButton = ({ children, onPress }) => {
    // return when the TabBarCustomButton Component called 
    return (
        // Wrap the Icon into the TouchableOpacity to behave it like a button  
        <TouchableOpacity
            // onPress its equal to the transction tab onPress functionality
            onPress={onPress}
            // give it some styling 
            style={{
                // From top its -30 to give a feel like a skying button 
                top: -30,
                // give it some styling to properly centerlize it 
                justifyContent: "center",
                alignItems: "center",
                // and give it the some shahdow by assing stylesSheets object => shahdow with spead opertaor to make a new copy and cannot demande the origainal one 
                ...styles.shadow
            }}
        >
            {/* Wrap the icon into the linergradient import which we install pervisouly to give the liner gradient look  */}
            <LinearGradient
                // some some list of colors as a array 
                colors={[COLORS.primary, COLORS.secondary]}
                // and then give some height and width and borderRadius to make it round 
                style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35
                }}
            >
                {children}
            </LinearGradient>
        </TouchableOpacity>
    );
}


const Tabs = () => {
    return (
        <Tab.Navigator
            // give the some custom styling to the side bar 
            tabBarOptions={{
                // hide the lable 
                showLabel: false,
                // then give some custom styling for tabs 
                style: {
                    // give it a position to absolute positioning
                    position: "absolute",
                    // bottom position should be 0 
                    bottom: 0,
                     // right position should be 0 
                    right: 0,
                    // elevation position should be 0 
                    elevation: 0,
                    // use background color is white by getting it from our predefine colors 
                    backgroundColor: COLORS.white,
                    // make thr top boder color Transparent 
                    borderTopColor: 'transparent',
                    // and give the height to 100 px 
                    height: 100
                }
          }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                // for giving it the custom styling we give eveything into the options 
                options={{
                    // for show the icon + title we use the tabBarIcon and make it a function and pass prop to check whether it currently focused or not 
                    tabBarIcon: ({ focused }) => (
                        // make a View the hold the Icon and the text and give it some styling to centerlize it 
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {/* in image we first time the image source  */}
                            <Image
                                source={icons.home}
                                // then the resizeMode 
                                resizeMode='contain'
                                // and then some custom styling like the height and width and the tintColor base of focused and unfocused
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? COLORS.primary : COLORS.black

                                }}
                            />
                            {/* also give the text color base on the focused and also give the  styling of body5 by using spread opertaor */}
                            <Text style={{ color: focused ? COLORS.primary : COLORS.black, ...FONTS.body5}}>Home</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Portfolio"
                component={Home}
                // for giving it the custom styling we give eveything into the options 
                options={{
                    // for show the icon + title we use the tabBarIcon and make it a function and pass prop to check whether it currently focused or not 
                    tabBarIcon: ({ focused }) => (
                        // make a View the hold the Icon and the text and give it some styling to centerlize it 
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {/* in image we first time the image source  */}
                            <Image
                                source={icons.pie_chart}
                                // then the resizeMode 
                                resizeMode='contain'
                                // and then some custom styling like the height and width and the tintColor base of focused and unfocused
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? COLORS.primary : COLORS.black

                                }}
                            />
                            {/* also give the text color base on the focused and also give the  styling of body5 by using spread opertaor */}
                            <Text style={{ color: focused ? COLORS.primary : COLORS.black, ...FONTS.body5}}>Portfolio</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Transaction"
                component={Home}
                // for giving it the custom styling we give eveything into the options 
                options={{
                    // in this case we have 2 requiremnt 1st icon and 2nd is the button 
                    // first we make tabBarIcon Vesibile 
                    tabBarIcon: ({ focused }) => (
                        // Give only image tab because we dont have a Text in this case 
                        <Image
                            // give the image source 
                            source={icons.transaction}
                            // then the resizeModeValue type 
                            resizeMode='contain'
                            // some style 
                            style={{
                                // width is same as remining tabBarIcons 
                                width: 30,
                                // height is same as remining tabBarIcons 
                                height: 30,
                                // tintColor is White becuase the Button color is blue this time 
                                tintColor: COLORS.white
                            }}
                        />
                    ),
                    // with tabBarIcons also create the tabBarButton which hold the icon and give it all  props of transcription tab to the TabBarCustomeButton  
                    tabBarButton: (props) => (
                        // and the custome Button Name is TabBarCustomeButton and passing the props into it 
                        <TabBarCustomeButton
                         {...props}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Prices"
                component={Home}
                // for giving it the custom styling we give eveything into the options 
                options={{
                    // for show the icon + title we use the tabBarIcon and make it a function and pass prop to check whether it currently focused or not 
                    tabBarIcon: ({ focused }) => (
                        // make a View the hold the Icon and the text and give it some styling to centerlize it 
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {/* in image we first time the image source  */}
                            <Image
                                source={icons.line_graph}
                                // then the resizeMode 
                                resizeMode='contain'
                                // and then some custom styling like the height and width and the tintColor base of focused and unfocused
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? COLORS.primary : COLORS.black

                                }}
                            />
                            {/* also give the text color base on the focused and also give the  styling of body5 by using spread opertaor */}
                            <Text style={{ color: focused ? COLORS.primary : COLORS.black, ...FONTS.body5}}>Prices</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Home}
                // for giving it the custom styling we give eveything into the options 
                options={{
                    // for show the icon + title we use the tabBarIcon and make it a function and pass prop to check whether it currently focused or not 
                    tabBarIcon: ({ focused }) => (
                        // make a View the hold the Icon and the text and give it some styling to centerlize it 
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {/* in image we first time the image source  */}
                            <Image
                                source={icons.settings}
                                // then the resizeMode 
                                resizeMode='contain'
                                // and then some custom styling like the height and width and the tintColor base of focused and unfocused
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? COLORS.primary : COLORS.black

                                }}
                            />
                            {/* also give the text color base on the focused and also give the  styling of body5 by using spread opertaor */}
                            <Text style={{ color: focused ? COLORS.primary : COLORS.black, ...FONTS.body5}}>Settings</Text>
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    }
})

export default Tabs;