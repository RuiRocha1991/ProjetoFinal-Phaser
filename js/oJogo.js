var ojogo = function(game){
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
    var torpedos;
    var bullets;
 
}

ojogo.prototype={
    
create : function () {
    
    this.soundGame=this.game.add.audio('soundGame');
    this.soundGame.play();
        this.game.stage.backgroundColor='#000000';
    

    
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
    this.torpedos= this.game.add.group();
     this.coins= this.game.add.group();
            this.coins.enableBody=true;
            var x=100;
            var xTorpedo=150;
            while (x<1500){
                var coin = this.coins.create(x, Math.random()*300,'coin');
                coin.body.gravity.y=320;
                coin.body.velocity.x=0;
                x+=70;
                //-- atribuir elasticidade aliatoria
                coin.body.bounce.y=0.2;
                coin.animations.add('roda',[0, 1, 2, 3,4],10 , true);
                coin.play('roda');
                coin.anchor.setTo(0.5,0.5);
                
                var torpedo = this.torpedos.create(xTorpedo, 30, 'torpedo');
            }

        this.bullets=this.game.add.group();

},

update : function () {
    
 //filter.update();
    this.game.physics.arcade.collide(this.sprite, this.layer);
    this.game.physics.arcade.collide(this.coins, this.layer);
    this.game.physics.arcade.collide(this.coins, this.sprite);

    
    for(var i=0; i<this.torpedos.length;i++){
        var bullet = this.bullets.create(this.torpedos[i].x, 30,'bullet');
    }
    
    //  Un-comment these to gain full control over the sprite
    // sprite.body.velocity.x = 10;
    // sprite.body.velocity.y = 10;

      this.sprite.body.velocity.x = 0;
   
    
    if (this.cursors.up.isDown)
    {
        this.sprite.body.velocity.y = -150;
    }
    else if (this.cursors.down.isDown)
    {
        this.sprite.body.velocity.y = 150;
    }

    if (this.cursors.left.isDown)
    {
        this.sprite.body.velocity.x = -150;
    }
    else if (this.cursors.right.isDown)
    {
        this.sprite.body.velocity.x = 150;
    }

},

render : function () {

    //  Useful debug things you can turn on to see what's happening

    //game.debug.spriteBounds(sprite);
    //game.debug.cameraInfo(game.camera, 32, 32);
    //game.debug.body(sprite);
    //game.debug.bodyInfo(sprite, 32, 32);

}

    
}