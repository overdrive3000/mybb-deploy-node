import { CloudFormation } from 'aws-sdk';
import config from '../config/aws_config';
import settings from '../config/settings';
import _ from 'underscore';

export default (templateURL) => new Promise((resolve, reject) => {
  const cloudformation = new CloudFormation();
  
  let params = {
    StackName: settings.stackName,
    Capabilities: [
      'CAPABILITY_IAM'
    ],
    Parameters: [
      {
        ParameterKey: 'KeyName',
        ParameterValue: settings.keyName
      },
      {
        ParameterKey: 'VPCAvailabilityZone1',
        ParameterValue: settings.vpcAvailabilityZone1
      },
      {
        ParameterKey: 'VPCAvailabilityZone2',
        ParameterValue: settings.vpcAvailabilityZone2
      },
      {
        ParameterKey: 'DatabaseName',
        ParameterValue: settings.dbName
      },
      {
        ParameterKey: 'DatabasePassword',
        ParameterValue: settings.dbPassword
      },
      {
        ParameterKey: 'DatabaseUser',
        ParameterValue: settings.dbUser
      },
			{
				ParameterKey: 'ZipKey',
				ParameterValue: settings.zipKey
			},
			{
				ParameterKey: 'DeveloperName',
				ParameterValue: settings.developerName
			},
			{
				ParameterKey:	'EnvironmentName',
				ParameterValue: settings.environmentName
			}
    ],
    TemplateURL: templateURL
  };

  cloudformation.createStack(params, function(err, data){
    if (err) {
      console.log(err, err.stack);
      reject(err);
    } else {
      console.log(data);
      resolve(data);
    }
  });
});
