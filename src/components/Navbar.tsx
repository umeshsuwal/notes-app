"use client"

import { Search, Plus } from 'lucide-react'
import { Input } from "./ui/input"
import { Button } from "./ui/button"

interface NavbarProps {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setIsAdding, onSearch }) => {
  return (
    <div className="flex justify-center h-16 items-center px-4 border-b border-gray-200 bg-white">
      <div className="flex flex-1 justify-center gap-16 items-center space-x-8">
        <div className="relative flex-1 max-w-3xl">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 py-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-800" aria-hidden="true" />
          </div>
          <Input
            type="search"
            placeholder="Search"
            className="w-full pl-10 py-5 bg-gray-50 border-gray-200 text-gray-600 rounded-mid focus:border-gray-300 focus:ring-0"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-5 rounded-xl text-sm font-medium" onClick={() => setIsAdding(true)}>
          <Plus className="h-4 w-4 mr-1 text-white" />
          Add Note
        </Button>
      </div>
    </div>
  )
}

export default Navbar;

