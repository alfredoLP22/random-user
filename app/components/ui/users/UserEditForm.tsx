"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { User } from "@/app/lib/types";
import { Button } from "../Button";
import { useEditableUserStore } from "@/app/stores/editableUserStore";

const schema = z.object({
  firstName: z.string().min(2, "Nombre muy corto"),
  lastName: z.string().min(2, "Apellido muy corto"),
  email: z.string().email("Email inválido"),
});

type FormData = z.infer<typeof schema>;

export function UserEditForm({ user }: { user: User }) {
  const { updateUser } = useEditableUserStore();
  const [editing, setEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: user.name.first,
      lastName: user.name.last,
      email: user.email,
    },
  });

  const onSubmit = (data: FormData) => {
    updateUser(user.login.uuid, {
      uuid: user.login.uuid,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    });
    setEditing(false);
  };

  return (
    <div className="mt-10 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow">
      {!editing ? (
        <div className="text-center">
          <Button
            title="Editar"
            onClick={() => setEditing(true)}
            className="text-sm text-blue-500 hover:underline"
          >
            ✏️ Editar nombre y correo
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid sm:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              {...register("firstName")}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-blue-400"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
              Apellido
            </label>
            <input
              {...register("lastName")}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-blue-400"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
              Email
            </label>
            <input
              {...register("email")}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2 flex gap-4 mt-2">
            <Button
              title="Guardar"
              type="submit"
              disabled={!isValid}
              className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 text-white hover:text-white"
            >
              Guardar
            </Button>
            <Button
              title="Cancelar"
              type="button"
              onClick={() => setEditing(false)}
              className="px-4 py-2 border border-gray-400 text-gray-400 rounded hover:bg-gray-100"
            >
              Cancelar
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
