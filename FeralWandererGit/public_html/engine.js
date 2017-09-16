/* Please provide credit where credit is due~ I do the same for all of you~
 * 
 * This class provides all of the basic functions for a simple contextual button game.
 * By being made with Javascript, jQuery, and HTML5, such games are easily-accessible.
 * Functions included:
 * Write-to-element, create new button, reset button, reset element, reset all buttons, reset all with prompt
 * SOON: Passing of time, player inventory, area exploration
 * 
 * Time passes by with every Action. Not all button presses are Actions, however.
 * 
 * Generally, the gamestate consists of things that directly affect what buttons you can press.
 * However, it is not the state of affairs in Locations, combat, player forms, and more.
 * 
 * Main Screen that displays information. This includes combat and speaking to people.
 * Main Screen is not saved - combat and speaking to people don't update anything permanent until completed.
 * Sub Screen is the panel on the right. This is not saved, as saving/loading requires the sub screen.
 * Since I don't know how to make Save/Load really dynamic like how Glulxle does it, it's dependent on the loaded game's own script. Probably always is.
 * 
 */

/* BUTTON SYSTEM
 * "BTN_" functions are ones that are meant to be associated with a self-interacting button... Though how I'll make one needs a lore check
 * Also, something involving Events... Eugh. I suppose making buttons lead to Event functions is a thing...
 */

var $pad = $("#writepad"); // https://stackoverflow.com/questions/1300242/

window.engine = window.engine || { // Namespacing to tidy up anonymous functions.
    GAME: "games/FeralWanderer/game.js",
    
    MAX_PARAGRAPHS: 30,
    MINUMUM_TIME_INCREMENT:1,
    LAST_BUTTON: "" + $("#save").attr("id"), // Hacky solution...
    BUTTON_BACKGROUND: "gray",
    
    
    
    TEST1: function(){ writepad("TEST"); }, // Unfortunately I can't make this output $pad.children.length until I get more INT. lmao
    BUTTON1: function() { newbutton("Noice!", "!ecioN", UI.mid3, engine.TEST1); },
    ROWTEST: function() { engine.TEST1();
        $.each(UI.botrow, function(index, value) {
        index++;
        newbutton("ROWTEST Bot "+index, "ROWTEST "+index, value, engine.TEST1);
    }); },
    ERRORBLANK: function() { blankpad("ERROR: Somebody forgot to insert a function! Please report this bug in detail. Thank you."); }
};

// The functions below are deliberately on the global namespace.
//<editor-fold defaultstate="collapsed" desc="Basic Writing Functions">
/**
 * Writes in another line to the game.
 * @param {string} text - The arg for appended text is automatically wrapped in a <p>.
 */
function writepad(text) {
    $pad.append("<p>" + text + "</p>");
    
    if ($pad.children().length+1 > engine.MAX_PARAGRAPHS) {
        $pad.children().first().remove(); // First is assumed to be the top. First can be ANY sort of element.
    };
    $pad.scrollTop($pad.prop('scrollHeight'));
    // NOTE: Writepad will remove ANY element it sees.
    // So be cautious when attempting to use interactive elements under "writepad".
}

/**
 * Creates a new game button, complete with a label, tooltip, and custom function.
 * @param {string} label - The label that goes on a button.
 * @param {string} $button - The interactive button to use. Usually comes from the UI namespace.
 * @param {string} tooltip - What displays when you hover over the button.
 * @param {string} FUNC - A string of a function. Must not contain "()" as that's included already.
 * @param {boolean} execute - If true, the button is immediately placed. If false, the newbutton stays as an Object.
 * @returns {b|window.$|$} - Returns the DOM button that was modified.
 */ // Should I add in an optional one for defining the Shortcut Tooltip hover?
function newbutton(label, tooltip, $button, FUNC, execute=true) { // Can't pass an indefinite number of FUNC args right now. Not enough INT for me to write THAT yet.
    // get tooltip ...
    // set tooltip { change $button.data(tooltip, newtip) }; ...
    // etc. with all other variables
    
    // function place( UIposition ) {
    resetbutton($button);
    $btn = $($button);
    $btn.text(label);
    $btn.on("click", FUNC);
    $btn.data("desc", tooltip);
    $btn.data("shorttip", $btn.data("shortorig") + ": " + label);
        // return $btn;
    // }
    
    return $btn; // return UIposition() would grant old functionality... Hm...
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
    newbutton("Next", "Press 1 or Spacebar to continue.", UI.top1, function () {
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
    $pad.html("<p>" + text + "</p>");
}

/**
 * Resets a button's label, click event, and tooltip.
 * @param {button} $button - The button that will be reset.
 */
function resetbutton($button) { // Tooltips need to be added eventually.
    $btn = $($button);
    $btn.text("");
    $btn.off("click");
    $btn.data("desc", "");
    $btn.data("shorttip", $btn.data("shortorig"));
}

/**
 * Destroys all main buttons. Please use in conjunction with creating new buttons so that the player is never stuck in limbo.
 * @returns {undefined}
 */
function clearallbuttons() {
    $.each(UI.mainbuttons, function(index, $value){
        //writepad(index+": "+value.id);
        resetbutton($value);
    });
}



//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="foo">
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Player">



//</editor-fold>

// TODO: Make the Time and Encounter objects the same as the Pool object.
// TODO: TimeAction. But I have no actions to perform that require time yet!
//<editor-fold defaultstate="collapsed" desc="Time">
function TIME(mins=0) {
    if ( isNaN(mins) ) { console.log("TIME: constructor: Attempted to pass NaN. Minutes set to 0."); this.minutes = 0;}
    else { this.minutes = Math.max(mins, 0); }
    
    
    this.addMin = function(mins) {
        if ( isNaN(mins) ) {
            console.log("TIME: addMin: Attempted to pass NaN. Added minimum minutes ("+engine.MINUMUM_TIME_INCREMENT+").");
            this.minutes += engine.MINUMUM_TIME_INCREMENT;
        }
        else { this.minutes += Math.max(mins, engine.MINUMUM_TIME_INCREMENT); }
    },
    
    //<editor-fold defaultstate="collapsed" desc="Time variants">
    this.inHours = function() { return Math.floor(      this.minutes / 60); },
    this.inDays = function() { return Math.floor(       this.inHours() / 24); },
    this.inMonths = function(){ return Math.floor(      this.inDays() / 30); },
    this.inYears = function(){ return Math.floor (      this.inMonths() / 12 ); },
    this.inDecades = function(){ return Math.floor (    this.inYears() / 10 ); },
    //</editor-fold>
    
    this.readableTime = function() {
        subYears = this.inYears()   - Math.floor( this.inDecades() * 10 );
        subMonths = this.inMonths() - Math.floor( this.inYears() * 12 );
        subDays = this.inDays()     - Math.floor( this.inMonths() * 30 );
        subHours = this.inHours()   - Math.floor( this.inDays() * 24 );
        subMinutes = this.minutes   - Math.floor( this.inHours() * 60 );
        
        _read = subMinutes + " minutes";
        
        fullread = this.inDecades()+ " decades & " +subYears+ " years & "
                +subMonths+ " months & " +subDays+ " days & " +subHours+ " hours & " +subMinutes+ " minutes" ;
        _read = fullread;
        //return this.inMonths()+" months and "+subDays+" days";
        return _read;
        
        //if (hours   < 10) { hours   = "0"+hours; } // Add a 0 for single-digit values...
        //if (minutes < 10) { minutes = "0"+minutes; }
        //return "Your journey has gone on for: " + this.minutes.getDays() + " and " + this.minutes.getMinutes() + " minutes.";
    }
};
//var time = new TIME(50000000); // 9 decades & 6 years & 5 months & 12 days & 5 hours & 20 minutes
var time = new TIME();
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="Game Functions">

/**
 * Returns a random Integer between min and max. Both inclusive.
 * @param {type} min
 * @param {type} max
 * @returns {Number}
 */
function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive 
}
/**
 * Durstenfeld shuffle. Uses ES6. Used like: ARRAY = shuffleArray(ARRAY);
 * @param {Array} array
 * @returns {Array}
 */
/*function shuffleArray(array) { // https://stackoverflow.com/questions/2450954/
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
} // */

//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="Encounter Pool System">

// EVENT: makeEvent(name, tag, weight, availableFUNC, actionFUNC)
// if ( eventpool[index].isAvailable() ) { } // IF the event  returns true, then
// ALT: Change the event's Weight value when conditions are met. That way, a GetAvailable check isn't necessary.
// Any other Encounter System things needed? The Weighted RNG system, the Encounter Pool system...

// Encounter Pools are simply lists of Encounters that are associated with Travel.
// 
// What differentiates an Encounter from a fancy button? Not much - the Encounter encapsulation is just convenient.

/**
 * Enumeration namespace for Encounter Tags.
 * @type Window.eTag
 */
window.eTag = window.eTag || {
    FIGHT: 0,
    NPC: 1,
    ITEM: 2,
    TRAP: 3 // lol
};

/**
 * The all-important Encounter system is used for random in-game events. Encounters are typically found when travelling through Encounter Pools.
 * @param {string} ID - A very simple, unique string that identifies what the Encounter is. Not meant to be seen by the player.
 * @param {string} tag - A tag that assists with filtering through many different Encounters. Useful for finding only Combat encounters.
 * @param {int} weight - Used for weighted random selection. A value of 1-99 is typical. If a Weight of 100 is found, it's a guaranteed find. Weight 0 is never found.
 * @param {function} actionFUNC - The function called when this Encounter is selected, which are commonly anonymous.
 * @returns {Encounter} - After construction, the Encounter returns itself.
 */
function Encounter(ID, tag, weight, actionFUNC=engine.ERRORBLANK ) {
    this.ID = ID;
    this.tag = tag;
    this.weight = weight;
    this.FUNC = actionFUNC;
    
    this.weightChange = function(newval) {
        if ( isNaN(newval) ) {
            console.log("Encounter " +this.ID+ ": weightChange: Attempted to pass NaN.");
        } else {
            this.weight = newval;
        }
    };
            
            
    this.oneshot = function() { // shoutouts to niko
        this.weight = 0; // Alternative: Make the Event destroy itself. Might be complex, especially with removing itself from all Lists...
        return this.FUNC(); // Parantheses means that the function tries to fire immediately. Without this, you'd need to write Encounter.oneshot()()
    };
    
    return this;
}


/**
 * A custom class for holding and handling Encounters. It has Get Encounter and Add Encounter functions.
 * @returns {Pool}
 */
function Pool(){
    this.list = [];
    this.max = function() {
        _ = 0;
        $.each(this.list, function(i, v) { _ += v.weight; });
        return _;
    };
    
    this.TEST = function() {
        _TEST = "";
        $.each(this.list, function(i, v) { _TEST += v.ID+" "; } );
        console.log(_TEST);
    };
    
    this.addEncounter = function() {
        me = this.list;
        $.each(arguments, function (index, enc) {
            if (enc instanceof Encounter) { // We only accept Encounter objects around here.
                me.push(enc);
                //$(this).max += enc.weight;
            } else { console.log("Pool: addEnc: A non-Encounter was passed (" +enc+ ")."); }
        });
        
        //console.log(me.length+" SUCCESS "+me[0].ID);
        me.sort(function(a, b){ // Reorder the Pool starting with highest to lowest...
            return b.weight - a.weight;
        } );
    };
    
    
    this.getEnc = function() {
        me = this.list;
        
        if (me.length <= 1) {
            console.log("Pool: choose: Encounter Pool is shallow ("+me.length+" encounters found).");
            return me[0].FUNC;
        };
        /*if (me.max() === 0) {
            console.log("Pool: choose: Encounter Pool containing " +me.ID+ " has no weight.");
            return me[0].FUNC;
        }; // For Pool weight troubles */
        
        threshold = randomInt(1, 100); // We're using a 100% scale, and 0-100 is 101 numbers, thus we want 1-100.
        tally = 0;
        index = -1; // This starts at -1 for convenience, since we perform index++; immediately.
        
        do { // do..while executes at least once. This is desirable.
            index++;
            if (index === me.length) {
                console.log("Pool: getEnc: An index loop was necessary. This may be intentional. Max: " +this.max()+".");
                index = 0; // If the array didn't hit the Threshold by the end, we loop.
            }
            tally += me[index].weight; // When the threshold is reached or exceeded, we've got our weighted random result.
        } while(tally < threshold); // The while loop is meant to be breakable upon the first execution.
        
        console.log("Winning ID: "+me[index].ID+" | Threshold: "+threshold+" | Tally: "+tally);
        
        return me[index].FUNC;
    };
    
    return this;
}

//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="Area & Travel System">

function Area(flair, look, travelHover, arrive=false) {
    
    
    /**
     * This is called when a Player arrives to an Area. Argument 
     * @param {type} input - Either a String or Function.
     */
    this.onArrive = function(input=false) {
        if (input === "false") {  } // No operation
        if (typeof input === "string") { writepad(input); }
        if (typeof input === "function") { input();
        } else { console.log("Area: onArrive: Passed non-string and non-function"); }
    };
    
    // this.dangerlook = false; // No Encounters are rolled during Look
    this.look = function() {
        /*if (this.dangerlook) {
            writepad(input);
        }//*/
        
    };
}



/* Among the things I want Travelling to do, I want it to...
 * 
 * Change the Area Flair on the screen
 * Describe to the player what's going on in this place
 * Present the player an array of useful buttons (Interact with NPC, Go to Area)
 * 
 * 
 * player.travelto(city.plaza); // No extra exemptions for this travel call
 * The CurrentArea changes, and lots of functions get called, including whatever Encounter Pool is associated.
 * 
 * 
 * An area must generate buttons based on what's given to it.
 * Connections, NPCs, items, other choice-involving things, instant-interactions...
 * Also, I'd like for it to be visually representable, so some form of logic really has to show... Ugh. That's way later.
 * How about a mere Position and Graphic?
 * In fact, I should create my own GraphicalObject thingamajig to handle all of that for me... No! Stop! Later!
 */

/* new Area(tooltip)
 * new Area()
 * new Area()...
 * Area.connect(area)
 * Area.connect(area)...
 * 
 * 
 * TravelHover, YouArrived, Look, Flair
 * These basic strings show up when hovering over a button that travels there, when arriving, pressing Look, and in the Area Flair
 * List[entities] is a bunch of disgusting newbutton()s.
 * 
*/ 


// Area.connect(area, DIR tip1=FUNC_A, tip2=FUNC_B, traveltime=1, connectType=1, hideType=0)
// 
// DIR: dir.north/south/etc. with the Connect function checking if that spot hasn't been used yet
// connectType 0: One-way | 1: Both ways
// hideType 0: Not hidden | 1: Hidden until entered | 2?: Always hidden?

//</editor-fold>
// Definitions end.



$(document).ready(function(){
    //$.ajaxSetup({ cache: true });
    


    // Stupid testing area begin...
    time.addMin(61);
    writepad( time.readableTime() );
    
    
    // Stupid testing area end...    
    
    // Note: UI.js is loaded into the document with this one simultaneously...
    $.getScript(engine.GAME);// Make it so that the Engine's ready function is what loads that UI function!
});