class Excel_Reader {

	static validate_excel (theFile,callback ) {
		let self = this; 
		this.validate_csv(theFile,(b)=>{
			if (b) callback(true);
			else {
				self.validate_xlsx(theFile,(b)=>{
					if (b) callback(true);
					else callback(false);
				});
			}
		} );
	}

	static excel_to_json (theFile,callback) {
		let self = this; 
		this.validate_csv(theFile,(b)=>{
			if (b) {
				self.csv_to_json (theFile,(s)=>{
					callback(s);
				} );
			}else {
				self.validate_xlsx(theFile,(b)=>{
					if (b) {
						self.xlsx_to_json(theFile,(s)=>{
							callback(s);
						} );
					}else callback(false);
				});
			}
		} );
	}

	static validate_csv (theFile,callback ) {

		let s = theFile.name.split('.');
		let type = s[s.length-1];

		if (type == "csv" ) 
			callback(true);

		else
			callback(false);
	}

	static csv_to_json (theFile,callback) {
		// Browser is not compatible
		if(!window.FileReader) callback(false); 

		let reader = new FileReader();
	
		reader.onload = function(e) {
		  let text = reader.result;

		    let allTextLines = text.split(/\r\n|\n/);
		    let csv_json = [];

		    for (let i=1; i<allTextLines.length; i++) {
		        let data = allTextLines[i].split(',');
	            let tarr = {};
	            for (var j=0; j<data.length; j++) {
	                // tarr.push(data[j]);
	                tarr[allTextLines[0].split(',')[j]] = data[j];
	                if (i == allTextLines.length - 1 && j == data.length - 1) {
	                	callback(csv_json);
	                }
	            }
	            csv_json.push(tarr);
		    }
		  }
		reader.readAsText(theFile);
	}

	static validate_xlsx (theFile,callback ) {

		let s = theFile.name.split('.');
		let type = s[s.length-1];

		if (type == "xlsx" ) 
			callback(true);
		else
			callback(false);
	}

	static xlsx_to_json (theFile,callback) {
		
		var rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer
		
		var f = theFile;
		var reader = new FileReader();
		reader.onload = function(e) {
		  var data = e.target.result;
		  if(!rABS) data = new Uint8Array(data);
		  var workbook = XLSX.read(data, {type: rABS ? 'binary' : 'array'});

		  /* DO SOMETHING WITH workbook HERE */
		  callback(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]] , { defval : "" } ));
		};
		if(rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
	}
}