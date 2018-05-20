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
    var bulletTime=0;
}

ojogo.prototype={
    
    create : function () {
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
        this.layer = this.map.createLayer('Tile Layer 1');
        this.layer.resizeWorld();
        this.map.setCollisionBetween(1, 12);


        this.sprite = this.game.add.sprite(40, 300, 'phaser');
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.bounce.set(0.6);
        this.sprite.body.tilePadding.set(32);
        this.sprite.body.bounce.y = 0.2;
        this.sprite.body.gravity.y = 300;
        this.sprite.body.colliderWorldBounds = true;
        this.game.camera.follow(this.sprite);
        this.game.physics.arcade.gravity.y = 200;
        this.cursors = this.game.input.keyboard.createCursorKeys();



        this.coins= this.game.add.group();
        this.game.physics.arcade.enable(this.coins);
        this.coins.enableBody=true;

        this.torpedos= this.game.add.group();
        this.game.physics.arcade.enable(this.torpedos);

        this.bullets=this.game.add.group();
        this.game.physics.arcade.enable(this.bullets);
  


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

        this.torpedo1 = this.game.add.image(150, 70, 'torpedo');
        this.torpedo1.rotation=3.15;


        for (var i = 0; i < 20; i++)
        {
            var b = this.bullets.create(0, 0, 'bullet');
            b.name = 'bullet' + i;
            b.exists = false;
            b.visible = false;
            b.checkWorldBounds = true;
        }


},

update : function () {
    
    this.game.physics.arcade.collide(this.sprite, this.layer);
    this.game.physics.arcade.collide(this.coins, this.layer);
    this.game.physics.arcade.collide(this.coins, this.sprite);
    this.game.physics.arcade.collide(this.torpedos, this.sprite);
    

    this.sprite.body.velocity.x = 0;
   
    
    if (this.cursors.up.isDown /*&& this.sprite.body.touching.down*/)
    {
        this.sprite.body.velocity.y = -150;
    }

    if (this.cursors.left.isDown)
    {
        this.sprite.body.velocity.x = -150;
    }
    else if (this.cursors.right.isDown)
    {
        this.sprite.body.velocity.x = 150;
    }
    
    if (this.game.time.now > this.bulletTime)
    {
        var bullet = this.bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(this.torpedo1.x, this.torpedo1.y);
            bullet.body.velocity.y = 300;
            this.bulletTime = this.game.time.now + 150;
        }
    }

},

render : function () {

    
},
    
    
    
}