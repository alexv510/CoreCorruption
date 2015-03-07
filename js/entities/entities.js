/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({

    /**
     * constructor
     */
    init:function (x, y, settings) {
        // call the constructor
		settings.image = "player";
		
		var width = settings.width;
		var height = settings.height;
		
		settings.spritewidth = settings.width = 32;
		settings.spritewidth = settings.height = 32;
		
        this._super(me.Entity, 'init', [x, y , settings]);
		
		this.body.gravity = 0.0;
		
		this.body.setVelocity(3,3);
		
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		
		this.alwaysUpdate = true;
		
		this.renderable.addAnimation("run_right", [24,25,26,27,28] );
		this.renderable.addAnimation("run_left", [12,13,14,15,16]);
		this.renderable.addAnimation("run_down", [0,1,2,3,4]);
		this.renderable.addAnimation("run_up", [36, 37, 38, 39, 40]);
		this.renderable.addAnimation("stand", [24]);
		this.renderable.addAnimation("downstand", [0]);
		this.renderable.addAnimation("upstand", [36]);
		this.renderable.setCurrentAnimation("stand");
		
    },

    /**
     * update the entity
     */
    update : function (dt) {
		
		if(me.input.isKeyPressed('left')) {
			this.renderable.flipX(true);
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			
			if(!this.renderable.isCurrentAnimation("run_right")){
				this.renderable.setCurrentAnimation("run_right");
			}
		} 
		else if(me.input.isKeyPressed('right')){
			this.renderable.flipX(false);
			this.body.vel.x += this.body.accel.x* me.timer.tick;
			if(!this.renderable.isCurrentAnimation("run_right")){
				this.renderable.setCurrentAnimation("run_right");
			}
		}
		else if(me.input.isKeyPressed('down')){
			this.renderable.setCurrentAnimation("run_down");
			this.renderable.flipY(false);
			this.body.vel.y += this.body.accel.y*me.timer.tick;
			if(!this.renderable.isCurrentAnimation("run_down")){
				this.renderable.setCurrentAnimation("run_down");
			}
		}
		else if(me.input.isKeyPressed('up')){
			this.renderable.setCurrentAnimation("run_up");
			this.body.vel.y -= this.body.accel.y* me.timer.tick;
			if(!this.renderable.isCurrentAnimation("run_up")){
				this.renderable.setCurrentAnimation("run_up");
			}
		}
		else{
			this.body.vel.x = 0;
			this.body.vel.y=0;
			this.renderable.setCurrentAnimation("stand");
		}

        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) {
        // Make all other objects solid
        return true;
    }
});