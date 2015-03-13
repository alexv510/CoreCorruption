game.Block = me.Entity.extend({
	init: function(x,y, settings) {
		settings.image = "metal_box";
		var width = settings.width;
		var height = settings.height;
		
		settings.spritewidth = settings.width = 32;
		settings.spriteheight = settings.height = 32;
		
		this._super(me.Entity, 'init', [x,y,settings]);
        this.body.gravity = 0.0;
         x = this.pos.x;
    this.startX = x;
         x = this.pos.y;
    this.startY = y;
		this.body.collisionType = me.collision.types.WORLD_SHAPE;
		},
		
		update: function(dt){
            this.pos.x = this.startX;
            this.pos.y = this.startY;
            this.body.vel.x = 0;
            this.body.vel.y = 0;
			if(game.data.score >= 5){
				me.game.world.removeChild(this);
			}
                // update the body movement
    this.body.update(dt);
     
    // handle collisions against other shapes
    me.collision.check(this);
      
       
    // return true if we moved or if the renderable was updated
    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
		},
		
		onCollision : function (response, other) {
			/*if (response.b.body.collisionType !== me.collision.types.WORLD_SHAPE) {
				// res.y >0 means touched by something on the bottom
				// which mean at top position for this one
				
				return false;
			}*/
				// Make all other objects solid
			return true;
		}
			
});