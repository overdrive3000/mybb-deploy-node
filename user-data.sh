#!/bin/bash -v

yum update -y
aws configure set region us-west-2
aws configure set output json
aws s3 mb s3://jmesa-crossover-deployment
