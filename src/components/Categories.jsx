import Data from "@/Shared/Data"

function Categories() {
  return (
    <div className="mt-40">
      <h2 className="font-bold text-3xl text-center mb-6">Browse By Type</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-6 px-20 items-center">
        { Data.Categories.map((category) => (
            <div className="flex flex-col border rounded-xl p-3 items-center hover:shadow-md hover:cursor-pointer">
                <img src={category.icon} className="object-cover w-11 h-11" />
                <h2 className="mt-2">{category.name}</h2>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Categories
