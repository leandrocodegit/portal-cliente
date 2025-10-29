export enum TypeForm {
  textfield = 'textfield',
  number = 'number',
  radio = 'radio',
  checkbox = 'checkbox',
  checklist = 'checklist',
  taglist = 'taglist',
  filepicker = 'filepicker',
  select = 'select',
  date = 'date',
  datetime = 'datetime'
}

export const TypeFormDescriptions: Record<TypeForm, string> = {
  [TypeForm.textfield]: 'String',
  [TypeForm.number]: 'Integer',
  [TypeForm.radio]: 'String',
  [TypeForm.checkbox]: 'String',
  [TypeForm.checklist]: 'String',
  [TypeForm.taglist]: 'String',
  [TypeForm.filepicker]: 'File',
  [TypeForm.select]: 'String',
  [TypeForm.date]: 'Date',
  [TypeForm.datetime]: 'Date'









};

