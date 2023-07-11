import useAuth from "@/hook/Auth";
import { Dropdown } from "@nextui-org/react";
import Avatar from "@mui/joy/Avatar";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Typography from "@mui/joy/Typography";

export default function AvatorMenuDrop() {
  const auth = useAuth();
  return (
    auth?.user && (
      <Dropdown>
        <Dropdown.Trigger>
          <div className="cursor-pointer">
            <Avatar
              alt={auth.user.email?.toUpperCase() || "G"}
              src={auth.user.photoURL || undefined}
              color="primary"
            />
          </div>
        </Dropdown.Trigger>
        <Dropdown.Menu
          aria-label="Static Actions"
          onAction={(key) => {
            if (key == "Sign Out") {
              auth.logout();
            }
          }}>
          <Dropdown.Item
            key="Profile"
            textValue="Profile"
            icon={<AccountCircleOutlinedIcon />}>
            <Typography>Profile</Typography>
          </Dropdown.Item>
          <Dropdown.Item
            key="Settings"
            textValue="Settings"
            icon={<SettingsOutlinedIcon />}>
            <Typography>Settings</Typography>
          </Dropdown.Item>
          <Dropdown.Item
            key="Sign Out"
            textValue="Sign Out"
            color="error"
            withDivider
            icon={<ExitToAppRoundedIcon />}>
            <Typography>Sign Out</Typography>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  );
}
