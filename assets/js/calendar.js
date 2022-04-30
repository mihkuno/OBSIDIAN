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
    header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaDay,listWeek'
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