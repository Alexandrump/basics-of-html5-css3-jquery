pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        script {
          defineVariables();

          echo "Starting Build #${env.BUILD_ID}, triggered by $BRANCH_NAME";

          if(env.runComposer=='true'){
            try {
              sh 'composer install --no-dev --prefer-dist';
            } catch(exc){
              handleException('Composer install failed', exc);
            }
          } else {
            echo 'skipped composer install';
          }

          if(env.runNpm=='true'){
            try {
              sh 'npm install';
            } catch(exc){
              handleException('npm install failed',exc);
            }
          } else {
            echo 'skipped npm install';
          }

          if(env.runBuild=='true'){
            try {
              sh 'npm run sprites';
              if(BRANCH_NAME=='master'){
                sh 'npm run build:prod';
              } else {
                sh 'npm run build';
              }
            } catch(exc){
              handleException('Building the front failed',exc);
            }
          } else {
            echo 'skipped npm sprites & build';
          }
        }

      }
    }

    stage('Deploy') {
      steps {
        script {
          try{
            echo "Deploying $BRANCH_NAME branch"
            def creds = loadCreds("livraison_occitanie_${BRANCH_NAME}_credentials");
            deployCode(creds);
            finalizeDistantMigration(creds);
          } catch(exc){
            handleException("The $BRANCH_NAME branch deployment failed",exc);
          }
        }

      }
    }

    stage('Integration tests') {
      steps {
        script {
          try {
            if(env.runCypress=='true'){
              def host = '';
              if(env.siteUrl){
                host = env.siteUrl;
                echo "Starting integration tests on $host"
                sh "cypress run --env host=$host"
              } else {
                echo 'No host defined to run cypress against';
              }
            } else {
              echo 'Skipped integration tests'
            }
          } catch(exc){
            handleException("Cypress tests failed, which means you have a problem on your $BRANCH_NAME live environment",exc);
          }
        }

      }
    }

    stage('notify') {
      steps {
        script {
          notify(env.slackMsg,env.slackColor)
        }

      }
    }

  }
}