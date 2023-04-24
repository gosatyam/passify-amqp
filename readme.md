- Login into the server
  Install Node
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
  ~/.nvm/nvm.sh
  nvm install --lts
- Check node is successfully installed by typing “node –version” in the terminal
- Install redis on machine
  sudo yum install redis
  Run “redis-server” to run the redis server
- In a new connection tab, Copy the code folder into our EC2 machine using scp
  On your local machine
  scp -i "hhla-test.pem" -r passify-node ec2-user@ec2-54-93-248-48.eu-central-1.compute.amazonaws.com:~/.
  Where "hhla-test.pem" should be the path of your pem file relative to your command running folder
- Once copied cd into folder and install node modules using “npm i”
- Run the server “npm run start”
