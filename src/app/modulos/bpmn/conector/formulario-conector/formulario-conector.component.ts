import { VoltarSalvarComponent } from '@/shared/components/voltar-salvar/voltar-salvar.component';
import { Conector, ConectorBuild } from '@/shared/models/conector.model';
import { FormularioModule } from '@/shared/modules/formulario.module';
import { ConectorService } from '@/shared/services/conector.service';
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { TreeTableModule } from 'primeng/treetable';
import { TabsModule } from 'primeng/tabs';
import { EditorJsonComponent } from '../editor-json/editor-json.component';

@Component({
  selector: 'app-formulario-conector',
  imports: [
    FormularioModule,
    VoltarSalvarComponent,
    TreeTableModule,
    DialogModule,
    TabsModule,
    EditorJsonComponent
  ],
  templateUrl: './formulario-conector.component.html',
  styleUrl: './formulario-conector.component.scss'
})
export class FormularioConectorComponent {

  public data: any;

  @ViewChild('editor', { static: true }) editorRef!: EditorJsonComponent;
  @Output() voltarEmit = new EventEmitter();
  @Output() updateEmit = new EventEmitter();
  @Input() conector?: Conector;
  @Input() isAuth? = false;
  @Input() conectoresAuth: any[] = [];
  protected conectorToken?: Conector;
  protected conectorCopy?: any;
  protected tab = 'payload';
  protected obj = {
    chave: '',
    valor: ''
  }
  protected rowNode?: any;
  protected visible = false;
  protected configuracao!: TreeNode[];
  protected cols: any[] = [
    { field: 'key', header: 'Key' },
    { field: 'value', header: 'Value' },
    { field: '', header: '' }
  ];

  protected metodos: string[] = ['GET', 'PATCH', 'POST', 'PUT', 'DELETE']
  constructor(
    private readonly conectorService: ConectorService,
    private readonly activeRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(param => {

    });

    if (!this.conector)
      this.conector = new Conector;

    this.conectorCopy = JSON.parse(JSON.stringify(this.conector))

    if (!this.conector.build)
      this.conector.build = new ConectorBuild;
    this.prepararTreeNode(this.conector.build);

    if(this.conector.authId)
      this.selecionarConectorToken();

    this.carregarConfiguracao();
  }

  selecionarConectorToken(){
    this.conectorToken = this.conectoresAuth.find(auth => auth.id == this.conector.authId);
  }

  buscarConector() {
    //this.conectorService.buscarConector(this.conector.id).subscribe(response => this.conector = response)
  }

  setBuild(json: any){
    this.conector.build = json;
    this.prepararTreeNode(this.conector.build);
  }

  salvar() {
    this.conector.conectorAuth = this.isAuth;
    this.conectorService.criarConector(this.conector).subscribe(response => {
      this.updateEmit.emit();
    });
  }

  prepararTreeNode(data: any) {
    this.configuracao = this.objectToTreeNodes({
      headers: data.headers,
      payload: data.payload,
      params: data.params,
      pathVariables: data.pathVariables,
    });
  }


  carregarConfiguracao() {
    this.conector.build.headers = this.getNodeByKey('headers', this.configuracao).headers;
    if (!this.conector.build.headers)
      this.conector.build.headers = {};
    this.conector.build.payload = this.getNodeByKey('payload', this.configuracao).payload;
    if (!this.conector.build.payload)
      this.conector.build.payload = {};
    this.conector.build.params = this.getNodeByKey('params', this.configuracao).params;
    if (!this.conector.build.params)
      this.conector.build.params = {};
    this.conector.build.pathVariables = this.getNodeByKey('pathVariables', this.configuracao).pathVariables;
    if (!this.conector.build.pathVariables)
      this.conector.build.pathVariables = {};

    if(this.editorRef)
      this.editorRef.set(this.conector.build as any);
  }

  getValues() {
    return Array.from(this.conector.values.keys());
  }

  novo(rowNode: any) {
    this.rowNode = rowNode;
    this.visible = true;
  }

  adicionar() {
    this.visible = true;
    this.rowNode.node.children = this.rowNode.node.children || [];
    this.rowNode.node.children.push({
      data: { key: this.obj.chave, value: this.obj.valor }
    });
    this.configuracao = [...this.configuracao];
    this.visible = false;
    this.carregarConfiguracao();
  }

  removeSelectedNode(nodeToRemove: any) {
    nodeToRemove.visible = false;
    nodeToRemove.parent.children = nodeToRemove.parent.children.filter(node => node.data.key != nodeToRemove.node.data.key);
    this.carregarConfiguracao();
  }

  private getNodeByKey(key: string, nodes: TreeNode[]): any {
    var map: any = {};
    for (const node of nodes) {

      if (node.data.key === key) {
        map[key] = {}
        return this.treeNodeToNestedMap(node);
      }
    }
  }

  treeNodeToNestedMap(node: TreeNode): Record<string, any> {
    const map: Record<string, any> = {};

    if (node.data && node.data.key) {
      if (node.children && node.children.length > 0) {
        const childrenMap: Record<string, any> = {};
        for (const child of node.children) {
          Object.assign(childrenMap, this.treeNodeToNestedMap(child));
        }
        map[node.data.key] = childrenMap;
      } else {
        map[node.data.key] = node.data.value ?? '';
      }
    }
    return map;
  }

  objectToTreeNodes(obj: any): TreeNode[] {
    if (!obj) return [];
    return Object.keys(obj).map(key => {
      const value = obj[key];
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return {
          data: { key, value: '' },
          children: this.objectToTreeNodes(value)
        } as TreeNode;
      } else {
        return {
          data: { key, value }
        } as TreeNode;
      }
    });
  }

  fechar() {
    this.voltarEmit.emit(this.conectorCopy);
  }

  selectTab(event: any) {
    this.tab = event;
  }
}
