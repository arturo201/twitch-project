
let usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
let cb = '?client_id=5j0r5b7qb7kro03fvka3o8kbq262wwm&callback=?';
let url = "https://api.twitch.tv/kraken/";

  usernames.forEach(function(channel) {
    function makeURL(type, name) {
      return url + type + "/" + name + cb;
    }

    $.getJSON(makeURL("streams", channel), function(data) {
      let game,
      status;
      if(data.stream === null) {
        game = "Offline";
        status = "offline";
      } else if(data.stream === undefined) {
        game = "Account closed";
        status = "offline";
      } else {
        game = data.stream.game;
        status = "online";
      };
      $.getJSON(makeURL("channels", channel), function(data) {
          var logo = data.logo != null ? data.logo : "images/twitch-favicon.png",
            name = data.display_name != null ? data.display_name : channel,
            description = status === "online" ? ": " + data.status : "";
            var html = '<div class="row channel ' + status + '"><div class="col-xs-2 col-sm-3" id="icon"><img src="' + logo + '" class="logo"></div><div class="col-xs-10 col-sm-8 name" id="name"><a href="' + data.url + '" target="_blank">' + name + '</a></div><div class="col-xs-10 col-sm-8 game" id="streaming">' + game + '<span class="hidden-xs">' + description + '</span></div></div>';
          status === "online" ? $("#users").prepend(html) : $("#users").append(html);
      });
    });
  });

$(document).ready(function() {

  $(" .square").click(function() {
    var category = $(this).attr("id");
    var button = $(".square");

    if(category === "all") {
      button.removeClass("active");
      $("#all").addClass("active");
      $(".online, .offline").removeClass("hidden");
    } else if(category === "online") {
      button.removeClass("active");
      $("#online").addClass("active");
      $(".online").removeClass("hidden");
      $(".offline").addClass("hidden");
    } else if (category === "offline") {
      button.removeClass("active");
      $("#offline").addClass("active");
      $(".offline").removeClass("hidden");
      $(".online").addClass("hidden");
    }
  });
});
