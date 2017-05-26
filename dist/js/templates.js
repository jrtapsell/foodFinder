this["templates"] = this["templates"] || {};
this["templates"]["place"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"mdl-card__supporting-text mdl-grid status-bar open\"></div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"mdl-card__supporting-text mdl-grid status-bar closed\"></div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"mdl-card__supporting-text mdl-grid status-bar future\"></div>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " image-icon\" data-image=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.location : depth0)) != null ? stack1.image : stack1), depth0))
    + "\"";
},"9":function(container,depth0,helpers,partials,data) {
    return "\"";
},"11":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "    <div class=\"mdl-card__supporting-text mdl-grid\">\n        <div class=\"mdl-cell mdl-cell--6-col\">\n        <b>Opens:</b>\n            <p class=\"time\">"
    + alias3((helpers.time || (depth0 && depth0.time) || alias2).call(alias1,(depth0 != null ? depth0["0"] : depth0),{"name":"time","hash":{},"data":data}))
    + "</p>\n        </div>\n        <div class=\"mdl-cell mdl-cell--6-col\">\n        <b>Closes:</b>\n            <p class=\"time\">"
    + alias3((helpers.time || (depth0 && depth0.time) || alias2).call(alias1,(depth0 != null ? depth0["1"] : depth0),{"name":"time","hash":{},"data":data}))
    + "</p>\n        </div>\n    </div>\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"mdl-card__supporting-text\">\n        <b>Not open today</b>\n    </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "<a href=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.location : depth0)) != null ? stack1.link : stack1), depth0))
    + "\">\n"
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.open : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.closed : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.future : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        <div onclick=\"javascript:window.location='"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.location : depth0)) != null ? stack1.link : stack1), depth0))
    + "'\" class=\"mdl-card__title"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.location : depth0)) != null ? stack1.image : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + "\">\n    <h2 class=\"mdl-card__title-text\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.location : depth0)) != null ? stack1.displayName : stack1), depth0))
    + "</h2>\n</div>\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.hours : depth0),{"name":"each","hash":{},"fn":container.program(11, data, 0),"inverse":container.program(13, data, 0),"data":data})) != null ? stack1 : "")
    + "</a>";
},"useData":true});
this["templates"]["simple"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "A";
},"useData":true});