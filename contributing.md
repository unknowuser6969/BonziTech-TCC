# Contribuindo

Este é um manual de contribuição para este repositório. Antes de fazer uma contribuição
leia-o atentamente. 

Caso sua contribuição não siga este manual, esta será imediatamente rejeitada.

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

## Issues

Caso você encontre algum problema em alguma parte do código não feita por você durante a
execução da aplicação, não hesite em abrir uma issue! Ao abrir uma issue você ajuda que nos
posicionemos de forma mais rápida e organizada para lidar com o problema de forma eficiente.

Não avise aos colaboradores do projeto por meio de mensagens privativas de problemas no sistema,
isso apenas atrasa o processo de resolução de problemas! Caso você encontre um bug ou uma funcionalidade
faltando na execução do programa, siga os seguintes passos:

1. Cheque se uma issue com seu problema já não existe;
2. Caso não, crie uma nova issue com o problema a ser solucionado brevemente no título;
3. Nos comentários da issue, fale detalhadamente sobre o problema, e, caso seja um bug,
dê os passos exatos para reproduzí-lo. Caso uma issue não tenha os passos para reprodução
do problema, ou seja muito vaga, esta será fechada e desconsiderada.
4. Aguarde a validação da issue por um dono do repositório.

Ao fazer isso, você auxilia o bom andamento do projeto, e garante que a aplicação siga livre de
bugs ou problemas não reportados.

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