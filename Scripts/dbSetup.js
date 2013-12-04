function getDBSchema(){

//Create a table schema object
function createTableSchema (dbName, keyPath, indices){
	var table = {
				dbName:dbName,
				keyPath: keyPath,
				indices: indices
	};
return Object.create(table);
};
//Create indices object
function createIndicesSchema(indexName,unique){
	var a = {
		indexName:indexName,
		unique:unique
};
return Object.create(a);
};
//Create the indices varible first, then add to each table schema object
var personIndices = [createIndicesSchema("name",false),createIndicesSchema("email",true)]
var personSchema = createTableSchema("people", "id",personIndices)
var bookIndices = [createIndicesSchema("title",false),createIndicesSchema("author",false),createIndicesSchema("publisher",false)]
var bookSchema = createTableSchema("books", "id", bookIndices)
//Return the array object
return [personSchema, bookSchema];
};