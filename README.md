# Projeto Jogo da Memoria - Udacity

## Tabela de Conteudos

* [Instruções](#instrucoes)
* [Contribuindo](#contribuindo)
* [Como funciona](#comofunciona)

## Instruções 

O Projeto Jogo da Memória está completamente relacionado à sua capacidade de demonstrar domínio de HTML, CSS e JavaScript. Você criará um jogo de correspondência de cartas completo para navegador (também conhecido como Concentration). Mas este não é um jogo da memória qualquer! É um jogo moderno, bem projetado e cheio de recursos!

O Projeto foi estruturado seguindo a orientação da udacity. Pastas: css, js e img. A página princial index.html corresponde ao jogo da memória em html. A index.html utiliza o framework boostrap e a biblioteca jQuery. A aplicação possui arquivos; HTML, contendo o corpo do texto, um arquivo de estilo CSS generalizado. 

Para iniciar o projeto deve-se acessar o arquivo `index.html` esse sendo o principal arquivo que realiza a chamada a vários metodos e dispostos em arquivos organizados em pastas especificas.

As funcionalidades interativas, que dão vida a página; como movimentos e animações, são controladas pelo arquivo `js/app.js`. Já a estilização cores, tamanhos e etc. são geridas pelo arquivo `app.css`. Logo, corpo do site é organizado pelo arquivo `index.html`, onde é a página principal que faz a chamado dos outros arquivos e respectivos metodos.


## Contribuindo

Este código contribui com possiveis métodos para os interessados em interação de jogos da memoria. Envie suas revisões e participe do projeto. 

## Como funciona

Caso você não esteja familiarizado com o jogo, as regras são muito simples: haverá uma série de cartas viradas para baixo, e o jogador deve virar duas dessas cartas para cima para localizar aquelas que combinam entre si!

O tabuleiro do jogo consiste em dezesseis cartas dispostas aleatoriamente em uma grade. O baralho é composto por oito pares de cartas, e cada par tem um símbolo diferente dos demais. Como funciona cada jogada:

Um jogador deve virar uma carta para revelar seu símbolo
Então, esse mesmo jogador deve virar outra carta, tentando encontrar a carta correspondente.
Se as cartas forem iguais, ambas ficam viradas para cima
Se as cartas não forem iguais, ambas devem ser viradas para baixo novamente
O jogo termina quando todos os pares forem encontrados.

