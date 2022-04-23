// CLASS CHANGE EVENT LISTENER
// new ClassWatcher(targetNode, 'trigger', workOnClassAdd, workOnClassRemoval);
class ClassWatcher {

    constructor(targetNode, classToWatch, classAddedCallback, classRemovedCallback) {
        this.targetNode = targetNode
        this.classToWatch = classToWatch
        this.classAddedCallback = classAddedCallback
        this.classRemovedCallback = classRemovedCallback
        this.observer = null
        this.lastClassState = targetNode.classList.contains(this.classToWatch)

        this.init()
    }

    init() {
        this.observer = new MutationObserver(this.mutationCallback)
        this.observe()
    }

    observe() {
        this.observer.observe(this.targetNode, { attributes: true })
    }

    disconnect() {
        this.observer.disconnect()
    }

    mutationCallback = mutationsList => {
        for(let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                let currentClassState = mutation.target.classList.contains(this.classToWatch)
                if(this.lastClassState !== currentClassState) {
                    this.lastClassState = currentClassState
                    if(currentClassState) {
                        this.classAddedCallback()
                    }
                    else {
                        this.classRemovedCallback()
                    }
                }
            }
        }
    }
}

// STATUS COMPONENT
class StatusButton {
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

// TABLE COMPONENT
var tableCount = 0; // static to count the number of tables created
class Table {
	constructor(headerTitle) {
		// increment the static variable
		tableCount++; console.log('tables created:', tableCount);
		this.rowCount = 0; // set number of rows

		this.tableID = tableCount; // add counter as ID
		this.headerTitle = headerTitle; // set table header
		
		// CREATE TABLE CARD PARENT
		this.tableCardID = `table-${this.tableID}-card`; // add ID to the parent
		this.tableCard = document.createElement('div') 
		this.tableCard.setAttribute('class', `table-card card `);
		this.tableCard.setAttribute('id', `${this.tableCardID}`);
		// append card parent to root container
		this.tableCardRoot = document.querySelector("div.page-category#index-content");
		this.tableCardRoot.appendChild(this.tableCard);

		// table content
		this.content = `
		<!-- TABLE CARD -->
		<div class="table-striped" draggable="true">
			<div class="card-header">
				<div class="d-flex align-items-center">
					<!-- TABLE SORT HANDLER -->
					<button type="button" data-toggle="tooltip" class="btn btn-link btn-secondary table-handle" id="table-${this.tableID}-handle">
						<i class="fas fa-grip-horizontal"></i>
					</button>
					<!-- HEADER TITLE -->
					<input type="text" class="form-control input-border-bottom ml-2 table-label" style='border: 0; font-size: 17px;' placeholder="table-${this.tableID}" value="${this.headerTitle}"> 
					<!-- REMOVE ROW BUTTON -->
					<button class="btn btn-danger btn-round ml-auto mr-2" id='table-${this.tableID}-removetable'>
						<i class="fa fa-trash-alt"></i>
						Remove
					</button>
					<!-- ADD ROW BUTTON -->
					<button class="btn btn-primary btn-round ml-auto mr-2" id='table-${this.tableID}-addrow'>
						<i class="fa fa-plus"></i>
						Add Row
					</button>
				</div>
			</div>
			<div class="card-body">

				<!-- TABLE CONTENT -->
				<div class="table-responsive" style="overflow: visible">
					<table id="add-row" class="display table" >
						<!-- TABLE HEADER -->
						<thead>
							<tr>
								<th>Label</th>
								<th>Status</th>
								<th>Timeline</th>
								<th>Owner</th>
								<th>Last Updated</th>
								<th style="width: 10%; text-align:center" colspan=2>Action</th>
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
		this.tableCard.insertAdjacentHTML('beforeend', this.content);

		// select the created table body container after appending to target container
		this.tableRow = document.querySelector(`tbody#table-${this.tableID}`);

		// make sortable the rows
		this.rowSortable = new Sortable(this.tableRow, { // SORTABLE JS LIBRARY 
			selectedClass: 'row-selected', // color of multidrag
			handle: '.row-handle', //  a component to drag on
			forceFallback: false, // hides ghost, different mouse cursor
			group: 'shared-row', // make rows movable to different tables
			multiDrag: true, // enable selection of multiple rows
			animation: 200, // animation speed
		});

		// make sortable the tablecard parent
		this.cardSortable = new Sortable(this.tableCardRoot, { // SORTABLE JS LIBRARY 
			selectedClass: 'table-selected',
			handle: '.table-handle', //  a component to drag on
			forceFallback: false,
			multiDrag: true,
			swapThreshold: 0.95,
   			invertSwap: true,
			animation: 400,
		});

		// locks row handle when select-sorting   
		const classWatcher = new ClassWatcher(
			this.tableCard, 
			'table-selected', 
			() => document.querySelectorAll('button.row-listener').forEach(handle => handle.classList.remove('row-handle')), 
			() => document.querySelectorAll('button.row-listener').forEach(handle => handle.classList.add('row-handle')));

		// addrow click listener
		const addRowButton = document.querySelector(`button#table-${this.tableID}-addrow`);
		addRowButton.addEventListener('click', () => {
			this.addRow('Something', 'Soon');
			console.log(`-- created new row --`);
			
			// notification
			$.notify({
				// options
				icon: 'fa fa-plus',
				title: 'Added Row',
				message: ''
			},{
				// settings
				element: 'body',
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
				animate: {
					enter: 'animated fadeInDown',
					exit: 'animated fadeOutUp'
				},
				icon_type: 'class',
				template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
					'<span data-notify="icon"></span> ' +
					'<span data-notify="title">{1}</span> ' +
				'</div>' 
			});

		});

		// remove table click listener
		const removeTableButton = document.querySelector(`button#table-${this.tableID}-removetable`);
		removeTableButton.addEventListener('click', () => {
			console.log(`-- removed deleted table --`);



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
					this.tableCard.remove(); // deletes the row based on ID
					// notification
					$.notify({
						// options
						icon: 'fa fa-trash-alt',
						title: 'Deleted Table',
						message: ''
					},{
						// settings
						element: 'body',
						type: "default",
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
						animate: {
							enter: 'animated fadeInDown',
							exit: 'animated fadeOutUp'
						},
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
						timer: 650
					});
				} else {
					swal.close();
				}
			});
		});
	}

	// add a row method
	addRow(label, status) {
		this.rowCount++; console.log('num of rows', this.rowCount);
		var itemCount = 0; // set number of dropdown item 
		// returns a html content NOT an object
		// the first three parameters creates a unique ID 
		let statusBtn = new StatusButton(this.tableID,this.rowCount, itemCount++, status,'drop').select();
		let soonBtn = new StatusButton(this.tableID,this.rowCount, itemCount++, 'Soon','item').select();
		let stuckBtn = new StatusButton(this.tableID,this.rowCount, itemCount++, 'Stuck','item').select();
		let developBtn = new StatusButton(this.tableID,this.rowCount, itemCount++, 'Develop','item').select();
		let completeBtn = new StatusButton(this.tableID,this.rowCount, itemCount++, 'Complete','item').select();

		const tableRowID = `table${this.tableID}-row-${this.rowCount}`;
		const rowLabelID = `table-${this.tableID}-row-${this.rowCount}-label`;
		const rowEditID  = `table-${this.tableID}-row-${this.rowCount}-edit`;

		const rowContent = `
		<tr draggable="true" id="${tableRowID}">
			<!-- LABEL -->
			<td>
				<div class="form-group">
					<input type="text" class="form-control input-border-bottom row-label" id="${rowLabelID}" style='border: 0; color: #828282;' placeholder="row-${this.rowCount}" value="${label}">
				</div>
			</td>
			<!-- STATUS -->
			<td>
				<div class="btn-group bg-dark2">
					<!-- OUTPUT STATUS BUTTON -->
					${statusBtn}

					<!-- DROPDOWN BUTTONS-->
					<div class="dropdown-status dropdown-menu bg-dark p-2">
						${soonBtn}
						${stuckBtn}
						${developBtn}
						${completeBtn}
					</div>
				</div>
			</td>
			<!-- TIMELINE -->
			<td>
				<div>
					<div id="datepicker" class="btn btn-secondary btn-border btn-round datetimepicker-input" style="min-width:140px"> &nbsp;
						<i class="fa fa-calendar">
							<span id="date"></span>
							<i class="fa fa-caret-down"></i>
						</i>
					</div>
				</div>


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
						<i class="fas fa-times text-danger"></i>
					</button>
					<button type="button" class="btn btn-link btn-secondary row-handle row-listener">
						<i class="fas fa-ellipsis-h"></i>
					</button>
				</div>
			</td>
		</tr>`;

		// insert the row to table body
		this.tableRow.insertAdjacentHTML('beforeend', rowContent);

		// delete row button listener
		const deleteRowButton = document.querySelector(`button#${rowEditID}`); 
		deleteRowButton.addEventListener('click', () => {
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
						animate: {
							enter: 'animated fadeInDown',
							exit: 'animated fadeOutUp'
						},
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
						timer: 650
					});
				} else {
					swal.close();
				}
			});
		});

		// status change listener
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

// create a table template
let mytable = new Table('FEATURES');
mytable.addRow('sdfasdfsadf', 'Complete');

// create table button functionality
const createTableID = 'table-create';
const createTableButton = document.querySelector(`button#${createTableID}`);
createTableButton.addEventListener('click', () => {
	const table = new Table('');
	
	// notification
	$.notify({
		// options
		icon: 'fa fa-table',
		title: 'Created Table',
		message: ''
	},{
		// settings
		element: 'body',
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
		animate: {
			enter: 'animated fadeInDown',
			exit: 'animated fadeOutUp'
		},
		icon_type: 'class',
		template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
			'<span data-notify="icon"></span> ' +
			'<span data-notify="title">{1}</span> ' +
		'</div>' 
	});

});

// prevent all dropdowns from closing when clicking inside
// $(document).on('click', 'div.dropdown-menu', function (e) { e.stopPropagation(); });

// timeline date-range-picker functionality
$('#datepicker').daterangepicker({
	autoApply: false,
}, function(start, end) {
	$('#date').html(start.format('MMM DD')+' - '+end.format('MMM DD'));
	var start_date = start.toISOString();
	var end_date = end.toISOString();
});