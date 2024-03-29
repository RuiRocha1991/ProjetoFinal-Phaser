 var apre = function(game){
     var sprite;
     var filter;
     var logo;
     var bmpText;
     var texto;
     
 }
 
 apre.prototype={    
     
     create : function(){
         //--> declarar o som que vai ser executado na introdução do jogo
         this.game.soundIntro = this.game.add.audio('intro');
         //--> declarar o som que vai ser utilizado sempre que é realizado algum click
         this.game.soundClick= this.game.add.audio('menuClick');
         //--> inicia o som de introdução
         this.game.soundIntro.play();
         //--> variavel com metodos para apresentar o efeito no ecra de apresentação
         var fragmentSrc = [

        "precision mediump float;",

        "uniform float     time;",
        "uniform vec2      resolution;",
        "uniform sampler2D iChannel0;",

        "void main( void ) {",

            "float t = time;",

            "vec2 uv = gl_FragCoord.xy / resolution.xy;",
            "vec2 texcoord = gl_FragCoord.xy / vec2(resolution.y);",

            "texcoord.y += t*0.2;",

            "float zz = 1.0/(1.0-uv.y*1.7);",
            "texcoord.y += zz * sign(zz);",

            "vec2 maa = texcoord.xy * vec2(zz, 1.0) - vec2(zz, 0.0) ;",
            "vec2 maa2 = (texcoord.xy * vec2(zz, 1.0) - vec2(zz, 0.0))*0.3 ;",
            "vec4 stone = texture2D(iChannel0, maa);",
            "vec4 blips = texture2D(iChannel0, maa);",
            "vec4 mixer = texture2D(iChannel0, maa2);",

            "float shade = abs(1.0/zz);",

            "vec3 outp = mix(shade*stone.rgb, mix(1.0, shade, abs(sin(t+maa.y-sin(maa.x))))*blips.rgb, min(1.0, pow(mixer.g*2.1, 2.0)));",
            "gl_FragColor = vec4(outp,1.0);",

        "}"
    ];

            //--> carrega a textura apresentada no ecra de apresentação
            this.sprite = this.game.add.sprite(0, 0, 'wood');
            this.sprite.width = 1200;
            this.sprite.height = 600;


            var customUniforms = {
                iChannel0: { type: 'sampler2D', value: this.sprite.texture, textureData: { repeat: true } }
            };
            
            //--> associar a textura de fundo do ecra apresentação
            this.filter = new Phaser.Filter(this.game, customUniforms, fragmentSrc);
            this.filter.setResolution(1200, 600);
            this.sprite.filters = [ this.filter ];
            //--> imagem com o logo da instituíção
            this.logo= this.game.add.sprite(600,300,"logo");
            this.logo.scale.setTo(0.5,0.5);
            this.logo.anchor.setTo(0.5,0.5);
            //--> imagem com as informações do autor
            this.texto= this.game.add.image(600,425, 'autor');
            this.texto.scale.setTo(0.5,0.5);  
            this.texto.anchor.set(0.5);      
     },          
    update : function () {       
        
        this.filter.update();
        this.game.add.tween(this.logo.scale).to( { x: 1, y: 1}, 1000, Phaser.Easing.Linear.None, true);
        this.game.add.tween(this.texto.scale).to( { x: 1, y: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);
       
        //--> butao para iniciar o jogo
        var btnPlay = this.game.add.image(600, 550, "pressKey");
        btnPlay.anchor.setTo(0.5, 0.5);
        var enter= this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        
        if(enter.isDown){
              this.iniciaJogo();
        }
        
    },
    
    iniciaJogo : function(){
        this.game.soundClick.volume=1;
        this.game.soundClick.play();
        //--> inicia o estado menu
        this.game.state.start("Menu");    
    }
     
     

     
     
 }