var end = function(game){
    var pontos;
    var coins;
    var minutos;
    var segundos;
    var atingido;
    
}

end.prototype= {
    
    init: function (lista) {
		this.pontos=lista[3];
        this.coins=lista[0];
        this.minutos=lista[1];
        this.segundos=lista[2];
        this.atingido=lista[4];
	},
    
    
    create : function(){
        //this.game.soundIntro = this.game.add.audio('intro');
        this.game.soundIntro.play();
        var textoMenu;
        this.background= this.game.add.image(0,0, 'background');
        this.background.scale.setTo(2,2);
        this.map = this.game.add.tilemap('map');
        this.map.addTilesetImage('ground_1x1');
        this.map.addTilesetImage('walls_1x2.png');
        this.layer = this.map.createLayer('Tile Layer 1');
        this.layer.resizeWorld();
        var fundoMenu= this.game.add.image(600,300, 'fundoMenu');
        fundoMenu.anchor.setTo(0.5, 0.5);
        var style = {font: '60px', fill: '#000', align:'left', style:'bold', boundsAlignH: 'top', boundsAlignV:'top'}
        this.texto = this.game.add.text(600, 150, 'MENU', style);
        this.texto.anchor.set(0.5);
        var style1 = {font: '20px', fill: '#000', align:'left', style:'bold', boundsAlignH: 'top', boundsAlignV:'top'}
        if(this.segundos<10){
            var texto1 = this.game.add.text(600, 250, 'Tempo: '+this.minutos+':0'+this.segundos + ' minutos', style1);
        }else{
            var texto1 = this.game.add.text(600, 250, 'Tempo: '+this.minutos+':'+this.segundos + ' minutos', style1);
        }
        
        texto1.anchor.set(0.5);

        var texto2 = this.game.add.text(600, 300, 'Pontuação: '+ this.pontos, style1);
        texto2.anchor.set(0.5);
        
       
        var texto3 = this.game.add.text(600, 350, 'Moedas: '+this.coins, style1);
        texto3.anchor.set(0.5);
        
       
        var texto4 = this.game.add.text(600, 400, 'Atingido: '+this.atingido, style1);
        texto4.anchor.set(0.5);
        
        
        var btnPlay = this.game.add.button(600,500,"play", this.iniciaJogo, this);
        btnPlay.anchor.setTo(0.5, 0.5);
        
        
        
    },
    
    iniciaJogo : function(){
        
        this.game.soundClick.play();
        this.game.soundIntro.pause();
        this.game.state.start("oJogo");
        
    }
    
}