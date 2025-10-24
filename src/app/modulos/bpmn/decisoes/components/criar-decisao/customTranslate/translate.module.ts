// translate.module.ts
export default {
  translate: ['value', (template: string, replacements?: Record<string, string>) => {
    const translations: Record<string, string> = {
      "Open decision table": "Abrir tabela de decisão",
      "Definition name": "Nome da definição",
      "Search in diagram": "Buscar no diagrama",
      "Activate hand tool": "Ativar ferramenta de mão",
      "Activate lasso tool": "Ativar ferramenta laço",
      "Create decision": "Criar decisão",
      "Create input data": "Criar dado de entrada",
      "Create knowledge source": "Criar fonte de conhecimento",
      "Create knowledge model": "Criar modelo de conhecimento",
      "Name": "Nome",
      "Description": "Descrição",
      "Append knowledge source": "Anexar fonte de conhecimento",
      "Append decision": "Anexar decisão",
      "Append business knowledge model": "Anexar modelo de conhecimento de negócio",
      "Append input data": "Anexar dado de entrada",
      "Add text annotation": "Adicionar anotação de texto",
      "Connect to other element": "Conectar a outro elemento",
      "Empty": "Vazio",
      "Literal expression": "Expressão literal",
      "Change type": "Alterar tipo",
      "Delete": "Excluir",
      "This maps to the decision definition key.": "Isso corresponde à chave da definição de decisão.",
      "Version tag": "Etiqueta de versão",
      "Question": "Pergunta",
      "Allowed answers": "Respostas permitidas",
      "Time to live": "Tempo de vida",
      "Number of days before this resource is being cleaned up. If specified, takes precedence over the engine configuration.":
        "Número de dias antes que este recurso seja limpo. Se especificado, tem precedência sobre a configuração do mecanismo.",
      "Learn more": "Saiba mais",
      'View DRD': 'Visualizar DRD',
      'Decision name': 'Nome da decisão',
      'Decision name:': 'Nome da decisão:',
      'Decision name: ': 'Nome da decisão:',
      'Hit policy:': 'Política de acerto:',
      'Hit policy': 'Política de acerto',
      'Unique': 'Única',
      'First': 'Primeira',
      'Priority': 'Prioridade',
      'Any': 'Qualquer',
      'Collect': 'Coletar',
      'Collect (Sum)': 'Coletar (Soma)',
      'Collect (Min)': 'Coletar (Mínimo)',
      'Collect (Max)': 'Coletar (Máximo)',
      'Collect (Count)': 'Coletar (Contagem)',
      'Rule order': 'Ordem da regra',
      'Output order': 'Ordem de saída',
      'No overlap is possible and all rules are disjoint. Only a single rule can be matched': 'Nenhuma sobreposição é possível e todas as regras são disjuntas. Apenas uma regra pode ser correspondida',
      'When': 'Quando',
      'Input expression:': 'Expressão de entrada:',
      'string': 'texto',
      'Input type': 'Tipo de entrada',
      'Add input': 'Adicionar entrada',
      'Edit input': 'Editar entrada',
      'Resize': 'Redimensionar',
      'Then': 'Então',
      'Output name:': 'Nome da saída:',
      'Output type': 'Tipo de saída',
      'Add output': 'Adicionar saída',
      'Edit output': 'Editar saída',
      'Annotations': 'Anotações',
      'Add rule': 'Adicionar regra',
      'ID': 'Id',
      'Input': 'Entrada',
      'Output': 'Saída',
      'And': 'E',
      'Open literal expression': 'Abrir expressão literal',
      'Edit': 'Editar',
      'Match one': 'Corresponder a um',
      'Match none': 'Não corresponder a nenhum',
      'Edit string': 'Editar texto',
      'String value': 'Valor de texto',
      'Add values': 'Adicionar valores',
      'Values': 'Valores',
      '"value", "value", ...': '"valor", "valor", ...',
      'Strings must be in double quotes': 'As strings devem estar entre aspas duplas',
      'Set value': 'Alterar valor'
    };

    if (template.includes('Gene')) {

    }


    let text = translations[template] || template;

    if (replacements) {
      Object.keys(replacements).forEach((key) => {
        text = text.replace(`{${key}}`, replacements[key]);
      });
    }

    return text;
  }]
};
