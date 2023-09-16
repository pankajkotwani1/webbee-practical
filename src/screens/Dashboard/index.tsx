import {Card} from '@rneui/base';
import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import Icons from '../../assets/icons';
import {strings} from '../../constants';
import {IField} from '../../redux/Category/types';
import {
  addType,
  addTypeField,
  modifyTypeFieldName,
  modifyTypeFieldType,
  modifyTypeName,
  removeType,
  removeTypeField,
} from '../../redux/actions';
import {RootState} from '../../store';
import colors from '../../theme/Colors';
import {inputTypes} from '../../utils';
import styles from './styles';

const getInputTypeTitle = (field: {type: string}) => {
  const inputType = inputTypes.find(type => type.type === field.type);
  return inputType ? inputType.title : 'Small text';
};

const FlexFieldConfig = ({
  field,
  removeTypeField,
  modifyTypeFieldName,
  modifyTypeFieldType,
}) => {
  const title = getInputTypeTitle(field);

  return (
    <View style={styles.flexFieldSetting}>
      <TextInput
        style={styles.fieldNameInput}
        value={field.name}
        onChangeText={text => modifyTypeFieldName(text)}
        placeholder="Enter field name"
        placeholderTextColor={colors.darkGray}
      />
      <Dropdown
        style={styles.dropDownStyles}
        data={inputTypes}
        maxHeight={300}
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={title}
        onChange={item => {
          modifyTypeFieldType(item.type);
        }}
        labelField={'title'}
        valueField={'title'}
      />
      <TouchableOpacity onPress={removeTypeField}>
        <Image source={Icons.deleteIcon} tintColor={colors.black} />
      </TouchableOpacity>
    </View>
  );
};

const TypeItem = ({inventoryType, removeType, addTypeField, itemIndex}) => {
  const dispatch = useDispatch();
  return (
    <Card containerStyle={styles.typeItem}>
      <View style={styles.inventoryItemHeader}>
        <Text style={styles.inventoryItemTitle}>
          {inventoryType.inventoryType}
        </Text>
        <TouchableOpacity style={styles.removeBtn} onPress={removeType}>
          <Text style={styles.removeText}>{strings.remove}</Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingTop: 15}}>
        <View>
          <Text style={styles.inputLabel}>{strings.categoryType}</Text>
          <TextInput
            style={styles.categoryInput}
            placeholder="name"
            value={inventoryType.inventoryType}
            onChangeText={text => dispatch(modifyTypeName(itemIndex, text))}
          />
        </View>

        <View style={{paddingTop: 15}}>
          <Text style={styles.inputLabel}>{strings.fields}</Text>
          {inventoryType.fields.map((field: IField, index: string & number) => (
            <FlexFieldConfig
              key={field.id}
              field={field}
              removeTypeField={() =>
                dispatch(removeTypeField(itemIndex, index))
              }
              modifyTypeFieldName={(text: string) =>
                dispatch(modifyTypeFieldName(itemIndex, index, text))
              }
              modifyTypeFieldType={(type: string) =>
                dispatch(modifyTypeFieldType(itemIndex, index, type))
              }
            />
          ))}
          <TouchableOpacity
            style={styles.addFieldBtn}
            onPress={() => addTypeField('text')}>
            <Text style={styles.removeText}>{strings.addField}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const inventoryTypes = useSelector(
    (state: RootState) => state.Inventory?.inventoryTypes,
  );

  return (
    <ScrollView style={styles.container}>
      {inventoryTypes.map((inventoryType, index) => (
        <TypeItem
          key={inventoryType.id}
          inventoryType={inventoryType}
          removeType={() => dispatch(removeType(index))}
          addTypeField={(type: string) => dispatch(addTypeField(index, type))}
          itemIndex={index}
        />
      ))}

      <TouchableOpacity
        style={styles.addItemBtn}
        onPress={() => dispatch(addType())}>
        <Text style={styles.addItemText}>{strings.addACategory}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Dashboard;
