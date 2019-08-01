jQuery(document).ajaxComplete(function () {

});

jQuery(document).ready(function () {
	if ( $ === undefined){ $ = jQuery}

	$('.tabs_list li').click(function(){
		index = $(this).index() + 1;
		$(this).parent('.tabs_list').find('li').removeClass('active');
		$(this).addClass('active');

		$(this).parent('.tabs_list').next('.tabs_windows').find('> div').removeClass('active');
		$(this).parent('.tabs_list').next('.tabs_windows').find('> div:nth-child('+index+')').addClass('active');
	})

	$('.news_box dd').click(function(){
		$('.news_box dd').removeClass('active');
		$('.news_box dt').removeClass('active');
		$(this).addClass('active');
		$(this).next('dt').addClass('active');
	})

	$('.deposit_table label').click(function(){
		$('.deposit_table label input').attr("checked", false);
		$(this).find('input').attr("checked", true);

		$('.deposit_table table').removeClass('active');
		$(this).next('table').addClass('active');

	})

	

	// calc handlers
	$('.calc_plans .tabs_list li').click(function(){
		index = $(this).index() + 1;
		$('[name="plan_id"] option:nth-child('+index+')').prop('selected', true);
		calc();
	})

	$('[name="plan_id"]').change(function(){
		index = $(this).val();
		// console.log( index );
		$('.calc_plans .tabs_list li:nth-child('+index+')').click();
	})

	if( $('.calc').length ) {
		calc();
	}

	$('#plan_id, #amount').change(function(){
		calc();
	})

	
});





function startTime() {
  // var today = new Date();
  // var dd = today.getDate();
  // var mm = today.getMonth()+1;
  // var yyyy = today.getFullYear();
  // if(dd<10) {
  //   dd = '0'+dd
  // } 
  // switch (mm) {
  //   case 1: mmtext = 'January'; break;
  //   case 2: mmtext = 'February'; break;
  //   case 3: mmtext = 'March'; break;
  //   case 4: mmtext = 'April'; break;
  //   case 5: mmtext = 'May'; break;
  //   case 6: mmtext = 'June'; break;
  //   case 7: mmtext = 'July'; break;
  //   case 8: mmtext = 'August'; break;
  //   case 9: mmtext = 'September'; break;
  //   case 10: mmtext = 'Octomber'; break;
  //   case 11: mmtext = 'November'; break;
  //   case 12: mmtext = 'December'; break;
  //   default: mmtext = '';
  // }
  // var h = today.getHours();
  // var m = today.getMinutes();
  // var s = today.getSeconds();
  // m = checkTime(m);
  // s = checkTime(s);
  // document.getElementById('topline_timer').innerHTML =
  // dd + '.' + mmtext + '.' + yyyy + ' - ' + h + ":" + m + ":" + s;
  // var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};
  return i;
}
startTime();


function active_menu() {   
    var url = window.location.href;
    $('header nav a').filter(function() {
        return this.href == url;
    }).addClass('active');
}
active_menu();


function calc(){

	plans = [
				[100,102,103,104,106,110],
				[106,111,116,121,132,155],
				[119,134,149,164,198,270],
				[220,310,400,500,700,1200],
				[350,530,730,930,1350,2400],
				[650,1000,1400,1900,2700,5000],
			];
	setka = [
				[12,1001,5000,10000,20000,100000,500000],
				[10,1001,5000,10000,20000,100000,500000],
				[10,1001,5000,10000,20000,100000,500000],
				[10,1001,5000,10000,20000,100000,500000],
				[10,1001,5000,10000,20000,100000,500000],
				[10,1001,5000,10000,20000,100000,500000],
			];
	amount = $('#amount').val()
	plan_id = $('#plan_id').val() - 1;
	current_setka = setka[plan_id];

	depo_min = current_setka[0];
	depo_max = current_setka[current_setka.length - 1];

	current_setka.forEach(function(item, i, arr) {
		// console.log(amount + ' | ' + item);
		if (amount >= item){
			plan_index = i;
		}
	});
	percent = plans[plan_id][plan_index];
	calc_return = amount * percent / 100;
	// console.log('amount = ' + amount);
	// console.log('percent = '+ percent);
	
	if( amount < depo_min ){
		$('#calc_result').html('Investment is:<span>too low</span>');	
	}else if( amount > depo_max){
		$('#calc_result').html('Investment is:<span>too big</span>');	
	}else{
		$('#calc_result').html('Total profit:<span>$'+calc_return.toFixed(2)+'</span>');	
	}
}




// Updated scripts starts here

const planButtons = document.querySelectorAll('#widgets_section .plan_btn_wrapper button');


function displayPlan() {

	planButtons.forEach(button => {
		if(button.classList.contains('active')) {
			button.classList.remove('active');
		}
	this.classList.add('active');
	})


	const plans = document.querySelectorAll('#widgets_section .container');
	plans.forEach(plan => {
		plan.classList.remove('open_plan');
		if(plan.dataset.plan === this.dataset.plan) {
			plan.classList.add('open_plan');
		}
	})
}


planButtons.forEach(button => button.addEventListener('click', displayPlan));
let handleCalculate = ({target: {value, dataset}}) => {
	let percent = Number(value);
	let price = document.querySelector(`.${dataset.class}`);	
	let earning = ((percent)/100) * Number(price.value);
	earning = earning.toFixed(2)
	if(Number(dataset.min) > price.value){
		swal(
      "Error",
      "The minimum amount for this plan is $" + dataset.min,
      "error"
    );
	} else if(Number(dataset.max) < price.value) {
		swal(
      "Error",
	 "The maximum amount for this plan is $" + dataset.max, 
	  "error"
    );

	} else {
		swal(
      "$"+earning, 
      "After investing on this plan your earning will be $" + earning,
      "success"
    );
		
	}
}

let calculateBtn = document.querySelectorAll('.calculate');

calculateBtn.forEach(btn => {
	btn.addEventListener('click', handleCalculate)
})