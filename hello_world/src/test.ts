export default async function test(client) {
	const db = client.db(process.env.MONGO_INITDB_DATABASE)
	const collection = db.collection("test")
	const result = await collection.insertOne({"test" : "Hello World"})
	console.log("Данные вставлены", result)
	const testData = await collection.find().toArray()
	console.log(testData)
	console.log("Вставленные данные")		
}
