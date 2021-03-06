game.RobotUp = me.Entity.extend({
  init: function(x, y, settings) {
    // define this here instead of tiled
     //var skin = Math.floor((Math.random()*6)+1);
      settings.name = "enemy";
   this.hp = 1200;
      settings.image = "robot";
        this.now = new Date().getTime();
      this.lastShot = this.now;
     this.touchSound = false;
      this.prevMove = 0;
    // save the area size defined in Tiled
    var width = settings.width;
    var height = settings.height;
    this.type = "EnemyEntity";
    // adjust the size setting information to match the sprite size
    // so that the entity object is created with the right size
    settings.spritewidth = settings.width = 32;
    settings.spriteheight = settings.height = 32;
     
    // call the parent constructor
    this._super(me.Entity, 'init', [x, y , settings]);
     
	 this.body.gravity = 0;
	 
    // set start/end position based on the initial area size
    y = this.pos.y;
    this.startY = y;
    this.endY   = y + height - settings.spriteheight;
    this.pos.y  = y + height - settings.spriteheight;
 
    // manually update the entity bounds as we manually change the position
    this.updateBounds();
	
	this.body.collisionType = me.collision.types.ENEMY_OBJECT;
 
 this.renderable.flipX(this.walkLeft);
    // to remember which side we were walking
    this.walkLeft = false;

	
 this.renderable.addAnimation("run_down", [0,1,2] );
      this.renderable.addAnimation("run_up", [9,10,11] );
    // walking & jumping speed
    this.body.setVelocity(2, 3);
     
  },
 
  // manage the enemy movement
  update: function(dt) {
 this.now = new Date().getTime();
    if (this.alive) {
        if(this.hp <= 0) me.game.world.removeChild(this);
      if (this.walkLeft && this.pos.y <= this.startY) {
      this.walkLeft = false;
           this.touchSound = false; // here is where I change it to false
          this.body.setVelocity( Math.floor((Math.random()*5)+1), Math.floor((Math.random()*5)+1));
    } else if (!this.walkLeft && this.pos.y >= this.endY) {
      this.walkLeft = true;
         this.touchSound = false; // here is where I change it to false
        this.body.setVelocity( Math.floor((Math.random()*5)+1), Math.floor((Math.random()*5)+1));
    }
    // make it walk
   // this.renderable.flipX(this.walkLeft);
         var buffer = this.walkLeft ? -32:32;
        if((Math.round(this.now/1000)%2 === 0) && ((this.now - this.lastShot) >= 500)){
                this.lastShot = this.now;
                var bullet = me.pool.pull("EnemyBullet", this.pos.x, this.pos.y+buffer, {
				image: 'bullet',
				spritewidth: 24,
				spriteheight: 24,
				width: 24,
				height: 24
			}, [this.prevMove, downOn, leftOn, rightOn]);
			me.game.world.addChild(bullet, this.z);
        }
        
     if(this.walkLeft){
         this.prevMove = 0;
            this.body.vel.y +=-this.body.accel.y * me.timer.tick;
            if(!this.renderable.isCurrentAnimation("run_down")){
        this.renderable.setCurrentAnimation("run_down");
            }
        }else if(!this.walkLeft){
            this.prevMove = 2;
                    this.body.vel.y +=this.body.accel.y * me.timer.tick;
            if(!this.renderable.isCurrentAnimation("run_up")){
              this.renderable.setCurrentAnimation("run_up");
            }
        
     
    } else {
      this.body.vel.x = 0;
    }
     
    } else {
      this.body.vel.y = 0;
    }
           
    // update the body movement
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
  if(response.b.body.collisionType === me.collision.types.PROJECTILE_OBJECT) {
      this.hp -= 10;
        this.renderable.flicker(750);
  }
      
      if (this.alive && ((response.overlapV.y >= 0)  || (response.overlapV.x >= -5)) && response.b.body.collisionType === me.collision.types.PLAYER_OBJECT ) {

          //here i removed flickering and added audio stuff
         var choose = Math.floor((Math.random()*3)+1);
         if(this.touchSound == false){
          switch(choose){
                case 1: me.audio.play("criminalscum", .5);
                        this.touchSound = true;
                        break;
                case 2: me.audio.play("stoprest", .5); this.touchSound = true;break;
                
                case 3: me.audio.play("freezescumbag", .5);this.touchSound = true; break;
                  
                default: me.audio.play("stoprest");this.touchSound = true; break;
          }
         }
          
      }
         if ((response.overlapV.x >= -5)&& response.b.body.collisionType !== me.collision.types.PLAYER_OBJECT){
                //this.moveV = false;
            this.walkLeft = this.walkLeft ? false: true;
             this.body.setVelocity( Math.floor((Math.random()*5)+1), Math.floor((Math.random()*5)+1));
         }
       
      return false;
    }
       if ((response.overlapV.x >= -5)&& response.b.body.collisionType !== me.collision.types.PLAYER_OBJECT){
                this.walkLeft = this.walkLeft ? false: true;
           this.body.setVelocity( Math.floor((Math.random()*5)+1), Math.floor((Math.random()*5)+1));
         }
      //this.touchSound = false;
    // Make all other objects solid
    return true;
}
});