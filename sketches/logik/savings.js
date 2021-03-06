

/*
  Classes should have static function to save/load themself,
  save = put all its data into a json object.
  load = instansiate a object with data from an json object.
*/

class Serializable {
  toJson() {}
}

var saveObjects = [];

var loadedJSON;

let classes;

class SaveLoadManager {

  static load() {

    loadedJSON = loadJSON("logik_savegame.json");
  }

  static createObjects() {
    var logics = loadedJSON['Logics'];

    for (var i = 0; i < logics.length; i++) {
      var data = logics[i];
      var obj = new classes[data['class']](data['x'], data['y']);
      /* Set saved attributes values */
      var keys = Object.keys(data);

      for (var j = 0; j < keys.length; j++) {
        /* obj[keyname from data[0...length]] = data[0...length] */
        obj[keys[j]] = data[keys[j]];
      }

      mainHandler.world.addToWorld(obj);
    }
  }


  /* Each logic save its connection from its outputs...
  When creating objects wait with creating connnections,
  just add them to a waiting array until all logics exists.

  It most know from what logic and output index to
  what logic and input index or togglesocket...


   */
  static save() {
    var json = {};
    json['Logics'] = [];

    for (var i = 0; i < saveObjects.length; i++) {
      json['Logics'][i] = saveObjects[i].toJson();
    }

    print(json);
    saveJSON(json, 'logik_savegame.json')
  }

}
