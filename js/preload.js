var preload = function(game){}

preload.prototype={
    
    preload : function(){
        //--> carrega os dados todos necessários para o jogo.
        this.game.load.image("play", "assets/play.png");
        this.game.load.image('wood', 'assets/wood.png');
        this.game.load.image('background', 'assets/background.png');
        this.game.load.audio('intro', 'assets/sounds/intro.ogg');
        this.game.load.audio('menuClick', 'assets/sounds/menu_switch.ogg');
        this.game.load.image("logo", "assets/logo.png");
        this.game.load.image("play", "assets/play.png");
        this.game.load.image("pressKey", "assets/pressKey.png");
        this.game.load.image("fundoMenu", "assets/fundoMenu.png");
        this.game.load.image("autor", "assets/autor.png");
        this.game.load.image("loading", "assets/loading.png");
        this.game.load.image('botao-pausa', 'assets/botao-pausa.png');
        this.game.load.tilemap('map', 'assets/collision_test.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('ground_1x1', 'assets/ground_1x1.png');
        this.game.load.spritesheet('phaser', 'assets/dude.png',32,48);
        this.game.load.image('torpedo', 'assets/torpedo.png');
        this.game.load.image('torpedo1', 'assets/torpedo1.png');
        this.game.load.image('bullet', 'assets/bullet.png');
        this.game.load.spritesheet('coin','assets/coin.png',32,32,6);
        this.game.load.image('exit', 'assets/exit.png');
        this.game.load.audio('bulletDisparo', 'assets/sounds/blaster.ogg');
        this.game.load.audio('explode', 'assets/sounds/explode.ogg');
        this.game.load.audio('playerDeath', 'assets/sounds/player_death.ogg');
        this.game.load.audio('soundGame', 'assets/sounds/game.ogg');
        
    },
    
    create : function(){
        //--> inicia o estado de apresentação do jogo
        this.game.state.start("Apre");
    }
}