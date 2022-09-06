// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract CryptoMono is Ownable{
   uint256 public target;
   constructor(uint256 _target){
      target = _target * 10 ** 18;
   }
   function addFund() public payable{
        require(address(this).balance < target, "Target already achieved!");
   }
   
   function withdraw(address _beneficiary) public onlyOwner{
      payable(_beneficiary).transfer(address(this).balance);
   }
}