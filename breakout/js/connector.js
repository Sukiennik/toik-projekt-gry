var host = "localhost"
var port = ":8080"
var full_host = host + port
var game_prefix = "http://" + full_host + "/"
var game_one = "breakout/"
var game_one_dir = game_prefix + game_one
var interface_template_name = "interface.html"
var interface_template_path = game_prefix + interface_template_name

function init_breakout(parsedConfig){
    console.log("ssssss")
    console.log(parsedConfig)
    if(init_breakout.playerName != "" && init_breakout.playerAge != -1){
        init(parsedConfig)
    }
    else{
        alert(
            "Set player name and age!"
        )
    }
}

function init(parsedConfig){
    //saveConnectorData();
    var breakout_launch_location = "https://rawgit.com/Sukiennik/toik-projekt-gry/master/breakout/" +  parsedConfig["index-dir"] + parsedConfig["index-source"]
    console.log("Loading: " + breakout_launch_location + " from init function")
    window.location = breakout_launch_location;
}

function saveConnectorData(){
    window.name = JSON.stringify(
        {
            playerName: init_breakout.playerName,
            playerAge : init_breakout.playerAge,
        }
    );
}

function setPlayerAge(age){
    init_breakout.playerAge = age
    console.log("Player Age: " + init_breakout.playerAge)
}

function setPlayerName(name){
    init_breakout.playerName = name
    console.log("Player Name: " + init_breakout.playerName)
}

function sendScoreAndLoadInterface(score){
    var adapterData = JSON.parse(window.name);
    alert(
        "Sending score logic"
    )
    window.location = "https://rawgit.com/Sukiennik/toik-projekt-gry/master/interface.html" //interface_template_path

}