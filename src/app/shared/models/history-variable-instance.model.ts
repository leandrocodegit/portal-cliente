export interface HistoryVariableInstance {
  id: string;
  name: string;
  type: string;
  value: any;
  valueInfo: Record<string, any>;
  processDefinitionKey: string;
  processDefinitionId: string;
  processInstanceId: string;
  executionId: string;
  activityInstanceId: string;
  caseDefinitionKey: string | null;
  caseDefinitionId: string | null;
  caseInstanceId: string | null;
  caseExecutionId: string | null;
  taskId: string | null;
  tenantId: string | null;
  errorMessage: string | null;
  state: string;
  createTime: string;
  removalTime: string;
  rootProcessInstanceId: string;
}
