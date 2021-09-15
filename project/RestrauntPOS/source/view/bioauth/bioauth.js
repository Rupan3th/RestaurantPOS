import React from 'react'


import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'

import ViewPager from '@react-native-community/viewpager';
import BioauthStartView from './bioauth_start';
import BioFaceDetectionView from './face_detect';
import dimen from '../../value/dimen/dimen';
import color from '../../value/color/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BioFaceSubmissionView from './face_submit';
import BioVoiceRecordView from './biovoice_record';
import { getToken } from '../../utils/global'

class BioauthPagerView extends React.Component {

    constructor(props){
        super(props)
        this.currentPage = 0
        
        this.state = {
            captureImage : null
        }
    }

    componentDidMount() {

    }

    render() {
        return <View style={styles.container}>
            <ViewPager 
            style={styles.viewPager} 
            initialPage={0} 
            scrollEnabled = {false}
            onPageScroll = {this._onPageScroll}
            ref={(pager) => this.viewPager = pager}>
                <BioauthStartView 
                key="1" 
                onContinue = {this._gotoNext}
                />
                
                <BioFaceDetectionView 
                key="2"
                onContinue = {this._gotoNext}
                onCapture = {this._onCapture}
                />

                <BioFaceSubmissionView
                key="3"
                captureImage = {this.state.captureImage}
                onContinue = {this._gotoNext}
                />

                <BioVoiceRecordView
                key= "4"
                onContinue = {this._goHome}
                />

            </ViewPager>

            <TouchableOpacity onPress = {this._back}
            style={styles.backbutton}>
                <Ionicons name='close' size={20} color={color.black}/>
            </TouchableOpacity>

            <View style={styles.mark}>
                <Text style= {{fontSize: 16, textAlignVertical: 'center'}}>
                    Powered by
                </Text>
                <Text style={{marginLeft: 8, fontSize: 16, fontWeight : 'bold', textAlignVertical : 'center'}}>
                    Authenticity
                </Text>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: 'green', textAlignVertical : 'center'}}>
                    .ai
                </Text>
            </View>
        </View>
    }

    _back = () => {
        this.props.navigation.goBack()        
        // this.viewPager.setPage(0)        
        // this.props.navigation.navigate('Signin')
    }

    _gotoNext = () => {
        if (this.currentPage < 4) {
            this.viewPager.setPage(this.currentPage + 1)
        }
    }

    _gotoBack = () => {
        if (this.currentPage > 0) {
            this.viewPager.setPage(this.currentPage - 1)
        }
    }

    _goHome = () => {
        if(getToken() == undefined) {
            // this.props.navigation.navigate('Signin')
            this.props.navigation.goBack()
        }
        else{
            this.props.navigation.navigate('Home')
        }                
    }

    _onPageScroll = (e) => {
        this.currentPage = e.nativeEvent.position
    }

    _onCapture = (url) => {
        this.setState({captureImage : url})
    }
}
  
const styles = StyleSheet.create({
    container : {
        width : '100%',
        height: '100%'
    },
    viewPager: {
      flex: 1,
    },

    backbutton : {
        width: dimen.appbar_height,
        height : dimen.appbar_height,
        position: 'absolute',
        top: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },

    mark: {
        flexDirection : 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
    }
});

export default BioauthPagerView