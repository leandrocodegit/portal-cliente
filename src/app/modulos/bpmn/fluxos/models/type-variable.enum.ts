export enum TypeVariable {
  String = 'String',
  Integer = 'Integer',
  Short = 'Short',
  Double = 'Double',
  Long = 'Long',
  DateTime = 'DateTime',
  Date = 'Date',
  Boolean = 'Boolean',
  File = 'File',
  download = 'download',
  Object = 'Object'
}

export const TypeVariableDescriptions: Record<TypeVariable, string> = {
  [TypeVariable.String]: 'textfield',
  [TypeVariable.Integer]: 'number',
  [TypeVariable.Short]: 'number',
  [TypeVariable.Double]: 'number',
  [TypeVariable.Long]: 'number',
  [TypeVariable.DateTime]: 'datetime',
  [TypeVariable.Date]: 'datetime',
  [TypeVariable.Boolean]: 'checkbox',
  [TypeVariable.File]: 'filepicker',
  [TypeVariable.download]: 'filepicker',
  [TypeVariable.Object]: 'table'

};

