function txQueryStore(tabName) {
	var tab = document.getElementById(tabName);
	var db = window.openDatabase("Database", "1.0", "Grocery App", 200000);
	db.transaction(function(tx){queryStore(tx,tab);}, errorCB, successCB);
}

function queryStore(tx,tab) {
	tx.executeSql('SELECT * FROM STORE', [], function(tx,results){queryStoreSuccess(tx,results,tab);}, errorCB);
}

function queryStoreSuccess(tx, results, t) {
	var len = results.rows.length;
	createTableHeader(t,["Store Name","Store Address"]);

	for (var i=0; i<len; i++){
		r = t.insertRow(1); 
		c = r.insertCell(0);
		c.innerHTML = "<a href=showListForStore.html?store_id=" + results.rows.item(i).id + "&list_id=" + listId +">" + results.rows.item(i).name + "</a>";
//		c.innerHTML = results.rows.item(i).name;
		c = r.insertCell(1);
		c.innerHTML = results.rows.item(i).address;    
		}
	}

