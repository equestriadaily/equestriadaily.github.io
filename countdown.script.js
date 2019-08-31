function generatecountdown(list,div)
{
	for(var i=0;i<list.length;i++)
	{
		list[i][1] = Date.parse(list[i][1]);
		//Check for expired items and remove them
		if((list[i][1] - new Date().getTime()) <= 0)
		{
		    list.splice(i,1);
		    i--;
		}
	}
	list.sort(function(a,b){return a[1]-b[1]});
	parsecountdown(list,div);
}

function parsecountdown(list,div)
{
	var currentItem = 0;
	var countdown = document.getElementById(div);
	var titleview = document.getElementById(div+'-title');
	var timeview = document.getElementById(div+'-time');
	
	//Set episode title
	titleview.textContent = list[currentItem][0];
	var x = setInterval(function() {
		//Check if there are any items on the countdown list
		if(list.length <= 0 || currentItem > list.length) 
		{
		   clearInterval(x);
		   countdown.className='expired';
		   countdown.innerHTML='No-Count';
		}
		// Get today's date and time
		var now = new Date().getTime();
		
			
		var countDownDate = list[currentItem][1];
		// Find the distance between now and the count down date
		var distance = countDownDate - now;
		//If countdown has expired, move to the next one
		if(distance <= 0)
		{
		    currentItem++;
			//Update episode title
			titleview.textContent = list[currentItem][0];
		    return;
		}
		
		
		
		
		if(distance<=3600000 && countdown.className!='soon')countdown.className='soon';
		if(distance>3600000 && countdown.className!='')countdown.className='';

		  // Time calculations for days, hours, minutes and seconds
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		timeview.textContent = days + "d " + hours + "h "+ minutes + "m " + seconds + "s ";
		//countdown.innerHTML=list[i][0]+"<br><span>"+days+"</span><sup>D</sup><span>"+hours+"</span><sup>H</sup><span>"+minutes+"</span><sup>M</sup><span>"+seconds+"</span><sup>S</sup>";
	}, 1000);
}
