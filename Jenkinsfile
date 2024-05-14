pipeline {
    agent any

    environment {
	DOCKER_IMAGE_NAME = 'demo-frontend'  
        GITHUB_REPO_URL = 'https://github.com/AnkitaAgrawal12/SPE_Major_Project.git'
     }
     stages{
	  stage('Checkout'){
	    steps{
		script{
		git branch: 'main', url: "${GITHUB_REPO_URL}"
            }
         }
       }
        stage('Build Docker Images') {	
            steps {
               script {
                 dir('./FRONTEND') {
                 // Build Docker image
                 docker.build("ankitaagrawal12/demo-frontend", '.')
                }
              }
           }
        }
        stage('Push Docker Images') {
            steps {
                 script{
                    docker.withRegistry('', 'DockerHubCred') {
                    sh 'docker tag demo-frontend ankitaagrawal12/demo-frontend:latest'
                    sh 'docker push ankitaagrawal12/demo-frontned'
                    }
                 }
            }
        }     
     }
}
