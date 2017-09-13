/* 
 * Class that handles player input and buttons.
 * Input is sent back to the appropriate scripts via events.
 * Add the inputs in new screens to this script. Dropdowns, file system, etc.
 */

window.UI = window.UI || {
    no_highlight_tap: false,
    
    
    
    
    
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
    // UI.tips[mid1] = "An item that does XYZ."
    
    maintips:
        ["TIPtop1", "TIPtop2", "TIPtop3", "TIPtop4", "TIPtop5",
        "TIPmid1", "TIPmid2", "TIPmid3", "TIPmid4", "TIPmid5",
        "TIPbot1", "TIPbot2", "TIPbot3", "TIPbot4", "TIPbot5"],
    // If I want to extend to the other buttons, make an otherbuttons and othertips pair of arrays...
    mainshortcuts: // actual shortcut system will implement this for REAL; currently a temporary test
        ["1", "2", "3", "4", "5",
        "Q", "W", "E", "R", "T",
        "A", "S", "D", "F", "G"],
    
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
    about: $("#about"),
    
    shorttip: $("#tooltip"),
    itemdesc: $("#description"),
    
    /*shortcuts:
        {top1:"Shift+1", top2:"Shift+2", top3:"Shift+3", top4:"Shift+4", top5:"Shift+5",
        mid1:"Shift+Q", mid2:"Shift+W", mid3:"Shift+E", mid4:"Shift+R", mid5:"Shift+T",
        bot1:"Shift+A", bot2:"Shift+S", bot3:"Shift+D", bot4:"Shift+F", bot5:"Shift+G",
        quickItem1:"", quickItem2:"", quickItem3:"",
        flair:""},
     */
    
    resethover: function(){
        UI.shorttip.text("");
        UI.itemdesc.text("");
    }
        
    
    // Time change func, flexible stat change func, 
    
};

/**
 * Called on when using keyboard shortcuts.
 * @param {function} FUNC - The function that the called button will perform.
 * @param {button} button - The button being interacted with.
 */
function tap(FUNC, button) {
    if (UI.no_highlight_tap) { // If Highlight Tap is OFF, just execute the function.
        FUNC();
        
    } else { // Highlight Tap is ON
        btn = $(button);
        last = engine.LAST_BUTTON;
        
        // Hacky solution begin...
        btnID = ""+btn.attr("id");
        engine.LAST_BUTTON = ""+btn.attr("id");
        $("#"+last).css("background", engine.BUTTON_BACKGROUND);
        // Hacky solution end...
        
        //writepad("Highlight Tap Test | Last: "+last+" | Current: " +engine.LAST_BUTTON);
        
        if(last === btnID){ // Begin the check for 
            FUNC();
            btn.css("background", engine.BUTTON_BACKGROUND);
        } else {
            UI.shorttip.text(btn.data("shorttip"));
            UI.itemdesc.text(btn.data("desc"));
            //writepad("changing button highlight...");
            btn.css("background", "red");
        }
    }
}




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