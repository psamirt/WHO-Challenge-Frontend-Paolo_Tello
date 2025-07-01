"use client";
import { ModalProps } from "@/types/types";
import { AnimatePresence, motion } from "motion/react";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-md shadow-md max-w-sm w-full"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <h1 className="text-xl font-bold mb-4 text-gray-800">Eliminar</h1>
            <p className="mb-6 text-gray-600">
              ¿Estás seguro de eliminar este producto del carrito?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 btn btn-outline rounded"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 btn btn-outline btn-error rounded "
              >
                Eliminar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;
