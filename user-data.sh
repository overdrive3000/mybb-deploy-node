#!/bin/bash -v

# Update and install required packages
yum update -y
yum install -y git

# Configure and clone git repository
ssh-keyscan -H github.com >> /root/.ssh/known_hosts
git clone https://github.com/overdrive3000/mybb-deploy-node.git
git clone https://github.com/overdrive3000/mybb.git

# Configure AWS Cli
aws configure set region us-west-2
aws configure set output json

# Create required AWS resources
aws s3 mb s3://jmesa-crossover-deployment
cd mybb-deploy-node && aws s3 sync cf-templates s3://jmesa-crossover-deployment/cf-templates && cd ..
cd mybb 
git archive --format=zip HEAD > /tmp/mybb.zip
aws s3 cp /tmp/mybb.zip s3://jmesa-crossover-deployment/ebs-app-bundle/mybb.zip
cd ..

# Install node.js
su - ec2-user -c "ssh-keyscan -H github.com >> /home/ec2-user/.ssh/known_hosts"
yum -y groupinstall "Development Tools"
su - ec2-user -c "curl https://raw.githubusercontent.com/creationix/nvm/v0.23.3/install.sh | bash"
su - ec2-user -c "nvm install stable"
# Change the following line with the right repo
su - ec2-user -c "git clone https://github.com/overdrive3000/aws-infra-deployment.git /home/ec2-user/stack_deploy"
su - ec2-user -c "cd /home/ec2-user/stack_deploy; npm install; cd"
