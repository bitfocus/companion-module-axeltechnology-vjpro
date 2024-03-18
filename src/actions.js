const CHOICES_END = [
	{ id: '', label: 'None' },
	{ id: '\n', label: 'LF - \\n (Common UNIX/Mac)' },
	{ id: '\r\n', label: 'CRLF - \\r\\n (Common Windows)' },
	{ id: '\r', label: 'CR - \\r (Old MacOS)' },
	{ id: '\x00', label: 'NULL - \\x00 (Can happen)' },
	{ id: '\n\r', label: 'LFCR - \\n\\r (Just stupid)' },
]

 function getActionDefinitions(self) {
	return {
		//----------------------------------------------------------------
		setMaster: {
			name: 'setMaster',
			options: [
				{
					type: 'dropdown',
					id: 'id_end',
					label: 'Command End Character:',
					default: '\n',
					choices: CHOICES_END,
				},
				{
					type: 'textinput',
					id: 'index',
					label: 'Command Index',
					default: '1',
				}
			],
			callback: (action) => {

				if (self.VJPRO_UDP_MANAGER !== undefined) {

					self.VJPRO_UDP_MANAGER.setMaster(action.options.index,action.options.id_end)
					
				}
				
			},
		},
		//----------------------------------------------------------------
		setLayout: {
			name: 'setLayout',
			options: [
				{
					type: 'dropdown',
					id: 'id_end',
					label: 'Command End Character:',
					default: '\n',
					choices: CHOICES_END,
				},
				{
					type: 'textinput',
					id: 'index',
					label: 'Command Index',
					default: '1',
				}
			],
			callback: (action) => {

				if (self.VJPRO_UDP_MANAGER !== undefined) {
		
					self.VJPRO_UDP_MANAGER.setLayout(action.options.index,action.options.id_end)
				
				}
				
			},
		},
		//----------------------------------------------------------------
		setVolume: {
			name: 'setVolume',
			options: [
				{
					type: 'dropdown',
					id: 'id_end',
					label: 'Command End Character:',
					default: '\n',
					choices: CHOICES_END,
				},
				{
					type: 'textinput',
					id: 'index',
					label: 'Command Index',
					default: '1',
				}
			],
			callback: (action) => {

				if (self.VJPRO_UDP_MANAGER !== undefined) {

					self.VJPRO_UDP_MANAGER.setVolume(action.options.index,action.options.id_end)

				}
				
			},
		},
		//----------------------------------------------------------------
		setGain: {
			name: 'setGain',
			options: [
				{
					type: 'dropdown',
					id: 'id_end',
					label: 'Command End Character:',
					default: '\n',
					choices: CHOICES_END,
				},
				{
					type: 'textinput',
					id: 'index',
					label: 'Command Index',
					default: '1',
				}
			],
			callback: (action) => {

				if (self.VJPRO_UDP_MANAGER !== undefined) {
					
					self.VJPRO_UDP_MANAGER.setGain(action.options.index,action.options.id_end)
					
				}
				
			},
		},
		//----------------------------------------------------------------
		setAllowManualProgram: {
			name: 'setAllowManualProgram',
			options: [
				{
					type: 'dropdown',
					id: 'id_end',
					label: 'Command End Character:',
					default: '\n',
					choices: CHOICES_END,
				},
				{
					type: 'textinput',
					id: 'index',
					label: 'Command Index',
					default: '1',
				}
			],
			callback: (action) => {

				if (self.VJPRO_UDP_MANAGER !== undefined) {
					
					self.VJPRO_UDP_MANAGER.setAllowManualProgram(action.options.index,action.options.id_end)
					
				}
				
			},
		},
		//----------------------------------------------------------------
		setAllowManualGraphics: {
			name: 'setAllowManualGraphics',
			options: [
				{
					type: 'dropdown',
					id: 'id_end',
					label: 'Command End Character:',
					default: '\n',
					choices: CHOICES_END,
				},
				{
					type: 'textinput',
					id: 'index',
					label: 'Command Index',
					default: '1',
				}
			],
			callback: (action) => {

				if (self.VJPRO_UDP_MANAGER !== undefined) {
					
					self.VJPRO_UDP_MANAGER.setAllowManualGraphics(action.options.index,action.options.id_end)
					
				}
				
			},
		},
		//----------------------------------------------------------------
		Take: {
			name: 'Take Page onAir',
			options: [
				{
					type: 'dropdown',
					id: 'id_end',
					label: 'Command End Character:',
					default: '\n',
					choices: CHOICES_END,
				},
				{
					type: 'textinput',
					id: 'index',
					label: 'Command Index',
					default: '1',
				}
			],
			callback: (action) => {

				if (self.VJPRO_UDP_MANAGER !== undefined) {
					
					self.VJPRO_UDP_MANAGER.setAllowManualProgram(1,action.options.id_end)
					self.VJPRO_UDP_MANAGER.take(action.options.index,action.options.id_end)
					
				}
				
			},
		},
		//----------------------------------------------------------------
		Preview: {
			name: 'Send Preview onAir',
			options: [
				{
					type: 'dropdown',
					id: 'id_end',
					label: 'Command End Character:',
					default: '\n',
					choices: CHOICES_END,
				},
				{
					type: 'textinput',
					id: 'index',
					label: 'Command Index',
					default: '1',
				}
			],
			callback: (action) => {

				if (self.VJPRO_UDP_MANAGER !== undefined) {
					
					self.VJPRO_UDP_MANAGER.preview(action.options.index,action.options.id_end)
					
				}
				
			},
		},
	}
}

module.exports ={getActionDefinitions}
