const ipfs = require('./ipfs');
const fs = require('fs');

const electionApi = require('../../app/ethereum/api/election.api');
const config = require('../../config');

const addPublicKeyOfHe = async (contractAddress, ownerAddress) => {
    const publicKeyFilePath = `${config.root}/data/publicKey/${contractAddress}.bin`;
    const publicKeyFile = fs.readFileSync(publicKeyFilePath);
    let buffer = new Buffer.from(publicKeyFile);

    console.log("add publicKey to IPFS.....");
    return new Promise((resolve, reject) => ipfs.files.add(buffer, async (err, res) => {
        if (err) {
            return reject(err);
        }
        const publicKeyFileHash = res[0].hash;
        console.log(`publicKey Hash : ${publicKeyFileHash}`);
        await electionApi.setPublicKeyOfHe(contractAddress, ownerAddress, publicKeyFileHash);
        console.log("ipfs-contract saved.");
        resolve(true);
    }));
};

module.exports = addPublicKeyOfHe;
