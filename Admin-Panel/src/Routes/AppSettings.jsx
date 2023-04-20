import {
  Add,
  AddCircleOutline,
  Delete,
  Edit,
  TaskAltRounded,
} from "@mui/icons-material";
import {
  Button,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { dbClient } from "../Api/Client";
import useResponsiveSizes from "../hooks/useResponsiveSizes";

const AppSettings = () => {
  const { lg } = useResponsiveSizes();

  return (
    <Stack className="rightContainer" spacing={1}>
      <div className="header">
        <p>App Settings</p>
      </div>
      <Stack direction={lg ? "row" : "column"} spacing={1} flex={1}>
        <DocumentTypes />
        <AdminContacts />
        <ServerStatistics />
      </Stack>
    </Stack>
  );
};

const DocumentTypes = () => {
  const labelData = ["Type", "Modify"];

  const flexing = [2, 1];

  const [types, setTypes] = useState([]);

  const FETCH = async () => {
    dbClient.get("/app/types").then(({ data }) => setTypes(data));
  };

  useEffect(() => {
    FETCH();
  }, []);

  const handleAdd = async () => {
    await dbClient.post("/app/types/add");
    FETCH();
  };

  const handleClick = async (type, data) => {
    if (type === "delete") {
      await dbClient.post("/app/types/delete", { ID: data.ID });
      FETCH();
    } else if (type === "submit") {
      await dbClient.post("/app/types/update", data);
      FETCH();
    }
  };

  return (
    <Stack
      flex={1}
      spacing={1}
      className="appSettingsBox"
      divider={<Divider />}
    >
      <div style={{ margin: "20px 0", textAlign: "center" }}>
        <p style={{ fontSize: 20, fontWeight: "bold" }}>Document Types</p>
      </div>
      <Label labelData={labelData} flexing={flexing} />
      {types.map((item, i) => (
        <TypeBox
          key={i}
          item={item}
          flexing={flexing}
          handleClick={handleClick}
        />
      ))}
      <Button
        startIcon={<AddCircleOutline />}
        variant="contained"
        onClick={handleAdd}
      >
        Add New
      </Button>
    </Stack>
  );
};

const AdminContacts = () => {
  const labelData = ["Name", "Email", "Number", "Modify"];

  const flexing = [1, 2, 1.5, 1];

  const [admins, setAdmins] = useState([]);

  const FETCH = async () => {
    dbClient.get("/app/adminContact").then(({ data }) => setAdmins(data));
  };

  useEffect(() => {
    FETCH();
  }, []);

  const handleAdd = async () => {
    await dbClient.post("/app/adminContact/add");
    FETCH();
  };

  const handleClick = async (type, data) => {
    if (type === "delete") {
      await dbClient.post("/app/adminContact/delete", { ID: data.ID });
      FETCH();
    } else if (type === "submit") {
      await dbClient.post("/app/adminContact/update", data);
      FETCH();
    }
  };

  return (
    <Stack
      flex={1.5}
      spacing={1}
      className="appSettingsBox"
      divider={<Divider />}
    >
      <div style={{ margin: "20px 0", textAlign: "center" }}>
        <p style={{ fontSize: 20, fontWeight: "bold" }}>Admin Contact List</p>
      </div>
      <Label labelData={labelData} flexing={flexing} />
      {admins.map((item, i) => (
        <TypeBox
          key={i}
          item={item}
          handleClick={handleClick}
          flexing={flexing}
        />
      ))}
      <Button
        startIcon={<AddCircleOutline />}
        variant="contained"
        onClick={handleAdd}
      >
        Add New
      </Button>
    </Stack>
  );
};

const TypeBox = ({ item, flexing, handleClick }) => {
  const [editMode, setEditMode] = useState(false);
  const [input, setInput] = useState(item);

  const handleDelete = () => {
    handleClick("delete", item);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick("submit", input);
    setEditMode(false);
  };

  if (editMode)
    return (
      <form onSubmit={handleSubmit}>
        <Stack
          direction={"row"}
          textAlign={"center"}
          alignItems={"center"}
          divider={<Divider orientation="vertical" />}
        >
          {Object.keys(item).map((label, i) => {
            if (label === "ID") return;
            else {
              return (
                <div key={i} style={{ flex: flexing[i] }}>
                  <TextField
                    style={{ width: "95%" }}
                    autoFocus
                    size={"small"}
                    value={input[label]}
                    variant="outlined"
                    onChange={(e) =>
                      setInput((prev) => ({ ...prev, [label]: e.target.value }))
                    }
                    // InputProps={{ disableUnderline: true }}
                  />
                </div>
              );
            }
          })}

          <Stack
            flex={1}
            direction={"row"}
            justifyContent={"center"}
            spacing={1}
          >
            <CustomIconButton color="success" type={"submit"}>
              <TaskAltRounded />
            </CustomIconButton>
            <CustomIconButton color="error" onClick={handleDelete}>
              <Delete />
            </CustomIconButton>
          </Stack>
        </Stack>
      </form>
    );
  let count = 0;
  return (
    <Stack
      direction={"row"}
      textAlign={"center"}
      alignItems={"center"}
      className="typeBox"
      divider={<Divider orientation="vertical" />}
    >
      {Object.keys(item).map((label, i) => {
        if (label === "ID") return;
        return (
          <p key={i} style={{ flex: flexing[count++] }}>
            {item[label]}
          </p>
        );
      })}
      <Stack flex={1} direction={"row"} justifyContent={"center"} spacing={1}>
        <CustomIconButton color="info" onClick={() => setEditMode(true)}>
          <Edit />
        </CustomIconButton>
        <CustomIconButton color="error" onClick={handleDelete}>
          <Delete />
        </CustomIconButton>
      </Stack>
    </Stack>
  );
};

const CustomIconButton = (props) => {
  return (
    <Button
      variant="outlined"
      style={{
        maxWidth: "30px",
        maxHeight: "30px",
        minWidth: "30px",
        minHeight: "30px",
      }}
      {...props}
    />
  );
};

const Label = ({ labelData, flexing }) => {
  return (
    <Stack
      direction={"row"}
      textAlign={"center"}
      sx={{ fontWeight: "bold" }}
      divider={<Divider orientation="vertical" />}
    >
      {labelData.map((name, i) => (
        <p key={i} style={{ flex: flexing[i] }}>
          {name}
        </p>
      ))}
    </Stack>
  );
};

const ServerStatistics = () => {
  const [serverData, setServerData] = useState([]);
  const [loading, setLoading] = useState(false);

  const FETCH = async () => {
    dbClient.get("/appSettings").then(({ data }) => {
      setServerData(data);
    });
  };

  useEffect(() => {
    FETCH();
  }, []);

  const handleChange = (value, name) => {
    setLoading(true);
    const data = value ? "enable" : "disable";
    dbClient
      .post("/appSettings/update", { name, data })
      .then(() => {
        FETCH();
      })
      .finally(() => setLoading(false));
  };

  return (
    <Stack
      flex={1}
      spacing={1}
      className="appSettingsBox"
      divider={<Divider />}
    >
      <div style={{ margin: "20px 0", textAlign: "center" }}>
        <p style={{ fontSize: 20, fontWeight: "bold" }}>Server Statistics</p>
      </div>

      <Stack spacing={2} divider={<Divider />}>
        <Stack direction={"row"} divider={<Divider orientation="vertical" />}>
          <p style={{ flex: 1.5, textAlign: "center", fontWeight: "bold" }}>
            Description
          </p>
          <p style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>
            Status
          </p>
        </Stack>
        {serverData.map(({ Name, data }, i) => (
          <Stack
            direction={"row"}
            key={i}
            divider={<Divider orientation="vertical" />}
          >
            <p style={{ flex: 1.5, textAlign: "center" }}>{Name}</p>
            <Stack flex={1} alignItems={"end"}>
              <FormControlLabel
                control={
                  <Switch
                    disabled={loading}
                    size="small"
                    checked={data === "enable"}
                    onChange={(e) => handleChange(e.target.checked, Name)}
                  />
                }
                label={`(${data})`}
              />
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default AppSettings;
