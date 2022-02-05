import fs from "fs";
import { ethers, artifacts } from "hardhat";
import { Greeter } from "../typechain-types";

async function main() {
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter: Greeter = (await Greeter.deploy("Token")) as Greeter;
  await greeter.deployed();
  saveContract(greeter, "Greeter");
}

function saveContract(contract: any, name: string) {
  const path = __dirname + "/../exports/" + name;
  if (!fs.existsSync(path)) fs.mkdirSync(path);
  fs.writeFileSync(
    `${path}/address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );
  fs.writeFileSync(
    `${path}/abi.json`,
    JSON.stringify(artifacts.readArtifactSync(name), undefined, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
