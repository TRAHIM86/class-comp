export const TableResult = () => {
  return (
    <div className="border-3 border-orange-500 border-dotted w-full flex flex-col items-center">
      <div className="flex flex-row border-1 border-orange-500 h-8 w-full">
        <div className="border-1 border-orange-500 w-1/3 flex items-center justify-center">
          Item Name
        </div>
        <div className="border-1 border-orange-500 w-2/3 flex items-center justify-center">
          Item Description
        </div>
      </div>
      <div className="flex flex-row border-1 border-orange-500 w-full">
        <div className="border-1 border-green-500 w-1/3 p-1">Item ...</div>
        <div className="border-1 border-green-500 w-2/3 p-1">
          Description ...
        </div>
      </div>
    </div>
  );
};
