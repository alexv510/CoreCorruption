/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({

    /**
     * constructor
     */
	 
    init:function (x, y, settings) {
        // call the constructor
       this.bosslevel = false;
		settings.image = "player";
		var width = settings.width;
		var height = settings.height;
        this.shotEnd = false;
         if(me.levelDirector.getCurrentLevelId() === 'lvl1'||me.levelDirector.getCurrentLevelId() === 'lvl2'){
             //this.bosslevel = true;
            me.audio.stopTrack();
            me.audio.playTrack("LevelSong");
        }else    if(me.levelDirector.getCurrentLevelId() === 'message2'||me.levelDirector.getCurrentLevelId() === 'message3'){
             //this.bosslevel = true;
            me.audio.stopTrack();
            me.audio.playTrack("story");
        }

		settings.spritewidth = settings.width = 32;
		settings.spritewidth = settings.height = 32;
		
		var upOn;
		var leftOn;
		var rightOn;
		var downOn;
		var lastMove;
		
        this._super(me.Entity, 'init', [x, y , settings]);
		
		this.body.gravity = 0.0;
		
		this.body.setVelocity(2,2);
		
		this.body.collisionType = me.collision.types.PLAYER_OBJECT;
		
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
        
		 if(me.levelDirector.getCurrentLevelId() === 'lvl3' && this.bosslevel == false){
             this.bosslevel = true;
            me.audio.stopTrack();
            me.audio.playTrack("boss");
        }
		if(me.input.isKeyPressed('shoot') && me.levelDirector.getCurrentLevelId() === 'lvl3'){
			var bullet = me.pool.pull("BulletEntity", this.pos.x, this.pos.y, {
				image: 'bullet',
				spritewidth: 24,
				spriteheight: 24,
				width: 24,
				height: 24
			}, [upOn, downOn, leftOn, rightOn]);
			me.game.world.addChild(bullet, this.z);
		}
		if(me.input.isKeyPressed('left') && leftOn == 1) {
			rightOn = 0;
			upOn = 0;
			downOn = 0;
			lastMove = 3;
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
			lastMove = 1;
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
			lastMove = 2;
			this.body.vel.y += this.body.accel.y*me.timer.tick;
			 if(!this.renderable.isCurrentAnimation("run_down")){
				this.renderable.setCurrentAnimation("run_down");
			}
		}
		else if(me.input.isKeyPressed('up') && upOn == 1){
			leftOn = 0;
			downOn = 0;
			rightOn = 0;
			lastMove = 0;
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
		
		if(game.data.hp <= 0){
            me.audio.disable();
            me.audio.enable();
            me.audio.stopTrack();
            me.audio.stop("criminalscum");
            me.audio.stop("freezescumbag");
            me.audio.stop("stoprest");
            if(this.shotEnd == false){
                this.shotEnd = true;
            me.audio.play("LoudBang",   1);
            }
			me.state.change(me.state.GAMEOVER);
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
		switch (response.b.body.collisionType) {
		    case me.collision.types.WORLD_SHAPE:
		    	if (other.type === "platform") {
		        	if (this.body.falling && !me.input.isKeyPressed('down') && (response.overlapV.y > 0) && (~~this.body.vel.y >= ~~response.overlapV.y)) {
		          		// Disable collision on the x axis
		          		response.overlapV.x = 0;
		          		// Respond to the platform (it is solid)
		          		return true;
		        	}
		        // Do not respond to the platform (pass through)
		        	return false;
		      	}
		      	break;
	 
		    case me.collision.types.ENEMY_OBJECT:
				//flicker in case we touched an enemy
				//if flickering, don't deduct hp until done flickering
                
	        	if (other.name == "enemy" ){
	        		if(!this.renderable.isFlickering()){
	        			this.renderable.flicker(750);
	        			game.data.hp -= 15;
	        		}
	        	}
                if( other.name === 'enemybullet'){
                    if(response.overlapV.X >= -5 || response.overlapV.Y <= -5){
                        if(!this.renderable.isFlickering()){
	        			this.renderable.flicker(750);
	        			game.data.hp -= 50;
	        		}
                    }
                }
		      	return false;
		      	break;
            
		    default:
		    	// Do not respond to other objects (e.g. coins)
		      	return false;
		  }
	
	 	  // Make the object solid
	  	  return true;
    },
});