import { useEffect, useState } from 'react'
import '../style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getLanguages, translateText } from '../store/slices/actions/translateActions'
import Select from 'react-select'
import { clearAnswer } from '../store/slices/translateSlice'



const MainPage = () => {
    const { languages,answer } = useSelector((state) => state.translateSlice);
    //seçilen dillerin state'i
    const [sourceLang,setSourceLang]= useState({
        value:'tr',
        label:'Turkish',
    })
    const [targetLang,setTargetLang]= useState({
        value:'en',
        label:'English',
    })

    const [text,setText]= useState("")

    const dispatch = useDispatch()
    
    //dillerin verisini çeker
    useEffect(()=>{
        dispatch(getLanguages())
    },[])

    //state'lerin değerlerini değiştirir.
    const handleChange = ()=>{
        setSourceLang(targetLang);
        setTargetLang(sourceLang)
        //text alanlarını temizle
        setText('');
        dispatch(clearAnswer())
      
    }
  return (
    <div id='main-page'>
        
        <div className='container'> 
        <h1>Çeviri+</h1>
        {/* Üst Kısım */}
    <div className='upper'>
        <Select 
        className='react-select' 
        isLoading ={languages.isLoading}
        value={sourceLang}
        options={languages}
        onChange={setSourceLang}
        />
        
        <button onClick={handleChange}>Değiş</button>
        <Select
         className='react-select' 
         isLoading ={languages.isLoading}
        value={targetLang}
        options={languages}
        onChange={setTargetLang}
        />
    </div>
    {/* Alt Kısım */}
    <div className='bottom'>
        <textarea 
        value={text}
        onChange={(e)=>setText(e.target.value) } >
        </textarea>
        <textarea disabled value={answer}></textarea>
    </div>
    <button 
    onClick={()=>dispatch(translateText({sourceLang,targetLang,text}))}
    id='translate'>Çevir</button>
    </div>
    </div>
  )
}

export default MainPage
