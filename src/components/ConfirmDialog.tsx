'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
};

export default function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmText = 'はい',
  cancelText = 'キャンセル',
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='rounded-xl shadow-lg bg-gray-50 w-[80%] sm:max-w-sm mx-auto'>
        <DialogHeader>
          <DialogTitle className='text-center text-lg font-bold'>
            {title}
          </DialogTitle>
          <DialogDescription className='text-sm text-center'>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className='flex justify-center gap-4 mt-4'>
          <Button
            variant='outline'
            className='rounded-xl px-4 border-black bg-gray-200 hover:bg-gray-300 cursor-pointer transition-transform hover:scale-105'
            onClick={() => onOpenChange(false)}
          >
            {cancelText}
          </Button>
          <Button
            className='rounded-xl px-4 text-white bg-red-500 hover:bg-red-600 cursor-pointer transition-transform hover:scale-105'
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
