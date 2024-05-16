import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import toggler from "../../../../assets/images/3.png";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LogoutIcon from "@mui/icons-material/Logout";

export default function SideBar({ loginData }) {
  const [isCollapse, setIsCollapse] = useState(false);
  const toggleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  const navigate = useNavigate();
  
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className="sidebar-container   rounded-end ">
        <Sidebar collapsed={isCollapse} className="  vh-100">
          <Menu>
            <MenuItem
              active="ps-active"
              onClick={toggleCollapse}
              className="my-2"
            >
              <img src={toggler} alt="" />
            </MenuItem>
            <MenuItem className="my-2" component={<Link to="/dashboard" />}>
              <HomeIcon /> Home
            </MenuItem>

            <MenuItem
              className="my-2"
              component={<Link to="/dashboard/recipes" />}
            >
              <RestaurantMenuIcon /> Recipes
            </MenuItem>

            <MenuItem onClick={logout} className="my-2">
              <LogoutIcon /> Log Out
            </MenuItem>
          </Menu>
        </Sidebar>
        ;
      </div>
    </>
  );
}
