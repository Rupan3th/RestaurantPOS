
import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Utils from '../utils';
import SimpleWaveform from './SimpleWaveform';

class AudioRecordView extends React.PureComponent {
    state = {
        samples: this.props.samples,
        chartBackgroundColor : this.props.chartBackgroundColor,
        separatorColor : this.props.separatorColor,
    }

    componentDidMount() {
        
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({samples : nextProps.samples, chartBackgroundColor: nextProps.chartBackgroundColor, separatorColor: nextProps.separatorColor})
    }

    render() {
        const {
          height,
          width,
          style
        } = this.props;
        return (
          <View style={[{ width : '100%', height: height, }, style]}>
            <SimpleWaveform
              samples={this.state.samples}
              height={(height - 3) / 2}
              width={width}
              inverse
              chartBackgroundColor = {this.state.chartBackgroundColor}
            />
            <View
            style = {{
                width: '100%',
                height: 3,
                backgroundColor: this.state.separatorColor
            }}
            />
            <SimpleWaveform
              samples={this.state.samples}
              height={(height - 3) / 2}
              width={width}
              inverse={false}
              chartBackgroundColor = {this.state.chartBackgroundColor}
            />
          </View>
        );
    }
}

AudioRecordView.defaultProps = {
    height: 50,
    width: Utils.dimensionsWidth,
};
  
AudioRecordView.propTypes = {

    height: PropTypes.number,
    width: PropTypes.number,
};
  
export default AudioRecordView;