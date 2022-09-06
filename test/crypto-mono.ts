import { expect } from "chai";
import { ethers } from "hardhat";
import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { CryptoMono, CryptoMono__factory } from "../typechain-types";

describe("CryptoMono", function () {
   let deployer: SignerWithAddress;
   let user1 : SignerWithAddress;
   let cryptoMono : CryptoMono;
   beforeEach(async () => {
      [deployer, user1] = await ethers.getSigners();
      cryptoMono = await (
         await new CryptoMono__factory(deployer).deploy(10)
       ).deployed();
    });
   it("Should be able to add funds", async function () {
      await cryptoMono.connect(deployer).addFund({value: ethers.utils.parseEther('1')});
      expect(await ethers.provider.getBalance(cryptoMono.address)).to.be.gt(0);
    });

    it("Should be not able to add funds more than its target", async function () {
      await cryptoMono.connect(deployer).addFund({value: ethers.utils.parseEther('1')});
      expect(await ethers.provider.getBalance(cryptoMono.address)).to.be.gt(0);
      await expect(cryptoMono.connect(deployer).addFund({value: ethers.utils.parseEther('11')})).to.be.
      revertedWith('Target already achieved!');
    });

    it("Should be possible to withdraw funds for onwer", async function () {
      await cryptoMono.connect(deployer).addFund({value: ethers.utils.parseEther('1')});
      await cryptoMono.connect(deployer).withdraw();
    });

    it("Should be impossible to withdraw funds for any another address", async function () {
      await cryptoMono.connect(deployer).addFund({value: ethers.utils.parseEther('1')});
      await expect(cryptoMono.connect(user1).withdraw()).to.be.
      revertedWith('Ownable: caller is not the owner');
    });
});