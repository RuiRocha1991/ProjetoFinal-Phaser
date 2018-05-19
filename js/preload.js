var preload = function(game){}

preload.prototype={
    
    preload : function(){
        
        this.game.load.image("play", "assets/play.png");
        this.game.load.image('wood', 'assets/wood.png');
        
        
        this.game.load.audio('intro', 'assets/sounds/intro.ogg');
        this.game.load.audio('menuClick', 'assets/sounds/menu_switch.ogg');
        this.game.load.image("logo", "assets/logo.png");
        this.game.load.image("play", "assets/play.png");
        this.game.load.bitmapFont('desyrel', 'assets/desyrel-pink.png', 'assets/desyrel-pink.xml');
        
        this.game.load.tilemap('map', 'assets/collision_test.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('ground_1x1', 'assets/ground_1x1.png');
        this.game.load.image('phaser', 'assets/phaser-dude.png');
        this.game.load.spritesheet('coin','assets/coin.png',32,32,6);
        
        this.game.load.audio('bullet', 'assets/sounds/blaster.ogg');
        this.game.load.audio('explode', 'assets/sounds/explode.ogg');
        this.game.load.audio('playerDeath', 'assets/sounds/player_death.ogg');
        this.game.load.audio('jump', 'assets/sounds/squit.ogg');
        this.game.load.audio('step1', 'assets/sounds/steps1.ogg');
        this.game.load.audio('step2', 'assets/sounds/steps2.ogg');
       
        this.game.load.audio('soundGame', 'assets/sounds/game.ogg');
        
        
    },
    
    create : function(){
        
        this.game.state.start("Apre");
    }
}