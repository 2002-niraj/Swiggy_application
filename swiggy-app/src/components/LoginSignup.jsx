import { useState, useEffect,useRef  } from "react";
import logo from "../assets/signup_image.avif";
import loginUser from "../features/login/loginThunk";
import registerUser from "../features/signup/registerThunk";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { clearLoginError } from "../features/login/loginSlice";
import { clearRegisterMessage } from "../features/signup/registerSlice";

const LoginSignup = () => {
  const [isLogin, setLogin] = useState(true);
  const dispatch = useDispatch();
  const {error,loginMessage} = useSelector((state) => state.login);
  const { success, message } = useSelector((state) => state.register);
  const formikRef = useRef();

  useEffect(() => {
    if (error || message || loginMessage) {
      const timer = setTimeout(() => {
        dispatch(clearLoginError());
        dispatch(clearRegisterMessage());
      }, 1000);

      return () => clearTimeout(timer);
    }

    // after sucessful register
    if (success) {
      const timer = setTimeout(() => {
        setLogin(true);
        formikRef.current?.resetForm();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [success, error, message, dispatch,loginMessage]);


  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const signupSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    if (isLogin) {
      dispatch(loginUser(values));
    } else {
      dispatch(registerUser(values));
    }
    setSubmitting(false);
  };

  return (
    <div className="p-8 py-8 rounded-2xl w-11/12 max-w-md mx-auto">
      <Formik
        initialValues={initialValues}
        innerRef={formikRef}
        validationSchema={isLogin ? loginSchema : signupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, resetForm }) => (
          <>
            <div className="flex justify-between items-center p-2 mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-3">
                  {isLogin ? "Login" : "Sign up"}
                </h2>
                <p>
                  or{" "}
                  <span
                    className="text-orange-400 cursor-pointer"
                    onClick={() => {
                      setLogin(!isLogin);
                      dispatch(clearLoginError());
                      dispatch(clearRegisterMessage());
                      resetForm();
                    }}
                  >
                    {isLogin ? "create an account" : "login to your account"}
                  </span>
                </p>
              </div>
              <img src={logo} className="w-20" alt="signup" />
            </div>

            {(error || loginMessage ) && (
              <div className={`text-sm mb-2 font-bold ${loginMessage? "text-green-600":"text-red-600"} text-center`}>
                {error || loginMessage }
              </div>
            )}

            {(message) && (
              <div
                className={`text-sm mb-2 font-bold text-center ${
                  success ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </div>
            )}

            <Form>
              {!isLogin && (
                <>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mb-1"
                  />
                  <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="block border border-gray-300 p-4 w-full mb-2 focus:outline-none"
                  />
                </>
              )}

              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mb-1"
              />
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="block border border-gray-300 p-4 w-full mb-2 focus:outline-none"
              />

              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mb-1"
              />
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="block border border-gray-300 p-4 w-full mb-2 focus:outline-none"
              />

              {!isLogin && (
                <>
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm mb-1"
                  />
                  <Field
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    className="block border border-gray-300 p-4 w-full mb-2 focus:outline-none"
                  />
                  <p className="text-sky-600 cursor-pointer text-sm mb-4">
                    Have a referral code?
                  </p>
                </>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-orange-500 cursor-pointer text-white px-4 py-3 mb-2 text-sm font-bold w-full"
              >
                {isLogin ? "LOGIN" : "CONTINUE"}
              </button>

              <p className="text-xs text-center">
                {isLogin
                  ? "By clicking on Login, I accept the "
                  : "By creating an account, I accept the "}
                <span className="font-bold">
                  Terms & Conditions & Privacy Policy
                </span>
              </p>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default LoginSignup;
