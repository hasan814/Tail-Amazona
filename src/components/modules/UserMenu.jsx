import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const UserMenu = ({ data, logoutHandler }) => {
  // =========== Rendering =============
  return (
    <Menu as={"div"} className="relative inline-block">
      <MenuButton className="text-blue-600">
        {data?.user?.name?.toUpperCase()}
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className="absolute right-0 w-56 origin-top-right shadow-lg p-4 bg-white"
      >
        <MenuItem>
          <a className="block p-2 data-[focus]:bg-blue-100" href="/profile">
            Profile
          </a>
        </MenuItem>
        <MenuItem>
          <a
            className="block p-2 data-[focus]:bg-blue-100"
            href="/order-hsitory"
          >
            Order History
          </a>
        </MenuItem>
        <MenuItem>
          <a
            className="block p-2 data-[focus]:bg-blue-100"
            onClick={logoutHandler}
          >
            Logout
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default UserMenu;
