import { Fragment } from "react"

function Footer(){
    return(
        <Fragment>
            <nav className="hidden-xs hidden-sm navbar footer-nav" role="navigation">
                <div className="container">

                    <div className="navbar-header">

                        <div className="navbar-brand">
                            <span className="sr-only">&copy;Blooming Day</span>
                            <a href="index.html">
                                &copy;Blooming Day
                            </a>
                        </div>


                    </div>

                    <div className="collapse navbar-collapse" id="main-nav-collapse">
                        <ul className="nav navbar-nav navbar-right text-capitalize">
                            <li><a href="#about">
                                <span>home</span>
                            </a></li>

                            <li><a href="#services">
                                <span>pages</span>
                            </a></li>

                            <li><a href="#portfolio">
                                <span>features</span>
                            </a></li>

                            <li><a href="#team">
                                <span>portfolio</span>
                            </a></li>

                            <li><a href="#pricing">
                                <span>blog</span>
                            </a></li>

                            <li><a href="#blog">
                                <span>shop</span>
                            </a></li>

                            <li><a href="#contact">
                                <span>contact</span>
                            </a></li>
                        </ul>
                    </div>

                </div>
            </nav>
        </Fragment>
    )
}

export default Footer