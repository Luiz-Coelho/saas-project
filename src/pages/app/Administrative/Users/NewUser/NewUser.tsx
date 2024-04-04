import { SubmitHandler, useForm } from "react-hook-form";

type FormFields = {
  email: string;
  password: string;
};

export default function NewUser() {
  const { register, handleSubmit } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  return (
    <div>
      NewUser
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} type="text" />
        <input type="email" />
        <input type="password" />
      </form>
    </div>
  );
}
