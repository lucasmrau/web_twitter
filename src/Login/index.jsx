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
  email: yup.string().required("Type your email").email("E-mail invalid"),
  password: yup.string().required("Type your password"),
});

export function Login({ signInUser }) {
  const formik = useFormik({
    onSubmit: async (values) => {
      const res = await axios.get(`${import.meta.env.VITE_API_HOST}/login`, {
        auth: {
          username: values.email,
          password: values.password,
        },
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
    <div className="h-full flex justify-center">

      <div className="bg-birdBlue lg:flex-1"></div>

      <div className="flex-1 flex justify-center items-center p-12 space-y-6">
        <div className="max-w-md flex-1">
          <h1 className="text-3xl">Acess your account</h1>

          <form className="space-y-6" onSubmit={formik.handleSubmit}>
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
              {formik.touched.email && formik.errors.email && (
                <span className="text-red-500 text-sm">
                  {formik.errors.email}
                </span>
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
              {formik.isSubmitting ? "Sending..." : "Sign in"}
            </button>
          </form>
          <span className="text-sm text-silver text-center">
            Don't have an account?{" "}
            <a className="text-birdBlue" href="/signup">
              Sign up
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
