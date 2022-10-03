import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { COLORS, SIZES, FONTS} from '../constants'

// TextButton with props lable, customContainerStyle, customLableStyle, onPress
const TextButton = ({ lable, customContainerStyle, customLableStyle, onPress }) => {
    return (
    //   Wrap everything into the TouchableOpacity to make it touchable 
      <TouchableOpacity
            style={{
            //   height is 45 
                height: 45,
                // alignitems & justifyContent to centerlize the content
              alignItems: "center",
                justifyContent: "center",
            //   borderradius is SIZES.radius
                borderRadius: SIZES.radius,
            //   background color is green
                backgroundColor: COLORS.green,
            //   aslo the customContainerStyle if anyExist 
              ...customContainerStyle
            }}
            // onPress called the onPress prop
          onPress={onPress}
        >
            {/* text to display the text  */}
            <Text style={{
            //   color =  white 
                color: COLORS.white,
                // font is h3 
                ...FONTS.h3,
            //   customLableStyle if any exist 
                ...customLableStyle
            //   lable is the text style 
          }}>{lable}</Text>
    </TouchableOpacity>
  )
}

export default TextButton