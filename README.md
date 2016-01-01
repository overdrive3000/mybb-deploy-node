# Description

MyBB enterprise Forum infrastructure provision tool. This tool helps you to deploy an MyBB Forum application in AWS in a secure, high available and scalable way. It consists of three main components.

* An User Data scripts which creates and prepare the deployment environment.
* Cloudformation templates which has the whole stack description in a json format.
* A fully configurable Node.js provisioning tool which execute the Cloudformation templates using the AWS API.

The main goal is demostrate how to use a Git repository, AWS console, AWSCLI, Cloudformation and the AWS API to create a complete Infrastructure as a Code deployment.


## Installation

To install the application you need to create a new EC2 instance in AWS following the below steps:

* Create an IAM role. As we perform a lot of operations let's select AdministratorAccess Policy for this role.
* Create a SSH KeyPair used to access the infrastructure instances.
* Download the user-data.sh script from https://raw.githubusercontent.com/overdrive3000/mybb-deploy-node/master/user-data.sh
* Edit the user-data.sh script and change the S3_BUCKET varible for the value you want to use. Remenber it has to be an unique name.
* Create a Linux Amazon AMI, t2.micro, by preference in a public subnet with public IP to make the access easier.
* Select the role created previously
* In the "configuration details" section. Go to advanced details select the option "As file" and upload the user-data.sh script.
* Select the appropriate security group to allow SSH access from Internet.
* Select a key pair to access the machine.

At this moment the AWS instance will be launching and self deploying with the nodejs application. Wait a couple of minutes to access the machine.

Access the machine and you have to see a folder named stack_deploy in your home folder. Furthermore nodejs must be installed as well, to test it run "node -v".

That's it the application is installed, let's do some environment pre configurations before start using it.

## Node.js privisioning tool Configuration

The applications has two configuration files under the folder /config:

* aws_config.js, contains configuration parameters for AWS, probably you won't touch this file.
* settings.js, contains all the required configuration to create the stack.

Those files are pretty self-described with comments and default values that will help the user to know what kind of information he has to put there.


### Configuration paramaters

The settings.js file has configuration blocks for any component to be configured in the infrastructure stack.

#### Basic configuration

SSH Key pair to use
```
const keyName				= 'overdrive';
```

Cloudformation stack name
```
const stackName				= 'MyBBForum'; // 
```

S3 bucket name where the main configration assets will be stored, remember you have to use an unique name for S3 buckets, it has to be the same name used in the user-data.sh script
```
const assetsBucketPrefix		= 'jmesa-crossover-deployment';
```

#### VPC configuration

First availability zone to use, remember the name must exists and coincide with the region chosen to install the stack.
```
const vpcAvailabilityZone1	= 'us-west-2a';
```

Second availability zone to use, remember the name must exists and coincide with the region chosen to install the stack.
```
const vpcAvailabilityZone2	= 'us-west-2c';
```

#### RDS database configuration

Database name for the application forum
```
const dbName              = 'mybb_db'; // Database Name
```

Database password to connect to the database
```
const dbPassword          = 'nonsecurepassword'; // Database Password
```

Database username to connecto to the database
```
const dbUser              = 'admin'; // Database User
```

#### Elastic Beanstalk configuration

Bucket name where the bundle app is stored, remember this name have to match with the bucket name used in the user-data.sh script
```
const zipKey				= 'ebs-app-bundle/mybb.zip'; // ZIP bundle to be deployed in Elastic Beanstalk
```

Developer Name, custom name used to create the elastic beanstalk CNAME Prefix
```
const developerName			= `jmesa-${timestamp}`;
```

Environment Name, as Elastic Beanstalk supports environments, you can create the environment you want to deploy the app, like staging, dev, production.
```
const environmentName			= 'production';
```

Applicaition name of the Elastic Beanstalk.
```
const applicationName			= 'MyBB-Forum';
```

## Running the provisioning tool

Once the configuration is done, you have to access the /home/ec2-user/stack_deploy directory. From there you have to use npm to run the provision tasks


```bash
npm run provision
```

That's all you need to execute, this task will create the whole infrastructure as described in the Design Document. The task will monitor the cloudformation states to let you know when the stack is completed created.

Once the stack is complete you have to access to the AWS console in the Elastic Beanstalk section to see the recently created Application environment, look for the CNAME Prefix and click it to open the MyBB Forum.
