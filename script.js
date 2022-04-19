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


// static method to count the number of tables created
var tableCount = 0;
// TABLE COMPONENT
class Table {
	constructor(headerTitle) {
		// increment the static variable
		tableCount++; console.log('tables created:', tableCount);
		// set table header
		this.headerTitle = headerTitle; 
		// get the target container as the root 
		this.cardBody = document.querySelector("div.page-category");
		// create the table body
		this.tableElement = document.createElement('div')
		// add the table class attribute
		this.tableElement.setAttribute('class', 'col-md-12')
		// add the table ID attribute
		this.tableID = tableCount;
		// table content
		this.content = `
		<!-- TABLE CARD -->
		<div class="card">
			<div class="card-header">
				<div class="d-flex align-items-center">
					<!-- HEADER TITLE -->
					<h4 class="card-title">${this.headerTitle}</h4>
					<!-- ADD ROW BUTTON -->
					<button class="btn btn-primary btn-round ml-auto" data-toggle="modal" data-target="#addRowModal">
						<i class="fa fa-plus"></i>
						Add Row
					</button>
				</div>
			</div>
			<div class="card-body">
				<!-- MODAL -->
				<div class="modal fade" id="addRowModal" tabindex="-1" role="dialog" aria-hidden="true">
					<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-header no-bd">
								<h5 class="modal-title">
									<span class="fw-mediumbold">
									New</span> 
									<span class="fw-light">
										Row
									</span>
								</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<p class="small">Create a new row using this form, make sure you fill them all</p>
								<form>
									<div class="row">
										<div class="col-sm-12">
											<div class="form-group form-group-default">
												<label>Name</label>
												<input id="addName" type="text" class="form-control" placeholder="fill name">
											</div>
										</div>
										<div class="col-md-6 pr-0">
											<div class="form-group form-group-default">
												<label>Position</label>
												<input id="addPosition" type="text" class="form-control" placeholder="fill position">
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group form-group-default">
												<label>Office</label>
												<input id="addOffice" type="text" class="form-control" placeholder="fill office">
											</div>
										</div>
									</div>
								</form>
							</div>
							<div class="modal-footer no-bd">
								<button type="button" id="addRowButton" class="btn btn-primary">Add</button>
								<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
							</div>
						</div>
					</div>
				</div>
				<!-- END MODAL -->

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

		// append created container to target container
		this.cardBody.appendChild(this.tableElement);
		// insert string contents to created container  
		this.tableElement.insertAdjacentHTML('beforeend', this.content);

		// the created table body container after appending to target container
		this.tBodyContainer = document.querySelector(`tbody.sort-wrapper#table-${this.tableID}`);

		// make sortable the tbody content (rows)
		new Sortable(this.tBodyContainer, { // SORTABLE JS LIBRARY 
			handle: '.sort-handler', 
			forceFallback: false,
			animation: 200,
		});
		this.rowCount = 0; // set number of rows
		this.itemCount = 0; // set number of dropdown item 
	}

	// add a row method
	addRow(title, status) {
		this.rowCount++; console.log('num of rows', this.rowCount);

		// set button states
		const btnSelect =(state, contextClass) => {
			let colorClass, icon, attributes;

			// is it a button or an dropdown item?
			if(contextClass=='item') {
				// attributes="onclick=>console.log(dropdown button clicked)";
				this.itemCount++; 
				// add the row ID attribute
				attributes = `id=table-${this.tableID}-row-${this.rowCount}-item-${this.itemCount}`;
				contextClass = 'dropdown-item';
			}
			else if (contextClass=='drop') {
				attributes=`data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="table-${this.tableID}-status-${this.rowCount}"`;
				contextClass = 'dropdown-toggle';
			}

			// change the text, icon, color
			switch(state) {
				case 'Complete':
					colorClass = 'btn-success';
					icon = 'icon-check';
					break;
				case 'Develop':
					colorClass = 'btn-warning';
					icon = 'icon-information';
					break;
				case 'Stuck':
					colorClass = 'btn-danger';
					icon = 'icon-close';
					break;
				default:
					colorClass = 'btn-secondary';
					icon = 'icon-direction';
			}

			const btn = `
			<!-- ${status.toUpperCase()} -->
			<!-- make button text white, set fixed width -->
			<button class="btn ${contextClass} ${colorClass}" style="color: white; width: 8rem;" ${attributes}>
				<span class="btn-label">
					<i class="fa ${icon}"></i>
				</span>
				${state}
			</button>
			`;
			return btn;
		}



		const rowContent = `
		<tr draggable="true" id=table${this.tableID}-row-${this.rowCount}>
			<!-- TITLE -->
			<td>${title}</td>
			<!-- STATUS -->
			<td>
				<div class="btn-group bg-dark2">
					<!-- OUTPUT STATUS BUTTON -->
					${btnSelect(status,'drop')}

					<!-- DROPDOWN BUTTONS-->
					<div class="dropdown-menu bg-dark p-2">
						${btnSelect('Soon','item')}
						${btnSelect('Stuck','item')}
						${btnSelect('Develop','item')}
						${btnSelect('Complete','item')}
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
					<button type="button" data-toggle="tooltip" title="" class="btn btn-link btn-primary btn-lg" data-original-title="Edit Task">
						<i class="fa fa-edit"></i>
					</button>
					<button type="button" data-toggle="tooltip" title="" class="btn btn-link btn-secondary sort-handler">
						<i class="fas fa-ellipsis-h sort-handle"></i>
					</button>
				</div>
			</td>
		</tr>`;
		// insert the row to table body
		this.tBodyContainer.insertAdjacentHTML('beforeend', rowContent);
	}
}

let mytable = new Table('Something');
mytable.addRow('DYNAMIC FORECASTING (ARIMA)', 'Stuck');
mytable.addRow('DYNAMIC FORECASTING (ARIMA)', 'Stuck');
mytable.addRow('DYNAMIC FORECASTING (ARIMA)', 'Stuck');

let herTable = new Table('Something');
herTable.addRow('DYNAMIC FORECASTING (ARIMA)', 'Stuck');
herTable.addRow('DYNAMIC FORECASTING (ARIMA)', 'Stuck');
herTable.addRow('DYNAMIC FORECASTING (ARIMA)', 'Stuck');