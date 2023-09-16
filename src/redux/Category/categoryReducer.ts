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
} from '../actionsTypes';

import _ from 'lodash';
import {IField, IInventoryType, IState} from './types';

const rndId = (len = 30) => {
  var p = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return [...Array(len)].reduce(a => a + p[~~(Math.random() * p.length)], '');
};

const initialInventoryTypes: IInventoryType[] = [];

export const initialState = {
  inventoryTypes: initialInventoryTypes,

  inventoryItems: [],

  inventoryCanvas: {
    inventoryTypeFilter: null,
  },
};

const categoryReducer = (state: IState = initialState, action: any): IState => {
  const modifyInventoryTypeAtIndex = (
    inventoryIndex: number,
    foo: (inventoryType: IInventoryType) => IInventoryType,
  ) => {
    const inventoryType = foo(state.inventoryTypes[action.inventoryIndex]);
    const inventoryTypes = [...state.inventoryTypes];
    inventoryTypes[action.inventoryIndex] = inventoryType;
    return {...state, inventoryTypes};
  };

  const modifyInventoryTypeField = (
    inventoryIndex: number,
    fieldIndex: number,
    foo: (field: IField) => IField,
  ) => {
    return modifyInventoryTypeAtIndex(inventoryIndex, inventoryType => {
      const fields = [...inventoryType.fields];
      fields[fieldIndex] = foo(fields[fieldIndex]);

      return {
        ...inventoryType,
        fields,
      };
    });
  };

  switch (action.type) {
    case ADD_TYPE:
      state = {
        ...state,
        inventoryTypes: [
          ...state.inventoryTypes,
          {
            inventoryType: '',
            titleField: 'Title',
            id: rndId(),
            fields: [{name: 'Title', type: 'text', id: rndId()}],
          },
        ],
      };
      break;

    case REMOVE_TYPE:
      const inventoryTypeId = state.inventoryTypes[action.inventoryIndex].id;

      state = {
        ...state,
        inventoryTypes: state.inventoryTypes.filter(
          (v, i) => i !== action.inventoryIndex,
        ),
        inventoryItems: state.inventoryItems.filter(
          v => v.inventoryTypeId !== inventoryTypeId,
        ),
      };
      break;

    case ADD_TYPE_FIELD:
      state = modifyInventoryTypeAtIndex(
        action.inventoryIndex,
        inventoryType => {
          return {
            ...inventoryType,
            fields: [
              ...inventoryType.fields,
              {type: action.fieldType, name: '', id: rndId()},
            ],
          };
        },
      );
      break;
    case REMOVE_TYPE_FIELD:
      console.log('action,', action);
      state = modifyInventoryTypeAtIndex(
        action.inventoryIndex,
        inventoryType => {
          return {
            ...inventoryType,
            fields: inventoryType.fields.filter(
              (_, i) => i !== action.fieldIndex,
            ),
          };
        },
      );
      break;
    case MODIFY_TYPE_NAME:
      state = modifyInventoryTypeAtIndex(
        action.inventoryIndex,
        inventoryType => {
          return {
            ...inventoryType,
            inventoryType: action.inventoryType,
          };
        },
      );
      break;
    case MODIFY_TYPE_TITLE_FIELD:
      state = modifyInventoryTypeAtIndex(
        action.inventoryIndex,
        inventoryType => {
          return {
            ...inventoryType,
            titleField: action.titleField,
          };
        },
      );
      break;
    case MODIFY_TYPE_FIELD_NAME:
      state = modifyInventoryTypeField(
        action.inventoryIndex,
        action.fieldIndex,
        field => {
          return {
            ...field,
            name: action.name,
          };
        },
      );
      break;
    case MODIFY_TYPE_FIELD_TYPE:
      state = modifyInventoryTypeField(
        action.inventoryIndex,
        action.fieldIndex,
        field => {
          return {
            ...field,
            type: action.fieldType,
          };
        },
      );
      break;

    case ADD_INVENTORY_ITEM:
      state = {
        ...state,
        inventoryItems: [
          ...state.inventoryItems,
          {
            inventoryTypeId: action.inventoryTypeId,
            id: rndId(),
            data: {},
          },
        ],
      };
      break;
    case REMOVE_INVENTORY_ITEM:
      console.log('actions', action);
      state = {
        ...state,
        inventoryItems: state.inventoryItems.filter(
          (v, i) => i !== action.inventoryIndex,
        ),
      };
      break;

    case CHANGE_INVENTORY_ITEM_FIELD_VALUE:
      let inventoryField = {...state.inventoryItems[action.inventoryIndex]};
      let inventoryFieldData = {
        ...inventoryField.data,
        [action.name]: action.value,
      };
      inventoryField.data = inventoryFieldData;
      const inventoryItems = [...state.inventoryItems];
      inventoryItems[action.inventoryIndex] = inventoryField;

      state = {...state, inventoryItems};
      break;

    case SET_INVENTORY_TYPE_FILTER:
      state = {
        ...state,
        inventoryCanvas: {
          ...state.inventoryCanvas,
          inventoryTypeFilter: action.inventoryTypeFilter,
        },
      };
      break;
  }

  return state;
};

export default categoryReducer;
