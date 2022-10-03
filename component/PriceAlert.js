import React from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text
} from 'react-native'
import { COLORS, SIZES, FONTS, icons } from '../constants'

// make the PriceAlert Component that use customContainerStyle to make changes for later use 
const PriceAlert = ({ customContainerStyle}) => {
    return (
        // wrap eveything with TouchableOpacity to make the PriceAlert Clickable
        <TouchableOpacity
            style={{
                // set the flexDirection to the row to display eveything into the row 
                flexDirection: 'row',
                // set the alignitem = 'center' to display eveything into the center 
                alignItems: 'center',
                // giving the marginTop=108px 
                marginTop: SIZES.padding * 4.5,
                // marginHorizontal = 24px or marginRight 
                marginHorizontal: SIZES.padding,
                // paddingHorizontal = 24px
                paddingHorizontal: SIZES.padding,
                // paddingVertical = 24px
                paddingVertical: SIZES.padding,
                // backgroundColor = white
                backgroundColor: COLORS.white,
                // borderRadius = 12px 
                borderRadius: SIZES.radius,
                // customContainerStyle if any custom styling is defined
                ...customContainerStyle,
                // and also give the shadow effect 
                ...styles.shadow
         }}
        >
            {/* and also the image tag for alert  */}
            <Image
                // giving the source alert image 
                source={icons.notification_color}
                // width and height 30px 
                style={{
                    width: 30,
                    height: 30,
                }}
            />
            {/* For display the text make a view and give it style marginLeft 12px and giving the flex 1 to give 100% */}
            <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                {/* give the style the FONTS.h3  */}
                <Text style={{ ...FONTS.h3}}>Set Price Alert</Text>
                {/* give the style the FONTS.body4  */}
                <Text style={{ ...FONTS.body4}}>Get notified when your coins are moving </Text>
            </View>
            <Image
                source={icons.right_arrow}
                style={{
                    // width = 25 
                    width: 25,
                    // height = 25
                    height: 25,
                    // giving the tintColor = gray 
                    tintColor: COLORS.gray
                }}
            />
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    }
})

export default PriceAlert