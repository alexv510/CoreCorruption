//@@ -0,0 +1,105 @@
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
		
		this.renderable.addAnimation("run_right", [6,7,8] );
		this.renderable.addAnimation("run_left", [3,4,5]);
		this.renderable.addAnimation("run_down", [0,1,2]);
		this.renderable.addAnimation("run_up", [9, 10, 11]);
		this.renderable.addAnimation("left_stand", [3]);
		this.renderable.addAnimation("right_stand", [6]);
		this.renderable.addAnimation("down_stand", [0]);
		this.renderable.addAnimation("up_stand", [9]);
		this.renderable.setCurrentAnimation("right_stand");
		
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
			this.body.vel.y += this.body.accel.y*me.timer.tick;
			 if(!this.renderable.isCurrentAnimation("run_down")){
				this.renderable.setCurrentAnimation("run_down");
			}
		}
		else if(me.input.isKeyPressed('up')){
			this.body.vel.y -= this.body.accel.y* me.timer.tick;
			if(!this.renderable.isCurrentAnimation("run_up")){
				this.renderable.setCurrentAnimation("run_up");
			}
		}
		else{
			this.body.vel.x = 0;
			this.body.vel.y=0;
			
			if(me.input.isKeyPressed("up")){
				this.renderable.setCurrentAnimation("up_stand");
			}
			else if (me.input.isKeyPressed("down")){
				this.renderable.setCurrentAnimation("down_stand");
			}
			else{
				this.renderable.setCurrentAnimation("right_stand");
			}
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
// No newline at end of file
