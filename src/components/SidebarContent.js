import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import SidebarHeader from "./SidebarHeader";
const SidebarContent = () => {
  return (
    <Sidebar>
      <SidebarHeader />
      <Menu>
        <MenuItem icon={<i class="fa-solid fa-house-chimney"></i>}>
          หน้าแรก
        </MenuItem>
        <MenuItem icon={<i class="fa-solid fa-fish-fins"></i>}>บ่อปลา</MenuItem>
        <SubMenu label="กรอกข้อมูล" icon={<i class="fa-solid fa-table"></i>}>
          <MenuItem> เหยื่อเข้า </MenuItem>
          <MenuItem> เหยื่อรายวัน </MenuItem>
          <MenuItem> ค่าไฟ </MenuItem>
          <MenuItem> ราคาเหยื่อ </MenuItem>
        </SubMenu>
        <MenuItem icon={<i class="fa-solid fa-chart-simple"></i>}>
          สถิติ
        </MenuItem>
        <MenuItem icon={<i class="fa-solid fa-clock-rotate-left"></i>}>
          ประวัติ
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SidebarContent;
