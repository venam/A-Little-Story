var chain_game = new Phaser.Game(500, 430, Phaser.AUTO, 'chain', { preload: preload, create: create });

function preload() {
    chain_game.load.spritesheet('chain', 'assets/chain.png', 16, 26);
}

function create() {
    chain_game.physics.startSystem(Phaser.Physics.P2JS);
    chain_game.physics.p2.gravity.y = 1200;

	chain_game.stage.backgroundColor = '#E54239';

    //  Length, xAnchor, yAnchor
}

function createRope(length, xAnchor, yAnchor) {

    var lastRect;
    var height = 20;        //  Height for the physics body - your image height is 8px
    var width = 16;         //  This is the width for the physics body. If too small the rectangles will get scrambled together.
    var maxForce = 20000;   //  The force that holds the rectangles together.

    for (var i = 0; i <= length; i++)
    {
        var x = xAnchor;                    //  All rects are on the same x position
        var y = yAnchor + (i * height);     //  Every new rect is positioned below the last

        if (i % 2 === 0)
        {
            //  Add sprite (and switch frame every 2nd time)
            newRect = chain_game.add.sprite(x, y, 'chain', 1);
        }   
        else
        {
            newRect = chain_game.add.sprite(x, y, 'chain', 0);
            lastRect.bringToTop();
        }

        //  Enable physicsbody
        chain_game.physics.p2.enable(newRect, false);

        //  Set custom rectangle
        newRect.body.setRectangle(width, height);

        if (i === 0)
        {
            newRect.body.static = true;
        }
        else
        {  
            //  Anchor the first one created
            newRect.body.velocity.x = 400;      //  Give it a push :) just for fun
            newRect.body.mass = length / i;     //  Reduce mass for evey rope element
        }

        //  After the first rectangle is created we can add the constraint
        if (lastRect)
        {
            chain_game.physics.p2.createRevoluteConstraint(newRect, [0, -10], lastRect, [0, 10], maxForce);
        }

        lastRect = newRect;
    }
}

