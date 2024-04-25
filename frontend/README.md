# Frontend
This is the React frontend for the BidBot project. It is a web application that allows users to upload proposals, RFPs and chat with BidBot.

## How to run
### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18.18.0 or higher)
- [yarn](https://yarnpkg.com/) (v1.22.19 or higher)

### Setting up the environment
1. Open the project in Visual Studio Code
2. Add an `.env` file to the root of the project with the following contents (replace the values with the correct ones):
```
REACT_APP_PROCESS_RFP_KEY="<Key to the processRFP function of the DocumentProcessor Function App>"
REACT_APP_GENERATION_REQUEST_KEY="<Key to the generationRequest function of the LLMService Function App>"
REACT_APP_PROCESS_PROPOSAL_KEY="<Key to the processProposal function of the DocumentProcessor Function App>"
```
3. Install the dependencies by running the following command in the terminal:
```
yarn install
```

### Running the frontend
1. Open the project in Visual Studio Code
2. Run the following command in the terminal:
```
yarn start
```
3. The frontend should now be running on `http://localhost:3000/`