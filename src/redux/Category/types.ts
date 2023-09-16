//TYPES

import {JSX} from 'react';

export interface IField {
  name: string & Date;
  type: 'text' | 'number' | 'date' | 'textarea';
  id: string;
}

export interface IInventoryType {
  inventoryType: string;
  titleField: string;
  id: string;
  fields: IField[];
}

export interface IInventoryItem {
  push(arg0: JSX.Element): unknown;
  inventoryTypeId: string;
  data: Record<string, any>;
  id: string;
}

export interface IState {
  inventoryTypes: IInventoryType[];
  inventoryItems: IInventoryItem[];
  inventoryCanvas: {
    inventoryTypeFilter: string | null;
  };
}
