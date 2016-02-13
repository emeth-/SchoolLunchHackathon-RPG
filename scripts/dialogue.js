
/** DIALOGUE **************************************************************************************/

Dialogue = {

    // Music
    'help1': {
        type        : 'notification',
        text        : 'Use the arrows keys to move, spacebar to interact with someone, and enter to submit.'
    },

    'wetDreams': {
        type        : 'notification',
        text        : '<a href="http://ocremix.org/remix/OCR02727" target="_blank">Wet Dreams, by Phonetic Hero</a>'
    },

    'd002': {
        type        : 'dialogue',
        emote       : 'question',
        triggeredText: function(npc) {
            npc.dialogueId = "i000";
        },
        text    : "Welcome! I'm a clerk who has been tasked with helping you fill out this form. Come talk to me when you're ready to start! (Arrow keys to move, space bar to talk)",
        end : true
    },

    'd003': {
        type        : 'dialogue',
        text        : "Go talk to my colleague on the far right side of this room.",
        emote       : 'think',
        end         : true
    },
    'd004': {
        type        : 'dialogue',
        text        : "Go talk to my colleague on the far right side of this room.",
        emote       : 'think',
        end         : true
    },
    'd005': {
        type        : 'dialogue',
        text        : "Go talk to my colleague on the far right side of this room.",
        emote       : 'think',
        end         : true
    },

    'i000': {
        type        : 'dialogue',
        text        : "To begin with, let's record your children's information.",
        emote       : 'think',
        goTo        : 'i001'
    },

    'd006': {
        type        : 'dialogue',
        text        : "Excellent! Come talk to me to move on to the next step.",
        emote       : 'think',
        end         : true
    },

    'i001': {
        type    : 'input',
        emote   : 'think',
        label   : 'How many children do you have? (hit enter when done)',
        goTo    : 'd012',
        action: function(npc, value) {
            var total_children = parseInt(value);
            Game.children_left_to_fill_out = total_children;
            for (var i=1; i<=10; i++) {
                $('#child'+i).hide();
            }
            for (var i=1; i<=total_children; i++) {
                $('#child'+i).show();
            }
        }
    },

    'd012': {
        type        : 'dialogue',
        text        : "Excellent! I created avatars to represent each child. Continue by talking to them!",
        emote       : 'happiness',
        end         : true,
        action      : function(npc) {
            if (npc) {
                var move_directions = [];

                move_directions.push('right');
                move_directions.push('right');
                move_directions.push('up');

                npc.npc('move', move_directions);
                setTimeout(function(){
                    npc.find('.npc-sprite').removeClass('up').addClass('down');
                }, 1500);
            }
        }
    },

    'step2_start': {
        type        : 'dialogue',
        text        : "Do any Household Members (including you) currently participate in one or more of the following assistance programs: SNAP, TANF, or FDPIR?",
        goTo        : 'step2_choice'
    },

    'step2_choice': {
        type    : 'choice',
        emote   : 'think',
        choices : [
            {
                label       : 'Yes (we participate in SNAP, TANF, or FDPIR)',
                goTo        : 'step2_followup'
            },

            {
                label       : 'No (we do not partipicate in SNAP, TANF, or FDPIR)',
                goTo        : 'step2_end'
            }
        ]
    },

    'step2_followup': {
        type    : 'input',
        goTo    : 'step2_end',
        label : 'What is your case number?',
        action: function(npc, value) {
            var npc_id = npc.data()['npc'].id;
            if (!(npc_id in Game.formData['children'])) {
                Game.formData['children'][npc_id] = {};
            }
            Game.formData['children'][npc_id]['case_number'] = value;
        }
    },

    'step2_end': {
        type        : 'dialogue',
        text        : "Excellent! We're done here, move on to the next room.",
        emote       : 'think',
        end         : true,
        action: function(npc, value) {
            if (npc) {
                var move_directions = [];

                move_directions.push('down');
                move_directions.push('down');
                move_directions.push('down');
                move_directions.push('down');
                move_directions.push('right');

                npc.npc('move', move_directions);

                setTimeout(function(){
                    npc.find('.npc-sprite').removeClass('right').addClass('down');
                }, 2000);

                setTimeout(function(){
                    var newDialogue = Dialogue["d006"];
                    $('#n004').npc('talk', newDialogue);
                    $('#n004').data('npc').dialogueId = "step3_start";
                }, 1000);
            }
        }
    },

    'step3_start': {
        type        : 'dialogue',
        text        : "We're going to finish establishing the size of your household here, by gathering information on the adults.",
        goTo        : 'step3_i1'
    },

    'step3_i1': {
        type    : 'input',
        emote   : 'think',
        label   : 'How many adults are in your household?',
        goTo    : 'step3_i2',
        action: function(npc, value) {
            var total_adults = parseInt(value);
            Game.adults_left_to_fill_out = total_adults;
            for (var i=1; i<=10; i++) {
                $('#adult'+i).hide();
            }
            for (var i=1; i<=total_adults; i++) {
                $('#adult'+i).show();
            }
        }
    },

    'step3_i2': {
        type        : 'dialogue',
        text        : "Excellent! I created avatars to represent each adult. Continue by talking to them!",
        emote       : 'happiness',
        end         : true,
        action      : function(npc) {
            if (npc) {
                var move_directions = [];

                move_directions.push('down');
                move_directions.push('down');
                move_directions.push('down');
                move_directions.push('down');
                move_directions.push('left');

                npc.npc('move', move_directions);
                setTimeout(function(){
                    npc.find('.npc-sprite').removeClass('left').addClass('down');
                }, 1500);
            }
        }
    },

    'dchi01': {
        type        : 'dialogue',
        text        : "I'm an avatar representing your child! Help fill out more information about me.",
        goTo        : 'ichi01'
    },

    'ichi01': {
        type    : 'input',
        goTo    : 'ichi02',
        label : 'What is my name? (First name, middle initial, last name)',
        action: function(npc, value) {
            var npc_id = npc.data()['npc'].id;
            if (!(npc_id in Game.formData['children'])) {
                Game.formData['children'][npc_id] = {};
            }
            Game.formData['children'][npc_id]['name'] = value;
        }
    },

    'ichi02': {
        type    : 'choice',
        choices : [
            {
                label       : 'I am a student',
                goTo        : 'ichi03',
                action: function(npc, value) {
                    var npc_id = npc.data()['npc'].id;
                    if (!(npc_id in Game.formData['children'])) {
                        Game.formData['children'][npc_id] = {};
                    }
                    Game.formData['children'][npc_id]['student'] = true;
                }
            },

            {
                label       : 'I am not a student',
                goTo        : 'ichi03',
                action: function(npc, value) {
                    var npc_id = npc.data()['npc'].id;
                    if (!(npc_id in Game.formData['children'])) {
                        Game.formData['children'][npc_id] = {};
                    }
                    Game.formData['children'][npc_id]['student'] = false;
                }
            }
        ]
    },

    'ichi03': {
        type    : 'choice',
        choices : [
            {
                label       : 'I am a foster child',
                goTo        : 'ichi04',
                action: function(npc, value) {
                    var npc_id = npc.data()['npc'].id;
                    if (!(npc_id in Game.formData['children'])) {
                        Game.formData['children'][npc_id] = {};
                    }
                    Game.formData['children'][npc_id]['foster_child'] = true;
                }
            },

            {
                label       : 'I am not a foster child',
                goTo        : 'ichi04',
                action: function(npc, value) {
                    var npc_id = npc.data()['npc'].id;
                    if (!(npc_id in Game.formData['children'])) {
                        Game.formData['children'][npc_id] = {};
                    }
                    Game.formData['children'][npc_id]['foster_child'] = false;
                }
            }
        ]
    },

    'ichi04': {
        type    : 'choice',
        choices : [
            {
                label       : 'I am homeless / a migrate / a runaway',
                goTo        : 'ichi05',
                action: function(npc, value) {
                    var npc_id = npc.data()['npc'].id;
                    if (!(npc_id in Game.formData['children'])) {
                        Game.formData['children'][npc_id] = {};
                    }
                    Game.formData['children'][npc_id]['homeless'] = true;
                }
            },

            {
                label       : 'I am not homeless / a migrate / a runaway',
                goTo        : 'ichi05',
                action: function(npc, value) {
                    var npc_id = npc.data()['npc'].id;
                    if (!(npc_id in Game.formData['children'])) {
                        Game.formData['children'][npc_id] = {};
                    }
                    Game.formData['children'][npc_id]['homeless'] = false;
                }
            }
        ]
    },

    'ichi05': {
        type        : 'dialogue',
        text        : "Thanks! I'm good to go!",
        end         : true,
        triggeredText: function(npc) {
            npc.dialogueId = "i000";
        },
        action      : function(npc) {
            if (npc) {
                Game.children_left_to_fill_out -= 1;
                var move_directions = [];

                move_directions.push('up');
                move_directions.push('up');

                move_directions.push('up');
                move_directions.push('up');
                move_directions.push('up');

                npc.npc('move', move_directions);

                setTimeout(function(){
                    npc.find('.npc-sprite').removeClass('up').addClass('down');
                }, 2000);

                if (Game.children_left_to_fill_out <= 0) {
                    setTimeout(function(){
                        var newDialogue = Dialogue["d006"];
                        $('#n003').npc('talk', newDialogue);
                        $('#n003').data('npc').dialogueId = "step2_start";
                    }, 1000);
                }
            }
        }
    }
}
