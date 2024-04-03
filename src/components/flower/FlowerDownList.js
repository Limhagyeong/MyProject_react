import {Fragment,useState} from "react";
import apiClient from "../../http-commons";
import {Link, useParams} from "react-router-dom";
import {useQuery} from "react-query";

function FlowerDownList (){
    const [curpage,setCurpage]=useState(1)
    const {cateMinor}=useParams()
    const [name,setName]=useState('')
    const {isLoading,data,isError,error}=useQuery(
        ['flower-list', cateMinor, curpage],
        async()=>{
        return await apiClient.get(`/flower/list_react/${curpage}/${cateMinor}?name=${name}`)
    })
    if(isLoading) return <h3 className={"text-center"}>Loading</h3>
    if(isError) return <h3 className={"text-center"}>{error}</h3>
    console.log(data)

    let html=(data.data.list.map((vo)=>
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
    let header = (
        cateMinor === '인테리어 식물' || cateMinor === '대형 식물' || cateMinor === '동/서양난' ||
        cateMinor === '화환' ? (
            <div id="plant-page">
                <header className="page-head">
                    <div className="header-wrapper">
                        <div className="container">
                            <div className="row">
                                <ol className="breadcrumb">

                                </ol>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        ) : (
            <div id="flower-page">
                <header className="page-head">
                    <div className="header-wrapper">
                        <div className="container">
                            <div className="row">
                                <ol className="breadcrumb">

                                </ol>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        )
    )
    let html2=(data.data.list2.map((vo2)=>
            <>

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
            </>
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
            {header}
            <div className="headline text-center"></div>
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

export default FlowerDownList