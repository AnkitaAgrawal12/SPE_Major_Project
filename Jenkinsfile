pipeline {
    agent any

    parameters {
        string(name: 'GIT_BRANCH', defaultValue: 'main', description: 'Git branch to build')
    }

    environment {
        GITHUB_REPO_URL = 'https://github.com/AnkitaAgrawal12/SPE_Major_Project.git'
        ANSIBLE_VAULT_PASSWORD_FILE = './vault.txt'
        DOCKER_HUB_CREDENTIALS = 'DockerHubCred'
    }

    stages {
        stage('Cleanup') {
            steps {
                script {
                    sh 'docker rm -f prosepetals-frontend || true'
                    sh 'docker rm -f prosepetals-backend || true'
                    sh 'docker rm -f database-container || true'
                }
            }
        }

        stage('Checkout') {
            steps {
                script {
                    git branch: params.GIT_BRANCH, url: "${GITHUB_REPO_URL}"
                }
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
                    def backendImage = "ankitaagrawal12/prosepetals-backend:${env.BUILD_ID}"
                    def frontendImage = "ankitaagrawal12/prosepetals-frontend:${env.BUILD_ID}"
                    dir('./BACKEND/ProsePetal') {
                        docker.build(backendImage, '.')
                    }
                    dir('./FRONTEND') {
                        docker.build(frontendImage, '.')
                    }
                    env.BACKEND_IMAGE = backendImage
                    env.FRONTEND_IMAGE = frontendImage
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('', DOCKER_HUB_CREDENTIALS) {
                        sh "docker push ${env.BACKEND_IMAGE}"
                        sh "docker push ${env.FRONTEND_IMAGE}"
                    }
                }
            }
        }

        stage('Run Ansible Playbook') {
            steps {
                ansiblePlaybook(
                    playbook: 'Playbook.yml',
                    inventory: 'Inventory',
                    extraVars: [
                        backend_image: env.BACKEND_IMAGE,
                        frontend_image: env.FRONTEND_IMAGE
                    ],
                    vaultCredentialsId: 'ANSIBLE_VAULT_PASSWORD_FILE'
                )
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
            cleanWs()
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
