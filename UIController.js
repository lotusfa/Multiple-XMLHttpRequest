
class UIController {
	
	constructor() {
		this.csv_file_input = document.getElementById("csv_import_btn");
		this.import_btn = document.getElementById("send_btn");
		this.url_input = document.getElementById("url_input");
		this.method_input = document.getElementById("method_input");
		this.result_space = document.getElementById("result_space");
		this.delay_time_input = document.getElementById("delay_time_input");
		this.content_type_input = document.getElementById("content_type_input");

		this.event_init ();
		this.table = null;
		this.xml_request = new RequestController;
		this.delay_time = 200;
	}

	event_init () {
		let self = this;
		this.csv_file_input.addEventListener("input", ()=>{
			self.on_csv_import();
		});

		this.url_input.addEventListener("change", ()=>{
			self.on_url_change();
		});

		this.method_input.addEventListener("change", ()=>{
			self.on_method_change();
		});

		this.delay_time_input.addEventListener("change", ()=>{
			self.on_delay_time_change();
		});

		this.import_btn.addEventListener("click", ()=>{
			self.on_click_send_btn();
		});

		this.content_type_input.addEventListener("change", ()=>{
			self.on_content_type_change();
		});
	}

	on_csv_import () {
		let theFile = this.csv_file_input['files'][0];

		Excel_Reader.validate_excel (theFile,(bool)=>{
			if (bool) {
				//this.asn_name_input.disabled = false;
				Excel_Reader.excel_to_json (theFile,(str)=>{

					let temp_table = new DataTable;
					temp_table.import_json(str,"name",()=>{
						this.table = temp_table;
						this.update_table_html ();
					});
				});
			}else{
				this.csv_file_input.value = null;
				alert("Only CSV And xlsx is allowed");
			}
		});

	}

	on_url_change () {
		this.xml_request.set_url(this.url_input.value);
	}

	on_content_type_change () {
		this.xml_request.set_content_type(this.content_type_input.value);
	}

	on_delay_time_change () {
		this.delay_time = this.delay_time_input.value;
	}

	on_method_change () {
		this.xml_request.set_method(this.method_input.value);
	}

	on_click_send_btn () {
		if (this.table == null ) 
			return;

		let self = this;

		this.clear_result_html ();
		for (let i = 0; i < this.table.rows.length ; i++) { 
			
			let st = this.table.cols[0]+"="+this.table.rows[i][0];	

			if (this.table.cols.length == 1 ) {
				this.xml_request.send(st);
			}
			else{
				for (let j = 1; j < this.table.cols.length; j++) {
					st += "&"+this.table.cols[j]+"="+this.table.rows[i][j];

					if (j == this.table.cols.length - 1) { 

						setTimeout(()=>{ 
							console.log("Send :"+i );
							self.xml_request.send(st,(r)=>{
								self.add_result_html(r);
							});
						}, self.delay_time*i );

					}
				}
			}
		}

	}	

	update_table_html () {
		let header = document.getElementById('csv_header');
		header.innerHTML = "";
		for (var i = 0; i < this.table.cols.length; i++) {
			let th = document.createElement("th");
			th.scope = "col";
			th.innerHTML = this.table.cols[i];
			header.appendChild(th);
		}

		let values = document.getElementById('csv_value');
		values.innerHTML = "";

		for (let i = 0; i < this.table.rows.length ; i++) { 

			let tr = document.createElement("tr");
			values.appendChild(tr);

			for (var j = 0; j < this.table.cols.length; j++) {
				let td = document.createElement("td");
				td.innerHTML = this.table.rows[i][j];
				tr.appendChild(td);
			}
		}
	}

	clear_result_html () {
		this.result_space.innerHTML = "";
	}

	add_result_html (str) {
		let hr = document.createElement("hr");
		this.result_space.appendChild(hr);
		let p = document.createElement("p");
		p.innerHTML = str;
		this.result_space.appendChild(p);
		
	}
}