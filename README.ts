import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import org.bson.Document;
import java.util.regex.Pattern;

// MongoDB 连接字符串
String uri = "mongodb://username:password@localhost:27017";
MongoClient mongoClient = MongoClients.create(uri);

// 选择数据库
MongoDatabase database = mongoClient.getDatabase("yourDatabase");

// 根据 key 创建正则表达式模式
String key = "yourKey";
Pattern pattern = Pattern.compile(".*" + key + ".*");

// 删除匹配模式的集合
for (String collectionName : database.listCollectionNames()) {
    if (pattern.matcher(collectionName).matches()) {
        database.getCollection(collectionName).drop();
        log.info("Dropped collection: " + collectionName);
    }
}

// 指定要操作的集合
MongoCollection<Document> collection = database.getCollection("A");

// 删除集合中匹配正则表达式的文档
collection.deleteMany(Filters.regex("yourField", pattern));
log.info("Deleted documents from collection A where field matches pattern: " + pattern);

// 关闭客户端连接
mongoClient.close();