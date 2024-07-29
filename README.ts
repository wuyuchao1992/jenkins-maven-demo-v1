withCredentials([usernamePassword(credentialsId: 'my-credentials-id', passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME')]) {
    sh 'echo $USERNAME'
    sh 'echo $PASSWORD'
}
