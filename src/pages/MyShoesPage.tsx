import { useDisclosure } from "@nextui-org/react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ShoeModal from "../components/ShoeModal";
import { useEffect, useState } from "react";
import { ethers, BigNumberish } from "ethers";
import { ShoesNFTAddress, ShoesNFTABI } from "../contract/contract";
import { myData } from "../App";
import { TEXT_COLOR } from "../styled/main.styled";

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
  position: relative;
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

export function calculateTotalSum(shoes) {
  let totalMps = 0;
  let totalPps = 0;

  for (const shoe of shoes) {
    totalMps += shoe.mps;
    totalPps += shoe.pps;
  }

  return {
    totalMps: parseFloat(totalMps.toFixed(3)),
    totalPps: parseFloat(totalPps.toFixed(3)),
  };
}

type ShoeItem = {
  name: string;
  imageURI: string;
  1: BigNumberish;
  2: BigNumberish;
  3: BigNumberish;
};

export type shoeType = {
  name: string;
  mps: number;
  pps: number;
  price: number;
  imageURI?: string;
};

export type NFTDataItem = {
  name: string;
  mileage: number;
  shoes: shoeType[];
};

const initialNFTData: NFTDataItem = {
  name: "Jam Jam",
  mileage: 7700,
  shoes: [
    {
      name: "Worker",
      mps: 0,
      pps: 0,
      price: 0,
      imageURI: "path/to/initial/image.jpg",
    },
  ],
};

export function MyShoesPage() {
  console.log("MyShoesPage rendered ", myData);
  const [shoesData, setShoesData] = useState<NFTDataItem>(myData);
  const [selected, setSelected] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { totalMps, totalPps } = calculateTotalSum(shoesData.shoes);

  // TODO 여기를 useEffect 에서 업데이트 하도록 바꿀거임
  const { name, mileage, shoes } = shoesData;

  useEffect(() => {
    async function fetchShoesNFTData() {
      const provider = new ethers.JsonRpcProvider("http://localhost:8545"); // Hardhat의 기본 로컬 RPC 주소
      const contract = new ethers.Contract(
        ShoesNFTAddress,
        ShoesNFTABI,
        provider,
      );

      try {
        function transformNFTData(data: []): NFTDataItem {
          const shoes = data.map((item: ShoeItem) => ({
            name: item.name,
            mps: Number(item[2]),
            pps: Number(item[1]),
            price: Number(item[3]),
            imageURI: item.imageURI,
          }));

          return {
            name: myData.name,
            mileage: myData.mileage,
            shoes: shoes,
          };
        }

        const res = await contract.getNFTData(
          "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        );
        const NFTData = transformNFTData(res);
        setShoesData(NFTData);
        myData.shoes = NFTData.shoes;
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
          {shoes[0] && (
            <EquipShoes>
              <p>{name}</p>
              <EquipShoesImageBox>
                <div
                  style={{
                    position: "absolute",
                    bottom: "5px",
                    left: "10px",
                    fontSize: "16px",
                    color: TEXT_COLOR,
                  }}
                >
                  Equiped
                </div>
                <EquipShoesImage
                  src={`/svg/shoes/${shoes[0].name}.png`}
                ></EquipShoesImage>
              </EquipShoesImageBox>
              <p>{shoes[0].name}</p>
            </EquipShoes>
          )}
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
            <Link to={"/shoe_store"}>
              <ShoesShopLinker>
                <ShoesShopLinkerText>GO TO NFT SHOES SHOP</ShoesShopLinkerText>
                <img src="/svg/coin.png"></img>
              </ShoesShopLinker>
            </Link>

            <ShoesGridBox>
              <ShoesGrid>
                {shoes.map((shoe, idx) => (
                  <ShoesBox
                    key={`${shoe.name}-${idx}`}
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
        shoe={shoes[selected]}
        type="Sell"
      />
    </>
  );
}
