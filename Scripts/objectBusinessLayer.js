	//Add a specific person
	function addThePerson(db, person){


		console.log("About to add "+person.name+"/"+person.email);

		var transaction = db.transaction(["people"],"readwrite");
		var store = transaction.objectStore("people");

		//Perform the add
		var request = store.add(person);

		request.onerror = function(e) {
			console.log("Error",e.target.error.name);
			//some type of error handler
		}

		request.onsuccess = function(e) {
			console.log("Woot! Did it");
		}

		};
	
	//Delete all people
	function deleteAllPeople(db) {

		db.transaction(["people"], "readonly").objectStore("people").openCursor().onsuccess = function(e) {
			var cursor = e.target.result;
			if(cursor) {
					   var trans = db.transaction(["people"],"readwrite");
							   console.log("Deleting"+cursor.name);
					var request = trans.objectStore("people").delete(cursor.id);
				cursor.continue();
			}
		}
		};
		
	//Contact the server and get all people
	function GetPeopleFromServer(db){
		$.ajax({
		  type: "GET",
		  url: 'http://localhost:57385/api/Admin',
			  dataType:"json",
		  async: false,
		  beforeSend: function(x) {
		   if(x && x.overrideMimeType) {
			x.overrideMimeType("application/j-son;charset=UTF-8");
		   }
		},
		success: function(data){
		 //do your stuff with the JSON data
		$.each(data, function(i, field){
			var trans = db.transaction(["people"],"readwrite");
			var request = trans.objectStore("people").delete(field.id);
			addThePerson(db, field);
		 });
		}
		});
		};
		
	//Returns a person array
	function getPeople(db) {

		var people = [];
		db.transaction(["people"], "readonly").objectStore("people").openCursor().onsuccess = function(e) {
			var cursor = e.target.result;
			if(cursor) {
					var person = {
		name:cursor.value['name'],
		email:cursor.value['email'],
		created:new Date(),
		id:cursor.key
		}
		people.push(person);
				cursor.continue();
			}
		}
					return people;
		};
		
	//Send people to web server
	function SendPeople(db) {
			
		db.transaction(["people"], "readonly").objectStore("people").openCursor().onsuccess = function(e) {
			var cursor = e.target.result;
			if(cursor) {
				jQuery.support.cors = true;
						var person = {
							name: cursor.name,
							email: cursor.value.email,
							id:cursor.value.id,
							pic: cursor.value.pic
							
							}
						$.ajax({
							url: 'http://localhost:57385/api/Admin',
							type: 'POST',
							data: person,
							dataType: 'json',
							success: function () {
								console.log("Success");
							},
							error: function (x, y, z) {
								alert(x + '\n' + y + '\n' + z);
							}
						});
											
				cursor.continue();
			}
		}
		};
		
	//Delete person based on id
	function DeletePerson(db, theId){

		console.log("About to delete "+name+"/"+email);

		var transaction = db.transaction(["people"],"readwrite");
			var request = transaction.objectStore("people").delete(theId);

		request.onerror = function(e) {
			console.log("Error",e.target.error.name);
			//some type of error handler
		}

		request.onsuccess = function(e) {
			console.log("Woot! Did it");
		}
		};
		
	//Replace the person with a new version
	function EditPerson(db, person){
		console.log("About to edit "+name+"/"+email);

		var transaction = db.transaction(["people"],"readwrite");
		var store = transaction.objectStore("people");

		//Perform the add
		var request = store.put(person);

		request.onerror = function(e) {
			console.log("Error",e.target.error.name);
			//some type of error handler
		}

		request.onsuccess = function(e) {
			console.log("Woot! Did it");
		}
		};