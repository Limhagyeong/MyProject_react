import {Fragment,useState,useEffect,useRef} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function Home(){
    const [newsList,setNewsList]=useState([])
    const [fd,setFd]=useState('꽃 선물 아이디어')
    const fdRef=useRef(null)
    useEffect(()=>{
        axios.get("http://localhost/news/list_react",{
            params:{
                fd:fd
            }
        }).then(res=>{
            console.log(res.data)
            setNewsList(res.data.items)
        })
    },[])
    const fdChange=(e)=>{
        setFd(e.target.value)
    }
    const newsFind=()=>{
        if(fd.trim()==='')
        {
            fdRef.current.focus()
            return
        }
        axios.get("http://localhost/news/list_react",{
            params:{
                fd:fd
            }
        }).then(res=>{
            console.log(res.data)
            setNewsList(res.data.items)
        })
        // 검색 하면 다시 실행
    }
    let html=(newsList.map((m,index)=>
            <div className="col-md-4" style={{"width": "380px","height":"125px"}} key={index}>
                <div className="portfolio-item">
                    <div className="item-description">
                        <div className="row">
                            <div className="col-xs-12">
                                <a href={m.link}>
                                    <span className="item-name" dangerouslySetInnerHTML={{__html:m.title}} style={{"width":"100%"}}/>
                                </a>
                                <span>{m.bloggername}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    )
    return (
        <Fragment>

                        <div className="main-content">
                            <section className="bg-main">


                                <div className="container">
                                    <div className="welcome-speech" style={{"marginTop":"20px"}}>
                                        <h1>stand with you<br/>on your blooming day</h1>
                                        <span>당신의 꽃이 피어나는 날을 함께합니다</span><br/><br/>
                                        <Link to="/flower/list" className="btn btn-white" style={{"marginTop":"10px"}}>
                                            For Special Day
                                        </Link>
                                    </div>
                                </div>

                            </section>
                        </div>
                        <div className="main-content">
                            <section className="intro.bg-light-gray">
                                <div className="container">

                                    <div className="headline text-center">
                                        <div className="row">
                                            <div className="col-md-6 col-md-offset-3">
                                                <h2 className="section-title">BLOG POST</h2>
                                                <br/>
                                                <p className="section-sub-title">
                                                    꽃에 관한 다양한 블로그 게시물을 검색해보세요!
                                                </p>
                                                <br/>
                                            </div>
                                        </div>
                                        <div className="input-group margin-bottom-sm">
                                            <input className="form-control" type="text" placeholder="Search Blog"
                                                   ref={fdRef}
                                                   value={fd} onChange={fdChange}/>
                                            <span className="input-group-addon" onClick={newsFind}>
                                    <i className="fa fa-paper-plane fa-fw"></i>
                                    </span>
                                        </div>
                                    </div>


                                    <div className="portfolio-item-list">
                                        <div className="row">
                                            {html}
                                        </div>
                                    </div>
                                </div>
                            </section>

                        </div>
        </Fragment>
    )

}

export default Home