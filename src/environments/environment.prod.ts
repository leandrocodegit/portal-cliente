import { HttpHeaders } from "@angular/common/http";

const protocolo = 'https://';
const host = 'dev.simodapp.com';
const porta = ":2053"
export const environment = {
  url: protocolo + host + porta,
  production: false,
  urlApi: protocolo + host + porta,
  urlWebSocket: 'painel.sincroled.com.br',
  authConfig: {
    issuer: `https://auth.simodapp.com:8443/realms/${window.location.hostname.replace('portal.','')}`,
    redirectUri: window.location.origin + '/auth',
    postLogoutRedirectUri: window.location.origin,
    clientId: `${window.location.hostname}`,
    responseType: 'code',
    scope: `openid profile email`,
    showDebugInformation: true,
    strictDiscoveryDocumentValidation: false,
   // timeoutFactor: 0.75,
   // sessionChecksEnabled: true,
   // silentRefreshTimeout: 5000,
  //  silentRefreshRedirectUri: window.location.origin + '/assets/silent-refresh.html',
  //  useSilentRefresh: true,
    decreaseExpirationBySec: 10000,
    clockSkewInSec: 0,
    requireHttps: true
  },
  headers: {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  },
};

