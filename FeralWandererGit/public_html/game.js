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

function output(text) {
    document.getElementById("textout").write(text);
}
