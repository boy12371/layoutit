init();

function init() {
    var json = "data" + GetJson();
    $.getJSON(json, function (data) {
        $.each(data, function (key, val) {
            if ("undefined" != typeof val.text) {
                $(val.label).text(val.text);
            } else if ("undefined" != typeof val.html) {
                $(val.label).html(val.html);
            } else if ("undefined" != typeof val.attr) {
                var s = val.attr.split("=");
                $(val.label).attr(s[0], s[1]);
            } else if ("undefined" != typeof val.attr) {
                var s = val.attr.split("=");
                $(val.label).attr(s[0], s[1]);
            } else if ("undefined" != typeof val.addclass) {
                $(val.label).addClass(val.addclass);
            } else if ("undefined" != typeof val.removeclass) {
                $(val.label).removeClass(val.removeclass);
            }
        });
    });
}

function GetJson() {
    var p = window.location.pathname;
    var u = "index";
    if (p != "/") {
        s = p.split(".")
        u = s[0] + ".json";
    } else {
        u = "/" + u + ".json";
    }
    return u == null || u == "" || u == "undefined" ? "" : u;
}