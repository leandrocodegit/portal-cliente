import { authConfig } from "@/app.module";
import { HttpHeaders } from "@angular/common/http";

const protocolo = 'https://';
const host = 'api.simodapp.com';
const porta = ":2053"
export const environment = {
  url: protocolo + host + porta,
  debug: protocolo + host + ':4200/debug/',
  production: false,
  urlApi: protocolo + host + porta,
  urlbroker: protocolo + host + porta +   '/comando',
  authConfig: {
    issuer: `https://auth.simodapp.com:8443/realms/simod`,
    redirectUri: window.location.origin + '/auth',
    postLogoutRedirectUri: window.location.origin,
    clientId: 'portal.simod',
    responseType: 'code',
    scope: `openid profile email`,
    showDebugInformation: false,
    strictDiscoveryDocumentValidation: false,
   // timeoutFactor: 0.20,
   // sessionChecksEnabled: false,
    //silentRefreshRedirectUri: window.location.origin + '/assets/silent-refresh.html',
  //  useSilentRefresh: false,
    decreaseExpirationBySec: 10000,
    clockSkewInSec: 0,
    requireHttps: false
  },
  headers: {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  },
};
