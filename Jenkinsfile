pipeline {
    agent any
    parameters{
        string(name: 'tomcat_dev', defaultValue: '13.210.122.186', description: 'Staging Server')
        string(name: 'tomcat_prod', defaultValue: '3.27.83.247', description: 'Production Server')
    }


    triggers {
        pollSCM('* * * * *')
    }

    environment {
                    SSH_KEY_FOR_AWS = credentials('SSH_KEY_FOR_AWS')
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
                        bat "scp -i %SSH_KEY_FOR_AWS% **/target/*.war ec2-user@${params.tomcat_dev}:/var/lib/tomcat9/webapps"
                    }
                }

                stage ('Deploy to Production'){
                    steps {
                        bat "scp -i %SSH_KEY_FOR_AWS% **/target/*.war ec2-user@${params.tomcat_prod}:/var/lib/tomcat9/webapps"
                    }
                }
            }
        }

    }



}