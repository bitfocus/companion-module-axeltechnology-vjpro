const { combineRgb } = require( '@companion-module/base')

function getFeedbackDefinitions(self){

    return{
		switcher_program_status: {
			name: 'Program Page is on air',
			type: 'advanced',
			label: 'Channel State',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'num',
					type: 'textinput',
					label: 'Page Identification',
					default: 1,
				},
				{
					id: 'off_color',
					type: 'colorpicker',
					label: 'Off Color',
					default: combineRgb(0, 0, 0),
				},
				{
					id: 'on_color',
					type: 'colorpicker',
					label: 'On Color',
					default: combineRgb(255, 0, 0),
				}
			],
			callback: (feedback) => {

				if(self.IsProgramOn(feedback.options.num)){

                    return {
						bgcolor: feedback.options.on_color,
					};
                    
				} else {
					return {
						bgcolor: feedback.options.off_color,
					};
				}
			},
		},
        switcher_preview_status: {
			name: 'Preview Page is on air',
			type: 'advanced',
			label: 'Channel State',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'num',
					type: 'textinput',
					label: 'Page Identification',
					default: 1,
				},
				{
					id: 'off_color',
					type: 'colorpicker',
					label: 'Off Color',
					default: combineRgb(0, 0, 0),
				},
				{
					id: 'on_color',
					type: 'colorpicker',
					label: 'On Color',
					default: combineRgb(255, 0, 0),
				}
			],
			callback: (feedback) => {

				if(self.IsPreviewOn(feedback.options.num)){
                    //console.log("Preview "+feedback.options.num+ " On")
                    return {
						bgcolor: feedback.options.on_color,
					};
                    
				} else {
                    //console.log("Preview "+feedback.options.num+ " Off")
					return {
						bgcolor: feedback.options.off_color,
					};
				}
			},
		},
        is_program_manual: {
			name: 'is Program Manual',
			type: 'advanced',
			label: 'Channel State',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'off_color',
					type: 'colorpicker',
					label: 'Off Color',
					default: combineRgb(0, 0, 0),
				},
				{
					id: 'on_color',
					type: 'colorpicker',
					label: 'On Color',
					default: combineRgb(255, 0, 0),
				}
			],
			callback: (feedback) => {

				if(self.isProgramManual){
                    //console.log("Preview "+feedback.options.num+ " On")
                    return {
						bgcolor: feedback.options.on_color,
					};
                    
				} else {
                    //console.log("Preview "+feedback.options.num+ " Off")
					return {
						bgcolor: feedback.options.off_color,
					};
				}
			},
		}
    
    }
		
}

module.exports ={getFeedbackDefinitions}