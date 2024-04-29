import { TRoutePath, TSidebarItem } from "../types";
import { NavLink } from "react-router-dom";

export const sidebarMenuGenerator = (items: TRoutePath[], role: string) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.name && !item.children) {
      acc.push({
        key: item.name,
        icon: item?.icon,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    } else if (item.children) {
      acc.push({
        key: item.name,
        icon: item?.icon,
        label: item.name,
        children: item.children.map((child) => {
          return {
            key: child.name,
            icon: child?.icon,
            label: (
              <NavLink to={`/${role}/${item.path}/${child.path}`}>
                {child.name}
              </NavLink>
            ),
          };
        }),
      });
    }
    return acc;
  }, []);
  console.log("sidebarItems", sidebarItems);
  return sidebarItems;
};
