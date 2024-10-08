import org.apache.jmeter.functions.FunctionUtils
import org.apache.jmeter.engine.util.CompoundVariable

// 调用 __RandomString 函数生成 5 位随机字符串
def randomStringFunction = new CompoundVariable("__RandomString(5,abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789)").execute()

// 将随机字符串存储为 JMeter 变量
vars.put("randomString", randomStringFunction)