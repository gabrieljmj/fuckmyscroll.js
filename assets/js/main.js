window.onload = function () {  
  const fms = new FuckMyScroll({
    speed: 10,
    init: function (target) {
      console.log('Going to #' + target);
    },
    end: function (target) {
      console.log('Here we are!');
    }
  });

  fms.init();
};