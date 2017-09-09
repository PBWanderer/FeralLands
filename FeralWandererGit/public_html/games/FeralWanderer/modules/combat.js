/* 
 * The combat handler.
 * Once a combat scenario is constructed, the proper menu+submenu combo starts up with the specified parameters.
 * 
 * Changes to inventory, health, stats, companions, etc. is not pushed into being official (Save-able) until combat end.
 * This is done by saving relevant combat log data (end health is used, items used are consumed, durability, time, etc.)
 * and applying it to the rest of the game. Also, sex scenes/other events might want to be handled the same way.
 * 
 * Of course, watch out for combat-Player/World function-desync and memory leaks...
 * Put in failsafes for combat that goes on for too long tbh. Like make an unbreakable but too-weak grab suddenly insta-down.
 * 
 * If sex/combat/story scenes all count as 'scenes', then perhaps one class to rule them all? Scene.js?
 * Perhaps allow passing on the temporary data so that the Scene can finish applying it to official?
 */



