import {Link, useParams} from "react-router-dom";
import { useQuery } from "react-query";
import apiClient from "../../http-commons"
function BoardDetail(){
    const {no} =useParams()
    const {isLoading,isError,error,data}=useQuery(
        ['board-detail',no],
        async()=>{
            return await apiClient.get(`/board/detail_myboard/${no}`)
        }
    )
    if(isLoading) return <h1 className="text-center">Loading</h1>
    if(isLoading) return <h1 className="text-center">Loading</h1>
    if(isError) return <h1 className="text-center">{error}</h1>
    console.log(data)
    return (
        <>
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
            <div className={"container"}>
                <div className={"row"}>
                    <h3 className={"text-center"}>내용보기</h3>
                    <table className={"table"}>
                        <tbody>
                        <tr>
                            <td className={"text-center"} width={"20%"}>번호</td>
                            <td className={"text-center"} width={"30%"}>{data.data.no}</td>
                            <td className={"text-center"} width={"20%"}>작성일</td>
                            <td className={"text-center"} width={"30%"}>{data.data.regdate}</td>
                        </tr>
                        <tr>
                            <td className={"text-center"} width={"20%"}>이름</td>
                            <td className={"text-center"} width={"30%"}>{data.data.name}</td>
                            <td className={"text-center"} width={"20%"}>조회수</td>
                            <td className={"text-center"} width={"30%"}>{data.data.hit}</td>
                        </tr>
                        <tr>
                            <td className={"text-center"} width={"20%"}>제목</td>
                            <td colSpan={"3"}>{data.data.subject}</td>
                        </tr>
                        <tr>
                            <td className={"text-left"} height={"200"} colSpan={"4"} valign={"top"}>
                        <pre style={{
                            "whiteSpace": "pre-wrap",
                            "backgroundColor": "white",
                            "border": "none"
                        }}>{data.data.content}</pre>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={"row"} style={{"marginBottom": "20px"}}>
                <div className={"text-center"}>
                    <Link to={"/board/update/" + no}>
                        <button className={"btn-xs"}>수정</button>
                    </Link>
                    <Link to={"/board/delete/" + no}>
                        <button className={"btn-xs"}>삭제</button>
                    </Link>
                    <Link to={"/board/list"}>
                        <button className={"btn-xs"}>목록</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default BoardDetail