import React, { useState, useEffect } from "react";
import Link from "@/utils/ActiveLink";
import { useSelector } from "react-redux";
import { handleLogout } from "@/utils/auth";
import SearchForm from "./SearchForm";
import useTranslation from "next-translate/useTranslation";

const Navbar = ({ user }) => {
	const cartItems = useSelector((state) => state.cart.cartItems);
	const [menu, setMenu] = useState(true);
	const {t} = useTranslation("distance-learning")
	const toggleNavbar = () => {
		setMenu(!menu);
	};

	useEffect(() => {
		let elementId = document.getElementById("navbar");
		document.addEventListener("scroll", () => {
			if (window.scrollY > 170) {
				elementId.classList.add("is-sticky");
			} else {
				elementId.classList.remove("is-sticky");
			}
		});
	});

	const isAdmin = user && user.role === "admin";
	const isTeacher = user && user.role === "teacher";

	const classOne = menu
		? "collapse navbar-collapse"
		: "collapse navbar-collapse show";
	const classTwo = menu
		? "navbar-toggler navbar-toggler-right collapsed"
		: "navbar-toggler navbar-toggler-right";

	return (
		<>
			<div id="navbar" className="navbar-area">
				<div className="minta-nav">
					<div className="container-fluid">
						<div className="navbar navbar-expand-lg navbar-light">
							<Link href="/">
								<a
									onClick={toggleNavbar}
									className="navbar-brand "
								>
									<img src="/images/logo.png" alt="logo" style={{height:'8rem'}}/>
								</a>
							</Link>

							<button
								onClick={toggleNavbar}
								className={classTwo}
								type="button"
								data-toggle="collapse"
								aria-expanded="false"
								aria-label="Toggle navigation"
							>
								<span className="icon-bar top-bar"></span>
								<span className="icon-bar middle-bar"></span>
								<span className="icon-bar bottom-bar"></span>
							</button>

							<div
								className={classOne}
								id="navbarSupportedContent"
							>
								<SearchForm />

								<ul className="navbar-nav">
									<li className="nav-item">
										<Link href="/" activeClassName="active">
											<a
												
												className="nav-link"
											>
												
												{t('Navbar_Home')}
											</a>
										</Link>

									
									</li>

								

									<li className="nav-item megamenu">
										<Link href="/courses">
											<a
												
												className="nav-link"
											>
												{t('Navbar_Courses')}
											</a>
										</Link>

										
									</li>

									<li className="nav-item">
										<Link href="/about">
											<a
												
												className="nav-link"
											>
												{t('Navbar_About')}
											</a>
										</Link>

										
									</li>

									<li className="nav-item">
										<Link href="/contact">
											<a
												
												className="nav-link"
											>
												{t('Navbar_Contact')}
											</a>
										</Link>

										
									</li>

									<li className="nav-item">
										<Link href="/become-a-teacher">
											<a className="nav-link">
												{t('Navbar_Become a Teacher')}
											</a>
										</Link>
									</li>

									{((user && isTeacher) ||
										(user && isAdmin)) && (
										<li className="nav-item">
											<Link href="/teacher/dashboard">
												<a className="nav-link">
													{t('Navbar.Dashboard')}
												</a>
											</Link>
										</li>
									)}
									{user && isAdmin && (
										<li className="nav-item">
											<Link href="/admin/dashboard">
												<a className="nav-link">
													{t('Navbar_Admin Dashboard')}
												</a>
											</Link>
										</li>
									)}
								</ul>

								<div className="others-option d-flex align-items-center">
									<div className="option-item">
										<div className="cart-btn">
											<Link href="/cart">
												<a>
													<i className="flaticon-shopping-cart"></i>{" "}
													<span>
														{cartItems.length}
													</span>
												</a>
											</Link>
										</div>
									</div>

									<div className="option-item">
										{user ? (
											<div className="user-dropdown">
												<Link href="/">
													<a
														onClick={(e) =>
															e.preventDefault()
														}
														className="default-btn"
													>
														<i className="flaticon-user"></i>{" "}
														{user.name}{" "}
														<span></span>
													</a>
												</Link>

												<ul className="dropdown-menu">
													<li className="nav-item">
														<Link
															href="/my-courses"
															activeClassName="active"
														>
															<a
																onClick={
																	toggleNavbar
																}
																className="nav-link"
															>
																{t('Navbar_My Courses')}
															</a>
														</Link>
													</li>

													<li className="nav-item">
														<Link
															href="/my-courses/certs"
															activeClassName="active"
														>
															<a
																onClick={
																	toggleNavbar
																}
																className="nav-link"
															>
																{t('My Certificates')}
															</a>
														</Link>
													</li>

													<li className="nav-item">
														<Link
															href="/user/my-profile"
															activeClassName="active"
														>
															<a
																onClick={
																	toggleNavbar
																}
																className="nav-link"
															>
																{t('Navbar_My Profile')}
															</a>
														</Link>
													</li>

													<li className="nav-item">
														<Link
															href="/user/edit-profile"
															activeClassName="active"
														>
															<a
																onClick={
																	toggleNavbar
																}
																className="nav-link"
															>
																{t('Navbar.Edit Profile')}
															</a>
														</Link>
													</li>

													<li className="nav-item">
														<Link
															href="/user/edit-password"
															activeClassName="active"
														>
															<a
																onClick={
																	toggleNavbar
																}
																className="nav-link"
															>
																{t('Navbar_Edit Password')}
															</a>
														</Link>
													</li>

													<li className="nav-item">
														<Link href="/">
															<a
																className="nav-link"
																onClick={(
																	e
																) => {
																	e.preventDefault();
																	handleLogout();
																}}
															>
																{t('Navbar_Logout')}
															</a>
														</Link>
													</li>
												</ul>
											</div>
										) : (
											<Link href="/authentication">
												<a className="default-btn">
													<i className="flaticon-user"></i>{" "}
													{t('Navbar_Login')}{" "}
													 <span></span>
												</a>
											</Link>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;

