import * as logos from "@/assets/logos";

export async function getTopProducts() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [
    {
      image: "/images/product/product-01.png",
      name: "Apple Watch Series 7",
      category: "Electronics",
      price: 296,
      sold: 22,
      profit: 45,
    },
    {
      image: "/images/product/product-02.png",
      name: "Macbook Pro M1",
      category: "Electronics",
      price: 546,
      sold: 12,
      profit: 125,
    },
    {
      image: "/images/product/product-03.png",
      name: "Dell Inspiron 15",
      category: "Electronics",
      price: 443,
      sold: 64,
      profit: 247,
    },
    {
      image: "/images/product/product-04.png",
      name: "HP Probook 450",
      category: "Electronics",
      price: 499,
      sold: 72,
      profit: 103,
    },
  ];
}

export async function getInvoiceTableData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      name: "Free package",
      price: 0.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Paid",
    },
    {
      name: "Standard Package",
      price: 59.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Paid",
    },
    {
      name: "Business Package",
      price: 99.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Unpaid",
    },
    {
      name: "Standard Package",
      price: 59.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Pending",
    },
  ];
}

export async function getTopChannels() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return [
    {
      name: "Google",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.google,
    },
    {
      name: "X.com",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.x,
    },
    {
      name: "Github",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.github,
    },
    {
      name: "Vimeo",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.vimeo,
    },
    {
      name: "Facebook",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.facebook,
    },
  ];
}

interface AllUsersTableData {
  fullname: string,
  email: string,
  nickName: string,
  username: string,
  role: "client" | "member" | "admin",
  createdAt: Date,
  image: string,
}

export async function getAllUsers() {
  return new Promise<AllUsersTableData[]>((resolve, reject) => {
    try {
      const data: AllUsersTableData[] = [
        {
          fullname: "John David",
          nickName: "John",
          username: "john",
          email: "test@email.com",
          role: "admin",
          createdAt: new Date(),
          image: "/images/user/user-01.png"
        },
        {
          fullname: "Mathew David",
          nickName: "Mathew",
          email: "test@email.com",
          username: "Mathew",
          role: "client",
          createdAt: new Date(),
          image: "/images/user/user-02.png"
        },
        {
          fullname: "Mariya David",
          nickName: "Mariya",
          email: "test@email.com",
          username: "Mariya",
          role: "member",
          createdAt: new Date(),
          image: "/images/user/user-03.png"
        },
      ]
      return resolve(data);
    } catch (err) {
      let errMessage = "Something went wrong!";
      if (err instanceof Error) {
        errMessage = err.message;
      } else if (typeof err === "string") {
        errMessage = err;
      }

      reject(errMessage);
    }
  })
}

interface ListingsTableDataInterface {
  name: string,
  startFrom: number,
  state: string,
  city: string,
}

export async function getAllListings () {
  return new Promise<ListingsTableDataInterface[]>((resolve, reject) => {
    try {

      const data: ListingsTableDataInterface[] = [
        {
          name: "Plot 1",
          startFrom: 100000,
          state: "Delhi",
          city: "Test City",
        },
        {
          name: "Plot 2",
          startFrom: 200000,
          state: "Delhi",
          city: "Test City",
        },
        {
          name: "Plot 1",
          startFrom: 350000,
          state: "Delhi",
          city: "Test City",
        },
      ]

      return resolve(data);

    } catch (err) {
      let errMessage = "Something went wrong!";
      if (err instanceof Error) {
        errMessage = err.message;
      } else if (typeof err === "string") {
        errMessage = err;
      }

      reject(err);
    }
  })
}