class RequestController {
	constructor() {
		this.url = null;
		this.method_list = ["GET","POST","PUT"];
		this.method = "GET";

	}

	set_url (url){
		this.url = url;
	}

	set_method (method){
		if (!this.method_list.includes(method)) 
			return false;
		this.method = method;
	}

	send(params,callback = (x)=>{} ){
		if (this.url == null ) { return; }
		switch(this.method) {
		    case "GET":
		        this.get(params,(x)=>{
		        	callback(x);
		        });
		        break;
		    case "POST":
		        this.post(params,(x)=>{
		        	callback(x);
		        });
		        break;
		    case "PUT":
		        this.put(params,(x)=>{
		        	callback(x);
		        });
		        break;
		    case "DELETE":
		        this.delete(params,(x)=>{
		        	callback(x);
		        });
		        break;
		    default:
		        console.log("method is no vailate");
		}
	}

	get(params,callback = (x)=>{}){
		//foo=bar&lorem=ipsum
		let self = this;
		let url = this.url + "?" + params;
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);

		xhr.onload = function () {
			callback(this.responseText);
		};

		xhr.onerror = function() {
		  self.on_error();
		};

		xhr.send();
	}

	post(params,callback = (x)=>{}){

		this.xml_http_request("POST",this.url,params,(x)=>{
			callback(x);
		});
	}

	put(params,callback = (x)=>{}){
		this.xml_http_request("PUT",this.url,params,(x)=>{
			callback(x);
		});
	}

	delete(params,callback = (x)=>{}){
		this.xml_http_request("DELETE",this.url,params,(x)=>{
			callback(x);
		});
	}

	xml_http_request(method,url,params = "",callback = (x)=>{}){
		var xhr = new XMLHttpRequest();
		xhr.open(method, url , true);

		//Send the proper header information along with the request
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		xhr.onreadystatechange = function() {//Call a function when the state changes.
		    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
		        callback(this.responseText);
		    }
		}
		let self = this;
		xhr.onerror = function() {
		  self.on_error();
		};

		xhr.send(params); 
	}

	on_error () {
		alert('Some Error Occurs, Try to install the extentison');
	}

}