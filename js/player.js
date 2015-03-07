game.PlayerEntity = me.Entity.extend(
{
    init: function( x, y, settings )
    {
        settings = settings || {};
        settings.image = settings.image || "Player";
        settings.spritewidth = settings.spritewidth || 32;
        settings.spriteheight = settings.spriteheight || 32;
        settings.collidable = true;

        this.parent( x, y, settings );

        this.gravity = 0.0;
        this.origVelocity = new me.Vector2d( 7.0, 7.0 );
        this.setVelocity( this.origVelocity.x, this.origVelocity.y );
        this.setFriction( 0.35, 0.35 );
        this.direction = new me.Vector2d( 0.0, 1.0 );
        this.directionString = "down";

        var shape = this.getShape();
		shape.pos.x = 20;
		shape.resize(32, shape.height);

        var directions = [ "down", "left", "right", "up" ];
        for ( var i = 0; i < directions.length; i++ )
        {
            var index = i * 10;
            this.addAnimation( directions[ i ] + "idle", [ index ] );
            this.addAnimation( directions[ i ] + "run",
                [ index, index + 1, index, index + 2 ] );
        }

        this.setCurrentAnimation( "downidle" );
        this.animationspeed = 5;

        me.input.bindKey( me.input.KEY.LEFT, "left" );
        me.input.bindKey( me.input.KEY.RIGHT, "right" );
        me.input.bindKey( me.input.KEY.UP, "up" );
        me.input.bindKey( me.input.KEY.DOWN, "down" );

        me.game.viewport.follow( this.pos, me.game.viewport.AXIS.BOTH );
        me.game.viewport.setDeadzone( me.game.viewport.width / 10,
                                      me.game.viewport.height / 10 );

        me.game.player = this;
    },

    checkInput: function()
    {

        var tempDir = new me.Vector2d( 0.0, 0.0 );
		if ( me.input.isKeyPressed( "left" ) )
		{
			tempDir.x = -1.0;
			this.directionString = "left";
		}
		if ( me.input.isKeyPressed( "right" ) )
		{
			tempDir.x = 1.0;
			this.directionString = "right";
		}
		if ( me.input.isKeyPressed( "up" ) )
		{
			tempDir.y = -1.0;
			this.directionString = "up";
		}
		if ( me.input.isKeyPressed( "down" ) )
		{
			tempDir.y = 1.0;
			this.directionString = "down";
		}

		if ( tempDir.x != 0.0 || tempDir.y != 0.0 )
		{
			this.vel.x += tempDir.x * this.accel.x * me.timer.tick;
			this.vel.y += tempDir.y * this.accel.y * me.timer.tick;
			this.direction = tempDir;
		}
    },

    updateAnimation: function()
    {
        if ( this.vel.x != 0.0 || this.vel.y != 0.0 )
        {
            this.setCurrentAnimation( this.directionString + "run" );
        }
		else
        {
            this.setCurrentAnimation( this.directionString + "idle" );
        }
    },

    checkCollision: function( obj ) {
        return null;
    },

    update: function()
    {
        // check for collision with other objects
        var shape = me.game.collide(this);

        this.checkInput();

        this.updateAnimation();

        // stupid hack to make diagonal movement obey max velocity
        // (we can just use x since both components are the same)
        if ( this.vel.x != 0.0 && this.vel.y != 0.0 && this.vel.length() > this.maxVel.x )
        {
            var ratio = this.maxVel.x / this.vel.length();
            this.vel.x = this.vel.x * ratio;
            this.vel.y  = this.vel.y * ratio;
        }

        this.updateMovement();

        this.parent( this );
        return true;
    }
});