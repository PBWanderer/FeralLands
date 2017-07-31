/* 
 * This class handles the overarching gamestate. Said gamestate consists of:
 * Current Main Screen, Sub Screen, and Time.
 * 
 * Generally, the gamestate consists of things that directly affect what buttons you can press.
 * However, it is not the state of affairs in Locations, combat, player forms, and more.
 * 
 * Main Screen that displays information. This includes combat and speaking to people.
 * Main Screen is not saved - combat and speaking to people don't update anything permanent until completed.
 * Sub Screen is the panel on the right. This is not saved, as saving/loading requires the sub screen.
 * Time passes by with every action, AKA each button press. Saved.
 * 
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


function output(text) {
    document.getElementById("textout").write(text);
}