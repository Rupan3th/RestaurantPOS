import React from 'react'

import {
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import dimen from '../../value/dimen/dimen'
import color from '../../value/color/color'

export default class TermsView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <View style= {{width : '100%', height: '100%'}}>
            <TouchableOpacity 
                onPress={this._back}
                style={styles.backbutton}>
                    <Ionicons name='md-chevron-back' size={20} color={color.black}/>
                </TouchableOpacity> 
        </View>
    }

    _back = () => {
        this.props.navigation.goBack()
    }
}

const styles = StyleSheet.create({
    backbutton : {
        width: dimen.appbar_height,
        height : dimen.appbar_height,
        position: 'absolute',
        top: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
})