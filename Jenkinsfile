pipeline {
    agent any
    parameters{
        string(name: 'tomcat_dev', defaultValue: '120.230.140.244', description: 'Staging Server')
    }


    triggers {
        pollSCM('* * * * *')
    }

    environment {
                    SSH_KEY_FOR_AWS = credentials('SSH_KEY_FOR_AWS')
                }

    tools{
            maven 'maven3.9.1'
    }

    stages{

        stage ('Build'){
            steps{
                  sh 'mvn clean package'
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
                        sh "scp -i %SSH_KEY_FOR_AWS% **/target/*.war ec2-user@${params.tomcat_dev}:/var/lib/tomcat9/webapps"
                    }
                }
            }
        }
    }

}