var menu = function(game){}

menu.prototype= {
    
    create : function(){
        
        var titulo = this.game.add.sprite(160, 160, "menu");
        titulo.anchor.setTo(0.5,0.5);
        
        var btnPlay = this.game.add.button(160,320,"play", this.iniciaJogo, this);
        
        btnPlay.anchor.setTo(0.5, 0.5);
        
        
        
    },
    
    iniciaJogo : function(){
        
        this.game.state.start("oJogo");
        
    }
    
}