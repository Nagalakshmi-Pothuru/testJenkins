pipeline {
    agent any
    triggers {
        cron('0 9 1 * 1-12')
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code'

                git branch: 'playwrightBdd',
                    url: 'https://github.com/Nagalakshmi-Pothuru/testJenkins.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies'
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                echo 'Installing Playwright browsers'
                bat 'npx playwright install'
            }
        }

        stage('Generate BDD Tests') {
            steps {
                echo 'Generating BDD tests'
                bat 'npx bddgen'
            }
        }

        stage('Execute Tests') {
            steps {
                echo 'Executing Playwright tests'
                bat 'npx playwright test'
            }
        }
    }

    post {

        always {
            echo 'Publishing reports'

            archiveArtifacts(
                artifacts: 'playwright-report/**,test-results/**',
                allowEmptyArchive: true
            )

            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report'
            ])
        }

        success {
            echo 'Playwright tests passed successfully.'
        }

        failure {
            echo 'Playwright tests failed.'

            archiveArtifacts(
                artifacts: 'test-results/**/*.png,test-results/**/*.zip,test-results/**/*.webm',
                allowEmptyArchive: true
            )
        }
    }
}
