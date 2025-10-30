import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulos PrimeNG
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { generateCodeChallenge, KeycloakService } from '@/shared/services/keycloak.service';
import { ActivatedRoute } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { ptBRTranslationMap } from '@/shared/models/constantes/translate';
import { AuthService } from '@/auth/services/auth.service';

// --- Interfaces para os dados do Keycloak ---
interface UserCredentialMetadata {
  credential: {
    id: string;
    type: string;
    createdDate: number;
    credentialData: string;
  };
}

interface KeycloakAuthenticator {
  type: string;
  category: string;
  displayName: string;
  helptext: string;
  iconCssClass: string;
  createAction?: string; // Ação para adicionar
  updateAction?: string; // Ação para atualizar
  removeable: boolean;
  userCredentialMetadatas: UserCredentialMetadata[];
}

@Component({
  selector: 'app-keycloak-account-settings',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TagModule,
    TooltipModule
  ],
  templateUrl: './keycloak-account-settings.component.html',
  styleUrls: ['./keycloak-account-settings.component.scss']
})
export class KeycloakAccountSettingsComponent implements OnInit, OnChanges {
  // Recebe a lista de autenticadores da API
  @Input() authenticators: KeycloakAuthenticator[] = [];

  // Emite a ação que o usuário deseja realizar
  @Output() onAdd = new EventEmitter<string>();
  @Output() onUpdate = new EventEmitter<string>();
  @Output() onRemove = new EventEmitter<string>();

  // Listas processadas
  protected configuredMethods: KeycloakAuthenticator[] = [];
  protected availableMethods: KeycloakAuthenticator[] = [];

  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly authService: AuthService,
  ) { }



  ngOnInit(): void {
    this.keycloakService.listaCredenciais().subscribe(response => {
      this.configuredMethods = response;
      this.availableMethods = response;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['authenticators']) {
      // this.processAuthenticators();
    }
  }

  private processAuthenticators(): void {
    if (!this.authenticators) {
      this.configuredMethods = [];
      this.availableMethods = [];
      return;
    }

    this.configuredMethods = this.authenticators.filter(
      auth => auth.userCredentialMetadatas && auth.userCredentialMetadatas.length > 0
    );

    this.availableMethods = this.authenticators.filter(
      auth => !auth.userCredentialMetadatas || auth.userCredentialMetadatas.length === 0
    );
  }

  protected getIconForType(type: string): string {
    switch (type) {
      case 'password':
        return 'pi pi-key';
      case 'otp':
        return 'pi pi-mobile';
      case 'webauthn-passwordless':
        return 'pi pi-lock';
      default:
        return 'pi pi-shield';
    }
  }

  protected addMethod(action: string | undefined): void {
    if (action) {
      this.onAdd.emit(action);
    }
  }

  protected updateMethod(action: string | undefined): void {
    if (action) {
      this.onUpdate.emit(action);
    }

    generateCodeChallenge().then(code => {
      window.location.href = this.authService.getUrlUpdatePassword(code)
    })

  }

  protected removeMethod(type: string): void {
    // A ação de remoção é geralmente baseada no tipo
    this.onRemove.emit(type);
  }

  getName(label: string) {
    if (ptBRTranslationMap.has(label))
      return ptBRTranslationMap.get(label);
    return label;
  }
}
