import { Link } from "react-router-dom";
import styled from "styled-components";

const MyShoesPageWrapper = styled.div`
  display: flex;
  background-color: #27272a;
  width: 100vw;
  height: 100vh;
  margin-top: 90px;
  justify-content: center;
  align-items: center;
`;

const MyShoesPageBox = styled.div`
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

const StatusBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 0;
`;

const Status = styled.div`
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

const StatusRow = styled.div`
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

const ShoesInventory = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 80%;
`;

const ShoesRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #ffffff;
  font-size: 14px;
  justify-content: space-between;
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

function calculateTotalSums(shoes) {
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

export function MyShoesPage() {
  const res = {
    name: "JamJam",
    mileage: "2300",
    shoes: [
      { name: "Watermelon", mps: "11", pps: "10" },
      { name: "Slapper", mps: "3", pps: "20" },
      { name: "Choco Cream", mps: "3", pps: "20" },
      { name: "Reddy", mps: "0.003", pps: "0.004" },
      { name: "Milki Way", mps: "0.005", pps: "0.003" },
    ],
  };
  const { name, mileage, shoes } = res;
  const { totalMps, totalPps } = calculateTotalSums(shoes);

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

            <ShoesInventory>
              <ShoesRow>
                <ShoesBox>
                  <ShoesImageBox>
                    <ShoesImage
                      src={`/svg/shoes/${shoes[1].name}.png`}
                    ></ShoesImage>
                  </ShoesImageBox>
                  <p>{shoes[1].name}</p>
                </ShoesBox>

                <ShoesBox>
                  <ShoesImageBox>
                    <ShoesImage
                      src={`/svg/shoes/${shoes[2].name}.png`}
                    ></ShoesImage>
                  </ShoesImageBox>
                  <p>{shoes[2].name}</p>
                </ShoesBox>

                <ShoesBox>
                  <ShoesImageBox>
                    <ShoesImage
                      src={`/svg/shoes/${shoes[3].name}.png`}
                    ></ShoesImage>
                  </ShoesImageBox>
                  <p>{shoes[3].name}</p>
                </ShoesBox>
              </ShoesRow>

              <ShoesRow>
                <ShoesBox>
                  <ShoesImageBox>
                    <ShoesImage
                      src={`/svg/shoes/${shoes[4].name}.png`}
                    ></ShoesImage>
                  </ShoesImageBox>
                  <p>{shoes[4].name}</p>
                </ShoesBox>
              </ShoesRow>
            </ShoesInventory>
          </ShoesInventoryBox>
        </MyShoesPageBox>
      </MyShoesPageWrapper>
    </>
  );
}
