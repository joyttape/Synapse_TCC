export const masks = {
  telefone(value: string): string {
    if (!value) return "";
    let v = value.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d{5})(\d)/, "$1-$2");
    return v.slice(0, 15);
  },

  cep(value: string): string {
    if (!value) return "";
    let v = value.replace(/\D/g, "");
    v = v.replace(/(\d{5})(\d)/, "$1-$2");
    return v.slice(0, 9);
  },

  data(value: string): string {
  if (!value) return "";

  if (value.includes('-')) {
    const partes = value.split('T')[0].split('-'); 
    if (partes.length === 3) {
      const [ano, mes, dia] = partes;
      return `${dia}/${mes}/${ano}`; 
    }
  }

  let v = value.replace(/\D/g, "");
  v = v.replace(/(\d{2})(\d)/, "$1/$2");
  v = v.replace(/(\d{2})(\d)/, "$1/$2");
  return v.slice(0, 10);
},


  dateToISO(data: string): string | null {
  if (!data) return null;
  
  const apenasNumeros = data.replace(/\D/g, "");
  if (apenasNumeros.length !== 8) return null;

  const dia = apenasNumeros.substring(0, 2);
  const mes = apenasNumeros.substring(2, 4);
  const ano = apenasNumeros.substring(4, 8);

  if (Number(mes) > 12) {
    return null; 
  }

  return `${ano}-${mes}-${dia}`; 
}


};