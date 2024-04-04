import {Fragment,useRef,useState} from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import apiClient from "../../http-commons";

function Header(){
    const [login,setLogin]=useState(false)
    const [id,setId]=useState('')
    const [pwd,setPwd]=useState('')
    const idRef=useRef(null)
    const pwdRef=useRef(null)
    const {isLoading,data,refetch:loginOk}=useQuery(['login-ok'],
       async () => {
         return await apiClient.get(`/member/login/${id}/${pwd}`)
       },
       {
          onSuccess:(res)=>{
             if(res.data.msg==="NOID")
             {
                 alert("아이디가 존재하지 않습니다!!")
                 setId('')
                 setPwd('')
                 idRef.current.focus()
             }
             else if(res.data.msg==="NOPWD")
             {
                 alert("비밀번호가 틀립니다!!")
                 setPwd('')
                 pwdRef.current.focus()
             }
             else if(res.data.msg==="OK")
             {
                 window.sessionStorage.setItem("id",res.data.id)
                 window.sessionStorage.setItem("name",res.data.name)
                 setLogin(true)
             }
          }
       },
       {
          onError:(err)=>{
             console.log(err.response)
          }
       }
    )
    const memberLogin=()=>{
       if(id.trim()==="")
       {
         idRef.current.focus()
         return
       }
       else if(pwd.trim()==="")
       {
         pwdRef.current.focus()
         return 
       }
 
       loginOk()
    }
    const memberLogout=()=>{
       window.sessionStorage.clear(); 
       setId('')
       setPwd('')
       setLogin(false)
    }
 
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
                        <div style={{"height":"40px"}}></div>
                        <div className="collapse navbar-collapse" id="main-nav-collapse">
                            <ul className="nav navbar-nav navbar-right text-uppercase">
                                <li>
                                <div className="login_register_area d-flex">
                            {
                                !login &&
                                <div className="login">
                                    ID:<input type="text" style={{"width":"150px","marginTop":"20px","alignItems":"right"}} className="input-sm"
                                        onChange={(e)=>setId(e.target.value)} 
                                        ref={idRef}
                                        value={id}
                                    />&nbsp;
                                    PW:<input type="password"  style={{"width":"150px"}} className="input-sm"
                                        onChange={(e)=>setPwd(e.target.value)}
                                        ref={pwdRef}
                                        value={pwd}
                                    />&nbsp;
                                    <button className="btn-sm" onClick={memberLogin}>로그인</button>
                                </div>
                            }
                            {
                                login &&
                                <div className="login" style={{"marginTop":"20px","alignItems":"right"}}>
                                {window.sessionStorage.getItem("name")}님 로그인중입니다&nbsp;
                                <button className="btn-sm" onClick={memberLogout}>로그아웃</button>
                                </div>
                            }
                        </div>
                                </li>
                            </ul>
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