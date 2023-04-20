import { useMediaQuery } from "@mui/material";

const useResponsiveSizes = () => {
  const xl = useMediaQuery("(min-width:1500px)");
  const lg = useMediaQuery("(min-width:1200px)");
  const md = useMediaQuery("(min-width:576px)");
  const sm = useMediaQuery("(max-width:576px)");

  const regulerFontSize = xl ? 14 : 12;

  return { xl, lg, md, sm, regulerFontSize };
};
export default useResponsiveSizes;
