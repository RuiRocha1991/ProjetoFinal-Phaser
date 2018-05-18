 var input = function(game){
     var sprite;
     var filter;
  

 }
 
 input.prototype={
     
     preload : function(){
         this.game.load.image('wood', 'assets/wood.png');
       
     },
     
     create : function(){
         this.scale.pageAlignHorizontally = true;
         this.scale.pageAlignVertically=true;
         var fragmentSrc = [

        "precision mediump float;",

        "uniform float     time;",
        "uniform vec2      resolution;",
        "uniform sampler2D iChannel0;",

        "void main( void ) {",

            "float t = time;",

            "vec2 uv = gl_FragCoord.xy / resolution.xy;",
            "vec2 texcoord = gl_FragCoord.xy / vec2(resolution.y);",

            "texcoord.y -= t*0.2;",

            "float zz = 1.0/(1.0-uv.y*1.7);",
            "texcoord.y -= zz * sign(zz);",

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

    //  Texture must be power-of-two sized or the filter will break
    this.sprite = this.game.add.sprite(0, 0, 'wood');
    this.sprite.width = 1200;
    this.sprite.height = 600;
         

    var customUniforms = {
        iChannel0: { type: 'sampler2D', value: this.sprite.texture, textureData: { repeat: true } }
    };

    this.filter = new Phaser.Filter(this.game, customUniforms, fragmentSrc);
    this.filter.setResolution(1200, 600);

    this.sprite.filters = [ this.filter ];
         
     },
          
    update : function () {
        
        this.filter.update();
        
    }

     
     
 }