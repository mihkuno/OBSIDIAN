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



class Table {
	constructor(title) {
		// table properties
		this.headerTitle = title;

		// get the root container 
		this.cardBody = document.querySelector(".page-category");

		// create the table body
		this.tableElement = document.createElement('div')
		// add the table class attribute
		this.tableElement.setAttribute('class', 'col-md-12')

		// table content
		this.content = `
		<!-- TABLE -->
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
						<tbody class="sort-wrapper">
							<!-- TABLE ROWS -->
							
							<!-- END TABLE ROWS>	
						<!-- END TABLE BODY -->
						</tbody>
					</table>
				</div>
			</div>
		</div>`;
	}
	// table create method
	create() {
		// append created container to target container
		this.cardBody.appendChild(this.tableElement);
		// insert string contents to created container  
		this.tableElement.insertAdjacentHTML('beforeend', this.content);

		// make rows sortable
		// DASHBOARD SORT LIBRARY
		const wrapper = document.querySelector('.sort-wrapper')
		new Sortable(wrapper, {
			handle: '.sort-handler', 
			forceFallback: false,
			animation: 200,
		});
	}

	addRow() {
		const row = `
		<tr draggable="true">
			<!-- TITLE -->
			<td>DYNAMIC FORECASTING (ARIMA)</td>
			<!-- STATUS -->
			<td>
				<div class="btn-group bg-dark2">
					<!-- OUTPUT STATUS BUTTON -->
					<button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						<span class="btn-label">
							<i class="fa icon-close"></i>
						</span>
						Stuck
					</button>
					<!-- DROPDOWN BUTTONS-->
					<div class="dropdown-menu bg-dark p-2">
						<!-- SOON -->
						<button class="dropdown-item btn btn-secondary" style="color: white;">
							<span class="btn-label">
								<i class="fa icon-direction"></i>
							</span>
							Soon
						</button>
						<!-- STUCK -->
						<button class="dropdown-item btn btn-danger" style="color: white;">
							<span class="btn-label">
								<i class="fa icon-close"></i>
							</span>
							Stuck
						</button>
						<!-- PROGRESSING -->
						<button class="dropdown-item btn btn-warning" style="color: white;">
							<span class="btn-label">
								<i class="fa icon-information"></i>
							</span>
							Progressing
						</button>
						<!-- COMPLETED -->
						<button class="dropdown-item btn btn-success" style="color: white;">
							<span class="btn-label">
								<i class="fa icon-check"></i>
							</span>
							Completed
						</button>
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
	}
}

new Table('Something').create();

