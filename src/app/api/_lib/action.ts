import clientPromise from "./connection";

type Employee = {
  id: number;
  name: string;
  email: string;
  salary: string;
};
const dbName = process.env.DB_NAME!;
const Table = process.env.TABLE_NAME!;

export const insertDataInDB = async (employee: Employee): Promise<boolean> => {
  try {
    console.log(employee);
    // Validate input
    if (!employee || !employee.name || !employee.email) {
      console.error("Invalid employee data:", employee);
      throw new Error("Name and email are required.");
    }

    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection(Table);

    // Insert the employee into the database
    const result = await collection.insertOne(employee);

    if (result && result.insertedId) {
      console.log("Successfully inserted employee with ID:", result.insertedId);
      return true;
    } else {
      console.error("Insert operation failed. No ID returned.");
      return false;
    }
  } catch (error) {
    console.error("Error in insertDataInDB:", error);
    throw error;
  }
};

export const getEmployeeDetails = async (): Promise<Employee[] | []> => {
  const client = await clientPromise;
  const db = client.db(dbName);
  const collection = db.collection(Table);

  const result = await collection.find({}).toArray();
  const res: Employee[] | [] = JSON.parse(JSON.stringify(result));
  return res;
};

export const deleteEmployee = async ({ id }: { id: number }): Promise<void> => {
  const client = await clientPromise;
  const db = client.db(dbName);
  const collection = db.collection(Table);
  console.log(id);
  await collection.deleteOne({ id: id });
};

export const updateEmplyoeeDetail = async ({
  id,
  employee,
}: {
  id: number;
  employee: Employee;
}): Promise<void> => {
  console.log(employee);
  console.log(id);
  const client = await clientPromise;
  const db = client.db(dbName);
  const collection = db.collection(Table);
  await collection.updateOne({ id }, { $set: { ...employee } });
};
