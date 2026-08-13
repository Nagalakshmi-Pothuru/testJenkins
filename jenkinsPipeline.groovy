pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'develop',
                url: 'https://github.com/company/playwright-framework.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Regression Tests') {
            steps {
                sh 'npx playwright test'
            }
        }

        stage('Publish Report') {
            steps {
                publishHTML([
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report'
                ])
            }
        }
    }

    post {
        success {
            emailext(
                subject: "SUCCESS: Build ${BUILD_NUMBER}",
                body: "Playwright QA execution completed successfully.",
              //  to: "qa-team@company.com"
            )
        }

        failure {
            emailext(
                subject: "FAILED: Build ${BUILD_NUMBER}",
                body: "Please check Jenkins logs.",
               // to: "qa-team@company.com"
            )
        }
    }
}