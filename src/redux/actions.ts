import {
  ADD_INVENTORY_ITEM,
  REMOVE_INVENTORY_ITEM,
  CHANGE_INVENTORY_ITEM_FIELD_VALUE,
  SET_INVENTORY_TYPE_FILTER,
  ADD_TYPE,
  REMOVE_TYPE,
  ADD_TYPE_FIELD,
  REMOVE_TYPE_FIELD,
  MODIFY_TYPE_FIELD_NAME,
  MODIFY_TYPE_FIELD_TYPE,
  MODIFY_TYPE_TITLE_FIELD,
  MODIFY_TYPE_NAME,
} from './actionsTypes';

const addInventoryItem = (inventoryTypeId: number) => {
  return {type: ADD_INVENTORY_ITEM, inventoryTypeId};
};

const removeInventoryItem = (inventoryIndex: number) => {
  return {type: REMOVE_INVENTORY_ITEM, inventoryIndex};
};

const changeInventoryItemFieldValue = (
  inventoryIndex: number,
  name: string,
  value: any,
) => {
  return {type: CHANGE_INVENTORY_ITEM_FIELD_VALUE, inventoryIndex, name, value};
};

const setInventoryTypeFilter = (inventoryTypeFilter: any) => {
  return {type: SET_INVENTORY_TYPE_FILTER, inventoryTypeFilter};
};

const addType = () => {
  return {type: ADD_TYPE};
};

const removeType = (inventoryIndex: number) => {
  return {type: REMOVE_TYPE, inventoryIndex};
};

const addTypeField = (inventoryIndex: number, fieldType: string) => {
  return {type: ADD_TYPE_FIELD, inventoryIndex, fieldType};
};

const removeTypeField = (inventoryIndex: number, fieldIndex: string) => {
  return {type: REMOVE_TYPE_FIELD, inventoryIndex, fieldIndex};
};

const modifyTypeFieldName = (
  inventoryIndex: number,
  fieldIndex: number,
  name: string,
) => {
  console.log('modifyTypeTitleField', inventoryIndex, fieldIndex, name);

  return {type: MODIFY_TYPE_FIELD_NAME, inventoryIndex, fieldIndex, name};
};

const modifyTypeFieldType = (
  inventoryIndex: number,
  fieldIndex: number,
  fieldType: string,
) => {
  return {type: MODIFY_TYPE_FIELD_TYPE, inventoryIndex, fieldIndex, fieldType};
};

const modifyTypeTitleField = (inventoryIndex: number, titleField: string) => {
  return {type: MODIFY_TYPE_TITLE_FIELD, inventoryIndex, titleField};
};

const modifyTypeName = (inventoryIndex: number, inventoryType: string) => {
  return {type: MODIFY_TYPE_NAME, inventoryIndex, inventoryType};
};

export {
  addInventoryItem,
  removeInventoryItem,
  changeInventoryItemFieldValue,
  setInventoryTypeFilter,
  addType,
  removeType,
  addTypeField,
  removeTypeField,
  modifyTypeFieldName,
  modifyTypeFieldType,
  modifyTypeTitleField,
  modifyTypeName,
};
