import {
  SheetsDirective,
  SheetDirective,
  RangesDirective,
  RangeDirective,
  SpreadsheetComponent,
  ColumnDirective,
  ColumnsDirective,
} from "@syncfusion/ej2-react-spreadsheet";
import { registerLicense } from "@syncfusion/ej2-base";
import { dbClient } from "../Api/Client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Stack } from "@mui/material";

registerLicense(
  "MTY1NDEyOUAzMjMxMmUzMTJlMzMzNWVodE1KV2FvT215S0w2S2tzTTUwRTAwY0w0MVhoN21kRTVMT05peFZIYWc9;Mgo+DSMBaFt+QHFqVkNrWE5FckBAXWFKbld8QGJTfFlgFChNYlxTR3ZbQlpiT3tSdUJhUHZd;Mgo+DSMBMAY9C3t2VFhhQlJBfVtdXGdWfFN0RnNddVtxflZBcDwsT3RfQF5jTX5Ud0NmWHxZc3VURQ==;Mgo+DSMBPh8sVXJ1S0d+X1RPckBDWXxLflF1VWdTel96d1JWACFaRnZdQV1nSXlScEBiWnhdcndW;MTY1NDEzM0AzMjMxMmUzMTJlMzMzNURFRkRpUmNJaTB4MGNQblFVN2FETFlnTTFVWmVEZW1Vem1VcVp3UkdGelE9;NRAiBiAaIQQuGjN/V0d+XU9Hc1RGQmJNYVF2R2BJe1R1dV9FZ0wxOX1dQl9gSXpTcURlXH5dd3dQRWM=;ORg4AjUWIQA/Gnt2VFhhQlJBfVtdXGdWfFN0RnNddVtxflZBcDwsT3RfQF5jTX5Ud0NmWHxZc3JQRQ==;MTY1NDEzNkAzMjMxMmUzMTJlMzMzNW53MnJyTGh1dE5FN2l4T1dGQnBkMGNzNmVKWkZRSjgyRjZPZ09qaGxTVVk9;MTY1NDEzN0AzMjMxMmUzMTJlMzMzNVZENEhPY1NzclFiZ3FJTlplUzNYcFlncVR1c3FROEhaemlHTmdJSDl4V0U9;MTY1NDEzOEAzMjMxMmUzMTJlMzMzNUY0M3VmWGVoNlhZQzZpdld6NFlNZ1hjb1JadVVwR3lLZFkxYlFzeXRsVnc9;MTY1NDEzOUAzMjMxMmUzMTJlMzMzNUpSeGJtY1FjODh2b3lKenI3aExjL05aZHhoRHFIVlpvWWdlR3ZVbmhaZzg9;MTY1NDE0MEAzMjMxMmUzMTJlMzMzNWVodE1KV2FvT215S0w2S2tzTTUwRTAwY0w0MVhoN21kRTVMT05peFZIYWc9"
);

const openUrl =
  "https://services.syncfusion.com/js/production/api/spreadsheet/open";
const saveUrl =
  "https://services.syncfusion.com/js/production/api/spreadsheet/save";

const ViewDatabasePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await dbClient.get("/viewData");
        setData(data);
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
    })();
  }, []);

  return (
    <Stack className="rightContainer" spacing={1}>
      <div className="header">
        <p>Database Data</p>
      </div>
      <div className="viewDatabaseDiv">
        <SpreadsheetComponent
          allowOpen={true}
          openUrl={openUrl}
          allowSave={true}
          saveUrl={saveUrl}
        >
          <SheetsDirective>
            <SheetDirective>
              <RangesDirective>
                <RangeDirective dataSource={data}></RangeDirective>
              </RangesDirective>
              <ColumnsDirective>
                <ColumnDirective width={80} />
                <ColumnDirective width={200} />
                <ColumnDirective width={100} />
                <ColumnDirective width={100} />
                <ColumnDirective width={120} />
                <ColumnDirective width={200} />
                <ColumnDirective width={100} />
                <ColumnDirective width={120} />
                <ColumnDirective width={120} />
                <ColumnDirective width={100} />
                <ColumnDirective width={200} />
              </ColumnsDirective>
            </SheetDirective>
          </SheetsDirective>
        </SpreadsheetComponent>
      </div>
    </Stack>
  );
};

export default ViewDatabasePage;
