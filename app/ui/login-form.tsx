import { authenticate } from "@/app/lib/actions";
import {
  ArrowRightIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "./buttons/button";
import { Email } from "./icons/Email";
import { Key } from "./icons/Key";
import { Logo } from "./logo/Logo";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form
      action={dispatch}
      className="px-6 py-8 flex flex-col gap-4 rounded-lg w-[300px] shadow-md bg-gray-50"
    >
      <div className="flex justify-center rounded-sm">
        <Logo />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="correo" className="text-gray-500">
          Correo
        </label>
        <div className="relative">
          <Email />
          <input
            id="email"
            type="email"
            name="email"
            required
            placeholder="Ingresa tu correo electrónico"
            className="rounded-md h-9 w-full pl-8 border"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="contrasena" className="text-gray-500">
          Contraseña
        </label>

        <div className="relative">
          <Key />
          <input
            id="password"
            type="password"
            name="password"
            required
            minLength={6}
            className="rounded-md h-9 border w-full pl-8"
            placeholder="Ingresa tu contraseña "
          />
        </div>
      </div>
      <LoginButton />
      <div
        className="flex items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
