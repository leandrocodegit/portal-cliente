export interface Incident {
  id: string;
  processDefinitionKey: string;
  processDefinitionId: string;
  processInstanceId: string;
  executionId: string;
  rootProcessInstanceId: string;
  createTime: any;
  endTime: any;
  removalTime: string | null;
  incidentType: string;
  activityId: string;
  failedActivityId: string;
  causeIncidentId: string;
  rootCauseIncidentId: string;
  configuration: string;
  historyConfiguration: string;
  incidentMessage: string;
  tenantId: string | null;
  jobDefinitionId: string;
  open: boolean;
  deleted: boolean;
  resolved: boolean;
  annotation: string | null;
}
