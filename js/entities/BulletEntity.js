game.BulletEntity = me.Entity.extend({

    init: function (x, y, settings, direction) {
    	//constructor    
        this._super(me.Entity, 'init', [x, y , settings]);
         //conllision object
        if (this.body.shapes.length === 0) {
            this.body.addShape(new me.Rect(0, 0, this.width, this.height));
        }
		
		//set to projectile so doesn't hurt player
		this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
		this.body.setVelocity(8, 8);
		this.alwaysUpdate = true;
        upOn = direction[0];
        downOn = direction[1];
        leftOn = direction[2];
        rightOn = direction[3];
        this.timer = 0;
    },
  
            
    update: function(dt) {
    	this.timer++;
    	
		if(upOn){
			this.body.vel.x = 0;
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
		}else if(downOn){
			this.body.vel.x = 0;
			this.body.vel.y += this.body.accel.y * me.timer.tick;
		}else if(leftOn){
			this.body.vel.y = 0;
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
		}else if(rightOn){
			this.body.vel.y = 0;
			this.body.vel.x += this.body.accel.x * me.timer.tick;
		}
		
		if(this.timer % 80 == 0){
			me.game.world.removeChild(this);
		}
        // update the body movement
        this.body.update(dt);
        me.collision.check(this);
        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0); 
        
    },
   
    /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) { 
    	if (response.b.body.collisionType === me.collision.types.WORLD_SHAPE){
 			me.game.world.removeChild(this);
 			return false;
    	}
        return false;
    }
});