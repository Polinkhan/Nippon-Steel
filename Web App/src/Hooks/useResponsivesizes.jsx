import { useMediaQuery } from "@mui/material";
import { useWindowDimensions } from "./useWindowDimensions";

const useResponsiveSizes = () => {
  const xl = useMediaQuery("(min-width:1500px)");
  const lg = useMediaQuery("(min-width:1200px)");
  const md = useMediaQuery("(min-width:576px)");
  const sm = useMediaQuery("(max-width:576px)");

  const { height, width } = useWindowDimensions();
  const regulerFontSize = xl ? 14 : md ? 12 : width / 35;

  return { xl, lg, md, sm, regulerFontSize };
};
export default useResponsiveSizes;
