export interface Filtro {
  id: string;
  resourceType: string;
  name: string;
  owner: string;
  query: any;
  properties: {
    color: string;
    description: string;
    showUndefinedVariable: boolean;
    refresh: boolean;
    priority: number;
    sorting: any;
    view: string;
    allCriterios: string;
    dashboard: boolean;
    naoSupervisionadas: boolean
  }
}
