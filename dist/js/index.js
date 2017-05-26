function direct(value) {
  if (value == -1) {
    today();
  } else {
    render_day(value, true);
  }
}
Handlebars.registerHelper('time', function(arg) {
  var time = new Date(today_midnight().getTime() + (arg * 1000));
  return time.toLocaleTimeString().substr(0,5);
});
const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
var selector = $("#daySelect");
var today = $("<option/>", {"value": "-1"});
today.text("Today");
today.appendTo(selector);
for (index in DAYS) {
  var option = $("<option/>");
  option.attr("value", index);
  var dayName = DAYS[index];
  option.text(dayName);
  option.appendTo(selector);
}

var $pageContent = $("#pageContent");
function today_midnight() {
  var date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

$.get("data/data.json", function (data) {
    var now = new Date();
  function renderDay(day_number, future) {
    $pageContent.empty();
    var currentTime;
    if (!future) {
      var date = today_midnight();
      currentTime = (now.getTime() - date.getTime()) / 1000;
    }
    $.each(data, function (key, value) {
      var hours = value["hours"][DAYS[day_number]];
      var data = {
        "location": value,
        "hours": hours
      };
      if (future) {
        data["future"] = true;
      } else {
        var open = false;
        $.each(hours, function (_, data) {
          if (data[0] < currentTime && data[1] > currentTime) {
            open = true;
          }
        });
        if (open) {
          data["open"] = true;
        } else {
          data["closed"] = true;
        }
      }
      var newCell = $("<div/>", {
        "class": "mdl-cell--4-col mdl-cell demo-card-wide mdl-card mdl-shadow--2dp no-dec"
      });
      newCell.html(templates.place(data));
      newCell.appendTo($pageContent);
    });
    $.each($(".image-icon"), function (_, item) {
      $(item).css("background", "url('" + item.dataset["image"] + "') center/cover");
    });
  }
  today = function () {
    renderDay(now.getDay(), false)
  };
  render_day = renderDay;
  today();
});