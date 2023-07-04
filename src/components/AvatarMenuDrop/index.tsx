import useAuth from "@/hook/Auth";
import { Dropdown } from "@nextui-org/react";
import Avatar from "@mui/joy/Avatar";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export default function AvatorMenuDrop() {
  const auth = useAuth();
  return (
    auth?.user && (
      <Dropdown>
        <Dropdown.Trigger>
        <Avatar
            alt={auth.user.email?.toUpperCase() || "G"}
            src={undefined}
            color="primary"
        />
        </Dropdown.Trigger>
        <Dropdown.Menu aria-label="Static Actions" onAction={(key) => {
          if (key == 'Sign Out') {
            auth.logout();
          }
        }}>
          <Dropdown.Item key="Profile" icon={<AccountCircleOutlinedIcon />}>Profile</Dropdown.Item>
          <Dropdown.Item key="Settings" icon={<SettingsOutlinedIcon />}>Settings</Dropdown.Item>
          <Dropdown.Item key="Sign Out" color="error" withDivider icon={<ExitToAppRoundedIcon />}>
            Sign Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  );
}
