pipeline {
    agent any

    environment {
        GITHUB_REPO_URL = 'https://github.com/AnkitaAgrawal12/SPE_Major_Project.git'
	MVN_HOME = tool 'mvn' 
     }
     stages{
	stage('Cleanup') {
            steps {
                script{   
                sh 'docker rm -f prosepetals-frontend'
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

	  stage('Maven Build') {
             steps {
             dir('./BACKEND/ProsePetal') {
                  sh "${MVN_HOME}/bin/mvn clean install" 
               }
            }
        }

        stage('Build Docker Images') {	
            steps {
               script {
		dir('./BACKEND/ProsePetal') {
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
                sh 'docker push ankitaagrawal12/prosepetals-frontend:latest'
		sh 'docker push ankitaagrawal12/prosepetals-backend:latest'
              }
           }
        }
      }
      stage('Run Ansible Playbook') {
            steps {
                script {
                    ansiblePlaybook(
                        playbook: 'Playbook.yml',
                        inventory: 'Inventory'
                     )
                }
            }
        }
   }
}
