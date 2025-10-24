export class HistoryProcessInstance {
  id: string;
  businessKey: string | null;
  processDefinitionId: string;
  processDefinitionKey: string;
  processDefinitionName: string;
  processDefinitionVersion: number;
  startTime: string;
  endTime: string | null;
  removalTime: string | null;
  durationInMillis: number | null;
  startUserId: string | null;
  startActivityId: string;
  deleteReason: string | null;
  rootProcessInstanceId: string;
  superProcessInstanceId: string | null;
  superCaseInstanceId: string | null;
  caseInstanceId: string | null;
  tenantId: string | null;
  state: string;
  restartedProcessInstanceId: string;
  dataVencimento: Date | null

  constructor(data: Partial<HistoryProcessInstance> = {}) {
    this.id = data.id ?? '';
    this.businessKey = data.businessKey ?? null;
    this.processDefinitionId = data.processDefinitionId ?? '';
    this.processDefinitionKey = data.processDefinitionKey ?? '';
    this.processDefinitionName = data.processDefinitionName ?? '';
    this.processDefinitionVersion = data.processDefinitionVersion ?? 0;
    this.startTime = data.startTime ?? '';
    this.endTime = data.endTime ?? null;
    this.removalTime = data.removalTime ?? null;
    this.durationInMillis = data.durationInMillis ?? null;
    this.startUserId = data.startUserId ?? null;
    this.startActivityId = data.startActivityId ?? '';
    this.deleteReason = data.deleteReason ?? null;
    this.rootProcessInstanceId = data.rootProcessInstanceId ?? '';
    this.superProcessInstanceId = data.superProcessInstanceId ?? null;
    this.superCaseInstanceId = data.superCaseInstanceId ?? null;
    this.caseInstanceId = data.caseInstanceId ?? null;
    this.tenantId = data.tenantId ?? null;
    this.state = data.state ?? '';
    this.restartedProcessInstanceId = data.restartedProcessInstanceId ?? '';
    this.dataVencimento = data.dataVencimento ?? null;
  }
}
