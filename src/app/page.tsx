import Image from "next/image";
import Forms from "../../components/Forms";
import GetTodosUI from "../../components/GetTodo";

export default function Home() {
  return (
    <div className="min-h-screen relative bg-slate-200">
      <div className="flex justify-around flex-col items-center h-1/2 ">
        <h1 className=" text-4xl font-bold mt-12 mb-12">Todos Page</h1>
        <Forms />
      </div>
      <div className="flex  flex-col items-center h-1/2 ">
        <GetTodosUI />
      </div>
    </div>
  );
}
