//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
	var Cloud = require('ti.cloud');
	Cloud.debug = true;
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var label = Ti.UI.createLabel({
		color:'#000000',
		text:'Create a Car',
		height:'auto',
		width:'auto'
	});
	self.add(label);
	
	//Add behavior for UI
	label.addEventListener('click', function(e) {
		Cloud.Users.login({
			login	: 'username3',
			password: '123password',
		}, function(e) {
			if (e.success)	 {

				Cloud.Objects.create({
					classname : 'cars',
					fields : {
						make : 'Ford',
						color : 'green',
						year : 2010
					}
				}, function(e) {
					if(e.success) {
						var car = e.cars[0];
						alert('Success:\\n' + 'id: ' + car.id + '\\n' + 'make: ' 
						+ car.make + '\\n' + 'color: ' + car.color + '\\n' + 'year: ' 
						+ car.year + '\\n' + 'created_at: ' + car.created_at);
					} else {
						alert('Create Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
					}
				}); // Cloud.Objects.create
										
			} else {
				alert('Login Error:\\n' +
            		((e.error && e.message) || JSON.stringify(e)));
			} 
		}); // Cloud.Users.login
		
	}); // label.addEventListener
	
	return self;
}

module.exports = FirstView;
