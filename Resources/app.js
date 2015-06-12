var Cloud = require('ti.cloud');

var win = Ti.UI.createWindow({
	title : 'OrderFood',
	layout : 'vertical',
	backgroundColor : '#cb2323',
	borderWidth: 3,
	borderColor: '#3d0202',
	borderRadius: 8
});

var label = Ti.UI.createLabel({
	text : 'OrderFood',
	color : '#fff',
	top : 40,
	textAlign : 'center',
	font : {
		fontWeight : 'bold',
		fontSize : 18
	},
	height : 'auto'
});

win.add(label);

var ImageView = Ti.UI.createImageView({
	image : 'logo.png',
	top : 10,
});

win.add(ImageView);

var UserNametxt = Ti.UI.createTextField({
	height : 40,
	top : 40,
	width : 200,
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	returnKeyType : Ti.UI.RETURNKEY_DONE,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	hintText : 'Username..'
});

win.add(UserNametxt);

var Passwordtxt = Ti.UI.createTextField({
	height : 40,
	top : 5,
	width : 200,
	passwordMask : true,
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	returnKeyType : Ti.UI.RETURNKEY_DONE,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	hintText : 'Password..'
});

win.add(Passwordtxt);

var button = Ti.UI.createButton({
	title : 'Login',
	top : 10,
	height : 40,
	width : 200,
	color: '#fff',
	font: { fontSize:45 }
});


var tabGroup = Titanium.UI.createTabGroup({
	tabsBackgroundColor: '#cb2323',
	tabDividerColor: '3d0202',
	barColor: 'fff'
});

var winFood = Ti.UI.createWindow({
	backgroundColor : '#cb2323',
	borderWidth: 3,
	borderColor: '#3d0202',
	borderRadius: 8
});

var tabFood = Titanium.UI.createTab({  
    icon:'burger.png',
    title:'Foods',
    window:winFood
});

var labelFood = Ti.UI.createLabel({
	text : 'Choose your meal, Eater!',
	color : '#fff',
	top : 20,
	textAlign : 'center',
	font : {
		fontWeight : 'bold',
		fontSize : 18
	},
	height : 'auto'
});

winFood.add(labelFood);

var selection;

var picker = Ti.UI.createPicker({
	top : 80,
	height : 100,
	width : 200
});

var data = [];
data[0]=Ti.UI.createPickerRow({title:'Big Mac Menu'});
data[1]=Ti.UI.createPickerRow({title:'McRoyal Menu'});
data[2]=Ti.UI.createPickerRow({title:'Quarter Pounder Menu'});
data[3]=Ti.UI.createPickerRow({title:'McChicken Menu'});
data[4]=Ti.UI.createPickerRow({title:'Mega Mac Menu'});
data[5]=Ti.UI.createPickerRow({title:'Double Quarter Pounder Menu'});
data[6]=Ti.UI.createPickerRow({title:'Double Cheeseburger Menu'});
data[7]=Ti.UI.createPickerRow({title:'Double McChicken Menu'});
data[8]=Ti.UI.createPickerRow({title:'Etli Grand Burger Menu'});
data[9]=Ti.UI.createPickerRow({title:'Tavuklu Grand Burger Menu'});

picker.add(data);
picker.selectionIndicator = true;

winFood.add(picker);

picker.addEventListener('change', function(e) {
	 currentValue = e.row.title;
	selection = currentValue;
});

var winOrder = Ti.UI.createWindow({
	backgroundColor : '#cb2323',
	borderWidth: 3,
	borderColor: '#3d0202',
	borderRadius: 8
});

var tabOrder = Titanium.UI.createTab({  
    icon:'clock.png',
    title:'Orders',
    window:winOrder
});

var labelOrder = Ti.UI.createLabel({
	text : 'Bon Appetit, Eater!',
	color : '#fff',
	top : 20,
	textAlign : 'center',
	font : {
		fontWeight : 'bold',
		fontSize : 18
	},
	height : 'auto'

});

winOrder.add(labelOrder);

tabGroup.addTab(tabFood);
tabGroup.addTab(tabOrder);  

var winKitchen = Ti.UI.createWindow({
	backgroundColor : '#cb2323',
	borderWidth: 3,
	borderColor: '#3d0202',
	borderRadius: 8
});

var labelKitchen = Ti.UI.createLabel({
	text : 'Good Luck, Kitchen!',
	color : '#fff',
	top : 20,
	textAlign : 'center',
	font : {
		fontWeight : 'bold',
		fontSize : 18
	},
	height : 'auto'

});

winKitchen.add(labelKitchen);

var logoutBtnKitchen = Ti.UI.createButton({
	title : 'logout',
	bottom : 10,
	height : 40,
	width : 200,
	color: '#fff',
	font: { fontSize:45 }
});

winKitchen.add(logoutBtnKitchen);

var logoutBtnFood = Ti.UI.createButton({
	title : 'logout',
	bottom : 10,
	height : 40,
	width : 200,
	color: '#fff',
	font: { fontSize:45 }
});

winFood.add(logoutBtnFood);

var logoutBtnOrder = Ti.UI.createButton({
	title : 'logout',
	bottom : 10,
	height : 40,
	width : 200,
	color: '#fff',
	font: { fontSize:45 }
});

winOrder.add(logoutBtnOrder);

logoutBtnKitchen.addEventListener('click', function(e) {
	alert('Logged out Successfully');
	win.open();
   winKitchen.remove(tableView);
	winKitchen.close();

});

logoutBtnFood.addEventListener('click', function(e) {
	alert('Logged out Successfully');
	win.open();

	winFood.close();

});

logoutBtnOrder.addEventListener('click', function(e) {
	alert('Logged out Successfully');
	win.open();

	winOrder.close();

});

win.add(button);
win.open();

button.addEventListener('click', function(e) {
	Cloud.Users.login({
		login : UserNametxt.value,
		password : Passwordtxt.value
	}, function(e) {
		if (e.success) {
			var user = e.users[0];

			alert('logged in Successfully');
			UserNametxt.value = "";
			Passwordtxt.value = "";
			if (user.role == 'Kitchen') {
				winKitchen.open();
				win.close();
			} else {
				tabGroup.open();
				win.close();
			}
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}

	});

});

var calendar = Ti.UI.createPicker({
	type : Ti.UI.PICKER_TYPE_TIME,
	minDate : new Date(2015, 5, 20),
	maxDate : new Date(2016, 11, 31),
	value : new Date(2015, 3, 12),
	top : 80,
	height : 100,
	width : 200,
	backgroundColor : '#cb2323'
});
winOrder.add(calendar);

submitbtn = Ti.UI.createButton({
	backgroundColor: '#fff',
	borderColor: '#fff',
	borderRadius: 8,
	title : 'submit',
	bottom : 70,
	width: 200,
	color: '#cb2323',
	height: 'auto',
	font: { fontSize:50 }
});

winOrder.add(submitbtn);

submitbtn.addEventListener('click', function(e) {
	Cloud.Events.create({
		name : currentValue,
		start_time : calendar.value + '1',
		recurring : 'monthly',
		recurring_count : 5,

	}, function(e) {
		if (e.success) {
			var event = e.events[0];
			alert('Success:\n' +
				  'name: ' + event.name + '\n' + 
				  'updated_at: ' + event.updated_at);
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
});

var tableView = Ti.UI.createTableView({
        top: '10%',
        scrollable: true,
        width: '100%',
        minRowHeight: '50',
        bottom: '10%'
    });

var Ordertxt = Ti.UI.createLabel();
var displayData = [];
var row = Ti.UI.createTableViewRow();

showbtn = Ti.UI.createButton({
	backgroundColor: '#fff',
	borderColor: '#fff',
	borderRadius: 8,
	title : 'show',
	bottom : 70,
	width: 200,
	height: 'auto',
	color: '#cb2323',
	font: { fontSize:50 }
});

showbtn.addEventListener('click', function(e) {
	Cloud.Events.query(function(e) {
		if (e.success) {
            displayData = [];
			for (var i = 0; i < e.events.length; i++) {
				var event = e.events[i]; 
				row = Ti.UI.createTableViewRow({
                height:150,
                backgroundColor : '#cb2323',
                font: {fontSize:35},
                
            });
            
var eaterName;
Cloud.Users.show({
	user_id: event.user_id
}, function (e) {
	if (e.success) {
		var usertmp = e.users[0];
		eaterName = usertmp;
	} else {
		alert('Error:\n' + 
			((e.error && 
			e.message) || 
			JSON.stringify(e)));
	}
});

Ordertxt = Ti.UI.createLabel({
	text : 'User:' + 'eater' + '\n' + 'Process : ' + event.name + '\n' + 'Time: ' + event.start_time  ,
	width: Ti.UI.FILL,
	color : '#fff',
	left : 5,
	textAlign : 'center',
	font : {
			fontWeight : 'bold',
			fontSize : 18
			},
	height : 'auto'
	});
row.add(Ordertxt);
displayData.push(row);
}
tableView.setData(displayData);
winKitchen.add(tableView);
} else {
			alert('Failed');
		}
	});
});

winKitchen.add(showbtn);