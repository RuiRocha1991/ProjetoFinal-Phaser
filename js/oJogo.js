var ojogo = function(game){
    //--> variaveis do jogo
    var background;
    var map;
    var layer;
    var cursors;
    var sprite;
    var coins;
    var bg;
    var anim;
    var filter;
    var soundGame;
    var torpedo1;
    var bulletTime1;
    var torpedo2;
    var bulletTime2;
    var torpedo3;
    var bulletTime3;
    var torpedo4;
    var bulletTime4;
    var torpedo5;
    var bulletTime5;
    var torpedo6;
    var bulletTime6;
    var bullets;
    var soundDisp;
    var soundDeath;
    var soundCollide;
    var emitter;
    var explode;
    var countCoins;
    var tempoMinuto;
    var tempoSegundo;
    var pontuacao;
    var textoPontuacao;
    var textoTempo;
    var textoNCoins;
    var atingido;
    var exit;
}
//--> variavel global
 var bullet;

ojogo.prototype={
    //--> funcao que inicia todos os componentes do jogo
    create : function () {
        this.bulletTime1=0;
        this.bulletTime2=0;
        this.bulletTime3=0;
        this.bulletTime4=0;
        this.bulletTime5=0;
        this.bulletTime6=0;
        this.tempoMinuto=0;
        this.tempoSegundo=0;
        this.pontuacao += 0; 
        this.countCoins=0;
        this.atingido=0;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.addElementos();
        this.configurarJogador();
        this.cursors = this.game.input.keyboard.createCursorKeys();
        var x=0;
        //-> ciclo que vai criar as moedas que vao estar espalhadas pelo mapa de forma aleatória
        while (x<25){
            var coin = this.coins.create(this.rnd.integerInRange(50,1500), this.rnd.integerInRange(50,500),'coin');
            coin.body.gravity.y=320;
            coin.body.velocity.x=0;
            coin.body.bounce.y=0.2;
            coin.animations.add('roda',[0, 1, 2, 3,4],10 , true);
            coin.play('roda');
            coin.anchor.setTo(0.5,0.5);
            x++;
        }
        
        //--> cojunto de codigo que vai ser apresentado nos cantos superiores do jogo com as 
        // informações de pontos moedas apanhadas entre outros.
        var style1 = {font: '20px', fill: '#FFF', align:'left', boundsAlignH: 'top', boundsAlignV:'top'}
        this.textoPontuacao = this.game.add.text(33, 30, 'Pontuação: 0', style1);
        this.textoPontuacao.fixedToCamera = true;
        this.textoNCoins = this.game.add.text(33, 60, 'Moedas: 0', style1);
        this.textoNCoins.fixedToCamera = true;
        this.textoTempo = this.game.add.text(33, 90, 'Tempo: 0', style1);
        this.textoTempo.fixedToCamera = true;
        //-> metodo que vai atualizar o tempo
        this.game.time.events.loop(Phaser.Timer.MINUTE, this.updateTempoMinuto, this);
        this.game.time.events.loop(Phaser.Timer.SECOND, this.updateTempoSegundo, this);
        //-- botao para meter o jogo em pausa
        this.btnPausa = this.add.button( 1180, 30, 'botao-pausa', this.pausaGame, this);
        this.btnPausa.fixedToCamera = true;                                  
		this.btnPausa.anchor.set(1, 0);
        this.btnPausa.input.useHandCursor = true;
       
},

update : function () {
    //-> ativar colisoes entre objetos
    this.game.physics.arcade.collide(this.sprite, this.layer);
    this.game.physics.arcade.collide(this.coins, this.layer);
    this.game.physics.arcade.collide(this.sprite,this.torpedo1);
    this.game.physics.arcade.collide(this.sprite,this.torpedo2);
    this.game.physics.arcade.collide(this.sprite,this.torpedo3);
    this.game.physics.arcade.collide(this.sprite,this.torpedo4);
    this.game.physics.arcade.collide(this.sprite,this.torpedo5);
    this.game.physics.arcade.collide(this.sprite,this.torpedo6);

    //-> detetar colisoes
    this.game.physics.arcade.overlap(this.sprite, this.coins, this.coletorCoins,null, this);
    this.game.physics.arcade.overlap(this.sprite, this.bullets, this.animaExplode,this.colideBullets, this);
    this.move();//-> move jogador
    this.dispara();//--> funcao para fazer as armas disparar
    
    
    //-> funcao que vefirica se o jogador ja chegou ao objetivo
    if(this.sprite.body.x >= 1510 && this.sprite.body.y <= 80){
        this.soundGame.pause();
        //-> variavel que passa determinados valores para o ecra de fim
        var lista=[this.countCoins, this.tempoMinuto, this.tempoSegundo, this.pontuacao, this.atingido];
        this.game.state.start("End", true, false, lista);
        
    }
    

},
    //-> funcao que atualiza o tempo em minutos
    updateTempoMinuto :function(){
        this.tempoMinuto++;
        this.tempoSegundo=0;
        this.textoTempo.setText('Tempo: ' + this.tempoMinuto + ':'+this.tempoSegundo);  
    },
         //-> funcao que atualiza o tempo em segundos                       
    updateTempoSegundo :function(){
        this.tempoSegundo++;
        if(this.tempoSegundo<10){
            this.textoTempo.setText('Tempo: ' + this.tempoMinuto + ':0'+this.tempoSegundo);  
        }else{
            this.textoTempo.setText('Tempo: ' + this.tempoMinuto + ':'+this.tempoSegundo);  
        }
        
    },

    //-> funcao que vai carregar todos os dados para o jogo
addElementos : function(){
    this.soundGame=this.game.add.audio('soundGame');
    this.soundGame.play();
    this.soundStep1= this.game.add.audio('step1');
    this.soundStep2= this.game.add.audio('step2');
    this.soundJump= this.game.add.audio('jump');
    this.soundDisp=this.game.add.audio('bulletDisparo');
    this.soundDisp.volume=0.1;
    this.soundDeath=this.game.add.audio('playerDeath');
    this.soundCollide=this.game.add.audio('explode');
    this.background= this.game.add.image(0,0, 'background');
    this.background.scale.setTo(3,2);
    
    this.map = this.game.add.tilemap('map');
    this.map.addTilesetImage('ground_1x1');
    this.map.addTilesetImage('walls_1x2.png');
    this.map.enableBody=true;
    this.game.physics.arcade.enable(this.map);
    this.map.setCollisionBetween(1, 12);
    
    this.layer = this.map.createLayer('Tile Layer 1');
    this.layer.resizeWorld();
   
    
    this.coins= this.game.add.group();
    this.game.physics.arcade.enable(this.coins);
    this.coins.enableBody=true;
    
    this.bullets=this.game.add.group();
    this.game.physics.arcade.enable(this.bullets);
    this.bullets.enableBody=true;
    this.bullets.createMultiple(500,'bullet');
    this.bullets.setAll('anchor.y', 0.5);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);
    this.exit= this.game.add.image(1450, 50, 'exit');
    //-> criar conjunto de armas para disparar
    this.torpedo1 = this.game.add.sprite(250, 590, 'torpedo');
    this.game.physics.arcade.enable(this.torpedo1);
    this.torpedo1.enableBody=true;
    this.torpedo1.body.immovable = true;
    this.torpedo1.anchor.setTo(0.5, 0.5);    
    
    this.torpedo2 = this.game.add.sprite(500, 50, 'torpedo');
    this.game.physics.arcade.enable(this.torpedo2);
    this.torpedo2.enableBody=true;
    this.torpedo2.body.immovable = true;
    this.torpedo2.anchor.setTo(0.5, 0.5);
    this.torpedo2.rotation=3.15;
    
    this.torpedo3 = this.game.add.sprite(775, 590, 'torpedo');
    this.game.physics.arcade.enable(this.torpedo3);
    this.torpedo3.enableBody=true;
    this.torpedo3.body.immovable = true;
    this.torpedo3.anchor.setTo(0.5, 0.5);    
    
    this.torpedo4 = this.game.add.sprite(1000, 50, 'torpedo');
    this.game.physics.arcade.enable(this.torpedo4);
    this.torpedo4.enableBody=true;
    this.torpedo4.body.immovable = true;
    this.torpedo4.anchor.setTo(0.5, 0.5);
    this.torpedo4.rotation=3.15;
    
    this.torpedo5 = this.game.add.sprite(1250, 590, 'torpedo');
    this.game.physics.arcade.enable(this.torpedo5);
    this.torpedo5.enableBody=true;
    this.torpedo5.body.immovable = true;
    this.torpedo5.anchor.setTo(0.5, 0.5);    
    
    this.torpedo6 = this.game.add.sprite(1400, 50, 'torpedo');
    this.game.physics.arcade.enable(this.torpedo6);
    this.torpedo6.enableBody=true;
    this.torpedo6.body.immovable = true;
    this.torpedo6.anchor.setTo(0.5, 0.5);
    this.torpedo6.rotation=3.15;
    
    //-> criar conjunto de particulas que sao ativas quando o jogador é atingido por uma bala
    this.emitter=this.game.add.emitter(0, 0, 100);
    this.emitter.makeParticles('coin');
    this.emitter.gravity = 200;
    this.game.physics.arcade.enable(this.emitter);
    this.emitter.enableBody=true;
    
},
    //-> configurar definiçoes jogador
    configurarJogador : function(){
        this.sprite = this.game.add.sprite(40, 550, 'phaser');
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.bounce.set(1);
        this.sprite.body.tilePadding.set(32);
        this.sprite.body.bounce.y = 0.2;
        this.sprite.body.gravity.y = 300;
        this.sprite.body.colliderWorldBounds = true;
        this.game.camera.follow(this.sprite);
        this.sprite.animations.add('walkLeft', [0, 1, 2, 3], 10, true);
        this.sprite.animations.add('walkRight', [5,6,7,8], 10, true);
        
    },
    //-> funcao para ativar as armas para dispararem
    dispara : function(){
        if(this.game.time.now>this.bulletTime1){
            this.torpedo1disparar();
        }
        if(this.game.time.now>this.bulletTime2){
            this.torpedo2disparar();
        }
        if(this.game.time.now>this.bulletTime3){
            this.torpedo3disparar();
        }
        if(this.game.time.now>this.bulletTime4){
            this.torpedo4disparar();
        }
        if(this.game.time.now>this.bulletTime5){
            this.torpedo5disparar();
        }
        if(this.game.time.now>this.bulletTime6){
            this.torpedo6disparar();
        }
    },
    
    torpedo1disparar : function(){
        this.soundDisp.play();
        bullet = this.bullets.getFirstExists(false);
        bullet.reset(this.torpedo1.body.x+5, this.torpedo1.body.y);
        this.game.physics.arcade.moveToObject(bullet, {x:250, y:0}, Math.floor(Math.random()*200)+100);
        this.bulletTime1 = this.game.time.now + Math.floor(Math.random()*7000)-2000;
    },
    
    torpedo2disparar : function(){
         this.soundDisp.play();
        bullet = this.bullets.getFirstExists(false);
        bullet.reset(this.torpedo2.body.x+5, this.torpedo2.body.y+30);
        this.game.physics.arcade.moveToObject(bullet, {x:500, y:600}, Math.floor(Math.random()*200)+100);
        this.bulletTime2 = this.game.time.now + Math.floor(Math.random()*7000)-2000;        
    },
    
    torpedo3disparar : function(){
        this.soundDisp.play();
        bullet = this.bullets.getFirstExists(false);
        bullet.reset(this.torpedo3.body.x+5, this.torpedo3.body.y);
        this.game.physics.arcade.moveToObject(bullet, {x:775, y:0}, Math.floor(Math.random()*200)+100);
        this.bulletTime3 = this.game.time.now + Math.floor(Math.random()*7000)-2000;        
    },
    
    torpedo4disparar : function(){
        this.soundDisp.play();
        bullet = this.bullets.getFirstExists(false);
        bullet.reset(this.torpedo4.body.x+5, this.torpedo4.body.y+30);
        this.game.physics.arcade.moveToObject(bullet, {x:1000, y:600}, Math.floor(Math.random()*200)+100);
        this.bulletTime4 = this.game.time.now + Math.floor(Math.random()*7000)-2000;        
    },
    
    torpedo5disparar : function(){
        this.soundDisp.play();
        bullet = this.bullets.getFirstExists(false);
        bullet.reset(this.torpedo5.body.x+5, this.torpedo5.body.y);
        this.game.physics.arcade.moveToObject(bullet, {x:1250, y:0}, Math.floor(Math.random()*200)+100);
        this.bulletTime5 = this.game.time.now + Math.floor(Math.random()*7000)-2000;
    },
    
    torpedo6disparar : function(){
        this.soundDisp.play();
        bullet = this.bullets.getFirstExists(false);
        bullet.reset(this.torpedo6.body.x+5, this.torpedo6.body.y+30);
        this.game.physics.arcade.moveToObject(bullet, {x:1400, y:600}, Math.floor(Math.random()*200)+100);
        this.bulletTime6 = this.game.time.now + Math.floor(Math.random()*7000)-2000;        
    },
        
    //-> funcao que move o jogador
    move : function (){
        
        this.sprite.body.velocity.x = 0;
        if (this.cursors.left.isDown){
            this.sprite.body.velocity.x = -150;
            this.sprite.animations.play('walkLeft');
        } else if (this.cursors.right.isDown){
            this.sprite.body.velocity.x = 150;
            this.sprite.animations.play('walkRight');
        }else{
            this.sprite.animations.stop();
            this.sprite.frame = 4;
        }
        //-> verifica se o jogador esta em contacto com o chao e salta
        if (this.cursors.up.isDown && this.sprite.body.touching.down || this.cursors.up.isDown && this.sprite.body.onFloor()){
            this.sprite.body.velocity.y = -300; 
        }
        
    },
    //-> funcao que atua quando o jogador colide com as moedas
    coletorCoins : function(sprite, coin){
        coin.kill();
        this.countCoins ++;
        this.textoNCoins.setText('Moedas: '+this.countCoins);
        this.pontuacao =this.countCoins* 10;  
        this.textoPontuacao.setText('Pontuação: ' + this.pontuacao);
    },
    //-> funcao ativa quando o jogador colide com as balas
    colideBullets : function (sprite, bullet){
        bullet.kill()
        this.atingido++;
    },
    //-> funcao ativa quando o jogador colide com as balas, para dar o efeito das moedas a cair
    animaExplode : function (){
        if(this.countCoins>0){
            this.emitter = this.game.add.emitter(this.sprite.body.x, this.sprite.body.y, this.countCoins);
            this.emitter.makeParticles('coin');
            this.emitter.start(false, 0, this.countCoins);
            this.countCoins=0; 
            this.pontuacao=0;
            this.textoNCoins.setText('Moedas: '+this.countCoins);
            this.textoPontuacao.setText('Pontuação: ' + this.pontuacao);
            this.soundCollide.play();
            
        }else{
            this.soundGame.pause();
            this.soundDeath.play();
            this.game.state.start("oJogo");
        }
        
    },
    // funcao que coloca o jogo em pausa ou ativo sempre que é chamada
    pausaGame: function() {
        // -- Estado do jogo em "PAUSE"
        var fundoMenu= this.game.add.image(600,340, 'fundoMenu');
        fundoMenu.anchor.setTo(0.5, 0.5);
		this.game.paused = true;        
        var style1 = {font: '20px', fill: '#000', align:'left', boundsAlignH: 'top', boundsAlignV:'top'}
        var mensagemTextoPausa = this.game.add.text( 600,400, "PAUSA\nPressione na área de jogo para continuar.",style1);
		mensagemTextoPausa.anchor.set(0.5);
        
        // -- função adicionada que irá aguardar que um qualquer tecla seja pressionada
        // -- -----------------------------------------
		this.input.onDown.add(function(){
                // -- "destrói" a mensagem de texto
			    mensagemTextoPausa.destroy();
                fundoMenu.destroy();
                // -- retira o estado do jogo de "PAUSE"
                this.game.paused = false;
		}, this);
        // -- -----------------------------------------
	}
    
    
    
}