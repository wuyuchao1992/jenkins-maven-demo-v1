stage('Set PATH for ChromeDriver') {
            steps {
                sh 'export PATH=$PATH:/path/to/chromedriver'
                sh 'echo $PATH' // 验证 PATH 是否更新
            }
        }
