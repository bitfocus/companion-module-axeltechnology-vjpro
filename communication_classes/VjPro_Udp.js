const { UDPHelper } = require( '@companion-module/base');

class VjProUDP {

    constructor(host, port, self,LogManager) {

        this.LogManager = LogManager;

        if(host && port && host != null && port != null && host != undefined) {

            this.host = host;
            this.port = port;
            this.udp = new UDPHelper(host, port);
            this.self = self;
            this.initListeners();
            
        }else{
            // Log a warning if either IP or Port is empty or null
			this.LogManager('warn', 'Incomplete UDP configuration: IP or Port is missing');
        }
    }

    //------------------------------------------------------------------------------------------------
    // LISTENER INITIALIZER (TODO: DATA MANAGEMENT AND STATUS FEEDBACK)
    //------------------------------------------------------------------------------------------------

    initListeners() {

        this.udp.on('error', (err) => {
            this.LogManager('error', 'Network error: ' + err.message);
        });

        this.udp.on('listening', () => {
            this.LogManager('info', 'UDP socket listening on port ' + this.port);
        });

        this.udp.on('status_change', (status, message) => {
            this.LogManager('info', 'UDP status changed: ' + status + ' - ' + message);
        });
    }

    //------------------------------------------------------------------------------------------------
    // General function that manages sending a single udp command to the vjpro instance
    //------------------------------------------------------------------------------------------------

    async sendCommand(COMMAND,index, id_end) {

        var cmd 
        if (this.host && this.port ) {
            
            if(index!= ''){
                cmd =  decodeURIComponent(await this.self.parseVariablesInString(`${COMMAND}(${index})`));
            }else{
                cmd =  decodeURIComponent(await this.self.parseVariablesInString(`${COMMAND}`));
            }

            if (cmd !== '') {
                const sendBuf = Buffer.from(cmd + id_end, 'latin1');

                this.LogManager('debug', 'sending to ' + this.host + ': ' + sendBuf.toString())

                this.udp.send(sendBuf);
            }
        } else {
            // No configuration
            this.LogManager('warn', 'No configuration');
        }
    }

    //------------------------------------------------------------------------------------------------
    // CALLBACK FUNTIONS (JUST DEFINES THE COMMAND STRING AND CALLS sendCommand)
    //------------------------------------------------------------------------------------------------
    
    //---------//
    // SETTERS //
    //---------//

    async setMaster(index, id_end) {
        await this.sendCommand('SETMASTER',index,id_end);
    }
    
    async setLayout(index, id_end) {
        await this.sendCommand('SETLAYOUT',index,id_end);
    }

    async setCamera(index, id_end) {
        await this.sendCommand('SETCAMERA',index,id_end);
    }

    async setVolume(index, id_end) {
        await this.sendCommand('SETVOLUME',index,id_end);
    }

    async setGain(index, id_end) {
        await this.sendCommand('SETGAIN',index,id_end);
    }

    async setAllowManualProgram(index, id_end) {
        await this.sendCommand('SETALLOWMANUALPROGRAM',index,id_end);
    }

    async setAllowManualGraphics(index, id_end) {
        await this.sendCommand('SETALLOWMANUALGRAPHICS',index,id_end);
    }

    //---------//
    //  OTHER  //
    //---------//

    async take(index, id_end) {

        await this.sendCommand('TAKE',index,id_end);
    }

    async program(index, id_end) {
        await this.sendCommand('PROGRAM',index,id_end);
    }

    async preview(index, id_end) {
        await this.sendCommand('PREVIEW',index,id_end);
    }

    async macro(index, id_end) {
        await this.sendCommand('MACRO',index,id_end);
    }
    
    async dskcut(index, id_end) {
        await this.sendCommand('DSKCUT',index,id_end);
    }

    async dskauto(index, id_end) {
        await this.sendCommand('DSKAUTO',index,id_end);
    }

    async resetRule(index, id_end) {
        await this.sendCommand('RESETRULE',index,id_end);
    }

    async removeAll(index, id_end) {
        await this.sendCommand('REMOVEALL',index,id_end);
    }

    // this function behaves differently with negative index values 
    async gpiIn(index, id_end) {
        await this.sendCommand('GPIIN',index,id_end);
    }

    async gpiOut(index, id_end) {
        await this.sendCommand('GPIOUT',index,id_end);
    }

    //------------------------------------------------------------------------------------------------
}


module.exports = VjProUDP;