// import React from 'react';
// import PropTypes from 'prop-types';
// import { View, TouchableOpacity } from 'react-native';

// import { scaleLinear } from 'd3-scale';
// import { mean } from 'd3-array';
// import _ from 'lodash';

// import { getColor } from '../utils';

// function Waveform(
//   {
//     waveform,
//     height,
//     width,
//     setTime,
//     percentPlayed,
//     percentPlayable,
//     inverse,
//     active,
//     activeInverse,
//     activePlayable,
//     activePlayableInverse,
//     inactive,
//     inactiveInverse,
//   },
// ) {
//   const scaleLinearHeight = scaleLinear().domain([0, waveform.height]).range([0, height]);
//   const chunks = _.chunk(waveform.samples, waveform.width / ((width - 60) / 3));
//   return (
//     <View style={[{
//       height,
//       width,
//       justifyContent: 'center',
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
//       {chunks.map((chunk, i) => (
//         <TouchableOpacity
//           key={i}
//           onPress={() => {
//             setTime(i);
//           }}
//         >
//           <View style={{
//             backgroundColor: getColor(
//               chunks,
//               i,
//               percentPlayed,
//               percentPlayable,
//               inverse,
//               active,
//               activeInverse,
//               activePlayable,
//               activePlayableInverse,
//               inactive,
//               inactiveInverse,
//             ),
//             width: 2,
//             marginRight: 1,
//             height: scaleLinearHeight(mean(chunk)),
//           }}
//           />
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// }

// Waveform.propTypes = {
//   waveform: PropTypes.object.isRequired,
//   height: PropTypes.number.isRequired,
//   width: PropTypes.number.isRequired,
//   setTime: PropTypes.func.isRequired,
//   percentPlayed: PropTypes.number.isRequired,
//   percentPlayable: PropTypes.number.isRequired,
//   inverse: PropTypes.bool.isRequired,
//   active: PropTypes.string.isRequired,
//   activeInverse: PropTypes.string.isRequired,
//   activePlayable: PropTypes.string.isRequired,
//   activePlayableInverse: PropTypes.string.isRequired,
//   inactive: PropTypes.string.isRequired,
//   inactiveInverse: PropTypes.string.isRequired,
// };

// export default Waveform;