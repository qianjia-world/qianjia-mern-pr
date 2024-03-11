import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
export default function UserDialog({
  type,
  title,
  description,
  onSubmit,
  getEmailCode,
}) {
  const { register, handleSubmit, getValues } = useForm();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <form
          className="flex flex-1 flex-col justify-stretch gap-y-2 p-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-4 py-4">
            {/* edit name */}
            {type === "name" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  姓名
                </Label>
                <Input
                  id="name"
                  defaultValue=""
                  className="col-span-3"
                  {...register("name")}
                />
              </div>
            )}

            {/* edit email: need email code and password*/}
            {type === "email" && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    defaultValue=""
                    className="col-span-3"
                    {...register("email")}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="code" className="text-right">
                    Email驗證碼
                  </Label>
                  <Input
                    id="code"
                    autoComplete="current-password"
                    type="password"
                    defaultValue=""
                    className="col-span-3"
                    {...register("code")}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    密碼
                  </Label>
                  <Input
                    id="password"
                    autoComplete="current-password"
                    type="password"
                    defaultValue=""
                    className="col-span-3"
                    {...register("password")}
                  />
                </div>
              </>
            )}

            {type === "password" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  密碼
                </Label>
                <Input
                  id="password"
                  autoComplete="current-password"
                  type="password"
                  defaultValue=""
                  className="col-span-3"
                  {...register("password")}
                />
              </div>
            )}

            {type === "password" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new_password" className="text-right">
                  新密碼
                </Label>
                <Input
                  id="new_password"
                  autoComplete="current-password"
                  type="password"
                  defaultValue=""
                  className="col-span-3"
                  {...register("new_password")}
                />
              </div>
            )}
          </div>

          <DialogFooter>
            {type === "email" && (
              <Button
                type="button"
                onClick={() => {
                  let email = getValues("email");
                  getEmailCode({ email });
                }}
              >
                取得email驗證碼
              </Button>
            )}
            <Button type="submit">送出</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
