export interface RestarProcess {
  processId: string,
  processInstanceIds: string[];
  skipCustomListeners: boolean;
  skipIoMappings: boolean;
  initialVariables: boolean;
  withoutBusinessKey: boolean;
  activityId: '',
  instructions: [
    {
      type: string,
      activityId: string
    }
  ]
}