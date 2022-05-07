var USERS = []; // gets appended once on the first row creation

// static to count the number of tables and rows created
var table = [];
var rowCount = 0;
var tableCount = 0; 

// Remove element at the given index
Array.prototype.remove = function(index) {
	this.splice(index, 1);
}

// Insert element at the given index
Array.prototype.insert = function ( index, item ) {
	this.splice( index, 0, item );
};

// get the index of an object attribute based on given value
function findWithAttr(array, attr, value) {
	for(var i = 0; i < array.length; i += 1) {
		if(array[i][attr] === value) {
			return i;
		}
	}
	return -1;
}

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
	constructor(row, componentID, parentID, label) {
		this.row = row;

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
		this.input.setAttribute('maxlength', 50);

		document.getElementById(this.parentID).appendChild(this.input);

		// add onclick event
		this.input.addEventListener('change', (e) => {
			const value = e.target.value.trim()
			this.label = value;
			
			// update the row timestamp
			this.row.timestamp = parseInt(Date.now()/1000);

			// update the row label
			this.row.label = this.label;
			
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
	constructor(row, componentID, parentID, menuID, status) {
		this.row = row;

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


				// update the row timestamp
				this.row.timestamp = parseInt(Date.now()/1000);
				
				// update the row status
				this.row.status = this.status;


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
	constructor(row, componentID, parentID) {
		this.row = row;
		this.owner = row.owner;
		
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
		this.select.setAttribute('data-max-options', '5'); // set maximum number of owners

		document.getElementById(this.parentID).appendChild(this.select);

		// set selectpicker library 
		$(this.select).selectpicker({
			style: "btn btn-secondary btn-border btn-round owner-select",
			dropupAuto: false,
		});

		// if global users collection is empty
		if (USERS.length <= 0) {
			// GET THE USERS IN DATABASE 

			// WARNING: THIS IS VULNERABLE TO HACKS
			// WARNING: MUST VALIDATE THE LOGIN SESSION ON GET_ACCOUNTS

			// asynchronous request to the server
			let request = new XMLHttpRequest();
			
			// WARNING: MAJOR PIECE OF LAG
			// `false` makes the request synchronous (pause>get>continue)
			request.open('GET', "requests/get_accounts.php", false);  
			request.send(null);

			if (request.status === 200) {// That's HTTP for 'ok'
				USERS = JSON.parse(request.responseText);
				console.log(request.responseText);
			}
		}

		// append users to the menu
		let count = 0;
		for (let info of USERS) { // global list of all users

			// menu container
			this.avatar = document.createElement('div');
			this.avatar.setAttribute('class', 'avatar avatar-sm mt-2');

			// menu avatar and image
			const user = info['user'];
			const email = info['email'];
			const profile = (info['profile'] == null)? 
				'assets/img/placeholder.png' : info['profile'];

			this.avatar.innerHTML = `
				<img src="${profile}" class="avatar-img rounded-circle mr-2 float-left" style="margin-top: -4px"> 
				<div class="d-flex flex-column justify-content-center" style="margin-top: -7px">
					<span style='font-size: 14px;'><b>${user}</b></span>
					<span style='font-size: 11px; margin-top: -3px'>${email}</span>	
				</div>`

			// menu option
			this.option[count] = document.createElement('option');
			this.option[count].setAttribute('class', 'ownerEmail');
			this.option[count].setAttribute('data-content', this.avatar.outerHTML);
			this.option[count].setAttribute('value', `${email} ${profile}`);

			$(this.select).append(this.option[count]).selectpicker('refresh');
			count++;
		}

		// initial selected option
		if (this.owner.length > 0) {
			// get email and image value of selected options
			let data = [];
			let selectedOptions = [];
			for (let user of this.owner) {
				for (let info of USERS) { // retrieved from ajax 
					if (user == info.user) {
						data.push([info.email, info.profile]);
						selectedOptions.push(`${info.email} ${info.profile}`);
					}
				}
			}
			console.log('data', selectedOptions);
			$(this.select).selectpicker('val', selectedOptions);

			// replace old with new selections
			this.extract = [];
			for (let details of data) {				
				// avatar profile html blueprint
				const avatar = `
				<div class="avatar">
					<img src="${details[1]}" class="avatar-img rounded-circle border border-dark">
				</div>`;
				// append the new selection;
				document.getElementById(this.parentID).insertAdjacentHTML('beforeend',avatar);

				this.extract.push(details[0]); // update the selected values
			}
		}

		// selection change listener
		$(this.select).change((e) => { 
			// update the row timestamp
			this.row.timestamp = parseInt(Date.now()/1000);

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

		// add static icon to owner button 
		document.querySelectorAll(OWNERBUTTON).forEach((e) => {
			e.innerHTML = `<i class='fa fa-plus'><i>`;
		});		
	};
}

// DATEPICKER COMPONENT
class DatePicker {
	constructor(row, datePickerID, datePickedID, datestart='', dateend='') {
		this.row = row;

		this.datePickerID = datePickerID;
		this.datePickedID = datePickedID;
		this.startDisplay = 
		this.endDisplay   = 
		this.startQuery   = 
		this.endQuery     = '';

		// add daterange picker component 
		$(`#${datePickerID}`).daterangepicker({
			"autoApply": true,
			"drops": "auto",
			"autoUpdateInput": false,
			"linkedCalendars": true,
			"alwaysShowCalendars": false,
			"opens": "center",
		}, (start, end, label) => { // start, end returns a jquery date 
			// update the row timestamp
			this.row.timestamp = parseInt(Date.now()/1000);

			// update the row date start and end
			this.row.datestart = start.format('MMM DD YYYY');
			this.row.dateend = end.format('MMM DD YYYY')

			// format to send in database
			this.row.datestart = start.format('YYYY/MM/DD');
			this.row.dateend = end.format('YYYY/MM/DD');						
			
			// only show end milestone if both (start & end) date is the same
			if (start.format('MMM DD YYYY') == end.format('MMM DD YYYY')) {
				// update the date range label (milestone)
				$(`#${datePickedID}`).html(start.format('MMM DD'));
				// add a value attribute for row id value extraction
				$(`#${datePickedID}`).attr('value', start.format('MMM DD YYYY'));
				
				// notification
				$.notify({
					// options
					icon: 'fa fa-calendar-check',
					title: 'Marked Milestone',
					message: start.format('MMM DD YYYY')
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
			} 
			else {
				// update the date range label (timeline)
				$(`#${datePickedID}`).html(start.format('MMM DD')+' - '+end.format('MMM DD'));
				// add a value attribute for row id value extraction
				$(`#${datePickedID}`).attr('value', `${start.format('MMM DD YYYY')}-${end.format('MMM DD YYYY')}`);
				
				// notification
				$.notify({
					// options
					icon: 'fa fa-calendar-plus',
					title: 'Timeline Updated',
					message: start.format('MMM DD YYYY')+' - '+end.format('MMM DD YYYY')
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
			}
		});

		// if there's parameter on the contructor
		if (datestart!='' && dateend!='') {

			// change range of menu using the object
			$(`#${this.datePickerID}`).data('daterangepicker').setStartDate(new Date(datestart));
			$(`#${this.datePickerID}`).data('daterangepicker').setEndDate(new Date(dateend));

			// database format to send
			this.row.datestart = new Date(datestart).toLocaleDateString();
			this.row.dateend = new Date(dateend).toLocaleDateString();	

			// display label format
			const displayFormat = { month: 'short', day: 'numeric' };
			this.startDisplay = new Date(datestart).toLocaleDateString(undefined, displayFormat);   
			this.endDisplay   = new Date(dateend).toLocaleDateString(undefined, displayFormat);	

			if (this.startDisplay == this.endDisplay) {
				// update the date range label (milestone)
				$(`#${this.datePickedID}`).html(this.startDisplay);
			}
			else {
				// update the date range label (timeline)
				$(`#${this.datePickedID}`).html(`${this.startDisplay} - ${this.endDisplay}`);
			}
			// set the display attributes
			$(`#${this.datePickedID}`).attr('value', `${this.startQuery}-${this.endQuery}`);
		}
	}
}

// REMOVE ROW COMPONENT
class RemoveRow {
	constructor(row, componentID, parentID) {
		this.row 		 = row;
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
					// setup variables first to delete first then update next
					const componentID = this.row.componentID; // save the row id before removing
					const tablename = this.row.table.componentID; // tbody >> table
					const operation = 'rowdrop'; // the operation to be sent to server
			
					// remove this row parent and get new sequence
					const sortedRowObj = this.row.drop();
					const sequence = sortedRowObj.map(row => row.componentID); // array comprehension

					console.log('sequence',sequence);

					// -- UPDATE ROW DELETION ON USER DATABASE

					// // WARNING: THIS IS VULNERABLE TO HACKS
					// // WARNING: MUST VALIDATE THE LOGIN SESSION ON CREATE_TABLE

					// asynchronous request to the server
					let request = new XMLHttpRequest();

					request.open('POST', 'requests/modify_table.php', true);
					request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
					request.send(`table=${tablename}&operation=${operation}&row=${componentID}&sort=${sequence}`);

					if (request.status === 200) {// That's HTTP for 'ok'
						console.log(request.responseText);
					}

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
	constructor(table, componentID, parentID, label, status, datestart, dateend, owner, timestamp) {

		this.table 		 = table; // passed table parent object
		this.componentID = componentID;
		this.parentID 	 = parentID;
		this.label 		 = label;
		this.status 	 = status;
		this.datestart 	 = datestart;
		this.dateend 	 = dateend;
	 	this.owner 		 = owner;
		this.timestamp 	 = timestamp;
		this.interval 	 = '';

		this.labelID       = `${this.componentID}-label`;
		this.labelContID   = `${this.componentID}-labelCont`;
		this.statusID      = `${this.componentID}-status`;
		this.statusContID  = `${this.componentID}-statusCont`;
		this.statusMenuID  = `${this.componentID}-statusMenu`;
		this.datePickerID  = `${this.componentID}-datePicker`;
		this.datePickedID  = `${this.componentID}-datePicked`;
		this.ownerGroupID  = `${this.componentID}-avatarGroup`
		this.ownerSelectID = `${this.componentID}-owner`;
		this.timestampID   = `${this.componentID}-modified`;
		this.removeID      = `${this.componentID}-remove`;
		this.actionContID  = `${this.componentID}-actionCont`;

	}
	create() {
		const rowContent = `
		<tr draggable="true" id="${this.componentID}">
			<!-- LABEL -->
			<td>
				<div class="form-group" id='${this.labelContID}'>
					<!-- LABEL INPUT -->
				</div>
			</td>
			<!-- STATUS -->
			<td>
				<div class="btn-group" id="${this.statusContID}">
					<!-- STATUS BUTTON -->
					<div class="dropdown-status dropdown-menu dropdown" id="${this.statusMenuID}">
						<!-- DROPDOWN STATUS BUTTONS-->
					</div>
				</div>
			</td>
			<!-- TIMELINE -->
			<td>
				<div id="${this.datePickerID}" class="btn btn-secondary btn-border btn-round datetimepicker-input" style="min-width:120px"> 
				&nbsp;
					<i class="fa fa-calendar">
						<span id="${this.datePickedID}" value=''></span>
						<i class="fa fa-caret-down"></i>
					</i>
				</div>
			</td>
			<!-- OWNER -->
			<td>
				<div class="avatar-group" id="${this.ownerGroupID}">
					<!-- OWNER AVATAR -->
				</div>
			</td>
			<!-- LAST UPDATED -->
			<td id="${this.timestampID}" value="">
				<!-- TIMESTAMP -->
			</td>
			<!-- REMOVE | SORTABLE -->
			<td>
				<div class="form-button-action" id="${this.actionContID}">
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

		// add timestamp attribute
		document.getElementById(this.timestampID) // attribute
			.setAttribute('value', this.timestamp);
			

		// -- row components --
		new LabelInput(
			this,		    // pass self (this object)
			this.labelID, 		// label input
			this.labelContID, 	// label container
			this.label);	// label text
		
		new StatusButton(
			this,			// pass self (this object)
			this.statusID,		// status button 
			this.statusContID,	// status container 
			this.statusMenuID, 	// status menu
			this.status);	// status text
		
		new DatePicker(
			this,			// pass self (this object)
			this.datePickerID, 	// datepicker button
			this.datePickedID,	// datepicker text
			this.datestart, // start date
			this.dateend);	// end date

		new OwnerGroup(
			this,			// pass self (this object)
			this.ownerSelectID,	// owner button 
			this.ownerGroupID); 	// owner container

		new RemoveRow(
			this,			// pass self (this object)
			this.removeID,		// remove button 
			this.actionContID);	// remove container
		
		// make all dropdowns visible overflow off its container		
		document.querySelectorAll('button.dropdown-toggle')
			.forEach( 
				(e) => {
					e.setAttribute('data-boundary', 'window');
					e.setAttribute('data-container', '.page-content');
				}
			);	

		// disable dragging ghost
		document.getElementById(this.componentID)
		.addEventListener("dragstart", function(e) {
			var crt = this.cloneNode(true);
			e.dataTransfer.setDragImage(crt, 0, 0);
		}, false);

		this.startInterval();
	}
	setIntervalAndExecute(fn, t) { // create interval thread
		fn();
		return(setInterval(fn, t));
	}
	startInterval() {
		// update 'modified' timestamp interval every 100ms
		this.interval = this.setIntervalAndExecute(() => {	
			try {
				document.getElementById(this.timestampID) // display
				.innerHTML = `${this.timestamp} < ${Date.now()} => ${moment(this.timestamp*1000).fromNow()}`;
			}
			catch (error) {
				console.log('multiple dragging.. pausing grouped timestamps');
			}
		}, 100); // 100ms delay
	}
	stopInterval() { // stops timestamp update
		clearInterval(this.interval);
	}
	drop() { // remove row and stop timestamp update
		clearInterval(this.interval); // stop the timestamp update
		document.getElementById(this.componentID).remove(); // remove the row

		console.log('before',this.table.rows);

		// find the row object
		const index = findWithAttr(this.table.rows, 'componentID', this.componentID);
		this.table.rows.remove(index);

		console.log('after',this.table.rows);
		// return the new sequence
		return this.table.rows;
	}
}

// TABLE COMPONENT
class TableCard {
	constructor(componentID,cardLabel) {

		if (componentID != '') { this.componentID = componentID; }
		else {this.componentID = `table-${tableCount}`}

		this.parentID 	 = "index-content";
		this.cardLabel   = cardLabel; // set table header
 
		this.headerID    = `${this.componentID}-header`; // head 
		this.labelID 	 = `${this.componentID}-label`;  // input  
		this.removeID    = `${this.componentID}-remove`; // button
		this.addRowID    = `${this.componentID}-addrow`; // button
		this.tbodyID  	 = `${this.componentID}-tbody`;  // rows

		this.rows = []; // store all the created rows of this table 

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
							maxlength="20"
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
		const rows_body = document.getElementById(this.tbodyID);
		const tables_body = document.getElementById(this.parentID);

		new Sortable(
			rows_body, 
			{ 
				selectedClass: 'row-selected', // color of multidrag
				handle: '.row-handle', //  a component to drag on
				forceFallback: false, // hides ghost, different mouse cursor
				group: 'shared-row', // make rows movable to different tables
				multiDrag: true, // enable selection of multiple rows
				animation: 200, // animation speed
				onEnd: (/**Event*/evt) => { // update the index of objects based on html arrangement
					console.log('from-->',evt.from.id,'<-to-->', evt.to.id);

					evt.to;    // target list
					evt.from;  // previous list
					evt.oldIndex;  // element's old index within old parent
					evt.newIndex;  // element's new index within new parent
					evt.clone // the clone element
					evt.pullMode;  // when item is in another sortable: `"clone"` if cloning, `true` if moving

					// the table where the row was taken from
					// from -> this
					let from_obj = this.rows;

					// the table where the row is transferred
					let to;
					for (let object of table) {
						if (object.componentID == evt.to.id.slice(0, -6)) {
							to = object;
							break;
						}
					}
					// to -> to.rows
					let to_obj = to.rows;  

					// if the sort is on the same table
					if (evt.from.id == evt.to.id) { // in this case, from_table == to_table						

						let bucket = []; // contain the same this.rows but on updated index

						// sorting algorithm
						for (let htmfr=0; htmfr < evt.from.children.length; htmfr++) { // user sorted
							let index = findWithAttr(from_obj, 'componentID', evt.from.children[htmfr].id);
							if (index >= 0) {
								// append a copy of the object
								bucket.push(from_obj[index]);
							}
						}
						// update index of from table rows
						from_obj = bucket;

						// update this rows 
						this.rows = from_obj;

						let sequence = [];
						// transfer row object id to an array to be sent to ajax
						from_obj.forEach(obj => sequence.push(obj.componentID));

						// WARNING: THIS IS VULNERABLE TO HACKS
						// WARNING: MUST VALIDATE THE LOGIN SESSION ON CREATE_TABLE

						// asynchronous request to the server
						let request = new XMLHttpRequest();

						request.open('POST', 'requests/modify_table.php', true);
						request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
						request.send(`table=${this.componentID}&operation=${'rowsort'}&row=${sequence}`);
					}
					else {

						let bucket = []; // will contain the same this.rows but on updated index

						// sorting algorithm
						for (let htmfr=0; htmfr < evt.from.children.length; htmfr++) { // user sorted
							let index = findWithAttr(from_obj, 'componentID', evt.from.children[htmfr].id);
							if (index >= 0) {
								// append a copy of the object
								bucket.push(from_obj[index]);
								
								// remove the from_table rows that is still there 
								from_obj.remove(index); // which remain rows that was transferred
							}
						}

						// changed from rows collection as the bucket to reset index
						let transferred = from_obj;
						from_obj = bucket;

						// loop current table (html_evt.to)
						for (let htmto=0; htmto < evt.to.children.length; htmto++) {
							let index = findWithAttr(to_obj, 'componentID', evt.to.children[htmto].id);
							if (index < 0) {
								let newrow = transferred.shift();
								to_obj.insert(htmto, newrow);
							}
						}
						this.rows = from_obj;
						to.rows = to_obj;

						// console.log('previous:', this.rows, 'target:', to.rows);


						let frdata = []; 
						let todata = [];
						// transfer row object id to an array to be sent to ajax
						this.rows.forEach(obj => frdata.push(obj.componentID));
						to.rows.forEach(obj => todata.push(obj.componentID));

						// WARNING: THIS IS VULNERABLE TO HACKS
						// WARNING: MUST VALIDATE THE LOGIN SESSION ON CREATE_TABLE

						// asynchronous request to the server
						let request = new XMLHttpRequest();

						request.open('POST', 'requests/modify_table.php', true);
						request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
						request.send(`table=${this.componentID}&target=${to.componentID}&operation=${'rowpass'}&from=${frdata}&to=${todata}`);

						if (request.status === 200) {// That's HTTP for 'ok'
							console.log(request.responseText);
						}

					}
				}
			}
		);

		// sortable table
		new Sortable(
			tables_body, 
			{
				selectedClass: 'table-selected',
				handle: '.table-handle', //  a component to drag on
				forceFallback: false,
				multiDrag: true,
				swapThreshold: 0.95,
				invertSwap: true,
				animation: 400,
				onEnd: (/**Event*/evt) => { // update the index of objects based on html arrangement
					console.log('from-->',evt.from.id,'<-to-->', evt.to.id);

					evt.to;    // target list
					evt.from;  // previous list
					evt.oldIndex;  // element's old index within old parent
					evt.newIndex;  // element's new index within new parent
					evt.clone // the clone element
					evt.pullMode;  // when item is in another sortable: `"clone"` if cloning, `true` if moving

					// if the sort is on the same container
					if (evt.from.id == evt.to.id) { // in this case, div.index-content == div.index-content						

						let bucket = []; // contain the same this.rows but on updated index

						// sorting algorithm
						for (let htmfr=0; htmfr < evt.from.children.length; htmfr++) { // user sorted
							let index = findWithAttr(table, 'componentID', evt.from.children[htmfr].id);
							if (index >= 0) {
								// append a copy of the object
								bucket.push(table[index]);
							}
						}
						// update index of tables 
						table = bucket;
						console.log(table);

						
						let sequence = [];
						// transfer table id to an array to be sent to ajax
						table.forEach(obj => sequence.push(obj.componentID));

						// WARNING: THIS IS VULNERABLE TO HACKS
						// WARNING: MUST VALIDATE THE LOGIN SESSION ON CREATE_TABLE

						// asynchronous request to the server
						let request = new XMLHttpRequest();
						
						// associate object sort to database
						let operation = 'sort';
						request.open('POST', 'requests/modify_table.php', true);
						request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
						request.send(`table=${sequence}&operation=${operation}`);

						if (request.status === 200) {// That's HTTP for 'ok'
							console.log(request.responseText);
						}
					}
				}
			}
		);

		// disable table dragging ghost
		document.getElementById(this.componentID)
		.addEventListener("dragstart", function(e) {
			var crt = this.cloneNode(true);
			e.dataTransfer.setDragImage(crt, 0, 0);
		}, false);

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
				this.addRow('','', 'Soon', '', '', '', parseInt(Date.now()/1000));
				
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

		// del-table button listener (INSTEAD OF REMOVING THE TABLE, CHECK THE ROW CONTENT)
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

						// WARNING: THIS IS VULNERABLE TO HACKS
						// WARNING: MUST VALIDATE THE LOGIN SESSION ON CREATE_TABLE

						// asynchronous request to the server
						let request = new XMLHttpRequest();

						request.open('POST', 'requests/modify_table.php', true);
						request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
						request.send(`table=${this.componentID}&operation=${'drop'}`);

						if (request.status === 200) {// That's HTTP for 'ok'
							console.log(request.responseText);
						}

						// remove its rows and stop timestamp interval
						this.rows.forEach(row => row.stopInterval());
						this.rows = [];

						// remove the table html element
						document.getElementById(this.componentID).remove();

						// remove this table object from static collection
						let sort = findWithAttr(table, 'componentID', this.componentID);
						table.remove(sort);

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
		tableCount++;
	}

	// add a row method
	addRow(name, label, status, datestart, dateend, owner, timestamp) {

		if (name=='') {name=`row-${rowCount}`}

						// table, componentID, parentID, label, status, datestart, dateend, owner, timestamp
		const row = new Row(this, name, this.tbodyID, label, status, datestart, dateend, owner, timestamp);
		row.create();

		// WARNING: THIS IS VULNERABLE TO HACKS
		// WARNING: MUST VALIDATE THE LOGIN SESSION ON CREATE_TABLE

		// asynchronous request to the server
		let request = new XMLHttpRequest();

		// pass data to user database using ajax
		const data = [
			this.rowCount, name, label, status, datestart, dateend, JSON.stringify(owner), timestamp];
			
		request.open('POST', 'requests/modify_table.php', true);
		request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		request.send(`table=${this.componentID}&operation=${'addrow'}&row=${data}`);

		if (request.status === 200) {// That's HTTP for 'ok'
			console.log(request.responseText);
		}

		this.rows.push(row);
		rowCount++;
	}
}

// create table button functionality
document.getElementById('table-create')
	.addEventListener('click', () => 
	{

		// check if table is empty
		if (table.length <= 0) {
			// reset the table and row counter
			tableCount = 0;
			rowCount = 0;
		}

		// variables to send in server
		let componentID = `table-${tableCount}`;
		let operation 	= 'create';
		let append 		= tableCount; 

		// create html table
		table.push(new TableCard('',''));

		// WARNING: THIS IS VULNERABLE TO HACKS
		// WARNING: MUST VALIDATE THE LOGIN SESSION ON CREATE_TABLE

		// asynchronous request to the server
		let request = new XMLHttpRequest();

		request.open('POST', 'requests/modify_table.php', true);
		request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		request.send(`table=${componentID}&operation=${operation}&sort=${append}`);

		if (request.status === 200) {// That's HTTP for 'ok'
			console.log(request.responseText);
		}

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

// -- CREATE THE TABLES FROM PERSISTENCE

// -- connect and select the database -- 

// sorts strings and objects
let collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});

// asynchronous request to the server
var request = new XMLHttpRequest();

request.open('POST', 'requests/get_userdata.php', false);
request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
request.send(`type=${'table'}`);

// -- get the table infomation and put sorted names to an array --

var tables = []; 
if (request.status === 200) {// That's HTTP for 'ok'	
	
	// check if user table data is empty	
	const tableData = request.responseText;

	console.log(tableData);
	// check if there are tables from the user database
	if (tableData !== '[]') { 
		// parse the string array into json
		information = JSON.parse(tableData);

		let sequence = [];
		information.map(info => sequence.push([info['name'],info['label']]));
		
		// -- for each name on array select table 
		// create table
		sequence.forEach(sort => table.push(new TableCard(sort[0], sort[1])));
		console.log(table);

		// update last index of table name ex.(table-) >> (12)+1
		tableCount = 1+parseInt(sequence.sort(collator.compare).slice(-1)[0][0].slice(6));


		// -- INSERT TABLE ASSOCIATED ROWS --

		// sequence of rows
		let rowseq = [];

		table.forEach(obj => {
			const tableName = obj.componentID;

			request.open('POST', 'requests/get_userdata.php', false);
			request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			request.send(`type=${'row'}&table=${tableName}`);

			// -- get the table infomation and put sorted names to an array --
	
			if (request.status === 200) {// That's HTTP for 'ok'	
				// return an associative array of the rows
				const rowdata = JSON.parse(request.responseText);

				for (data of rowdata) {

					console.log(data);
					const name 		= data['name']; // componentid
					const label 	= data['label'];
					const status 	= data['status'];
					const owner 	= data['owner'];
					const timestamp = data['modified'];

					// return empty if format is 0*-?
					const datestart = (data['start_date'] == '0000-00-00')? '':data['start_date'];
					const dateend 	= (data['end_date']   == '0000-00-00')? '':data['end_date'];

					// create the row
					obj.addRow(name, label, status, datestart, dateend, owner, timestamp);

					// send a sequence of rowname to bucket
					rowseq.push(name);
				}
			}
		});

		// update last index of table name ex.(row-) >> (3)+1

		// check if there are rows
		if (rowseq.length > 0) { 
			// update last index of table name ex.(row-) >> (3)+1
			rowCount = 1+parseInt(rowseq.sort(collator.compare).slice(-1)[0].slice(4));
		}
	}
}



// -- for each table select row
// create row 


// table.push(new TableCard('Grocery List'));
// table[0].addRow('BUY BROWN EGGS', 'Complete', 'Mar 05, 2022', 'Mar 05, 2022', ['miko', 'henlo'], 1651457868731);
// table[0].addRow('DYNARIMA SHEET', 'Develop', 'Feb 05, 2022', 'Mar 15, 2022', ['henlo'], 1651420206620);
// table[0].addRow('OHAYOO', 'Stuck', 'Feb 08, 2022', 'Nov 12, 2022', ['hiho', 'miko'], 1651420206620);
