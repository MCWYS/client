import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export function LeaderboardPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
        marginTop: "90px",
      }}
    >
      <img src="/리더보드.png" style={{ height: "755px" }} />
      <button
        onClick={onOpen}
        style={{
          position: "absolute",
          top: "14px",
          left: "calc(50% + 117px)",
        }}
      >
        <img src="/svg/button.png" />
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                How it benefit me?
              </ModalHeader>
              <ModalBody>
                <p>
                  In each every monday, you will get a reward based on rank.
                </p>
                <ul>
                  <li>1st ~ 40th place: 4,000 discount x 3</li>
                  <li>41st ~ 70th place: 3,000 discount x 3</li>
                  <li>71st ~ 100th place: 2,000 discount x 3</li>
                </ul>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Okay
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
