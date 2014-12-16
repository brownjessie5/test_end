function txAddToList(listId,itemId) {
	console.log('txAddToList');
	console.log('listId:'+listId);
	console.log('itemId:'+itemId);
	var db = window.openDatabase("Database", "1.0", "Grocery App", 200000);
	db.transaction(function(tx){addToList(tx,listId,itemId);}, errorCB, successCB);
}

function addToList(tx, listId, itemId) {
	console.log('addToList()');
	console.log('listId:'+listId);
	console.log('itemId:'+itemId);
	tx.executeSql('INSERT INTO LIST_ITEM(list_id, item_id) VALUES (?,?)', [listId,itemId], successCB, errorCB);
	alert('Item added to list');
	}

