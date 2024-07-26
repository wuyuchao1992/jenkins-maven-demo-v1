 environment {
        MY_SECRET_TEXT = credentials('my-secret-text-id') // Replace with your actual credentials ID
        MY_USERNAME_PASSWORD = credentials('my-username-password-id')
    }

         echo "Using secret text: ${env.MY_SECRET_TEXT}"
                    echo "Using username: ${env.MY_USERNAME_PASSWORD_USR}"
                    echo "Using password: ${env.MY_USERNAME_PASSWORD_PSW}"
