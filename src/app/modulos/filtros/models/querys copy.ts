export const QUERYES_FILTRO: Map<any, any> = new Map([
  ['assigned', {
    value: true,
    form: {
      id: 'assigned',
      editavel: false,
      nome: 'Atribuidas',
      query: 'assigned',
      type: '',
      isArray: false,
    }
  }],
  ['candidateGroup', {
    value: '',
    form: {
      id: 'candidateGroup',
      editavel: true,
      nome: 'Atribuida a um departamento',
      query: 'candidateGroup',
      type: '',
      isArray: true,
    }
  }],
  ['assignee', {
    value: '',
    form: {
      id: 'assignee',
      editavel: true,
      nome: 'Atribuida a um usuário',
      query: 'assignee',
      value: ''
    }
  }],
  ['assigneeExpression', {
    value: '${ currentUser() }',
    form: {
      id: 'assigneeExpression',
      editavel: false,
      nome: 'Atribuida ao usuário logado',
      query: 'assigneeExpression',
      type: '',
    }
  }],
  ['candidateGroups', {
    value: [],
    form: {
      id: 'candidateGroups',
      editavel: true,
      nome: 'Corresponder a um grupo de departamentos',
      query: 'candidateGroups',
      type: 'Lista de grupos',
      isArray: true,
    }
  }],
  ['assigneeIn', {
    value: [],
    form: {
      id: 'assigneeIn',
      editavel: true,
      nome: 'Corresponder a um grupo de usuários',
      query: 'assigneeIn',
      type: 'Lista de usuários',
      value: ''
    }
  }],
  ['assigneeLike', {
    value: '',
    form: {
      id: 'assigneeLike',
      editavel: true,
      nome: 'Corresponder a um nome de usuário',
      query: 'assigneeLike',
      type: '',
      isArray: true,
      prefix: "%",
      suffix: "%"
    }
  }],
  ['followUpAfterExpression', {
    value: '${ dateTime().minusHours(24) }',
    form: {
      id: 'followUpAfterExpression',
      editavel: false,
      nome: 'Data acompanhamento antecedente a 24hs',
      query: 'followUpAfterExpression',
      type: '',
      isArray: false,
    }
  }],
  ['followUpAfterExpression1', {
    value: '${ dateTime().minusHours(48) }',
    form: {
      id: 'followUpAfterExpression1',
      editavel: false,
      nome: 'Data acompanhamento antecedente a 48hs',
      query: 'followUpAfterExpression',
      type: '',
      isArray: false,
    }
  }],
  ['followUpBeforeExpression1', {
    value: '${ dateTime().minusHours(24) }',
    form: {
      id: 'followUpBeforeExpression1',
      editavel: false,
      nome: 'Data acompanhamento anterior a 24hs',
      query: 'followUpBeforeExpression',
      type: '',
      isArray: false,
    }
  }],
  ['followUpBeforeExpression2', {
    value: '${ dateTime().minusHours(48) }',
    form: {
      id: 'followUpBeforeExpression2',
      editavel: false,
      nome: 'Data acompanhamento anterior a 48hs',
      query: 'followUpBeforeExpression',
      type: '',
      isArray: false,
    }
  }],
  ['followUpBeforeExpression', {
    value: '${ now() }',
    form: {
      id: 'followUpBeforeExpression',
      editavel: false,
      nome: 'Data acompanhamento anterior agora',
      query: 'followUpBeforeExpression',
      type: '',
      isArray: false,
    }
  }],
  ['followUpBeforeOrNotExistentExpression', {
    value: '${ dateTime().minusYears(1) }',
    form: {
      id: 'followUpBeforeOrNotExistentExpression',
      editavel: false,
      nome: 'Data acompanhamento anterior agora ou inexistente',
      query: 'followUpBeforeOrNotExistentExpression',
      type: '',
      isArray: false,
    }
  }],
  ['followUpAfterExpression2', {
    value: '${ now() }',
    form: {
      id: 'followUpAfterExpression2',
      editavel: false,
      nome: 'Data acompanhamento depois de agora',
      query: 'followUpAfterExpression',
      type: '',
      isArray: false,
    }
  }],
  ['taskDefinitionKey', {
    value: [],
    form: {
      id: 'taskDefinitionKey',
      editavel: true,
      nome: 'Identificardor da tarefa',
      query: 'taskDefinitionKey',
      type: '',
      isArray: true,
    }
  }],
  ['unassigned', {
    value: true,
    form: {
      id: 'unassigned',
      editavel: false,
      nome: 'Não atribuidas',
      query: 'unassigned',
      type: '',
      isArray: false,
    }
  }],
  ['processInstanceBusinessKey', {
    value: '',
    form: {
      id: 'processInstanceBusinessKey',
      editavel: true,
      nome: 'Por protocolo',
      query: 'processInstanceBusinessKey',
      type: '',
      isArray: false,
    }
  }],
  ['processInstanceBusinessKeyLike', {
    value: '',
    form: {
      id: 'processInstanceBusinessKeyLike',
      editavel: true,
      nome: 'Prefixo do protocolo',
      query: 'processInstanceBusinessKeyLike',
      type: '',
      isArray: false,
      prefix: "%",
      suffix: "%"
    }
  }],
  ['ownerExpression', {
    value: '${ currentUser() }',
    form: {
      id: 'ownerExpression',
      editavel: false,
      nome: 'Tarefa supervisionada',
      query: 'ownerExpression',
      type: '',
      isArray: false,
    }
  }],
  ['ownerExpressionNot', {
    value: '',
    form: {
      id: 'ownerExpressionNot',
      editavel: false,
      nome: 'Tarefa não supervisionada',
      query: 'ownerExpression',
      type: '',
      isArray: false,
    }
  }],
  ['involvedUserExpression', {
    value: '',
    form: {
      id: 'involvedUserExpression',
      editavel: false,
      nome: 'Usuário logado envolvido',
      query: 'involvedUserExpression',
      type: '',
      isArray: false,
    }
  }],
]);


export const FILTER_SORT = [
  {
    nome: 'Prioridade',
    sorting: { sortBy: "priority", sortOrder: "asc" }
  },
  {
    nome: 'Data criação',
    sorting: { sortBy: "created", sortOrder: "asc" }
  },
  {
    nome: 'Nome',
    sorting: { sortBy: "nameCaseInsensitive", sortOrder: "asc" }
  },
  {
    nome: 'Responsavél',
    sorting: { sortBy: "assignee", sortOrder: "desc" }
  }
];
