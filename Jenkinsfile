pipeline {
    agent any

    parameters {
        string(name: 'GITHUB_REPO_URL', defaultValue: 'https://github.com/AnkitaAgrawal12/SPE_Major_Project.git', description: 'URL of the GitHub repository')
    }

    stages {
        stage('Workspace Cleanup') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout') {
            steps {
                git branch: 'main', url: "${params.GITHUB_REPO_URL}"
            }
        }

        stage('Maven Build') {
            environment {
                MVN_HOME = tool 'mvn'
            }
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
                ansiblePlaybook(
                    playbook: 'Playbook.yml',
                    inventory: 'Inventory'
                )
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
