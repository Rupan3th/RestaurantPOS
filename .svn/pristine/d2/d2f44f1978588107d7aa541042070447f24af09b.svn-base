import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';

//import { scaleLinear } from 'd3-scale';
//import { mean } from 'd3-array';
//import _ from 'lodash';

const charWidth = 2.8


class SimpleWaveform extends React.Component {
    constructor(props){
      super(props)
    }

    render() {
      let {samples, chartBackgroundColor, inverse, width, height} = this.props
      return(
        <View style={[
          {flexDirection: 'row', width: width, height: height}, 
          this.props.style, 
          inverse && {
            transform: [
              { rotateX: '180deg' },
              { rotateY: '0deg' },
            ],}
          ]}>
            {samples.map((sample, i) => (
              <View style={{
                width: charWidth,
                marginRight: 1,
                borderRadius: 1,
                height: height * sample,
                backgroundColor: chartBackgroundColor
                }}
                key={i}
                >
                {/* {this._renderBar(height * sample)} */}
              </View>

            ))} 
        </View>
      )
    }

    _renderBar(height) {
      let discrets = Math.round(height / (charWidth + 0.4))
      var foo = Array.from(Array(discrets).keys())
      return <View style={{width: '100%', height: '100%', justifyContent: 'flex-end'}}> 
        {foo.map((f, i) => (
          <View style={{width: charWidth, height: charWidth, marginBottom: 0.4, backgroundColor: 'black'}} key={`height${i}`}/>
        ))}
      </View>
    }
}

// function SimpleWaveform(
//   {
//     samples,
//     height,
//     width,
//     inverse,
//     backgroundColor,
//   },
// ) {
//   //const scaleLinearHeight = scaleLinear().domain([0, waveform.height]).range([0, height]);
//   //const chunks = _.chunk(waveform.samples, waveform.width / ((width - 60) / 3));
//   return (
//     <View style={[{
//       height,
//       width,
//       alignItems: 'center',
//       flexDirection: 'row',
//     },
//     inverse && {
//       transform: [
//         { rotateX: '180deg' },
//         { rotateY: '0deg' },
//       ],
//     },
//     ]}
//     >
//       {samples.map((sample, i) => (
//           <View style={{
//             backgroundColor: backgroundColor,
//             width: 2,
//             marginRight: 1,
//             height: height * sample / 256,
//             }}
//           />
//       ))}
//     </View>
//   );
// }

// SimpleWaveform.propTypes = {
//     samples: PropTypes.array.isRequired,
//     inverse: PropTypes.bool.isRequired,
//     backgroundColor: PropTypes.string.isRequired
// };

export default SimpleWaveform;