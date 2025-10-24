export interface Deployment {
  id: string;
  name: string;
  source: string;
  deploymentTime: string; // pode ser convertido para `Date` se desejar
  tenantId: string | null;
}
