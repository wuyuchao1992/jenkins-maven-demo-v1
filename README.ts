import org.apache.jmeter.services.FileServer
import java.nio.file.*

// 获取当前脚本所在目录
def scriptDir = FileServer.getFileServer().getBaseDir()

// 定义文件路径，相对于脚本所在目录
def filePath = scriptDir + "/yourfile.txt"

// 清空文件内容
Files.write(Paths.get(filePath), new byte[0])

// 获取接口返回的ID
def id = vars.get("response_id")

// 写入新的ID
Files.write(Paths.get(filePath), id.bytes, StandardOpenOption.APPEND)