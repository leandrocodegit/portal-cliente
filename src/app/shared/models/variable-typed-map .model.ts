export interface VariableTypedMap {
  [key: string]: {
    value: any;
    type: string;
    valueInfo: {
      objectTypeName: string;
      serializationDataFormat: string;
    };
  };
}
