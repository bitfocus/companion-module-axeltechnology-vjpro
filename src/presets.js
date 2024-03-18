
const { combineRgb } = require('@companion-module/base')

function getPresetsDefinitions(self) {

	let presets = []

	//----------------------------------------------------------------
    // PROGRAM SWITCHER BUTTONS GENERATION TODO:DYNAMIC NAMING AND 
    // BUTTON GENERATION
    //----------------------------------------------------------------
    
    for (var i = 1; i <= 8; i++){

        presets['Manual-Switcher'+i] = {
            type: 'button',
            category: 'Manual Switchers',
            name: 'Cam '+i,
            style: {
                text: 'Cam '+i,
                size: '18',
                color: combineRgb(255,255,255),
                bgcolor: combineRgb(255,0,0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'Take',
                            options: {
                                id_end:'\n',
                                index:i
                            }
                        },
                    ],
                },
            ],
            feedbacks: [
                {
                    feedbackId: 'switcher_program_status',
                    options: {
                        num:i,
                        off_color:combineRgb(0, 0, 0),
                        on_color:combineRgb(255, 0, 0),
                    }
                }
            ],
        }
    }

    //----------------------------------------------------------------
    // MANUAL BUTTON TO ABILITATE PROGRAM BUTTONS
    //----------------------------------------------------------------

    presets['Manual-Switcher'] = {
        type: 'button',
        category: 'Manual Switchers',
        name: 'Switch Auto',
        style: {
            text: 'Switch Auto',
            size: '18',
            color: combineRgb(255,255,255),
            bgcolor: combineRgb(255,0,0)
        },
        steps: [
            {
                down: [
                    {
                        actionId: 'setAllowManualProgram',
                        options: {
                            id_end:'\n',
                            index:0
                        }
                    },
                ],
            },
        ],
        feedbacks: [
            {
                feedbackId: 'is_program_manual',
                options: {
                    off_color:combineRgb(0, 0, 0),
                    on_color:combineRgb(255, 0, 0),
                }
            },
        ],
    }

    //----------------------------------------------------------------
    // PREVIEW SWITCHER BUTTONS GENERATION TODO:DYNAMIC NAMING AND 
    // BUTTON GENERATION
    //----------------------------------------------------------------
    
    for (var i = 1; i <= 8; i++){

        presets['Preview'+i] = {
            type: 'button',
            category: 'Preview',
            name: 'Preview '+i,
            style: {
                text: 'Preview '+i,
                size: '18',
                color: combineRgb(255,255,255),
                bgcolor: combineRgb(0,153,0)
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'Preview',
                            options: {
                                id_end:'\n',
                                index:i
                            }
                        },
                    ],
                },
            ],
            feedbacks: [
                {
                    feedbackId: 'switcher_preview_status',
                    options: {
                        num:i,
                        off_color:combineRgb(0, 0, 0),
                        on_color:combineRgb(0, 153, 0),
                    }
                }
            ],
        }
    }

    presets['Auto'] = {
        type: 'button',
        category: 'Layout',
        name: 'Auto',
        style: {
            text: 'Auto',
            size: '18',
            color: combineRgb(255,255,255),
            bgcolor: combineRgb(255,153,0)
        },
        steps: [
            {
                down: [
                    {
                        actionId: 'setLayout',
                        options: {
                            id_end:'\n',
                            index:'0'
                        }
                    },
                ],
            },
        ],
        feedbacks: [
            {},
        ],

    }

    presets['Semi'] = {
        type: 'button',
        category: 'Layout',
        name: 'Semi',
        style: {
            text: 'Semi',
            size: '18',
            color: combineRgb(255,255,255),
            bgcolor: combineRgb(255,153,0)
        },
        steps: [
            {
                down: [
                    {
                        actionId: 'setLayout',
                        options: {
                            id_end:'\n',
                            index:1
                        }
                    },
                ],
            },
        ],
        feedbacks: [
            {},
        ],

    }

    presets['Man'] = {
        type: 'button',
        category: 'Layout',
        name: 'Man',
        style: {
            text: 'Man',
            size: '18',
            color: combineRgb(255,255,255),
            bgcolor: combineRgb(255,153,0)
        },
        steps: [
            {
                down: [
                    {
                        actionId: 'setLayout',
                        options: {
                            id_end:'\n',
                            index:2
                        }
                    },
                ],
            },
        ],
        feedbacks: [
            {},
        ],

    }

    presets['MST1'] = {
        type: 'button',
        category: 'Master',
        name: 'MST 1',
        style: {
            text: 'MST 1',
            size: '18',
            color: combineRgb(255,255,255),
            bgcolor: combineRgb(51,102,255)
        },
        steps: [
            {
                down: [
                    {
                        actionId: 'setMaster',
                        options: {
                            id_end:'\n',
                            index:'0'
                        }
                    },
                ],
            },
        ],
        feedbacks: [
            {},
        ],

    }

    presets['MST2'] = {
        type: 'button',
        category: 'Master',
        name: 'MST 2',
        style: {
            text: 'MST 2',
            size: '18',
            color: combineRgb(255,255,255),
            bgcolor: combineRgb(51,102,255)
        },
        steps: [
            {
                down: [
                    {
                        actionId: 'setMaster',
                        options: {
                            id_end:'\n',
                            index:1
                        }
                    },
                ],
            },
        ],
        feedbacks: [
            {},
        ],

    }

    presets['Take'] = {
        type: 'button',
        category: 'Take',
        name: 'Take',
        style: {
            text: 'Take',
            size: '18',
            color: combineRgb(255,255,255),
            bgcolor: combineRgb(146,146,146)
        },
        steps: [
            {
                down: [
                    {
                        actionId: 'Take',
                        options: {
                            id_end:'\n',
                            index:''
                        }
                    },
                ],
            },
        ],
        feedbacks: [
            {},
        ],

    }

	return presets;
}
module.exports ={getPresetsDefinitions}