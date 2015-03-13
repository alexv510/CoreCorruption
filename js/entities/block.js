game.Block = me.Entity.extend({
	init: function(x,y, settings) {
		settings.image = "metal_box";
		var width = settings.width;
		var height = settings.height;
		
		settings.spritewidth = settings.width = 32;
		settings.spriteheight = settings.height = 32;
		
		this._super(me.Entity, 'init', [x,y,settings]);
		
		},
		
		update: function(dt){
			if(game.data.score == 5){
				me.game.world.removeChild(this);
			}
		},
		
		onCollision : function (response, other) {
			if (response.b.body.collisionType !== me.collision.types.WORLD_SHAPE) {
				// res.y >0 means touched by something on the bottom
				// which mean at top position for this one
				if (this.alive && (response.overlapV.y > 0) && response.a.body.falling) {
					this.renderable.flicker(750);
				}
				return false;
			}
				// Make all other objects solid
			return true;
		}
			
});