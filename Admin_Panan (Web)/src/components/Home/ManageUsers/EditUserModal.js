import {
  Button,
  Flex,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useDataContext } from "../../../contexts/DataContext";
import { api } from "../../../utlis/GlobalData";

const EditUserModal = ({
  updatedUser,
  setUpdatedUser,
  modalStatus,
  setModalStatus,
}) => {
  const { makeToast, fetchUserAllData, currentUser } = useDataContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${api}/db/updateUser`, { userData: updatedUser })
      .then((res) => {
        fetchUserAllData();
        makeToast("success", res.data.msg.message);
        setModalStatus((prev) => ({ ...prev, editModal: false }));
      })
      .catch((err) => {
        const msg = err.response.data.error.message || err.message;
        makeToast("error", msg);
      });
  };

  return (
    <Modal
      onClose={() => setModalStatus((prev) => ({ ...prev, editModal: false }))}
      isOpen={modalStatus.editModal}
      isCentered
      size={"xl"}
    >
      <ModalOverlay />
      <ModalContent as={"form"} onSubmit={handleSubmit}>
        <ModalHeader>Update User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection={"column"} gap={2}>
            {Object.keys(updatedUser).map((list, i) => (
              <HStack flex={1} key={i}>
                <Text flex={0.3} textAlign={"end"}>
                  {list} :
                </Text>
                <Input
                  disabled={list === "UserID" && true}
                  type={
                    list === "Email"
                      ? "email"
                      : list === "Joining Date" || list === "Date Of Birth"
                      ? "date"
                      : " text"
                  }
                  flex={0.7}
                  value={updatedUser[list]}
                  onChange={(e) =>
                    setUpdatedUser((prev) => ({
                      ...prev,
                      [list]: e.target.value,
                    }))
                  }
                />
              </HStack>
            ))}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button
              type="submit"
              disabled={currentUser.AccountType === "Member" ? true : false}
            >
              Proceed to update
            </Button>
            <Button
              onClick={() =>
                setModalStatus((prev) => ({ ...prev, editModal: false }))
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

export default EditUserModal;
