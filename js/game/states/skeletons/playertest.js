/*  game/states/skeletons/playertest
    A dumb test map with smiley geometry shapes */
define(['game/keyDown', 'util/functional', 'util/vectorMath'], function (keyDown, F, VM) {return {
    spawnPlatform: function (name, x, y) {
        let plat = this.groups.solids.create(x, y, 'atlas', name);
        plat.scale.setTo(2);
        plat.body.immovable = true;
        plat.body.velocity.y = 60;
        plat.body.checkCollision.down = false;
        plat.body.checkCollision.left = false;
        plat.body.checkCollision.right = false;
        return plat;
    },
    create: function () {
		// Positioning the player at the start of the level
        this.player.x = this.game.width/2;
        this.player.y = 2*this.game.height/3;
		this.player.body.collideWorldBounds=true;
		
		// Use arcade physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		// Play audio
        this.game.audiosprite.play('spacelava');
		
		// Create 'solids' group
        this.groups.solids = this.add.group();
        this.groups.solids.enableBody = true;
		
		// Create 'hazards' group
		this.groups.hazards = this.add.group();
        this.groups.hazards.enableBody = true;
		
		// Create Lava
        let lava = this.groups.hazards.create(0, 550, 'atlas', 'lava-1');
        lava.width = 800;
        lava.height = 50;
        lava.animations.add('idle', ['lava-1', 'lava-2', 'lava-3', 'lava-4', 'lava-5'], 10, true);
        lava.animations.play('idle');

		// Setting a timer that will randomly generate platforms
		// starting from the top of the screen using 'spawnPlatform'
		this.timer = this.game.time.create(false);
		this.timer.loop(1300, function () {
		    this.spawnPlatform('platform-' + (Math.floor(Math.random()*3) + 1),
		        Math.random()*400, -100);
		}, this);
		this.timer.start();
		
		// send solids group the back
        this.world.sendToBack(this.groups.solids);
		
		// Generate initial platform
        let exampleplat = null;
        for(let i = -1; i<5; i++)
            exampleplat = this.spawnPlatform('platform-' + (Math.floor(Math.random()*3) + 1),
                Math.random()*400, i*75);
				
        let startplatform = this.spawnPlatform('platform-1',
            this.player.x - exampleplat.width/2,
            this.player.y + this.player.height/2);
    }
};});
