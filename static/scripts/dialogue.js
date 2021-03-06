
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

    'game_load': {
        type        : 'dialogue',
        emote       : 'happiness',
        triggeredText: function(npc) {
            npc.dialogueId = "step1_start";
        },
        goTo        : 'game_load2',
        text    : "Welcome! I'm a clerk who has been tasked with helping you fill out this form."
    },

    'game_load2': {
        type        : 'dialogue',
        emote       : 'happiness',
        text    : "The enter key can be used to speak to people and end dialogues. After closing this dialogue, use the arrow keys to walk over to me, and then hit enter to speak with me.",
        action: function(npc) {
            setTimeout(function(){
                npc.npc('emote', 'question');
            }, 500);
        },
        end : true
    },




    'clerk_notready': {
        type        : 'dialogue',
        text        : "I'm not ready to speak to you yet, please go talk to my colleague.",
        emote       : 'question',
        end         : true
    },

    'step1_start': {
        type        : 'dialogue',
        text        : "To begin with, let's record your children's information.",
        emote       : 'question',
        goTo        : 'step1_q1'
    },

    'step1_q1': {
        type    : 'input',
        emote   : 'question',
        label   : 'How many children do you have? (hit enter when done)',
        goTo    : 'step1_q2',
        action: function(npc, value) {
            var total_children = parseInt(value);
            Game.children_left_to_fill_out = total_children;
            for (var i=1; i<=10; i++) {
                $('#child'+i).hide();
            }
            for (var i=1; i<=total_children; i++) {
                $('#child'+i).show();
                if ($('#child'+i).data().npc.completedme) {
                    Game.children_left_to_fill_out -= 1;
                }
            }
        }
    },

    'step1_q2': {
        type        : 'dialogue',
        text        : "Excellent! I created avatars to represent each child. Continue by talking to them!",
        emote       : 'happiness',
        end         : true,
        action      : function(npc) {
            if (npc && !npc.data().npc['frozen']) {
                var move_directions = [];

                move_directions.push('right');
                move_directions.push('right');
                move_directions.push('up');

                npc.npc('move', move_directions);
                setTimeout(function(){
                    npc.find('.npc-sprite').removeClass('up').addClass('down');
                }, 1500);
                npc.data().npc['frozen'] = true;
                //npc.data().npc.dialogueId = "step1_q1";
            }
        }
    },

    'dchi01': {
        type        : 'dialogue',
        emote       : 'question',
        text        : "I'm an avatar representing your child! Help fill out more information about me.",
        goTo        : 'ichi01'
    },


    'ichi01': {
        type    : 'input',
        goTo    : 'ichi02',
        emote   : 'question',
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
        emote       : 'question',
        choices : [
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
            },
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
            }
        ]
    },

    'ichi03': {
        type    : 'choice',
        emote       : 'question',
        choices : [
            {
                label       : 'I am not a foster child',
                goTo        : 'ichi04a',
                action: function(npc, value) {
                    var npc_id = npc.data()['npc'].id;
                    if (!(npc_id in Game.formData['children'])) {
                        Game.formData['children'][npc_id] = {};
                    }
                    Game.formData['children'][npc_id]['foster_child'] = false;
                }
            },
            {
                label       : 'I am a foster child',
                goTo        : 'ichi04a',
                action: function(npc, value) {
                    var npc_id = npc.data()['npc'].id;
                    if (!(npc_id in Game.formData['children'])) {
                        Game.formData['children'][npc_id] = {};
                    }
                    Game.formData['children'][npc_id]['foster_child'] = true;
                }
            }
        ]
    },

    'ichi04a': {
        type    : 'choice',
        emote       : 'question',
        choices : [
            {
                label       : 'I am not homeless / a migrate / a runaway',
                goTo        : 'ichi04b',
                action: function(npc, value) {
                    var npc_id = npc.data()['npc'].id;
                    if (!(npc_id in Game.formData['children'])) {
                        Game.formData['children'][npc_id] = {};
                    }
                    Game.formData['children'][npc_id]['homeless'] = false;
                }
            },
            {
                label       : 'I am homeless / a migrate / a runaway',
                goTo        : 'ichi04b',
                action: function(npc, value) {
                    var npc_id = npc.data()['npc'].id;
                    if (!(npc_id in Game.formData['children'])) {
                        Game.formData['children'][npc_id] = {};
                    }
                    Game.formData['children'][npc_id]['homeless'] = true;
                }
            }
        ]
    },

    'ichi04b': {
        type    : 'inputincome',
        goTo    : 'ichi05',
        emote       : 'question',
        label : 'How much income do I earn?',
        action: function(npc, value) {
            if (npc && value) {
                var npc_id = npc.data()['npc'].id;
                Game.formData['children'][npc_id]['income'] = value;
            }
        }
    },

    'ichi05': {
        type        : 'dialogue',
        text        : "...",
        emote       : 'question',
        dynamicText: function(npc){
            var c = Game.formData.children[npc.data().npc.id];
            recap_statement = "";
            recap_statement += "My name is "+c.name+". ";
            if (c.student) {
                recap_statement += "I am a student. ";
            }
            else {
                recap_statement += "I am not a student. ";
            }
            if (c.foster_child) {
                recap_statement += "I am a foster child. ";
            }
            else {
                recap_statement += "I am not a foster child. ";
            }
            if (c.homeless) {
                recap_statement += "I am homeless / a migrate / a runaway. ";
            }
            else {
                recap_statement += "I am not homeless / a migrate / a runaway. ";
            }
            if (parseInt(c.income)) {
                recap_statement += "I earn $"+c.income+". ";
            }
            recap_statement += "Is this correct?";
            return recap_statement;
        },
        goTo        : 'ichi06'
    },

    'ichi06': {
        type    : 'choice',
        emote       : 'question',
        choices : [
            {
                label       : 'Yes',
                goTo        : 'ichi07'
            },

            {
                label       : 'No',
                goTo        : 'ichi01'
            }
        ]
    },

    'ichi07': {
        type        : 'dialogue',
        text        : "Thanks! I'm good to go!",
        end         : true,
        emote       : 'question',
        triggeredText: function(npc) {
            npc.dialogueId = "step1_start";
        },
        action      : function(npc) {
            if (npc) {

                if (!npc.data().npc.completedme) {
                    //If first time completing this child, mark 'em done.
                    Game.children_left_to_fill_out -= 1;
                }
                npc.data().npc.completedme = true;

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
                    all_foster_or_homeless_children = true;
                    for(var o in Game.formData.children) {
                        if (!Game.formData.children[o].foster_child) {
                            if (!Game.formData.children[o].homeless) {
                                all_foster_or_homeless_children = false;
                            }
                        }
                    }

                    if (all_foster_or_homeless_children) {
                        //skip to step 4
                        setTimeout(function(){
                            var newDialogue = Dialogue["step4_npcstart"];
                            $('#n005').npc('talk', newDialogue);
                            $('#n005').data('npc').dialogueId = "step4_start";
                        }, 1000);
                    }
                    else {
                        setTimeout(function(){
                            var newDialogue = Dialogue["step2_npcstart"];
                            $('#n003').npc('talk', newDialogue);
                            $('#n003').data('npc').dialogueId = "step2_start";
                        }, 1000);
                    }
                }
            }
        }
    },

    'step2_npcstart': {
        type        : 'dialogue',
        text        : "Excellent! Come talk to me to move on to the next step.",
        emote       : 'question',
        end         : true,
        action      : function(npc) {
            if (npc && !npc.data().npc['frozen']) {
                npc.data().npc['frozen'] = true;

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
                    npc.npc('emote', 'question');
                }, 500);
            }
        }
    },

    'step2_start': {
        type        : 'dialogue',
        emote       : 'question',
        text        : "Do any Household Members (including you) currently participate in one or more of the following assistance programs: SNAP, TANF, or FDPIR?",
        goTo        : 'step2_choice'
    },

    'step2_choice': {
        type    : 'choice',
        emote       : 'question',
        choices : [
            {
                label       : 'No (we do not partipicate in SNAP, TANF, or FDPIR)',
                goTo        : 'step2_end'
            },
            {
                label       : 'Yes (we participate in SNAP, TANF, or FDPIR)',
                goTo        : 'step2_followup'
            }
        ]
    },

    'step2_followup': {
        type    : 'input',
        goTo    : 'step2_end',
        emote       : 'question',
        label : 'What is your case number?',
        action: function(npc, value) {
            Game.formData['case_number'] = value;
        }
    },

    'step2_end': {
        type        : 'dialogue',
        text        : "Excellent! We're done here, move on to the next room.",
        emote       : 'question',
        end         : true,
        action: function(npc, value) {
            if (npc) {
                if (Game.formData['case_number']) {
                    //skip to step 4
                    setTimeout(function(){
                        var newDialogue = Dialogue["step4_npcstart"];
                        $('#n005').npc('talk', newDialogue);
                        $('#n005').data('npc').dialogueId = "step4_start";
                    }, 1000);
                }
                else {
                    setTimeout(function(){
                        var newDialogue = Dialogue["step3_npcstart"];
                        $('#n004').npc('talk', newDialogue);
                        $('#n004').data('npc').dialogueId = "step3_start";
                    }, 1000);
                }
            }
        }
    },

    'step3_npcstart': {
        type        : 'dialogue',
        text        : "Excellent! Come talk to me to move on to the next step.",
        emote       : 'happiness',
        end         : true,
        action      : function(npc) {
            if (npc && !npc.data().npc['frozen']) {
                npc.data().npc['frozen'] = true;
                var move_directions = [];

                move_directions.push('down');
                move_directions.push('down');
                move_directions.push('down');
                move_directions.push('down');
                move_directions.push('left');

                npc.npc('move', move_directions);

                setTimeout(function(){
                    npc.find('.npc-sprite').removeClass('left').addClass('down');
                }, 2000);

                setTimeout(function(){
                    npc.npc('emote', 'question');
                }, 500);
            }
        }
    },

    'step3_start': {
        type        : 'dialogue',
        emote       : 'question',
        text        : "We're going to finish gathering details about your household here.",
        goTo        : 'step3_i1'
    },

    'step3_i1': {
        type    : 'input',
        emote       : 'question',
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
        text        : "...",
        emote       : 'question',
        dynamicText: function(){
            return "You said there are "+Game.adults_left_to_fill_out+" adults and "+Object.keys(Game.formData.children).length+" children in your household, is this correct?";
        },
        goTo        : 'step3_i3'
    },

    'step3_i3': {
        type    : 'choice',
        emote       : 'question',
        choices : [
            {
                label       : 'Yes',
                goTo        : 'step3_i4'
            },

            {
                label       : 'No',
                goTo        : 'step3_i1',
            }
        ]
    },


    'step3_i4': {
        type        : 'dialogue',
        text        : "Excellent! I created avatars to represent each adult. Continue by talking to them!",
        emote       : 'happiness',
        end         : true
    },

    'dadult01': {
        type        : 'dialogue',
        emote       : 'question',
        text        : "I'm an avatar representing an adult in your family! Help fill out more information about me.",
        goTo        : 'dadult02'
    },

    'dadult02': {
        type    : 'input',
        goTo    : 'dadult03',
        emote       : 'question',
        label : 'What is my name? (First name, last name)',
        action: function(npc, value) {
            var npc_id = npc.data()['npc'].id;
            if (!(npc_id in Game.formData['adults'])) {
                Game.formData['adults'][npc_id] = {};
            }
            Game.formData['adults'][npc_id]['name'] = value;
        }
    },

    'dadult03': {
        type    : 'inputincome',
        goTo    : 'dadult04',
        emote       : 'question',
        label : 'What income do I get from work?',
        action: function(npc, value) {
            if (npc && value) {
                Game.formData['adults'][npc.data()['npc'].id]['work_income'] = value;
            }
        }
    },

    'dadult04': {
        type    : 'inputincome',
        goTo    : 'dadult05',
        emote       : 'question',
        label : 'What income do I get from Public Assistance/Child Support/Alimony?',
        action: function(npc, value) {
            if (npc && value) {
                Game.formData['adults'][npc.data()['npc'].id]['public_assistance_income'] = value;
            }
        }
    },

    'dadult05': {
        type    : 'inputincome',
        goTo    : 'dadult06',
        emote       : 'question',
        label : 'What income do I get from Pensions/Retirement/All Other Sources?',
        action: function(npc, value) {
            if (npc && value) {
                Game.formData['adults'][npc.data()['npc'].id]['pension_income'] = value;
            }
        }
    },

    'dadult06': {
        type        : 'dialogue',
        text        : "Thanks! I'm good to go!",
        emote       : 'question',
        end         : true,
        triggeredText: function(npc) {
            npc.dialogueId = "step1_start";
        },
        action      : function(npc) {
            if (npc) {
                Game.adults_left_to_fill_out -= 1;
                var move_directions = [];

                move_directions.push('down');
                move_directions.push('down');

                move_directions.push('down');
                move_directions.push('down');
                move_directions.push('down');

                npc.npc('move', move_directions);

                setTimeout(function(){
                    npc.find('.npc-sprite').removeClass('down').addClass('up');
                }, 2000);

                if (Game.adults_left_to_fill_out <= 0) {
                    setTimeout(function(){
                        var newDialogue = Dialogue["step4_npcstart"];
                        $('#n005').npc('talk', newDialogue);
                        $('#n005').data('npc').dialogueId = "step4_start";
                    }, 1000);
                }
            }
        }
    },

    'step4_npcstart': {
        type        : 'dialogue',
        text        : "One last step remains! Go back to the lobby, and then join me in the final room on the left to complete it!",
        emote       : 'happiness',
        end         : true,
        action      : function(npc) {
            if (npc && !npc.data().npc['frozen']) {
                npc.data().npc['frozen'] = true;
                var move_directions = [];

                move_directions.push('left');
                move_directions.push('left');
                move_directions.push('up');

                npc.npc('move', move_directions);

                setTimeout(function(){
                    npc.find('.npc-sprite').removeClass('up').addClass('down');
                }, 2000);

                setTimeout(function(){
                    npc.npc('emote', 'question');
                }, 500);
            }
        }
    },

    'step4_start': {
        type        : 'dialogue',
        emote       : 'question',
        text        : "To finalize the form, we'll need a signature and some contact information. Let's go through that now.",
        goTo        : 'step4_form1a'
    },

    'step4_form1a': {
        type    : 'choice',
        emote       : 'question',
        choices : [
            {
                label       : 'I have a SSN.',
                goTo        : 'step4_form1b'
            },

            {
                label       : 'I do not have a SSN.',
                goTo        : 'step4_form1c'
            }
        ]
    },

    'step4_form1b': {
        type    : 'input',
        emote       : 'question',
        label   : 'What are the last 4 digits of your SSN?',
        goTo    : 'step4_form1c',
        action: function(npc, value) {
            Game.formData['ssn'] = value;
        }
    },


    'step4_form1c': {
        type    : 'input',
        emote       : 'question',
        label   : 'What is your street address?',
        goTo    : 'step4_form2',
        action: function(npc, value) {
            Game.formData['street_address'] = value;
        }
    },

    'step4_form2': {
        type    : 'input',
        emote       : 'question',
        label   : 'City?',
        goTo    : 'step4_form3',
        action: function(npc, value) {
            Game.formData['city'] = value;
        }
    },

    'step4_form3': {
        type    : 'input',
        emote       : 'question',
        label   : 'State?',
        goTo    : 'step4_form4',
        action: function(npc, value) {
            Game.formData['state'] = value;
        }
    },

    'step4_form4': {
        type    : 'input',
        emote       : 'question',
        label   : 'Zip Code?',
        goTo    : 'step4_form5',
        action: function(npc, value) {
            Game.formData['zip'] = value;
        }
    },

    'step4_form5': {
        type    : 'inputoptional',
        emote       : 'question',
        label   : 'Phone number? (optional, hit enter to skip)',
        goTo    : 'step4_form6',
        action: function(npc, value) {
            Game.formData['phonenumber'] = value;
        }
    },

    'step4_form6': {
        type    : 'inputoptional',
        emote       : 'question',
        label   : 'Email? (optional, hit enter to skip)',
        goTo    : 'step4_form7',
        action: function(npc, value) {
            Game.formData['email'] = value;
        }
    },

    'step4_form7': {
        type    : 'input',
        emote       : 'question',
        label   : 'What is your name?',
        goTo    : 'step4_form8a',
        action: function(npc, value) {
            Game.formData['printedname'] = value;
        }
    },

    'step4_form8a': {
        type    : 'dialogue',
        emote       : 'question',
        text   : 'I certify (promise) that all information on this application is true and that all income is reported. I understand that this information is given in connection with the receipt of Federal funds, and that school officials may verify (check) the information.',
        goTo    : 'step4_form8b'
    },

    'step4_form8b': {
        type    : 'dialogue',
        emote       : 'question',
        text   : 'I am aware that if I purposely give false information, my children may lose meal benefits, and I may be prosecuted under applicable State and Federal laws.',
        goTo    : 'step4_form9'
    },

    'step4_form9': {
        type    : 'input',
        emote       : 'question',
        label   : 'Type in your name here, this will operate as your legal signature:',
        goTo    : 'step4_form10a',
        action: function(npc, value) {
            Game.formData['signature'] = value;
        }
    },

    'step4_form10a': {
        type    : 'dialogue',
        emote       : 'question',
        text   : "We are required to ask for information about your children's race and ethnicity. This information is important and helps to make sure we are fully serving our community.",
        goTo    : 'step4_form10b'
    },

    'step4_form10b': {
        type    : 'dialogue',
        emote       : 'question',
        text   : "Responding to this section is optional and does not affect your children's eligibility for free or reduced price meals.",
        goTo    : 'step4_form11'
    },

    'step4_form11': {
        type    : 'choice',
        emote       : 'question',
        choices : [
            {
                label       : 'I would NOT like to fill out this optional information.',
                goTo        : 'step4_end'
            },
            {
                label       : 'I would like to fill out this optional information.',
                goTo        : 'step4_form12'
            }
        ]
    },

    'step4_form12': {
        type    : 'choice',
        emote       : 'question',
        choices : [
            {
                label       : 'Ethnicity: Not Hispanic or Latino',
                goTo        : 'step4_form13',
                action: function(npc, value) {
                    Game.formData['ethnicity_hispanic'] = false;
                }
            },
            {
                label       : 'Ethnicity: Hispanic or Latino',
                goTo        : 'step4_form13',
                action: function(npc, value) {
                    Game.formData['ethnicity_hispanic'] = true;
                }
            }
        ]
    },

    'step4_form13': {
        type    : 'choice',
        emote       : 'question',
        choices : [
            {
                label       : 'Race: NOT American Indian or Alaskan Native',
                goTo        : 'step4_form14',
                action: function(npc, value) {
                    Game.formData['race_american_indian'] = false;
                }
            },
            {
                label       : 'Race: American Indian or Alaskan Native',
                goTo        : 'step4_form14',
                action: function(npc, value) {
                    Game.formData['race_american_indian'] = true;
                }
            }
        ]
    },

    'step4_form14': {
        type    : 'choice',
        emote       : 'question',
        choices : [
            {
                label       : 'Race: NOT Asian',
                goTo        : 'step4_form15',
                action: function(npc, value) {
                    Game.formData['race_asian'] = false;
                }
            },
            {
                label       : 'Race: Asian',
                goTo        : 'step4_form15',
                action: function(npc, value) {
                    Game.formData['race_asian'] = true;
                }
            }
        ]
    },

    'step4_form15': {
        type    : 'choice',
        emote       : 'question',
        choices : [
            {
                label       : 'Race: NOT Black or African American',
                goTo        : 'step4_form16',
                action: function(npc, value) {
                    Game.formData['race_black'] = false;
                }
            },
            {
                label       : 'Race: Black or African American',
                goTo        : 'step4_form16',
                action: function(npc, value) {
                    Game.formData['race_black'] = true;
                }
            }
        ]
    },

    'step4_form16': {
        type    : 'choice',
        emote       : 'question',
        choices : [
            {
                label       : 'Race: NOT Native Hawaiian or Other Pacific Islander',
                goTo        : 'step4_form17',
                action: function(npc, value) {
                    Game.formData['race_hawaiian'] = false;
                }
            },
            {
                label       : 'Race: Native Hawaiian or Other Pacific Islander',
                goTo        : 'step4_form17',
                action: function(npc, value) {
                    Game.formData['race_hawaiian'] = true;
                }
            }
        ]
    },

    'step4_form17': {
        type    : 'choice',
        emote       : 'question',
        choices : [
            {
                label       : 'Race: NOT White',
                goTo        : 'step4_end',
                action: function(npc, value) {
                    Game.formData['race_white'] = false;
                }
            },
            {
                label       : 'Race: White',
                goTo        : 'step4_end',
                action: function(npc, value) {
                    Game.formData['race_white'] = true;
                }
            }
        ]
    },

    'step4_end': {
        type        : 'dialogue',
        text        : "Excellent! We're all done!",
        emote       : 'happiness',
        end         : true,
        action: function(npc, value) {
            if (!Game.formsub) {
                Game.formsub = true;
                submit_form();
            }
        }
    },
}
