import logofood from "../../../../assets/images/logofood.png";
import { useForm, Resolver } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, TextField } from "@mui/material";
import { Lock } from "@mui/icons-material";
import { Email } from "@mui/icons-material";
import { IconButton } from "@mui/material";

type FormValues = {
  email: string;
  password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.email ? values : {},
    errors: !values.password
      ? {
          email: {
            type: "required",
            message: "Email is required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid Mail",
            },
          },
          password: {
            type: "required",
            message: "Password is required.",
          },
        }
      : {},
  };
};

export default function Login({ saveLoginData }) {
  const navigate = useNavigate();

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit = async (data: any) => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Login",
        data
      );
      localStorage.setItem("token", response.data.token);
      saveLoginData();
      toast.success("Login Successfully");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Login Failed");
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="auth-container ">
        <div className="container-fluid vh-100 bg-overlay border rounded">
          <div className="row  vh-100 justify-content-center align-items-center">
            <div className="col-md-6 bg-white p-5 border rounded">
              <div className="text-center">
                <img src={logofood} alt="" className="logofood" />
              </div>
              <div className="form-content">
                <h3>Log In</h3>
                <p className="text-muted">
                  Welcome Back! Please enter your details
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <IconButton color="success">
                        <Email />
                      </IconButton>
                    </span>
                    <TextField
                      className="form-control"
                      type="text"
                      id="outlined-basic"
                      label="E-mail"
                      variant="outlined"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid Mail",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="alert alert-danger">{errors.email.message}</p>
                  )}
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <IconButton color="success">
                        <Lock />
                      </IconButton>
                    </span>
                    <TextField
                      className="form-control"
                      type="password"
                      id="outlined-basic"
                      label="Password"
                      variant="outlined"
                      {...register("password")}
                    />
                  </div>
                  {errors.password && (
                    <p className="alert alert-danger">
                      {errors.password.message}
                    </p>
                  )}
                  <div className="links d-flex justify-content-between my-3">
                    <a onClick={goToRegister} className="primary">
                      Register Now?
                    </a>
                  </div>
                  <Button
                    className=" w-100"
                    variant="contained"
                    color="success"
                  >
                    <button className="btn w-100 text-white">Login</button>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
