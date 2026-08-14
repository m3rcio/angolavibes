function contemCaracteresInvalidos(texto: string): boolean {
  const padrao = /[;'"<>\|$\\=%+?_]|--|\/\*|\*\//;

  return padrao.test(texto);
}


export function validarBusca(query:string){
  if(contemCaracteresInvalidos(query)==false && query.length < 100){
    return query;
  }
}



