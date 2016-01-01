#!/bin/bash -v

# Update and install required packages
yum update -y
yum install -y git
yum install -y mysql

# Configure and clone git repository
su - ec2-user -c "git clone https://github.com/overdrive3000/mybb-deploy-node.git /home/ec2-user/stack_deploy"
git clone https://github.com/overdrive3000/mybb-deploy-node.git

# Configure AWS Cli
aws configure set region us-west-2
aws configure set output json

# Create required AWS resources
aws s3 mb s3://jmesa-crossover-deployment
cd mybb-deploy-node && aws s3 sync cf-templates s3://jmesa-crossover-deployment/cf-templates && cd
cd mybb 
git archive --format=zip HEAD > /tmp/mybb.zip
aws s3 cp /tmp/mybb.zip s3://jmesa-crossover-deployment/ebs-app-bundle/mybb.zip
cd ..

# Install node.js
yum -y groupinstall "Development Tools"
su - ec2-user -c "curl https://raw.githubusercontent.com/creationix/nvm/v0.23.3/install.sh | bash"
su - ec2-user -c "nvm install stable"
su - ec2-user -c "echo 'nvm use stable' >> /home/ec2-user/.bashrc"
su - ec2-user -c "cd /home/ec2-user/stack_deploy; npm install; cd"

# Get Controller Node PublicIP
su - ec2-user -c "curl http://169.254.169.254/latest/meta-data/public-ipv4 > /home/ec2-user/.publicip"
