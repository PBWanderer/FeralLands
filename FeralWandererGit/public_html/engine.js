/* 
 * This class handles the overarching gamestate. Said gamestate consists of:
 * Current Main Screen, Sub Screen, Time, and Inputs.
 * 
 * Generally, the gamestate consists of things that directly affect what buttons you can press.
 * However, it is not the state of affairs in Locations, combat, player forms, and more.
 * 
 * Main Screen that displays information. This includes combat and speaking to people.
 * Main Screen is not saved - combat and speaking to people don't update anything permanent until completed.
 * Sub Screen is the panel on the right. This is not saved, as saving/loading requires the sub screen.
 * 
 * Time passes by with every action, AKA each button press. I suppose that if there are other games for this engine, they can ignore Time.
 * Since I don't know how to make Save/Load really dynamic like how Glulxle does it, it's dependent on the loaded game's own script. Probably always is.
 * 
 */

/*
 * QUICK SELF NOTE:
 * Buttons can cancel screens, allow a full round-trip Update to occur (GS/UI),
 * and perform combat/conversation actions (World/Player/tempRAM)
 * Combat screen is background-layered and history transparency'd while right screen shows combat log + a show-historylog-on-hover-object
 * Combat/Converse doesn't -officially- update any World/Player actions until done, so technically it all counts as GS/UI?
 * If so, then maybe GS/UI should be handle them? Or just relegate that crap to other scripts that are also loaded in?
 * Would have to write the code in a special way to make everything become official upon Combat.js end.
 * 
 * Hover over button or Keypress button once to preview target. Click or Keypress same button to attack. Shift+Keypress to cancel target.
 */

/* BUTTON SYSTEM
 * "BTN_" functions are ones that are meant to be associated with a self-interacting button... Though how I'll make one needs a lore check
 * Also, something involving Events... Eugh. I suppose making buttons lead to Event functions is a thing...
 */

var pad = $("#writepad"); // https://stackoverflow.com/questions/1300242/

window.engine = window.engine || { // Namespacing to tidy up anonymous functions.
    MAX_PARAGRAPHS: 30,
    LAST_BUTTON: "" + $("#save").attr("id"), // Hacky solution...
    BUTTON_BACKGROUND: "gray",
    
    TEST1: function(){ writepad("TEST"); }, // Unfortunately I can't make this output pad.children.length until I get more INT. lmao
    BUTTON1: function() { newbutton("Noice!", UI.mid3, "", engine.TEST1); },
    ROWTEST: function() { engine.TEST1();
        $.each(UI.botrow, function(index, value) {
        index++;
        newbutton("ROWTEST Bot "+index, value, "ROWTEST "+index, engine.TEST1);
    }); },
    ERRORBLANK: function() { blankpad("ERROR: Somebody forgot to insert a function! Please report this bug in detail. Thank you."); }
};

// The functions below are deliberately on the global namespace.
/**
 * Writes in another line to the game.
 * @param {string} text - The arg for appended text is automatically wrapped in a <p>.
 */
function writepad(text) {
    pad.append("<p>" + text + "</p>");
    
    if (pad.children().length+1 > engine.MAX_PARAGRAPHS) {
        pad.children().first().remove(); // First is assumed to be the top. First can be ANY sort of element.
    };
    pad.scrollTop(pad.prop('scrollHeight'));
    // NOTE: Writepad will remove ANY element it sees.
    // So be cautious when attempting to use interactive elements under "writepad".
}
/**
 * Creates a new game button, complete with a label, tooltip, and custom function.
 * @param {string} label - The label that goes on a button.
 * @param {string} button - The interactive button to use. Usually comes from the UI namespace.
 * @param {string} tooltip - What displays when you hover over the button.
 * @param {string} FUNC - A string of a function. Must not contain "()" as that's included already.
 * @returns {b|window.$|$} - Returns the DOM button that was modified.
 */ // Should I add in an optional one for defining the Shortcut Tooltip hover?
function newbutton(label, button, tooltip, FUNC) { // Can't pass an indefinite number of FUNC args right now. Not enough INT for me to write THAT yet.
    resetbutton(button);
    btn = $(button);
    btn.text(label);
    btn.on("click", function(){ tap(FUNC, $(this));});
    btn.data("desc", tooltip);
    btn.data("shorttip", btn.data("shortorig") + ": " + label);
    //writepad(label+tooltip+btn.text());
    return btn;
}
// TODO for promptreset: Make the default function into one that generates the generic environment buttons or such.
/** 
 * Clears everything with a button prompt.
 * @param {string} text - The arg for replacement text is automatically wrapped in a <p>.
 * @param {function} FUNC - The function that executes after the Next prompt.
 */
function promptreset(FUNC=engine.ERRORBLANK, text="Game text and buttons cleared.") {
    // Create a button prompt for Next, which deletes everything in exchange for our argument...
    clearallbuttons();
    newbutton("Next", UI.top1, "Press 1 or Spacebar to continue.", function () {
        clearallbuttons();
        blankpad(text);
        FUNC();
    });
    // TODO: Add some funky arg that allows you to create more buttons after Next.
}
/**
 * Blanks the writepad, leaving behind a <paragraph>.
 * @param {type} text - Optional text that appears after the prompt reset.
 */
function blankpad(text="") {
    pad.html("<p>" + text + "</p>");
}/**
 * Resets a button's label, click event, and tooltip.
 * @param {button} button - The button that will be reset.
 */
function resetbutton(button) { // Tooltips need to be added eventually.
    btn = $(button);
    btn.text("");
    btn.off("click");
    btn.data("desc", "");
    btn.data("shorttip", btn.data("shortorig"));
}
/**
 * Destroys all main buttons. Please use in conjunction with creating new buttons so that the player is never stuck in limbo.
 * @returns {undefined}
 */
function clearallbuttons() {
    $.each(UI.mainbuttons, function(index, value){
        //writepad(index+": "+value.id);
        resetbutton(value);
    });
}

/*Tooltipper functionality:
 * Pairs itself with the various buttons.
 * Ugh... How does that pairing happen, if not with arrays or dicts?
 * Let's start from the top: the buttons.
 * When hovering over _BUT (mid1), display mid's _TIP
 * The newbutton constructor accesses the _??? to change _BUT's _TIP.
 * 
 * TooltipHoverManager listens to all the hover events of each and every button.
 * It pairs the buttons by... Actually, just do the two arrays thing. Ugh.
 * newbutton passes the btn and tooltip to TTHM and they get paired then.
 * resetbutton also calls TTHM. When you construct, make sure to destruct.
 */

$(document).ready(function(){
    // Messy, game-specific code begin. Add event listeners...
    $.each(UI.mainbuttons, function(index, button) {
        btn = $(button);
        writepad(""+index);
        _ = UI.mainshortcuts[index];
        btn.data("shorttip", _);
        btn.data("shortorig", _);
        index++;
        btn.data("desc", ""+index);
        btn.hover(
            function() {
                UI.shorttip.text($(this).data("shorttip"));
                UI.itemdesc.text($(this).data("desc"));
            },
            UI.resethover
        );
    });
    // Messy, game-specific code end.
    
    WAT = function() { newbutton("FFFFFFFFFFFFFFFFFFFFFFF", UI.top2, "YEAH", engine.ROWTEST); };
    // TalkToNPC = func() {  promptreset("You speak to NPC.") btnHello() btnGoodbye()  }
    WAT();
    newbutton("Erase Buttons", UI.top5, "Erases all buttons, including this one. Ouch!", function(){
        promptreset(WAT);
    });
    // TODO: Move this code into the game.js of FW. Make it so that the Engine's ready function is what loads that UI function!
});