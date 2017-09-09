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
 * All buttons are created with a Function string, label, and a potential position.
 * The stored Function that it can perform may come with calculated, predetermined arguments. Might be tricky...
 * Also, something involving Events... Eugh. I suppose making buttons lead to Event functions is a thing...
 */

var pad = $("#writepad"); // https://stackoverflow.com/questions/1300242/

var engine = { // Namespacing to tidy up anonymous functions.
    MAX_PARAGRAPHS: 30,
    TEST1: function(){ writepad("TEST "); },
    BUTTON1: function() { newbutton("Noice!", UI.mid3, "", engine.TEST1); }
};

// The functions below are deliberately on the global namespace.
/**
 * Writes in another line to the game.
 * @param {string} text - The arg for appended text is automatically wrapped in a <p>.
 */
function writepad(text) {
    pad.append("<p>" + text + pad.children().length + "</p>");
    if (pad.children().length > engine.MAX_PARAGRAPHS) {
        pad.children().first().remove();
    };
    pad.scrollTop(pad.prop('scrollHeight'));
    // NOTE: Writepad will remove ANY element it sees.
    // So be cautious when attempting to use interactive writepad elements.
}
/** 
 * Clears everything with a button prompt.
 * @param {string} text - The arg for replacement text is automatically wrapped in a <p>.
 * @param {function} FUNC - The function that executes after the Next prompt.
 */
function promptreset(text, FUNC) {
    // Create a button prompt for Next, which deletes everything in exchange for our argument...
    clearallbuttons();
    newbutton("Next", UI.top1, "", function () {
        clearallbuttons();
        pad.html("<p>" + text + "</p>");
        FUNC();
    });
    // TODO: Add some funky arg that allows you to create more buttons after Next.
}
/**
 * 
 * @param {string} label - The label that goes on a button.
 * @param {string} but - The interactive button to use. Usually comes from the UI namespace.
 * @param {string} tooltip - What displays when you hover over the button.
 * @param {string} FUNC - A string of a function. Must not contain "()" as that's included already.
 * @returns {b|window.$|$} - Returns the DOM button that was modified.
 */
function newbutton(label, but, tooltip, FUNC) { // Can't pass an indefinite number of FUNC args right now. Not enough INT for me to write THAT yet.
    but.text(label);
    but.click(FUNC);
    //writepad(label+tooltip+but.text());
    return but;
}
/**
 * Resets a button's label, click event, and tooltip.
 * @param {button} but - The button that will be reset.
 */
function resetbutton(but) { // Tooltips need to be added eventually.
    $(but).text("");
    $(but).off("click");
    // tooltip reset here
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

$(document).ready(function(){
    newbutton("FFFFFFFFFFFFFFFFFFFFFFF", UI.top2, "", engine.TEST1);
});