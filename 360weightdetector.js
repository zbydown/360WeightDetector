function test360(){
	var chrome_type = "chrome";
	var _chrome_weight = 5 ;
	var _chromium_weight = 0 ;
	var _360se_weight = 0;
	var _360ee_weight = 0;	
	var _ua = window.navigator.userAgent;
	if((/Chrome\/([\d.])+\sSafari\/([\d.])+$/).test(_ua)){
		if(window.navigator.platform=="Win32"){
			if(!window.clientInformation.languages){
				_360se_weight += 8 ;
			}
			if((/zh/i).test(navigator.language)){
				_chrome_weight += 6 ;
				_chromium_weight += 6 ;
			}
			if(window.clientInformation.languages){
				var lang_len = window.clientInformation.languages.length;
				if(lang_len>=3){
					_chrome_weight += 10; 
					_chromium_weight += 6 ;
				}
				else if(lang_len==2){
					_chrome_weight += 3 ; 
					_chromium_weight += 6;
					_360ee_weight += 6 ;
				}
				else if(lang_len==1){
					_chrome_weight += 4 ; 
					_chromium_weight += 4;				
				}
			}
			for(var i in window.navigator.plugins){
			  if(navigator.plugins[i].filename=="np-mswmp.dll"){
					_360se_weight += 20 ; 
					_360ee_weight += 20;
			  }
			}
			if(Object.keys(window.chrome.webstore).length<=1){
				_360se_weight += 7 ;
			}
			else if(Object.keys(window.chrome.webstore).length==2){
				_360se_weight += 4 ;
				_chromium_weight += 3 ;				
			}
			
			if(window.navigator.plugins.length>=30){
				_360ee_weight += 7;
				_360se_weight += 7;
				_chrome_weight += 7;
			}
			else if(window.navigator.plugins.length<30&&window.navigator.plugins.length>10){
				_360ee_weight += 3;
				_360se_weight += 3;
				_chrome_weight += 3;
			}
			else if(window.navigator.plugins.length<=10){
				_chromium_weight += 6;
			}
		
		}
		else{
			_360ee_weight -= 50;
			_360ee_weight -= 50;
			if((/Linux/i).test(window.navigator.userAgent)){
				_chromium_weight += 5 ;
			}
		
		}
		var found = 0 ;			
		for(var i in window.navigator.plugins){
			if(!!(respdf = (/^(.+) PDF Viewer$/).exec(navigator.plugins[i].name))){
				//console.log(respdf[1]);
				if(respdf[1]=="Chrome"){
					_chrome_weight += 6 ;
					_360se_weight += 6 ;
					found = 1;
					break;
				}
				if(respdf[1]=="Chromium"){
					_chromium_weight += 10 ;
					_360ee_weight += 6 ;
					found = 1;
					break;
				}
			}
		}
		if(!found){
			_chromium_weight += 9 ;
		}		
		
	}
	var chrome_result = new Object;
	chrome_result['Chrome'] = _chrome_weight ;
	chrome_result['Chromium'] = _chromium_weight ;
	chrome_result['360SE'] = _360se_weight ;
	chrome_result['360EE'] = _360ee_weight ;
	var sortable = [];
	for (var value in chrome_result)
      sortable.push([value, chrome_result[value]])
	sortable.sort(function(a, b) {return  b[1] - a[1]})	
	console.log("Chrome Weight "+_chrome_weight);
	console.log("Chromium Weight "+_chromium_weight);
	console.log("360SE Weight "+_360se_weight);	
	console.log("360EE Weight "+_360ee_weight);	
	return	sortable;

}