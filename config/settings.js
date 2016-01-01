import path from 'path';

const timestamp = new Date().getTime();

const projectRoot						= path.dirname(__dirname);

// Basic configuration
const keyName								= 'overdrive'; // SSH Key Pair to use
const stackName							= 'MyBBForum'; // Stack Name
const templateURL						= 'https://s3.amazonaws.com/jmesa-crossover-deployment/cf-templates/mybb-master.json'; // Master template URL

// VPC configuration
const vpcAvailabilityZone1	= 'us-west-2a';
const vpcAvailabilityZone2	= 'us-west-2c';

// RDS database configuration
const dbName              = 'mybb_db'; // Database Name
const dbPassword          = 'nonsecure-password'; // Database Password
const dbUser              = 'admin'; // Database User

// Elastic Beanstalk configuration
const zipKey							= 'ebs-app-bundle/mybb.zip'; // ZIP bundle to be deployed in Elastic Beanstalk
const developerName				= `jmesa-${timestamp}`;
const environmentName			= 'production';
const applicationName			= 'MyBB-Forum';


export default {
  keyName:							keyName,
  stackName:						stackName,
	templateURL:					templateURL,
	vpcAvailabilityZone1:	vpcAvailabilityZone1,
	vpcAvailabilityZone2:	vpcAvailabilityZone2,
  dbName:								dbName,
  dbPassword:						dbPassword,
  dbUser:								dbUser,
	zipKey:								zipKey,
	developerName:				developerName,
	environmentName:			environmentName,
	applicationName:			applicationName
}
