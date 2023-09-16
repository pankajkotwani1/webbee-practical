import RNDateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Card} from '@rneui/base';
import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import {
  Button,
  Image,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icons from '../../assets/icons';
import {strings} from '../../constants';
import {RootState} from '../../redux';
import {IInventoryItem} from '../../redux/Category/types';
import {
  addInventoryItem,
  changeInventoryItemFieldValue,
  removeInventoryItem,
} from '../../redux/actions';
import colors from '../../theme/Colors';
import styles from './styles';

const FlexField = ({
  type,
  name,
  value,
  onChange,
}: {
  type: string;
  name: string;
  value: string;
  onChange: (text: string) => void;
}) => {
  switch (type) {
    case 'text':
    case 'number':
      return (
        <>
          <Text style={styles.inputLabel}>{name}</Text>

          <TextInput
            style={styles.fieldNameInput}
            value={value}
            onChangeText={text => onChange(text)}
            placeholder={`Enter ${name}`}
            placeholderTextColor={colors.darkGray}
            keyboardType={type === 'number' ? 'number-pad' : 'default'}
          />
        </>
      );
    case 'checkbox':
      return (
        <>
          <Text style={styles.inputLabel}>{name}</Text>
          <Switch
            style={styles.switchStyles}
            trackColor={{false: colors.lightGray, true: colors.black}}
            thumbColor={
              value == 'yes' ? colors.thumbColor1 : colors.thumbColor2
            }
            ios_backgroundColor={colors.lightGray}
            onValueChange={() => onChange(value == 'yes' ? 'no' : 'yes')}
            value={value == 'yes'}
          />
        </>
      );
    case 'date':
      return (
        <>
          <Text style={styles.inputLabel}>{name}</Text>
          <RNDateTimePicker
            value={new Date(value)}
            is24Hour
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                const formattedDate = moment(selectedDate).format('MM-DD-YYYY');
                onChange(formattedDate);
              }
            }}
            negativeButton={{label: 'Cancel', textColor: 'red'}}
            dateFormat={'day month year'}
          />
        </>
      );

    default:
      return (
        <>
          <Text style={styles.inputLabel}>{name}</Text>
          <TextInput
            style={styles.fieldNameInput}
            value={value}
            onChangeText={text => onChange(text)}
            placeholder={`Enter ${name}`}
            placeholderTextColor={colors.darkGray}
            keyboardType={'default'}
          />
        </>
      );
  }
};

const InventoryItem = ({inventoryItem, inventoryType, itemIndex}) => {
  const renderField = (fieldMeta: {
    id: React.Key | null | undefined;
    name: string & number;
    type: any;
  }) => {
    const dispatch = useDispatch();
    return (
      <FlexField
        key={fieldMeta.id}
        name={fieldMeta.name}
        type={fieldMeta.type}
        value={inventoryItem.data[fieldMeta.name]}
        onChange={(text: string) =>
          dispatch(
            changeInventoryItemFieldValue(itemIndex, fieldMeta.name, text),
          )
        }
      />
    );
  };

  const objectTitle = inventoryItem.data[inventoryType.titleField]
    ? inventoryItem.data[inventoryType.titleField]
    : 'No title';
  const title = `${inventoryType.inventoryType} - ${objectTitle}`;
  const dispatch = useDispatch();
  return (
    <Card>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>{title}</Text>
        <View>
          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => dispatch(removeInventoryItem(itemIndex))}>
            <Image source={Icons.deleteIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View>{inventoryType.fields.map(renderField)}</View>
    </Card>
  );
};

const InventoryAdder = ({inventoryType, addInventoryItem}) => {
  const dispatch = useDispatch();
  return (
    <View>
      {inventoryType ? (
        <TouchableOpacity
          style={styles.addItemBtn}
          onPress={() => dispatch(addInventoryItem(inventoryType))}>
          <Text style={styles.addItemText}>{strings.addItem}</Text>
        </TouchableOpacity>
      ) : (
        <View>
          <Button title={strings.addItem} />
        </View>
      )}
    </View>
  );
};

const Inventory = () => {
  const inventoryTypes = useSelector(
    (state: RootState) => state.Inventory.inventoryTypes,
  );

  const inventoryItems = useSelector(
    (state: RootState) => state.Inventory.inventoryItems,
  );
  const navigation = useNavigation();

  const {params} = useRoute();
  const {inventoryCanvas, title} = params;

  navigation.setOptions({title});

  const renderInventoryItem = (inventoryItem: IInventoryItem, i: number) => {
    const inventoryType = _.find(inventoryTypes, {
      id: inventoryItem.inventoryTypeId,
    });

    return (
      <InventoryItem
        key={inventoryItem.id}
        itemIndex={i}
        inventoryItem={inventoryItem}
        inventoryType={inventoryType}
      />
    );
  };

  return (
    <View>
      {inventoryItems.reduce((items, it, i) => {
        if (
          !inventoryCanvas.inventoryTypeFilter ||
          it.inventoryTypeId === inventoryCanvas.inventoryTypeFilter
        ) {
          items.push(renderInventoryItem(it, i));
        }

        return items;
      }, [])}
      <InventoryAdder
        inventoryType={inventoryCanvas.inventoryTypeFilter}
        addInventoryItem={addInventoryItem}
      />
    </View>
  );
};

export default Inventory;
