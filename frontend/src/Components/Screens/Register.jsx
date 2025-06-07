import React, { useState } from "react";
import Login_svg from "../../assets/Login-amico.svg";
import blog_svg from "../../assets/blobanimation.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Register() {
    const history1 = useNavigate();

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        cpassword: "",
        role: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const isValidEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const isStrongPassword = (password) => {
        const re =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;
        return re.test(password);
    };

    const PostData = async (e) => {
        e.preventDefault();
        const { username, email, password, cpassword, role } = user;

        if (!username || !email || !password || !cpassword || !role) {
            toast.error("Please fill in all fields.");
            return;
        }

        if (!isValidEmail(email)) {
            toast.error("Invalid email format.");
            return;
        }

        if (!isStrongPassword(password)) {
            toast.error(
                "Password must be at least 8 characters with uppercase, lowercase, number, and special character."
            );
            return;
        }

        if (password !== cpassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            const res = await fetch(
                "https://codepad-backend-mopq.onrender.com/register",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                        cpassword,
                        role,
                    }),
                }
            );

            const data = await res.json();

            if (res.status === 422 || !data) {
                toast.error("Please Fill The Details.");
            } else if (res.status === 421) {
                toast.error("Email is Already Registered");
            } else if (res.status === 420) {
                toast.error("Password is not Matching");
            } else {
                toast.success("Register Successfully");
                history1("/login");
            }
        } catch (error) {
            toast.error("Something went wrong. Try again later.");
            console.error(error);
        }
    };

    const width2 = window.outerWidth;
    return (
        <>
            <div className="smallScreen">
                <mark>
                    The Screen is Visible with width more than 250px <br />
                    <br />
                    <hr />
                    <br />
                    Screen Size: {width2}px
                </mark>
            </div>
            <div className="registerMainComponent">
                <img
                    className="blob_svg blob_a"
                    src={blog_svg}
                    alt="background-svg"
                />
                <img
                    className="blob_svg2 blob_a"
                    src={blog_svg}
                    alt="background-svg"
                />
                <h1 className="registerTitle title">Registration</h1>
                <br />
                <div className="registerSection">
                    <div className="registerForm">
                        <form>
                            <div className="RegisterInputField">
                                <div className="Registername">
                                    <label
                                        className="registerLabels"
                                        htmlFor="username"
                                    >
                                        Username:
                                    </label>
                                    <br />
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="username"
                                        value={user.username}
                                        onChange={handleChange}
                                    />
                                    <br />
                                </div>
                                <div className="Registeremail">
                                    <label
                                        className="registerLabels"
                                        htmlFor="email"
                                    >
                                        Email:
                                    </label>
                                    <br />
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        placeholder="user@gmail.com"
                                        value={user.email}
                                        onChange={handleChange}
                                    />
                                    <br />
                                </div>
                                <div className="Registerpassword">
                                    <label
                                        className="registerLabels"
                                        htmlFor="password"
                                    >
                                        Password:
                                    </label>
                                    <br />
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="********"
                                        value={user.password}
                                        onChange={handleChange}
                                    />
                                    <br />
                                </div>
                                <div className="Registercpassword">
                                    <label
                                        className="registerLabels"
                                        htmlFor="cpassword"
                                    >
                                        Confirm Password:
                                    </label>
                                    <br />
                                    <input
                                        type="password"
                                        name="cpassword"
                                        id="cpassword"
                                        placeholder="********"
                                        value={user.cpassword}
                                        onChange={handleChange}
                                    />
                                    <br />
                                </div>
                                <div className="Registerdomain">
                                    <label
                                        className="registerLabels"
                                        htmlFor="role"
                                    >
                                        Profession:
                                    </label>
                                    <input
                                        type="text"
                                        name="role"
                                        id="role"
                                        placeholder="Web Developer"
                                        value={user.role}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <input
                                type="submit"
                                onClick={PostData}
                                className="btn registerbtn"
                                value="Register"
                            />
                        </form>
                    </div>
                    <div className="registerSVG">
                        <img src={Login_svg} alt="Login Illustration" />
                        <p>
                            Already have an Account?{" "}
                            <NavLink to="/login">
                                <span className="registerSwitch">
                                    Login Now
                                </span>
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
