FROM ubuntu

run apt-get update
run apt-get install curl -y

run apt-get install build-essential libssl-dev -y
RUN curl   https://raw.githubusercontent.com/creationix/nvm/v0.25.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION=4.5.0
RUN . $HOME/.nvm/nvm.sh && nvm install $NODE_VERSION && nvm alias default $NODE_VERSION && nvm use default
run apt-get install npm -y

run apt-get install python2.7 -y
run curl -O https://bootstrap.pypa.io/get-pip.py
run python2.7 get-pip.py
run pip install awscli

