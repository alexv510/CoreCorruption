/**
 * core guy
 */
game.CoreEntity = me.Entity.extend( {    
 init: function(x, y, settings) {
     settings.image = "core";
      this.type == "EnemyEntity";
    var width = settings.width;
    var height = settings.height;	 
	var health;
	this.health = 50;
    settings.spritewidth = settings.width = 32;
    settings.spritewidth = settings.height = 32;
      this._super(me.Entity, 'init', [x, y , settings]);
	},

    onCollision : function (response, other) {
        //avoid further collision and delete it
       if (response.b.body.collisionType !== me.collision.types.WORLD_SHAPE) {
	         if (this.alive && (response.overlapV.y > 0)  || (response.overlapV.x > 0)) {
        this.renderable.flicker(750);
		} else {
				this.health--;
				}
		if (this.health <= 0) {
        me.game.world.removeChild(this);
	me.game.world.addChild(new me.Sprite(0,0,me.loader.getImage('endWin')), -10);
	}
        return false;
    }
	}
	
});
