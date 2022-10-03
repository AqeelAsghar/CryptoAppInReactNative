import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Image,
    ScrollView,
    Animated
} from 'react-native';
// import headerbar, currencylabel, textbutton, 
import { HeaderBar, CurrencyLabel, TextButton, PriceAlert } from '../component';
// import dummyData, COLORS, SIZES, FONTS 
import { dummyData, COLORS, SIZES, FONTS, icons } from '../constants';
// import VictoryScatter, VictoryLine, VictoryChart, VictoryAxis from npm install victory-native libaray 
import { VictoryScatter, VictoryLine, VictoryChart, VictoryAxis } from 'victory-native';
// import VictoryCustomTheme from ../styles 
import { VictoryCustomTheme } from '../styles';

// get route, navigation as a prop
const CryptoDetail = ({ route, navigation }) => {
    // scrollX varaible to get the dotposition 
    const scrollX = new Animated.Value(0)
    // numberOfCharts is 1,2,3
    const numberOfCharts = [1,2,3]
   
    // make a useState Hook to set selectedCurrency 
    const [selectedCurrency, setSelectedCurrency] = useState(null)
    // make a useState Hook to set chartoptions
    const [chartOptons, setChartOptions] = useState(dummyData.chartOptions)
    // make a useState Hook to set selectedOption and give it a default value of chartOptions[0] index 
    const [selectedOption, setSetlectedOption] = useState(chartOptons[0])

    // useEffect hook 
    useEffect(() => { 
        // make a currency object = and get a route.params to get the params from route 
        const { currency } = route.params
        // set the setSelectedCurrency = currency object
        setSelectedCurrency(currency)
    }, [])
  
    // function to set setSelectedOption
    function optionOnClickHandler(option) { 
        setSetlectedOption(option)
    }

    // function to renderDots 
    function renderDots() {
        // make dotposition varaible = Animated.divide scrollX, SIZES.width
        const dotposition = Animated.divide(scrollX, SIZES.width)
        return (
            // View style is height=30 and marginTop=15
            <View style={{ height: 30, marginTop: 15 }}>
                {/* view to show dots  */}
                <View
                    style={{
                        // flex-direction="row",
                        flexDirection: 'row',
                        // align-items & justifyContent to center the dots 
                        alignItems: 'center',
                        justifyContent: 'center',
                 }}
                >
                    {/* use the map loop to show dots numberOfCharts times  */}
                    {numberOfCharts.map((item, index) => {
                        // opacity is dotposition variable . interpolate function with take object 
                        const opacity = dotposition.interpolate({
                            // inputrange is index-1, index, index+1
                            inputRange: [index - 1, index, index + 1],
                            // outputrange is 0.3,1,0.3
                            outputRange: [0.3, 1, 0.3],
                            // extrapolate is clamp
                            extrapolate: 'clamp'
                        })
                        // dotSize is dotposition variable . interpolate function with take object 
                         const dotSize = dotposition.interpolate({ 
                            // inputrange is index-1, index, index+1
                             inputRange: [index - 1, index, index + 1],
                            // outputrange is 8*0.8 , 10, 8*0.8
                             outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
                            // extrapolate is clamp
                             extrapolate: 'clamp'
                         })
                        // dotColor is dotposition variable . interpolate function with take object 
                        const dotColor = dotposition.interpolate({
                            // inputrange is index-1, index, index+1
                            inputRange: [index - 1, index, index + 1],  
                            // outputrange is color.gray, color.primary, color.gray
                            outputRange: [COLORS.gray, COLORS.primary, COLORS.gray],
                            // extrapolate is clamp
                            extrapolate: 'clamp'
                        })
                        return (
                            // Animated.View to make the Animated view 
                            <Animated.View
                                // give some props key is dot-index
                                key={`dot-${index}`}
                                // opacity is variable opacity
                                opacity={opacity}
                                style={{
                                    // borderRadius is SIZES.radius
                                    borderRadius: SIZES.radius,
                                    // marginHorizontal = 6
                                    marginHorizontal: 6,
                                    // width is variable dot 
                                    width: dotSize,
                                    // height is variable dot
                                    height: dotSize,
                                    // backgroundColor is variable dotColor
                                    backgroundColor: dotColor
                                }}
                            />
                        )

                    })}
                </View>

            </View>
        )
    }
    
    // renderChart function chart that display chart into our view 
    function renderChart() {
        return (
            // view that hold the chartView 
            <View
                style={{
                    // backgroundColor: white 
                    backgroundColor: COLORS.white,
                    // marginTop: 24 
                    marginTop: SIZES.padding,
                    // marginleft : 24 
                    marginHorizontal: SIZES.radius,
                    // borderRadius: 12 
                    borderRadius: SIZES.radius,
                    // alignItems: 'center', to center it 
                    alignItems: 'center',
                    // styles: shadow
                    ...styles.shadow
             }}
            >
                {/* ******************************************************************************************************************************** */}
                {/* Header  */}
                {/* make a another view for the header section */}
                <View style={{
                    // flexDirection: 'row',
                    flexDirection: 'row',
                    // marginTop: 24
                    marginTop: SIZES.padding,
                    // paddingHorizontal: 24
                    paddingHorizontal: SIZES.padding
                }}>
                    {/* for render the CurrencyLabel component we wrap it into the view and give it flex 1  */}
                    <View style={{ flex: 1 }}>
                        {/* currencylabel Component  and pass this props */}
                        <CurrencyLabel 
                            // icon selectdCurrency exist than take selectedCurrenc.image 
                            icon={selectedCurrency?.image}
                            // icon selectdCurrency exist than take selectedCurrenc.currency 
                            currency={selectedCurrency?.currency}
                            // icon selectdCurrency exist than take selectedCurrenc.code
                            code={selectedCurrency?.code}
                        />
                    </View>
                    {/* make another View to display amount and change  */}
                    <View>
                        {/* Text selectedCurrency is exist then selectedCurrency.amount   */}
                        <Text style={{...FONTS.h3}}>{selectedCurrency?.amount}</Text>
                        {/* Text selectedCurrency is exist then selectedCurrency.change  color if selectedCurrency.type is I then green otherwise red */}
                        <Text style={{...FONTS.body4, color:selectedCurrency?.type == 'I' ? COLORS.green : COLORS.red}}>{selectedCurrency?.changes}</Text>

                    </View>
                </View>
                {/* ******************************************************************************************************************************** */}
                {/* Chart */}

                {/* Animated.ScrollView to make the chart scrollable in a Animated scrolling */}
                <Animated.ScrollView
                    // type is Horizontal wise 
                    horizontal
                    // pagingEnabled = true
                    pagingEnabled
                    // scrollEventThrottle= 16 
                    scrollEventThrottle={16}
                    // snapToAlignment for center it 
                    snapToAlignment='center'
                    // snapToInterval is equal to screen Width - 40 
                    snapToInterval={SIZES.width - 40}
                    // showHorizontalScrollIndicator is false 
                    showsHorizontalScrollIndicator={false}
                    // decelerationRate = 0 
                    decelerationRate={0}
                    // onScroll we set the onScroll for later use on Dots 
                    // Animated event 
                    onScroll={Animated.event([
                    // nativeEvent and set contentOffset of x is set to scrollX variable 
                        { nativeEvent: { contentOffset: { x: scrollX } } }
                        // and useNativeDriver =  false 
                    ], {useNativeDriver: false})
                }
                >
                    {/* for map it 3 times use a map loop which accesing the numberofCharts.map and have item and index */}
                    {numberOfCharts.map((item, index) => (
                        // on a view that hold the animation chart 
                        <View
                            // key is chart-index 
                            key={`chart-${index}`}
                            
                            style={{
                            // marginLeft if index = 0 then 8 otherwise 0
                         marginLeft: index === 0 ? SIZES.base : 0
                        }}
                        >   

                            {/* a basic view that hold the signle chart which have a marginTop -25 */}
                <View style={{
                    marginTop: -25
                            }}>
                                {/* wrap eveything into the VictoryChart to display a chart */}
                                <VictoryChart
                                    // theme is equal to VictoryCustomTheme which we import above
                                    theme={VictoryCustomTheme}
                                    // height is 220
                                    height={220}
                                    // width = SIZES.width - 40 
                                    width={SIZES.width -40}
                                >
                                    {/* for showing the VictoryLine we use VictoryLine  */}
                                    <VictoryLine
                                        style={{
                                // data component get a stroke which color is secondary color
                                data: {
                                    stroke: COLORS.secondary,
                                            },
                                            // for parent component 1px, solid, cgreen 
                                parent: {
                                    border: '1px solid #ccc'
                                }
                                        }}
                                        // data= selectedCurrency.chartData
                                        data={selectedCurrency?.chartData}
                                        // categories give x axis and y axis
                                        categories={{
                                            // on x axis
                                            x: ['15 MIN', '30 MIN', '45 MIN', '60'],
                                            // on y axis
                                            y: ['15', '30', '45']
                                
                            }}
                                    />
                                    {/* use VictoryScatter to show data point into the chart  */}
                                    <VictoryScatter
                                        // data is same a line chart 
                                        data={selectedCurrency?.chartData}
                                        // size of dot is 7
                                        size={7}
                                        // style of data is 
                                        style={{
                                            data: {
                                        // fill type and color is secondary
                                        fill: COLORS.secondary,
                                                
                                }
                            }}
                                    />
                                    
                                    {/* To Display the Grid lines we use VictoryAxis  */}
                                    <VictoryAxis
                                        // style of grid is 
                            style={{
                                            grid: {
                                    //  stroke is transparent to clear all the lines 
                                    stroke: 'transparent',
                                }
                         }}
                                    />
                                    {/* another VictoryAxis component to display grid lines */}
                                    <VictoryAxis
                                        // dependentAxis to show line into the X axis 
                            dependentAxis
                                        style={{
                                // on axis stroke is transparent
                                axis: {
                                 stroke: 'transparent',
                                            },
                                            // on grid stroke is grey
                                grid: {
                                    stroke: 'grey',
                                }
                         }}
                        />
                        </VictoryChart>
                    </View>
                </View>
                ))}
                </Animated.ScrollView>
                {/* ******************************************************************************************************************************** */}
                {/* Options */}

                {/* for showing the options we make a view  */}
                <View style={{
                    // width is 100%
                    width: '100%',
                    // paddingHorizontal= 24 
                    paddingHorizontal: SIZES.padding,
                    // flex-direction is row 
                    flexDirection: 'row',
                    // justifyContent is space between 
                    justifyContent: 'space-between',
                }}
                >
                    {
                        // for making it we use the chartOption.map loop to make the buttons 
                        chartOptons.map((option) =>{
                            return (
                                // Accesing the textButton Component to display the button 
                                <TextButton
                                    // key is option-option.id
                                    key={`option-${option.id}`}
                                    // option object.label
                                    lable={option.label}
                                    // customContainerStyle prop is 
                                    customContainerStyle={{
                                        // height = 30 
                                        height: 30,
                                        // width = 60
                                        width: 60,
                                        // borderRadius is 15 
                                        borderRadius: 15,
                                        // backgroundColor =  if selectedOption.id = option.id then primary otherwise lightgray
                                        backgroundColor: selectedOption.id === option.id ? COLORS.primary : COLORS.lightGray
                                    }}
                                    // customeLable style 
                                    customLableStyle={{
                                        // Color =  if selectedOption.id = option.id then white  otherwise gray and font is body5
                                        color: selectedOption.id === option.id ? COLORS.white : COLORS.grey, ...FONTS.body5
                                    }}
                                    // onPress call the optionOnClickHandler function and pass the option object 
                                    onPress={() => {
                                        optionOnClickHandler(option)
                                    }}
                                />
                          )
                        })
                    }
                 </View>
                {/* ******************************************************************************************************************************** */}
                {/* Dots */}

                {/* renderDots function to display dots  */}
                {renderDots()}
           </View>
       )
    }


    // function that display the renderBuy 
    function renderBuy() {
        return (
            // View tha display the View 
            <View
                style={{
                    // marginTop = 24
                    marginTop: SIZES.padding,
                    // marginHorizontal = 12
                    marginHorizontal: SIZES.radius,
                    // padding = 12
                    padding: SIZES.radius,
                    // borderRadius = 12
                    borderRadius: SIZES.radius,
                    // backgroundColor = white
                    backgroundColor: COLORS.white,
                    // and give it some shahdow
                    ...styles.shadow
                }}
            >
                {/* ******************************************************************************************************************************** */}
                {/* View that display the View  */}
                <View
                    style={{
                        // flexDirection: 'row',
                        flexDirection: 'row',
                        // alignItems: 'center',
                        alignItems: 'center',
                        // marginBottom= 12
                        marginBottom: SIZES.radius
                    }}
                >
                    {/* Currency Section */}
                    <View style={{ flex: 1 }}>
                        {/* currencyLabel  component */}
                        <CurrencyLabel
                            // icon is selectedCurrency exist then get selectedCurrency.image 
                        icon={selectedCurrency?.image}
                            // icon is selectedCurrency exist then get selectedCurrency.currency and add wallet 
                            currency={`${selectedCurrency?.currency} Wallet`}
                            // icon is selectedCurrency exist then get selectedCurrency.code 
                        code={selectedCurrency?.code}
                        />
                    </View>
                        {/* Amount */}
                        <View
                        style={{ 
                                // flexDirection: 'row',
                            flexDirection: 'row',
                            // alignItems: 'center' to center the text
                                alignItems: 'center',
                        }}
                    >
                        {/* View that display the currency with marginRight = 8 */}
                            <View style={{
                                marginRight: SIZES.base
                        }}>
                            {/* text selectedCurrency.wallet.value and FONTS is h3 */}
                                <Text style={{ ...FONTS.h3}}>${selectedCurrency?.wallet.value}</Text>
                            {/* text selectedCurrency.wallet.crypto and selectedCurrency.code  and FONTS is h3 and color is gray and textalign is right  */}
                                <Text style={{ ...FONTS.body4, color: COLORS.gray, textAlign: 'right' }}>${selectedCurrency?.wallet.crypto} {selectedCurrency?.code}</Text>
                        </View>
                        {/* image tag to display the right arrow */}
                        <Image
                            // source is right arrow 
                            source={icons.right_arrow}
                            // resizeMode is cover
                            resizeMode='cover'
                            style={{
                                // width and height is 20
                                width: 20,
                                height: 20,
                                // background color is gray
                                tintColor: COLORS.gray
                            }}
                        />
                        </View>
                </View>
                {/* TextButton component */}
                <TextButton
                    // lable is Buy
                    lable='Buy'
                    // onPress navigate to Transaction screen and pass the currency = selectedCurrency 
                    onPress={() => navigation.navigate('Transaction', {currency: selectedCurrency})}
                />
            </View>
        )
    }

    // function that return the renderAbout 
    function renderAbout() {
        return (
            // View that display the About 
            <View
                style={{
                    // marginTop = 24
                    marginTop: SIZES.padding,
                    // marginHorizontal = 12
                    marginHorizontal: SIZES.base,
                    // padding = 12
                    padding: SIZES.radius,
                    // borderRadius = 12
                    borderRadius: SIZES.radius,
                    // backgroundColor = white
                    backgroundColor: COLORS.white,
                    // and give the shahdow
                    ...styles.shadow
            }}
            >
                {/* if selectedCurrency exist than get the selectedCurrency.currency */}
                <Text style={{...FONTS.h3}}>About {selectedCurrency?.currency}</Text> 
                {/* if selectedCurrency exist than get the selectedCurrency.description */}
                <Text style={{...FONTS.body3, lineHeight: 18, marginTop: SIZES.base}}>{selectedCurrency?.description}</Text> 
            </View>
        )
    }

    return (
        // wrap eveything within the SafeAreaView 
        <SafeAreaView
            style={{
            // give it height and width of screen size 
                flex: 1,
                // backgroundColor is light gray 
                backgroundColor: COLORS.lightGray1
         }}
        >
            {/* Display the HeaderBar Component and give right prop is true to display the Star icon  */}
         <HeaderBar right={true}/>
            {/* wrap the View into the ScrollView to make it scrollable */}
            <ScrollView>
                {/* make a view which take flex:1 , paddingBottom SIZES.padding  */}
                <View style={{ flex: 1, paddingBottom: SIZES.padding }}>
                    {/* ************************************************************************************************************* */}
                    {/* renderChart function that display the chart  */}
                    {renderChart()}
                    {/* ************************************************************************************************************* */}
                    {/* renderBuy function that display the chart  */}  
                    {renderBuy()}
                    {/* ************************************************************************************************************* */}
                    {/* renderAbout function that display the chart  */}  
                    {renderAbout()}
                    {/* ************************************************************************************************************* */}
                    {/* rendersetAlert function that display the chart  */}  
                    <View>
                        {/* use the PriceAlert Component  */}
                        <PriceAlert
                            // customContainerStyle give some custom container
                            customContainerStyle={{
                                // marginTop = 24 
                                marginTop: SIZES.padding,
                                // marginHorizontal = 12
                                marginHorizontal: SIZES.radius
                         }}
                        />
                    </View>                    
                </View>
            </ScrollView>
        </SafeAreaView>
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

export default CryptoDetail;