import {Fragment,useState,useEffect} from "react";
import {Link} from "react-router-dom";
import {useRef} from "react";
import { useQuery } from "react-query";
import apiClient from "../../http-commons";
function FlowerList(){
    const [curpage,setCurpage]=useState(1)
    const [cateMinor,setCateMinor]=useState('화이트데이')
    const [name,setName]=useState('')
    const nameRef=useRef(null)
    const [prevCateMinor, setPrevCateMinor] = useState('')


    useEffect(() => {
        if (prevCateMinor !== cateMinor) {
            console.log("이전 카테고리:", prevCateMinor)
            setCurpage(1)
            setPrevCateMinor(cateMinor)
            setName('')
        }
    }, [cateMinor, prevCateMinor])

    const {isLoading,isError,error,data,refetch}=useQuery(
        ["f-list",curpage],
        async()=>{
                return await apiClient.get(`/flower/list_react/${curpage}/${cateMinor}?name=${name}`)
            }
        )
    
    useEffect(() => {
        refetch()
    }, [cateMinor,name])

    if(isLoading) return <h1 className="text-center">Loading</h1>
    if(isError) return <h1 className="text-center">{error}</h1>
    console.log(data)

     const cateChange = (cate) => {
        setCateMinor(cate)
        setCurpage(1)
    }

    const findData=(e)=>{
            setName(e.target.value)
    }

    let html=(data.data.list && data.data.list.map((vo)=>
        
            <div className="col-md-4 col-sm-6" style={{"width":"360px","height":"500px","marginBottom":"20px"}}>
            <div className="portfolio-item">
                <div className="item-image">
                    <Link to={"/flower/detail/"+vo.fno}>
                        <img src={vo.img} className="img-responsive center-block"
                             alt="portfolio1"/>
                        <div><span><i className="fa fa-plus"></i></span></div>
                    </Link>
                </div>

                <div className="item-description" style={{"height":"100%"}}>
                    <div className="row">
                        <div className="col-xs-12">
                          <span className="item-name" style={{"width": "100%"}}>{vo.name}</span>
                            <span>{vo.cate_minor}</span>
                            <span>{vo.price}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    )

    let html2=(data.data.list2 && data.data.list2.map((vo2)=>
        <Fragment>
                    
                    <div className="tab-content">
                            <div className="tab-pane active" id="popular">
                                <div className="tab-pane" id="recent">
                                    <div className="recent-post">
                                        <img src={vo2.img}
                                             className="img-responsive center-block"/>
                                        <h5 className="post-widget-heading">{vo2.name}</h5>
                                        <span>{vo2.cate_minor}</span>
                                        <p>{vo2.price}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
        </Fragment>
        )
    )
    const pageChange = (page) => {
        setCurpage(page)
    }
    const prevHandler = () => {
        setCurpage(data.data.startpage - 1)
    }
    const nextHandler = () => {
        setCurpage(data.data.endpage + 1)
    }
    let row = []
    if (data.data.startpage > 1) {
        row.push(<li><a href={"#"} onClick={() => prevHandler()}>&laquo;</a></li>)
    }
    for (let i = data.data.startpage; i <= data.data.endpage; i++) {
        if (curpage === i) {
            row.push(<li className={"active"}><a href={"#"} onClick={() => pageChange(i)}>{i}</a></li>)
        } else {
            row.push(<li><a href={"#"} onClick={() => pageChange(i)}>{i}</a></li>)
        }
    }
    if (data.data.endpage < data.data.totalpage) {
        row.push(<li><a href={"#"} onClick={() => nextHandler()}>&raquo;</a></li>)
    }
    
    return (
        <Fragment>
            <div id="spe-page">
                <header class="page-head">
                    <div class="header-wrapper">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12">

                                    <ol class="breadcrumb">

                                    </ol>

                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
            <div className={"text-center"} style={{"margin": "30px 0 30px 0"}}>
                <aside>
                    <div className="tag-widget">

                        <div className="tags">
                            <a href="#" className={cateMinor === '화이트데이' ? 'active' : ''}
                               onClick={() => cateChange('화이트데이')}>화이트데이</a>
                            <a href="#" className={cateMinor === '프로포즈' ? 'active' : ''}
                               onClick={() => cateChange('프로포즈')}>프로포즈</a>
                            <a href="#" className={cateMinor === '생일' ? 'active' : ''}
                               onClick={() => cateChange('생일')}>생일</a>
                            <a href="#" className={cateMinor === '졸업/입학' ? 'active' : ''}
                               onClick={() => cateChange('졸업/입학')}>졸업/입학</a>
                            <a href="#" className={cateMinor === '승진/개업' ? 'active' : ''}
                               onClick={() => cateChange('승진/개업')}>승진/개업</a>
                            <a href="#" className={cateMinor === '응원/축하' ? 'active' : ''}
                               onClick={() => cateChange('응원/축하')}>응원/축하</a>
                        </div>
                    </div>
                </aside>
            </div>
            <div className={"container"} style={{"width": "500px", "marginBottom": "20px"}}>
                <div className="input-group margin-bottom-sm">
                    <input className="form-control" type="text" placeholder="검색어를 입력하세요"
                           ref={nameRef}
                           value={name} onChange={findData}/>
                    <span className="input-group-addon">
                                    <i className="fa fa-paper-plane fa-fw"></i>
                                    </span>
                </div>
            </div>
            <div className="container" style={{"width": "1500px"}}>
                <div className="col-md-9">
                    <div className="portfolio-item-list">
                        <div className="row">
                            {html}
                        </div>
                    </div>
                </div>
                <aside className="col-md-3">
                    <div className="tab-widget">
                        <div className="nav-tabs-default">
                            <ul className="nav nav-tabs">
                                <li>
                                    <a href="#recent" data-toggle="tab">
                                        <div className="tab-widget-title">Best Item</div>
                                    </a>
                                </li>
                            </ul>
                            {html2}
                        </div>
                    </div>
                </aside>

            </div>
            <div style={{"height": "20px"}}></div>
            <div className={"text-center"}>
            <ul className={"pagination"}>
                    {row}
                </ul>
            </div>
        </Fragment>
    )
   
}

export default FlowerList