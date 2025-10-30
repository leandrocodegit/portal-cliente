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

export function extrairAttributesUsuario(data: any): FormData {
    for (const key in data.attributes) {
      const value = data.attributes[key];
      if (value !== null && value !== undefined) {
        data[key] = value[0];
      }
    }
  return data;
}

export function formatarDataUsuario(data: any, userData: any): FormData {
  console.log(data);

    for (const key in userData.attributes) {
      const value = data[key];
      console.log(key, value);

      if (value !== null && value !== undefined) {
        if(data[key])
          userData.attributes[key] = [value]
      }
    }
    for (const key in userData) {
      const value = data[key];
      if (value !== null && value !== undefined) {
         userData[key] = value
      }
    }
  return userData;
}
