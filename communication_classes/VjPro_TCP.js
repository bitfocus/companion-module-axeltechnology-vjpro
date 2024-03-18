/**/
let fetch
import('node-fetch').then((module) => {
	fetch = module.default
})

//----------------------------------------------------------------------------------------------------
//variables used to build the api request link
//----------------------------------------------------------------------------------------------------

let url
let urlSuffix = 'http://'
let format = 'format=json'

//----------------------------------------------------------------------------------------------------
//Class used to work whit the vjpro
//----------------------------------------------------------------------------------------------------
class VjPro_TCP{

	//------------------------------------------------------------------------------------------------
	//  the constructor uses the Ip, and url port specified by the user to build the
	//  endpoint
	//------------------------------------------------------------------------------------------------

	constructor(Ip, Port,LogManager) {

		this.LogManager = LogManager;
		
		if(Ip && Port && Ip != null && Port != null && Ip != undefined) {
			this.Ip = Ip
			this.Port = Port
			this.Url = urlSuffix + Ip + ':' + Port + ''
		}else{
			// Log a warning if either IP or Port is empty or null
			this.LogManager('warn', 'Incomplete TCP configuration: IP or Port is missing');
		}
	}

	//------------------------------------------------------------------------------------------------
	//  function made to generate the endpoint url, since most of the url are the same for all api's
	//------------------------------------------------------------------------------------------------

	getUrl(api, type) {

		if (type == 'data_p') {
			return (url = this.Url + '/VJPRO/REST/' + api + '&' + format)
		} else if (type == 'data_no_p') {
			return (url = this.Url + '/VJPRO/REST/' + api + '?' + format)
		} else if (type == 'command') {
			return (url = this.Url + '/VJPRO/REST/' + api)
		}

	}

	//------------------------------------------------------------------------------------------------
	//  Fetch Api manager function, we implement this to handle all the fetch request and stop
	//  them if necessary
	//------------------------------------------------------------------------------------------------

	ExecuteRequest = async (url, toJson) => {

		// Default toJson value to true if not provided
		const returnJson = toJson !== undefined ? toJson : false;
	
		// Here we check if we got the configuration
		if (this.Ip && this.Port ) {
			try {
				const res = await fetch(url);
	
				if (res.ok) {
					// Return JSON data on success if returnJson is true
					if (returnJson) {
						return await res.json();
					} else {
						return res; // Return the entire response object
					}
				} else {
					// Log an error on failure
					this.LogManager('error', 'Error fetching data from server:' + res.statusText);
				}
			} catch (err) {
				// Handle network error
				this.LogManager('error', 'Network error occurred:' + err.message);
			}
		} else {
			// No configuration
			this.LogManager('warn', 'No configuration');
		}
	
		// Return null if there is no data to return
		return null;
	}

	//------------------------------------------------------------------------------------------------
	//  function called when we initilialize the module, since the dynamic
	//  import of node-fetch might not have completed before the Connect method is called.
	//------------------------------------------------------------------------------------------------

	async loadFetch() {
		if (!fetch) {
			const module = await import('node-fetch')
			fetch = module.default
		}
	}

	//------------------------------------------------------------------------------------------------
	//  function called in the init and config update, it will try to connect to a default api to see
	//  if a connection is extablished, if not return error that machine wasn't reached
	//------------------------------------------------------------------------------------------------

	Connect = async () => {

		await this.loadFetch() //load fetch module
		//this.debug('debug', 'CONNECT')

		url = this.getUrl('GetStatus', 'data_no_p')
		try {
			const response = await this.ExecuteRequest(url,false)
			if (response.status == 200) {
				this.LogManager('info','successful connection')
				return true
			} else {
				this.LogManager('info','rejected connection')
			}
		} catch (err) {
			this.LogManager('error','Error in TCP Connection, Commands will work but no feedback', err)
			return false
		}
	}

	///------------------------------------------------------------------------------------------------
	//  API USED IN ACTIONS
	//------------------------------------------------------------------------------------------------

	//function takes multi and single pages on air
	GetStatus = async () => {
		url = this.getUrl('GetStatus','data_no_p')
		const response = await this.ExecuteRequest(url,true)
		return response
	}

}

module.exports = VjPro_TCP;

/**/
