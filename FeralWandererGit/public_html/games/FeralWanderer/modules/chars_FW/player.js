/* Player Object does...
 * EVERYTHING. The player is meant to interact with EVERYTHING
 * Yeah, defining this bastard is going to take absolutely forever. In fact, we'll need a separate file for him.
 * 
 * The way to progress that's been working so far is to only work on what's currently RELEVANT.
 * Current relevant thing: Make Areas work. So now, we'll try and make the Player exist so that Areas can exist.
 * What's needed for the Player to work? A CurrentArea object local to the Player.
 * 
 * Some other nice things would be... Fuck, just anything.
 * Make sure to separate engine.js Player from game.js Player for when other games want to be made. This includes the Body shtick.
 * 
 * Only after we have the Player, Area, and Inventory should we work on side-buttons and Save/Load/etc.!
 */



/**
 * Imagine the Player object like the avatar's eyes and body. What the Player does is Look at things and interact with the world.
 * @returns {Player}
 */
function Player() { // Constructing a Player? I think it'll just be modified over time...
    this.location = engine.ROOM; // Default room. Probably a test area, but might be an initializer.
    
    
    
    this.look = function() { // Wow this could totally do way better.
        /* Location.Look(): 
         * 
         */
        this.location.look();
    };
    
}
var player = new Player();


