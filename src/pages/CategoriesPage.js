import { useSelector } from "react-redux";


const CategoriesPage = () => {
const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

const handleCreateCategory = () => {
  // Code để xử lý việc tạo category ở đây
  console.log("Creating category...");
};
  return (
    <>
      <div>
        <h1>Create a new category</h1>
        <div className="container p-8 mx-auto">
          <div className="flex flex-row mb-4 space-x-4">
            <div className="flex flex-col items-start w-1/2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col items-start w-1/2">
              <label
                htmlFor="type"
                className="text-sm font-medium text-gray-700"
              >
                Type
              </label>
              <select
                id="type"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleCreateCategory}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Create Category
      </button>
    </>
  );
};

export default CategoriesPage;
