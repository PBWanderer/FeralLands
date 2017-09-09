/*
 * An Area object is what the Player (and their party) explores.
 * The player can choose "Look" to refresh the area's description.
 * Players may also interact with anyone or anything nearby through button prompts.
 * If the area is considered the Overworld, they may also travel to other areas in the Overworld.
 * 
 * Each Area 
 * 
 * Areas access all kinds of data, including enemies, items, events, and characters.
 * Perhaps it's best to load in everything an area uses all at once. Though, switching between areas will be rather cumbersome. Ah well, it's just text.
 */

/*
AREA OBJECT STRUCTURE:

desc = Description of the main area.

overworld = If this Area can be accessed via overworld. This can be determined by code, such as if there is a world quest happening.
found = If this area has been discovered. It will be visible through its Connections.
blocked = If this area has been discovered, but cannot be traveled to.
connects = The way that areas connect to other areas. Each subarea explored should have its own Connections, or else the game may softlock.
 */


