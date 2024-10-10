import com.mongodb.MongoClient
import com.mongodb.client.MongoDatabase

// 配置 MongoDB 连接参数
String mongoHost = "localhost"
int mongoPort = 27017
String databaseName = "yourDatabaseName"

// 正则表达式用于匹配集合名称
String regexPattern = /yourRegexPattern/

MongoClient mongoClient = null

try {
    // 连接到 MongoDB
    mongoClient = new MongoClient(mongoHost, mongoPort)
    MongoDatabase database = mongoClient.getDatabase(databaseName)

    // 获取数据库中的所有集合名称
    def collections = database.listCollectionNames()

    // 循环检查集合名称是否匹配正则表达式
    collections.each { collectionName ->
        if (collectionName ==~ regexPattern) {  // 使用正则表达式匹配
            // 删除匹配的集合
            database.getCollection(collectionName).drop()
            log.info("Dropped collection: " + collectionName)
        }
    }

} catch (Exception e) {
    log.error("Error occurred while dropping collections from MongoDB: " + e.message)
} finally {
    if (mongoClient != null) {
        mongoClient.close()
    }
}