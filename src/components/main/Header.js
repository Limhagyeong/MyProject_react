import {Fragment} from "react";
import { Link } from "react-router-dom";

function Header(){
    return(
        <Fragment>
            <div id="home-page">
                <nav id="mainNavigation" className="navbar navbar-dafault main-navigation" role="navigation">
                    <div className="container">

                        <div className="navbar-header">

                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#main-nav-collapse">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>

                            <div className="navbar-brand">
                                <a href="/">
                                    <img src="/assets/proImg/main-logo.png" className="img-responsive center-block"
                                         alt="logo" style={{"marginLeft":"475px"}}/>
                                </a>
                            </div>

                        </div>

                        <div className="collapse navbar-collapse" id="main-nav-collapse">
                            <ul className="nav navbar-nav navbar-right text-uppercase">
                                <li>
                                    <a href="/"><span>home</span></a>
                                </li>
                                <li>
                                    <Link to="/flower/store"><span>전국 매장</span></Link>
                                </li>

                                <li>
                                    <Link to={"/flower/list"}>Special Day</Link>
                                </li>

                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle"
                                       data-toggle="dropdown"><span>Flowers</span></a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link to={"/flower/down/list/꽃다발"}>꽃다발</Link>
                                        </li>
                                        <li>
                                            <Link to={"/flower/down/list/꽃바구니"}>꽃바구니</Link>
                                        </li>
                                        <li>
                                            <Link to={"/flower/down/list/플라워박스"}>플라워박스</Link>
                                        </li>
                                        <li>
                                            <Link to={"/flower/down/list/1000일 보는 생화"}>1000일 보는 생화</Link>
                                        </li>
                                        <li>
                                            <Link to={"/flower/down/list/대형 꽃다발"}>대형 꽃다발</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle"
                                       data-toggle="dropdown"><span>Plant</span></a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link to={"/flower/down/list/인테리어 식물"}>인테리어 식물</Link>
                                        </li>
                                        <li>
                                            <Link to={"/flower/down/list/대형 식물"}>대형 식물</Link>
                                        </li>
                                        <li>
                                            <Link to={"/flower/down/list/" + encodeURIComponent("동/서양난")}>동/서양난</Link>
                                        </li>
                                        <li>
                                            <Link to={"/flower/down/list/화환"}>화환</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link to="/board/list"><span>Community</span></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

            </div>
        </Fragment>
    )
}

export default Header