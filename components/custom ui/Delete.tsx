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
  id: string;  
}

const Delete:React.FC<DeleteProps> = ({id}) => {

  const [loading, setLoading] = useState(false);

  const onDelete = async ()=> {
    try{
      setLoading(true);
      const res =  await fetch(`/api/category/${id}`, {
        method: 'DELETE',
      })
      
      if (res.ok){
        window.location.href = ('/categories');
        toast.success('Category deleted successfully')
        setLoading(false);
      }
    
    }catch(err){
      console.log('CategoryDelete', err)
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
            This action cannot be undone. This will permanently delete your
            category.
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
