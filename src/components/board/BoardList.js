import {Fragment,useState,useEffect} from "react";
import {Link} from "react-router-dom";
import { useQuery } from "react-query";
import apiClient from "../../http-commons"

function BoardList (){
    const [curpage,setCurpage]=useState(1)
    const {isLoading,isError,error,data,refetch:hitIncrement}=useQuery(
        ['board-list',curpage],
        async()=>{
            return await apiClient.get(`/board/list_myboard/${curpage}`)
        } 
    )
    const prev=()=>{
        setCurpage(curpage>1?curpage-1:curpage)
     }
     const next=()=>{
        setCurpage(curpage<data.data.totalpage?curpage+1:curpage)
     }
     useEffect(()=>{
        hitIncrement()
    },[isLoading])  

    if(isLoading) return <h1 className="text-center">Loading</h1>
    if(isError) return <h1 className="text-center">{error}</h1>
    console.log(data)

    let html=data.data.bList && data.data.bList.map((vo)=>
        <tr>
            <td className={"text-center"} width={"10%"}>{vo.no}</td>
            <td width={"45%"}>
                <Link to={"/board/detail/"+vo.no}>
                    {vo.subject}
                </Link>
            </td>
            <td className={"text-center"} width={"15%"}>{vo.name}</td>
            <td className={"text-center"} width={"20%"}>{vo.regdate.substring(0,vo.regdate.indexOf(" "))}</td>
            <td className={"text-center"} width={"10%"}>{vo.hit}</td>
        </tr>
    )
    return (
        <Fragment>
            <div id="commu-page">
                <header className="page-head">
                    <div className="header-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">

                                    <ol className="breadcrumb">

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
                            <a href="#">자주 묻는 질문</a>
                            <a href="#">1:1 문의</a>

                        </div>
                    </div>
                </aside>
            </div>
            <div className={"container"} style={{"marginTop": "20px"}}>
                <div className={"row"}>
                            <span style={{"float": "right"}}><Link to={"/board/insert"}>
                                <i className="fas fa-pen"></i>&nbsp;새글 작성하기</Link>
                            </span>
                </div>
                <table className={"table"} style={{"marginTop": "20px"}}>
                    <thead>
                    <tr style={{"borderTop": "1px solid black"}}>
                        <th className={"text-center"} width={"10%"}>번호</th>
                        <th className={"text-center"} width={"45%"}>제목</th>
                        <th className={"text-center"} width={"15%"}>이름</th>
                        <th className={"text-center"} width={"20%"}>작성일</th>
                        <th className={"text-center"} width={"10%"}>조회수</th>
                    </tr>
                    </thead>
                    <tbody>
                    {html}
                    </tbody>
                </table>
            </div>
            <div className={"text-center"} style={{"marginBottom":"20px"}}>
                <button className={"btn-sm"} onClick={prev}>이전</button>
                {data.data.curpage} page / {data.data.totalpage} pages
                <button className={"btn-sm"} onClick={next}>다음</button>
            </div>
        </Fragment>
    )
}

export default BoardList