pipeline {
    agent any
    stages {
        stage("Git clone") {
            steps {
                git url: 'https://github.com/jayrajmulani/se-group1-project2', branch: 'main'
            }
        }
        stage("Prerequisite") {
            steps{
                dir('ui'){
                    sh 'npm install'
                }
            }
        }
        // stage('Test Frontend'){
        //     steps{
        //         dir('ui'){
        //             sh 'npm test'
        //         }
        //     }
        // }
        // stage('Test Backend'){
        //     steps {
        //         dir('backend'){
        //             sh 'mvn clean test'
        //         }   
        //     }
        // }
        // stage('Build'){
        //     steps {
        //         dir('spe_majorProject'){
        //             sh 'mvn install'   
        //         }
        //     }
        // }
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