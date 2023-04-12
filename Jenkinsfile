pipeline {
    agent any
    parameters{
        string(name: 'tomcat_dev', defaultValue: '52.63.242.112', description: 'Staging Server')
    }


    triggers {
        pollSCM('* * * * *')
    }

//     environment {
//                     SSH_KEY_FOR_AWS = credentials('SSH_KEY_FOR_AWS')
//                 }

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
                        withCredentials([file(credentialsId:'SSH_KEY_FOR_AWS', variable:'ssh_key')]){
                             sh "scp -i ${ssh_key} **/target/*.war ec2-user@${params.tomcat_dev}:/var/lib/tomcat9/webapps"
                        }
                    }
                }
            }
        }
    }

}