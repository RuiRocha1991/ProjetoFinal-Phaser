var init = function (game){}

init.prototype = {

    create : function(){
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically=true;
        this.game.state.start("Preload");
    }
    
}