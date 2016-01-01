#!/bin/bash -v

S3_BUCKET="jmesa-crossover-deployment"

# Update and install required packages
yum update -y
yum install -y git

# Configure and clone git repository
su - ec2-user -c "git clone https://github.com/overdrive3000/mybb-deploy-node.git /home/ec2-user/stack_deploy"
su - ec2-user -c  "git clone https://github.com/overdrive3000/mybb.git /home/ec2-user/mybb"

# Configure AWS Cli
su - ec2-user -c "aws configure set region us-west-2"
su - ec2-user -c "aws configure set output json"

# Create required AWS resources
su - ec2-user -c "aws s3 mb s3://$S3_BUCKET"
su - ec2-user -c "cd /home/ec2-user/stack_deploy && aws s3 sync cf-templates s3://$S3_BUCKET/cf-templates && cd"
su - ec2-user -c "cd /home/ec2-user/mybb && git archive --format=zip HEAD > /tmp/mybb.zip && aws s3 cp /tmp/mybb.zip s3://$S3_BUCKET/ebs-app-bundle/mybb.zip"

# Install node.js
yum -y groupinstall "Development Tools"
su - ec2-user -c "curl https://raw.githubusercontent.com/creationix/nvm/v0.23.3/install.sh | bash"
su - ec2-user -c "nvm install stable"
su - ec2-user -c "echo 'nvm use stable' >> /home/ec2-user/.bashrc"
su - ec2-user -c "cd /home/ec2-user/stack_deploy; npm install; cd"
