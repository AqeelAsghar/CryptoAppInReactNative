import React from 'react'
import { View, Text, Image } from 'react-native';
import {COLORS, SIZES, FONTS, icons} from '../constants'

// Currencylabel with icon,currency,code as a prop
const CurrencyLabel = ({ icon, currency, code}) => {
    return (
    //   wrap eveything into the view and flexDirection: 'row'
        <View style={{ flexDirection: 'row' }}>
            {/* display the image  */}
            <Image
                // source is equal to icon prop
                source={icon}
                // width and height is 25 
              style={{
                  width: 25,
                  height: 25,
              }}
            />
            {/* view with marginLeft = 8  */}
            <View style={{ marginLeft: SIZES.base }}>
                {/* text is currency prop and FONTS is h3 */}
              <Text style={{ ...FONTS.h3}}>{currency}</Text>
                {/* text is code prop and FONTS is body */}
              <Text style={{ ...FONTS.body4, color: COLORS.gray}}>{code}</Text>
          </View>
    </View>
  )
}

export default CurrencyLabel