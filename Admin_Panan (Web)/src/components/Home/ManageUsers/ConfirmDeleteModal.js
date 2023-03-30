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

const ConfirmDeleteModal = ({ modalStatus, setModalStatus, selectedUser }) => {
  const { makeToast, fetchUserAllData, fetchRecyleData, currentUser } =
    useDataContext();

  const handleDeleteUser = () => {
    axios
      .post(`${api}/db/deleteUser`, { UserData: selectedUser })
      .then((res) => {
        makeToast("success", "User moved to Recycle Bin");
        fetchRecyleData();
        fetchUserAllData();
        setModalStatus((prev) => ({ ...prev, deleteModal: false }));
      })
      .catch((err) => {
        const msg = err.response.data.error.message || err.message;
        makeToast("error", msg);
      });
  };
  return (
    <Modal
      onClose={() =>
        setModalStatus((prev) => ({ ...prev, deleteModal: false }))
      }
      isOpen={modalStatus.deleteModal}
      isCentered
      size={"xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Move to Recycle Bin</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack alignItems={"flex-start"} overflow={"clip"}>
            <Text>
              You are about to delete the user, you can also retrive the data
              from Recycle bin, User can't log in into app if their data is in
              Recycle
            </Text>
            <Divider />
            {Object.keys(selectedUser).map((list, i) => (
              <Text key={i} color={"gray.400"}>
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
              Move to Recycle Bin
            </Button>
            <Button
              onClick={() =>
                setModalStatus((prev) => ({ ...prev, deleteModal: false }))
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

export default ConfirmDeleteModal;
