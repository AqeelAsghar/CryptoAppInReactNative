import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    ScrollView
} from 'react-native';

import { HeaderBar, CurrencyLabel, TextButton, TransactionHistory} from '../component'
import { dummyData, COLORS, SIZES, FONTS} from '../constants';
const Transaction = ({ route }) => {
    // useState Hook to handle the selected Currency 
    const [selectdCurrency, setSelectedCurrency] = useState(null)
    // useEffect Hook to get the currency object from route.params which we get as a parameter
    useEffect(() => { 
        const { currency } = route.params
        // set the selectedCurrency function to the currency object
        setSelectedCurrency(currency)
    }, [])
    
    function renderTrade() {
        return (
            // view that display the function 
            <View
                style={{
                    // marginTop = 24 
                    marginTop: SIZES.padding,
                    // marginHorizontal = 24 
                    marginHorizontal: SIZES.radius,
                    // padding = 12 
                    padding: SIZES.radius,
                    // borderRadius = 12 
                    borderRadius: SIZES.radius,
                    // backgroundColor = COLORS.white 
                    backgroundColor: COLORS.white,
                    // give a shahdow
                    ...styles.shadow
                }}
            >
                {/* CurrrencyLable Component to show currency icon, currency , code */}
                <CurrencyLabel
                    // id selectedCurrency exist then access the selectedCurrency.image 
                    icon={selectdCurrency?.image}
                    // id selectedCurrency exist then access the selectedCurrency.currency 
                    currency={selectdCurrency?.currency}
                    // id selectedCurrency exist then access the selectedCurrency.code 
                    code={selectdCurrency?.code}
                />
                {/* Vire tha show the selected Currency wallet and Crypto and code + the currency value  */}
                <View
                    style={{
                        // flex is 1 
                        flex: 1,
                        // marginTop = 24 
                        marginTop: SIZES.padding,
                        // marginBottom = 24 
                        marginBottom: SIZES.padding,
                        // alignItems & justifyContent center to centerLize the View 
                        alignItems: "center",
                        justifyContent: "center",
                 }}
                >
                    {/* text to display the crypto + code  */}
                    <Text style={{ ...FONTS.h2}}>{selectdCurrency?.wallet.crypto} {selectdCurrency?.code}</Text>
                    {/* text to display the value   */}
                    <Text style={{ ...FONTS.body4, color: COLORS.gray}}>${selectdCurrency?.wallet.value}</Text>
                </View>
                {/* display the TextButton Coponent to display the Buy button */}
                <TextButton
                    // lable is buy 
                    lable='Buy'
                    // onPress show message on console 
                    onPress={()=> console.log('Buy button')}
                />
            </View>
        )
    }

    return (
        // safeAreaView and give is style of flex 1 to cover whole screen 
        <SafeAreaView style={{ flex: 1 }}>
            {/* use the HeaderBar component and give the prop right false to not show the star button */}
            <HeaderBar
                right={false}
            />
            {/* now reming eveything is wrap within the scrollView to make it scrollable  */}
            <ScrollView>
                {/* view to display the and give it flex 1 and paddindBottom is 24  */}
                <View
                    style={{
                        flex: 1,
                        paddingBottom: SIZES.padding
                 }}
                >
                    {/* *********************************************************************************************************************** */}
                    {/* render the Trade function  */}
                    {renderTrade()}
                    {/* *********************************************************************************************************************** */}
                    {/* render the TransactionHistory  */}
                    <View>
                        {/* use the TransactionHistory Component  */}
                        <TransactionHistory
                            // in customContainerStyle give some props 
                            customContainerStyle={{
                                // marginTop is 24 
                                marginTop: SIZES.padding,
                                // marginHorizontal = 12 
                                marginHorizontal: SIZES.radius,
                                // give some shahdow 
                            ...styles.shadow
                            }}
                            // for history give the selectedCurrency exist then access the selectedCurrency.transactionHistory
                            history={selectdCurrency?.transactionHistory}
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

export default Transaction;