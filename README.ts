import org.apache.jmeter.services.FileServer
import java.nio.file.*

// 获取当前脚本所在目录
def scriptDir = FileServer.getFileServer().getBaseDir()

// 定义CSV文件路径，相对于脚本所在目录
def csvFilePath = scriptDir + "/data.csv"

// 清空CSV文件内容
Files.write(Paths.get(csvFilePath), new byte[0])

// 获取接口返回的ID和其他信息
def id = vars.get("response_id")
def otherData = vars.get("other_data") // 假设你有其他数据

// 准备CSV行数据
def csvData = "${id},${otherData}\n"

// 写入CSV数据
Files.write(Paths.get(csvFilePath), csvData.bytes, StandardOpenOption.APPEND)