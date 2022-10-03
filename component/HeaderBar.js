import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { COLORS, SIZES, FONTS, icons} from '../constants'

//  make a Headerbar Component to use if for later into your Project 
const HeaderBar = ({ right }) => {
    // use tha useNavigation hook to navigate 
    navigation =  useNavigation()
    return (
    //   View which is Row Direction and paddingLeft 8 
      <View
          style={{
              paddingHorizontal: SIZES.padding,
              flexDirection: 'row'
          }}
        >
            {/* ******************************************************************************************** */}
            {/* Go Back Section  */}

            {/* give it a flex 1 and alignItem to flexStart */}
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
                {/* wrap this view into the TouchableOpacity to make it touchable  */}
                <TouchableOpacity
                    // give this view a flexDirection row to and alignItem center to center it 
              style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                    }}
                    // and on press it go back to the pervious page 
           onPress= {()=> navigation.goBack()}
                >
                    {/* between this touchableOpacity show the back arrow */}
              <Image
                        source={icons.back_arrow}
                        // resizeMode is contain 
                        resizeMode='contain'
                        // height and width is 25 and background is gray
                  style={{
                      height: 25,
                      width: 25,
                      tintColor: COLORS.gray
                  }}
                    />
                    {/* text to display back text and give it the h3 and marginRight  */}
              <Text style={{...FONTS.h3, marginLeft: SIZES.base}}>Back</Text>
          </TouchableOpacity>
            </View>
            
             {/* ******************************************************************************************** */}
            {/* star Section   */}

            {/* set is right prop is true then display this star section  */}
            {right &&
                // make a view with flex: 1 and alignItem flexEnd to display it at the end 
            <View style={{ flex:1 , alignItems: 'flex-end'}}>
                    <Image
                        // giving the source 
                        source={icons.star}
                        // resizeMode is contain
                        resizeMode='contain'
                        // height and width is 30 
                 style={{
                      height: 30,
                      width: 30,
                  }}
               />
          </View>
         }
    </View>
  )
}

export default HeaderBar