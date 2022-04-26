// PREEFINED USERS ... TO CONFIG IN PHP
// all owner information content
const USERS = [
	{
		image: "assets/img/jm_denis.jpg",
		email: "caindayjoeninyo@gmail.com"
	},
	{
		image: "assets/img/jm_denis.jpg",
		email: "micahellareal@gmail.com"
	},
	{
		image: "assets/img/jm_denis.jpg",
		email: "ljisaac@gmail.com"
	},
	{
		image: "assets/img/jm_denis.jpg",
		email: "kenrian.boleche@gmail.com"
	}
];


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
	constructor(componentID, parentID, menuID, status) {
		this.componentID = componentID;
		this.parentID = parentID;
		this.menuID = menuID;
		this.status = status;
		this.color; 
		this.icon;

		// change the text, icon, color
		switch(this.status) {
			case 'Complete':
				this.color = 'btn-success';
				this.icon = 'icon-check';
				break;
			case 'Develop':
				this.color = 'btn-warning';
				this.icon = 'icon-information';
				break;
			case 'Stuck':
				this.color = 'btn-danger';
				this.icon = 'icon-close';
				break;
			default:
				this.color = 'btn-secondary';
				this.icon = 'icon-direction';
		}

		// add status button to row
		document.getElementById(this.parentID).insertAdjacentHTML('beforeend',
		`<button 
			class="btn dropdown-toggle ${this.color}" 
			style="color: white;" 
			data-toggle="dropdown" 
			aria-haspopup="true" 
			aria-expanded="false" 
			id="${this.componentID}">

			<span class="btn-label">
				<i class="fa ${this.icon}"></i></span>
			${this.status}
		 </button>`);
		 
		 // add status button dropdown menu
		 const states = ['Soon','Stuck','Develop','Complete'];
		 for (let i=0; i < states.length; i++) {
			let color, icon;
			switch(states[i]) {
				case 'Complete':
					color = 'btn-success';
					icon = 'icon-check';
					break;
				case 'Develop':
					color = 'btn-warning';
					icon = 'icon-information';
					break;
				case 'Stuck':
					color = 'btn-danger';
					icon = 'icon-close';
					break;
				default:
					color = 'btn-secondary';
					icon = 'icon-direction';
			}
			document.getElementById(this.menuID).insertAdjacentHTML('beforeend',
			`<button 
				class="btn dropdown-item ${color}" 
				style="color: white;" 
				id="${this.menuID}-item-${i+1}">
				<span class="btn-label">
					<i class="fa ${icon}"></i>
				</span>
				${states[i]}
			 </button>`);
		 }

		 console.log(document.getElementById(`${this.menuID}-item-1`));
		 console.log(document.getElementById(`${this.componentID}`));


		// status change listener
		for (let i = 0; i < states.length; i++) {
			const dropItem = document.getElementById(`${this.menuID}-item-${i+1}`);
			const dropBtn = document.getElementById(`${this.componentID}`);

			// change text, icon, color when dropdown item is clicked
			dropItem.addEventListener('click', ()=> {
				const st = dropItem.textContent.trim(); 

				let cc, ii;
				switch(st) {
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
				dropBtn.insertAdjacentHTML('beforeend',
					`<span class="btn-label"><i class="fa ${ii}"></i></span> ${st}`);

				// notification
				$.notify({
					// options
					icon: 'fa fa-tasks',
					title: `Status Changed to ${st}`,
					message: ''
				},{
					// settings
					element: 'body',
					type: cc.substring(4),
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
		}
	}
}

// OWNER COMPONENT 
class OwnerGroup {
	constructor(componentID, parentID) {
		const OWNERBUTTON = `div.filter-option-inner-inner`;
		this.componentID = componentID;
		this.parentID = parentID;

		this.extractPrev = []; // check select added and removed
		this.extract = []; // array of all email selected
		this.diff; // added or removed value
		this.added; // is added or removed?

		// insert the select element to the parent
		document.getElementById(this.parentID).insertAdjacentHTML('beforeend', 
		`<select 
			class="selectpicker w-auto avatar show-menu-arrow hidden-caret"
			id="${this.componentID}" 
			name="selValue"  
			data-size="5" 
			data-live-search="true"
			data-selected-text-format="static"
			multiple>
			<!-- OWNER MENU APPENED BEFORE -->
		</select>`);

		// configure select button
		$(`select.selectpicker#${this.componentID}`).selectpicker({
			style: "btn btn-secondary btn-border btn-round owner-select",
			dropupAuto: false,
		});

		// append users to the menu
		for (let info of USERS) { // global list of all users
			const selectOption = `
			<option class="ownerEmail" data-content='
				<div class="avatar avatar-xs">
					<img src="${info['image']}" class="avatar-img rounded-circle">
					&nbsp; ${info['email']}
				</div>'>
				value="${info['email']} ${info['image']}"
			</option>
			`;
			$(`select.selectpicker#${this.componentID}`).append(selectOption).selectpicker('refresh');
		}

		// selection change listener
		$(`select.selectpicker#${this.componentID}`).change((e) => { 
			// WARNING 'this' buggy scope!
			// refers to the event rather than the object
			const data = $(e.target).val();	// email and image value of selected options

			// remove existing avatar children
			const menuChildID = `div.avatar-group#${this.parentID}`;
			$(menuChildID) 
				.children() 		 // Select all the children of the parent
				.not(':first-child') // Unselect the first child
				.remove();           // Remove

			// replace old with new selections
			this.extract = [];
			for (let details of data) {				
				// removes value="" string for each data
				details = details.slice(7, -1).split(" "); ;

				// avatar profile html blueprint
				const avatar = `
				<div class="avatar">
					<img src="${details[1]}" class="avatar-img rounded-circle border border-dark">
				</div>`;
				// append the new selection;
				document.getElementById(this.parentID).insertAdjacentHTML('beforeend',avatar);

				this.extract.push(details[0]); // update the selected values
			}

			// get email, check if added or removed
			if (this.extract.length > this.extractPrev.length) {
				// console.log('added: ', this.extract.length, this.extractPrev.length);
				this.diff = $(this.extract).not(this.extractPrev).get();
				// console.log('added: ', this.diff);
				this.extractPrev = this.extract;
				this.added = true;
			}
			else {
				// console.log('removed: ', this.extract.length, this.extractPrev.length);
				this.diff = $(this.extractPrev).not(this.extract).get();
				// console.log('removed: ', this.diff);
				this.extractPrev = this.extract;
				this.added = false;
			}

			const title = (this.added)? 'Owner Added' : 'Owner Removed';
			const icon = (this.added)? 'fas fa-user-plus' : 'fas fa-user-minus';
			const color = (this.added)? 'info' : 'default';

			// notification
			$.notify({
				// options
				"icon": icon,
				"title": title,
				"message": `The user '${this.diff}' has been notified`
			},{
				// settings
				element: 'body',
				type: "info",
				allow_dismiss: true,
				newest_on_top: false,
				showProgressbar: true,
				placement: {
					from: "top",
					align: "right"
				},
				offset: 20,
				spacing: 10,
				z_index: 1031,
				delay: 1200,
				timer: 850,
				animate: {
					enter: 'animated fadeInDown',
					exit: 'animated fadeOutUp'
				},
				type: color,
				icon_type: 'class',
				template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
					'<span data-notify="icon"></span> ' +
					'<span data-notify="title">{1}</span> ' +
					'<span data-notify="message">{2}</span> ' +
					 '<div class="progress" data-notify="progressbar">' +
					'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
					'</div>' +
				'</div>' 
			});

			// refresh static icon to owner button 
			document.querySelectorAll(OWNERBUTTON).forEach((rf) => {
				rf.innerHTML = `<i class='fa fa-plus'><i>`;
			});
		});

		// add static icon to owner button 
		document.querySelectorAll(OWNERBUTTON).forEach((e) => {
			e.innerHTML = `<i class='fa fa-plus'><i>`;
		});
	};
}

// ROW COMPONENT
class Row {
	constructor(componentID, parentID, label, status) {
		this.componentID = componentID;
		this.parentID = parentID;
		this.label = label;
		this.status = status;
		this.datepicked, this.owner;

		const labelID       = `${this.componentID}-label`;
		const statusID      = `${this.componentID}-status`;
		const statusContID  = `${this.componentID}-statusContainer`;
		const statusMenuID  = `${this.componentID}-statusMenu`;
		const datePickerID  = `${this.componentID}-datepicker`;
		const datePickedID  = `${this.componentID}-datepicked`;
		const ownerGroupID  = `${this.componentID}-avatar-group`
		const ownerSelectID = `${this.componentID}-owner`;
		const removeID      = `${this.componentID}-remove`;

		const rowContent = `
		<tr draggable="true" id="${this.componentID}">
			<!-- LABEL -->
			<td>
				<div class="form-group">
					<input 
						type="text" 
						class="form-control input-border-bottom row-label" id="${labelID}" 
						style='border: 0; color: #828282;' 
						placeholder="row-${this.componentID}" 
					value="${label}">
				</div>
			</td>
			<!-- STATUS -->
			<td>
				<div class="btn-group" id="${statusContID}">
					<!-- STATUS BUTTON -->
					<div class="dropdown-status dropdown-menu dropdown" id="${statusMenuID}">
						<!-- DROPDOWN STATUS BUTTONS-->
					</div>
				</div>
			</td>
			<!-- TIMELINE -->
			<td>
				<div id="${datePickerID}" class="btn btn-secondary btn-border btn-round datetimepicker-input" style="min-width:120px"> &nbsp;
					<i class="fa fa-calendar">
						<span id="${datePickedID}"></span>
						<i class="fa fa-caret-down"></i>
					</i>
				</div>
			</td>
			<!-- OWNER -->
			<td>
				<div class="avatar-group" id="${ownerGroupID}">

					<!-- OWNER AVATAR APPEND HERE -->
								

				</div>
			</td>
			<!-- LAST UPDATED -->
			<td>13 minutes ago</td>
			<!-- FORM ACTION AND SORTABLE -->
			<td>
				<div class="form-button-action">
					<button id='${removeID}' data-toggle="tooltip" class="btn btn-link btn-primary btn-lg">
						<i class="fas fa-times text-danger"></i>
					</button>
					<button class="btn btn-link btn-secondary row-handle row-listener">
						<i class="fas fa-ellipsis-h"></i>
					</button>
				</div>
			</td>
		</tr>`;

		// insert the row to table body
		document.getElementById(this.parentID).insertAdjacentHTML('beforeend', rowContent);

		new StatusButton(statusID, statusContID, statusMenuID, status);

		// create an id for row ownergroup
		new OwnerGroup(ownerSelectID, ownerGroupID); 

		// // delete row button listener
		// const deleteRowButton = document.querySelector(`button#${rowEditID}`); 
		// deleteRowButton.addEventListener('click', () => {
		// 	// MODAL CONFIRMATION
		// 	swal({
		// 		title: 'Are you sure?',
		// 		text: "You won't be able to revert this!",
		// 		icon: 'warning',
		// 		buttons:{
		// 			cancel: {
		// 				visible: true,
		// 				className: 'btn btn-danger'
		// 			},
		// 			confirm: {
		// 				text : 'Yes, delete it!',
		// 				className : 'btn btn-success',
		// 			}
		// 		}
		// 	}).then((Delete) => {
		// 		if (Delete) {
		// 			document.querySelector(`tr#${tableRowID}`).remove(); // deletes the row based on ID
		// 			// notification
		// 			$.notify({
		// 				// options
		// 				icon: 'flaticon-exclamation',
		// 				title: 'Removed Row',
		// 				message: ''
		// 			},{
		// 				// settings
		// 				element: 'body',
		// 				type: "warning",
		// 				allow_dismiss: true,
		// 				newest_on_top: false,
		// 				showProgressbar: false,
		// 				placement: {
		// 					from: "top",
		// 					align: "right"
		// 				},
		// 				offset: 20,
		// 				spacing: 10,
		// 				z_index: 1031,
		// 				delay: 700,
		// 				timer: 850,
		// 				animate: {
		// 					enter: 'animated fadeInDown',
		// 					exit: 'animated fadeOutUp'
		// 				},
		// 				icon_type: 'class',
		// 				template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
		// 					'<span data-notify="icon"></span> ' +
		// 					'<span data-notify="title">{1}</span> ' +
		// 				'</div>' 
		// 			});
		// 			swal({
		// 				title: 'Removed!',
		// 				text: '',
		// 				icon: 'success',
		// 				timer: 650
		// 			});
		// 		} else {
		// 			swal.close();
		// 		}
		// 	});
		// });

		// // add notification on row-label change
		// document.querySelector(`input#${rowLabelID}`).addEventListener('change', () => {

		// 	let row = [this.label, this.status, $(`#${datePickerID}`).textContent];
		// 	console.log(row);
		// 	// notification
		// 	$.notify({
		// 		// options
		// 		icon: 'fa fa-pencil-alt',
		// 		title: 'Renamed Row Label',
		// 		message: ''
		// 	},{
		// 		// settings
		// 		element: 'body',
		// 		type: "info",
		// 		allow_dismiss: true,
		// 		newest_on_top: false,
		// 		showProgressbar: false,
		// 		placement: {
		// 			from: "top",
		// 			align: "right"
		// 		},
		// 		offset: 20,
		// 		spacing: 10,
		// 		z_index: 1031,
		// 		delay: 700,
		// 		timer: 850,
		// 		animate: {
		// 			enter: 'animated fadeInDown',
		// 			exit: 'animated fadeOutUp'
		// 		},
		// 		icon_type: 'class',
		// 		template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
		// 			'<span data-notify="icon"></span> ' +
		// 			'<span data-notify="title">{1}</span> ' +
		// 		'</div>' 
		// 	});
		// });

		// // add daterange picker component to timeline 
		// $(`#${datePickerID}`).daterangepicker({
		// 	"autoApply": true,
		// 	"drops": "auto",
		// 	"autoUpdateInput": false,
		// 	"linkedCalendars": true,
		// 	"alwaysShowCalendars": false,
		// 	"opens": "center",
		// }, function(start, end, label) {
		// 	// only show end milestone if both (start & end) date is the same
		// 	if (start.format('MMM DD') == end.format('MMM DD')) {
		// 		$(`#${datePickedID}`).html(start.format('MMM DD'));
		// 		// notification
		// 		$.notify({
		// 			// options
		// 			icon: 'fa fa-calendar-check',
		// 			title: 'Marked Milestone',
		// 			message: ''
		// 		},{
		// 			// settings
		// 			element: 'body',
		// 			type: "info",
		// 			allow_dismiss: true,
		// 			newest_on_top: false,
		// 			showProgressbar: false,
		// 			placement: {
		// 				from: "top",
		// 				align: "right"
		// 			},
		// 			offset: 20,
		// 			spacing: 10,
		// 			z_index: 1031,
		// 			delay: 700,
		// 			timer: 850,
		// 			animate: {
		// 				enter: 'animated fadeInDown',
		// 				exit: 'animated fadeOutUp'
		// 			},
		// 			icon_type: 'class',
		// 			template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
		// 				'<span data-notify="icon"></span> ' +
		// 				'<span data-notify="title">{1}</span> ' +
		// 			'</div>' 
		// 		});
		// 	} else {
		// 		$(`#${datePickedID}`).html(start.format('MMM DD')+' - '+end.format('MMM DD'));
		// 		// notification
		// 		$.notify({
		// 			// options
		// 			icon: 'fa fa-calendar-plus',
		// 			title: 'Timeline Updated',
		// 			message: ''
		// 		},{
		// 			// settings
		// 			element: 'body',
		// 			type: "info",
		// 			allow_dismiss: true,
		// 			newest_on_top: false,
		// 			showProgressbar: false,
		// 			placement: {
		// 				from: "top",
		// 				align: "right"
		// 			},
		// 			offset: 20,
		// 			spacing: 10,
		// 			z_index: 1031,
		// 			delay: 700,
		// 			timer: 850,
		// 			animate: {
		// 				enter: 'animated fadeInDown',
		// 				exit: 'animated fadeOutUp'
		// 			},
		// 			icon_type: 'class',
		// 			template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
		// 				'<span data-notify="icon"></span> ' +
		// 				'<span data-notify="title">{1}</span> ' +
		// 			'</div>' 
		// 		});
		// 	}
			
		// 	var start_date = start.toISOString();
		// 	var end_date = end.toISOString();

			
		// });	

		// make all dropdowns visible overflow off its container
		
		document.querySelectorAll('button.dropdown-toggle').forEach( (e) => {
			e.setAttribute('data-boundary', 'window');
			e.setAttribute('data-container', '.page-content');
		});
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

		this.label, this.status;

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
					<input type="text" class="form-control input-border-bottom ml-2 table-label" style='border: 0; font-size: 17px;' placeholder="table-${this.tableID}" id='table-${this.tableID}-label' value="${this.headerTitle}"> 
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
				<div class="table-responsive" style="min-height: 100px">
					<table id="add-row" class="display table">
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

		// add notification on table-label change
		document.getElementById(`table-${this.tableID}-label`).addEventListener('change', () => {
			// notification
			$.notify({
				// options
				icon: 'fa fa-pencil-alt',
				title: 'Renamed Table',
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
		this.rowCount++; 
		console.log('num of rows', this.rowCount);

		const componentID = `table-${this.tableID}-row-${this.rowCount}`;
		const parentID = `table-${this.tableID}`;  
		new Row(componentID, parentID, label, status);

	}

	// get a 2D array of all the row information
	getInformation() {
		// label

		// status

		// timeline

		// owner
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
