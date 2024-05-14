pipeline {
    agent any

    environment {
        GITHUB_REPO_URL = 'https://github.com/AnkitaAgrawal12/SPE_Major_Project.git'
     }
     stages{
        stage('Cleanup') {
            steps {
                script{   
                sh 'docker rm -f prosepetals-backend'
                }
            }
        }
	  stage('Checkout'){
	    steps{
		script{
		git branch: 'main', url: "${GITHUB_REPO_URL}"
            }
         }
       }
        stage('Build Docker Images') {
            steps {
                dir('./BACKEND') {
                    sh 'docker build -t sejal28/prosepetals-backend .'
                }
                dir('./FRONTEND') {
                    sh 'docker build -t sejal28/prosepetals-frontend .'
                }
            }
        }
     }
}
