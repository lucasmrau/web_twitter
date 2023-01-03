import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const Input = (props) => (
  <input
    {...props}
    className="w-full focus:border-platinum bg-transparent p-4 border rounded-xl border-onix text-lg outline-none"
  />
);

const validationSchema = yup.object({
  name: yup.string().required("Type your name"),
  username: yup.string().required("Type your username"),
  email: yup.string().required("Type your email").email("E-mail invalid"),
  password: yup.string().required("Type your password"),
});

export function SignUp({ signInUser }) {
  const formik = useFormik({
    onSubmit: async (values) => {
      const res = await axios.post(`${import.meta.env.VITE_API_HOST}/signup`, 
        {
          name: values.name,
          email: values.email,
          username: values.username,
          password: values.password,
      });

      signInUser(res.data);
    },
    validationSchema,
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className=" h-full flex flex-col justify-center p-12 space-y-6">
      <h1 className="text-3xl">Create your account</h1>

      <form className="space-y-6" onSubmit={formik.handleSubmit}>
        <div className="space-y-2">
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
          />
          {formik.touched.name && formik.errors.name && (
            <span className="text-red-500 text-sm">{formik.errors.name}</span>
          )}
        </div>

        <div className="space-y-2">
          <Input
            type="text"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
          />
          {formik.touched.name && formik.errors.name && (
            <span className="text-red-500 text-sm">{formik.errors.name}</span>
          )}
        </div>

        <div className="space-y-2">
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
          />
          {formik.touched.username && formik.errors.username && (
            <span className="text-red-500 text-sm">{formik.errors.username}</span>
          )}
        </div>

        <div className="space-y-2">
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
          />
          {formik.touched.password && formik.errors.password && (
            <span className="text-red-500 text-sm">
              {formik.errors.password}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-birdBlue py-4 rounded-full disabled:opacity-50 text-lg"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {formik.isSubmitting ? 'Sending...' : 'Sign up'}
        </button>
      </form>

      <span className="text-sm text-silver text-center">
        Have an account? <a className="text-birdBlue" href="/login">Access.</a>
      </span>
    </div>
  );
}
