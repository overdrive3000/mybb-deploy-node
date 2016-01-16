import path from 'path';

const timestamp = new Date().getTime();

const projectRoot           = path.dirname(__dirname);

// Basic configuration
const keyName               = 'overdrive'; // SSH Key Pair to use
const stackName             = 'MyBBForum'; // Stack Name
const assetsBucketPrefix    = 'jmesa-crossover-deployment';

// SNS Topic Configuration
const operatorEMail         = 'linuxven@gmail.com';

// VPC configuration
const vpcAvailabilityZone1  = 'us-west-2a';
const vpcAvailabilityZone2  = 'us-west-2c';

// RDS database configuration
const dbName              = 'mybb_db'; // Database Name
const dbPassword          = 'nonsecurepassword'; // Database Password
const dbUser              = 'admin'; // Database User

// Elastic Beanstalk configuration
const zipKey              = 'ebs-app-bundle/mybb.zip'; // ZIP bundle to be deployed in Elastic Beanstalk
const developerName       = `jmesa-${timestamp}`;
const environmentName     = 'production';
const applicationName     = 'MyBB-Forum';


export default {
  keyName:              keyName,
  stackName:            stackName,
  assetsBucketPrefix:   assetsBucketPrefix,
  operatorEMail:        operatorEMail,
  vpcAvailabilityZone1: vpcAvailabilityZone1,
  vpcAvailabilityZone2: vpcAvailabilityZone2,
  dbName:               dbName,
  dbPassword:           dbPassword,
  dbUser:               dbUser,
  zipKey:               zipKey,
  developerName:        developerName,
  environmentName:      environmentName,
  applicationName:      applicationName
}
