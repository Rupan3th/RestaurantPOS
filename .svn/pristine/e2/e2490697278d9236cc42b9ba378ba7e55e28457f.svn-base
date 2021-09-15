import React from 'react'
import {
    View,
    StyleSheet,
} from 'react-native'

import dimen from '../value/dimen/dimen'
import color from '../value/color/color'
import Ripple from 'react-native-material-ripple'
import integer from '../value/dimen/integer'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'

class AppbarView extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    componentWillMount() {

    }

    render() {
        let {style, title} = this.props
        return (
            <View style={styles.container}>
                <Ripple rippleDuration={integer.ripple_duration} rippleOpacity={0.8} style={[styles.back, style]}>
                    <Ionicons name='md-chevron-back' size={20}/>
                </Ripple>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        width: '100%',
        height: dimen.appbar_height,
        backgroundColor: color.transparent,
    },

    back : {
        width: dimen.appbar_height,
        height: dimen.appbar_height,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default AppbarView