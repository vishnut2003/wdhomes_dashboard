
interface RolesPermissionsListInterface {
    [role: string]: string[],
}

const permissions: RolesPermissionsListInterface = {
    "all": [
        "/app",
    ],
    "manager": [
        "/app/admin/users/add",
        "/app/admin/users",
        "/app/listings/add",
        "/app/listings",
    ],
    "member": [
        "/app/listings/add",
        "/app/listings",
    ],
    "client": [
        "/app",
    ]
}

export function verifyPermission({ endpoint, role }: {
    role: string,
    endpoint: string,
}) {
    if (permissions["all"]?.includes(endpoint)) {
        return true;
    } else if (permissions[role]?.includes(endpoint)) {
        return true;
    } else {
        return false;
    }
}