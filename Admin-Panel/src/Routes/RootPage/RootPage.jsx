import "./rootPage.css";
import Navbar from "../../components/Navbar";

const RootPage = () => {
  return (
    <>
      <div className={"rootContainer"}>
        <div className={"absoluteBackground"} />
        <Navbar />
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ flex: 8 }}></div>
        </div>
      </div>
    </>
  );
};

const Sidebar = () => {
  return <div className={"sideContainer"}>dfgdfg</div>;
};
export default RootPage;
