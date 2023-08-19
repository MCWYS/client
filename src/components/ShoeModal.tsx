import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";

type AppProps = {
  imgUrl: string;
  name: string;
  mps: string;
  pps: string;
  price: string;
  type: "Sell" | "Buy";
  onOpenChange: () => void;
  isOpen: boolean;
};

export default function ShoeModal({
  imgUrl,
  name,
  mps,
  pps,
  price,
  type,
  onOpenChange,
  isOpen,
}: AppProps) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      closeButton={<img src="/svg/close.png" />}
      placement="top"
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
                  {name}
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
                    <span style={{ color: "#F5A524" }}>{mps} Mileage</span>
                    <span style={{ color: "#fff" }}> / step</span>
                  </h3>
                  <h3>
                    <span style={{ color: "#006FEE" }}>{pps} Mileage</span>
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
                >
                  <span style={{ color: "#fff" }}>
                    {type} /
                    <span style={{ color: "#F5A524" }}>{price} Mileage</span>
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
