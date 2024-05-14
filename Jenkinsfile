pipeline {
    agent any

    environment {
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
		dir('./BACKEND') {
		docker.build("ankitaagrawal12/prosepetals-backend", '.')
                }
                 dir('./FRONTEND') {
                 docker.build("ankitaagrawal12/prosepetals-frontend", '.')
                }
              }
           }
        }
      stage('Push Docker Images') {
       steps {
         script {
            docker.withRegistry('', 'DockerHubCred') {
                sh 'docker push ankitaagrawal12/demo-frontend:latest'
		sh 'docker push ankitaagrawal12/demo-backend:latest'
              }
           }
        }
      }
   }
}
