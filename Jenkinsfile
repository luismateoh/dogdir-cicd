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

        stage('error') {
          steps {
            sh '''export SONAR_SCANNER_VERSION=4.7.0.2747
export SONAR_SCANNER_HOME=$HOME/.sonar/sonar-scanner-$SONAR_SCANNER_VERSION-linux
curl --create-dirs -sSLo $HOME/.sonar/sonar-scanner.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-$SONAR_SCANNER_VERSION-linux.zip
unzip -o $HOME/.sonar/sonar-scanner.zip -d $HOME/.sonar/
export PATH=$SONAR_SCANNER_HOME/bin:$PATH
export SONAR_SCANNER_OPTS="-server"'''
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