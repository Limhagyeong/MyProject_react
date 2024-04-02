import { useParams,useNavigate } from "react-router-dom";
import { useQuery,useMutation } from "react-query";
import apiClient from '../../http-commons'
import { useRef,useState} from "react";

function BoardUpdate(){
   const {no} = useParams()
   const nav = useNavigate()
   const nameRef=useRef(null)
   const subRef=useRef(null)
   const contRef=useRef(null)
   const pwdRef=useRef(null)

   const [name,setName]=useState('')
   const [subject,setSubject]=useState('')
   const [content,setContent]=useState('')
   const [pwd,setPwd]=useState('')
   const [result,setResult]=useState(null)

   const {data}=useQuery(
      ['board-update',no],
      async () => {
        return await apiClient.get(`/board/update_myboard/${no}`)
      },
      {
         onSuccess:(res)=>{
             setName(res.data.name)
             setSubject(res.data.subject)
             setContent(res.data.content)
         }
      },
      {
          onError:(err)=>{
            console.log(err.response)
          }
      }
   )

   const {mutate:boardUpdate}=useMutation(
      async () => {
        return await apiClient.put(`/board/update_ok_myboard/${no}`,{
           name:name,
           subject:subject,
           content:content,
           pwd:pwd
        })
      },
      {
         onSuccess:(res)=>{
            
            if(res.data.msg==="yes")
            {
                window.location.href='/board/detail/'+no
            }
            else
            {
                alert("비밀번호가 틀립니다!!")
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
   const boardUpdateok=()=>{
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
    boardUpdate()
   }
    return(
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
                <h3 className={"text-center"}>수정하기</h3>
                <table className={"table"}>
                    <tbody>
                    <tr>
                        <td width={"15%"} className={"text-center"}>이름</td>
                        <td width={"85%"}>
                            <input type={"text"} size={"15"} className={"input-sm"}
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
                            <input type={"password"} size={"15"} className={"input-sm"} onChange={(e)=>setPwd(e.target.value)}
                                   ref={pwdRef} value={pwd}/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={"2"} className={"text-center"}>
                            <input type={"button"} className={"btn-xs"} value={"수정"} onClick={boardUpdateok}/>
                            <input type={"button"} className={"btn-xs"} value={"취소"} onClick={() => nav(-1)}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            </div>
        </>
    )
}

export default BoardUpdate