'use strict';

(function(module) {
  const murderView = {};
  const render = Handlebars.compile($('#murders-template').text());

  murderView.index = function() {
    $('#murders-form').append(Murder.all.map(render));
  };

  module.murderView = murderView;
})(window);
