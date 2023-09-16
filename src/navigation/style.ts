import {StyleSheet} from 'react-native';
import colors from '../theme/Colors';
import {moderateScale, verticalScale, verticalScaleWithNewSize} from '../theme';

export default StyleSheet.create({
  drawerItem: {
    height: verticalScaleWithNewSize(50),
    marginVertical: verticalScale(5),
    backgroundColor: colors.whiteBorderOpacity,
    paddingLeft: moderateScale(10),
  },
  mainContainer: {
    flex: 1,
    paddingTop: verticalScale(50),
  },
  drawerItemText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.black,
  },
});
