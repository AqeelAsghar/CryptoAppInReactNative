import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Image,
    ImageBackground,
    LogBox
} from 'react-native';
import {PriceAlert, TransactionHistory} from '../component';
import { dummyData, COLORS, SIZES, FONTS, icons, images} from '../constants';

const Home = ({ navigation }) => {
    // trending Hook to display the Data from the trendingCurrency and use it into our FlatList Data 
    const [trending, setTrending] = useState(dummyData.trendingCurrencies)
    const [transactionHistory, setTransactionHistory] = useState(dummyData.transactionHistory)

    // to ignoring the Warning messages access the LogBox.ignoreLogs and in array pass the warning message as it is 
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedList should never be nested'])
        LogBox.ignoreLogs(['Encountered two children with the same key'])
    },[])

     // make a function renderHeader that show the header 
    function renderHeader() {
        // make a Render Item Function to Render the Item into the FlatList
        const renderItem = ({ item, index }) => (
            // make the Touchable Wrap it into the TouchableOpacity
            <TouchableOpacity
                style={{
                    // width of 180px 
                    width: 180,
                    // paddingVertical = 24
                    paddingVertical: SIZES.padding,
                    // paddingHorizontal = 24
                    paddingHorizontal: SIZES.padding,
                    // marginLeft if its 1st index then 24 otherwise 15px 
                    marginLeft: index === 0 ? SIZES.padding : 15,
                    // borderRadius is 10px 
                    borderRadius: 10,
                    // backgroundColor: white,
                    backgroundColor: COLORS.white,
                }}
                // on press navigation to CryptoDetail page and on props sent the item 
                onPress={() => navigation.navigate('CryptoDetail', {currency: item})}
            > 
                {/* **************************************************************************************************************** */}
                {/* Currency */}

                {/* make a sub view what display data as a  = Row  */}
                <View style={{ flexDirection: 'row' }}>
                    {/* View to show image  */}
                    <View>
                        <Image
                            // source it item.image 
                            source={item.image}
                            // mode is cover 
                            resizeMode='cover'
                            style={{
                                // style is marginTop = 5 
                                marginTop: 5,
                                // width = 25 
                                width: 25,
                                // height = 25 
                                height: 25,
                            }}
                        />
                    </View>
                    {/* for Current give it a margin Left 24 because its now it row wise display */}
                    <View style={{ marginLeft: SIZES.base }}>
                        {/* style is h2  */}
                        <Text style={{ ...FONTS.h2 }}>{item.currency}</Text>
                        {/* style is body 3 and color is gray  */}
                        <Text style={{...FONTS.body3, color: COLORS.gray}}>{item.code}</Text>
                    </View>
                </View>
                {/* ****************************************************************************************************************/}
                {/* Value */}

                {/* make a anotherView to display the amount  */}
                <View style={{marginTop: SIZES.radius}}>
                    {/* style is h2  */}
                    <Text style={{ ...FONTS.h2 }}>${item.amount}</Text>
                    {/* font is h3 and color if its type is I then green otherwise red  */}
                    <Text style={{ ...FONTS.h3, color: item.type == 'I' ? COLORS.green : COLORS.red}}>{item.changes}</Text>
                </View>

            </TouchableOpacity>
        )
        return (
            // Make a View that hold all the values inside 
            <View style={{
                // width is equal to the screen width
                width: '100%',
                // height is equal to the 290px 
                height: 290,
                // and give it some shahdow too 
                ...styles.shadow
            }}>
                {/* between the main View make ImageBackGround to set Image */}
                <ImageBackground
                    // giving it a source 
                    source={images.banner}
                    // define the display Mode 
                    resizeMode="cover"
                    // giving it the style flex 1 to take all width and height of the parent view & alignItem center to display it center
                    style={{
                        flex: 1,
                        alignItems: 'center'
                    }}
                >
                    {/* ****************************************************************************************************************************** */}
                    {/* header Bar  Section */}
                    <View
                        // for making header bar Section mae a view and give it styling too 
                        style={{
                            // giving to top margin 
                            marginTop: SIZES.padding * 2,
                            // width= 100% to take screen full width
                            width: '100%',
                            // but this time align it as a flex end to display it into the right edge
                            alignItems: 'flex-end',
                            // for gave it Horizontal padding for right side 
                            paddingHorizontal: SIZES.padding
                        }}>
                        {/* in this View make a TouchableOpacity Component to make Alert touchable  */}
                        <TouchableOpacity
                            // also give some custom style to it 
                            style={{
                                // width is 35px
                                width: 35,
                                // height is 35px
                                height: 35,
                            // align and justifyContent to center the center it 
                            alignItems: 'center',
                            justifyContent: 'center'
                            }}
                            // and also on Press show a console message 
                            onPress={console.log('Notification on press ')}
                        >
                            {/* and i TouchableOpacity Display the Image  */}
                            <Image
                                // give it the source 
                                source={icons.notification_white}
                                // defining the display Mode 
                                resizeMode='contain'
                                // and take 100% it the parent component width and height which in this case is TouchableOpacity
                                style={{
                                    flex: 1,
                                }}
                            />
                     </TouchableOpacity>
                    </View>
                    {/* *********************************************************************************************************************** */}
                    {/* Balance  */}

                    {/*  Balance Section View style alignItem & justifyContent cneter to center the text */}
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        {/* color is white and font is h3  */}
                        <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Your Portfolio Balance</Text>
                        {/* colorr is white and font is h1 & marginTop = 8px */}
                        <Text style={{ color: COLORS.white, ...FONTS.h1, marginTop: SIZES.base }}>${dummyData.portfolio.balance}</Text>
                        {/* color is white and font is  body5  */}
                        <Text style={{ color: COLORS.white, ...FONTS.body5 }}>{dummyData.portfolio.changes} Last 24 hours</Text>
                    </View>

                    {/* *********************************************************************************************************************** */}
                    {/* Trending  */}

                    {/* To display the Tending Currency we give the position is absolute and from bottom its 30% down Side  */}
                    <View style={{
                        position: 'absolute',
                        bottom: '-30%'
                    }}>
                        {/* and Display the Text  Trending */}
                        <Text style={{
                            // marginTop = 8px 
                            marginLeft: SIZES.padding,
                            // color is whhite 
                            color: COLORS.white,
                            // font is h2 size 
                            ...FONTS.h2
                        }}>Trending </Text>

                        {/* to display the Trending Currency we use Flatlist */}
                        <FlatList
                            // giving the Top margin = 8ps 
                            contentContainerStyle={{ marginTop: SIZES.base }}
                            // data is equal to trending Hook which we build up 
                            data={trending}
                            // render item is equal to renderItem 
                            renderItem={renderItem}
                            // KeyExtractor is equal to the item Dynamic key
                            keyExtractor={item => `${item.key}`}
                            // show flatList as a Horizontal order 
                            horizontal
                            // We doest want to show ScrollIndicator that why make is false 
                            showsHorizontalScrollIndicator={false}
                        />
                     </View>

                </ImageBackground>
            </View>
        )
    }

     // ***************************************************************************************************************************************************************
     // make a function renderSetAlert that show the SetAlert  
    function renderSetAlert() {
        return (
            // in this renderSetAlert we display the PriceAlert function and make a component to use it later
               <PriceAlert /> 
        )
    }
     // ***************************************************************************************************************************************************************
     // make a function renderNotice  that show the Notice 
    function renderNotice() {
        return (
            // a parent View that hold the all the notice 
            <View
                style={{
                    // marginTop is 24 
                    marginTop: SIZES.padding,
                    // marginLeft is 24 
                    marginHorizontal: SIZES.padding,
                    // padding 20 for all side 
                    padding: 20,
                    // borderRadius 12 
                    borderRadius: SIZES.radius,
                    // backgroundColor: blue 
                    backgroundColor: COLORS.secondary,
                    // and give it some shadow 
                    ...styles.shadow,
             }}
            >
                {/* display the text where color is white and font is h3  */}
                <Text style={{ color: COLORS.white, ...FONTS.h3}}>Investing Safety</Text>
                {/* display the text where color is white and font is body5 and marginTop is 8 and lineHeight is 18 for lines   */}
                <Text style={{ color: COLORS.white, ...FONTS.body4, marginTop: SIZES.base, lineHeight: 18 }}>
                    it's vary difficult to time an investment, especially when then market is volatile.
                    Learn how to use dollar cost averaging to you advantange
                </Text>
                {/* and make a touchableOpacity to make this button Touchable  */}
                <TouchableOpacity
                    style={{
                        // marginTop is 8 
                        marginTop: SIZES.base
                    }}
                    // and onPress console Learn More 
                    onPress={() => console.log(' Learn More')}
                >
                    {/* Text with style color is green font is h3 and textDecorationLine for make the text underLine  */}
                    <Text style={{ color: COLORS.green, ...FONTS.h3, textDecorationLine: 'underline'}}>Learn more </Text>
                </TouchableOpacity>
            </View>
        )
    }
    // ***************************************************************************************************************************************************************
     // make a function renderNotice  that show the TransactionHistory 
    function renderTransactionHistory() {
        return (
            <TransactionHistory
                customContainerStyle={{ ...styles.shadow }}
                history={transactionHistory}
            />
        )
    }
    
    return (
        // we wrap eveything into the scrollView to make it scrollable
        <ScrollView>
            {/* in this view we display it as a plex 1 but give it a padding bottom 130 so he cannot effect our Tabs  */}
            <View style={{ flex: 1, paddingBottom: 130 }}>
                {/* in main we display a header functioin that display header  */}
                {renderHeader()}
                {/* in main we display a Set PriceAlert functioin that display PriceAlert */}
                {renderSetAlert()}
                {/* in main we display a Notice functioin that display Notice */}
                {renderNotice()}
                {/* in main we display a  Transaction History functioin that display Transaction History  */}
                {renderTransactionHistory()}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
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

export default Home;