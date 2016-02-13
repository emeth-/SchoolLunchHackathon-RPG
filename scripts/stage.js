
/** STAGE *****************************************************************************************/

Stage = {
    collisionsMap  : [],
    height         : 0,
    npcsMap        : [],
    playersMap     : [],
    portalsMap     : [],
    tileMap        : {
        height  : 50,
        width   : 50
    },
    width          : 0,

    /**
     *
     */
    center : function () {
        var
            left        = 0,
            player      = $('#player'),
            playerPos   = player.position(),
            stage       = $('#stage'),
            top         = 0,
            windowH     = $(window).height(),
            windowW     = $(window).width();

        left    = (windowW / 2) - (playerPos.left + (player.width() / 2));
        top     = (windowH / 2) - (playerPos.top + ((player.height() + 8)/ 2));

        if (Stage.width <= windowW && Stage.height <= windowH) {
            left    = (windowW - Stage.width) / 2;
            top     = (windowH - Stage.height) / 2;
        }

        if (Stage.width > windowW && stage.offset().left > 0 && playerPos.left < windowW
            && Stage.height > windowH && stage.offset().top > 0 && playerPos.top < windowH) {
            left    = 0;
            top     = 0;
        }

        stage.css({
            height  : Stage.height,
            left    : left + 'px',
            top     : top + 'px',
            width   : Stage.width
        });
    },

    /**
     *
     */
    checkButtons : function () {
        // Shift
        if (Game.pressedKeys[16]) {

        }

        // Spacebar, Enter
        if (Game.pressedKeys[13] || Game.pressedKeys[32]) {

        }

        switch (true) {

            // W, Up Arrow
            case ((Game.pressedKeys[87] || Game.pressedKeys[38])) :

                break;

            // S, Down Arrow
            case ((Game.pressedKeys[83] || Game.pressedKeys[40])) :

                break;

            // A, Left Arrow
            case ((Game.pressedKeys[65] || Game.pressedKeys[37])) :

                break;

            // D, Right Arrow
            case ((Game.pressedKeys[68] || Game.pressedKeys[39])) :

                break;

            default:

                break;
        }
    },

    /**
     *
     */
    cleanup : function () {
        Stage.collisionsMap   = [];
        Stage.npcsMap         = [];
        Stage.playersMap      = [];
        Stage.portalsMap      = [];

        $('.npc').each(function (index, element) {
            $(element).npc('destroy');
        });

        $('#player').each(function (index, element) {
            $(element).player('destroy');
        });

        $('#collisions').html('');
        // $('#modals').html('');
        $('#objects').html('');
        $('#tiles').html('');

        $(document).trigger('keyup');
    },

    /**
     *
     */
    drawCollisions : function (collisions) {
        var
            counter = 0,
            height  = collisions.height,
            row     = 0,
            width   = collisions.width;

        $.each(collisions.data, function (index, value) {
            if (!Stage.collisionsMap[row]) {
                Stage.collisionsMap[row] = {};
            }

            Stage.collisionsMap[row][counter] = (value === 2);

            if (value !== 0) { // 0 is empty, 2 is a collision
                $('#collisions').append(
                    '<div class="collision" '
                    + 'style="left: ' + (counter * Game.gridCellSize) + 'px; top: ' + (row * Game.gridCellSize) + 'px">'
                    + '</div>'
                );
            }

            counter += (index + 1) % width === 0 ? -counter : 1;
            row     += (index + 1) % width === 0 ? 1 : 0;
        });
    },

    /**
     *
     */
    drawObjects : function (objects) {
        $.each(objects.objects, function (index, value) {
            switch (value.type) {
                case 'player':
                    $.player.create(value);

                    break;

                case 'npc':
                    $.npc.create(value);

                    break;

                case 'doorway':
                    $('#objects').append(
                        '<div id="' + value.name + '" '
                        + 'class="object doorway" '
                        + 'data-area="' + value.properties.area + '" '
                        + 'style="left: ' + value.x + 'px; top: ' + (value.y - Game.gridCellSize) + 'px">'
                        + '</div>'
                    );

                    if (!Stage.portalsMap[(value.y / Game.gridCellSize) - 1]) {
                        Stage.portalsMap[(value.y / Game.gridCellSize) - 1] = {};
                    }

                    Stage.portalsMap[(value.y / Game.gridCellSize) - 1][(value.x / Game.gridCellSize)] = $('#' + value.name);

                    break;

                case 'stairs':
                    $('#objects').append(
                        '<div id="' + value.name + '" '
                        + 'class="object stairs" data-area="' + value.properties.area + '" '
                        + 'data-direction="' + value.properties.direction + '" '
                        + 'style="left: ' + value.x + 'px; top: ' + (value.y - Game.gridCellSize) + 'px">'
                        + '</div>'
                    );

                    if (!Stage.portalsMap[(value.y / Game.gridCellSize) - 1]) {
                        Stage.portalsMap[(value.y / Game.gridCellSize) - 1] = {};
                    }

                    Stage.portalsMap[(value.y / Game.gridCellSize) - 1][(value.x / Game.gridCellSize)] = $('#' + value.name);

                    break;
            }
        });
    },

    /**
     *
     */
    drawTiles : function (tiles) {
        var
            counter = 0,
            height  = tiles.height,
            row     = 0,
            width   = tiles.width;

        var yellow_brick_counter = 0;

        $.each(tiles.data, function (index, value) {
            var
                y   = Math.ceil(value / Stage.tileMap.width),
                x   = (value - ((y - 1) * Stage.tileMap.width));

            if (value !== 0) { // 0 is empty, therefore don't draw it
                var yellow_brick_road = "";
                var yellow_brick_counter_display = "";
                if (tiles.name == "tiles2" && value == 4) {
                    yellow_brick_road = " display:none;";
                    yellow_brick_counter += 1;
                    yellow_brick_counter_display = " yb"+yellow_brick_counter;
                }
                $('#tiles').append(
                    '<div class="tile t' + value + ' ' + tiles.name + yellow_brick_counter_display + '" '
                    + 'style="background-position: -' + ((x * Game.gridCellSize) - Game.gridCellSize) + 'px -' + ((y * Game.gridCellSize) - Game.gridCellSize) + 'px; '+ yellow_brick_road
                    + 'left: ' + (counter * Game.gridCellSize) + 'px; top: ' + (row * Game.gridCellSize) + 'px">'
                    + '</div>'
                );
            }

            counter += (index + 1) % width === 0 ? -counter : 1;
            row     += (index + 1) % width === 0 ? 1 : 0;
        });
    },

    /**
     *
     */
    init : function (stage) {
        var transition = $('#transition');

        transition.animate({
            opacity: 1
        }, 180, function () {
            Stage.cleanup();

            Game.loading = true;

            $.ajax({
                // cache       : false, // For development purposes
                dataType    : 'json',
                type        : 'GET',
                url         : '../json/'+ stage +'.json',
            }).done(function (data, textStatus, jqXHR) {
                Game.prevArea     = Game.currentArea;
                Game.currentArea  = stage;
                Stage.height      = data.height * Game.gridCellSize;
                Stage.width       = data.width * Game.gridCellSize;

                $.each(data.layers, function (index, value) {
                    var layer = value;

                    switch (true) {

                        // Collisions
                        case (layer.name == 'collisions') :
                            Stage.drawCollisions(layer);

                            break;

                        // Objects
                        case (layer.type == 'objectgroup') :
                            Stage.drawObjects(layer);

                            break;

                        // Tile Layer
                        default :
                            Stage.drawTiles(layer);

                            break;
                    }
                });

                for (i = 0; i < $('#player, .npc, .object, .tiles3').length; i++) {
                    Game.calculateZindex($('#player, .npc, .object, .tiles3').eq(i));
                }

                Stage.center();

                setTimeout(function(){
                    trigger_beginning()
                }, 2500);

                Game.loading = false;

                if (data.properties.music && Sounds.currentMusic.src != Sounds.music[data.properties.music]) {
                    Sounds.currentMusicId = data.properties.music;

                    Sounds.changeMusic(Sounds.music[data.properties.music]);
                }

                Sounds.fade(Sounds.currentMusic, data.properties.musicVol);

                transition.animate({
                    opacity: 0
                }, 180);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                // Do nothing
            }).always(function (data, textStatus, jqXHR) {
                // Do nothing
            });
        });
    },

    scrollStage : function (direction) {
        var
            player      = $('#player'),
            playerOff   = player.offset(),
            offset      = 0,
            scrollArea  = $('#scroll-area'),
            stage       = $('#stage'),
            stagePos    = stage.position(),
            stageL      = stagePos.left,
            stageT      = stagePos.top,
            windowH     = $(window).height(),
            windowW     = $(window).width();

        if ((Stage.width > windowW || Stage.height > windowH)) {
            switch (direction) {

                // Up
                case Game.directions.up:
                    if ((playerOff.top + (Game.gridCellSize / 2)) < (windowH / 2) && stageT < 0) {
                        stage.stop().animate({
                            top: stageT + Game.gridCellSize + offset
                        }, 180, 'linear');
                    }

                    break;

                // Down
                case Game.directions.down:
                    if ((playerOff.top + (Game.gridCellSize / 2)) > (windowH / 2)
                        && Math.abs(stageT - windowH) < Stage.height) {
                        stage.stop().animate({
                            top: stageT - Game.gridCellSize + offset
                        }, 180, 'linear');
                    }

                    break;

                // Left
                case Game.directions.left:
                    if ((playerOff.left + (Game.gridCellSize / 2)) < (windowW / 2) && stageL < 0) {
                        stage.stop().animate({
                            left: stageL + Game.gridCellSize + offset
                        }, 180, 'linear');
                    }

                    break;

                // Right
                case Game.directions.right:
                    if ((playerOff.left + (Game.gridCellSize / 2)) > (windowW / 2)
                        && Math.abs(stageL - windowW) < Stage.width) {
                        stage.stop().animate({
                            left: stageL - Game.gridCellSize + offset
                        }, 180, 'linear');
                    }

                    break;
            }
        }
    }
}
