pipeline {
    agent any
    environment {
        CHROME_PATH = '/usr/bin/google-chrome'           // Chrome 浏览器路径
        CHROMEDRIVER_PATH = "${WORKSPACE}/drivers/chromedriver"  // Chromedriver 的绝对路径
    }
    stages {
        stage('Build') {
            steps {
                // 给 chromedriver 增加执行权限
                sh 'chmod +x ${CHROMEDRIVER_PATH}'
                
                // 执行 Maven 命令，并使用定义的环境变量
                sh 'mvn clean test -Dwebdriver.chrome.driver=${CHROMEDRIVER_PATH} -Dchrome.binary=${CHROME_PATH}'
            }
        }
    }
}
