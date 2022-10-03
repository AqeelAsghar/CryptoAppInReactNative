import React from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native'
import { SIZES, COLORS, FONTS, icons } from '../constants'
// make a TransactionHistory Component to use it later into our Project 
const TransactionHistory = ({ customContainerStyle, history }) => {

    // in renderItem function we display the transaction history 
    const renderItem = ({ item }) => {
        // return to display eveything
        return (
            // wrap eveything within the TouchableOpacity to make it touchable 
            <TouchableOpacity
                style={{
                    // flexDirection: 'row' to display it in a row
                    flexDirection: 'row',
                    // alignItems: 'center to center it 
                    alignItems: 'center',
                    // paddingVertical: 8 to display 8 from top 
                    paddingVertical: SIZES.base,
                }}
                // onPress Console the item 
                onPress= {()=> console.log(item)}
            >
                {/* display the image  */}
                <Image
                    source={icons.transaction}
                    // width and height is 30 and background color is blue 
                    style={{
                        width: 30,
                        height: 30,
                        tintColor: COLORS.primary
                    }}
                />
                
                {/* flex 1 and marginLeft 8 */}
                <View style={{ flex: 1, marginLeft: SIZES.base }}>
                    {/* Text style is h3  */}
                    <Text style={{ ...FONTS.h3 }}>{item.description}</Text>
                    {/* Text style is body4 and color is gray  */}
                    <Text style={{ ...FONTS.body4, color: COLORS.gray}}>{item.date}</Text>
                </View>
                {/* make a view and give the Direction row to display it into the line and give height is 100% and alignItems center to center it  */}
                <View style={{ flexDirection: 'row', height: '100%', alignItems: 'center' }}>
                    {/* Text style if item type is B then green otherwise Red */}
                    <Text style={{
                        color: item.type === 'B' ? COLORS.green : COLORS.red
                    }}>
                        {/* diaplay the amout and currency  */}
                        {item.amount} {item.currency}</Text>
                    {/* for display the forward arrow use a image tag  */}
                    <Image
                        source={icons.right_arrow}
                        // height and width 20 and tintColor is gray 
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.gray
                        }}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    return (
    //   this view return the TransactionHistory 
      <View
            style={{
            //   giving it the MarginTop 
                marginTop: SIZES.padding,
                // marginLeft =  24 
                marginHorizontal: SIZES.padding,
            //   padding 20 for all sides 
                padding: 20,
            //   background: height
                backgroundColor: COLORS.white,
            //   borderRadius = 8
                borderRadius: SIZES.radius,
            //   and some customContainerStyle which in this case it shadow 
              ...customContainerStyle
       }}
        >
            {/* then display the Header Text  */}
            <Text style={{ ...FONTS.h2 }}>Transaction History</Text>
            {/* and then the FlatList to display the list of transactions */}
            <FlatList
                // contentContainerStyle for giving the  marginTop 
                contentContainerStyle={{ marginTop: SIZES.radius }}
                // disable the scroll 
                scrollEnabled={false}
                // data is history which we are receiver as a prop
                data={history}
                // keyExtractor is dynamic item id 
                keyExtractor={item => `${item.id}`}
                // renderItem is RenderItem function
                renderItem={renderItem}
                // disable the horizontal scroll Indicator 
                showsHorizontalScrollIndicator={false}
                // for give separate we use itemSeperatorComponent which returns a view with styling 
                ItemSeparatorComponent={() => { 
                //   return to return this view 
                  return(
                      <View style={{ 
                    //   giving the line of width 100% 
                          width: '100%',
                        //   height is 1
                          height: 1,
                    //   backgroundColor is light gray
                      backgroundColor: COLORS.lightGray,
                  }}>
                      </View>
                  )
              }}
          />
        </View>
    )
}

export default TransactionHistory