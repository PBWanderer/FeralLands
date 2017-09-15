/* global Cool
 * Contains the Save/Load feature, and is also the one thing that engine.js loads up when a game is chosen.
 */



function WHY() {
    e1 = new Encounter("enc 1", "tag", 30, function(){  } );
    e2 = new Encounter("enc 2", "tag", 50, function(){  } );
    e3 = new Encounter("enc 3", "tag", 20, function(){  } );
    puul = new Pool();
    puul.addEncounter(e1, e2, e3);
    puul.getEnc();
}

$(document).ready(function(){
    writepad("Feral Wanderer loaded.");
    UI.initializeTooltips();
    // Messy, game-specific code begin. Add event listeners...
    
    // Messy, game-specific code end.
    
    WAT = function() { newbutton("FFFFFFFFFFFFFFFFFFFFFFF", UI.top2, "YEAH", engine.ROWTEST); };
    // TalkToNPC = func() {  promptreset("You speak to NPC.") btnHello() btnGoodbye()  }
    WAT();
    newbutton("Erase Buttons", UI.top5, "Erases all buttons, including this one. Ouch!", function(){
        promptreset(WAT);
    });
    
    
    newbutton("Pool Test", UI.mid4, "Seriously, I fucked up?", WHY );
    
    // TODO: Move this code into the game.js of FW.
});