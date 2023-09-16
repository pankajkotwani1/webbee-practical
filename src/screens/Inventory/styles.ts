import {StyleSheet} from 'react-native';
import colors from '../../theme/Colors';
import {
  moderateScaleWithNewSize,
  scaleWithNewSize,
  verticalScale,
  verticalScaleWithNewSize,
  Metrics,
} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  inventoryContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: scaleWithNewSize(16),
  },
  typeItem: {
    marginBottom: verticalScale(16),
  },
  inventoryItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inventoryItemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inventoryItemActions: {
    flexDirection: 'row',
  },
  flexFieldSetting: {
    flexDirection: 'row',
    marginBottom: verticalScale(8),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputGroup: {
    flex: 0.6,
  },
  flexFieldSelect: {
    flex: 0.4,
  },
  addField: {
    marginTop: verticalScale(16),
  },

  removeBtn: {
    borderWidth: 1,
    padding: scaleWithNewSize(5),
    backgroundColor: colors.black,
    borderRadius: 8,
  },
  removeText: {
    color: colors.white,
  },

  addFieldBtn: {
    flex: 1,
    borderWidth: 1,
    marginTop: scaleWithNewSize(15),
    backgroundColor: colors.black,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: Metrics.screenWidth - 50,
    alignSelf: 'center',
    height: verticalScaleWithNewSize(30),
  },

  addItemBtn: {
    borderWidth: 1,
    margin: scaleWithNewSize(15),
    backgroundColor: colors.black,
    borderRadius: 8,
    height: verticalScaleWithNewSize(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  addItemText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '500',
  },
  fieldNameInput: {
    height: verticalScaleWithNewSize(50),
    width: '95%',
    borderWidth: 2,
    borderRadius: 8,
    paddingLeft: moderateScaleWithNewSize(10),
  },
  dropDownStyles: {
    width: moderateScaleWithNewSize(150),
  },
  inputLabel: {
    fontSize: 14,
    paddingVertical: verticalScale(10),
    fontWeight: '600',
  },
  switchStyles: {
    marginRight: moderateScaleWithNewSize(100),
    // backgroundColor: colors.white,
  },
});
