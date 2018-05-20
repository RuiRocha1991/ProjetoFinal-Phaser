var menu = function(game){}

menu.prototype= {
    
    create : function(){
        
        this.background= this.game.add.image(0,0, 'background');
        this.background.scale.setTo(2,2);
        this.map = this.game.add.tilemap('map');
        this.map.addTilesetImage('ground_1x1');
        this.map.addTilesetImage('walls_1x2.png');
        this.layer = this.map.createLayer('Tile Layer 1');
        this.layer.resizeWorld();
        
        var titulo = this.game.add.sprite(160, 160, "menu");
        titulo.anchor.setTo(0.5,0.5);
        
        var btnPlay = this.game.add.button(160,320,"play", this.iniciaJogo, this);
        
        btnPlay.anchor.setTo(0.5, 0.5);
        
        
        
    },
    
    iniciaJogo : function(){
        this.game.soundClick.play();
        this.game.soundIntro.pause();
        this.game.state.start("oJogo");
        
    }
    
}