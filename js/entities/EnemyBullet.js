game.EnemyBullet = me.Entity.extend({

    init: function (x, y, settings, direction) {
    	//constructor    
        this._super(me.Entity, 'init', [x, y , settings]);
		var timer;
		var currentShot;
        settings.name = "enemybullet";
		if (direction[0] == 1){
		this.currentShot = 1;
		} else if (direction[0] == 0) {
			this.currentShot = 0;
		} else if (direction[0] == 2) {
			this.currentShot = 2;
		} else if (direction[0] == 3) {
			this.currentShot = 3;
		}
		
         //conllision object
        if (this.body.shapes.length === 0) {
            this.body.addShape(new me.Rect(0, 0, this.width, this.height));
        }
		
		//set to projectile so doesn't hurt player
		this.body.collisionType = me.collision.types.ENEMY_OBJECT;
		this.body.setVelocity(7,7);
		this.alwaysUpdate = true;
        upOn = direction[0];
        downOn = direction[1];
        leftOn = direction[2];
        rightOn = direction[3];
        this.timer = 0;
    },
  
            
    update: function(dt) {
    	this.timer++;
    	
		if(this.currentShot == 0){
			this.body.vel.x = 0;
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
		}else if(this.CurrentShot== 2){
			this.body.vel.x = 0;
			this.body.vel.y += this.body.accel.y * me.timer.tick;
		}else if(this.currentShot == 3){ //left
			this.body.vel.y = -1;
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
		}else if(this.currentShot== 1){ // right
			this.body.vel.y = -1;
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
    	if (response.b.body.collisionType === me.collision.types.WORLD_SHAPE || response.b.body.collisonType === me.collision.types.ENEMY_OBJECT||response.b.body.collisonType === me.collision.types.PROJECTILE_OBJECT ){
 			me.game.world.removeChild(this);
 			return false;
    	}
        if(response.b.body.collisionType === me.collision.types.PLAYER_OBJECT){
               var choose = Math.floor((Math.random()*3)+1);
         
          switch(choose){
                case 1: me.audio.play("criminalscum", .5);
                        this.touchSound = true;
                        break;
                case 2: me.audio.play("stoprest", .5); this.touchSound = true;break;
                
                case 3: me.audio.play("freezescumbag", .5);this.touchSound = true; break;
                  
                default: me.audio.play("stoprest");this.touchSound = true; break;
          }
         
        game.data.hp -= 50;
        me.game.world.removeChild(this);
        }
        return true;
    }
});