export class TaskCreate {
  name: string;
  assignee: string;
  description: string;
  processInstanceId: string;

  constructor(data: Partial<TaskCreate> = {}) {
    this.name = data.name ?? '';
    this.assignee = data.assignee ?? '';
    this.description = data.description ?? '';
    this.processInstanceId = data.processInstanceId ?? '';
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
