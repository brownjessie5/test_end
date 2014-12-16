function txQueryListItems(listId, itemsTab) {
	var db = window.openDatabase("Database", "1.0", "Grocery App", 200000);
	var tab=document.getElementById(itemsTab);
	db.transaction(function(tx){queryListItems(tx,listId,tab);}, errorCB, successCB);
}

function queryListItems(tx,listId,tab) {
	tx.executeSql('SELECT a.name FROM ITEM a, LIST_ITEM b WHERE a.id = b.item_id AND b.list_id = ' + listId, [], function(tx,results){queryListItemsSuccess(tx,results,tab);}, errorCB);
}

function queryListItemsSuccess(tx, results, t) {
	var len = results.rows.length;
	clearTab(t);

	for (var i=0; i<len; i++){
		r = t.insertRow(i); 
		c = r.insertCell(0);
		c.innerHTML = results.rows.item(i).name;
		}
	}

