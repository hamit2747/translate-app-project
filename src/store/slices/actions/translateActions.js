import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../../constants";

//api'den dil verilerini alır eğer options tanımlıysa axos.get yerine axios.request yazarız içine optionu yerleştiririz.
 export const getLanguages = createAsyncThunk('getLanguages', 
 //api isteği
 async()=>{
  const res = await axios.request (options)
// store'a gönderilecek veri

const data = res.data.data.languages

/* 
diziyi dönüp her bir objesi için value ve label değerlerine sahip yeni bir obje oluştur
*/

const refinedData = data.map((item)=> ({
value:item.code, 
label:item.name,
})
)
return refinedData
 })

 //çeviri işlemini yapar
export const translateText = createAsyncThunk('translate ',
async(params) =>{
  //api isteği için gerekli ayarlar
  const encodedParams = new URLSearchParams();
encodedParams.set('source_language', params.sourceLang.value);
encodedParams.set('target_language', params.targetLang.value);
encodedParams.set('text' , params.text);

const options = {
  method: 'POST',
  url: 'https://text-translator2.p.rapidapi.com/translate',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': '53e1016324mshd0f8573932d0a24p1b4d7cjsn652d647d640a',
    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
  },
  data: encodedParams,
};

//api isteği atma
const res = await axios.request(options);
console.log(res)
//store'a aktarma
return res.data.data.translatedText;


}
)