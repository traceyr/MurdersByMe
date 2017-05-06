'use strict';
// IFFE STATEMENT HERE so it's global
(function(module) {
  // object constructor like this.name/name.something
  function Murder(opts){
    for (let key in opts) this[key] = opts[key];
  }

  Murder.all = [];
  Murder.getMurders = function(next){
    $.get({
      url: 'https://data.seattle.gov/resource/y7pv-r3kh.json?summarized_offense_description=HOMICIDE'
    })
    .then(data => Murder.loadMurders(data), err => console.error(err))
    .then(next);
  };
  //this in our function for loadMurders connected to our ajax call - it will push our new Murder to the murder.all empty array up top
  Murder.loadMurders = function(data){
    Murder.all = data.map(function(ele){
      return new Murder(ele);
    });
  };

  module.Murder = Murder;
})(window);
