export class ProcessStartRequest {
  deployId: string;
  allProcess: boolean;
  immediately: boolean;
  suspended: boolean;
  includeProcessInstances: boolean;
  processId: string;
  processDefinitionKey: string;
  executionDate: any;
  isInstancia: boolean;
  isProcess: boolean;

  constructor(init?: Partial<ProcessStartRequest>) {
    Object.assign(this, init);
  }
}

