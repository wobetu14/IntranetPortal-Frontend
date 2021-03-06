import React, { useEffect, useState } from 'react'
import { rootURI } from '../rootURLs/root_uri';
import DownloadableFile from './DownloadableFile';

function DownloadableFiles() {
    const [downloadableFiles, setDownloadableFiles]=useState([]);
    const [fileTitle, setFileTitle]=useState([]);

    useEffect(()=>{
        fetchFilesData();
     }, []);

     
     /**
      * Sync in every 10 second
      */
     useEffect(()=>{
      const interval=setInterval(()=>{
        fetchFilesData();
      }, 10000)  
      return()=>clearInterval(interval)
     }, []);

     const fetchFilesData = async () => {
        const url = rootURI+'/downloadable_files';
        const response = await fetch(url);
        const data = await response.json();
        setDownloadableFiles(data);
    }

    const searchByFileTitle= async (e)=>{
      e.preventDefault();
      const fileName = e.target.value;
      setFileTitle(fileName);
      if(fileName){
        const url = `${rootURI}/downloadable_files/${fileName}`;
        const response = await fetch(url);
        if(response){
          const searchFilesData = await response.json();
          setDownloadableFiles(searchFilesData);
        }
        else{
          setDownloadableFiles([])
        }
      }
    }

  return (
    <div className='addressbook_container'>
      <h1 className='addressbook_header'>Downloadable Resources</h1>

      <form className='form_appName'>
              <input
                className='textAppName'
                type='text'
                id='fileTitle'
                name='fileTitle'
                placeholder='Search by File Title'
                value={fileTitle}
                onChange={searchByFileTitle}
              />
          </form>

      <div className='addressbooks__list'>
        {
            downloadableFiles.map((downloadableFile)=>(
                <DownloadableFile downloadableFile={downloadableFile} key={downloadableFile.id} />
            ))
        }
       </div>
    </div>
  )
}

export default DownloadableFiles