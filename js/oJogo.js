var ojogo = function(game){
    var background;
    var map;
    var layer;
    var cursors;
    var sprite;
    var estrelas;
    var coins;
    var bg;
    var anim;
    var filter;
    var sprite;
    var soundGame;
    var torpedo1;
    var torpedo2;
    var torpedo3;
    var bullets;
    var soundStep1;
    var sounStep2;
    var soundJump;
    var bulletTime;
    var explode;
}
 var bullet;
ojogo.prototype={
    
    create : function () {
        this.bulletTime=0;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.addElementos();
        this.configurarJogador();
        this.cursors = this.game.input.keyboard.createCursorKeys();
        var x=100;
        while (x<1500){
            var coin = this.coins.create(x, Math.random()*300,'coin');
            coin.body.gravity.y=320;
            coin.body.velocity.x=0;
            coin.body.bounce.y=0.2;
            coin.animations.add('roda',[0, 1, 2, 3,4],10 , true);
            coin.play('roda');
            coin.anchor.setTo(0.5,0.5);
            x+=70;
        }

        



},

update : function () {
    
    this.game.physics.arcade.collide(this.sprite, this.layer);
    this.game.physics.arcade.collide(this.coins, this.layer);
    this.game.physics.arcade.collide(this.sprite,this.torpedo1 );
    this.game.physics.arcade.overlap(this.sprite, this.coins, this.coletorCoins,null, this);
    this.game.physics.arcade.overlap(this.sprite, this.bullets, this.colideBullets,null, this);
    this.move();
    
    //console.log(this.game.time.now );
   console.log('Bullet Time: '+ this.bulletTime );
    if (this.game.time.now > this.bulletTime)
    {
        this.disparar();
        console.log(this.game.time.now );
    }

},

addElementos : function(){
    this.soundGame=this.game.add.audio('soundGame');
    this.soundGame.play();
    this.soundStep1= this.game.add.audio('step1');
    this.soundStep2= this.game.add.audio('step2');
    this.soundJump= this.game.add.audio('jump');
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
    //this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);

    this.explode= this.game.add.sprite(0,0, 'background');
    this.game.physics.arcade.enable(this.explode);
    this.explode.enableBody=true;
    
    this.torpedo1 = this.game.add.sprite(250, 600, 'torpedo');
    this.game.physics.arcade.enable(this.torpedo1);
    this.torpedo1.enableBody=true;
    this.torpedo1.body.immovable = true;
    this.torpedo1.anchor.setTo(0.5, 0.5);
    //this.torpedo1.rotation=3.15;
    
},
    
    configurarJogador : function(){
        this.sprite = this.game.add.sprite(40, 300, 'phaser');
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.bounce.set(1);
        this.sprite.body.tilePadding.set(32);
        this.sprite.body.bounce.y = 0.2;
        this.sprite.body.gravity.y = 300;
        this.sprite.body.colliderWorldBounds = true;
        this.game.camera.follow(this.sprite);
        
    },
    
    disparar : function(){
        console.log("dispara");
        bullet = this.bullets.getFirstExists(false);
            bullet.reset(this.torpedo1.body.x+5, this.torpedo1.body.y);
           
            this.game.physics.arcade.moveToObject(bullet, {x:250, y:0}, 200);
            //bullet.body.velocity.y = -300;
            this.bulletTime = this.game.time.now + Math.floor(Math.random()*5000)-2000;
        
        
    },
    
    move : function (){
        
        this.sprite.body.velocity.x = 0;
        if (this.cursors.left.isDown)
    {
        this.sprite.body.velocity.x = -150;
    }
    else if (this.cursors.right.isDown)
    {
        this.sprite.body.velocity.x = 150;
    }
    
    if (this.cursors.up.isDown && this.sprite.body.touching.down || this.cursors.up.isDown && this.sprite.body.onFloor())
    {
        this.sprite.body.velocity.y = -300;
    }
        
    },
    
    render : function(){
   // this.game.debug.body(this.torpedo1);
    },
    
    coletorCoins : function(sprite, coin){
        coin.kill();
    },
    
    
    colideBullets : function (sprite, bullet){
        bullet.kill();
        coin.animations.add('roda',[0, 1, 2, 3,4],10 , true);
        coin.play('roda');
    }
    
    
    
}