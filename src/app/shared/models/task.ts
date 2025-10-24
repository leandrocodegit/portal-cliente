import { DelateState } from "./constantes/delegate-state";

export class Task {
  id: string;
  processDefinitionId: string;
  camundaFormRef: any;
  processInstanceId: string;
  executionId: string;
  caseDefinitionId: string;
  caseInstanceId: string;
  caseExecutionId: string;
  activityInstanceId: string;
  name: string;
  description: string;
  deleteReason: string;
  delegationState: DelateState;
  owner: string;
  assignee: string;
  startTime: string;
  endTime: string;
  duration: number;
  taskDefinitionKey: string;
  priority: number;
  due: any;
  parentTaskId: string;
  followUp?: string;
  removalTime: string;
  rootProcessInstanceId: string;
  taskState: string;
  statusTarefa: string;
  created: any;
  lastUpdated: any;
  suspended: boolean;
  formKey: string


  constructor(data: Partial<Task> = {}) {
    this.id = data.id ?? null;
    this.processDefinitionId = data.processDefinitionId ?? '';
    this.camundaFormRef = data.camundaFormRef ?? null;
    this.processInstanceId = data.processInstanceId ?? '';
    this.executionId = data.executionId ?? '';
    this.caseDefinitionId = data.caseDefinitionId ?? '';
    this.caseInstanceId = data.caseInstanceId ?? '';
    this.caseExecutionId = data.caseExecutionId ?? '';
    this.activityInstanceId = data.activityInstanceId ?? '';
    this.name = data.name ?? '';
    this.description = data.description ?? '';
    this.deleteReason = data.deleteReason ?? '';
    this.delegationState = data.delegationState ?? undefined;
    this.owner = data.owner ?? '';
    this.assignee = data.assignee ?? null;
    this.startTime = data.startTime ?? '';
    this.endTime = data.endTime ?? '';
    this.duration = data.duration ?? 0;
    this.taskDefinitionKey = data.taskDefinitionKey ?? null;
    this.priority = data.priority ?? 0;
    this.due = data.due ?? null;
    this.parentTaskId = data.parentTaskId ?? null;
    this.followUp = data.followUp ?? null;
    this.removalTime = data.removalTime ?? null;
    this.rootProcessInstanceId = data.rootProcessInstanceId ?? null;
    this.taskState = data.taskState ?? null;
    this.statusTarefa = data.statusTarefa ?? '';
    this.created = data.created ?? null;
    this.lastUpdated = data.lastUpdated ?? null;
    this.suspended = data.suspended ?? false;
    this.formKey = data.formKey ?? null;
  }
}

export class CamundaFormRef {
  binding: string;
  key: string;
  version: string;

  constructor(data: Partial<CamundaFormRef> = {}) {
    this.binding = data.binding ?? '';
    this.key = data.key ?? '';
    this.version = data.version ?? '';
  }
}
