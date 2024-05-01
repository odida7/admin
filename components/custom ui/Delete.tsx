import React, { useState } from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

interface DeleteProps {
  item: string;
  id: string;  
}

const Delete:React.FC<DeleteProps> = ({id, item}) => {

  const [loading, setLoading] = useState(false);

  const onDelete = async ()=> {
    try{
      setLoading(true);
      const itemType = item === 'product' ? 'products' : 'categories';
      const res =  await fetch(`/api/${item}/${id}`, {
        method: 'DELETE',
      })
      
      if (res.ok){
        window.location.href = (`/${itemType}`);
        toast.success(`${item} deleted successfully`)
        setLoading(false);
      }
    
    }catch(err){
      console.log(`${item}`, err)
      toast.error("Something went wrong! Please try again.")
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button type="button" className="bg-red-500 text-white">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your {' '}
            {item}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500 text-white" onClick={onDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
