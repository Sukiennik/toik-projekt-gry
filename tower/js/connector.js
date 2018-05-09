var host = "localhost"
var port = ":8080"
var full_host = host + port
var game_prefix = "http://" + full_host + "/"
var game_two = "tower/"
var game_two_dir = game_prefix + game_two
var interface_template_name = "interface.html"
var interface_template_path = game_prefix + interface_template_name

function init_tower(parsedConfig){
    if(init_tower.playerName != "" && init_tower.playerAge != -1){
        init(parsedConfig)
    }
    else{
        alert(
            "Set player name and age!"
        )
    }
}

function init(parsedConfig){
    saveConnectorData();
    var tower_launch_location = game_two_dir +  parsedConfig["index-dir"] + parsedConfig["index-source"]
    console.log("Loading: " + tower_launch_location + " from init function")
    window.location = tower_launch_location;
}

function saveConnectorData(){
    window.name = JSON.stringify(
        {
            playerName: init_tower.playerName,
            playerAge : init_tower.playerName,
        }
    );
}

function setPlayerAge(age){
    init_tower.playerAge = age
    console.log("Player Age: " + init_tower.playerAge)
}

function setPlayerName(name){
    init_tower.playerName = name
    console.log("Player Name: " + init_tower.playerName)
}

function sendScoreAndLoadInterface(score){
    var adapterData = JSON.parse(window.name);
    alert(
        "Sending score logic"
    )
    window.location = interface_template_path

}