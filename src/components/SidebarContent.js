import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import SidebarHeader from "./SidebarHeader";
import { Link } from "react-router-dom";

const SidebarContent = () => {
  return (
    <Sidebar>
      <SidebarHeader />
      <Menu>
        <MenuItem
          icon={<i class="fa-solid fa-house-chimney"></i>}
          routerLink={<Link to="/" />}
        >
          หน้าแรก
        </MenuItem>
        <MenuItem
          icon={<i class="fa-solid fa-fish-fins"></i>}
          routerLink={<Link to="/ponds" />}
        >
          บ่อปลา
        </MenuItem>
        <SubMenu label="กรอกข้อมูล" icon={<i class="fa-solid fa-table"></i>}>
          <MenuItem routerLink={<Link to="/fillData/feed-in" />}>
            เหยื่อเข้า
          </MenuItem>
          <MenuItem routerLink={<Link to="/fillData/daily-feed" />}>
            เหยื่อรายวัน
          </MenuItem>
          <MenuItem routerLink={<Link to="/fillData/bill" />}>ค่าไฟ</MenuItem>
          <MenuItem routerLink={<Link to="/fillData/feed-price" />}>
            ราคาเหยื่อ
          </MenuItem>
        </SubMenu>
        <MenuItem
          icon={<i class="fa-solid fa-chart-simple"></i>}
          routerLink={<Link to="/stats" />}
        >
          สถิติ
        </MenuItem>
        <MenuItem
          icon={<i class="fa-solid fa-clock-rotate-left"></i>}
          routerLink={<Link to="/history" />}
        >
          ประวัติ
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SidebarContent;
