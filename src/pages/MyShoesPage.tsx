import { useDisclosure } from "@nextui-org/react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ShoeModal from "../components/ShoeModal";
import { useEffect, useState } from "react";

import { ethers, BigNumberish } from "ethers";

export const MyShoesPageWrapper = styled.div`
  display: flex;
  background-color: #27272a;
  width: 100vw;
  height: 100vh;
  margin-top: 90px;
  justify-content: center;
  align-items: center;
`;

export const MyShoesPageBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #3f3f46;
  width: 90vw;
  height: 84vh;
  margin-bottom: 90px;
  border-radius: 12px;
`;

const EquipShoes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 0;
  color: #ffffff;
  font-size: 18px;
  margin-top: 30px;
`;

const EquipShoesImageBox = styled.div`
  margin-top: 14px;
  margin-bottom: 14px;
  background-color: #71717a;
  border-radius: 14px;
`;

const EquipShoesImage = styled.img`
  padding: 10px;
`;

export const StatusBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 0;
`;

export const Status = styled.div`
  display: flex;
  flex-direction: column;
  width: 82vw;
  height: 100%;
  margin-top: 20px;
  background-color: #27272a;
  border-radius: 8px;
  color: #ffffff;
  font-size: 18px;
  padding: 20px;
`;

export const StatusRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ShoesInventoryBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 2;
  margin-top: 20px;
`;

const ShoesShopLinker = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #ffffff;
  text-decoration: underline;
`;

const ShoesShopLinkerText = styled.p`
  margin-right: 10px;
`;

const ShoesGridBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

const ShoesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
  width: 300px;
  height: 300px;
  color: #ffffff;
  font-size: 14px;
`;

const ShoesBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ShoesImageBox = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #71717a;
  border-radius: 14px;
`;

const ShoesImage = styled.img`
  width: 80px;
  height: 80px;
  padding: 10px;
`;

const ShoesNFTABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
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
          "internalType": "string",
          "name": "attribute",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "imageURI",
          "type": "string"
        }
      ],
      "name": "computeTokenHash",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "getNFTData",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "pps",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "mps",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "imageURI",
              "type": "string"
            }
          ],
          "internalType": "struct ShoesNFT.NFTMetadata[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getOrphanedTokens",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getTokenHash",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getTokenImageURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getTokenMileageRatio",
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
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getTokenPointRatio",
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
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getTokenPrice",
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
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
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
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "point_ratio",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "mileage_ratio",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "tokenImageURI",
          "type": "string"
        }
      ],
      "name": "mint",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
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
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "tokenByIndex",
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
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "tokenOfOwnerByIndex",
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
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "tokensOfOwner",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
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
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

const ShoesNFTAddress = "0x8464135c8f25da09e49bc8782676a84730c318bc"

export function calculateTotalSum(shoes) {
  let totalMps = 0;
  let totalPps = 0;

  for (const shoe of shoes) {
    totalMps += parseFloat(shoe.mps);
    totalPps += parseFloat(shoe.pps);
  }

  console.log(shoes);

  return {
    totalMps: parseFloat(totalMps.toFixed(3)),
    totalPps: parseFloat(totalPps.toFixed(3)),
  };
}

export function extractFromRes() {
  const res = {
    name: "JamJam",
    mileage: "2300",
    shoes: [
      { name: "Watermelon", mps: "11", pps: "10", price: "2000" },
      { name: "Slapper", mps: "3", pps: "20", price: "2000" },
      { name: "Choco Cream", mps: "3", pps: "30", price: "2000" },
      { name: "Reddy", mps: "3", pps: "40", price: "2000" },
      { name: "Milki Way", mps: "5", pps: "50", price: "2000" },
    ],
  };
  return res;
}

export function MyShoesPage() {
  type ShoeItem = {
    name: string;
    imageURI: string;
    1: BigNumberish;
    2: BigNumberish;
    3: BigNumberish;
  };

  type NFTDataItem = {
    name: string;
    mileage: string;
    shoes: {
      name: string;
      mps: string;
      pps: string;
      price: string;
      imageURI: string;
    }[];
  };

  type NFTMetadata = {
    name: string;
    price: BigNumberish; // ethers.js나 web3.js에서 제공하는 BigNumber 타입
    pps: BigNumberish;
    mps: BigNumberish;
    imageURI: string;
}

  // 초기 값
  const initialNFTData: NFTDataItem = {
    name: "Jam Jam",
    mileage: "0",
    shoes: [
      {
        name: "Worker",
        mps: "0",
        pps: "0",
        price: "0",
        imageURI: "path/to/initial/image.jpg"
      }
    ]
  };

  const [shoesData, setShoesData] = useState(initialNFTData);
  const [selected, setSelected] = useState(0);
  const { totalMps, totalPps } = calculateTotalSum(shoesData.shoes);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // TODO 여기를 useEffect 에서 업데이트 하도록 바꿀거임
  const { name, mileage, shoes } = shoesData;

  useEffect(() => {
    async function fetchShoesNFTData() {
      const provider = new ethers.JsonRpcProvider("http://localhost:8545"); // Hardhat의 기본 로컬 RPC 주소
      const contract = new ethers.Contract(ShoesNFTAddress, ShoesNFTABI, provider);

      try {
        const res = await contract.getNFTData("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

        console.log('11111', res)

        function transformNFTData(data: []) {
          const shoes = data.map((item: ShoeItem) => ({
            name: item.name, 
            mps: item[2].toString(), 
            pps: item[1].toString(), 
            price: item[3].toString(),
            imageURI: item.imageURI,
          }));

          return {
            name: "JamJam", 
            mileage: "2300",
            shoes
          };
        }

        const NFTData = transformNFTData(res);

        setShoesData(NFTData);

      } catch (error) {
        console.error("Error fetching NFTData:", error);
      }
    }

    fetchShoesNFTData();
  }, []);



  return (
    <>
      <MyShoesPageWrapper>
        <MyShoesPageBox>
          <EquipShoes>
            <p>{name}</p>
            <EquipShoesImageBox>
              <EquipShoesImage
                src={`/svg/shoes/${shoes[0].name}.png`}
              ></EquipShoesImage>
            </EquipShoesImageBox>
            <p>{shoes[0].name}</p>
          </EquipShoes>
          <StatusBox>
            <Status>
              <StatusRow>
                <p>Current Mileage</p>
                <p>{mileage}</p>
              </StatusRow>
              <StatusRow>
                <p>Mileage per Step</p>
                <p>{totalMps}</p>
              </StatusRow>
              <StatusRow>
                <p>Point per Step</p>
                <p>{totalPps}</p>
              </StatusRow>
            </Status>
          </StatusBox>
          <ShoesInventoryBox>
            <Link to={"/shoesStore"}>
              <ShoesShopLinker>
                <ShoesShopLinkerText>GO TO NFT SHOES SHOP</ShoesShopLinkerText>
                <img src="/svg/coin.png"></img>
              </ShoesShopLinker>
            </Link>

            <ShoesGridBox>
              <ShoesGrid>
                {shoes.map((shoe, idx) => (
                  <ShoesBox
                    key={shoe.name}
                    onClick={() => {
                      onOpen();
                      setSelected(idx);
                    }}
                  >
                    <ShoesImageBox>
                      <ShoesImage
                        src={`/svg/shoes/${shoe.name}.png`}
                      ></ShoesImage>
                    </ShoesImageBox>
                    <p>{shoe.name}</p>
                  </ShoesBox>
                ))}
              </ShoesGrid>
            </ShoesGridBox>
          </ShoesInventoryBox>
        </MyShoesPageBox>
      </MyShoesPageWrapper>
      <ShoeModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        imgUrl={`/svg/shoes/${shoes[selected].name}.png`}
        name={shoes[selected].name}
        mps={shoes[selected].mps}
        pps={shoes[selected].pps}
        price={shoes[selected].price}
        type="Sell"
      />
    </>
  );
}
