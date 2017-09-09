/* 
 * This file defines an Area and the Connections they construct.
 * 
 * Fast-travel areas need some special rules for their travel time stuff...
 */

class Area {
    /**
     * 
     * @param {type} name - Internal name of the Area.
     * @param {string} flair - The flair that shows up in the top-right of the screen.
     * @param {type} look - The dynamic description of the Area.
     * @param {type} specialButtons - Unique buttons found in this Area. Not to be confused with Entities.
     * @param {type} connections - Other Areas that are connected to this one.
     * @returns {Area}
     */
    constructor(name, flair, look, specialButtons, ...connections){ // Extra Buttons array, Look description, overworld=false
        
        var found = false;
        var entities = [];
        var connects = [];
        // Funcs: Add entity, add connection
    }
    // found, blocked, array connects
    
}

        // two areas, time, event pool
        
        // act on performing the connection, factoring in the Blocked status
        // will it not add itself to the array if it's still constructing itself, thus it doesn't quite exist yet?
