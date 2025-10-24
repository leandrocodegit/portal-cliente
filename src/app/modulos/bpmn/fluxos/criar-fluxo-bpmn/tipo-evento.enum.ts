export enum TipoEventoEditor{
  LIST_USER_TASK = 'LIST_USER_TASK',
  LIST_GROUP_TASK = 'LIST_GROUP_TASK',
  LIST_ASSIGNEE_TASK = 'LIST_ASSIGNEE_TASK',
  LIST_USER_PROCESS = 'LIST_USER_PROCESS',
  LIST_GROUP_PROCESS = 'LIST_GROUP_PROCESS',
  DUE_DATE_TASK = 'DUE_DATE_TASK',
  FOLLWO_DATE_TASK  = 'FOLLWO_DATE_TASK'
}

export const keyTipoEventoEditor: Record<TipoEventoEditor, string> = {
  [TipoEventoEditor.LIST_USER_TASK]: 'candidateUsers',
  [TipoEventoEditor.LIST_GROUP_TASK]: 'candidateGroups',
  [TipoEventoEditor.LIST_ASSIGNEE_TASK]: 'assignee',
  [TipoEventoEditor.LIST_USER_PROCESS]: 'candidateStarterUsers',
  [TipoEventoEditor.LIST_GROUP_PROCESS]: 'candidateStarterGroups',
  [TipoEventoEditor.DUE_DATE_TASK]: 'dueDate',
  [TipoEventoEditor.FOLLWO_DATE_TASK]: 'followUpDate',
}
