
interface RolesPermissionsListInterface {
    [role: string]: string[],
}

const permissions: RolesPermissionsListInterface = {
    "all": [
        "/app",
        "/app/my-account",
    ],
    "manager": [
        "/app/admin/users/add",
        "/app/admin/users",
        "/app/listings",
        "/app/listings/add",
        "/app/listings/edit",
        "/app/listings/updates",
        "/app/listings/delete",
    ],
    "executive": [
        "/app/listings",
        "/app/listings/add",
        "/app/listings/edit",
        "/app/listings/updates",
        "/app/listings/delete",
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