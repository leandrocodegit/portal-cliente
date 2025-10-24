export class HistoricTask {
  id: string;
  processDefinitionId: string;
  processInstanceId: string;
  executionId: string;
  caseDefinitionId: string;
  caseInstanceId: string;
  caseExecutionId: string;
  activityInstanceId: string;
  name: string;
  description: string;
  deleteReason: string;
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
  lastUpdated: any

  constructor(data: Partial<HistoricTask> = {}) {
    this.id = data.id ?? '';
    this.processDefinitionId = data.processDefinitionId ?? '';
    this.processInstanceId = data.processInstanceId ?? '';
    this.executionId = data.executionId ?? '';
    this.caseDefinitionId = data.caseDefinitionId ?? '';
    this.caseInstanceId = data.caseInstanceId ?? '';
    this.caseExecutionId = data.caseExecutionId ?? '';
    this.activityInstanceId = data.activityInstanceId ?? '';
    this.name = data.name ?? '';
    this.description = data.description ?? '';
    this.deleteReason = data.deleteReason ?? '';
    this.owner = data.owner ?? '';
    this.assignee = data.assignee ?? '';
    this.startTime = data.startTime ?? '';
    this.endTime = data.endTime ?? '';
    this.duration = data.duration ?? 0;
    this.taskDefinitionKey = data.taskDefinitionKey ?? '';
    this.priority = data.priority ?? 0;
    this.due = data.due ? new Date(data.due) : new Date();
    this.parentTaskId = data.parentTaskId ?? '';
    this.followUp = data.followUp;
    this.removalTime = data.removalTime ?? '';
    this.rootProcessInstanceId = data.rootProcessInstanceId ?? '';
    this.taskState = data.taskState ?? '';
    this.statusTarefa = data.statusTarefa ?? '';
    this.created = data.created ? new Date(data.created) : new Date();
    this.lastUpdated = data.lastUpdated ? new Date(data.lastUpdated) : new Date();
  }
}
