import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import parse from "html-react-parser";
import jsPDF from "jspdf";
import { Flex, Button, VStack, HStack, Box, Text } from "@chakra-ui/react";
import ReactToPrint from "react-to-print";

const total1 = ["Basic_i", "Offshore_i", "Onshore_i", "Transit_i"];
const total2 = [
  "Basic_ii",
  "Offshore_ii",
  "Onshore_ii",
  "Transit_ii",
  "OtherSalary_amount",
];
const View = () => {
  const reportTemplateRef = useRef(null);

  const { state } = useLocation();
  const { currentUser, payslipData } = state;

  const [from, to] = payslipData.Term.split("-");

  let total_count1 = 0;
  let total_count2 = 0;

  total1.forEach((e) => {
    payslipData[e] && (total_count1 += parseInt(payslipData[e]));
  });
  total2.forEach((e) => {
    payslipData[e] && (total_count2 += parseInt(payslipData[e]));
  });
  const sec = currentUser.SecondaryBankAcc.split(",");

  let secAcc = "";

  sec.forEach((_) => {
    secAcc += `<p>: ${_}</P>`;
  });
  console.log(from, to);
  const html = `
      <style>
        .container {
          font-size: small;
          width: "100%";
          height: "100%";
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding:10px;
        }
        .head {
          text-align: center;
        }
        .header {
          font-size: xx-large;
        }
        .label {
          background-color: #dddddd;
          border: 2px solid black;
        }
        .label p{
          padding:0 5px;
        }
        .info {
          display: flex;
        }
        .info1 {
          flex: 1;
          display: flex;
        }
        .userInfoKey {
          flex: 0.3;
        }
        .userInfoValue {
          flex: 1;
        }
        .info2 {
          flex: 1;
        }
        .summaryBox {
          border: 1px solid black;
          margin-right: 100px;
          padding: 0 4px;
        }
        table {
          border-collapse: collapse;
          width: 100%;
        }
  
        .table td,
        th {
          border: 1px solid #aaaaaa;
          padding: 2px 4px;
          text-align: center;
          width: 50px;
        }

        .bankInfo p,td,th,.info p,.label p,.head p,header {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          margin:5px 0;
        }
  
        .table tr:nth-child(1) {
          background-color: #dddddd;
        }
        .table2 {
          flex: 0.6;
          display:flex;
          flex-direction:column;
          align-items: end;
        }
        .table2 table{
          
          width:250px;
        }
        .table2 th:nth-child(1) {
          text-align: left;
        }
        .bottom {
          display: flex;
          justify-content: space-between;
        }
  
        .bankInfo {
          flex:1;
          display: flex;
        }
        .bankKey{
          flex:0.5;
        }
        .sign{
          text-align:center;
          color:#999999;
        }
      </style>
    <body>
      <div class="container">
        <div class="head">
          <header class="header">OFFSHORE SUPPORT PTE LTD</header>
          <p>298, TIONG BAHRU, #16-01/06 CENTRAL PLAZA SINGAPORE 168730</p>
        </div>
        <br />
        <br />
        <div class="label">
          <p>Payroll Report by Employee</p>
        </div>
        <div class="info">
          <div class="info1">
            <div class="userInfoKey">
              <p>Employee ID</p>
              <p>Employee Name</p>
              <p>Job Title</p>
              <p>Employee Type</p>
            </div>
            <div class="userInfoValue">
              <p>: ${currentUser.UserID}</p>
              <p>: ${currentUser["Employee Name"]}</p>
              <p>: ${currentUser["Job Title"]}</p>
              <p>: ${currentUser.Type}</p>
            </div>
          </div>
          <div class="info2">
            <p>Term : From ${from} to ${to}</p>
            <div class="summaryBox">
              <p>Summary</p>
              <p>K2 Maintenance (NSEM)</p>
            </div>
          </div>
        </div>
        <br />
        <div class="table">
          <table>
            <tr>
              <th colspan="2">Description</th>
              <th>Unit ATM</th>
              <th>${from}</th>
              <th>${to}</th>
              <th>-</th>
              <th>-</th>
              <th>-</th>
              <th>-</th>
              <th>-</th>
              <th>-</th>
            </tr>
            <tr>
              <td style="font-weight: bold">BASIC</td>
              <td>Basic</td>
              <td class="unitAtm">0</td>
              <td class="Basic1">${
                payslipData.Basic_i ? payslipData.Basic_i : "-"
              }</td>
              <td class="Basic2">${
                payslipData.Basic_ii ? payslipData.Basic_ii : "-"
              }</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <td>-</td>
              <td>Offshore</td>
              <td class="unitAtm">30</td>
              <td class="Offshore1">${
                payslipData.Offshore_i ? payslipData.Offshore_i : "-"
              }</td>
              <td class="Offshore2">${
                payslipData.Offshore_ii ? payslipData.Offshore_ii : "-"
              }</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <td></td>
              <td>Onshore</td>
              <td class="unitAtm">30</td>
              <td class="Onshore1">${
                payslipData.Onshore_i ? payslipData.Onshore_i : "-"
              }</td>
              <td class="Onshore2">${
                payslipData.Onshore_ii ? payslipData.Onshore_ii : "-"
              }</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <td>-</td>
              <td>Transit</td>
              <td class="unitAtm">30</td>
              <td class="Transit1">${
                payslipData.Transit_i ? payslipData.Transit_i : "-"
              }</td>
              <td class="Transit2">${
                payslipData.Transit_ii ? payslipData.Transit_ii : "-"
              }</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
            <td>-</td>
            <td>${
              payslipData.OtderSalary_descr
                ? payslipData.OtderSalary_descr
                : "-"
            }</td>
            <td>-</td>
            <td>-</td>
            <td>${
              payslipData.OtderSalary_amount
                ? payslipData.OtderSalary_amount
                : "-"
            }</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
            <tr>
              <td colspan="100">-</td>
            </tr>
            <tr>
              <td style="font-weight: bold">DEDUCTION</td>
              <td>Secondary Acc</td>
              <td>-</td>
              <td>-</td>
              <td>${
                payslipData.SecondaryBankAcc
                  ? payslipData.SecondaryBankAcc
                  : "-"
              }</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <td></td>
              <td>Cash Advance</td>
              <td>-</td>
              <td>-</td>
              <td>${
                payslipData.CashAdvance ? payslipData.CashAdvance : "-"
              }</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <td>-</td>
              <td>${
                payslipData.OverPay_descr ? payslipData.OverPay_descr : "-"
              }</td>
              <td>-</td>
              <td>-</td>
              <td>${
                payslipData.OverPay_amount ? payslipData.OverPay_amount : "-"
              }</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
            <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <td style="font-weight: bold">TOTAL</td>
              <td>-</td>
              <td>-</td>
              <td>${total_count1}</td>
              <td>${total_count2}</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </table>
        </div>
        <br />
        <div class="bottom">
          <div class="bankInfo">
            <div class="bankKey">
              <p style="font-weight: bold; text-decoration: underline">
                Salary Credited to
              </p>
              <p>Primary Account</p>
              <hr/>
              <p>Secondary Account</p>
              <br />
              <br />
              <p style="margin: 0; font-weight: bold; text-decoration: underline">
                Cost Breakdown
              </p>
              <p style="font-weight: bold;" >K2 Maintenance (NSEM) : ${
                payslipData.GrandTotal
              }</p>
            </div>
            <div class="bankvalue">
              <p>-</p>
              <p>: ${currentUser.PrimaryBankAcc}</p>
              <hr/>
              ${secAcc}
            </div>
          </div>
          <div class="table2">
            <table>
              <tr>
                <th>Grand Total</th>
                <th>${payslipData.GrandTotal}</th>
              </tr>
              <tr>
                <th>Deduction</th>
                <th>${payslipData.Deduction}</th>
              </tr>
              <tr>
                <th>Total</th>
                <th>${payslipData.Total}</th>
              </tr>
            </table>
            <div class="sign">
              <br/> 
              <br/>
              <p>The printed document in the subject is produced 
              electronically and therefore does not require 
              a signature is not acceptable</p>
              <hr/>
              <p>Time : ${new Date()}</p>
            </div>
          </div>
      </div>
    </body>
  `;

  const doc = new jsPDF({
    orientation: "landscape",
    format: [1123, 793],
    unit: "px",
  });

  return (
    <HStack w={"fit-content"}>
      <Box ref={reportTemplateRef} w={1123} h={790} px={4}>
        <PDFViewer html={html} />
      </Box>
      <VStack h={"50%"} justifyContent={"space-between"}>
        <HStack flex={1} justifyContent={"center"} gap={6}>
          <Button
            colorScheme={"teal"}
            onClick={() => {
              doc.html(reportTemplateRef.current, {
                async callback(doc) {
                  await doc.save("document");
                },
              });
            }}
          >
            Download
          </Button>

          <ReactToPrint
            trigger={() => <Button colorScheme={"green"}>Print (A4)</Button>}
            content={() => reportTemplateRef.current}
          />
        </HStack>
        <Text color={"red.500"}>Downloaded file may content visual bug !!</Text>
      </VStack>
    </HStack>
  );
};

const PDFViewer = ({ html }) => {
  return parse(html);
};

export default View;
