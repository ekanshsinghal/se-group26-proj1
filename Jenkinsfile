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
                    sh 'sudo docker build -t jayrajmulani/jobtrackr_ui .'
                    sh 'sudo docker push jayrajmulani/jobtrackr_ui'
                }
                dir('backend'){
                    sh 'sudo docker build -t jayrajmulani/jobtrackr_backend .'
                    sh 'sudo docker push jayrajmulani/jobtrackr_backend'
                }
            }
        }
        stage('Ansible Deploy') {
             steps {
                  ansiblePlaybook colorized: true, disableHostKeyChecking: true, installation: 'Ansible', inventory: 'Inventory', playbook: 'deploy.yml'
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