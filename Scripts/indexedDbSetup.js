	function indexedDBOk() {
    return "indexedDB" in window;
    };
	   function getDB(){
	   var b = function b(){
	$(document).bind('ready', function(){
        if(!indexedDBOk) return;
        
        //Open database test version 1
        var openRequest = indexedDB.open("idarticle_people13",1);

        openRequest.onupgradeneeded = function(e) {
           console.log("running onupgradeneeded");
                   var thisDB = e.target.result;
                   if(!thisDB.objectStoreNames.contains("people")) {
                                var objectStore = thisDB.createObjectStore("people",{keyPath: "id"});
                                objectStore.createIndex("name","name", {unique:false});
                                objectStore.createIndex("email","email", {unique:true});
            }
        }

        openRequest.onsuccess = function(e) {
            console.log("running onsuccess");
           return db = e.target.result;
			
        }

        openRequest.onerror = function(e) {
            console.log("Error");
            console.dir(e);
        }
       
		})
		};
		return b();
		};