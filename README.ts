pipeline {
    agent any
    stages {
        stage('Run JMeter Tests') {
            steps {
                script {
                    // 运行 JMeter 测试
                    sh 'mvn clean verify'

                    // 解析 JMeter 的结果文件
                    def jtlFile = "target/jmeter/results.jtl"  // JTL 文件路径
                    def failedAssertions = sh(
                        script: "grep '<failure>true</failure>' ${jtlFile} | wc -l",
                        returnStdout: true
                    ).trim()

                    // 如果有断言失败，标记当前阶段为失败
                    if (failedAssertions.toInteger() > 0) {
                        error "JMeter tests failed with ${failedAssertions} failed assertions."
                    }
                }
            }
        }
    }
}