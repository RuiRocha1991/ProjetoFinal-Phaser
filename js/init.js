var init = function (game){}

init.prototype = {
    
    /*preload : function (){
        
        
    }, */
    create : function(){
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically=true;
        this.game.state.start("Preload");
    }
    
}