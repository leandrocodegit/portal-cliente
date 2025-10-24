export function getCurrentBeforeDate(): string {
  const date = new Date();

  const pad = (n: number, length = 2) => n.toString().padStart(length, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());

  const hours = 23;
  const minutes = 59;
  const seconds = 59;
  const millis = 0;

  const offset = -date.getTimezoneOffset(); // em minutos
  const sign = offset >= 0 ? '+' : '-';
  const offsetHours = pad(Math.floor(Math.abs(offset) / 60));
  const offsetMinutes = pad(Math.abs(offset) % 60);

  const formatted = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${millis}${sign}${offsetHours}${offsetMinutes}`;
  return formatted;
}

export function getCurrentAfterDate(): string {
  const date = new Date();

  const pad = (n: number, length = 2) => n.toString().padStart(length, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());

  const hours = 0;
  const minutes = 0;
  const seconds = 0;
  const millis = 0;

  const offset = -date.getTimezoneOffset(); // em minutos
  const sign = offset >= 0 ? '+' : '-';
  const offsetHours = pad(Math.floor(Math.abs(offset) / 60));
  const offsetMinutes = pad(Math.abs(offset) % 60);

  const formatted = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${millis}${sign}${offsetHours}${offsetMinutes}`;
  return formatted;
}

export function getCurrentDate(): string {
  const date = new Date();

  const pad = (n: number, length = 2) => n.toString().padStart(length, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());

  const hours = 0;
  const minutes = 0;
  const seconds = 0;
  const millis = 0;

  const offset = -date.getTimezoneOffset(); // em minutos
  const sign = offset >= 0 ? '+' : '-';
  const offsetHours = pad(Math.floor(Math.abs(offset) / 60));
  const offsetMinutes = pad(Math.abs(offset) % 60);

  const formatted = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${millis}${sign}${offsetHours}${offsetMinutes}`;
  return formatted;
}

export function formatarData(data: Date) {
  const pad = (n: number) => String(n).padStart(2, '0');

  const ano = data.getFullYear();
  const mes = pad(data.getMonth() + 1);
  const dia = pad(data.getDate());
  const hora = pad(data.getHours());
  const min = pad(data.getMinutes());
  const seg = pad(data.getSeconds());
  const ms = String(data.getMilliseconds()).padStart(3, '0');

  const offsetMin = data.getTimezoneOffset(); // em minutos
  const offsetSinal = offsetMin <= 0 ? '+' : '-';
  const offsetH = pad(Math.floor(Math.abs(offsetMin) / 60));
  const offsetM = pad(Math.abs(offsetMin) % 60);

  return `${ano}-${mes}-${dia}T${hora}:${min}:${seg}.${ms}${offsetSinal}${offsetH}${offsetM}`;
}

export function formatarDataForm(data: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');

  const dia = pad(data.getDate());
  const mes = pad(data.getMonth() + 1);
  const ano = data.getFullYear();

  console.log(`${ano}-${mes}-${dia}`, data);

  return `${ano}-${mes}-${dia}`;
}

export function formatarDataTimeForm(data: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');

  const dia = pad(data.getDate());
  const mes = pad(data.getMonth() + 1);
  const ano = data.getFullYear();

   const hora = pad(data.getHours());
  const min = pad(data.getMinutes());
  const seg = pad(data.getSeconds());

  return `${ano}-${mes}-${dia} ${hora}:${min}:${seg}`;
}
