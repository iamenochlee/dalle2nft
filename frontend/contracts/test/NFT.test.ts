import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Nft", function() {
  async function deployNFT() {
    const details = {
      name: "Cool NFT",
      symbol: "COOL",
      uris: ["one", "two", "three", "four"],
    };
    const [owner, otherAccount] = await ethers.getSigners();

    const nftContractFactory = await ethers.getContractFactory("NFT");
    const nftContract = await nftContractFactory.deploy(
      details.name,
      details.symbol
    );

    return { nftContract, details, owner, otherAccount };
  }

  async function mintNFTs() {
    const {
      nftContract,
      owner,
      details: { uris },
    } = await loadFixture(deployNFT);
    const txReceipts = await nftContract.bulkMint(owner.address, uris);
    const tx = await txReceipts.wait(1);

    return { tx, txReceipts };
  }

  describe("Deployment", function() {
    it("Should set the right name", async function() {
      const { nftContract, details } = await loadFixture(deployNFT);
      expect(await nftContract.name()).to.exist;
      expect(await nftContract.callStatic.name()).to.equal(details.name);
    });

    it("Should set the right symbol", async function() {
      const { nftContract, details } = await loadFixture(deployNFT);
      expect(await nftContract.symbol()).to.exist;
      expect(await nftContract.callStatic.symbol()).to.equal(details.symbol);
    });

    it("Should set the owner correctly", async function() {
      const { nftContract, owner } = await loadFixture(deployNFT);
      expect(await nftContract.callStatic.owner()).to.equal(owner.address);
    });
  });

  describe("Minting", function() {
    it("Should increment the owner's balance on mint", async function() {
      const {
        nftContract,
        owner,
        details: { uris },
      } = await loadFixture(deployNFT);
      await loadFixture(mintNFTs);
      expect(await nftContract.balanceOf(owner.address)).to.equal(uris.length);
    });

    it("Should allow the owner to mint to any address", async function() {
      const { nftContract, otherAccount } = await loadFixture(deployNFT);
      await expect(nftContract.safeMint(otherAccount.address, "five")).to.not.be
        .reverted;
      expect(await nftContract.balanceOf(otherAccount.address)).to.equal(1);
    });

    it("Emits an event on a mint", async function() {
      const {
        owner,
        nftContract,
        details: { uris },
      } = await loadFixture(deployNFT);
      await loadFixture(mintNFTs);
      const tx = await nftContract.safeMint(owner.address, "five");
      expect(tx)
        .to.emit(nftContract, "Mint")
        .withArgs(owner.address, uris.length + 1, "five");
    });

    it("Emits events on bulkMint", async function() {
      const {
        owner,
        nftContract,
        details: { uris },
      } = await loadFixture(deployNFT);
      const { tx } = await loadFixture(mintNFTs);
      for (let i = 0; i < uris.length; i++) {
        expect(tx)
          .to.emit(nftContract, "Mint")
          .withArgs(owner.address, i, uris[i]);
      }
    });
    it("Should only allow owner to mint", async function() {
      const { nftContract } = await loadFixture(deployNFT);
      const { otherAccount } = await loadFixture(deployNFT);

      await expect(
        nftContract.connect(otherAccount).safeMint(otherAccount.address, "five")
      ).to.be.revertedWith("Ownable: caller is not the owner");

      await expect(
        nftContract
          .connect(otherAccount)
          .bulkMint(otherAccount.address, ["five"])
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should not allow a mint with existing tokenURI", async function() {
      const { nftContract, otherAccount, details } = await loadFixture(
        deployNFT
      );
      await loadFixture(mintNFTs);

      await expect(
        nftContract.safeMint(otherAccount.address, details.uris[0])
      ).to.be.revertedWith("URI: Token URI already exists");

      await expect(
        nftContract.bulkMint(otherAccount.address, details.uris)
      ).to.be.revertedWith("URI: Token URI already exists");
    });
  });

  describe("Requests", function() {
    it("Should return the URI on demand", async function() {
      const {
        nftContract,
        details: { uris },
      } = await loadFixture(deployNFT);
      await loadFixture(mintNFTs);
      for (let i = 0; i < uris.length; i++) {
        const uri = await nftContract.callStatic.tokenURI(i);
        expect(uri).to.equal(uris[i]);
      }
    });

    it("Should return the owner of a certain piece", async function() {
      const {
        nftContract,
        details: { uris },
        owner,
      } = await loadFixture(deployNFT);
      await loadFixture(mintNFTs);
      for (let i = 0; i < uris.length; i++) {
        const ownedBy = await nftContract.callStatic.ownerOf(i);
        expect(ownedBy).to.equal(owner.address);
      }
    });

    it("Should return the count correctly", async function() {
      const {
        nftContract,
        details: { uris },
      } = await loadFixture(deployNFT);
      await loadFixture(mintNFTs);

      expect(await nftContract.count()).to.equal(uris.length);
    });
  });
});
