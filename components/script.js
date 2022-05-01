// PREEFINED USERS ... TO CONFIG IN PHP
const USERS = [
	{
		image: "assets/img/profile2.jpg",
		email: "caindayjoeninyo@gmail.com"
	},
	{
		image: "assets/img/mlane.jpg",
		email: "micahellareal@gmail.com"
	},
	{
		image: "assets/img/jm_denis.jpg",
		email: "ljisaac@gmail.com"
	},
	{
		image: "assets/img/talha.jpg",
		email: "kenrian.boleche@gmail.com"
	}
];

// CLASS CHANGE EVENT LISTENER
class ClassWatcher {
	// new ClassWatcher(targetNode, 'trigger', workOnClassAdd, workOnClassRemoval);
    constructor(targetNode, classToWatch, classAddedCallback, classRemovedCallback) {
        this.targetNode			  = targetNode;
        this.classToWatch 		  = classToWatch;
        this.classAddedCallback   = classAddedCallback;
        this.classRemovedCallback = classRemovedCallback;
        this.observer 			  = null;
        this.lastClassState 	  = targetNode.classList.contains(this.classToWatch);

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

// INPUT COMPONENT
class LabelInput {
	constructor(componentID, parentID, label) {
		this.componentID = componentID;
		this.parentID    = parentID;
		this.label       = label;

		this.input = document.createElement('input');
		this.input.setAttribute('type', 'text');
		this.input.setAttribute('id', this.componentID);
		this.input.setAttribute('class', 'form-control input-border-bottom row-label');
		this.input.setAttribute('style', 'border: 0; color: #828282;');
		this.input.setAttribute('placeholder', `${this.componentID}`);
		this.input.setAttribute('value', `${this.label}`);

		document.getElementById(this.parentID).appendChild(this.input);

		// add onclick event
		this.input.addEventListener('change', (e) => {
			const value = e.target.value.trim()
			this.label = value;
			// notification
			$.notify({
				// options
				icon: 'fa fa-pencil-alt',
				title: 'Label Renamed',
				message: this.label
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
					'<span data-notify="message">{2}</span> ' +
				'</div>' 
			});
		});
	}
}

// STATUS COMPONENT
class StatusButton {
	constructor(componentID, parentID, menuID, status) {
		this.componentID = componentID;
		this.parentID    = parentID;
		this.menuID      = menuID;
		this.status      = status;
		this.color; 
		this.icon;

		this.buttonItem = [];

		// change text, icon, color
		const states = {
			Soon: ['btn-secondary', 'icon-direction'],
			Stuck: ['btn-danger', 'icon-information'],
			Develop: ['btn-warning', 'icon-puzzle'],
			Complete: ['btn-success', 'icon-check'],
		};

		this.color = states[this.status][0];
		this.icon = states[this.status][1];
		
		// create button object
		this.buttonDrop = document.createElement('button');
		this.buttonDrop.setAttribute('id', `${this.componentID}`);
		this.buttonDrop.setAttribute('class', `btn dropdown-toggle ${this.color}`);
		this.buttonDrop.setAttribute('style', 'color: white');
		this.buttonDrop.setAttribute('data-toggle', 'dropdown');
		this.buttonDrop.setAttribute('aria-haspopup', 'true');
		this.buttonDrop.setAttribute('aria-expanded', 'false');

		// set icon and text
		this.buttonDrop.insertAdjacentHTML('beforeend',
			`<span class="btn-label"><i class="fa ${this.icon}"></i></span> ${this.status}`);

		// set parent
		document.getElementById(this.parentID).appendChild(this.buttonDrop);
		 
		 // add dropdown items 
		let count = 0;
		 for(let key in states) {
			const color = states[key][0];
			const icon = states[key][1];

			// create button object
			this.buttonItem[count] = document.createElement('button');
			this.buttonItem[count].setAttribute('id', `${this.menuID}-item-${count}`);
			this.buttonItem[count].setAttribute('class', `btn dropdown-item ${color}`);
			this.buttonItem[count].setAttribute('style', 'color: white');
		
			// set icon and text
			this.buttonItem[count].insertAdjacentHTML('beforeend',
				`<span class="btn-label"><i class="fa ${icon}"></i></span> ${key}`);

			// add the item 
			document.getElementById(this.menuID).appendChild(this.buttonItem[count]);

			// add onclick event
			$(this.buttonItem[count]).click((e)=> {
				// change text, icon, color when dropdown item is clicked
				const st = e.currentTarget.outerText.trim(); 
				const cc = states[st][0];
				const ii = states[st][1];

				this.status = st;
				this.buttonDrop.innerHTML = "";
				this.buttonDrop.setAttribute('class', `btn dropdown-toggle ${cc}`)
				this.buttonDrop.insertAdjacentHTML('beforeend',
					`<span class="btn-label"><i class="fa ${ii}"></i></span> ${st}`);

				// notification
				$.notify({
					// options
					icon: `${ii}`,
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
			count++;
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
		this.extract     = []; // array of all email selected
		this.option      = []; // list of menu options
		this.diff; // added or removed value
		this.added; // is added or removed?

		// insert the select element to the parent
		this.select = document.createElement('select');
		this.select.setAttribute('class', 'selectpicker w-auto avatar show-menu-arrow hidden-caret');
		this.select.setAttribute('id', this.componentID);
		this.select.setAttribute('name', 'selValue');
		this.select.setAttribute('data-size', '5');
		this.select.setAttribute('data-live-search', 'true');
		this.select.setAttribute('data-selected-text-format', 'static');
		this.select.setAttribute('multiple', 'true');

		document.getElementById(this.parentID).appendChild(this.select);

		// set selectpicker library 
		$(this.select).selectpicker({
			style: "btn btn-secondary btn-border btn-round owner-select",
			dropupAuto: false,
		});

		// append users to the menu
		let count = 0;
		for (let info of USERS) { // global list of all users

			// menu container
			this.avatar = document.createElement('div');
			this.avatar.setAttribute('class', 'avatar avatar-xs');
			// menu avatar and image
			this.avatar.innerHTML = `<img src="${info['image']}" class="avatar-img rounded-circle"> &nbsp; ${info['email']}`

			// menu option
			this.option[count] = document.createElement('option');
			this.option[count].setAttribute('class', 'ownerEmail');
			this.option[count].setAttribute('data-content', this.avatar.outerHTML);
			this.option[count].setAttribute('value', `${info['email']} ${info['image']}`);

			$(this.select).append(this.option[count]).selectpicker('refresh');
			count++;
		}

		// add static icon to owner button 
		document.querySelectorAll(OWNERBUTTON).forEach((e) => {
			e.innerHTML = `<i class='fa fa-plus'><i>`;
		});

		// selection change listener
		$(this.select).change((e) => { 
			// refers to the event rather than the object
			const data = $(e.target).val();	// email and image value of selected options

			// remove existing avatar children
			const menuChildID = `div.avatar-group#${this.parentID}`; 
			$(menuChildID) 			 // Generated by daterangepicker library
				.children() 		 // Select all the children of the parent
				.not(':first-child') // Unselect the first child
				.remove();           // Remove

			// replace old with new selections
			this.extract = [];
			for (let details of data) {				
				// seperates email and img option-value
				details = details.split(" ");

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

			// notification variables
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
	};
}

// DATEPICKER COMPONENT
class DatePicker {
	constructor(datePickerID, datePickedID) {
		// add daterange picker component 
		$(`#${datePickerID}`).daterangepicker({
			"autoApply": true,
			"drops": "auto",
			"autoUpdateInput": false,
			"linkedCalendars": true,
			"alwaysShowCalendars": false,
			"opens": "center",
		}, function(start, end, label) {
			// only show end milestone if both (start & end) date is the same
			if (start.format('MMM DD') == end.format('MMM DD')) {
				$(this.datePickedID).html(start.format('MMM DD'));
				// notification
				$.notify({
					// options
					icon: 'fa fa-calendar-check',
					title: 'Marked Milestone',
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
			} else {
				$(`#${datePickedID}`).html(start.format('MMM DD')+' - '+end.format('MMM DD'));
				// notification
				$.notify({
					// options
					icon: 'fa fa-calendar-plus',
					title: 'Timeline Updated',
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
			}
			
			let start_date = start.toISOString();
			let end_date = end.toISOString();

		});

		this.datePickerID = datePickerID;
		this.datePickedID = datePickedID;
	}
}

// REMOVE ROW COMPONENT
class RemoveRow {
	constructor(componentID, parentID) {
		this.componentID = componentID;
		this.parentID    = parentID;

		this.remove = document.createElement('button');
		this.remove.setAttribute('id', this.componentID);
		this.remove.setAttribute('data-toggle', 'tooltip');
		this.remove.setAttribute('class', 'btn btn-link btn-primary btn-lg');

		// set button icon
		this.remove.insertAdjacentHTML('beforeend','<i class="fas fa-times text-danger"></i>');

		// set parent 
		document.getElementById(this.parentID)
			.insertBefore( // before sort handle
				this.remove, document.getElementById(this.parentID).firstChild); 

		// add onclick event
		this.remove.addEventListener('click', () => {
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
					// deletes entire row (button -> div) -> td -> tr
					document.getElementById(this.parentID).parentElement.parentElement.remove(); 
				
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
				} 
				else {
					swal.close();
				}
			});
		});

	}
}

// ROW COMPONENT
class Row {
	constructor(componentID, parentID, label, status, timeline, owner) {
		this.componentID = componentID;
		this.parentID 	 = parentID;
		this.label 		 = label;
		this.status 	 = status;
		this.timeline 	 = timeline, 
		this.owner 		 = owner;

		const labelID       = `${this.componentID}-label`;
		const labelContID   = `${this.componentID}-labelCont`;
	
		const statusID      = `${this.componentID}-status`;
		const statusContID  = `${this.componentID}-statusCont`;
		const statusMenuID  = `${this.componentID}-statusMenu`;
	
		const datePickerID  = `${this.componentID}-datePicker`;
		const datePickedID  = `${this.componentID}-datePicked`;
	
		const ownerGroupID  = `${this.componentID}-avatarGroup`
		const ownerSelectID = `${this.componentID}-owner`;
	
		const removeID      = `${this.componentID}-remove`;
		const actionContID  = `${this.componentID}-actionCont`;

		const rowContent = `
		<tr draggable="true" id="${this.componentID}">
			<!-- LABEL -->
			<td>
				<div class="form-group" id='${labelContID}'>
					<!-- LABEL INPUT -->
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
				<div id="${datePickerID}" class="btn btn-secondary btn-border btn-round datetimepicker-input" style="min-width:120px"> 
				&nbsp;
					<i class="fa fa-calendar">
						<span id="${datePickedID}"></span>
						<i class="fa fa-caret-down"></i>
					</i>
				</div>
			</td>
			<!-- OWNER -->
			<td>
				<div class="avatar-group" id="${ownerGroupID}">
					<!-- OWNER AVATAR APPEND -->
				</div>
			</td>
			<!-- LAST UPDATED -->
			<td>13 minutes ago</td>
			<!-- REMOVE | SORTABLE -->
			<td>
				<div class="form-button-action" id="${actionContID}">
					<!-- REMOVE ROW -->
					
					<button class="btn btn-link btn-secondary row-handle row-listener">
						<i class="fas fa-ellipsis-h"></i>
					</button>
				</div>
			</td>
		</tr>`;

		// insert empty row to table
		document.getElementById(this.parentID)
			.insertAdjacentHTML('beforeend', rowContent);

		// -- row components --
		new LabelInput(
			labelID, 		// label input
			labelContID, 	// label container
			this.label);	// label text
		
		new StatusButton(
			statusID,		// status button 
			statusContID,	// status container 
			statusMenuID, 	// status menu
			this.status);	// status text
		
		new DatePicker(
			datePickerID, 	// datepicker button
			datePickedID);	// datepicker text

		new OwnerGroup(
			ownerSelectID,	// owner button 
			ownerGroupID); 	// owner container

		new RemoveRow(
			this.removeID,	// remove button 
			actionContID);	// remove container
		
		// make all dropdowns visible overflow off its container		
		document.querySelectorAll('button.dropdown-toggle')
			.forEach( 
				(e) => {
					e.setAttribute('data-boundary', 'window');
					e.setAttribute('data-container', '.page-content');
				}
			);
	}
}

// TABLE COMPONENT
var tableCardCount = 0; // static to count the number of tables created
class TableCard {
	constructor(cardLabel) {
		
		this.componentID = `tablecard-${tableCardCount}`;
		this.parentID 	 = "index-content";
		this.cardLabel   = cardLabel; // set table header
		this.rowCount    = 0; // set number of rows
 
		this.headerID    = `${this.componentID}-header`; // head 
		this.labelID 	 = `${this.componentID}-label`;  // input  
		this.removeID    = `${this.componentID}-remove`; // button
		this.addRowID    = `${this.componentID}-addrow`; // button
		this.tbodyID  	 = `${this.componentID}-tbody`;  // rows

		// table content
		this.content = `
		<!-- TABLECARD -->
		<div id="${this.componentID}" class="card col-md-12">
			<div class="table-striped" draggable="true">
				<!-- TABLECARD HEADER -->
				<div class="card-header" id="${this.headerID}">
					<div class="d-flex align-items-center">
						
						<!-- SORT HANDLER -->
						<button 
							type="button" 
							data-toggle="tooltip" 
							class="btn btn-link btn-secondary table-handle">

							<i class="fas fa-grip-horizontal"></i>
						</button>


						<!-- HEADER TITLE -->
						<input 
							type="text" 
							class="form-control input-border-bottom ml-2 table-label" 
							style='border: 0; font-size: 17px;' 
							placeholder="${this.labelID}" 
							id='${this.labelID}' 
							value="${this.cardLabel}"
						/> 

						
						<!-- REMOVE TABLE -->
						<button 
							class="btn btn-danger btn-round ml-auto mr-2" 
							id='${this.removeID}'>
							<i class="fa fa-trash-alt"></i>
							Remove
						</button>


						<!-- ADD ROW -->
						<button 
							class="btn btn-primary btn-round ml-auto mr-2" 
							id='${this.addRowID}'>
							<i class="fa fa-plus"></i>
							Add Row
						</button>

					</div>
				</div>


				<!-- TABLECARD BODY -->
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
							<tbody class="sort-wrapper" id="${this.tbodyID}">
								<!-- TABLE ROWS -->
								<!-- ADD TABLE ROWS>	
							<!-- END TABLE BODY -->
							</tbody>
						</table>
					</div>
				</div>

			</div>
		</div>`;
		
		// insert content to parent  
		document.getElementById(this.parentID)
			.insertAdjacentHTML('beforeend', this.content);

		// sortable rows
		new Sortable(
			document.getElementById(this.tbodyID), 
			{ 
				selectedClass: 'row-selected', // color of multidrag
				handle: '.row-handle', //  a component to drag on
				forceFallback: false, // hides ghost, different mouse cursor
				group: 'shared-row', // make rows movable to different tables
				multiDrag: true, // enable selection of multiple rows
				animation: 200, // animation speed
			}
		);

		// sortable table
		new Sortable(
			document.getElementById(this.parentID), 
			{
				selectedClass: 'table-selected',
				handle: '.table-handle', //  a component to drag on
				forceFallback: false,
				multiDrag: true,
				swapThreshold: 0.95,
				invertSwap: true,
				animation: 400,
			}
		);

		// locks row handle when select-sorting table
		new ClassWatcher(
			document.getElementById(this.componentID), 'table-selected', 
			() => document.querySelectorAll('button.row-listener')
				.forEach(handle => handle.classList.remove('row-handle')), 
			() => document.querySelectorAll('button.row-listener')
				.forEach(handle => handle.classList.add('row-handle'))
		);

		// table-label change notification
		document.getElementById(this.labelID)
			.addEventListener('change', () => 
			{
				this.cardLabel = document.getElementById(this.labelID).value;
				// notification
				$.notify({
					// options
					icon: 'fa fa-pencil-alt',
					title: 'Table Renamed',
					message: this.cardLabel
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
						'<span data-notify="message">{2}</span> ' +
					'</div>' 
			});
		});

		// add-row button listener
		document.getElementById(this.addRowID)
			.addEventListener('click', () => {
				this.addRow('', 'Soon');
				
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

		// del-table button listener
		document.getElementById(this.removeID)
			.addEventListener('click', () => {
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
						$(`#${this.componentID}`).remove(); // delete table
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

		// increment static table count
		tableCardCount++;
	}

	// add a row method
	addRow(label, status) {
		this.rowCount++; 

		const rowID = `${this.tbodyID}-${this.rowCount}`;  
		new Row(rowID, this.tbodyID, label, status);
	}
}

// create a table template
let mytable = new TableCard('Grocery List');
// mytable.addRow('sdfasdfsadf', 'Complete', 'Apr 07 - May 02', ['caindayjoeninyo@gmail.com', 'micahellareal@gmail.com']);

mytable.addRow('Buy some eggs', 'Complete');


// create table button functionality
const createTableID = 'table-create';
document.getElementById(createTableID)
	.addEventListener('click', () => 
	{
		const table = new TableCard('');
		
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
	}
);