//get params from url
$.urlParam = function(name){
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if(results === null)
		return null;
    return results[1] || 0;
}

$(function (){
	// Slider
	$('#slider').slider({
			value: 0,
			min: 0,
			max: 6,
			step: 1,
			slide: function( event, ui ) {
				
				$( "#slidervalue" ).html( ui.value );
				switch(ui.value){
					case 0:
						$('#opciones_capacidad').attr('class', 'op_05');
						$('#bola').attr('src', 'img/ball_05.png');
						break;
					case 1:
						$('#opciones_capacidad').attr('class', 'op_1');
						$('#bola').attr('src', 'img/ball_1.png');
						break;
					case 2:
						$('#opciones_capacidad').attr('class', 'op_15');
						$('#bola').attr('src', 'img/ball_15.png');
						break;
					case 3:
						$('#opciones_capacidad').attr('class', 'op_2');
						$('#bola').attr('src', 'img/ball_2.png');
						break;
					case 4:
						$('#opciones_capacidad').attr('class', 'op_4');
						$('#bola').attr('src', 'img/ball_4.png');
						break;
                    case 5:
                        $('#opciones_capacidad').attr('class', 'op_8');
                        $('#bola').attr('src', 'img/ball_8.png');
                        break;
                    case 6:
                        $('#opciones_capacidad').attr('class', 'op_16');
                        $('#bola').attr('src', 'img/ball_16.png');
                        break;
					default:
						$('#opciones_capacidad').attr('class', 'op_05');
						$('#bola').attr('src', 'img/ball_05.png');
						break;
				}
			}
	});
	
	$( "#slidervalue" ).html( $( "#slider" ).slider( "value" ) );
    $('#opciones_capacidad').attr('class', 'op_05');
	
	//Fancybox
	var hashRedireccion='#'+window.location.href.split('/')[window.location.href.split('/').length-1];
	var urlSignup='https://my.instantservers.telefonica.com/registration/join';
	var urlContact='https://instantservers.secure.force.com/cloudtelefonica/contactus';
	/*
	$("#account").fancybox({
		'titlePosition'		: 'inside',
		'showCloseButton'	: false,
		'type'				: 'iframe',
		'href'				: urlSignup+hashRedireccion,
		'width'				: 1024,
		'height'			: 500,
		'scrolling'   		: 'no',
		'autoScale'			: false
	});

	$("#menu-cont #signup").fancybox({
                'titlePosition'         : 'inside',
                'showCloseButton'       : false,
                'type'                          : 'iframe',
                'href'                          : urlSignup+hashRedireccion,
                'width'                         : 1024,
                'height'                        : 500,
                'scrolling'             : 'no',
                'autoScale'                     : false
        });*/
	
	$("#nt1").fancybox({
		'titlePosition'		: 'inside',
		'showCloseButton'	: false,
		'type'				: 'iframe',
		'href'				: urlContact+hashRedireccion,
		'width'				: 540,
		'height'			: 505,
		'scrolling'   		: 'no',
		'autoScale'			: false
	});
	$("#nt2").fancybox({
		'titlePosition'		: 'inside',
		'showCloseButton'	: false,
		'type'				: 'iframe',
		'href'				: urlContact+hashRedireccion,
        'width'				: 540,
        'height'			: 505,
		'scrolling'   		: 'no',
		'autoScale'			: false
	});
	$("#nt3").fancybox({
		'titlePosition'		: 'inside',
		'showCloseButton'	: false,
		'type'				: 'iframe',
		'href'				: urlContact+hashRedireccion,
        'width'				: 540,
        'height'			: 505,
		'scrolling'   		: 'no',
		'autoScale'			: false
	});
	$("#contact_popup, #contact_popup2").fancybox({
		'titlePosition'		: 'inside',
		'showCloseButton'	: false,
		'type'				: 'iframe',
		'href'				: urlContact+hashRedireccion,
		'width'				: 650,
		'height'			: 505,
		'scrolling'   		: 'no',
		'autoScale'			: false
	});

	//ContentSwitcher
	
	//Funcion para depurar
	var showTs = function (){
		alert('t1 = ' + t1 + ', t2 = ' + t2 + ', t3 = ' + t3);
	}
	
	//Funcion para guardar el estado de la vista
	var saveState = function (state){
		var level = state.level;
		switch(level){
			case 1:
				t1 = state.id_elto_selected;
				t2 = null;
				t3 = null;
				break;
			case 2:
				t2 = state.id_elto_selected;
				t3 = null;
				break;
			case 3: 
				t3 = state.id_elto_selected;
				break;
			default:
				t1 = t2 = t3 = null;
		}
		
		//Suponemos que el elemento seleccionado tiene un submenú y recuperamos su estado
		var elemSelectedState = $('#' + state.id_elto_selected).data('state');
		// Si fuera undefined entonces no tiene un submenú asignado y hemos acabado
		if(elemSelectedState !== undefined){
			//Si no es undefined es un submenú y por lo tanto preguntamos cual de sus elementos estaba seleccionado
			// y lanzamos recursivamente el evento de selección para que se actualicen las variables tn (t1, t2, t3..)
			$('#' + elemSelectedState.id).contentSwitcher('select', '#' + elemSelectedState.id_elto_selected);
		}
		//showTs();
	}
	
	//Inicializamos los menus
	$('#tabs').contentSwitcher({selectedFirst: true, onclickhandler : saveState, level: 1 });
	$('#overview').contentSwitcher({selectedFirst: true, onclickhandler : saveState, level: 2 });
	$('#sistema_operativo').contentSwitcher({selectedFirst: true, onclickhandler : saveState, level: 3 });
	$('#uses-cases').contentSwitcher({selectedFirst: true, onclickhandler : saveState, level: 2 });
	$('#terms-conditions').contentSwitcher({selectedFirst: true, onclickhandler : saveState, level: 2 });
	
	//Leemos parametros de la url
	var t1 = $.urlParam('t1'), 
		t2 = $.urlParam('t2'),
		t3 = $.urlParam('t3');

	//Cargamos la vista correspondiente de la url (parametros t) si es que existe
	if( t1 !== null) {
		if($('#tabs').contentSwitcher('select', '#' + t1)){
			if($('#' + t1).contentSwitcher('select', '#' + t2)){
				if(!$('#' + t2).contentSwitcher('select', '#' + t3)){
					t3 = null;
				}
			} else {
				t2 = t3 = null;
			}
		} else {
			t1 = t2 = t3 = null;
		}
		
	} else {
		//Si los parámetros t no vienen por url los iniciamos nosotros seleccionando la primera pestaña, overview
		$('#tabs').contentSwitcher('select', '#overview');
	}
	
});


(function($){
 
	var methods = {
	
		state : null,
	
		init : function (options) {
            var defaults = {
				selectedFirst: false,
				onclickhandler: null,
				level: 0
            }
                 
            var options =  $.extend(defaults, options);
			
			//Inicializamos varibles de estado
			var state = {
				id : $(this).attr('id'),
				id_elto_selected : null,
				level : options.level,
				elto_selected: null,
				children_ids: []
			}
			
			//Guardar estado inicial
			$(this).data('state', state);
			$(this).data('options', options);
			
			var ini_this = this;
			
            return this.each(function() {
			
                var o = options;
                				
				var li_elto = this;
				
				$(this).find(' ul').first().find(' li a').each(function (){
					
					//Añadimos el id del hijo a la lista
					state.children_ids.push($(this).attr('href'));
					
					//Ocultar el div asociado con el anchor
					$($(this).attr('href')).addClass('divoculto');
					
					//enlazar el div a mostrar con su anchor
					$($(this).attr('href')).data('padre', this);
					
					$(this).click(function(event){

                        if ($(this).hasClass('progress')) {
                            return;
                        }
						event.preventDefault();
						
						//Recuperar estado
						var state = $(ini_this).data('state');
						
						if(state.elto_selected !== null){
							$(state.elto_selected).parent().prev().removeClass('prev');
							$(state.elto_selected).parent().removeClass('selected');
							//$($(elto_selected).attr('href')).hide();
							$($(state.elto_selected).attr('href')).removeClass('divselected');
							$($(state.elto_selected).attr('href')).addClass('divoculto');
						}
						
						//Actualizamos
						state.elto_selected = this;
						state.id_elto_selected = $($(state.elto_selected).attr('href')).attr('id');
						
						//$($(this).attr('href')).fadeIn();
						$($(this).attr('href')).addClass('divselected');
						$($(this).attr('href')).removeClass('divoculto');
						$(this).parent().prev().addClass('prev');
						$(this).parent().addClass('selected');
						
						//Guarda el estado
						$(this).data('state', state);
						
						if(o.onclickhandler !== null){
							o.onclickhandler(state);
						}
						
					});
					
				});
				if ( o.selectedFirst === true ) {
					$(this).find(' ul').first().find(' li').first().addClass('selected');
					$($(this).find(' ul').first().find(' li a').first().attr('href')).addClass('divselected');
					$($(this).find(' ul').first().find(' li a').first().attr('href')).removeClass('divoculto');
					
					//Guardar estado de la nueva seleccion
					state.elto_selected = $(this).find(' ul').first().find(' li a').first()[0];
					state.id_elto_selected = $($(state.elto_selected).attr('href')).attr('id');
					$(this).data('state', state);
				}
            });
		},
		
		select: function (id) {
		
			if(id === '#null'){
				return false;
			}
		
			//recuperar el estado
			var state = $(this).data('state');
			//recuperamos las opciones
			var options = $(this).data('options');
			
			//Controlamos si el id es un hijo valido
			var ok = false;
			//alert(id + ', ' + state);
			for ( var i = 0; i < state.children_ids.length; i++ ) {
				if (!ok){
					ok = state.children_ids[i] == id;
				}
			}
			//alert(ok + ', ' + state.children_ids + ' = ' + id);
			if ( !ok ) {
				return false;
			}
						
			var anchor = $(id).data('padre');
						
			//Ocultar div y quitar clases selected y prev de la antigua seleccion
			if(state.elto_selected !== null){
				$(state.elto_selected).parent().prev().removeClass('prev');
				$(state.elto_selected).parent().removeClass('selected');
				//$($(elto_selected).attr('href')).hide();
				$($(state.elto_selected).attr('href')).removeClass('divselected');
				$($(state.elto_selected).attr('href')).addClass('divoculto');
			}
			
			//Guardar estado de la nueva seleccion
			state.elto_selected = anchor;
			state.id_elto_selected = $($(state.elto_selected).attr('href')).attr('id');
			
			//$($(this).attr('href')).fadeIn();
			$($(anchor).attr('href')).addClass('divselected');
			$($(anchor).attr('href')).removeClass('divoculto');
			$(anchor).parent().prev().addClass('prev');
			$(anchor).parent().addClass('selected');
						
			if(options.onclickhandler !== null){
				options.onclickhandler(state);
			}
			return true;
		}
	};
	
	$.fn.contentSwitcher = function ( method ) {
		// Method calling logic
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on contentSwitcher' );
		}
	}
})(jQuery);

function trackDocument(doc) {
    if(doc == 'signup1' || doc ==  'signup2'){
	var ftRandom = Math.random()*1000000; 
	$('body').append('<iframe id="tt" style="position:absolute; visibility:hidden; width:1px; height:1px;" src="http://servedby.flashtalking.com/container/66;12655;499;iframe/?spotName=o2_Instant_Server_Leads&cachebuster='+ftRandom+'"></iframe>');
    }
    
    var CloudTracker = _gat._createTracker('UA-34423639-1', 'CloudTracker');
    CloudTracker._trackPageview(doc);
}


