import { Divider, Stack } from "@mui/material";
import Header from "../components/Header";
import imgSrc from "../assets/SVG/Teams.svg";
import { useWindowDimensions } from "../Hooks/useWindowDimensions";

const TeamPage = () => {
  const { height } = useWindowDimensions();
  return (
    <Stack flex={1} sx={{ backgroundColor: "#fff" }}>
      <Header name={"Teams"} />
      <Stack flex={1} py={2} px={4} spacing={5}>
        <Stack alignItems={"center"}>
          <img src={imgSrc} width={height / 4} />
        </Stack>
        <p style={{ textAlign: "center", color: "gray" }}>
          Peoples behind this incredible (App)
        </p>
        <Stack
          px={5}
          py={2}
          spacing={1.5}
          divider={<Divider />}
          sx={{ backgroundColor: "#f9f9f9", borderRadius: 2 }}
        >
          {data.map(({ name }, i) => (
            <p key={i} style={{ textAlign: "center", color: "gray" }}>
              {name}
            </p>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
export default TeamPage;

const data = [
  {
    id: 1,
    name: "Iwamoto Kazuyuki",
  },
  {
    id: 2,
    name: "Okauchi Fumihiko",
  },
  {
    id: 3,
    name: "Yoshida Jun",
  },
  {
    id: 4,
    name: "Yong Chooi lin",
  },
  {
    id: 5,
    name: "Clifton O'Keeffe",
  },
  {
    id: 6,
    name: "Siti Daria Mohd",
  },

  {
    id: 7,
    name: "MD Naeem Khan",
  },
];
