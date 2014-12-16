function txCreateList(listNameField) {
	var f = document.getElementById(listNameField);
	var name = f.value;
	var db = window.openDatabase("Database", "1.0", "Grocery App", 200000);
	db.transaction(function(tx){createList(tx,name);}, errorCB, successCB);
}

function createList(tx, listName) {
//	var nextVal;
//	tx.executeSql('SELECT MAX(id) AS max_id FROM LIST', [], function(tx, results){queryMaxSuccess(tx, results, nextVal);}, errorCB);
//	console.log("Next List ID for Insert=" + nextVal);
	tx.executeSql('INSERT INTO LIST (id,name) VALUES (?,?)', [null,listName], successCB, errorCB);
	alert("List created");
	}

function queryMaxSuccess(tx, results, nextVal) {
	maxList=results.rows.item(0).max_id;
	console.log("Max List ID=" + maxList);
	maxList += 1;
	console.log("Next List ID=" + maxList);
	nextVal = maxList;
	}

