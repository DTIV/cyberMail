import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react';
import "./mail.css"

const CreateNew = () => {
    const [blog, setBlog] = useState("")

    const handleOnChange = (e, editor) => {
        const data = editor.getData();
        setBlog(data)
    }

    return (
        <div className="create-mail-wrap">
            <div className='mail-input-wrap'>
                <div>
                    <input className='mail-input' type="text" placeholder='Address'/>
                </div>
                <div>
                    <input className='mail-input' type="text" placeholder='Email'/>
                </div>
                <div>
                    <input className='mail-input' type="text" placeholder='Subject'/>
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
        </div>
    );
}

export default CreateNew