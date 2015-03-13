game.DeathScreen = me.ScreenObject.extend({
	 /**    
   *  action to perform on state change
   */
  onResetEvent : function() {       
    // title screen
    me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage("deathscreen")), 1);
	me.input.bindKey(me.input.KEY.ENTER, "start", true);
    // add a new renderable component with the scrolling text
    me.game.world.addChild(new (me.Renderable.extend ({
      // constructor
      init : function() {
        this._super(me.Renderable, 'init', [400, 30, me.game.viewport.width, me.game.viewport.height]);
        // font for the scrolling text
		this.font = new me.BitmapFont("32x32_font", 16);
      },
       
      draw : function (renderer) {
		this.font.draw(renderer, "GAME OVER", 320, 240);
		this. font.draw(renderer, "Press Enter to Re-Play", 320, 200);
      },
    })));

    this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
      if (action === "start") {
        // play something on tap / enter
        me.state.change(me.state.MENU);
      }
    });
  },
 
  /**    
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
    me.input.unbindKey(me.input.KEY.ENTER);
    me.event.unsubscribe(this.handler);
  }
});