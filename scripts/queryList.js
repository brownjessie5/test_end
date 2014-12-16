function txQueryList() {
	var db = window.openDatabase("Database", "1.0", "Grocery App", 200000);
	db.transaction(queryList, errorCB, successCB);
}

function queryList(tx) {
	tx.executeSql('SELECT * FROM LIST', [], queryListSuccess, errorCB);
}

function queryListSuccess(tx, results) {
	var len = results.rows.length;
	t = document.getElementById("chooselist");
	createTableHeader(t,["List Name","Show","Edit","Delete","Shop Now"]);

	for (var i=0; i<len; i++){
		r = t.insertRow(1); 
		c = r.insertCell(0);
		c.innerHTML = results.rows.item(i).name;
		c = r.insertCell(1);
		c.innerHTML = '<a href=showList.html?id=' + results.rows.item(i).id +'>Show</a>';
		c = r.insertCell(2);
		c.innerHTML = '<a href=AddToList.html?id=' + results.rows.item(i).id + '>Add To</a>';
		c = r.insertCell(3);
		c.innerHTML = '<a href="javascript:txDeleteList(' + results.rows.item(i).id + ')">Delete</a>';
		c = r.insertCell(4);
		c.innerHTML = '<a href=shopNow.html?id=' + results.rows.item(i).id + '>Shop Now</a>';
		}
	}

function txDeleteList(listId) {
	var r = confirm("Are you sure?");
	if (r == true) {
		var db = window.openDatabase("Database", "1.0", "Grocery App", 200000);
		db.transaction(function(tx){deleteList(tx,listId);}, errorCB, successCB);
	} else {
		alert('Cancelled');;
	}
}

function deleteList(tx,listId) {
	tx.executeSql('DELETE FROM LIST_ITEM WHERE LIST_ID = ?', [listId], successCB, errorCB);
	tx.executeSql('DELETE FROM LIST WHERE ID = ?', [listId], successCB, errorCB);
	location.reload();
}