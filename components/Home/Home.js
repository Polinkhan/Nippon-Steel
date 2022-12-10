import { Center, Image, VStack } from "native-base";
import { useDataContext } from "../../contexts/DataContext";
import { theme } from "../../utils/StaticVariable";

import { SliderBox } from "react-native-image-slider-box";
import Header from "../Header";
import { ff, imgLoaction } from "../../utils/StaticData";

const { primaryBackgroundColor } = theme;

const Home = ({ navigation }) => {
  const { currentUser } = useDataContext();
  return (
    <VStack h={"100%"} bg={primaryBackgroundColor}>
      {/*  */}

      {/* Header Sction */}
      <Header N1={"Welcome Back"} N2={currentUser.name} N3={"Dashboard"} />
      {/*  */}

      {/* Body Section */}
      <Center h={"30%"}>
        <Image
          w={"60%"}
          alt=""
          source={imgLoaction}
          style={{ resizeMode: "contain" }}
        />
      </Center>
      {/*  */}

      {/* Image Slider */}
      <Center h={250}>
        <SliderBox
          images={[
            "https://www.eng.nipponsteel.com/english/globalnetwork/upload/images/thailand-01_01.jpg",
            "https://scontent.fdac41-1.fna.fbcdn.net/v/t1.6435-9/182277671_3707824042662658_3993181151881056782_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeHqjV9lD29mKEJGaxr9WgfbcpEuxNiXjfZykS7E2JeN9g_nYyCetzYYIRGaEXB_wMm_lmP8gYyEkT8fR4y1htXI&_nc_ohc=FozMLRJ_bWwAX-9zWL_&_nc_ht=scontent.fdac41-1.fna&oh=00_AfAW6jKVK1jO5RFtagH1eanE30sVE5QItmieRU_8ny093w&oe=63B4A118",
            "https://www.eng.nipponsteel.com/english/images/business04.jpg",
            "https://www.eng.nipponsteel.com/english/whatwedo/upload/images/4-1-2_01.jpg",
          ]}
          sliderBoxHeight={250}
          ImageComponentStyle={{ borderRadius: 10, width: "95%" }}
          imageLoadingColor="#2196F3"
        />
      </Center>
    </VStack>
  );
};

export default Home;
