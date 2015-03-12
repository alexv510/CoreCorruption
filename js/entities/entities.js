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
		this.type= "PlayerEntity";
		var width = settings.width;
		var height = settings.height;

		settings.spritewidth = settings.width = 32;
		settings.spritewidth = settings.height = 32;
		
		var upOn;
		var leftOn;
		var rightOn;
		var downOn;
		
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

		if(me.input.isKeyPressed('left') && leftOn == 1) {
			rightOn = 0;
			upOn = 0;
			downOn = 0;
			this.renderable.flipX(true);
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			if(!this.renderable.isCurrentAnimation("run_right")){
				this.renderable.setCurrentAnimation("run_right");
			}
		} 
		else if(me.input.isKeyPressed('right') && rightOn == 1){
			leftOn = 0;
			downOn = 0;
			upOn = 0;
			this.renderable.flipX(false);
			this.body.vel.x += this.body.accel.x* me.timer.tick;
			if(!this.renderable.isCurrentAnimation("run_right")){
				this.renderable.setCurrentAnimation("run_right");
			}
		}
		else if(me.input.isKeyPressed('down') && downOn == 1){
			leftOn = 0;
			upOn = 0;
			rightOn = 0;
			this.body.vel.y += this.body.accel.y*me.timer.tick;
			 if(!this.renderable.isCurrentAnimation("run_down")){
				this.renderable.setCurrentAnimation("run_down");
			}
		}
		else if(me.input.isKeyPressed('up') && upOn == 1){
			leftOn = 0;
			downOn = 0;
			rightOn = 0;
			this.body.vel.y -= this.body.accel.y* me.timer.tick;
			if(!this.renderable.isCurrentAnimation("run_up")){
				this.renderable.setCurrentAnimation("run_up");
			}
		}
		else{
			this.body.vel.x = 0;
			this.body.vel.y=0;
			rightOn = 1;
			leftOn = 1;
			upOn = 1;
			downOn = 1;

		}
		if (this.body.vel.x == 0 && this.body.vel.y == 0) {
				if (this.renderable.isCurrentAnimation("run_up")) {
				this.renderable.setCurrentAnimation("up_stand")
			} else if (this.renderable.isCurrentAnimation("run_right")) {
				this.renderable.setCurrentAnimation("right_stand");
			} else if (this.renderable.isCurrentAnimation("run_left")) {
				this.renderable.setCurrentAnimation("left_stand");
			} else if (this.renderable.isCurrentAnimation("run_down")) {
				this.renderable.setCurrentAnimation("down_stand");
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
		if (response.b.body.collisionType !== me.collision.types.WORLD_SHAPE) {
      // res.y >0 means touched by something on the bottom
      // which mean at top position for this one
      if (this.alive && (response.overlapV.y > 0)  || (response.overlapV.x > 0)&& response.b.type=== 'EnemyEntity') {
        this.renderable.flicker(750);
      }
      return false;
    }
        // Make all other objects solid
        return true;
    },
	
	
});