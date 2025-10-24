export interface Job {
  id: string;
  jobDefinitionId: string;
  dueDate: Date;
  processInstanceId: string;
  processDefinitionId: string;
  processDefinitionKey: string;
  executionId: string;
  retries: number;
  exceptionMessage: string;
  failedActivityId: string;
  suspended: boolean;
  priority: number;
  createTime: Date;
  batchId: string;
}
