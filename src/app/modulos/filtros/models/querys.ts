export const QUERYES_FILTRO: Map<any, any> = new Map([
  ['assigned', {
    value: true,
    form: {
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
      editavel: true,
      nome: 'Atribuida a um grupo',
      query: 'candidateGroup',
      type: '',
      isArray: true,
    }
  }],
  ['assignee', {
    value: '',
    form: {
      editavel: true,
      nome: 'Atribuida a um usuário',
      query: 'assignee',
      opcoes: [
        {
          nome: 'Atribuida ao usuário logado',
          value: '${ currentUser() }'
        }, {
          nome: 'Customizada'
        }
      ]
    }
  }],
  ['assigneeExpression', {
    value: '${ currentUser() }',
    form: {
      editavel: false,
      nome: 'Atribuida ao usuário logado',
      query: 'assigneeExpression',
      type: '',
      opcoes: [
        {
          nome: 'Atribuida ao usuário logado',
          value: '${ currentUser() }'
        }, {
          nome: 'Customizada',
          value: ''
        }
      ]
    }
  }],
  ['candidateGroups', {
    value: [],
    form: {
      editavel: true,
      nome: 'Corresponder a um grupo',
      query: 'candidateGroups',
      type: 'Lista de grupos',
      isArray: true,
       opcoes: [
        {
          nome: 'Grupos do usuário logado',
          value: '${ currentUserGroups() }'
        }, {
          nome: 'Customizada'
        }
      ]
    }
  }],
  ['assigneeIn', {
    value: [],
    form: {
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
      editavel: false,
      nome: 'Data acompanhamento posterior',
      query: 'followUpAfterExpression',
      type: '',
      isArray: false,
      opcoes: [
        {
          nome: 'Data acompanhamento posterior agora',
          value: '${ now() }'
        },
        {
          nome: 'Data acompanhamento posterior de 24hs',
          value: '${ dateTime().minusHours(24) }'
        },
        {
          nome: 'Data acompanhamento posterior de 48hs',
          value: '${ dateTime().minusHours(48) }'
        }, {
          nome: 'Customizada'
        }
      ]
    }
  }],
  ['followUpBeforeExpression', {
    value: '${ now() }',
    form: {
      editavel: false,
      nome: 'Data acompanhamento anterior',
      query: 'followUpBeforeExpression',
      type: '',
      isArray: false,
      opcoes: [
        {
          nome: 'Data acompanhamento anterior agora',
          value: '${ now() }'
        },
        {
          nome: 'Data acompanhamento anterior a 24hs',
          value: '${ dateTime().minusHours(24) }'
        },
        {
          nome: 'Data acompanhamento anterior a 48hs',
          value: '${ dateTime().minusHours(48) }'
        },
        {
          nome: 'Customizada'
        }
      ]
    }
  }],
  ['followUpBeforeOrNotExistentExpression', {
    value: '${ dateTime().minusYears(1) }',
    form: {
      editavel: false,
      nome: 'Data acompanhamento anterior agora ou inexistente',
      query: 'followUpBeforeOrNotExistentExpression',
      type: '',
      isArray: false,
      opcoes: [
        {
          nome: 'Data acompanhamento anterior agora ou inexistente',
          value: '${ dateTime().minusYears(1) }'
        }, {
          nome: 'Customizada'
        }
      ]
    }
  }], ['descriptionLike', {
    value: '',
    form: {
      editavel: true,
      nome: 'Descrição contém',
      query: 'descriptionLike',
      type: '',
      isArray: false,
      prefix: "%",
      suffix: "%"
    }
  }],
  ['taskDefinitionKey', {
    value: [],
    form: {
      editavel: true,
      nome: 'Identificardor da tarefa',
      query: 'taskDefinitionKey',
      type: '',
      isArray: true,
    }
  }],
    ['candidateGroupsExpression', {
    value: '${ currentUserGroups() }',
    form: {
      editavel: false,
      nome: 'Grupos candidatos',
      query: 'candidateGroupsExpression',
      type: '',
      isArray: true,
       opcoes: [
        {
          nome: 'Grupos do usuário logado',
          value: '${ currentUserGroups() }'
        }, {
          nome: 'Customizada'
        }
      ]
    }
  }],
  ['unassigned', {
    value: true,
    form: {
      editavel: false,
      nome: 'Não atribuidas',
      query: 'unassigned',
      type: '',
      isArray: false,
    }
  }],
  ['nameLike', {
    value: '',
    form: {
      editavel: true,
      nome: 'Nome contém',
      query: 'nameLike',
      type: '',
      isArray: false,
      prefix: "%",
      suffix: "%"
    }
  }],
  ['withoutDueDate', {
    value: true,
    form: {
      editavel: false,
      nome: 'Sem data de vencimento',
      query: 'withoutDueDate',
      type: '',
      isArray: false,
    }
  }],
  ['delegationState', {
    value: 'PENDING',
    form: {
      editavel: false,
      nome: 'Status Delegação',
      query: 'delegationState',
      type: '',
      isArray: false,
      opcoes: [
        {
          nome: 'Pendente',
          value: 'PENDING'
        },
        {
          nome: 'Resolvida',
          value: 'RESOLVED'
        }
      ]
    }
  }],
  ['processInstanceBusinessKey', {
    value: '',
    form: {
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
      editavel: true,
      nome: 'Prefixo do protocolo',
      query: 'processInstanceBusinessKeyLike',
      type: '',
      isArray: false,
      prefix: "%",
      suffix: "%"
    }
  }],
  ['maxPriority', {
    value: 50,
    form: {
      editavel: true,
      nome: 'Prioridade máxima',
      query: 'maxPriority',
      type: '',
      isArray: false,
    }
  }],
  ['minPriority', {
    value: 0,
    form: {
      editavel: true,
      nome: 'Prioridade mínima',
      query: 'minPriority',
      type: '',
      isArray: false,
    }
  }],
  ['ownerExpression', {
    value: '${ currentUser() }',
    form: {
      editavel: false,
      nome: 'Tarefa supervisionada',
      query: 'ownerExpression',
      type: '',
      isArray: false,
      opcoes: [
        {
          nome: 'Usuário logado',
          value: '${ currentUser() }'
        },
        {
          nome: 'Customizada',
          value: ''
        }
      ]
    }
  }],
  ['involvedUserExpression', {
    value: '${ currentUser() }',
    form: {
      editavel: false,
      nome: 'Usuário logado envolvido',
      query: 'involvedUserExpression',
      type: '',
      isArray: false,
      opcoes: [
        {
          nome: 'Usuário logado envolvido',
          value: '${ currentUser() }'
        }, {
          nome: 'Customizada',
          value: ''
        }
      ]
    }
  }],
  ['candidateUserExpression', {
    value: '${ currentUser() }',
    form: {
      editavel: false,
      nome: 'Usuário candidato',
      query: 'candidateUserExpression',
      type: '',
      isArray: false,
      opcoes: [
        {
          nome: 'Usuário logado',
          value: '${ currentUser() }'
        }, {
          nome: 'Customizada',
          value: ''
        }
      ]
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
