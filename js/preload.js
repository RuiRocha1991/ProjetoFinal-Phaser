var preload = function(game){}

preload.prototype={
    
    preload : function(){
        
        var barra = this.add.sprite(160,240,"loading");
        
        barra.anchor.setTo(0.5,0.5);
        
        this.load.setPreloadSprite(barra);
        
        this.game.load.spritesheet("numero", "assets/numeros.png",100,100);
        
        this.game.load.image("menu", "assets/titulojogo.png");
        
        this.game.load.image("play", "assets/play.png");
        this.game.load.image("maior", "assets/maior.png");
        this.game.load.image("menor", "assets/menor.png");
        this.game.load.image("gameover", "assets/gameover.png");
        
    },
    
    create : function(){
        
        this.game.state.start("menu");
    }
}