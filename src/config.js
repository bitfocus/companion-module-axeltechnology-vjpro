const { Regex } = require( '@companion-module/base')

 const ConfigFields = [
	{
		type: 'static-text',
		id: 'info',
		label: 'Information',
		width: 12,
		value: `
				<div class="alert alert-danger">
					<h3>IMPORTANT MESSAGE</h3>
					
				</div>
			`,
	},
	{
		type: 'textinput',
		id: 'host',
		label: 'Target IP',
		width: 8,
		default:'',
		regex: Regex.IP,
	},
	{
		type: 'textinput',
		id: 'udp_port',
		label: 'Target Udp Port',
		width: 4,
		default: '',
		regex: Regex.PORT,
	},
	
	
	{
		type: 'textinput',
		id: 'tcp_port',
		label: 'Target Tcp Port',
		width: 4,
		default: '',
	},
]

module.exports = {ConfigFields};