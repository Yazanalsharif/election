const electionContract = artifacts.require("Election");

const chai = require("./setupChai.js");

const BN = web3.utils.BN;

const expect = chai.expect;

contract("test election contract", async (accounts) => {
    const [voter1, voter2, voter3] = accounts;
    it("you can voting to only two candidate", async () => {
        const instance = await electionContract.deployed();
        const numOfCandidates = await instance.getNumOfCandidate();
      return expect(numOfCandidates).to.be.bignumber.equal(new BN(2));
    });
    /*
             ***************************************************************************
          this test for determineCandidate function is internal so we can't interect with it outside 
          the smartContract but if it's public  we can so i tested it like public function
            ***************************************************************************

    it("you can't add another candidate with same id", async() => {
        const instance = await electionContract.deployed();
        const numOfCandidates = await instance.getNumOfCandidate();
        expect(numOfCandidates).to.be.bignumber.equal(new BN(2));
        let name = "yazanalsharif";
        let voters = 0;
        expect(instance.determineCandidate(name, new BN(voters))).to.eventually.be.rejected;
        expect(await instance.getNumOfCandidate()).to.be.bignumber.equal(new BN(2));
    });
    it("you can add another candidate ", async () => {
        const instance = await electionContract.deployed();
        let candidates = await instance.getNumOfCandidate();
        expect(await instance.getNumOfCandidate()).to.be.bignumber.equal(new BN(candidates));
        expect(instance.determineCandidate("ameen", 0)).to.eventually.be.fulfilled;
        candidates = candidates.add(new BN(1));
        expect(await instance.getNumOfCandidate()).to.be.bignumber.equal(candidates);
    })

             ***************************************************************************
          this test for determineCandidate function is internal so we can't interect with it outside 
          the smartContract but if it's public  we can so i tested it like public function
             ***************************************************************************
    */
   //test voting function
   it("you can vote to your candidate", async () => {
       let id = 0;//argument to voteToCandidate function for voting to specific candidate
       const instance = await electionContract.deployed();
       expect(instance.voteToCandidate(new BN(id))).to.eventually.be.fulfilled;
       const candidate = await instance.candidates(0);
       expect(candidate.votersNum).to.be.bignumber.equal(new BN(1));
       expect(await instance.getNumOfVoters()).to.be.bignumber.equal(new BN(1));
       expect(await instance.voters(voter1)).to.be.true;
   });

   //test voting function
   it("you can't voting twice", async() => {
    let id = 0;//argument to voteToCandidate function for voting to specific candidate
    const instance = await electionContract.deployed();
    expect(instance.voteToCandidate(new BN(id))).to.eventually.be.rejected;
    const candidate = await instance.candidates(0);
    expect(candidate.votersNum).to.be.bignumber.equal(new BN(1));
    expect(await instance.getNumOfVoters()).to.be.bignumber.equal(new BN(1));
   });
   
   

})
