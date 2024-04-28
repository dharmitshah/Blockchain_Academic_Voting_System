# Blockchain_Academic_Voting_System
DECENTRALIZED VOTING SYSTEM USING ETHEREUM AND WEB3 TECHNOLOGY. 


STEPS FOR RUNNING THE PROJECT: 

Open terminal and clone the entire code from GitHub using the link. 

Command: git clone <link> 

Setup step 1: 

Save the cloned file to desktop and open it in visual basic code editor. 

Setup step 2: 

Open terminal on visual basic code and make sure the current directory is the project folder name and run the following commands 

npm init -y 

npm install --save-dev hardhat 

npm install –save-dev @nomicfoundation/hardhat-toolbox 

npm install dotenv 

Step 1:  

Open https://chainlist.org/ and connect to MetaMask 

Step 2:  

Find test network Amoy and add to MetaMask 

Step 3:  

Go to https://faucet.polygon.technology/ and use your wallet address to get free test MATIC 

Step 4:  

Connect to https://polygonscan.com/ with your discord 

Step 5:  

create a new file named .env under hardhat folder 

Step 6:  

Open the Amoy network and select a running RPC URL from https://chainlist.org/  website 

Example: Amoy RPC URL RPC_URL=https://polygon-amoy-bor-rpc.publicnode.com  

Copy pastes this to .env file for RPC_URL 

Step 7:  

Get the Account 1 (MetaMask) Private key and paste it in .env file as follows- 

PRIVATE_KEY="86c68af39da159b8aab60357f70ddbc3d7ed22dfb684532c168cc62efa504d89" 

Step 7:  

From Polygon scan: https://polygonscan.com/myapikey create a new API key with name VotingKey and copy it to .env file as follows. 

API_KEY="55RR1JK499Y4GJWHWQ77PFHJ7QPH1DDX39" 

Step 8:  

In the visual code terminal run the following steps: 

npx hardhat compile 

npx hardhat run scripts/deploy.js --network polygon. (copy contract address) 

npx hardhat verify --network polygon 0x809b350dcF477bcbc3FDf28Dd2ec8A110D31d0af (Contract Address) 

***** If verify not working on terminal you can check it on following link (Change your contract address in URL) 

 https://amoy.polygonscan.com/address/0x809b350dcF477bcbc3FDf28Dd2ec8A110D31d0af 

Step 9:  

Now deployment is completed. After this, install live server plugin in Visual Studio Code editor for quick access. 

Step 10: 

Right click on index1.html and open it with the live server. This will open the webpage. Make Sure that your default browser should be chrome and MetaMask is also installed in Chrome browser. 

Step 11:  

For the login page: 

Admin Account Login Credentials: 

username – admin 

password – admin123 

Voter Account Login Credentials: 

username – voter  

password- voter123 

Step 12:  

Connect to your MetaMask wallet and run the application. 
