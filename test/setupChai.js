const chai = require("chai");

const bn = web3.utils.BN;

const chaiBn = require("chai-bn")(bn);
chai.use(chaiBn);

const chaiAsPromissed = require("chai-as-promised");

chai.use(chaiAsPromissed);

module.exports = chai;