import { assign } from 'min-dash';

/**
 * A palette provider for BPMN 2.0 elements.
 */
export default function PaletteProvider(
  palette, create, elementFactory,
  spaceTool, lassoTool, handTool,
  globalConnect, translate
) {
  this._palette = palette;
  this._create = create;
  this._elementFactory = elementFactory;
  this._spaceTool = spaceTool;
  this._lassoTool = lassoTool;
  this._handTool = handTool;
  this._globalConnect = globalConnect;
  this._translate = translate;

  palette.registerProvider(this);
}

PaletteProvider.$inject = [
  'palette',
  'create',
  'elementFactory',
  'spaceTool',
  'lassoTool',
  'handTool',
  'globalConnect',
  'translate',
];

PaletteProvider.prototype.getPaletteEntries = function() {
  const actions = {},
    create = this._create,
    elementFactory = this._elementFactory,
    spaceTool = this._spaceTool,
    lassoTool = this._lassoTool,
    handTool = this._handTool,
    globalConnect = this._globalConnect,
    translate = this._translate;

  function createAction(type, group, className, title, options) {
    function createListener(event) {
      const shape = elementFactory.createShape(assign({ type: type }, options || {}));

      if (options && typeof options.isExpanded !== 'undefined') {
        shape.businessObject.di.isExpanded = options.isExpanded;
      }

      create.start(event, shape);
    }

    const shortType = type.replace(/^bpmn:/, '');

    return {
      group: group,
      className: className,
      title: title || translate('Criar {type}', { type: shortType }),
      action: {
        dragstart: createListener,
        click: createListener,
      },
    };
  }

  function createParticipant(event) {
    create.start(event, elementFactory.createParticipantShape());
  }

  assign(actions, {
    // Ferramentas
    'hand-tool': {
      group: 'tools',
      className: 'bpmn-icon-hand-tool',
      title: translate('Arrastar diagrama'),
      action: {
        click: (event) => handTool.activateHand(event),
      },
    },
    'lasso-tool': {
      group: 'tools',
      className: 'bpmn-icon-lasso-tool',
      title: translate('Selecionar elementos'),
      action: {
        click: (event) => lassoTool.activateSelection(event),
      },
    },
    'space-tool': {
      group: 'tools',
      className: 'bpmn-icon-space-tool',
      title: translate('Criar/remover espaço'),
      action: {
        click: (event) => spaceTool.activateSelection(event),
      },
    },
    'global-connect-tool': {
      group: 'tools',
      className: 'bpmn-icon-connection-multi',
      title: translate('Conector'),
      action: {
        click: (event) => globalConnect.toggle(event),
      },
    },
    'tool-separator': { group: 'tools', separator: true },

    // Eventos
    'create.start-event': createAction(
      'bpmn:StartEvent', 'event', 'bpmn-icon-start-event-none',
      translate('Evento de início')
    ),
    'create.intermediate-event': createAction(
      'bpmn:IntermediateThrowEvent', 'event', 'bpmn-icon-intermediate-event-none',
      translate('Evento intermediário')
    ),
    'create.end-event': createAction(
      'bpmn:EndEvent', 'event', 'bpmn-icon-end-event-none',
      translate('Evento de fim')
    ),

    // Gateways
    'create.exclusive-gateway': createAction(
      'bpmn:ExclusiveGateway', 'gateway', 'bpmn-icon-gateway-xor',
      translate('Gateway exclusivo')
    ),
    'create.parallel-gateway': createAction(
      'bpmn:ParallelGateway', 'gateway', 'bpmn-icon-gateway-parallel',
      translate('Gateway paralelo')
    ),
    'create.inclusive-gateway': createAction(
      'bpmn:InclusiveGateway', 'gateway', 'bpmn-icon-gateway-or',
      translate('Gateway inclusivo')
    ),

    // Tarefas
    'create.user-task': createAction(
      'bpmn:UserTask', 'activity', 'bpmn-icon-user-task',
      translate('Tarefa de usuário')
    ),
    'create.service-task': createAction(
      'bpmn:ServiceTask', 'activity', 'bpmn-icon-service-task',
      translate('Tarefa de serviço')
    ),
    'create.script-task': createAction(
      'bpmn:ScriptTask', 'activity', 'bpmn-icon-script-task',
      translate('Tarefa de script')
    ),
    'create.manual-task': createAction(
      'bpmn:ManualTask', 'activity', 'bpmn-icon-manual-task',
      translate('Tarefa manual')
    ),
    'create.receive-task': createAction(
      'bpmn:ReceiveTask', 'activity', 'bpmn-icon-receive-task',
      translate('Tarefa de recebimento')
    ),
    'create.send-task': createAction(
      'bpmn:SendTask', 'activity', 'bpmn-icon-send-task',
      translate('Tarefa de envio')
    ),
    'create.business-rule-task': createAction(
      'bpmn:BusinessRuleTask', 'activity', 'bpmn-icon-business-rule-task',
      translate('Tarefa de regra de negócio')
    ),
    'create.call-activity': createAction(
      'bpmn:CallActivity', 'activity', 'bpmn-icon-call-activity',
      translate('Chamar outro processo')
    ),
    'create.subprocess-expanded': createAction(
      'bpmn:SubProcess', 'activity', 'bpmn-icon-subprocess-expanded',
      translate('Subprocesso (expandido)'), { isExpanded: true }
    ),

    // Swimlanes
    'create.participant': {
      group: 'collaboration',
      className: 'bpmn-icon-participant',
      title: translate('Adicionar participante (pool)'),
      action: {
        dragstart: createParticipant,
        click: createParticipant,
      },
    },
    'create.group': createAction(
      'bpmn:Group', 'collaboration', 'bpmn-icon-group',
      translate('Adicionar grupo')
    ),
  });

  return actions;
};
