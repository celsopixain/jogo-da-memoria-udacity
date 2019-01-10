let varTime;
let erros = 0;
let time;
let selected;
let selected_before;
let pares = false;
let lista_selecionados = [];
let lista_card;
let lista_encontrados = [];
let nomeCLassFirst;
let nomeCLassSecund;
let wins = 0;
let cores = ["#ee82ee","#a9a9a9","#40e0d0","#ffff00" ,"#f0e68c","#dc143c","#7fff00","#f4a460"];
let indice_cor = 0;
let lista_cartas_reais = [];
let vitorias = 0;
let minutosInicial;
let segundosInicial;

initialPage();
controleCartas();

/**
* @description A função initialPage chama o modal inicial de aviso sobre o tempo de exibição das cartas do jogo.
*/
function initialPage(){
	window.onload = initPage;
		function initPage(){
			setTimeout(function(){
		document.getElementById('id03').style.display='block';
		},0);
	}
}

/**
* @description A função contreoleCartas faz o controle das cartas do jogo.  
	Nesse bloco até a próxima função são declaradas várias variaveis, alem das chamadas 
	de várias outras funções antes do movimento principal, Sendo entao, realizado um 'each' no objeto 
	jQuery para verificar os clicks de cada 'card' e efetuar a verificação conforme cada duas cartas 
	a 'selected' a atual e a 'selected_before' carta anterior, vários processos de verificação e
	modificação sobre a interação da carta é realizado dentro desse loop, incluindo a chamada de várias 
	funções declaradas mais adiante. 
*/
function controleCartas(){
	$('ul.deck li').each(function(index, value){
			$(this).click(function(){
				selected = $(this);

				nomeCLassFirst = selected.children().attr('class');

				lista_selecionados.push(nomeCLassFirst);

				if(lista_selecionados.length <= 1){
					open_or_close_card(true,selected);
					blockCard(selected,true);	
					lista_cartas_reais[0] = $(this);
					selected_before = selected;
					}	

				if(lista_selecionados.length == 2){
					blockCard(selected_before,true);	
					blockCard(selected,true);	
					lista_cartas_reais[1] = $(this);
					open_or_close_card(true,selected);

					if(lista_selecionados[0] === lista_selecionados[1] ){
						efectOnTheCorrectCard(selected_before,false);
						if(cores[indice_cor]!= null){
							areTheSame(cores[indice_cor]);
							indice_cor++;
							blockCard(lista_cartas_reais[0], true);
							blockCard(lista_cartas_reais[1], true);
							lista_cartas_reais = [];
						}
						getTempoJogo();

					}else{
						verifyMoves();
						getTempoJogo();
						lista_cartas_reais = [];
						turnOffEfect();
						setTimeout(function(){ blockCard($('ul.deck li'),true);}, 100);
						if(selected_before != null){
								setTimeout(function(){
									open_or_close_card(false,selected_before);
								},1000);
							}
						blockCard(selected_before,false);
						notAreTheSame();
						erros ++;
						document.querySelector('.moves').textContent = erros + ' Movimentos';
						
					}
				}

				if(lista_selecionados.length == 2){

					if(pares){
						lista_selecionados.splice(0,2);
					}else{
						lista_selecionados.splice(0,2);
					}
				}

				nomeCLassSecund = $(this).children().attr('class');
				
		});

	});
}

/**
* @description Função que realizada a randomização de uma lista
* @param {array} array - Lista de Valores passada, para que retorne outra randomizada 
* @returns {array} Retorna lista randomizada
*/
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
/**
* @description Método que adiciona o efeito da carta, sendo esse a cor de seleção e a exibição 
	do elemento filho de '.card'
*/
function turnOnEfect() {
	if(selected_before != null){
		setTimeout(function(){managerClassInHTML(selected_before, "open show", 1);
			selected_before.css('background','#02b3e4');},400)
	}
}

/**
* @description Método que remove o efeito da carta, sendo esse a cor de seleção e a exibição 
	do elemento filho de '.card'
*/
function turnOffEfect(){
	
	if(selected != null){

		setTimeout(function(){open_or_close_card(false, selected);
			if(selected != null)selected.css('background','#2e3d49');
		},1000);
	}
	
}
	
/**
* @description Função que adiciona o objeto encontrado, sendo esse apenas quando é localizado um par, 
	a uma lista de encontrados 
* @param {string} objetoEncontrado - Nome da Classe do objeto filho localizado
*/
function addClasstToListFound(objetoEncontrado){
	lista_encontrados.push(objetoEncontrado);
}

/**
* @description Função que gerencia a inclusão ou exclusão de Classes css para o atributo 'class' 
do elemento, conforme o ultimo parametro passado.
* @constructor
* @param {string} card - Elemento que irá adicionar ou receber a classe
* @param {string} nameOfClass - Nome da classe css que será adicionada
* @param {string} addOrRemove - Para de decisão para definir se adiciona ou remove a classe
*/
function managerClassInHTML(card, nameOfClass, addOrRemove){
	if(addOrRemove == 1 && card != null){
		card.addClass(nameOfClass);		
	}
	if(addOrRemove == 0 && card != null){
		card.removeClass(nameOfClass);
	}
}

/**
* @description Função que gerencia uma série de funçoes quando se localiza os pares, sendo esse;
 	adiciona css as duas cartas e efeito de 'flip' nas cartas, salva o nome dos 
	elementos encontrados em uma lista (para que seja possível verificar se o jogo está completo),
	atribui valor a variavel 'pares', reinicializa a lista de cartas selecionadas e também 
	conta o numero de vitórias 
* @param {string} cor - código da cor que será alterada	
*/
function areTheSame(cor){
	if(selected != null){

		setTimeout(function(){ 
			if(selected != null){

			selected.css('background-color',cor); 
			selected_before.css('background-color',cor);
			}
		}, 300);
		setTimeout(function(){ 
			efectOnTheCorrectCard(selected,true); 
		}, 200);
		
		addClasstToListFound(selected.children().attr('class'));
		pares = true;
		lista_selecionados.splice(0,2);
		if(lista_encontrados.length == 8){
			document.getElementById('moves').textContent = erros;
			document.getElementById('id02').style.display='block';
			clearInterval(varTime);
		}
	}
}

/**
* @description Função que efetua outras ações quando o par nao está correto; 
	verifica o numero de erros para que se houver necessidade 
	irá chamar o modal para terminar após finalizar os limites das jogadas
* @constructor
* @param {string} title - The title of the book
* @param {string} author - The author of the book
*/
function notAreTheSame(){
	pares = false;
	lista_selecionados.splice(0,2);
	setTimeout(function(){
		blockCard(selected,false);
	},1000);
}
	
/**
* @description Função embaralha as cartas e chama o método de novo jogo
*/
function embaralhar(){
	$(this).css("pointer-events", "auto");
	blockCard($('#seta-restart'),true);
	var list = [];
	$('.deck i').each(function(){
		list.push($(this).attr('class'));
	})
	list = shuffle(list);	
	$('.deck i').each(function(index){
		$(this).removeClass();
		$(this).addClass(list[index]);

	})
	novoJogo();	

}

/**
* @description Função que inicializa as váriaveis e muda o estilo das cartas iniciando-as novamente.
*/
function novoJogo(){

	$('ul.deck li').each(function(){
		$('ul.deck li').css('background','#2e3d49');

		if($('ul.deck li').hasClass('open show')){
			managerClassInHTML($('ul.deck li'),'open show',0);
		}
	})

	blockCard($('ul.deck li'),false);
	selected = null;
	selected_before = null;
	pares = false;
	lista_selecionados = [];
	lista_card  = [];
	lista_encontrados = [];
	nomeCLassFirst = null;
	nomeCLassSecund = null
	erros = 0;
	indice_cor = 0;
	iniciarJogo();
	addStarsModal();

}

/**
* @description Metodo que determinada se irá virar ou desvitar a carta passada por parâmetro
	efetuando o efeito de 'flip' na carta passada por parametro
* @constructor
* @param {boolean} openORClose - Variavel que indica se irá fechar ou abrir a carta selecionada
* @param {objeto} card - Carta selecionada
*/
function open_or_close_card(openORClose, card){
	if(card != null){
		if(openORClose == true){
			setTimeout(function(){ card.css('transform','rotateY(50deg)'); }, 100);
			setTimeout(function(){ card.css('transform','rotateY(100deg)'); }, 150);
			setTimeout(function(){ card.css('transform','rotateY(130deg)'); }, 200);
			setTimeout(function(){ card.css('transform','rotateY(180deg)'); }, 250);
			setTimeout(function(){ card.css('background','#02b3e4'); }, 250);
			setTimeout(function(){ card.addClass('open show'); }, 250);
				
		}else {
			setTimeout(function(){ card.css('background','#2e3d49'); }, 100);
			setTimeout(function(){ card.removeClass('open show'); }, 100);
			setTimeout(function(){ card.css('transform','rotateY(50deg)'); }, 100);
			setTimeout(function(){ card.css('transform','rotateY(100deg)'); }, 150);
			setTimeout(function(){ card.css('transform','rotateY(130deg)'); }, 200);
			setTimeout(function(){ card.css('transform','rotateY(180deg)'); }, 250);
			setTimeout(function(){ blockCard($('ul.deck li'),false);}, 260);
		}
	}
}

/**
* @description Função que aplica o efeito na carta após ocorrer o acerto do par
* @constructor
* @param {objeto} cartaSelecionada - carta selecionada
* @param {boolean} aux - variavel que indica o caminho que será tomado
*/
function efectOnTheCorrectCard(cartaSelecionada, aux){
	if(cartaSelecionada != null){

		if(aux == true){
			cartaSelecionada.animate({height:"80px"},200);
			cartaSelecionada.animate({height:"125px"},300);
		}else{
			cartaSelecionada.animate({height:"80px"},300);
			cartaSelecionada.animate({height:"125px"},450);
		}
	}
}

/**
* @description Função que inicia o jogo, bloqueando as cartas para que nao haja nenhum click 
	enquato as cartas são exibidas para a memorizaçaõ do jogador.
*/
function iniciarJogo(){
	document.getElementById('timer').textContent = '00:00';
	
	blockCard($('ul.deck li'),true);
	open_or_close_card(true,$('ul.deck li'));
	setTimeout(function(){ open_or_close_card(false,$('ul.deck li'));
							blockCard($('ul.deck li'),true);
	 },10000);
	setTimeout(function(){
		blockCard($('ul.deck li'),false);
		blockCard($('#seta-restart'),false);
		time = Date.now();
		startActionTimer();
		
	},10100);
 }

/**
* @description Função que realiza o bloqueio/desbloqueio da carta para que nao seja possível clica-la   
* @param {objeto} objetoSelecionado - cartas selecionadas a serem bloqueadas
* @param {boolean} blockOrDes - Váriavel que irá indicar se bloqueia ou desbloqueia a carta
*/
function blockCard(objetoSelecionado, blockOrDes){
	if(objetoSelecionado != null){
		if(blockOrDes == true){
			objetoSelecionado.css("pointer-events","none");
		}else{
			objetoSelecionado.css("pointer-events","auto");
		}
	}
}

/**
* @description Função que realiza o bloqueio/desbloqueio de todas as cartas    
* @param {boolean} allOrNothing - Váriavel que irá indicar se bloqueia ou desbloqueia as cartas
*/
function locksOrUnlocksAll(allOrNothing){
	document.getElementById('timer').textContent = '00:00';
	if(allOrNothing == true){
		blockCard($('ul.deck li'),true);
	}else{
		blockCard($('ul.deck li'),true);
	}
}

/**
* @description Função que busca o tempo de jogo do usuário em segundos e chama a outra função 
	para formatar-lo 
* @returns {String} retorna o tempo de com que o usuário gastou para localizar todos os pares. 
*/
function getTempoJogo(){
	if(time != null  ){
		tempoAtual = (Date.now()-time)/1000;
		return transforma_tempo(tempoAtual);
	}
}



/**
* @description Função realiza a conversão dos segundos em minutos horas e segungos formatados hh:mm:ss   
* @param {number} seg - Valor passado por parametro para conversão de horas, min e segundos
* @returns {String} retorna o tempo de com que o usuário gastou para localizar todos os pares. 
*/
function transforma_tempo(seg){
              
	function formataCasa(numero){
		if (numero <= 9){
			numero = "0"+numero;
        }
		return numero;
	}

    hora = formataCasa(Math.round(seg/3600));
    minuto = formataCasa(Math.floor((seg%3600)/60));
    segundo = formataCasa(((seg%3600)%60).toPrecision(2));
    if (segundo.indexOf('.') == 2) {
    	segundo = segundo.replace(segundo.substring(2),"");
    }
    formatado = minuto+":"+segundo;
   	return formatado;
 }


/**
* @description Função verifica os movimentos para que haja uma redução das estrelas do 
usuário conforme os erros   
*/
 function verifyMoves(){
 	if(erros ==  3){ 
    	removeStarsModal();
	}
	if(erros == 7 ){
    	removeStarsModal();
	} 
 }

/**
* @description Função remove as estrelas via DOM tanto do modal quanto das em exibição na pagina inicial   
*/
 function removeStarsModal(){
		$('.stars li i').each(function(){
			if($(this).attr('class') === "fa fa-star"){
				managerClassInHTML($(this),"fa-star",0);
				return false;	
			}

		})

		$('.w3-container .sessao-vencedor #winning-stars ul li i').each(function(){
			if($(this).attr('class') === "fa fa-star"){
				managerClassInHTML($(this),"fa-star",0);
				return false;	
			}

		})

 }


/**
* @description Função adiciona as estrelas via DOM tanto do modal quanto das em exibição na pagina 
inicial   
*/
 function addStarsModal(){
	$('.stars li i').each(function(){
		if($(this) != null){
			managerClassInHTML($(this),"fa-star",1);
		}
	})
	$('.w3-container .sessao-vencedor #winning-stars ul li i').each(function(){
		managerClassInHTML($(this),"fa-star",1);
	})
	 	
 }

/**
* @description Função que inicializa o temporizador solicitando o método a cada segundo    
*/
function startActionTimer(){
	varTime = setInterval(function(){
	document.getElementById('timer').textContent = getTempoJogo();
	document.getElementById('tempo-decorrente').textContent = getTempoJogo();
	},1000);
}

/**
* @description Função que para o temporizador    
*/
function stopTime(){
	clearInterval(varTime);
	erros = 0;
	document.getElementById('timer').textContent = '00:00';
	document.querySelector('.moves').textContent = 'Movimentos';
	document.querySelector('.moves').textContent = 'Movimentos';
	time = null;
	embaralhar();
	novoJogo();
}

