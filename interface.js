var host = "localhost"
var port = ":8080"
var full_host = host + port
var game_prefix = "http://" + full_host + "/"
var game_one = "breakout/"
var game_two = "tower/"
var game_one_dir = game_prefix + game_one
var game_two_dir = game_prefix + game_two

var config_file_name = "config.json"


function chooseFirstGame(){
    getConfigAndPrepareGame("https://rawgit.com/Sukiennik/toik-projekt-gry/master/breakout/" + config_file_name, "https://rawgit.com/Sukiennik/toik-projekt-gry/master/breakout/")
}

function chooseSecondGame(){
    getConfigAndPrepareGame(game_two_dir + config_file_name, game_two_dir)
}

function getConfigAndPrepareGame(config, game_dir) {
    var request = new XMLHttpRequest();
    request.overrideMimeType("application/json");
    request.open('GET', config, true);
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            prepareGame(game_dir, request.responseText)
        }
    };
    request.send(null);
}

function prepareGame(gameDir, jsonConfig) {
    var parsedConfig = JSON.parse(jsonConfig);
    console.log(parsedConfig)
    var configGameName = parsedConfig["game-name"]
    deleteOldConnectorFromDOM(configGameName)
    addNewConnectorToDOM(configGameName, parsedConfig, gameDir, function() { setupGame(gameDir, parsedConfig)})
}

function deleteOldConnectorFromDOM(configGameName) {
    var element = document.getElementById(configGameName);
    if(typeof element !== 'undefined' && element != null) {
        element.parentNode.removeChild(element);
        console.log("Connector to game: .." + configGameName + ".. has been deleted from DOM.");
    }
}

function addNewConnectorToDOM(configGameName, parsedConfig, gameDir, setupFunction) {
    console.log(gameDir)
    var connectorFile = gameDir + parsedConfig["connector-dir"]  + parsedConfig["connector-source"]
    console.log(connectorFile)

    var connectorScriptElement = document.createElement('script')
    connectorScriptElement.setAttribute("id", configGameName)
    connectorScriptElement.setAttribute("src", connectorFile)
    connectorScriptElement.setAttribute("language", "javascript")
    connectorScriptElement.setAttribute("type", "text/javascript")
    connectorScriptElement.onload = setupFunction;
    document.head.appendChild(connectorScriptElement);
    console.log("Connector File Path: " + connectorFile)
}

function setupGame(home, parsedConfig){
    setPlayerName(parsedConfig, "-")
    setPlayerAge(parsedConfig, 0)
    startGame(parsedConfig)
}


function setPlayerName(parsedConfig, name){
    evaluateFromConfig(parsedConfig, "set-name", "\"" + name +"\"");
}

function setPlayerAge(parsedConfig, age){
    evaluateFromConfig(parsedConfig, "set-age", age);
}

function startGame(parsedConfig){
    var funName = parsedConfig["connector-interface"]["set-init"]["function-name"]
    var evaluationTxt = funName + "(parsedConfig)"
    console.log("Running game:  " + evaluationTxt)
    eval(evaluationTxt);
}

function evaluateFromConfig(parsedConfig, funKey, arg){
    var funName = parsedConfig["connector-interface"][funKey]["function-name"];
    var evaluationTxt = funName + "(" + arg + ")";
    console.log("Evaluating method:  " + evaluationTxt)
    eval(evaluationTxt);
}


























