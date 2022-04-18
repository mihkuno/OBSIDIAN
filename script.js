// DASHBOARD SORT LIBRARY
const wrapper = document.querySelector('.sort-wrapper')

new Sortable(wrapper, {
    handle: '.sort-handler', 
    forceFallback: false,
    animation: 200,
});


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