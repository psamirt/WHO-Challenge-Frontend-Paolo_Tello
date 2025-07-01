"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { AnimatePresence, motion } from "motion/react";
import { Product } from "@/types/types";

const ProductSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(100, "El título no puede exceder 100 caracteres")
    .required("El título es obligatorio"),
  price: Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : Number(originalValue)
    )
    .typeError("Debe ser un número")
    .positive("El precio debe ser un número positivo")
    .min(0.01, "El precio debe ser mayor a 0")
    .required("El precio es obligatorio"),
  description: Yup.string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no puede exceder 500 caracteres")
    .required("La descripción es obligatoria"),
  category: Yup.string()
    .min(2, "La categoría debe tener al menos 2 caracteres")
    .max(50, "La categoría no puede exceder 50 caracteres")
    .required("La categoría es obligatoria"),
  image: Yup.string()
    .url("Debe ser una URL válida")
    .required("La URL de la imagen es obligatoria"),
});

const CreateProduct = () => {
  const [showModal, setShowModal] = useState(false);
  const [productData, setProductData] = useState<Product | null>(null);
  const initialValues = {
    id: Number(Math.random().toString(36)),
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  };

  const handleSubmit = (
    values: typeof initialValues,
    { setSubmitting, resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    const product: Product = {
      id: values.id,
      title: values.title,
      price: Number(values.price),
      description: values.description,
      category: values.category,
      image: values.image,
    };
    setProductData(product);
    setShowModal(true);
    setSubmitting(false);
    resetForm();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="py-8"
      >
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="md:text-3xl font-bold text-gray-900 mb-6 text-center">
              Crear Nuevo Producto
            </h1>

            <Formik
              initialValues={initialValues}
              validationSchema={ProductSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="space-y-6">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Título del Producto *
                    </label>
                    <Field
                      type="text"
                      id="title"
                      name="title"
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black ${
                        errors.title && touched.title
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Ej: iPhone 15 Pro"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Precio *
                    </label>
                    <Field
                      type="number"
                      id="price"
                      name="price"
                      step="0.01"
                      min="0"
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 text-black focus:ring-blue-500 focus:border-blue-500 ${
                        errors.price && touched.price
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Categoría *
                    </label>
                    <Field
                      type="text"
                      id="category"
                      name="category"
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 text-black focus:ring-blue-500 focus:border-blue-500 ${
                        errors.category && touched.category
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Ej: Electrónicos"
                    />
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Descripción *
                    </label>
                    <Field
                      as="textarea"
                      id="description"
                      name="description"
                      rows={4}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 text-black focus:ring-blue-500 focus:border-blue-500 ${
                        errors.description && touched.description
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Describe las características del producto..."
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      URL de la Imagen *
                    </label>
                    <Field
                      type="url"
                      id="image"
                      name="image"
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 text-black focus:ring-blue-500 focus:border-blue-500 ${
                        errors.image && touched.image
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                    <ErrorMessage
                      name="image"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-blue-600 text-xs py-2 px-1 md:text-md md:py-2 md:px-4  text-white  rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmitting ? "Creando..." : "Crear Producto"}
                    </button>

                    <button
                      type="reset"
                      className="flex-1 bg-gray-300 text-gray-700 text-xs py-2 px-1 md:text-md md:py-2 md:px-4  rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                    >
                      Limpiar
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white p-6 rounded-md max-w-xl w-full shadow-lg relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <h2 className="text-xl text-gray-700 font-bold mb-4">
                  Producto Creado
                </h2>
                <pre className="bg-gray-100 text-sm p-4 overflow-x-auto rounded-md max-h-[400px] text-black">
                  {JSON.stringify(productData, null, 2)}
                </pre>
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Cerrar
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreateProduct;
