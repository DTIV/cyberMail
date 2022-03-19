import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react';
import "./mail.css"
import Topbar from '../Sidebar/Topbar';
import axios from 'axios'

const CreateNew = (props) => {
    const [blog, setBlog] = useState("");
    const [toAddress, setToAddress] = useState("");
    const [toEmail, setToEmail] = useState("");
    const [subject, setSubj] = useState("");
    
    const user = props.user;
    const handleOnChange = (e, editor) => {
        const data = editor.getData();
        setBlog(data)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const senderMail = {
                userAddress: user,
                fromAddress: user,
                toAddress:toAddress,
                subject: subject,
                mail: blog
            }
            await axios.post("/mail",senderMail)
        }catch(err){
            console.log(err)
        }
        if(user != toAddress){
            try{
                const recieverMail = {
                    userAddress: toAddress,
                    fromAddress: user,
                    toAddress:toAddress,
                    subject: subject,
                    mail: blog
                }
                await axios.post("/mail",recieverMail)
            }catch(err){
                console.log(err)
            }
        }
    }

    return (
        <div>
            <form className="create-mail-wrap" onSubmit={handleSubmit}>
                <div className='mail-input-wrap'>
                    <div>
                        <input className='mail-input' type="text" placeholder='To Address' onChange={(e)=>setToAddress(e.target.value)}/>
                    </div>
                    <div>
                        <input className='mail-input' type="text" placeholder='To Email' onChange={(e)=>setToEmail(e.target.value)}/>
                    </div>
                    <div>
                        <input className='mail-input' type="text" placeholder='Subject' onChange={(e)=>setSubj(e.target.value)}/>
                    </div>
                </div>
                
                <div  className='editor-wrap'>
                    <CKEditor
                        className='ckedit'
                        editor={ ClassicEditor }
                        data=""
                        onChange = {handleOnChange}
                    />
                </div>
                <div>
                    <input className='mail-submit mail-input' type="submit" value="Send"/>
                </div>
            </form>
        </div>
        
    );
}

export default CreateNew