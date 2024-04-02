import {Fragment} from "react";
import {Link, useParams} from "react-router-dom";
import apiClient from "../../http-commons"
import { useQuery } from "react-query";

function FlowerDetail(){
    const {fno}=useParams()
    const {isLoading,isError,error,data}=useQuery(
        ['fd-data',fno],
        async()=>{
            return await apiClient.get(`/flower/detail_react/${fno}`)
        }
    )
    if(isLoading) return <h3 className={"text-center"}>Loading</h3>
    if(isError) return <h3 className={"text-center"}>{error}</h3>
    console.log(data)

    let html=(data.data.sub_img.map((vo)=>
        <Fragment>
            <div className="subImgShow" id="image-container" style={{"overflow":"hidden"}}>
                <div className="row"
                     style={{"margin":"20px 0 0 80px","width":"1000px","height":"auto"}}>
                    <table className="table">
                        <tr>
                            <img src={vo.sub_img} style={{"width":"100%"}}/>
                        </tr>
                    </table>
                </div>
            </div>
        </Fragment>
    ))
    return (
        <Fragment>

            <section className="blog-content">
                <div className="container">
                    <div className="row">
                        <ol className="breadcrumb_del">
                            <li><Link to={`/flower/down/list/${data.data.list_data.cate_minor}`}>
                                <i className="fas fa-home"></i>&nbsp;목록 돌아가기</Link>
                            </li>
                        </ol>
                        <main className="col-md-12" style={{"display": "block"}}>
                            <article className="blog-item">
                                <table style={{"marginLeft": "20px"}}>
                                    <tr>
                                        <tbody>
                                        <td class="text-center" rowspan="2" style={{"paddingRight": "30px"}}>
                                            <img className="img-responsive center-block" src={data.data.list_data.img}
                                                 style={{"width": "480px"}}/>
                                        </td>
                                        <td style={{"paddingLeft": "20px", "verticalAlign": "top"}}>
                                            <div style={{
                                                "marginBottom": "20px",
                                                "width": "100%"
                                            }}>
                                                <span style={{
                                                    "fontSize": "24px",
                                                    "fontWeight": "bold"
                                                }}>{data.data.list_data.name}</span>
                                            </div>
                                            <div style={{"marginTop": "30px", "fontSize": "23px"}}>
                                                <span>{data.data.list_data.price}원</span>
                                            </div>
                                            <div style={{"marginTop": "30px", "fontSize": "23px"}}>
                                                <p style={{"fontSize": "15px"}}>
                                                    <i className="fas fa-check"></i>&nbsp;배송비 : 3,000원
                                                </p>
                                            </div>
                                            <div>
                                                <p><i className="fas fa-check"></i>&nbsp;수량</p>
                                                <div className="v">
                                                    <button className="kyj_shoppingDecreseBtn">-</button>
                                                    <input className="kyj_shoppingCal" type="text" id="quantity"
                                                           defaultValue="1" readOnly/>
                                                    <button className="kyj_shoppingIncreseBtn">+</button>
                                                </div>
                                                <div style={{"marginTop": "30px", "fontSize": "23px"}}>
                                                    <p style={{"fontSize": "15px"}}>
                                                        <i className="fas fa-check"></i>&nbsp;당일 입고된 가장 신선한 꽃과 식물을 골라
                                                        보내드립니다
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="single-blog-page-button">
                                                <div className="col-md-6">
                                                    <a href="#" className="btn blog-btn">
                                                        장바구니
                                                    </a>
                                                </div>
                                                <div className="col-md-6">
                                                    <a href="#" className="btn blog-btn">
                                                        바로구매
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                        </tbody>
                                    </tr>
                                </table>
                                <div className="row" style={{"border-top": "1px solid grey", "marginTop": "20px"}}>
        <div className="text-center" style={{"marginTop": "15px"}}>
            <span><Link to="#">Details | </Link></span>
            <span><Link to="#">Review | </Link></span>
            <span><Link to="#">Q&A | </Link></span>
            <span><Link to="#">Order info</Link></span>
                                    </div>
                                </div>
                                {html}
                            </article>
                        </main>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default FlowerDetail