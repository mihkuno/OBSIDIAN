// profile description listener
document.getElementById('userdesc')
    .addEventListener('change', (object) => {
        const input = object.target.value;
        
        const request = new XMLHttpRequest();
        request.open('POST', 'requests/modify_user.php', true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send(`input=${input}`);

        console.log(request.responseText);
        console.log(request.statusText);
    }
);

// initialize user description
const request = new XMLHttpRequest();
request.open('POST', 'requests/get_userdata.php', true);
request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
request.send(`type=${'desc'}`);

request.addEventListener('loadend', () => {
    console.log('done');

    const response = JSON.parse(request.responseText);
    console.log(response);
    document.getElementById('userdesc').value = response['desc'];

    // hide the spinning loader
    document.getElementById('loader-profile').classList.add('d-none');

    // show the description input
    document.getElementById('userdesc').classList.remove('d-none');
});



/* initialize the calendar
-----------------------------------------------------------------*/

var className = Array(
    'calendar-timeline-1',
    'calendar-timeline-2',
    'calendar-timeline-3',
    'calendar-timeline-4'
);

$calendar = $('.calendar');
$calendar.fullCalendar({
    themeSystem : "bootstrap",
    header: {
        left: 'prev',
        center: 'title',
        right: 'next'
    },
    selectable : true,
    selectHelper: true,
    themeSystem: 'bootstrap5',
    select: function(start, end) {

        // on select we show the Sweet Alert modal with an input
        swal({
            title: 'Create an Event',
            content: '',
            content: {
                element: "input",
                attributes: {
                    placeholder: "Event Title",
                    type: "text",
                    id: "input-field",
                    className: "form-control"
                },
            },
            buttons: {
                cancel: true,
                confirm: true,
            },
        }).then(
        function() {
            var eventData;
            var classRandom = className[Math.floor(Math.random()*className.length)];
            event_title = $('#input-field').val();

            if (event_title) {
                eventData = {
                    title: event_title,
                    start: start,
                    className: classRandom,
                    end: end
                };
                $calendar.fullCalendar('renderEvent', eventData, true); // stick? = true
                // notification
                $.notify({
                    // options
                    icon: 'fa fa-bell',
                    title: 'New Event Added!',
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

            $calendar.fullCalendar('unselect');
        }
        );
    },
});

// show the calendar card
// document.getElementById('row-calendar').classList.remove('d-none');

// hide the spinning loader
document.getElementById('loader-calendar').style = 'display: none';