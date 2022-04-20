// BOOTSTRAP SLIDER JQUERY
$( function() {
	$( "#slider" ).slider({
		range: "min",
		max: 100,
		value: 40,
	});
	$( "#slider-range" ).slider({
		range: true,
		min: 0,
		max: 100,
	});
});

class Button {
	constructor(tableID, rowCount, itemCount, state, contextClass) {
		this.tableID = tableID;
		this.rowCount = rowCount;
		this.itemCount = itemCount;
		this.state = state;
		this.contextClass = contextClass;
		this.colorClass; this.icon; this.attributes;

		// is it a button or an dropdown item?
		// these attributes are part of bootstrap dropdown
		if(contextClass=='item') {
			// attributes="onclick=>console.log(dropdown button clicked)";
			itemCount++; 
			// add the row ID attribute
			this.attributes = `id=table-${this.tableID}-row-${this.rowCount}-item-${this.itemCount}`;
			this.contextClass = 'dropdown-item';
				
		}
		else if (contextClass=='drop') {
			// given unique ID to dropdown button accociated to its row count
			this.attributes=`data-toggle="dropdown" 
				aria-haspopup="true" 
				aria-expanded="false" 
				id="table-${this.tableID}-row-${this.rowCount}-status"`;
			this.contextClass = 'dropdown-toggle';
		}
		// change the text, icon, color
		switch(this.state) {
			case 'Complete':
				this.colorClass = 'btn-success';
				this.icon = 'icon-check';
				break;
			case 'Develop':
				this.colorClass = 'btn-warning';
				this.icon = 'icon-information';
				break;
			case 'Stuck':
				this.colorClass = 'btn-danger';
				this.icon = 'icon-close';
				break;
			default:
				this.colorClass = 'btn-secondary';
				this.icon = 'icon-direction';
		}
	}
	select () {
		const btn = `
		<button class="btn ${this.contextClass} ${this.colorClass}" style="color: white; width: 8.3rem;" ${this.attributes}>
			<!-- SELECTED STATUS IS <${this.state.toUpperCase()}> -->
			<!-- make button text white, set fixed width -->
			<span class="btn-label">
				<i class="fa ${this.icon}"></i>
			</span>
			${this.state}
		</button>
		`;
		return btn;
	}
}


// static to count the number of tables created
var tableCount = 0;
// TABLE COMPONENT
class Table {
	constructor(headerTitle) {
		// increment the static variable
		tableCount++; console.log('tables created:', tableCount);
		
		// set table header
		this.headerTitle = headerTitle; 
		// get the target container as the root of the table
		this.cardBody = document.querySelector("div.page-category");
		// create the table body
		this.tableElement = document.createElement('div')
		// add the table class attribute
		this.tableElement.setAttribute('class', 'col-md-12')
		// add the table ID attribute
		this.tableID = tableCount;
		// append created table body to target container
		this.cardBody.appendChild(this.tableElement);
		// table content
		this.content = `
		<!-- TABLE CARD -->
		<div class="card table-striped">
			<div class="card-header">
				<div class="d-flex align-items-center">
					<!-- HEADER TITLE -->
					<h4 class="card-title">${this.headerTitle}</h4>
					<!-- ADD ROW BUTTON -->
					<button class="btn btn-primary btn-round ml-auto" data-toggle="modal" data-target="#addRowModal" id='table-${this.tableID}-addrow'>
						<i class="fa fa-plus"></i>
						Add Row
					</button>
				</div>
			</div>
			<div class="card-body">

				<!-- TABLE CONTENT -->
				<div class="table-responsive">
					<table id="add-row" class="display table" >
						<!-- TABLE HEADER -->
						<thead>
							<tr>
								<th>Label</th>
								<th>Status</th>
								<th>Timeline</th>
								<th>Progress</th>
								<th>Owner</th>
								<th>Last Updated</th>
								<th style="width: 10%">Action</th>
							</tr>
						</thead>
						
						<!-- TABLE BODY -->
						<tbody class="sort-wrapper" id=table-${this.tableID}>
							<!-- TABLE ROWS -->
							<!-- ADD TABLE ROWS>	
						<!-- END TABLE BODY -->
						</tbody>
					</table>
				</div>
			</div>
		</div>`;
		// insert string contents to created container  
		this.tableElement.insertAdjacentHTML('beforeend', this.content);

		// select the created table body container after appending to target container
		this.tBodyContainer = document.querySelector(`tbody.sort-wrapper#table-${this.tableID}`);

		// make sortable the tbody content (rows)
		new Sortable(this.tBodyContainer, { // SORTABLE JS LIBRARY 
			handle: '.sort-handler', 
			forceFallback: false,
			animation: 200,
		});
		this.rowCount = 0; // set number of rows

		// addtable click listener




		// addrow click listener
		const addRowButton = document.querySelector(`button#table-${this.tableID}-addrow`);
		addRowButton.addEventListener('click', () => {
			this.addRow('Something', 'Soon');
			console.log(`-- created new row --`);
			
			// notification
			$.notify({
				// options
				icon: 'flaticon-add',
				title: 'Added Row',
				message: ''
			},{
				// settings
				element: 'body',
				position: null,
				type: "info",
				allow_dismiss: true,
				newest_on_top: false,
				showProgressbar: false,
				placement: {
					from: "top",
					align: "right"
				},
				offset: 20,
				spacing: 10,
				z_index: 1031,
				delay: 700,
				timer: 850,
				mouse_over: null,
				animate: {
					enter: 'animated fadeInDown',
					exit: 'animated fadeOutUp'
				},
				onShow: null,
				onShown: null,
				onClose: null,
				onClosed: null,
				icon_type: 'class',
				template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
					'<span data-notify="icon"></span> ' +
					'<span data-notify="title">{1}</span> ' +
				'</div>' 
			});

		});
	}

	// add a row method
	addRow(label, status) {
		this.rowCount++; console.log('num of rows', this.rowCount);
		var itemCount = 0; // set number of dropdown item 
		// returns a html content NOT an object
		// the first three parameters creates a unique ID 
		let statusBtn = new Button(this.tableID,this.rowCount, itemCount++, status,'drop').select();
		let soonBtn = new Button(this.tableID,this.rowCount, itemCount++, 'Soon','item').select();
		let stuckBtn = new Button(this.tableID,this.rowCount, itemCount++, 'Stuck','item').select();
		let developBtn = new Button(this.tableID,this.rowCount, itemCount++, 'Develop','item').select();
		let completeBtn = new Button(this.tableID,this.rowCount, itemCount++, 'Complete','item').select();

		const tableRowID = `table${this.tableID}-row-${this.rowCount}`;
		const rowLabelID = `table-${this.tableID}-row-${this.rowCount}-label`;
		const rowEditID  = `table-${this.tableID}-row-${this.rowCount}-edit`;

		const rowContent = `
		<tr draggable="true" id="${tableRowID}">
			<!-- LABEL -->
			<td>
			<div class="form-group">
				<input type="text" class="form-control input-border-bottom" id="${rowLabelID}" style='border: 0; color: #828282;' placeholder="row-${this.rowCount}">
			</div>
			</td>
			<!-- STATUS -->
			<td>
				<div class="btn-group bg-dark2">
					<!-- OUTPUT STATUS BUTTON -->
					${statusBtn}

					<!-- DROPDOWN BUTTONS-->
					<div class="dropdown-menu bg-dark p-2">
						${soonBtn}
						${stuckBtn}
						${developBtn}
						${completeBtn}
					</div>
				</div>
			</td>
			<!-- TIMELINE -->
			<td>Apr 1 - 13</td>
			<!-- PROGRESS -->
			<td>
				<div id="slider" class="slider-primary"></div>
			</td>
			<!-- OWNER -->
			<td>
				<div class="avatar-group">
					<div class="avatar">
						<img src="assets/img/jm_denis.jpg" alt="..." class="avatar-img rounded-circle border border-dark">
					</div>
					<div class="avatar">
						<img src="assets/img/chadengle.jpg" alt="..." class="avatar-img rounded-circle border border-dark">
					</div>
					<div class="avatar">
						<img src="assets/img/mlane.jpg" alt="..." class="avatar-img rounded-circle border border-dark">
					</div>
					<div class="avatar">
						<span class="avatar-title rounded-circle border border-dark">CF</span>
					</div>
				</div>
			</td>
			<!-- LAST UPDATED -->
			<td>13 minutes ago</td>
			<!-- FORM ACTION AND SORTABLE -->
			<td>
				<div class="form-button-action">
					<button id='${rowEditID}' type="button" data-toggle="tooltip" title="" class="btn btn-link btn-primary btn-lg" data-original-title="Edit Task">
						<i class="fa fa-edit text-danger"></i>
					</button>
					<button type="button" data-toggle="tooltip" title="" class="btn btn-link btn-secondary sort-handler">
						<i class="fas fa-ellipsis-h sort-handle"></i>
					</button>
				</div>
			</td>
		</tr>`;

		// insert the row to table body
		this.tBodyContainer.insertAdjacentHTML('beforeend', rowContent);

		// row edit listener
		const editRowButton = document.querySelector(`button#${rowEditID}`); 
		editRowButton.addEventListener('click', () => {
			// console.log(editRowButton);
			// MODAL CONFIRMATION
			swal({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				icon: 'warning',
				buttons:{
					cancel: {
						visible: true,
						className: 'btn btn-danger'
					},
					confirm: {
						text : 'Yes, delete it!',
						className : 'btn btn-success',
					}
				}
			}).then((Delete) => {
				if (Delete) {
					document.querySelector(`tr#${tableRowID}`).remove(); // deletes the row based on ID
					// notification
					$.notify({
						// options
						icon: 'flaticon-exclamation',
						title: 'Removed Row',
						message: ''
					},{
						// settings
						element: 'body',
						position: null,
						type: "warning",
						allow_dismiss: true,
						newest_on_top: false,
						showProgressbar: false,
						placement: {
							from: "top",
							align: "right"
						},
						offset: 20,
						spacing: 10,
						z_index: 1031,
						delay: 700,
						timer: 850,
						mouse_over: null,
						animate: {
							enter: 'animated fadeInDown',
							exit: 'animated fadeOutUp'
						},
						onShow: null,
						onShown: null,
						onClose: null,
						onClosed: null,
						icon_type: 'class',
						template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
							'<span data-notify="icon"></span> ' +
							'<span data-notify="title">{1}</span> ' +
						'</div>' 
					});
					swal({
						title: 'Removed!',
						text: '',
						icon: 'success',
						timer: 550
					});
				} else {
					swal.close();
				}
			});
		});
		
	

		// loop through each dropdown item
		for (let i = 1; i < itemCount; i++) {
			const dropItem = document.querySelector(`button#table-${this.tableID}-row-${this.rowCount}-item-${i}`);
			const dropBtn = document.querySelector(`button#table-${this.tableID}-row-${this.rowCount}-status`);
			// change the text, icon, color when dropdown item is clicked
			dropItem.addEventListener('click', ()=> {
				const state = dropItem.textContent.trim(); 
				
				let cc, ii;
				switch(state) {
					case 'Complete':
						cc = 'btn-success';
						ii = 'icon-check';
						break;
					case 'Develop':
						cc = 'btn-warning';
						ii = 'icon-information';
						break;
					case 'Stuck':
						cc = 'btn-danger';
						ii = 'icon-close';
						break;
					default:
						cc = 'btn-secondary';
						ii = 'icon-direction';
				}
				dropBtn.innerHTML = "";
				dropBtn.setAttribute('class', `btn dropdown-toggle ${cc}`)
				dropBtn.insertAdjacentHTML('beforeend',`<span class="btn-label"><i class="fa ${ii}"></i></span> ${state} `); // add space
				// document.querySelectorAll("div.show").forEach(e => e.classList.remove("show")); bootstrap does it automatically
			});
		}
	}
}

let mytable = new Table('FEATURES');
mytable.addRow('DYNAMIC FORECASTING (ARIMA)', 'Complete');
mytable.addRow('DYNAMIC FORECASTING (ARIMA)', 'Stuck');

let herTable = new Table('Something');
herTable.addRow('DYNAMIC FORECASTING (ARIMA)', 'Stuck');
herTable.addRow('DYNAMIC FORECASTING (ARIMA)', 'Stuck');
