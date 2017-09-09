/* 
 * Class that handles player input and buttons.
 * Input is sent back to the appropriate scripts via events.
 * Add the inputs in new screens to this script. Dropdowns, file system, etc.
 */
window.UI = window.UI || {
// Define all the main buttons
// Yes, copypaste coding is bad, but it's just a prank, bro.
// top row of bottom bars
    top1: $("#top1"),
    top2: $("#top2"),
    top3: $("#top3"),
    top4: $("#top4"),
    top5: $("#top5"),
// middle row
    mid1: $("#mid1"),
    mid2: $("#mid2"),
    mid3: $("#mid3"),
    mid4: $("#mid4"),
    mid5: $("#mid5"),
// bottom row
    bot1: $("#bot1"),
    bot2: $("#bot2"),
    bot3: $("#bot3"),
    bot4: $("#bot4"),
    bot5: $("#bot5"),
    
    toprow: [top1, top2, top3, top4, top5],
    midrow: [mid1, mid2, mid3, mid4, mid5],
    botrow: [bot1, bot2, bot3, bot4, bot5],
    mainbuttons: [top1, top2, top3, top4, top5, mid1, mid2, mid3, mid4, mid5, bot1, bot2, bot3, bot4, bot5],
    // I COULD use .push, but I think I have to declare that after all this is done? Eugh... I'm new to this, alright?
    
    
// left bottom bar
    canc: $("#cancel"),
    ok: $("#ok"),
    bag: $("#bag"),
// right bottom bar
    quickitem1: $("#quickItem1"),
    quickitem2: $("#quickItem2"),
    quickitem3: $("#quickItem3"),
// top section's hidden formstones
    form1: $("#form1"),
    form2: $("#form2"),
    form3: $("#form3"),
    form4: $("#form4"),
    form5: $("#form5"),
// player's flair, allows them to manage stats and whatever
    flair: $("#player_flair"),
// engine things
    save: $("#save"),
    load: $("#load"),
    prefs: $("#prefs"),
    about: $("#about")

// Time change func, flexible stat change func, 

};

// What about custom dropdowns? Actually, I should create another 'screen' (div) that pops up for lists... Since that's static, it's fine.
//TODO: Create that new div. If we really need it, that is... The end engine should be flexible enough to create lists w/o the new div.

//
// TOP: player_flair prefs about load save form1/2/3/4/5 stonemenu
// MID: tooltip stats
// MAINMENU: writepad (Planned: combat, charsheet)
// SUBMENU: (None, at the moment. Planned: save, load, about, prefs, shop)
// BOT: todo
// 
// 1-5 and Q-T for context buttons
// Shift+1/5/T for Bag, Quick1, and Quick2
// Shift+S Save, Sh+D load, Sh+W About, Sh+E Prefs
// Spacebar for Okay
// 
// 
// Afterwards, some sort of flexible input for the 1-255 or whatever of a dropdown/list.
// Actually, check how events work in Javascript.


// TOP player_flair save load prefs about
// STONES form1 form2 form3 form4 form5
// LEFTBOT quickItem1 quickItem2 quickItem3
// RIGHTBOT bag cancel ok
// TOP top1 top2 top3 top4 top5
// MID mid1 mid2 mid3 mid4 mid5
// BOT bot1 bot2 bot3 bot4 bot5
// Or maybe I should just make it dynamic and force the game to recognize everything with the class 'button'?

// TODO: Load up an event system or whatever for whenever each of these buttons are clicked!
// When pressed, they fire a jsEvent that is heard by the engine.js listeners. They probably just return a name or some such...?
// Maybe programming each individual one is better, since I want to do position-related things a little...?