var end = function(game){
    
}

end.prototype= {
    
    create : function(){
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
        this.texto = this.game.add.text(600, 200, 'MENU', style);
        this.texto.anchor.set(0.5);
            
        
        var btnPlay = this.game.add.button(600,500,"play", this.iniciaJogo, this);
        btnPlay.anchor.setTo(0.5, 0.5);
        
        
        
    },
    
    iniciaJogo : function(){
        this.game.soundClick.play();
        this.game.soundIntro.pause();
        this.game.state.start("oJogo");
        
    }
    
}