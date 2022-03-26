import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState, useRef, useMemo } from 'react';
import "./mail.css"
import axios from 'axios'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const editorConfiguration = {
    plugins: [ Image ],
    toolbar: [ 'uploadImage' ],
    image: {
        toolbar: [
            'imageStyle:block',
            'imageStyle:side',
            '|',
            'toggleImageCaption',
            'imageTextAlternative',
            '|',
            'linkImage'
        ]
    }
};


const CreateNew = (props) => {
    const [blog, setBlog] = useState("");
    const [toAddress, setToAddress] = useState("");
    const [toEmail, setToEmail] = useState("");
    const [subject, setSubj] = useState("");
    
    const user = props.user;
    // const handleOnChange = (e, editor) => {
    //     const data = editor.getData();
    //     console.log(data)
    //     setBlog(data)
    // }
    
    const handleOnChange2 = (e) => {
        // console.log(e)
        setBlog(e)
    }
    console.log(blog)
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

    const editor = useRef();
    const handleInput = (event) => {
        console.log(event); //Get the click event
    }
    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
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
                    {/* <CKEditor
                        className='ckedit'
                        // config={ editorConfiguration }
                        editor={ ClassicEditor }
                        data=""
                        onChange = {handleOnChange}
                    /> */}
                    <ReactQuill theme="snow" modules={modules} onChange = {handleOnChange2}/>
                </div>
                <div>
                    <input className='mail-submit mail-input' type="submit" value="Send"/>
                </div>
            </form>
        </div>
        
    );
}

export default CreateNew