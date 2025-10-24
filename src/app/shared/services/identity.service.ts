import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { GrupoService } from './grupo.service';
import { TipoGrupo } from '../models/tipo-grupo.enum';
import { isUUID } from 'validator';

@Injectable({
  providedIn: 'root'
},
)
export class IdentityService {

  private users = new Map<string, string>();
  private protocolo = new Map<string, string>();
  private grupos = new Map<string, string>();
  private DEFAULT: string = '- - -';
  private TEXT_LOAD: string = 'Carregando...';

  constructor(
    private readonly http: HttpClient,
    private readonly usuarioService: UsuarioService,
    private readonly grupoService: GrupoService,
  ) { }

  public getUserName(id?: any) {
    if (id == null || !id || id == '' || this.users.get(id) == this.DEFAULT)
      return this.DEFAULT;
     if(!isUUID(id))
      return id ?? this.DEFAULT;
    if (!this.users.get(id)) {
      this.users.set(id, this.TEXT_LOAD)
      this.usuarioService.buscarUsuario(id).subscribe(user => {
        this.users.set(id, (user?.firstName ?? user?.email) ?? this.DEFAULT)
      }, error => {
        if(!this.users.has(id))
        this.users.set(id, this.DEFAULT)
      })
      return this.TEXT_LOAD;
    }
    return this.users.get(id)
  }

  public hasProtocolo(instanceId?: any) {
    return this.protocolo.get(instanceId) != this.DEFAULT && this.protocolo.get(instanceId) != this.TEXT_LOAD;
  }

  public getProtocolo(descritption: string) {
    if (!descritption?.includes(';'))
      return descritption;
    return descritption?.split(';')[0];
  }

  public getDescricao(descritption: string) {
    if (!descritption?.includes(';'))
      return descritption;
    return descritption?.split(';')[1];
  }

  public getGroupName(nomeGrupo?: any) {
    if (!nomeGrupo || this.grupos.get(nomeGrupo) == this.TEXT_LOAD || this.grupos.get(nomeGrupo) == this.DEFAULT)
      return this.DEFAULT;
    if (nomeGrupo && !this.grupos.get(nomeGrupo)) {
      this.grupos.set(nomeGrupo, this.TEXT_LOAD)
      this.grupoService.listaGrupos(TipoGrupo.DEPARTMENT).subscribe(grupos => {
        var grupo = grupos.find(gp => gp.name == nomeGrupo)
        this.grupos.set(nomeGrupo, grupo?.description ?? this.DEFAULT);
      }, error => {
        this.users.set(nomeGrupo, this.DEFAULT)
      })
      return this.TEXT_LOAD;
    }
    return this.grupos.get(nomeGrupo)
  }

}
