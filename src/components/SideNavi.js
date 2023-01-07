import React from "react";
import "./SideNavi.css";
import SideNav, {
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import Header from "./Header";

const SideNavi = () => {
  return (
    <SideNav
      onSelect={(selected) => {
        console.log(selected);
      }}
      className="side-navi"
    >
      <Header />
      <Nav defaultSelectd="home">
        <NavItem eventKey="หน้าแรก">
          <NavIcon>
            <i class="fa-sharp fa-solid fa-house"></i>
          </NavIcon>
          <NavText>หน้าแรก</NavText>
        </NavItem>

        <NavItem eventKey="บ่อปลา">
          <NavIcon>
            <i class="fa-sharp fa-solid fa-fish"></i>
          </NavIcon>
          <NavText>บ่อปลา</NavText>
        </NavItem>

        <NavItem eventKey="กรอกข้อมูล">
          <NavIcon>
            <i class="fa-sharp fa-solid fa-table"></i>
          </NavIcon>
          <NavText>กรอกข้อมูล</NavText>
          <NavItem>
            <NavText>เหยื่อเข้า</NavText>
          </NavItem>
          <NavItem>
            <NavText>เหยื่อรายวัน</NavText>
          </NavItem>
          <NavItem>
            <NavText>ค่าไฟ</NavText>
          </NavItem>
          <NavItem>
            <NavText>ราคาเหยื่อ</NavText>
          </NavItem>
        </NavItem>

        <NavItem eventKey="สถิติ">
          <NavIcon>
            <i class="fa-sharp fa-solid fa-chart-simple"></i>
          </NavIcon>
          <NavText>สถิติ</NavText>
        </NavItem>

        <NavItem eventKey="ประวัติ">
          <NavIcon>
            <i class="fa-sharp fa-solid fa-clock-rotate-left"></i>
          </NavIcon>
          <NavText>ประวัติ</NavText>
        </NavItem>
      </Nav>
    </SideNav>
  );
};

export default SideNavi;
