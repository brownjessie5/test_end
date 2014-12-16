function txListsForStore(listId, storeId, itemsTab) {
	var db = window.openDatabase("Database", "1.0", "Grocery App", 200000);
	var tab=document.getElementById(itemsTab);
	db.transaction(function(tx){listsForStore(tx,listId,storeId,tab);}, errorCB, successCB);
}

function listsForStore(tx,listId,storeId,tab) {
	console.log("store id=" + storeId);
	tx.executeSql('SELECT a.name, b.aisle FROM ITEM a, ITEM_LOCATION b, LIST_ITEM c WHERE a.id = b.item_id AND a.id = c.item_id AND b.store_id = ' + storeId + ' AND c.list_id = ' + listId, [], function(tx,results){listsForStoreSuccess(tx,results,tab);}, errorCB);
}

function listsForStoreSuccess(tx, results, t) {
	console.log("listForStoreSuccess");
	var len = results.rows.length;
	clearTab(t);
	createTableHeader(t,["Item","Aisle"]);


	for (var i=0; i<len; i++){
		console.log("listForStoreSuccess loop");
		r = t.insertRow(i+1); 
		c = r.insertCell(0);
		c.innerHTML = results.rows.item(i).name;
		c = r.insertCell(1);
		c.innerHTML = results.rows.item(i).aisle;
		}
	}

