/* 
 * Class that handles generally all player input.
 * Input is sent back to the appropriate scripts via Events.
 * Add the inputs in new screens to this script. Dropdowns, file system, etc.
 */

// Receive clicks from all the main buttons
// What about custom dropdowns? Actually, I should create another 'screen' (div) that pops up for lists... Since that's static, it's fine.

//TODO: List every input button. Then create the new div.

//
// TOP: player_flair prefs about load save form1/2/3/4/5 stonemenu
// MID: tooltip stats
// MAINMENU: writepad (Planned: combat charsheet about? prefs?)
// SUBMENU: (None, at the moment. Planned: save load about? prefs? shop)
// BOT: top1 top2 top3 top4 top5 bot1 bot2 bot3 bot4 bot5 quickItem1 quickItem2 ok bag
// 
// ACTUALLY BUTTONS: top1-5 bot1-5 form1-5 quickItem1-2 next ok player_flair
// 1-5 and Q-T for context buttons
// Shift+1/Q/5/T for Bag, Okay, Quick1, and Quick2
// Shift+S Save, Sh+D load, Sh+W About, Sh+E Prefs
// 
// 
// Afterwards, some sort of flexible input for the 1-255 or whatever of a dropdown/list.
// Actually, check how events work in Javascript.


