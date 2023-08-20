import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { ShoesNFTAddress, ShoesNFTABI } from "../contract/contract";
import { shoeType } from "../pages/MyShoesPage";
import { myData } from "../App";

type AppProps = {
  imgUrl: string;
  shoe: shoeType;
  type: "Sell" | "Buy";
  onOpenChange: () => void;
  isOpen: boolean;
  setMyCoin?: (_: any) => void;
};

export default function ShoeModal({
  imgUrl,
  shoe,
  type,
  onOpenChange,
  isOpen,
  setMyCoin,
}: AppProps) {
  const navigate = useNavigate();
  const nftMint = async () => {
    // const provider = new ethers.JsonRpcProvider("http://localhost:8545"); // Hardhat의 기본 로컬 RPC 주소
    // const signer = new ethers.JsonRpcSigner(provider, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const nft = new ethers.Contract(ShoesNFTAddress, ShoesNFTABI, signer);

    try {
      await nft.mint(
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        shoe.name,
        shoe.price,
        shoe.pps,
        shoe.mps,
        imgUrl,
      );
    } catch (error) {
      console.error("Error fetching NFTData:", error);
    }
  };

  const handleNFTMint = async () => {
    await nftMint().then(() => {
      myData.mileage = myData.mileage - shoe.price;
      setMyCoin((state) => {
        console.log(state.mileage, shoe);
        console.log(state.mileage - shoe.price);
        return {
          name: state.name,
          mileage: state.mileage - shoe.price,
          shoes: [...state.shoes, shoe],
        };
      });
      navigate("/myshoes");
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      closeButton={<img src="/svg/close.png" />}
      placement="center"
      size="xs"
    >
      <ModalContent style={{ backgroundColor: "#27272A" }}>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
            <ModalBody>
              <div
                style={{
                  marginLeft: 28,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 153,
                    height: 157,
                    backgroundColor: "#71717A",
                    borderRadius: 14,
                  }}
                >
                  <img src={imgUrl} alt={imgUrl} />
                </div>
                <h2 style={{ fontSize: 18, color: "#fff", marginTop: 20 }}>
                  {shoe.name}
                </h2>
                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <h3>
                    <span style={{ color: "#F5A524" }}>{shoe.mps} Mileage</span>
                    <span style={{ color: "#fff" }}> / step</span>
                  </h3>
                  <h3>
                    <span style={{ color: "#006FEE" }}>{shoe.pps} Mileage</span>
                    <span style={{ color: "#fff" }}> / step</span>
                  </h3>
                </div>
                <div
                  style={{
                    marginTop: 20,
                    marginBottom: 30,
                    backgroundColor: "#71717A",
                    width: 234,
                    height: 46,
                    borderRadius: 12,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                  onClick={handleNFTMint}
                >
                  <span style={{ color: "#fff" }}>
                    {type} /
                    <span style={{ color: "#F5A524" }}>
                      {shoe.price} Mileage
                    </span>
                  </span>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
