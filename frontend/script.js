const connectWalletMsg=document.querySelector('#connectWalletMessage');
const connectWalletBtn=document.querySelector('#connectWallet');
const votingStation=document.querySelector('#votingStation');
const timerTime=document.querySelector('#time');
const timerMessage=document.querySelector('#timerMessage');
const mainBoard=document.querySelector('#mainBoard');
const voteForm=document.querySelector('#voteForm');
const vote=document.querySelector('#vote');
const voteBtn=document.querySelector('#sendVote');
const showResultContainer=document.querySelector('#showResultContainer');
const showResult=document.querySelector('#showResult');
const result=document.querySelector('#result');
const admin=document.querySelector('#admin');
const candidates=document.querySelector('#candidates');
const electionDuration=document.querySelector('#electionDuration');
const startAnElection=document.querySelector('#startAnElection');
const candidate=document.querySelector('#candidate');
const addTheCandidate=document.querySelector('#addTheCandidate');

//Contract Address deployed: 0x809b350dcF477bcbc3FDf28Dd2ec8A110D31d0af
const contractAddress='0x809b350dcF477bcbc3FDf28Dd2ec8A110D31d0af';
const contractABI= [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "addCandidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "candidates",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "numberOfVotes",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "checkElectionPeriod",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "electionStarted",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "electionTimer",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "listOfVoters",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "resetAllVoterStatus",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "retrieveVotes",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "numberOfVotes",
              "type": "uint256"
            }
          ],
          "internalType": "struct Voting.Candidate[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string[]",
          "name": "_candidates",
          "type": "string[]"
        },
        {
          "internalType": "uint256",
          "name": "_votingDuration",
          "type": "uint256"
        }
      ],
      "name": "startElection",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "voteTo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_voter",
          "type": "address"
        }
      ],
      "name": "voterStatus",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "voters",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "votingEnd",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "votingStart",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

let contract;
let signer;

const provider=new ethers.providers.Web3Provider(window.ethereum, 80002);
provider.send("eth_requestAccounts",[]).then(()=>{
    provider.listAccounts().then((accounts)=>{
        signer=provider.getSigner(accounts[0])
        contract=new ethers.Contract(contractAddress, contractABI, signer)

    });
});

//This function is used to show all candidates information
const getAllCandidates=async function(){
    if(document.getElementById("candidateBoard")){
        document.getElementById("candidateBoard").remove();
    }
    let board=document.createElement("table");
    board.id="candidateBoard";
    mainBoard.appendChild(board);

    let tableHeader=document.createElement("tr");
    tableHeader.innerHTML =`<th>ID No.</th>
                            <th>Candidate</th>`;
    board.appendChild(tableHeader);

    let candidates = await contract.retrieveVotes();
    for(let i=0; i<candidates.length; i++){
        let candidate=document.createElement("tr");
        candidate.innerHTML=`<td>${parseInt(candidates[i][0])}</td>
                                <td>${candidates[i][1]}</td>`;
        board.appendChild(candidate);

    }
}

//This function is used to show candidates result
const getResult=async function() {
    result.style.display= "flex";

    if(document.getElementById('resultBoard')){
      document.getElementById('resultBoard').remove();
    }
    let candidates=await contract.retrieveVotes();
    let owner = await contract.owner();
    if(owner == signer._address){
      let resultBoard=document.createElement("table");
      resultBoard.id="resultBoard";
      result.appendChild(resultBoard);

      let tableHeader = document.createElement("tr");
      tableHeader.innerHTML=`<th> ID No. </th>
                              <th> Candidate </th>
                              <th> Number of Votes</th>`;
      resultBoard.appendChild(tableHeader);

     // let candidates=await contract.retrieveVotes();
      for(let i = 0; i < candidates.length; i++){
          let candidate=document.createElement("tr");
          candidate.innerHTML=`<td>${parseInt(candidates[i][0])}</td>
                              <td>${candidates[i][1]}</td>
                              <td>${parseInt(candidates[i][2])}<td>`;
          resultBoard.appendChild(candidate);
      }
    } else {
      //let candidates=await contract.retrieveVotes();
      if (candidates.length > 0) {
          // Find the candidate with the maximum number of votes
          let maxVotesCandidate = candidates[0];
          for (let i = 1; i < candidates.length; i++) {
              if (parseInt(candidates[i][2]) > parseInt(maxVotesCandidate[2])) {
                  maxVotesCandidate = candidates[i];
              }
          }

          // Display the candidate with the maximum votes as a one-line text with red color
        let winnerText = document.createElement("p");
        winnerText.style.color = "red";
        winnerText.style.fontWeight = "bold";
        winnerText.style.fontSize = "1.2em"; // Change the font size to your desired value
        winnerText.textContent = `Winner: Candidate ${parseInt(maxVotesCandidate[0])}, ${maxVotesCandidate[1]}, with ${parseInt(maxVotesCandidate[2])} votes`;
        result.appendChild(winnerText);
      }
    }
}

//This function autorefresh the state of the smart contract to show updated information
const refreshPage = function() {
    setInterval(async() => {
        let time = await contract.electionTimer();

        if(time>0){
            timerMessage.innerHTML = `<span id ="time">${time}</span> seconds/s left.`;
            let owner = await contract.owner();
            if(owner == signer._address){
                admin.style.display = "flex";
                // Hide the vote form for admin users
                voteForm.style.display = 'none';
            } else {
              // Show the vote form for non-admin users
              
              voteForm.style.display = 'flex';
              showResultContainer.style.display = 'none';
            }
        }else {
            timerMessage.textContent = "Either there's no election yet or the election already ended";
            voteForm.style.display = 'none';
            showResultContainer.style.display = 'block';

        }
    }, 1000);

    setInterval(async() => {
        getAllCandidates();
    }, 10000);
}

//This function sends the vote to Ethereum network using MetaMask wallet
const sendVote=async function() {
    await contract.voteTo(vote.value);
    vote.value="";

}

//This function shows input fields to start election and autorefresh with updated data once election is started.  
//This is displayed only to system manager
const startElection = async function() {
    if(!candidates.value){
        alert('list of candidates is empty');
    }
    if(!electionDuration.value){
        alert("please set the election duration");
    }

    const _candidates=candidates.value.split(",");
    const _votingDuration=electionDuration.value;

    await contract.startElection(_candidates, _votingDuration);
    refreshPage();

    candidates.value="";
    electionDuration.value="";

    //voteForm.style.display="flex";
    showResultContainer.style.display="none";

}

//This function show input to add candidate in ongoing election. This is displayed only to system manager
const addCandidate=async function() {
    if(!candidate.value){
        alert('please provide the candidate name first');
    }

    await contract.addCandidate(candidate.value);
    refreshPage();
    candidate.value="";
}

//This function shows all candidate information and allows voter to send vote.
const getAccount = async function() {
    const ethAccounts = await provider.send("eth_requestAccounts", []).then(()=>{
        provider.listAccounts().then((accounts) => {
            signer = provider.getSigner(accounts[0]);
            contract = new ethers.Contract(contractAddress, contractABI, signer)
        });
    });

    connectWalletBtn.textContent = signer._address.slice(0,10) + "...";
    connectWalletMsg.textContent = "You are currently connected...";
    connectWalletBtn.disabled = true;

    let owner = await contract.owner();
    if(owner == signer._address){
        admin.style.display = "flex";
        
        let time = await contract.electionTimer();
        if(time == 0){
            contract.checkElectionPeriod();
        }
        // Hide the vote form for admin users
        voteForm.style.display = 'none';
    } else {
      // Show the vote form for non-admin users
      voteForm.style.display = 'block';
  }

    votingStation.style.display = "block";

    refreshPage();
    getAllCandidates();
};

//This function is used to login into the system and validates admin, voter credentials
document.getElementById('login').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  
  // Fetch username and password values
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // Check username and password (replace this with your actual authentication logic)
  if (username === 'admin' && password === 'admin123') {
      // If credentials are correct, show voting components
      document.getElementById('loginForm').style.display = 'none';
      document.getElementById('connectMetamask').style.display = 'block';
      document.getElementById('admin').style.display = 'block';
      addLogoutButton(); // Add the logout button dynamically
  } 
  if (username === 'voter' && password === 'voter123') {
    // If credentials are correct, show voting components
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('connectMetamask').style.display = 'block';
    // Show voting components for voter user
    document.getElementById('admin').style.display = 'none'; // Hide admin components for voter user
    document.getElementById('votingStation').style.display = 'block';
    document.getElementById('voteForm').style.display = 'block'; // Show the "Send Vote" functionality
    addLogoutButton(); // Add the logout button dynamically

  } else {
      // If credentials are incorrect, display an error message
      document.getElementById('error-message').innerText = 'Invalid username or password';
  }
});


// Function to add logout button dynamically
function addLogoutButton() {
    var logoutButton = document.createElement('button');
    logoutButton.id = 'logoutButton';
    logoutButton.style.position = 'fixed';
    logoutButton.style.top = '10px';
    logoutButton.style.right = '10px';
    logoutButton.textContent = 'Logout';
    logoutButton.addEventListener('click', function() {
        // Handle logout
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('connectMetamask').style.display = 'none';
        document.getElementById('admin').style.display = 'none';
        document.getElementById('votingStation').style.display = 'none';
        document.getElementById('voteForm').style.display = 'none';
        document.getElementById('logoutButton').remove(); // Remove the logout button
    });
    document.body.appendChild(logoutButton);
}

// Add event listeners
connectWalletBtn.addEventListener('click', getAccount);
showResult.addEventListener('click', getResult);
voteBtn.addEventListener('click',sendVote);
addTheCandidate.addEventListener('click', addCandidate);
startAnElection.addEventListener('click', startElection);
