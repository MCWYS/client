import styled from "styled-components";
import {
  MyShoesPageWrapper,
  MyShoesPageBox,
  StatusBox,
  Status,
  StatusRow,
  extractFromRes,
  calculateTotalSum,
} from "./MyShoesPage";
import { useState } from "react";
import ShoeModal from "../components/ShoeModal";
import { useDisclosure } from "@nextui-org/react";

const StoreTitle = styled.div`
  display: flex;
  flex-direction: row;
  color: #ffffff;
  font-size: 20px;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const StoreTitleText = styled.p`
  margin-left: 14px;
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
`;

const ShoesBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
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

export function extractFromShoesListRes() {
  const res = {
    shoesList: [
      { name: "Rainbooster", mps: "11", pps: "10", price: "1100" },
      { name: "Cherry", mps: "11", pps: "10", price: "1100" },
      { name: "Green Day", mps: "11", pps: "10", price: "1100" },
      { name: "Night Hunter", mps: "11", pps: "10", price: "1100" },
      { name: "Froggy", mps: "11", pps: "10", price: "1100" },
      { name: "Worker", mps: "11", pps: "10", price: "1100" },
      { name: "Mustard", mps: "11", pps: "10", price: "1100" },
      { name: "Beamer", mps: "11", pps: "10", price: "1100" },
      { name: "Soda", mps: "11", pps: "10", price: "1100" },
    ],
  };
  return res;
}

export const ShoesStore = () => {
  const { name, mileage, shoes } = extractFromRes();
  const { shoesList } = extractFromShoesListRes();
  const { totalMps, totalPps } = calculateTotalSum(shoes);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = useState(0);

  const [selectedShoesName, setSelectedShoesName] = useState("");

  return (
    <MyShoesPageWrapper>
      <MyShoesPageBox>
        <StoreTitle>
          <img src="/svg/coin.png"></img>
          <StoreTitleText>Shoes Store</StoreTitleText>
        </StoreTitle>
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
        <ShoesGridBox>
          <ShoesGrid>
            {shoesList.map((shoes, idx) => (
              <ShoesBox
                key={shoes.name}
                onClick={() => {
                  onOpen();
                  setSelected(idx);
                  setSelectedShoesName(shoes.name);
                }}
              >
                <ShoesImageBox>
                  <ShoesImage src={`/svg/shoes/${shoes.name}.png`}></ShoesImage>
                </ShoesImageBox>
                <p>{shoes.name}</p>
              </ShoesBox>
            ))}
          </ShoesGrid>
        </ShoesGridBox>
      </MyShoesPageBox>
      <ShoeModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        imgUrl={`/svg/shoes/${shoesList[selected].name}.png`}
        name={shoesList[selected].name}
        mps={shoesList[selected].mps}
        pps={shoesList[selected].pps}
        price={shoesList[selected].price}
        type="Buy"
      />
    </MyShoesPageWrapper>
  );
};
