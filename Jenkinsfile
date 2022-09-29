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

    stage('SonarQube analysis') {
      parallel {
        stage('SonarQube analysis') {
          steps {
            script {
              def scannerHome = tool 'sonar-scanner ';
              withSonarQubeEnv('SonarCloud') {
                sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=luismateoh_dogdir-cicd -Dsonar.organization=luismateoh"
              }
            }

          }
        }

        stage('') {
          steps {
            sh 'sonar-scanner'
          }
        }

      }
    }

    stage('Quality gate') {
      steps {
        script {
          def qualitygate = waitForQualityGate()
          sleep(10)
          if (qualitygate.status != "OK") {
            waitForQualityGate abortPipeline: true
          }
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