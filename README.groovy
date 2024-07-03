// vars/readProperties.groovy
def call(String propertiesFilePath) {
    def props = new Properties()
    def file = new File(propertiesFilePath)
    if (file.exists()) {
        file.withInputStream { stream -> props.load(stream) }
    } else {
        error "Properties file not found: ${propertiesFilePath}"
    }

    // 打印读取的所有属性
    props.each { key, value ->
        echo "${key} = ${value}"
    }

    return props
}
