import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Image,
    ImageBackground,
    TouchableOpacity
} from 'react-native'

import { images } from '../../assets';
import color from '../../value/color/color';
import Utils from '../../utils';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/dist/Feather'
import Carousel, {Pagination } from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient'
import strings from '../../value/strings';
import Ripple from 'react-native-material-ripple';

export default class HomeView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            avatar : undefined,
            avatarLoaded : false,
            data : [],

            cards : [],
            activeSlide : 0,

            scrollPosition : 0,
        }
        this._isMounted = false
    }

    componentDidMount() {
        console.log("Homeview Mounted")
        this._isMounted = true
        this._fetchCardData()
        this._fetchData()
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    _fetchCardData = async () => {
        let testCardData = [
            {type: 'Visa', number: '8842 2394 0293 1293', holder: 'Chris Michaels', expire : '06/22'},
            {type: 'Visa', number: '7842 3827 9728 4393', holder: 'Chris Michaels', expire : '08/02'},
            {type: 'Visa', number: '3542 2297 2367 5393', holder: 'Chris Michaels', expire : '11/01'},
            {type: 'Visa', number: '1728 8293 2399 1293', holder: 'Chris Michaels', expire : '12/31'},
            {type: 'Visa', number: '9728 0293 8293 1728', holder: 'Chris Michaels', expire : '01/09'},
            {type: 'Visa', number: '1293 2394 4382 1293', holder: 'Chris Michaels', expire : '03/18'},
        ]
        this._isMounted && this.setState({cards : testCardData})
    }

    _fetchData = async () => {
        let testData = [
            {name: 'Gym Subscription', expire: 'March 13, 2021', amount : 30.00},
            {name: 'Gym Subscription', expire: 'April 18, 2021', amount : 28.24},
            {name: 'Gym Subscription', expire: 'May 25, 2021', amount : 38.29},
            {name: 'Gym Subscription', expire: 'June 05, 2021', amount : 83.34},
            {name: 'Gym Subscription', expire: 'July 12, 2021', amount : 51.94},
            {name: 'Gym Subscription', expire: 'August 13, 2021', amount : 16.48},
            {name: 'Gym Subscription', expire: 'September 27, 2021', amount : 68.47},
            {name: 'Gym Subscription', expire: 'December 13, 2021', amount : 29.67},
            {name: 'Gym Subscription', expire: 'November 1, 2021', amount : 35.19},
            {name: 'Gym Subscription', expire: 'August 3, 2021', amount : 40.86},
            {name: 'Gym Subscription', expire: 'October 5, 2021', amount : 46.86},
            {name: 'Gym Subscription', expire: 'July 9, 2021', amount : 50.86},
            {name: 'Gym Subscription', expire: 'December 10, 2021', amount : 855.86},
            {name: 'Gym Subscription', expire: 'May 13, 2021', amount : 152.86},
        ]

        this._isMounted && this.setState({data : testData})
    }

    render() {
        return <ImageBackground source={images.login_back} style={styles.container}>
            <View style = {styles.surfaceview}>
            {this._renderHeader()}
            <FlatList 
                key="flatlist"
                data = {this.state.data}
                renderItem = {this._renderFlatListItem}
                keyExtractor={(item, index) => `flatlist_item_${index.toString()}_${item.amount}`}
                ListHeaderComponent = {this.flatlistHeader}
                stickyHeaderIndices = {[0, 1]}
                ItemSeparatorComponent = {this._flatlistItemSeparator}
                style= {styles.flatlist}

                ref = {(flatlist) => this.flatlist = flatlist}
                onScroll = {this._onFlatlistScroll}
                />
                    
            </View>
        </ImageBackground>
    }

    get flatlistHeader() {
        return (
            <View key = "parallax-header" style={{height:250, justifyContent: 'center', alignItems: 'center'}}>
                <Carousel 
                    ref = {(c) => {this.carousel = c}}
                    data = {this.state.cards}
                    sliderWidth={Utils.dimensionsWidth}
                    itemWidth={Utils.dimensionsWidth * 0.75}
                    renderItem = {this._renderCardItem}
                    onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                />
                { this.pagination }
            </View>
        )
    }

    get pagination () {
        const { cards, activeSlide } = this.state;
        return (
            <Pagination
              dotsLength={cards.length}
              activeDotIndex={activeSlide}
              containerStyle={{ width: '50%'}}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  
                  marginHorizontal: 8,
                  backgroundColor: 'rgb(71, 191, 237)'
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
                  borderWidth: 1,
                  borderColor: 'rgb(71, 191, 237)',
                  backgroundColor: color.transparent
              }}
              inactiveDotOpacity={1.0}
              inactiveDotScale={0.8}
            />
        );
    }

    _flatlistItemSeparator = () => {
        return <View key = "seperator" style={{height : 20}}/>
    }

    _renderFlatListItem = ({ item, index, separators }) => {
        if (index == 0) { // sticky header
            let alpha = this.state.scrollPosition / 400
            
            if (alpha > 0.6) alpha = 0.95
            if (alpha < 0.3) alpha = 0.0
            return <View style={[styles.flatlist_stickey_header, {backgroundColor: `rgba(255, 255, 255, ${alpha})`}]} 
            key = {`flatlist_sticky_header_${index}`}> 
                <Text style={{fontSize: 20, fontWeight: 'bold', color: color.black}}>
                    {strings.transactions}
                </Text>
                <MaterialCommunityIcons name="dots-horizontal-circle-outline" size = {25} color={color.flatBlack}/>
            </View>
        } else {
            return <Ripple key = {`flatlist_item_${index}_${item.amount}`} style={styles.flatlist_item_container}
            rippleColor = {color.lightgray} rippleDuration = {600}
            >
                <Image source = {item.image} style={[styles.flatlist_item_image, {backgroundColor: this._generateRandomColorString()}]} />
                <View style={styles.header_user_name}>
                    <Text style={{fontSize: 16, fontWeight: '600', color: color.primaryTextColor}}>
                        {item.name}
                    </Text>
                    <Text style={{fontSize : 14, marginTop: 10, color: color.secondaryTextColor}}>
                        {item.expire}
                    </Text>
                </View>

                <Text style={{fontSize: 20, fontWeight: '400', color: color.flatRed}}>
                    {`-$${item.amount}`}
                </Text>
            </Ripple>
        }
    }

    _generateRandomColorString = () => {
        let r = Math.floor(Math.random() * 255)
        let g = Math.floor(Math.random() * 255)
        let b = Math.floor(Math.random() * 255)
        return `rgb(${r}, ${g}, ${b})`
    }

    _renderHeader() {
        return <View key = "header" style={[styles.header, {}]}>
            <View style={styles.header_user}>
                <View style={styles.header_user_avatar}>
                    {this.state.avatarLoaded?
                        <Image source = {{uri: this.state.avatar}} 
                        style = {[ {resizeMode: 'contain', width: 46, height: 46, borderRadius: 23}]}
                        onLoad = {() => this._avatarLoaded()}
                        />
                        :
                        <Image source = {images.default_avatar} 
                        style = {[ {resizeMode: 'contain', width: 46, height: 46, borderRadius: 23}]}
                        />
                    }
                    
                </View>
                

                <View style={styles.header_user_name}>
                    <Text style={{fontSize: 20, fontWeight: '600', color: color.primaryTextColor}}>
                        Hello, Chris
                    </Text>
                    <Text style={{color: color.secondaryTextColor}}>
                        {Utils.currentTimeWithDMDY()}
                    </Text>
                </View>

                <MaterialCommunityIcons name="bell-circle-outline" size={25} color = {color.flatBlack}/>
            </View>

            <View style={{alignItems: 'flex-end', height: 40, justifyContent: 'center'}}>
                <TouchableOpacity onPress = {this.onPressAdd} style={{height: 40,alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginEnd: 20}}>
                    <Text style={{fontSize: 12}}>
                        ADD NEW
                    </Text>
                    <FontAwesome name="plus" size={20} color={color.flatBlack} style={{marginLeft: 10}}/>
                </TouchableOpacity>
            </View>
        </View>
    }

    _renderCard() {

    }

    _renderCardItem = ({item, index}) => {
        return (
            <Ripple rippleColor={color.lightgray} rippleDuration = {1000} rippleSize = {700}>
            <LinearGradient style={styles.card} key={`card_item_${index}`}
            colors={['rgb(71, 191, 237)', 'rgb(193, 169, 251)', 'rgb(214, 167, 245)', 'rgb(222, 184, 232)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.8, y: 1.2 }}
            locations={[0, 0.65, 0.85, 0.95]}
            >
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={styles.card_type}>
                        { item.type }
                    </Text>
                    <Feather name='more-horizontal' size={20} color={color.whiteText} />
                </View>

                <Text style={styles.card_number}>
                    {item.number}
                </Text>

                <View style={{flexDirection: 'row'}}>
                    <View style={{width: '70%'}}>
                        <Text style={styles.card_holder_title}>
                            Card Holder
                        </Text>
                        <Text style={styles.card_holder_name}>
                            {item.holder}
                        </Text>
                    </View>

                    <View style={{width: '30%'}}>
                        <Text style={styles.card_holder_title}>
                            Expirly
                        </Text>
                        <Text style={styles.card_holder_name}>
                            {item.expire}
                        </Text>
                    </View>
                </View>
            </LinearGradient>
            </Ripple>
        );
    }

    _renderTransactions() {

    }

    _onFlatlistScroll = (event) => {
        this.setState({ scrollPosition: event.nativeEvent.contentOffset.y });
    }

    _avatarLoaded = () => {
        this.setState({avatarLoaded : true})
    }

    onPressAdd = () => {
        console.log("Add New pressed.")
    }


}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    surfaceview : {
        width: '100%',
        height: '100%',
        backgroundColor: color.transparentDD,
        paddingTop: '8%',
    },

    header : {
        width: '100%',
        height: 100,
        paddingHorizontal: 20,
    },

    header_user: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }, 
    header_user_avatar: {
        height: 60,
        width: 60,
        borderRadius : 30,
        borderWidth: 1,
        borderColor: color.flatBlack,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    header_user_name: {
        flex: 1,
        marginLeft: 12,
        marginEnd: 20,
        justifyContent : 'center',
    },

    flatlist : {
        flex: 1,
        marginBottom: 20,
    },

    card_container : {
        height: 200,
        paddingHorizontal: 5,
        shadowColor: 'black', //'rgb(71, 191, 237)',
        shadowOpacity: 1.0,
        shadowOffset: {width: -3, height: 10},
        shadowRadius: 10,
        elevation : 1,
    },

    card : {
        height: 180,
        borderRadius: 20,
        padding: 15,
        justifyContent: 'space-between',
    },

    card_type: {
        fontSize: 25,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: color.whiteText,
    },

    card_number: {
        fontSize: 22,
        fontWeight: '700',
        color: color.whiteText
    },

    card_holder_title: {
        color: color.flatwhite,
        fontSize: 12
    },

    card_holder_name: {
        color: color.whiteText,
        fontSize: 14
    },


    flatlist_stickey_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height : 50,
        paddingHorizontal: 20,
    },

    flatlist_item_container : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: color.flatwhite,
        borderRadius: 10,
        height: 100,
        marginHorizontal: 20,
        paddingHorizontal: 16,
    },

    flatlist_item_image : {
        width: 60,
        height: 60,
        borderRadius: 30,
    }

})