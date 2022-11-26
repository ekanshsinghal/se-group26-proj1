pipeline {
    agent any
    stages {
        stage("Git clone") {
            steps {
                git url: 'https://github.com/jayrajmulani/se-group1-project2', branch: 'main'
            }
        }
        stage('Docker Build and Push'){
            steps {
                dir('ui'){
                    sh 'docker build -t jayrajmulani/jobtrackr_ui .'
                    sh 'docker push jayrajmulani/jobtrackr_ui'
                }
                dir('backend'){
                    sh 'docker build -t jayrajmulani/jobtrackr_backend .'
                    sh 'docker push jayrajmulani/jobtrackr_backend'
                }
            }
        }
        stage('Ansible Deploy') {
             steps {
                  ansiblePlaybook colorized: true, disableHostKeyChecking: true, installation: 'Ansible', inventory: 'inventory', playbook: 'deploy.yml'
             }
        }
    }
    post {
        always {
            echo 'One way or another, I have finished'
            deleteDir() /* clean up our workspace */
        }
    }
}