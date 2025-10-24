import { formatarData } from "./DateUtil";

export function gerarDataForm(data: any): FormData {
  const formData = new FormData();

  if(data.formKey)
    formData.append('formKey', data.formKey);

  for (const key in data.data) {
    const value = data.data[key];

    if (typeof value === 'string' && value.startsWith("files::")) {
      const file = data.files.get(value);
      if (file) {
        formData.append(key, file[0]);
      }
    } else if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  }
  return formData;
}

export function gerarVariaveisForm(task: any, data: any): FormData {
    var variaveis: any = {};
    for (const key in data.data) {
      const value = data.data[key];

      if (typeof value === 'string' && value.startsWith("files::")) {
        const file = data.files.get(value);
        if (file) {
          variaveis[key] = {
            type: 'File',
            value: `forms/${task.processInstanceId}/${file[0].name}`,
            valueInfo: {
              filename: file[0].name,
              mimeType: file[0].type
            }
          };
        }
      }
      else if (value !== null && value !== undefined) {
        var dataValue = value;
        if (data.tipagem.get(key) == 'Date')
          dataValue = formatarData(new Date(value));
        variaveis[key] = {
          type: data.tipagem.get(key),
          value: dataValue
        };
      }
    }
  return variaveis;
}
