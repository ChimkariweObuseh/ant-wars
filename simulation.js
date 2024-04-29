var _data; // data from previous update
var info = window.location.search;
console.log(info);
var params = new URLSearchParams(info);
var grid_length = 540;
var grid_width = grid_length;
var grid = [];
var temp_grid = [];
var population = [];
var max_ants_on_grid = 30;
var type1_ants_out_of_nest = 0;
var type2_ants_out_of_nest = 0;
let type1 = params.get("type1");
let type2 = params.get("type2");
let type1_formatted = formatString(type1);
let type2_formatted = formatString(type2);
let fire = false;
let nest_i = Math.round((window.innerWidth / 2) * 0.1);
let nest_ii = Math.round(grid_width * 0.3);
let nest_iii = Math.round((window.innerWidth / 2) * 0.9);
let nest_iiii = Math.round(grid_length * 0.3);
var colours = {
    the_fire_ants_colour: "212, 106, 6",
    the_black_crazy_ants_colour: "0,0,0",
    the_trap_jaw_ants_colour: "50,50,50",
    the_dracula_ants_colour: "168,26,6",
    the_yellow_meadow_ants_colour: "237, 208, 21",
    the_weaver_ants_colour: "255,255,255",
    the_carpenter_ants_colour: "156, 130, 89",
    the_bullet_ants_colour: "92,92,92",
    the_black_garden_ants_colour: "84, 84, 84",
    the_pharaoh_ants_colour: "201, 186, 44",
    the_electric_ants_colour: "3, 252, 194",
    the_yellow_crazy_ants_colour: "238, 255, 0",
    the_red_wood_ants_colour: "153, 84, 78",
    the_argentine_ants_colour: "123, 153, 78",
    the_meat_ants_colour: "255, 0, 0",
    the_army_ants_colour: "54, 120, 89"
}
let strength = document.querySelector(".strength");
let stats = document.querySelector(".stats");
let allpopulation = document.querySelector(".allpopulation");
let type1population = document.querySelector(".type1population");
let type2population = document.querySelector(".type2population");
let paths = document.querySelector(".paths");
let portrait_button = document.querySelector(".portraitbutton");
let speed = document.querySelector(".speed");
var ms_between_updates = 20 - speed.value;
let winner = document.querySelector(".winner");
let paths_on = false;
let portrait = true;
let type1_done = false;
let type2_done = false;
let names = [
    "Sora",
    "Kirito",
    "Asuna",
    "Xemnas",
    "Meliodas",
    "Eren",
    "Levi",
    "Ansem",
    "Gon",
    "Alastor",
    "Hinata",
    "Killua",
    "Goku",
    "Roxas",
    "Kurapika",
    "Saitama",
    "Kairi",
    "Makima",
    "Jingliu",
    "Acheron",
    "Ash",
    "Naruto",
    "Prodigy",
    "Wilderman",
    "Muffinking",
    "Perseus",
    "Kang",
    "Loki",
    "Gilgamesh",
    "Battleaxe",
    "Freya",
    "Tom",
    "Elena",
    "Auduro",
    "Apollo",
    "Athena",
    "Piccolo",
    "Serena",
    "Hermione",
    "Luna",
    "Lilith",
    "Hades",
    "Vox",
    "Aldric",
    "Valeria",
    "Ragnar",
    "Eowyn",
    "Thorne",
    "Sif",
    "Draven",
    "Gareth",
    "Brynhildr",
    "Kael",
    "Astrid",
    "Gunnar",
    "Sigrun",
    "Thorin",
    "Hilde",
    "Darius",
    "Sigrid",
    "Fenrir",
    "Brynjolf",
    "Lagertha",
    "Bjorn",
    "Eira",
    "Hakon",
    "Ylva",
    "Rowan",
    "Thora",
    "Gunnlod",
    "Magnus",
    "Eirik",
    "Rune",
    "Helga",
    "Beowulf",
    "Freyja",
    "Hjalmar",
    "Asta",
    "Baldur",
    "Ingrid",
    "Leif",
    "Sigyn",
    "Sven",
    "Gudrun",
    "Ivar",
    "Ragna",
    "Siegfried",
    "Svala",
    "Ulrik",
    "Kara",
    "Vidar"
];
let endnames = [
    "the Kingslayer",
    "the Life Ender",
    "the Demon King",
    "the Reaper",
    "the Warrior",
    "Finalsight",
    "the Slayer",
    "the Almighty",
    "the Great",
    "the XIV",
    "the Ironclad",
    "the Stormborn",
    "the Warbringer",
    "the Dragonheart",
    "Bloodaxe",
    "the Shieldmaiden",
    "the Grim",
    "the Valkyrie",
    "the Raven",
    "the Berserker",
    "the Frostborn",
    "Shadowblade",
    "the Firebrand",
    "the Thunderlord",
    "the Swift",
    "the Dread",
    "the Deathdealer",
    "the Ironhand",
    "the Wyrm",
    "the Flameborn",
    "the Frostbitten",
    "the Soulreaper",
    "the Stormcaller",
    "the Nightstalker",
    "the Battleborn",
    "the Darkblade",
    "Bearclaw",
    "the Wolfheart",
    "the Stonefist",
    "the Grimhammer",
    "the Swiftblade",
    "the Dreadwrought",
    "the Ironfist",
    "the Stormbringer",
    "the Flamebearer",
    "the Bloodwrath",
    "the Skysplitter",
    "the Winterborn",
    "the Moonshadow",
    "the Sunbreaker",
    "the Voidwalker",
    "the Thunderclap",
    "the Ashborn",
    "the Bloodhound",
    "the Nightblade",
    "the Battlecry",
    "the Heartseeker",
    "the Doombringer",
    "the Dreadnaught",
    "the Shadowclaw",
    "the Firestorm",
    "the Bloodlust",
    "the Warcry",
    "the Bonecrusher",
    "the Swiftwind",
    "the Starcaller",
    "the Ironheart",
    "the Stormfury",
    "the Nightfall",
    "the Ashbringer",
    "the Frostfang",
    "the Grimshadow",
    "the Thornheart",
    "the Thunderfist",
    "the Skystorm",
    "Bloodthirst",
    "the Darkstorm",
    "the Warhawk",
    "the Sunblade",
    "the Stormrage",
    "the Frostfire",
    "the Flamestrider",
    "the Steelclaw",
    "the Blackthorn",
    "the Doomgiver",
    "the Darkrider",
    "the Bloodreaper",
    "the Dreadlord",
    "the Shadowflame",
    "the Ironbark",
    "the Moonblade",
    "the Skybreaker",
    "the Nightwalker",
    "the Deathbringer",
    "the Thunderstrike",
    "the Warlock",
    "the Flamekin",
    "the Stormborn",
    "the Frostwolf",
    "the Ironsoul",
    "the Shadowdancer",
    "the Firestorm",
    "the Bloodmoon",
    "the Nightwing",
    "the Warhammer",
    "the Frostbite",
    "the Shadowscythe",
    "the Emberheart",
    "the Dreadwing",
    "the Warden",
];

function formatString(inputString) {
    // Convert the string to lowercase
    var lowercaseString = inputString.toLowerCase();
    // Replace spaces with underscores
    var formattedString = lowercaseString.replace(/\s+/g, '_');
    return formattedString;
}

function draw_grid(data) {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var width_cell = 2;
    var height_cell = 2;

    var canvas = document.getElementById("grid")
    if (canvas == null) {
        canvas = document.createElement('canvas');
        canvas.id = "grid";
        canvas.width = width;
        canvas.height = height;
        document.getElementsByTagName('body')[0].appendChild(canvas);
    }

    var context = canvas.getContext("2d");

    function draw_cells() {

        for (var i = 0; i < grid_length; i++) {
            for (var ii = 0; ii < grid_width; ii++) {
                if (_data && _data[i][ii] === color_for_cell(data[i][ii])) {
                    continue;
                }
                context.clearRect(i * width_cell, ii * height_cell, width_cell, height_cell);
                context.fillStyle = color_for_cell(data[i][ii]);
                context.fillRect(i * width_cell, ii * height_cell, width_cell, height_cell);
            }
        }

    }
    draw_cells();
    if (!_data) {
        _data = [];
    }
    for (var i = 0; i < grid_length; i++) {
        _data[i] = [];
        for (var ii = 0; ii < grid_width; ii++) {
            _data[i][ii] = color_for_cell(data[i][ii]);
        }
    }
}


function update_grid(data) {
    draw_grid(data);
}


var color_for_cell = function(cell) {
    for (var i = 0; i < grid_length; i = i + 1) {
        for (var ii = 0; ii < grid_width; ii = ii + 1) {
            if (cell.nest > 0) {
                return "rgba(46, 44, 39," + Math.pow(cell.nest / 10, 0.5) + ")";
            } else if (cell.has_ant()) {
                if (cell.ant.is_fire) {
                    return cell.ant.has_food ? "rgb(168,190,6)" : "rgb(" + colours[type2_formatted + '_colour'] + ")";
                } else {
                    return cell.ant.has_food ? "rgb(159,248,101)" : "rgb(" + colours[type1_formatted + '_colour'] + ")";
                }
            }
            else if (cell.food > 0) {
                return "rgba(86,169,46," + Math.pow(cell.food / 10, 0.5) + ")";
            }
            else {
                if (cell.signal > 0) {
                    if (paths_on) {
                        var signal = cell.signal > 1 ? 1 : cell.signal;
                        return "rgba(150,126,86," + cell.signal + ")";
                    } else { return "rgb(125, 101, 61)"; }
                }
                else {
                        return "rgb(125, 101, 61)";
                }
            }

        }
    }
}

var opacity_for_signal = function(cell) {
    if (paths_on) {
        return cell.has_ant() ? "1.0" : cell.signal;
    }
}



Math.to_radians = function(degrees) {
    return degrees * Math.PI / 180;
};

Math.to_degrees = function(radians) {
    return radians * 180 / Math.PI;
};

class Cell {
    constructor(i, ii) {
        this.i = i;
        this.ii = ii;
        this.ant = null;
        this.food = 0;
        this.nest = 0;
        this.signal = 0;
        this.has_ant = function() {
            return this.ant ? true : false;
        };
    }
}

class Ant {
    constructor(fire) {
        this.has_food = false;
        this.is_fire = fire;
        this.XP = 0;
        this.name = "";
        this.colour = "";
        this.lifespan = get_random_int(60000, 720000);
        this.last_signal = 0;
        this.orientation = Math.random() * 360;
    }
}

class Nest {
    constructor(i, ii, fire) {
        this.is_fire_nest = fire;
        this.i = i;
        this.ii = ii;
    }
}



function init_grids() {
    for (var i = 0; i < grid_length; i = i + 1) {
        grid[i] = [];
        temp_grid[i] = [];
        for (var ii = 0; ii < grid_width; ii = ii + 1) {
            grid[i][ii] = new Cell(i, ii);
            temp_grid[i][ii] = new Cell(i, ii);
        }
    }
}

function initialize_simulation() {
    init_grids();
    draw_grid(grid.map(function(row) { return row.map(function(cell) { return cell; }); }));
}

initialize_simulation();
var interval_id = setInterval(simulate_and_visualize, ms_between_updates);


function simulate_and_visualize() {
    repeatAction(run_time_step, speed.value);
    update_grid(grid.map(function(row) { return row.map(function(cell) { return cell; }); }));
}

function place_food() {
    var max_distance_length = grid_length / 10;
    var max_distance_width = grid_width / 10;
    var random_i = Math.floor(Math.random() * (window.innerWidth / 2));
    var random_ii = Math.floor(Math.random() * (window.innerHeight / 2));
    for (var i = random_i - max_distance_length; i <= random_i + max_distance_length; i++) {
        for (var ii = random_ii - max_distance_width; ii < random_ii + max_distance_width; ii++) {
            var bounded_i = get_bounded_index(i, false);
            var bounded_ii = get_bounded_index(ii, true);
            if (bounded_i >= 0 && bounded_i < (window.innerWidth / 2) && bounded_ii >= 0 && bounded_ii < (window.innerHeight / 2)) {
                var distance = calc_distance(random_i, random_ii, bounded_i, bounded_ii);
                var food_level = Math.round(10 - Math.pow(distance, 1.2));
                grid[bounded_i][bounded_ii].food = food_level;
            }
        }
    }
}

function place_nest(i, ii) {
    var max_distance_length = grid_length / 10;
    var max_distance_width = grid_width / 10;
    var random_i = i;
    var random_ii = ii;
    for (var i = random_i - max_distance_length; i <= random_i + max_distance_length; i++) {
        for (var ii = random_ii - max_distance_width; ii < random_ii + max_distance_width; ii++) {
            var bounded_i = get_bounded_index(i, false);
            var bounded_ii = get_bounded_index(ii, true);
            if (bounded_i >= 0 && bounded_i < grid_length && bounded_ii >= 0 && bounded_ii < (window.innerHeight / 2)) {
                var distance = calc_distance(random_i, random_ii, bounded_i, bounded_ii);
                var nest_level = Math.round(50 - Math.pow(distance, 1.2));
                grid[bounded_i][bounded_ii].nest = nest_level;
            }
        }
    }
}

function run_time_step() {
    move_ants();
    check_for_food();
    check_if_in_nest();
    sense_signal();
    mobile_fix();
    setTimeout(update_stats, 1);
    for (var i = 0; i < grid_length; i++) {
        for (var ii = 0; ii < grid_width; ii++) {
            if (grid[i][ii].has_ant()) {
                ant_combat(i, ii);
            }
        }
    }
}


function sense_signal() {
    for (var i = 0; i < grid_length; i = i + 1) {
        for (var ii = 0; ii < grid_width; ii = ii + 1) {
            if (grid[i][ii].has_ant()) {
                grid[i][ii].ant.last_signal = grid[i][ii].signal;
            }
        }
    }
}

function move_ants() {
    for (var i = 0; i < grid_length; i = i + 1) {
        for (var ii = 0; ii < grid_width; ii = ii + 1) {
            if (grid[i][ii].has_ant()) {
                move_ant(i, ii);
            }
        }
    }


    // signal
    for (var i = 0; i < grid_length; i = i + 1) {
        for (var ii = 0; ii < grid_width; ii = ii + 1) {
            // adjust reference
            grid[i][ii].ant = temp_grid[i][ii].ant;
            if (grid[i][ii].has_ant() && grid[i][ii].ant.has_food) {
                bounded_i = get_bounded_index(i, false);
                bounded_ii = get_bounded_index(ii, true);
                var signal_strength = 50 - Math.pow(0.5, 1 / calc_distance(i, ii, bounded_i, bounded_ii));
                grid[bounded_i][bounded_ii].signal += signal_strength;
            }
            else {
                grid[i][ii].signal *= 0.95;
            }
            if (grid[i][ii].signal < 0.05) {
                grid[i][ii].signal = 0;
            }
        }
    }
    move_ant_out_of_nest();
}


function move_ant_out_of_nest() {
    var i = nest_i;
    var ii = nest_ii;
    var iii = nest_iii;
    var iiii = nest_iiii;
    var new_coords = get_random_coordinates(i, ii, false);
    var new_coords_2 = get_random_coordinates(iii, iiii, true);
    var ants_out_of_nest = 0;
    var j = new_coords[0];
    var jj = new_coords[1];
    var jjj = new_coords_2[0];
    var jjjj = new_coords_2[1];
    if (fire) {
        ants_out_of_nest = type2_ants_out_of_nest;
        if (max_ants_on_grid <= ants_out_of_nest) {
            type2_done = true;
        }
    } else {
        ants_out_of_nest = type1_ants_out_of_nest;
        if (max_ants_on_grid <= ants_out_of_nest) {
            type1_done = true;
        }
    }



    if (ants_out_of_nest < max_ants_on_grid) {
        if (!fire) {
            if (!type1_done) {
                if (!grid[j][jj].has_ant()) {
                    grid[j][jj].ant = new Ant(fire);
                    temp_grid[j][jj].ant = grid[j][jj].ant;
                    type1_ants_out_of_nest++;
                    fire = true;
                }
            }
        } else {
            if (!type2_done) {
                if (!grid[jjj][jjjj].has_ant()) {
                    grid[jjj][jjjj].ant = new Ant(fire);
                    temp_grid[jjj][jjjj].ant = grid[jjj][jjjj].ant;
                    type2_ants_out_of_nest++;
                    fire = false;
                }
            }
        }
    }
}

function get_coords_from_orientation(i, ii) {
    var coords = [];
    var orientation_radians = Math.to_radians(grid[i][ii].ant.orientation)
    coords.push(get_bounded_index(Math.round(i + Math.cos(orientation_radians)), false));
    coords.push(get_bounded_index(Math.round(ii + Math.sin(orientation_radians)), true));
    return coords;
}

function move_ant(i, ii) {
    var new_coords, j, jj;
    if (grid[i][ii].ant.has_food) {
        var current_distance = calc_distance_to_nest(i, ii, grid[i][ii].ant.is_fire);
        do {
            grid[i][ii].ant.orientation = Math.random() * 360;
            new_coords = get_coords_from_orientation(i, ii);
            j = new_coords[0];
            jj = new_coords[1];
        } while (calc_distance_to_nest(j, jj, grid[i][ii].ant.is_fire) >= current_distance);
    }
    else {
        // random movement in case there is no signal
        new_coords = get_coords_from_orientation(i, ii);
        j = new_coords[0];
        jj = new_coords[1];
        if (grid[i][ii].ant.is_fire) {
            grid[i][ii].ant.orientation += Math.random() * 45 - 22.5;
        } else if (grid[i][ii].ant.is_fire === false) {
            grid[i][ii].ant.orientation += Math.random() * 45 - 22.5;
        }

        if (grid[i][ii].lifespan <= 0) {
            remove_ant_from_leaderboard(grid[i][ii]);
            grid[i][ii].ant = null;
            temp_grid[i][ii].ant = null;
        }
        // let's check for some signal
        var last = grid[i][ii].ant.last_signal;
        var minSignalStrength = Infinity;
        var minSignalCoords = [];

        for (var n_i = i - 1; n_i <= i + 1; n_i++) {
            for (var n_ii = ii - 1; n_ii <= ii + 1; n_ii++) {
                var bounded_n_i = get_bounded_index(n_i, false);
                var bounded_n_ii = get_bounded_index(n_ii, true);

                if (grid[bounded_n_i][bounded_n_ii].signal > 0) {
                    if (grid[bounded_n_i][bounded_n_ii].signal < minSignalStrength) {
                        minSignalStrength = grid[bounded_n_i][bounded_n_ii].signal;
                        minSignalCoords = [bounded_n_i, bounded_n_ii];
                    }
                }
            }
        }

        if (minSignalCoords.length > 0) {
            j = minSignalCoords[0];
            jj = minSignalCoords[1];
        }
    }
    // some randomness
    if (Math.random() < 0.05) {
        new_coords = get_random_coordinates(i, ii);
        j = new_coords[0];
        jj = new_coords[1];
    }
    // now that we have new coords:
    if (!temp_grid[j][jj].has_ant()) {
        // adjust reference
        temp_grid[j][jj].ant = temp_grid[i][ii].ant;
        temp_grid[i][ii].ant = null;
    }
}


function calc_distance(i, ii, j, jj) {
    return Math.pow(Math.pow(Math.abs(i - j), 2) + Math.pow(Math.abs(ii - jj), 2), 0.5);
}

function calc_distance_to_nest(i, ii, firey) {
    if (!firey) {
        return calc_distance(i, ii, nest_i, nest_ii);
    } else {
        return calc_distance(i, ii, nest_iii, nest_iiii);
    }
}

function get_random_coordinates(i, ii, fire) {
    if (!fire) {
        var j = get_random_int(i - 1, i + 1);
        var jj = get_random_int(ii - 1, ii + 1);
    } else {
        var j = get_random_int(i - 1, i + 1);
        var jj = get_random_int(ii - 1, ii + 1);
    }
    j = get_bounded_index(j, false);
    jj = get_bounded_index(jj, true);
    return [j, jj];
}

function check_for_food(i, ii) {
    for (var i = 0; i < grid_length; i = i + 1) {
        for (var ii = 0; ii < grid_width; ii = ii + 1) {
            if (grid[i][ii].has_ant() && !grid[i][ii].ant.has_food) {
                if (grid[i][ii].food > 0) {
                    grid[i][ii].ant.has_food = true;
                    grid[i][ii].food--;
                }
            }
        }
    }
}

function check_if_in_nest(i, ii) {
    for (var i = 0; i < grid_length; i = i + 1) {
        for (var ii = 0; ii < grid_width; ii = ii + 1) {
            if (grid[i][ii].food > 0 && grid[i][ii].nest > 0) {
                grid[i][ii].food = 0;
            }
            if (grid[i][ii].has_ant() && grid[i][ii].ant.has_food) {
                if (grid[i][ii].nest > 0) {
                    grid[i][ii].ant.has_food = false;
                    if (!grid[i][ii].ant.is_fire) {
                        if (!grid[nest_i][nest_ii].has_ant()) {
                            grid[nest_i][nest_ii].ant = new Ant(false);
                            temp_grid[nest_i][nest_ii].ant = grid[nest_i][nest_ii].ant;
                            type1_ants_out_of_nest++;
                        }

                    } else {
                        if (!grid[nest_iii][nest_iiii].has_ant()) {
                            grid[nest_iii][nest_iiii].ant = new Ant(true);
                            temp_grid[nest_iii][nest_iiii].ant = grid[nest_iii][nest_iiii].ant;
                            type2_ants_out_of_nest++;
                        }



                    }
                }
            }
        }
    }
}

function randomArrayValue(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function ant_combat(i, ii) {
    var adjacent_cells = get_adjacent_cells(i, ii);
    var current_cell = grid[i][ii];
    for (var cell of adjacent_cells) {
        if (cell.has_ant() && cell.ant.is_fire !== current_cell.ant.is_fire) {
            // Fifty-fifty chance of one of them dying
            if (Math.random() < (0.5 + (cell.ant.XP - current_cell.ant.XP))) {
                if (cell.ant.is_fire) {
                    type2_ants_out_of_nest--;
                } else {
                    type1_ants_out_of_nest--;
                }

                if (cell.ant.XP != 0) {
                    current_cell.ant.XP += cell.ant.XP;
                } else {
                    current_cell.ant.XP += Math.round(((Math.random() / 100) + 0.01) * 100) / 100;
                }
                if (current_cell.ant.XP >= 0.4) {
                    current_cell.ant.XP = 0.4;
                }
                current_cell.ant.lifespan -= 6000;
                if (current_cell.ant.XP > 0.05) {
                    current_cell.ant.name = `${randomArrayValue(names)} ${randomArrayValue(endnames)}`;
                    current_cell.ant.colour = rndColour();
                    updateLeaderboard(current_cell);
                    console.log(current_cell.ant);
                }
                console.log(current_cell.ant.XP);
                remove_ant_from_leaderboard(cell);
                cell.ant = null; // Ant in the adjacent cell dies
                temp_grid[cell.i][cell.ii].ant = null; // Reflect the change in the temporary grid
            } else {
                if (current_cell.ant.is_fire) {
                    type2_ants_out_of_nest--;
                } else {
                    type1_ants_out_of_nest--;
                }
                if (current_cell.ant.XP != 0) {
                    cell.ant.XP += current_cell.ant.XP;
                } else {
                    cell.ant.XP += Math.round(((Math.random() / 100) + 0.01) * 100) / 100;
                }
                if (cell.ant.XP > 0.4) {
                    cell.ant.XP = 0.4;
                }
                cell.ant.lifespan -= 6000;
                if (cell.ant.XP > 0.05) {
                    cell.ant.name = `${randomArrayValue(names)} ${randomArrayValue(endnames)}`;
                    updateLeaderboard(cell);
                    console.log(cell.ant);
                }
                console.log(cell.ant.XP);
                remove_ant_from_leaderboard(current_cell);
                current_cell.ant = null; // Current ant dies
                temp_grid[current_cell.i][current_cell.ii].ant = null; // Reflect the change in the temporary grid
                return; // No need to continue checking other adjacent cells
            }
        }
    }
}


function get_adjacent_cells(i, ii) {
    var adjacent_cells = [];
    for (var di = -1; di <= 1; di++) {
        for (var dii = -1; dii <= 1; dii++) {
            var ni = i + di;
            var nii = ii + dii;
            if (ni >= 0 && ni < grid_length && nii >= 0 && nii < grid_width) {
                adjacent_cells.push(grid[ni][nii]);
            }
        }
    }
    return adjacent_cells;
}


function get_random_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function rndColour() {
    return Math.floor(Math.random() * 16777215).toString(16);
}

function get_bounded_index(index, w) {
    var bounded_index = index;
    if (index < 0) {
        bounded_index = 0;
    }

    if (w) {
        if (index >= (grid_width)) {
            bounded_index = grid_width - 1;
        }
    } else {
        if (index >= grid_length) {
            bounded_index = grid_length - 1;
        }
    }
    return bounded_index;
}

function update_stats() {
    allpopulation.innerText = "Population: " + (type1_ants_out_of_nest + type2_ants_out_of_nest);
    type1population.innerText = type1 + ": " + type1_ants_out_of_nest;
    type2population.innerText = type2 + ": " + type2_ants_out_of_nest;
    if (type1_ants_out_of_nest <= 0) {
        winner.innerText = type2 + " win!";
        winner.style.display = "block";
    } else if (type2_ants_out_of_nest <= 0) {
        winner.innerText = type1 + " win!";
        winner.style.display = "block";
    }
}

function toggle_paths() {
    if (paths_on) {
        paths_on = false;
        paths.innerText = "Show paths";
    } else {
        paths_on = true;
        paths.innerText = "Hide paths";
    }
}

function updateLeaderboard(cell) {
    const strengthDiv = document.querySelector('.strength');
    const rows = strengthDiv.querySelectorAll('p');
    let existingRow = null;

    // Check if the name already exists in the leaderboard
    rows.forEach(row => {
        const playerName = row.dataset.name;
        if (playerName === cell.ant.name) {
            existingRow = row;
        }
    });

    // If the player already exists, update their points
    if (existingRow) {
        const existingPoints = parseInt(existingRow.dataset.points);
        if ((cell.ant.XP * 100) > existingPoints) {
            existingRow.dataset.points = cell.ant.XP * 100;
            reorderRows();
        }
    } else {
        // Create a new row for the player
        const newRow = document.createElement('p');
        if (cell.ant.is_fire) {
            newRow.style.color = "rgb(" + colours[type2_formatted + '_colour'] + ")";
        } else {
            newRow.style.color = "rgb(" + colours[type1_formatted + '_colour'] + ")";
        }
        newRow.style.textDecoration = "underline";
        newRow.style.textDecorationColor = `${cell.ant.colour}`;
        newRow.dataset.name = cell.ant.name;
        newRow.dataset.points = cell.ant.XP * 100;
        newRow.textContent = `${cell.ant.name}: ${(cell.ant.XP * 100)}XP`;
        strengthDiv.appendChild(newRow);
        reorderRows();
    }
}

function reorderRows() {
    const strengthDiv = document.querySelector('.strength');
    const rows = Array.from(strengthDiv.querySelectorAll('p'));

    rows.sort((a, b) => {
        const pointsA = parseInt(a.dataset.points);
        const pointsB = parseInt(b.dataset.points);
        return pointsB - pointsA;
    });

    // Remove any excess rows beyond the top 5
    rows.slice(5).forEach(row => {
        strengthDiv.removeChild(row);
    });

    // Display the top 5 rows
    rows.slice(0, 5).forEach((row, index) => {
        // If row is not already in correct position, move it
        if (strengthDiv.children[index] !== row) {
            strengthDiv.insertBefore(row, strengthDiv.children[index]);
        }
        row.textContent = `${row.dataset.name}: ${Math.round(row.dataset.points)}XP`;
    });
}

function remove_ant_from_leaderboard(cell) {
    var rows = document.querySelectorAll('.strength p');
    for (var i = 0; i < rows.length; i++) {
        if (cell.ant.name) {
            if (rows[i].dataset.name === cell.ant.name) {
                rows[i].remove();
            }
        }
    }
}

function mobile_fix() {
    width = window.innerWidth;
    height = window.innerHeight;
    grid_length = 540;
    grid_width = grid_length;
    width_cell = 2;
    height_cell = 2;

    if (width < height) {

        stats.style.textAlign = "center";
    } else {
        //document.body.style.transform = "rotate(0deg)";
        stats.style.textAlign = "left";
    }
}

function toggle_portrait() {
    if (portrait) {
        portrait = false;
        portrait_button.innerText = "Portrait";
        document.body.style.transform = "rotate(90deg)";
    } else {
        portrait = true;
        portrait_button.innerText = "Landscape";
        document.body.style.transform = "rotate(0deg)";
    }
}

window.addEventListener('resize', mobile_fix);

function repeatAction(action, n) {
    for (let i = 0; i < n; i++) {
        action();
    }
}
repeatAction(place_food, 15);
place_nest(nest_i, nest_ii);
place_nest(nest_iii, nest_iiii);
setInterval(place_food, 1440000);