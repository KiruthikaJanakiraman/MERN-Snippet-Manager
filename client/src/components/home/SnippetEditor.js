import React, {useEffect, useState} from "react";
import axios from "axios";
import "./SnippetEditor.scss";
import ErrorMessage from "../misc/ErrorMessage";
import domain from "../../util/domain";


function SnippetEditor({getSnippets, setSnippetEditorOpen, editSnippetData}) {
    const [editorTitle, setEditorTitle] = useState("");
    const [editorDescription, setEditorDescription] = useState("");
    const [editorCode, setEditorCode] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);


    useEffect(() => {
        if(editSnippetData){
            setEditorTitle(editSnippetData.title ? editSnippetData.title : "");
            setEditorDescription(editSnippetData.description ? editSnippetData.description : "");
            setEditorCode(editSnippetData.code ? editSnippetData.code : "");
        }
    }, [editSnippetData]);

    async function saveSnippet(e){
        e.preventDefault();

        const snippetData = {
            title: editorTitle? editorTitle : undefined,
            description: editorDescription? editorDescription : undefined,
            code: editorCode? editorCode : undefined
        }    

        try{
            if(!editSnippetData)
                await axios.post(`${domain}/snippet/`, snippetData);
            else
                await axios.put(`${domain}/snippet/${editSnippetData._id}`, snippetData)
        }catch (err) {
            if (err.response) {
              if (err.response.data.errorMessage) {
                setErrorMessage(err.response.data.errorMessage);
              }
            }
            return;
        }
        
        getSnippets();
        closeEditor();        
    }

    function closeEditor(){
        setSnippetEditorOpen(false);
        setEditorDescription("");
        setEditorTitle("");
        setEditorCode("");
    }

  return <div className="snippet-editor">
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}
  <form className="form" onSubmit={saveSnippet}>
      <label htmlFor="editor-title">Title</label>
      <input 
      type="text" 
      id="editor-title" 
      value={editorTitle} 
      onChange={(e)=> setEditorTitle(e.target.value)}></input>
      <label htmlFor="editor-description">Description</label>
      <input type="text" id="editor-description"
      value={editorDescription} 
      onChange={(e)=> setEditorDescription(e.target.value)}></input>
      <label htmlFor="editor-code">Code</label>
      <textarea id="editor-code"
      value={editorCode} 
      onChange={(e)=> setEditorCode(e.target.value)}></textarea>

      <button className="btn-save" type="submit">Save</button>
      <button className="btn-cancel" onClick={closeEditor}>Cancel</button>

  </form>
</div>
};

export default SnippetEditor;