import { SidebarMenuItemsInterface } from "./data";
import { verifyPermission } from "@/permissions";

export function conditionRenderMenus({
    NAV_DATA,
    role,
}: {
    NAV_DATA: SidebarMenuItemsInterface[],
    role: string,
}): SidebarMenuItemsInterface[] {
    try {

        let finalData: SidebarMenuItemsInterface[] = NAV_DATA;

        finalData = finalData.filter((section) => {
            const menuItems = section.items.filter((item) => {
                if (item.url) {
                    const isAllowed = verifyPermission({ role, endpoint: item.url });
                    if (isAllowed) {
                        return item;
                    }
                } else if (item.items) {
                    const subItems = item.items.filter((subItem) => {
                        const isAllowed = verifyPermission({ role, endpoint: subItem.url });
                        if (isAllowed) {
                            return subItem;
                        }
                    })

                    item["items"] = subItems;
                    if (item.items.length > 0) {
                        return item;
                    }
                }
            })

            section["items"] = menuItems;
            
            if (section.items.length > 0) {
                return section;
            }
        })

        return finalData;

    } catch (err) {
        console.log(err);
        return [];
    }
}