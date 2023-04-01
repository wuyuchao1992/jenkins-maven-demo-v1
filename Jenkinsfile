pipeline {
    agent any
    parameters{
        string(name: 'tomcat_dev', defaultValue: '3.25.192.231', description: 'Staging Server')
    }


    triggers {
        pollSCM('* * * * *')
    }

    environment {
                    SSH_KEY_FOR_AWS = credentials('SSH_KEY_FOR_AWS_V1')
                }

    tools{
            maven 'maven3.9.1'
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
                        bat "scp -i %SSH_KEY_FOR_AWS% **/target/*.war ec2-user@${params.tomcat_dev}:/var/lib/tomcat9/webapps"
                    }
                }
            }
        }
    }

}