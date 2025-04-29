import React from "react";
import { tramp } from "../assets";
import { Button } from "antd";

function Products() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex justify-between items-center pb-3">
        <h1 className="text-xl font-black">Products</h1>
        <Button type="primary" size="large">
          Add Product
        </Button>
      </div>
      <table className="table-fixed w-full border border-black/10-collapse">
        <thead className="bg-black/20 h-12">
          <tr>
            <th className="w-[2%] border border-black/10 px-2">№</th>
            <th className="w-[10%] border border-black/10 px-2">Images</th>
            <th className="w-[10%] border border-black/10 px-2">Title</th>
            <th className="w-[32%] border border-black/10 px-2">Description</th>
            <th className="w-[4%] border border-black/10 px-2">Price</th>
            <th className="w-[6%] border border-black/10 px-2">Category</th>
            <th className="w-[5%] border border-black/10 px-2">Colors</th>
            <th className="w-[4%] border border-black/10 px-2">Sizes</th>
            <th className="w-[8%] border border-black/10 px-2">Discount</th>
            <th className="w-[7%] border border-black/10 px-2">Materials</th>
            <th className="w-[12%] border border-black/10 px-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr className="hover:bg-gray-100">
            <td className="border border-black/10 px-2 text-center">1</td>
            <td className="border border-black/10 px-2">
              <img
                src={tramp}
                alt="tramp"
                className="w-full h-24 py-1 rounded-xl object-cover mx-auto"
              />
            </td>
            <td className="border border-black/10 px-2 text-center">
              Principal Web Director
            </td>
            <td className="border border-black/10 px-2 text-center">
              Assumenda velit eveniet quasi voluptates itaque unde mollitia
              dolorum.
            </td>
            <td className="border border-black/10 px-2 text-center">$11</td>
            <td className="border border-black/10 px-2 text-center">Hello</td>
            <td className="border border-black/10 px-2 text-center">-</td>
            <td className="border border-black/10 px-2 text-center">25</td>
            <td className="border border-black/10 px-2 text-center">
              No Discount
            </td>
            <td className="border border-black/10 px-2 text-center">-</td>
            <td className="border border-black/10 px-2 flex items-center h-24 justify-center gap-2 py-2 ">
              <Button type="primary" size="large">
                Edit
              </Button>
              <Button danger size="large">
                Delete
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Products;
