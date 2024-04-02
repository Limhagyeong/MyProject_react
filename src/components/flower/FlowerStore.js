import {Fragment,useState,useEffect} from "react";
import axios from "axios";
/* global kakao*/
function FlowerStore(){
    const [sList,setSList]=useState([])
    const [storeDetail,setStoreDetail]=useState({})
    const [open,setOpen]=useState(false)
    const [flsno, setFlsno] = useState(0)
    useEffect(() => {
        axios.get("http://localhost/flower/store_react",{
            params:{
                flsno:flsno
            }
        }).then(res=>{
            console.log(res.data)
            setSList(res.data)
        })
    }, [flsno]);


    const onStoreDetail=(vo)=>{
        setOpen(true)
        setStoreDetail(vo)
        setFlsno(vo.flsno)
    }

    let html = sList.map((vo)=>
        <div className="col-md-4" style={{"height":"250px","marginTop":"50px"}}>
            <div className="thumbnail">
                <img src={vo.img} style={{"width": "100%","height":"170px"}}
                     onClick={() => onStoreDetail(vo)}
                />
                <div className="caption">
                    <p>{vo.name}</p>
                    <p><i className="fas fa-heart"></i>&nbsp;{vo.hit}</p>
                </div>
            </div>
        </div>
    )

    useEffect(()=>{
        if(storeDetail.address) {
            const script = document.createElement("script")
            // <script src=></script> 생성
            script.async = true
            script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=23e8040d553778eeeb77f0900cb92322&autoload=false&libraries=services"
            document.head.appendChild(script)
            /*
                    <head>
                      <script src=></script>
                    </head>
             */
            script.onload = () => {
                kakao.maps.load(() => {
                    var mapContainer = document.getElementById('map'), // 지도를 표시할 div
                        mapOption = {
                            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                            level: 3 // 지도의 확대 레벨
                        };

// 지도를 생성합니다
                    var map = new kakao.maps.Map(mapContainer, mapOption);

// 주소-좌표 변환 객체를 생성합니다
                    var geocoder = new kakao.maps.services.Geocoder();

// 주소로 좌표를 검색합니다
                    geocoder.addressSearch(storeDetail.address, function (result, status) {

                        // 정상적으로 검색이 완료됐으면
                        if (status === kakao.maps.services.Status.OK) {

                            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                            // 결과값으로 받은 위치를 마커로 표시합니다
                            var marker = new kakao.maps.Marker({
                                map: map,
                                position: coords
                            });

                            // 인포윈도우로 장소에 대한 설명을 표시합니다
                            var infowindow = new kakao.maps.InfoWindow({
                                content: '<div style="width:150px;text-align:center;padding:6px 0;">' + storeDetail.name + '</div>'
                            });
                            infowindow.open(map, marker);

                            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                            map.setCenter(coords);
                        }
                    });
                })
            }
        }
    })

    return (
        <Fragment>
            <div id="store-page">
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
            <div className={"container"} style={{"width": "1400px", "marginBottom": "50px"}}>
                <div className={"row"}>
                    <div className={"col-sm-8"}>
                        {html}
                    </div>
                    <div className={"col-sm-4"} style={{"marginTop":"50px"}}>
                        {open ? <Detail vo={storeDetail}/> : null}
                        <div style={{"height": "10px"}}></div>
                        <div id="map" style={{"width": "100%", "height": "350px"}}></div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

function Detail(props) {
    return (
        <table className={"table"}>
            <tbody>
            <tr>
                <td colSpan={"2"} className={"text-center"}>
                    <img src={props.vo.img} style={{"width": "100%"}}/>
                </td>
            </tr>
            <tr>
                <td colSpan={"2"}>
                    <h3>{props.vo.name}</h3>
                </td>
            </tr>
            <tr>
            <td width={"25%"} className={"text-center"}>주소</td>
                <td width={"75%"}>{props.vo.address}</td>
            </tr>
            <tr>
                <td width={"25%"} className={"text-center"}>전화번호</td>
                <td width={"75%"}>{props.vo.phone}</td>
            </tr>
            </tbody>
        </table>
    )
}

export default FlowerStore