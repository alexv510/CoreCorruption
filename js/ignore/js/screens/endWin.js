game.endWin = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        // me.audio.playTrack("theme");
        me.game.world.addChild(new me.Sprite(0,0,me.loader.getImage('endWin')), -10);
        me.input.bindKey(me.input.KEY.ENTER, "start");// TODO
        //this is how we place text on the game.
       me.game.world.addChild(new (me.Renderable.extend({
            init: function(){
                this._super(me.Renderable, 'init', [400,30,me.game.viewport.width, me.game.viewport.height]);
              
            },
            

        })));
        
        //event handle to listen for input, use this when there is no update function
        this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge){
                                         if(action === "start"){
                                                me.state.change(me.state.PLAY);

        }
   });
      //  me.audio.playTrack("theme");
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
    //it is important to unbind keys when chaging scenes and to unsuscribe to listeners
        me.input.unbindKey(me.input.KEY.ENTER);
    me.event.unsubscribe(this.handler);// TODO
         me.audio.stopTrack();
    }
});
