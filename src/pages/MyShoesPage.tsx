import { useDisclosure } from "@nextui-org/react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ShoeModal from "../components/ShoeModal";
import { useState } from "react";

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

export function calculateTotalSum(shoes) {
  let totalMps = 0;
  let totalPps = 0;

  for (const shoe of shoes) {
    totalMps += parseFloat(shoe.mps);
    totalPps += parseFloat(shoe.pps);
  }

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
  const { name, mileage, shoes } = extractFromRes();
  const { totalMps, totalPps } = calculateTotalSum(shoes);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = useState(0);
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
