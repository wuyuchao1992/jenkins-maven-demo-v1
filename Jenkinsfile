pipeline {
    agent any
    parameters{
        string(name: 'tomcat_dev', defaultValue: '13.210.122.186', description: 'Staging Server')
        string(name: 'tomcat_prod', defaultValue: '3.27.83.247', description: 'Production Server')
    }


    triggers {
        pollSCM('* * * * *')
    }


    tools{
            maven 'local maven'
    }

    stages{

        stage ('Build'){
            steps{
                  bat 'mvn clean package'
            }

            post {
                 success {
                    echo 'start to save document'
                    archiveArtifacts artifacts: '**/target/*.war'
                 }
            }
        }

        stage ('Deployments'){
            parallel{
                stage ('Deploy to Staging'){
                    steps {
                        bat "winscp -i /Users/Administrator/Documents/Tony/tomcat-demo-v1.pem **/target/*.war ec2-user@${params.tomcat_dev}:/var/lib/tomcat9/webapps"
                    }
                }

                stage ('Deploy to Production'){
                    steps {
                        bat "winscp -i /Users/Administrator/Documents/Tony/tomcat-demo-v1.pem **/target/*.war ec2-user@${params.tomcat_prod}:/var/lib/tomcat9/webapps"
                    }
                }
            }
        }

    }



}