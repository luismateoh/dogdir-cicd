pipeline {
  agent any
  stages {
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      parallel {
        stage('Build') {
          steps {
            sh 'npm run build'
          }
        }

        stage('Run Test') {
          steps {
            sh 'npm run sonar-test'
          }
        }

      }
    }

    stage('build && SonarQube analysis') {
      steps {
        withSonarQubeEnv('My SonarQube Server') {
          sh 'npm run sonar'
        }

      }
    }

    stage('Quality Gate') {
      steps {
        timeout(time: 1, unit: 'HOURS') {
          waitForQualityGate true
        }

      }
    }

    stage('Success') {
      steps {
        echo 'Success'
      }
    }

  }
  environment {
    SONAR_TOKEN = 'b013c5a5ae9aeb5fdf2b469d15a41ca263826194'
  }
}