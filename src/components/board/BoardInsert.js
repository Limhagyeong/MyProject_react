import { Fragment } from "react";
import { useState,useRef } from "react";
import { useMutation } from "react-query";
import apiClient from '../../http-commons'
import { useNavigate } from "react-router-dom";

function BoardInsert(){
   const nameRef=useRef(null)
   const subRef=useRef(null)
   const contRef=useRef(null)
   const pwdRef=useRef(null)

   const [name,setName]=useState('')
   const [subject,setSubject]=useState('')
   const [content,setContent]=useState('')
   const [pwd,setPwd]=useState('')
   const [result,setResult]=useState(null)
   const nav=useNavigate()
   const {mutate:freeboardInsert}=useMutation(
      async () => {
        return await apiClient.post(`/board/insert_myboard`,{
            name:name,
            subject:subject,
            content:content,
            pwd:pwd 
        })
      },
      {
        onSuccess:(res)=>{
            const resData={
               status:res.status,
               headers:res.headers,
               data:res.data
            }
            setResult(resData)
            if(res.data.msg==="yes")
            {
                window.location.href="/board/list"
            } 
            else
            {
                alert("게시물 추가에 오류가 발생하였습니다")
            }
        }
      },
      {
         onError:(err)=>{
            setResult(err.response)
         }
      }
   )
   const boardInsert=()=>{
     if(name.trim()==="")
     {
        nameRef.current.focus()
        return 
     }
     else if(subject.trim()==="")
     {
        subRef.current.focus()
        return 
     }
     else if(content.trim()==="")
     {
        contRef.current.focus()
        return 
     }
     else if(pwd.trim()==="")
     {
        pwdRef.current.focus()
        return 
     }
     freeboardInsert()
   }

    return(
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
            <div className={"container"}>
                <div className={"row"}>
                    <h3 className={"text-center"}>1:1 문의하기</h3>
                    <table className={"table"}>
                        <tbody>
                        <tr>
                            <td width={"15%"} className={"text-center"}>이름</td>
                            <td width={"85%"}>
                            <input type="text" className="input-sm" size={"15"}
                                ref={nameRef} value={name}
                                onChange={(e)=>setName(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td width={"15%"} className={"text-center"}>제목</td>
                            <td width={"85%"}>
                                <input type={"text"} size={"50"} className={"input-sm"}
                                       ref={subRef} value={subject}
                                       onChange={(e)=>setSubject(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td width={"15%"} className={"text-center"}>내용</td>
                            <td width={"85%"}>
                                <textarea rows={"10"} cols={"52"}  ref={contRef} value={content}
                          onChange={(e)=>setContent(e.target.value)}></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td width={"15%"} className={"text-center"}>비밀번호</td>
                            <td width={"85%"}>
                                <input type={"password"} size={"15"} className={"input-sm"} ref={pwdRef} value={pwd}
                          onChange={(e)=>setPwd(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={"2"} className={"text-center"}>

                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={"text-center"} style={{"marginBottom": "20px"}}>
                <button className={"btn-xs"} onClick={boardInsert}>문의</button>
                <button className={"btn-xs"} onClick={() => nav(-1)}>취소</button>
            </div>
        </Fragment>
    )
}

export default BoardInsert