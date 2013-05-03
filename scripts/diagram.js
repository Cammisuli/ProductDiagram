// © SOTI Inc. 2013
// Jonathan Cammisuli

$(document).ready(function () {

    //setup default jsplumb settings
    jsPlumb.Defaults.Anchor = ["Perimeter", { shape: "square", anchorCount: 150}];
    jsPlumb.Defaults.Connector = ["StateMachine", { cssClass: "connection"}];
    jsPlumb.Defaults.Endpoint = "Blank";
    jsPlumb.Defaults.MaxConnections = -1;
    jsPlumb.Defaults.PaintStyle = { lineWidth: 2.5, strokeStyle: "#456", outlineColor: "white", outlineWidth: 5 };
    jsPlumb.Defaults.ConnectionOverlays = [
					["PlainArrow", { location: 1, width: 12, length: 10}]
				];

    var endpointOptions = {
        isSource: true,
        isTarget: true,
        maxConnections: -1
    }

    jsPlumb.draggable($(".contain"), {
        containment: "parent",
        scroll: false
    });

    // Create functions here
    function getTitle(selection) {
        return $("#title").html(selection.toUpperCase() + ' DIAGRAM');
    }
    function hideAll() {
        $(".contain").css("display", "none");
        $(".cloud").css("display", "none");
        $(".firewall").css("display", "none");
        jsPlumb.detachEveryConnection();
        $("input[type='checkbox']").prop("checked", false);
    }
    function showComponent(component) {
        //return component.css("display", "inline");
        return component.fadeIn(100);
    }
    function removeComponent(component) {
        return component.fadeOut(100);
    }
    function getSource(array, source) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][0] == source) {
                return array[i][1];
            }
        }
    }
    function getTarget(array, target) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][0] == target) {
                return array[i][1];
            }
        }
    }
    function setConnection(sourceName, targetName, labelText) {

        if (labelText == null) {
            var connection = {
                source: sourceName,
                target: targetName
            };
        }
        else {
            var connection = {
                source: sourceName,
                target: targetName,
                overlays: [["Label", { cssClass: "cssLabel", label: labelText}]]
            };
        }


        return connection;
    }

    function initialSetup(selection, multiple) {
        if (selection == "internal" && multiple == false) {
            $("#device").css("display", "inline").css("top", diagram.height() / 2 + 50);
            $("#mcServer").css("display", "inline").css("top", diagram.height() / 2).css("left", diagram.width() / 2 - $("#mcServer").width() + 50);
            showComponent($("#webConsole")).css("top", diagram.height() / 2).css("left", diagram.width() - $("#webConsole").width());
            showComponent($("#sqlServer")).css("top", $("#sqlServer").height()).css("left", diagram.width() - $("#webConsole").width());
            jsPlumb.connect(setConnection($("#mcServer"), $("#sqlServer"), "1433"));
            jsPlumb.connect(setConnection($("#device"), $("#mcServer"), "5494"));
            jsPlumb.connect(setConnection($("#webConsole"), $("#mcServer"), "443"));
        } else if (selection == "internal" && multiple == true) {
            $("#device").css("display", "inline").css("top", diagram.height() / 2 + 50);
            $("#mcManageServer").css("display", "inline").css("top", diagram.height() / 2).css("left", diagram.width() / 2 - $("#mcManageServer").width() + 50);
            $("#mcDepServer").css("display", "inline").css("top", diagram.height() / 4).css("left", diagram.width() / 2 - $("#mcDepServer").width() + 50);
            showComponent($("#webConsole")).css("top", diagram.height() / 2).css("left", diagram.width() - $("#webConsole").width());
            showComponent($("#sqlServer")).css("top", $("#sqlServer").height()).css("left", diagram.width() - $("#webConsole").width());
            jsPlumb.connect(setConnection($("#mcManageServer"), $("#sqlServer"), "1443"));
            jsPlumb.connect(setConnection($("#mcDepServer"), $("#sqlServer"), "1443"));
            jsPlumb.connect(setConnection($("#device"), $("#mcDepServer"), "5494"));
            jsPlumb.connect(setConnection($("#webConsole"), $("#mcManageServer"), "443"));
            jsPlumb.connect(setConnection($("#mcManageServer"), $("#mcDepServer"), "5494 / 5495"));
        } else if (selection == "dmz" && multiple == false) {
            showComponent($("#firewall1")).css("left", $("#diagram").width() / 3 - $("#firewall1").width()).css("position", "absolute");
            showComponent($("#firewall2")).css("left", $("#diagram").width() / 1.5 - $("#firewall1").width()).css("position", "absolute");
            $("#device").css("display", "inline").css("top", diagram.height() / 2 + 50);
            $("#mcServer").css("display", "inline").css("top", diagram.height() / 2).css("left", diagram.width() / 2 - $("#mcServer").width() + 50);
            showComponent($("#webConsole")).css("top", diagram.height() / 2).css("left", diagram.width() - $("#webConsole").width());
            showComponent($("#sqlServer")).css("top", $("#sqlServer").height()).css("left", diagram.width() - $("#webConsole").width());
            jsPlumb.connect(setConnection($("#mcServer"), $("#sqlServer"), "1443"));
            jsPlumb.connect(setConnection($("#device"), $("#mcServer"), "5494"));
            jsPlumb.connect(setConnection($("#webConsole"), $("#mcServer"), "443"));
        } else if (selection == "dmz" && multiple == true) {
            showComponent($("#firewall1")).css("left", $("#diagram").width() / 3 - $("#firewall1").width()).css("position", "absolute");
            showComponent($("#firewall2")).css("left", $("#diagram").width() / 1.5 - $("#firewall1").width()).css("position", "absolute");
            $("#device").css("display", "inline").css("top", diagram.height() / 2 + 50);
            $("#mcManageServer").css("display", "inline").css("top", diagram.height() / 2).css("left", diagram.width() / 2 - $("#mcManageServer").width() + 50);
            $("#mcDepServer").css("display", "inline").css("top", diagram.height() / 4).css("left", diagram.width() / 2 - $("#mcDepServer").width() + 50);
            showComponent($("#webConsole")).css("top", diagram.height() / 2).css("left", diagram.width() - $("#webConsole").width());
            showComponent($("#sqlServer")).css("top", $("#sqlServer").height()).css("left", diagram.width() - $("#webConsole").width());
            jsPlumb.connect(setConnection($("#mcManageServer"), $("#sqlServer"), "1443"));
            jsPlumb.connect(setConnection($("#mcDepServer"), $("#sqlServer"), "1443"));
            jsPlumb.connect(setConnection($("#device"), $("#mcDepServer"), "5494"));
            jsPlumb.connect(setConnection($("#webConsole"), $("#mcManageServer"), "443"));
            jsPlumb.connect(setConnection($("#mcManageServer"), $("#mcDepServer"), "5494 / 5495"));
        } else if (selection == "cloud" && multiple == false) {
            showComponent($("#firewall2")).css("left", $("#diagram").width() / 1.5 - $("#firewall1").width()).css("position", "absolute");
            $("#device").css("display", "inline").css("top", diagram.height() / 2 + 50);
            $("#mcServer").css("display", "inline").css("top", diagram.height() / 3).css("left", 0);
            showComponent($("#cloudInternet")).css("top", diagram.height() / 2 - $("#cloudInternet").height()).css("left", diagram.width() / 2 - $("#cloudInternet").width());
            showComponent($("#webConsole")).css("top", diagram.height() / 2).css("left", diagram.width() - $("#webConsole").width());
            jsPlumb.connect(setConnection($("#device"), $("#cloudInternet")));
            jsPlumb.connect(setConnection($("#webConsole"), $("#cloudInternet"), "443"));
            jsPlumb.connect(setConnection($("#cloudInternet"), $("#mcServer")));
        }
    }

    function loadDiagram(hash) {

        try {
            var splitHash = hash.split("-");
            if (hash != "") {
                $("#start").css("display", "none");
                if (splitHash[0] == "#INT") {
                    getTitle("internal");
                    if (splitHash[1] == "2") {
                        initialSetup("internal", false);
                    } else {
                        initialSetup("internal", true);
                    }

                } else if (splitHash[0] == "#DMZ") {
                    getTitle("dmz");
                    if (splitHash[1] == "2") {
                        initialSetup("dmz", false);
                    } else {
                        initialSetup("dmz", true);
                    }
                } else if (splitHash[0] == "#CLOUD") {
                    getTitle("cloud");
                    if (splitHash[1] == "2") {
                        initialSetup("cloud", false);
                    } else {
                        initialSetup("cloud", false);
                    }
                }


                splitComponents = splitHash[2].split(",");
                if (splitComponents.indexOf("1") !== -1) {
                    if (splitHash[0] != "#CLOUD") {
                        $("#chkAPNS").trigger("click");
                    }
                }
                if (splitComponents.indexOf("2") !== -1) {
                    if (splitHash[0] == "#INT") {
                        $("#chkFirewall").trigger("click");
                    }
                }
                if (splitComponents.indexOf("3") !== -1) {
                    $("#chkLDAP").trigger("click");
                }
                if (splitComponents.indexOf("4") !== -1) {
                    $("#chkCA").trigger("click");
                }
                if (splitComponents.indexOf("5") !== -1) {
                    $("#chkExchange").trigger("click");
                }
                if (splitComponents.indexOf("6") !== -1) {
                    if (splitComponents.indexOf("5") !== -1) {
                        $("#chkExchange").prop("checked", true);
                        $("#chkExchangeFilter").trigger("click");
                    }
                }
            }
        }
        catch (err) {
            initialSetup("internal", false);
        }
    }
    ////


    var custom = location.hash;
    var environmentHash;
    var multipleHash;

    var diagram = $("#diagram");
    //initial setup
    $("input[name=rdoEnvi]").change(function () {

        environmentHash = "";


        $("#rdoNo").prop("checked", true);
        $("#chkFirewall").prop("disabled", true);
        $("#chkAPNS").prop("disabled", false);


        //reset diagram
        hideAll();


        //hide the starting message
        $("#start").css("display", "none");

        var selection = $("input[name=rdoEnvi]:checked").val();

        if (selection == "dmz") {
            getTitle(selection);

            $("#options").fadeIn();
            $("#additionalOptions").fadeIn();
            initialSetup(selection, false);
            environmentHash = "DMZ";
            //location.hash = environmentHash + "-2-";

        }
        else if (selection == "internal") {

            getTitle(selection);
            $("#chkFirewall").prop("disabled", false);
            $("#options").fadeIn();
            $("#additionalOptions").fadeIn();
            initialSetup(selection, false);
            environmentHash = "INT";
            //location.hash = environmentHash + "-2-";
        }
        else if (selection == "cloud") {
            getTitle(selection);
            if ($("#options").css("display") != "none") {
                $("#options").fadeOut();
            }
            $("#additionalOptions").fadeIn();
            initialSetup(selection, false);
            $("#chkAPNS").prop("disabled", true);
            environmentHash = "CLOUD";
            // location.hash = environmentHash + "-2-";
        }

    });

    $("input[name='rdoMultiple']").change(function () {

        //location.hash = environmentHash;
        multipleHash = location.hash;
        //reset diagram
        hideAll();
        var multiServer = $("input[name=rdoMultiple]:checked").val();
        var selection = $("input[name=rdoEnvi]:checked").val();
        // if user select yes for multiple servers, change the layout
        if (multiServer == "yes") {

            if (selection == "dmz") {
                getTitle(selection);
                initialSetup(selection, true);
            }
            else if (selection == "internal") {
                getTitle(selection);
                initialSetup(selection, true);

            }
            else if (selection == "cloud") {
                getTitle(selection);
                initialSetup(selection, true);
            }
            // location.hash = location.hash += "-1-";


            // if user select no for multiple servers, leave everything default
        } else {
            if (selection == "dmz") {
                getTitle(selection);
                initialSetup(selection, false);
            }
            else if (selection == "internal") {

                getTitle(selection);
                initialSetup(selection, false);
            }
            else if (selection == "cloud") {
                getTitle(selection);
                initialSetup(selection, false);
            }
            //location.hash = location.hash += "-2-";
        }
    });


    $("#chkAPNS").change(function () {
        var selection = $("input[name=rdoEnvi]:checked").val();
        if ($(this).is(":checked")) {
            showComponent($("#APNS")).css("top", diagram.height() / 3);
            if ($("#mcServer").css("display") == "none") {
                jsPlumb.connect(setConnection($("#mcDepServer"), $("#APNS"), "2195 / 2196"));
                jsPlumb.connect(setConnection($("#device"), $("#APNS"), "5223"));
            }
            else {
                jsPlumb.connect(setConnection($("#mcServer"), $("#APNS"), "2195 / 2196"));
                jsPlumb.connect(setConnection($("#device"), $("#APNS"), "5223"));
            }
            if (location.hash.indexOf("1,") == -1) {
                //location.hash = location.hash + "1,";
            }
        }
        else {
            jsPlumb.detachAllConnections($("#APNS"));
            removeComponent($("#APNS"));
            var removeHash = location.hash;
            location.hash = removeHash.replace("1,", "");
        }
    });

    $("#chkFirewall").change(function () {
        if ($(this).is(":checked")) {
            showComponent($("#firewall1")).css("left", $("#diagram").width() / 3 - $("#firewall1").width()).css("position", "absolute");
            if (location.hash.indexOf("2,") == -1) {
                //location.hash = location.hash + "2,";
            }
        }
        else {
            removeComponent($("#firewall1"));
            var removeHash = location.hash;
            location.hash = removeHash.replace("2,", "");
        }
    });



    $("#chkLDAP").change(function () {
        var selection = $("input[name=rdoEnvi]:checked").val();
        if ($(this).is(":checked")) {
            showComponent($("#ldapServer")).css("top", diagram.height() / 1.5).css("left", diagram.width() - $("#webConsole").width());
            if (selection == "cloud") {
                jsPlumb.connect(setConnection($("#cloudInternet"), $("#ldapServer"), "389 / 636 (SSL)"));
            }
            else {
                if ($("#mcServer").css("display") == "none") {
                    jsPlumb.connect(setConnection($("#mcManageServer"), $("#ldapServer"), "389 / 636 (SSL)"));
                }
                else {
                    jsPlumb.connect(setConnection($("#mcServer"), $("#ldapServer"), "389 / 636 (SSL)"));
                }
            }
            if (location.hash.indexOf("3,") == -1) {
                //location.hash = location.hash + "3,";
            }
        }
        else {
            jsPlumb.detachAllConnections($("#ldapServer"));
            removeComponent($("#ldapServer"));
            var removeHash = location.hash;
            location.hash = removeHash.replace("3,", "");
        }
    });

    $("#chkCA").change(function () {
        var selection = $("input[name=rdoEnvi]:checked").val();
        if ($(this).is(":checked")) {
            showComponent($("#CA")).css("display", "inline").css("top", diagram.height() / 3.5 + 30).css("left", diagram.width() - $("#webConsole").width());
            if (selection == "cloud") {
                jsPlumb.connect(setConnection($("#cloudInternet"), $("#CA"), "443"));
            }
            else {
                if ($("#mcServer").css("display") == "none") {
                    jsPlumb.connect(setConnection($("#mcDepServer"), $("#CA"), "443"));
                }
                else {
                    jsPlumb.connect(setConnection($("#mcServer"), $("#CA"), "443"));
                }
            }
            if (location.hash.indexOf("4,") == -1) {
                //location.hash = location.hash + "4,";
            }
        }
        else {
            jsPlumb.detachAllConnections($("#CA"));
            removeComponent($("#CA"));
            var removeHash = location.hash;
            location.hash = removeHash.replace("4,", "");
        }
    });

    $("#chkExchange").change(function () {
        var selection = $("input[name=rdoEnvi]:checked").val();
        if ($(this).is(":checked")) {
            showComponent($("#exchangeServer")).css("display", "inline").css("top", diagram.height() - $("#exchangeServer").height() - 27).css("left", diagram.width() - $("#webConsole").width());
            if (selection == "cloud") {
                jsPlumb.connect(setConnection($("#cloudInternet"), $("#exchangeServer"), "443"));
            }
            else {
                if ($("#mcServer").css("display") == "none") {
                    jsPlumb.connect(setConnection($("#device"), $("#exchangeServer"), "443"));
                }
                else {
                    jsPlumb.connect(setConnection($("#device"), $("#exchangeServer"), "443"));
                }
            }
            if (location.hash.indexOf("5,") == -1) {
                //location.hash = location.hash + "5,";
            }
        }
        else {
            if ($("#chkExchangeFilter").is(":checked")) {
                $("#chkExchangeFilter").prop("checked", false);
                jsPlumb.detachAllConnections($("#exchangeFilter"));
                removeComponent($("#exchangeFilter"));
                var removeHash = location.hash;
                location.hash = removeHash.replace("6,", "");
            }
            jsPlumb.detachAllConnections($("#exchangeServer"));
            removeComponent($("#exchangeServer"));
            var removeHash = location.hash;
            location.hash = removeHash.replace("5,", "");
        }
    });

    $("#chkExchangeFilter").change(function () {
        var selection = $("input[name=rdoEnvi]:checked").val();
        if ($(this).is(":checked")) {
            if (!$("#chkExchange").is(":checked")) {
                $("#chkExchange").prop("checked", true);
                showComponent($("#exchangeServer")).css("display", "inline").css("top", diagram.height() - $("#exchangeServer").height() - 27).css("left", diagram.width() - $("#webConsole").width());
                showComponent($("#exchangeFilter")).css("display", "inline").css("top", diagram.height() - $("#exchangeFilter").height() - 27).css("left", diagram.width() / 1.5);
                if (selection == "cloud") {
                    jsPlumb.connect(setConnection($("#exchangeFilter"), $("#exchangeServer"), "443"));
                    jsPlumb.connect(setConnection($("#cloudInternet"), $("#exchangeFilter"), "443"));
                }
                else {
                    if ($("#mcServer").css("display") == "none") {
                        jsPlumb.connect(setConnection($("#exchangeFilter"), $("#mcManageServer"), "443"));

                    }
                    else {
                        jsPlumb.connect(setConnection($("#exchangeFilter"), $("#mcServer"), "443"));
                    }
                    jsPlumb.connect(setConnection($("#exchangeFilter"), $("#exchangeServer"), "443"));
                    jsPlumb.connect(setConnection($("#device"), $("#exchangeFilter"), "443"));
                }
                if (location.hash.indexOf("5,") == -1) {
                    //     location.hash = location.hash + "5,";
                }
                if (location.hash.indexOf("6,") == -1) {
                    //      location.hash = location.hash + "6,";
                }
            } else {
                showComponent($("#exchangeFilter")).css("display", "inline").css("top", diagram.height() - $("#exchangeServer").height() - 27).css("left", diagram.width() / 1.5);
                jsPlumb.detachAllConnections($("#exchangeServer"));
                jsPlumb.connect(setConnection($("#exchangeFilter"), $("#exchangeServer"), "443"));
                if (selection == "cloud") {
                    jsPlumb.connect(setConnection($("#cloudInternet"), $("#exchangeFilter"), "443"));
                } else {
                    if ($("#mcServer").css("display") == "none") {
                        jsPlumb.connect(setConnection($("#exchangeFilter"), $("#mcManageServer"), "443"));
                    }
                    else {
                        jsPlumb.connect(setConnection($("#exchangeFilter"), $("#mcServer"), "443"));
                    }
                    jsPlumb.connect(setConnection($("#device"), $("#exchangeFilter"), "443"));
                }
                if (location.hash.indexOf("6,") == -1) {
                    //   location.hash = location.hash + "6,";
                }
            }
        }
        else {
            jsPlumb.detachAllConnections($("#exchangeFilter"));
            removeComponent($("#exchangeFilter"));
            if ($("#chkExchange").is(":checked")) {
                if (selection == "cloud") {
                    jsPlumb.connect(setConnection($("#cloudInternet"), $("#exchangeServer"), "443"));
                }
                else {
                    if ($("#mcServer").css("display") == "none") {
                        jsPlumb.connect(setConnection($("#device"), $("#exchangeServer"), "443"));
                    }
                    else {
                        jsPlumb.connect(setConnection($("#device"), $("#exchangeServer"), "443"));
                    }
                }
            }
        }
    });
    //var getHash = location.hash;
    // loadDiagram(getHash);

    $('#diagram').resize(function () {
            console.log("diagram size " + $(this).width());
        });

    $(window).resize(function () {
        //$('#diagram').resize();
    });
});