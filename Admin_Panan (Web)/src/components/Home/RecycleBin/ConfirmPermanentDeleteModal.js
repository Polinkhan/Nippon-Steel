import {
  Button,
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useDataContext } from "../../../contexts/DataContext";
import { api } from "../../../utlis/GlobalData";

const ConfirmPermanentDeleteModal = ({
  modalStatus,
  setModalStatus,
  selectedUser,
}) => {
  const { makeToast, fetchRecyleData, currentUser } = useDataContext();

  const handleDeleteUser = () => {
    axios
      .post(`${api}/db/deleteRecycleData`, { UserID: selectedUser.UserID })
      .then((res) => {
        makeToast("success", "User moved to Recycle Bin");
        fetchRecyleData();
        setModalStatus((prev) => ({ ...prev, permanentDeleteModal: false }));
      })
      .catch((err) => {
        const msg = err.response.data.error.message || err.message;
        makeToast("error", msg);
      });
  };
  return (
    <Modal
      onClose={() =>
        setModalStatus((prev) => ({ ...prev, permanentDeleteModal: false }))
      }
      isOpen={modalStatus.permanentDeleteModal}
      isCentered
      size={"xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Confirm Permanent Delete {selectedUser["Employee Name"]}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack alignItems={"flex-start"} overflow={"clip"}>
            <Text>
              You are about to delete the user data Permanently, data will lost
              and this operation can't be undone
            </Text>
            <Divider />
            {Object.keys(selectedUser).map((list, i) => (
              <Text as={"del"} key={i} color={"gray.400"}>
                {list}
                {"\t:"}
                {selectedUser[list]}
              </Text>
            ))}
            <Divider />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button
              colorScheme={"red"}
              onClick={handleDeleteUser}
              disabled={currentUser.AccountType === "Member" ? true : false}
            >
              Proceed to delete
            </Button>
            <Button
              onClick={() =>
                setModalStatus((prev) => ({
                  ...prev,
                  permanentDeleteModal: false,
                }))
              }
            >
              Close
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmPermanentDeleteModal;
