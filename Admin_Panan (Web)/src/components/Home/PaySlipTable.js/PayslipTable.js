import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Input,
  StackDivider,
  Text,
  VStack,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDataContext } from "../../../contexts/DataContext";
import { api, headers } from "../../../utlis/GlobalData";
import {
  IoRefresh,
  IoReload,
  IoAddCircleOutline,
  IoDocumentTextOutline,
  IoCloudUploadOutline,
  IoDownloadOutline,
} from "react-icons/io5";
import axios from "axios";
import { CSVLink } from "react-csv";

import UploadNewTableModal from "./UploadNewTableModal";
import UpdateTableDataModal from "./UpdateTableDataModal";
import AddTableDataModel from "./AddTableDataModel";
import Docs from "./Docs";
import { useNavigate } from "react-router-dom";

//   import ConfirmDeleteModal from "./ConfirmDeleteModal";
//   import EditUserModal from "./EditUserModal";

const PayslipTable = () => {
  const navigate = useNavigate();

  const {
    fetchUserAllData,
    makeToast,
    csvData,
    setCsvData = {},
  } = useDataContext();
  // const [selectedUser, setSelectedUser] = useState({});
  // const [updatedUser, setUpdatedUser] = useState({});
  // const [modalStatus, setModalStatus] = useState({
  //   editModal: false,
  //   deleteModal: false,
  // });
  // const [loading, setLoading] = useState({
  //   download: false,
  //   upload: false,
  // });
  const [modals, setModals] = useState({
    uploadNewTable: false,
    updateTableData: false,
    addTableData: false,
    docs: false,
  });
  const [queryText, setQueryText] = useState("");

  useEffect(() => {
    axios
      .post(`${api}/db/searchQuery`, { queryText })
      .then((res) => {
        console.log(res.data);
        setCsvData(res.data);
      })
      .catch((err) => {
        const msg = err.response.data.error.message || err.message;
        makeToast("error", msg);
      })
      .finally(() => {});
  }, [queryText]);

  return (
    csvData && (
      <>
        <Flex
          h={"100%"}
          w={"100%"}
          flexDirection={"column"}
          gap={12}
          overflow={"auto"}
        >
          <HStack justifyContent={"space-between"} minW={"fit-content"}>
            <Text flex={0.8} fontSize={{ base: "lg", md: "2xl" }}>
              Manage Payslip Data
            </Text>
            <Button
              colorScheme={"facebook"}
              rightIcon={<IoRefresh />}
              onClick={() => fetchUserAllData()}
              fontSize={{ base: "sm", md: "md" }}
            >
              Refresh
            </Button>
          </HStack>
          <HStack w={"100%"} px={1}>
            <Input
              bg={"white"}
              value={queryText}
              placeholder={"Search by ID/Term/Name"}
              onChange={(e) => setQueryText(e.target.value)}
            />
            <HStack>
              <Button
                bg={"white"}
                variant={"outline"}
                rightIcon={<Icon as={IoDocumentTextOutline} />}
                onClick={() => setModals((prev) => ({ ...prev, docs: true }))}
              >
                Docs
              </Button>
              {/* <IconButton
                fontSize={"xl"}
                icon={<IoFilter />}
                bg={"white"}
                variant={"outline"}
              /> */}
              <HStack
                w={24}
                border={"1px"}
                borderRadius={"md"}
                borderColor={"gray.200"}
                bg={"white"}
                _hover={{ bg: "gray.100" }}
              >
                <CSVLink
                  style={{
                    paddingLeft: 18,
                    paddingTop: 8,
                    paddingBottom: 8,
                    fontWeight: "bold",
                  }}
                  data={csvData}
                  headers={headers}
                  filename={"Payslip_Data " + new Date().toDateString()}
                >
                  Export
                </CSVLink>
                <Icon as={IoDownloadOutline} />
              </HStack>

              <Button
                bg={"white"}
                variant={"outline"}
                rightIcon={<Icon as={IoCloudUploadOutline} />}
                onClick={() =>
                  setModals((prev) => ({ ...prev, uploadNewTable: true }))
                }
              >
                Import
              </Button>
              <Button
                bg={"white"}
                variant={"outline"}
                rightIcon={<Icon as={IoReload} />}
                onClick={() =>
                  setModals((prev) => ({ ...prev, updateTableData: true }))
                }
              >
                Update
              </Button>
              <Button
                bg={"white"}
                variant={"outline"}
                rightIcon={<Icon as={IoAddCircleOutline} />}
                onClick={() =>
                  setModals((prev) => ({ ...prev, addTableData: true }))
                }
              >
                Add
              </Button>
            </HStack>
          </HStack>
          <Box h={"100%"} w={"100%"} overflow={"auto"}>
            <VStack
              minW={"100%"}
              w={"fit-content"}
              divider={<StackDivider />}
              color={"gray.600"}
              flex={1}
            >
              <HStack
                p={2}
                w={"100%"}
                justifyContent={"space-between"}
                fontSize={"sm"}
                divider={<StackDivider />}
              >
                {headers.map((list, i) => (
                  <Text
                    textAlign={"center"}
                    w={32}
                    //   minW={"list.width"}
                    key={i}
                    fontWeight={"bold"}
                  >
                    {list.label}
                  </Text>
                ))}
                {/* <Text textAlign={"center"} w={"80px"} fontWeight={"bold"}>
                  Manage
                </Text> */}
              </HStack>
              {csvData.length ? (
                csvData.map((userData, i) => (
                  <HStack
                    key={i}
                    fontSize={{ base: "sm", "2xl": "md" }}
                    w={"100%"}
                    justifyContent={"space-between"}
                    p={2}
                    cursor={"pointer"}
                    divider={<StackDivider />}
                    _hover={{ bg: "gray.300" }}
                    onClick={() => {
                      axios
                        .post(`${api}/db/userInfo`, { ID: userData.ID })
                        .then((res) => {
                          const { currentUser } = res.data;
                          navigate("/view", {
                            state: { payslipData: userData, currentUser },
                          });
                        })
                        .catch((err) => {
                          const msg =
                            err.response.data.error.message || err.message;
                          makeToast("error", msg);
                        })
                        .finally(() => {});
                    }}
                  >
                    {headers.map((list, i) => (
                      <Text
                        textAlign={"center"}
                        w={32}
                        py={1}
                        //   minW={keylist.width}
                        key={i + "a"}
                        whiteSpace={"nowrap"}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                      >
                        {userData[list.key]}
                      </Text>
                    ))}
                    {/* <HStack w={"80px"}>
                      <IconButton
                        size={"sm"}
                        fontSize={"md"}
                        // variant={"outline"}
                        // color={"blue.400"}
                        colorScheme={"blue"}
                        borderRadius={0}
                        icon={<FaRegEdit />}
                        onClick={() => {
                          setModalStatus((prev) => ({
                            ...prev,
                            editModal: true,
                          }));
                          setUpdatedUser(userData);
                        }}
                      />
                      <IconButton
                        size={"sm"}
                        fontSize={"md"}
                        colorScheme={"red"}
                        borderRadius={0}
                        icon={<FaRegTrashAlt />}
                        onClick={() => {
                          setModalStatus((prev) => ({
                            ...prev,
                            deleteModal: true,
                          }));
                          setSelectedUser(userData);
                        }}
                      />
                    </HStack> */}
                  </HStack>
                ))
              ) : (
                <Center h={"20%"} fontSize={"2xl"}>
                  No Data Found !!
                </Center>
              )}
            </VStack>
          </Box>
          {/* {selectedUser && (
          <>
          <ConfirmDeleteModal
          modalStatus={modalStatus}
          setModalStatus={setModalStatus}
          selectedUser={selectedUser}
          />
          <EditUserModal
          modalStatus={modalStatus}
          setModalStatus={setModalStatus}
          updatedUser={updatedUser}
          setUpdatedUser={setUpdatedUser}
          />
          </>
        )} */}
        </Flex>
        {/* UploadNewTableModal */}
        <Modal
          onClose={() =>
            setModals((prev) => ({ ...prev, uploadNewTable: false }))
          }
          isOpen={modals.uploadNewTable}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <UploadNewTableModal />
          </ModalContent>
        </Modal>
        {/* UpdateTableDataModal */}
        <Modal
          onClose={() =>
            setModals((prev) => ({ ...prev, updateTableData: false }))
          }
          isOpen={modals.updateTableData}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <UpdateTableDataModal />
          </ModalContent>
        </Modal>
        {/* AddTableDataModal */}
        <Modal
          onClose={() =>
            setModals((prev) => ({ ...prev, addTableData: false }))
          }
          isOpen={modals.addTableData}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <AddTableDataModel />
          </ModalContent>
        </Modal>
        {/* DocsModal */}
        <Modal
          onClose={() => setModals((prev) => ({ ...prev, docs: false }))}
          isOpen={modals.docs}
          isCentered
          size={"2xl"}
        >
          <ModalOverlay />
          <ModalContent>
            <Docs />
          </ModalContent>
        </Modal>
      </>
    )
  );
};

export default PayslipTable;
