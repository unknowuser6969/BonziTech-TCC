# Contribuindo

Este é um manual de contribuição para este repositório. Antes de fazer uma contribuição
leia-o atentamente. 

Em caso de contribuições que não sigam este manual serão imediatamente rejeitadas.

## Pull Requests (PRs)

Todas contribuições a este repositório devem passar por uma Pull Request. Caso haja alguma 
alteração diretamente na branch main, esta será apagada independente do seu conteúdo.

Sua PR pode ser feita tanto em uma nova branch criada exclusivamente para sua nova feature,
quanto em um fork do repositiório principal.

#

Ao fazer uma Pull Request, lembre-se de:

* Fazer uma commit detalhada especificando as alterações de sua nova versão;

* Remover todas as dependências e módulos de terceiros, especificando na descrição da PR
tudo o que deve ser baixado para utilizar sua atualização (bibliotecas, módulos, etc.);

* Caso você esteja usando novas variáveis de ambiente, informe-as ao dono do repositório.

Caso sua Pull Request não siga as diretrizes acima, ela será fechada e será requisitada
uma nova.


## Práticas de código

Antes de suas alterações serem adicionadas à branch main, elas serão cautelosamente 
avaliadas e testadas pelos contribuidores principais do projeto, por isso, tenha paciência!
O seu código pode levar dias para ser revisado!

Para ajudar neste processo e diminuir a quantidade de correções, siga as seguintes diretrizes
de uniformização de código:

### Identação

A indentação deve ser feita devidamente com tabs. Em caso de código mal identado, será exigida
uma nova PR apenas para correção disso.

Ninguém merece olhar a códigos mal identados, especialmente os testando ou fazendo debug!

### camelCase

Todas variáveis e funções devem estar em camel case, enquanto classes devem estar em Pascal
case, da seguinte forma:

```js
const variavelexemplo; // incorreto
const VARIAVELEXEMPLO; // incorreto
const variavel_exemplo; // Snake case -> incorreto

const variavelExemplo; // Camel case -> correto
const VariavelExemplo; // Pascal case -> incorreto
```

```js
class classeExemplo {} // incorreto

class ClasseExemplo {} // correto
```

Além disso, nomes de variáveis, funções e classes não devem conter acentos ou caracteres especiais, 
pois isto pode levar a complicações em diferentes IDEs e navegadores mais antigos.

### Comentários

O código deve sempre ser mantido claro, com nomes de variáveis e funções que auto-explicativos,
porém, nem tudo é tão claro na programação. Por isso, caso haja alguma linha de código que faça algo
não muito claro ou mais complexo, comente-a. Isso ajudará os próximos que tiverem de mexer em seu código.

Além disso, antes de toda função, descreva-a utilizando o padrão 
<a href="https://jsdoc.app/">JSDoc 3</a>. Da seguinte maneira:

```js
/**
 * Breve descrição do que faz a função.
 * @param {tipo} param1 - Descrição do parâmetro da função
 * @param {tipo} param2 - Descrição do parâmetro da função
 * @returns {tipo} (Presente apenas caso a função retorne algo)
 */
function funcaoExemplo(param1, param2) {
    // ...
}
```

Diversos exemplos desta documentação em prática podem ser encontrados em nosso código-fonte.

### Separation of concerns

Não faça tudo em apenas uma classe ou função, divida o código em menores pedaços para 
auxiliar na leitura em futuras modificações do código.

Caso não esteja familiarizado com o conceito de separação de conceitos (Separation of
concerns), peço que você dê uma estudada no tópico.

### "O código de outro é um templo"

O código feito por outra pessoa é o templo dela, e não deve ser tocado ou alterado se não
estritamente necessário. Se aquele código está ali, ele está por um motivo.
Fora isso, muito provavelmente já foi avaliado e testado por mais pessoas, e 
outras partes do código dependem dela. Portanto, caso não tenha um motivo válido ou
permissão para isso, NUNCA altere o código de outra pessoa.