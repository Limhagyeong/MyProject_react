import { Fragment } from "react";
import { useMutation } from "react-query";
import { useNavigate,useParams } from "react-router-dom";
import apiClient from '../../http-commons'
import { useState,useRef } from "react";

function BoardDelete(){
   const {no} = useParams()
   const nav = useNavigate()
   const pwdRef=useRef(null)
   const [pwd,setPwd]=useState('')
   const {mutate:boardDelete}=useMutation(
      async () => {
          return await apiClient.delete(`/board/delete_myboard/${no}/${pwd}`)
      },
      {
         onSuccess:(res)=>{
             if(res.data.msg==='yes')
             {
                 window.location.href='/board/list'
             }
             else
             {
                alert("비밀번호가 틀립니다")
                setPwd('')
                pwdRef.current.focus()
             }
         }
      },
      {
         onError:(err)=>{
            console.log(err.response)
         }
      }
   )
   const boardDeleteOk=()=>{
      if(pwd.trim()==="")
      {
         pwdRef.current.focus()
         return 
      }
      boardDelete()
   }
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
            <div className={"container"} style={{"marginBottom": "20px"}}>
                <div className={"row"} style={{"display": "flex"}}>
                    <table className={"table"} style={{"display": "flex"}}>
                        <tbody>
                        <tr>
                            <td>
                                비밀번호 : <input type={"password"}
                                              style={{"width": "200px", "height": "30px", "marginRight": "10px"}}
                                              ref={pwdRef}
                                              value={pwd} onChange={(e)=>setPwd(e.target.value)}/>
                                <button className={"btn-xs"} onClick={boardDeleteOk}>삭제</button>
                                <button className={"btn-xs"} onClick={() => nav(-1)}>취소</button>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    )
}

export default BoardDelete