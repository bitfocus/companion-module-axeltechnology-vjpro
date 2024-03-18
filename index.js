const { ConfigFields } = require( './src/config.js');
const { getActionDefinitions } = require( './src/actions.js');
const { getPresetsDefinitions } = require( './src/presets.js');
const { getFeedbackDefinitions } = require( './src/feedback.js');

const VjProUDP = require(  './communication_classes/VjPro_Udp.js');
const VjPro_TCP = require( './communication_classes/VjPro_TCP.js');

const { InstanceBase, runEntrypoint, InstanceStatus } = require('@companion-module/base')

//-------------------------------------------------------------------------------

class Vjpro extends InstanceBase {
    
    constructor(internal) {
		super(internal)

		this.VjPro_Status = {}
        this.Switcher_Status
        this.isProgramManual = false
        
	}
    
    //--------------------------------------------------------------------------
    // Internal Method, here we call inter definers(actions,feedbacks,ecc..)
    // And We initialize our personalized services as well (TCP/UDP call manager)
    //--------------------------------------------------------------------------

    async init(config) {
        this.config = config;
        this.setActionDefinitions(getActionDefinitions(this));
        this.setPresetDefinitions(getPresetsDefinitions(this)); 
        this.setFeedbackDefinitions(getFeedbackDefinitions(this))
        await this.configUpdated(config);
        this.init_tcp(config);
        await this.checkConnectionStatus(config)
    }

    //--------------------------------------------------------------------------
	//  This function manages the logging, since we cant use this.log elsewhere
	//  we'll have to pass this function as callback to custom elements
	//  (i hope this is the right way ^^)
	//--------------------------------------------------------------------------

	LogManager = (eType, message) => {
		try
		 {
			if (eType === 'error' || eType === 'warn' || eType === 'info' || eType === 'debug')
			{
				this.log(eType, message);
			} 
			else 
			{
				console.error('Unknown log type:', eType);
			}
		} 
		catch (error) 
		{
			console.error('Error in LogManager:', error);
		}
	}

    //--------------------------------------------------------------------------
    //  UDP MANAGET initializer, crates and binds the instance to this 
	//--------------------------------------------------------------------------

    init_udp(config) {

        if(config.host != '' && config.udp_port != '')
		{
            this.VJPRO_UDP_MANAGER = new VjProUDP(this.config.host, this.config.udp_port,this,this.LogManager);
            
        }
    }

    //--------------------------------------------------------------------------
	//  initialize connection with the VjPro instance, needed to set an updated
	//  endpoint in the configuration
	//--------------------------------------------------------------------------

	init_tcp = (config) => {
        if(config.host != '' && config.tcp_port != '')
		{
		    this.VJPRO_TCP_MANAGER = new VjPro_TCP(config.host, config.tcp_port,this.LogManager)
        }else{
            this.VJPRO_TCP_MANAGER = null; 
        }
	}

	//--------------------------------------------------------------------------
	//  Check if connection to endpoint is valid, if it's valid, will start
	//  Status clock and will keep everything up to date, if not then status
	//  is set to show an Error message, this will show the user that the connection
	//  is invalid
	//--------------------------------------------------------------------------

	async checkConnectionStatus() {

		this.log('Beginning TCP connection check');
        let res = false
        if( this.VJPRO_TCP_MANAGER){
		    res = await this.VJPRO_TCP_MANAGER.Connect();
        }
		
		if (res) {

            this.LogManager('info','TCP Connection established!! Enjoy :D');
            this.updateStatus(InstanceStatus.Ok);

            //Create polling function (TODO: make updating speed customizable)
            this.createclock = setInterval(async () => {
                await this.Status_Polling()
                this.feedChecker()
            }, 1000);

		} else {
			this.log('warn', 'No TCP connection established, change port configuration for feedback');
			this.updateStatus(InstanceStatus.UnknownWarning);
		}
	}

    //--------------------------------------------------------------------------
	//  Check if connection to endpoint is valid, if it's valid, will start
	//  Status clock and will keep everything up to date, if not then status
	//  is set to show an Error message, this will show the user that the connection
	//  is invalid
	//--------------------------------------------------------------------------

	async Status_Polling(config) {

		//console.log('Beginning TCP connection check');
	
		let res = await this.VJPRO_TCP_MANAGER.GetStatus();
		
		if (res) {

            this.VjPro_Status = res
            this.Switcher_Status = this.getLastOutputValues(this.VjPro_Status.CurrentRule.Targets)
            this.isProgramManual = this.VjPro_Status.CurrentRule.AllowManualProgramCur;
            //console.log('switcher status :',this.Switcher_Status)
		} else {
            //console.log("Failed to get status ")
            this.updateStatus(InstanceStatus.Error);

		}
	}

    //--------------------------------------------------------------------------
	// Function that simply updates the feedback status of the buttons 
	//--------------------------------------------------------------------------
	
	feedChecker() {

        this.checkFeedbacks('is_program_manual');
		this.checkFeedbacks('switcher_program_status');
		this.checkFeedbacks('switcher_preview_status')

	}

    //--------------------------------------------------------------------------
    // Function that scrolls through the target obj list and searches for the 
    // obj that contains information about the active functions
    // [A bit tricky since VJPro is old and a messy structure] 
    //--------------------------------------------------------------------------

	getLastOutputValues(Targets) {

        let SwitcherButtons = []

        Targets.forEach(element => {
            
            if (element.hasOwnProperty("LastOutputValues")) {
                // Return the value of "LastOutputValues"
                //console.log("LastOutputValues Found",element.LastOutputValues)
                SwitcherButtons = element.LastOutputValues;
                return;
            }
        });

        return SwitcherButtons;
    }

    //--------------------------------------------------------------------------
    // Feedback boolean checker, used in feedbacks to color the button
    //--------------------------------------------------------------------------

    IsProgramOn(index) {

        if(this.Switcher_Status != [] && this.Switcher_Status != undefined){

            //console.log("IsProgramOn")

            const programObj =  this.Switcher_Status.find(obj => obj.Key === 'PROGRAM');

            var isMatching =  programObj.Value == index;
            //console.log("is Matching ", isMatching)
            return isMatching

        }
        return false; // If PROGRAM key is not found or is not a number
    }

    //--------------------------------------------------------------------------

     IsPreviewOn(index) {

        if(this.Switcher_Status != [] && this.Switcher_Status != undefined){

            const takeObj = this.Switcher_Status.find(obj => obj.Key === 'PREVIEW');
           
            var isMatching =  takeObj.Value == index;
            //console.log("is Matching ", isMatching)
            return isMatching
        }
        return false; // If PREVIEW key is not found or is not a number
    }
    
	//--------------------------------------------------------------------------
    // INTERNAL FUNCTIONS NECESSARY FOR THIS TO WORK 
    // names are self esplicatory
    //--------------------------------------------------------------------------

    async configUpdated(config) {

        //console.log("configUpdated")

        this.config = config;

        if (this.config.host) {

            this.init_udp(config);
            this.init_tcp(config);
            await this.checkConnectionStatus(config)
            this.setVariableDefinitions([]);

        } else {
            this.updateStatus(InstanceStatus.BadConfig);
        }
    }

	//--------------------------------------------------------------------------

    async destroy() {

        this.VJPRO_UDP_MANAGER.destroy();
        this.VJPRO_TCP_MANAGER.destroy();
        clearInterval(this.createClock)
        this.config = null;
        this.updateStatus(InstanceStatus.Disconnected);
        
    }

	//--------------------------------------------------------------------------

    getConfigFields() {
        return ConfigFields;
    }

    //--------------------------------------------------------------------------
}

runEntrypoint(Vjpro, []);