var init = function (game){}

init.prototype = {

    create : function(){
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically=true;
        //--> inicia o estado para carregar os dados necessários para o jogo
        this.game.state.start("Preload");
    }
    
}