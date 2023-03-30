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

const RestoreModal = ({ modalStatus, setModalStatus, selectedUser }) => {
  const { makeToast, fetchUserAllData, fetchRecyleData, currentUser } =
    useDataContext();

  const handleDeleteUser = () => {
    axios
      .post(`${api}/db/createUser`, { user: selectedUser })
      .then((res) => {
        fetchUserAllData();
        makeToast("success", "Successfully restore user");
        axios
          .post(`${api}/db/deleteRecycleData`, { UserID: selectedUser.UserID })
          .then(() => {
            fetchRecyleData();
            setModalStatus((prev) => ({ ...prev, restoreModal: false }));
          });
      })
      .catch((err) => {
        const msg = err.response.data.error.message || err.message;
        makeToast("error", msg);
      });
  };
  return (
    <Modal
      onClose={() =>
        setModalStatus((prev) => ({ ...prev, restoreModal: false }))
      }
      isOpen={modalStatus.restoreModal}
      isCentered
      size={"xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Confirm Restore {selectedUser["Employee Name"]}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack alignItems={"flex-start"} overflow={"clip"}>
            <Text>Data will be restore to database</Text>
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
              colorScheme={"blue"}
              onClick={handleDeleteUser}
              disabled={currentUser.AccountType === "Member" ? true : false}
            >
              Restore data
            </Button>
            <Button
              onClick={() =>
                setModalStatus((prev) => ({
                  ...prev,
                  restoreModal: false,
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

export default RestoreModal;
